#!/usr/bin/env node

/**
 * Alpine Peak Roofing - Data Uploader
 * 
 * This script uploads processed embeddings to Supabase vector database
 * with proper error handling and batch processing.
 */

const { createClient } = require('@supabase/supabase-js');
const fs = require('fs').promises;
const path = require('path');

// Configuration
const CONFIG = {
  supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
  supabaseServiceKey: process.env.SUPABASE_SERVICE_ROLE_KEY, // Use service role key for admin operations
  batchSize: 50,              // Upload in smaller batches to avoid timeouts
  maxRetries: 3,
  retryDelay: 2000,           // 2 seconds between retries
  inputFile: './processed-content/embeddings.json',
  tableName: 'knowledge_base'
};

class DataUploader {
  constructor() {
    // Initialize Supabase client with service role key
    this.supabase = createClient(CONFIG.supabaseUrl, CONFIG.supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    });
    
    this.uploadedCount = 0;
    this.failedUploads = [];
    this.duplicateCount = 0;
  }

  /**
   * Main upload function
   */
  async upload() {
    try {
      console.log('🚀 Starting data upload to Supabase...');
      
      // Validate environment variables
      this.validateConfig();
      
      // Load embeddings
      const embeddings = await this.loadEmbeddings();
      console.log(`📄 Loaded ${embeddings.length} embeddings for upload`);
      
      // Test database connection
      await this.testConnection();
      
      // Clear existing test data
      await this.clearTestData();
      
      // Upload in batches
      const batches = this.createBatches(embeddings, CONFIG.batchSize);
      console.log(`📦 Uploading ${batches.length} batches of ${CONFIG.batchSize} items each`);
      
      for (let i = 0; i < batches.length; i++) {
        console.log(`🔄 Uploading batch ${i + 1}/${batches.length}...`);
        await this.uploadBatch(batches[i], i);
        
        // Small delay between batches
        await this.delay(500);
      }
      
      // Generate upload report
      await this.generateUploadReport();
      
      console.log('✅ Upload complete!');
      console.log(`📊 Successfully uploaded: ${this.uploadedCount} items`);
      console.log(`🔄 Duplicates skipped: ${this.duplicateCount} items`);
      
      if (this.failedUploads.length > 0) {
        console.warn(`⚠️  Failed uploads: ${this.failedUploads.length} items`);
        await this.saveFailedUploads();
      }
      
    } catch (error) {
      console.error('❌ Error uploading data:', error);
      throw error;
    }
  }

  /**
   * Validate configuration
   */
  validateConfig() {
    if (!CONFIG.supabaseUrl) {
      throw new Error('NEXT_PUBLIC_SUPABASE_URL environment variable not set');
    }
    
    if (!CONFIG.supabaseServiceKey) {
      throw new Error('SUPABASE_SERVICE_ROLE_KEY environment variable not set');
    }
    
    console.log('✅ Configuration validated');
  }

  /**
   * Load embeddings from file
   */
  async loadEmbeddings() {
    const filePath = path.resolve(__dirname, CONFIG.inputFile);
    const content = await fs.readFile(filePath, 'utf8');
    const embeddings = JSON.parse(content);
    
    // Transform to Supabase format
    return embeddings.map(emb => ({
      id: emb.id,
      content: emb.content,
      title: emb.title,
      embedding: emb.embedding,
      tokens: emb.tokens,
      metadata: emb.metadata
    }));
  }

  /**
   * Test database connection and table structure
   */
  async testConnection() {
    try {
      // Test basic connection
      const { data, error } = await this.supabase
        .from(CONFIG.tableName)
        .select('id')
        .limit(1);
      
      if (error) {
        throw new Error(`Database connection failed: ${error.message}`);
      }
      
      console.log('✅ Database connection successful');
      
      // Check if vector extension is enabled
      const { data: extensions, error: extError } = await this.supabase
        .rpc('get_knowledge_base_stats')
        .single();
      
      if (extError && extError.code === '42883') {
        console.warn('⚠️  Vector functions not found. Make sure to run supabase-setup.sql first');
      } else {
        console.log('✅ Vector functions available');
      }
      
    } catch (error) {
      throw new Error(`Database test failed: ${error.message}`);
    }
  }

  /**
   * Clear test data before uploading real data
   */
  async clearTestData() {
    const { error } = await this.supabase
      .from(CONFIG.tableName)
      .delete()
      .like('id', 'test_%');
    
    if (error && error.code !== 'PGRST116') { // PGRST116 = no rows found (ok)
      console.warn('⚠️  Could not clear test data:', error.message);
    } else {
      console.log('🧹 Cleared test data');
    }
  }

  /**
   * Create batches for upload
   */
  createBatches(items, batchSize) {
    const batches = [];
    for (let i = 0; i < items.length; i += batchSize) {
      batches.push(items.slice(i, i + batchSize));
    }
    return batches;
  }

  /**
   * Upload a batch with retry logic
   */
  async uploadBatch(batch, batchIndex, retryCount = 0) {
    try {
      const { data, error } = await this.supabase
        .from(CONFIG.tableName)
        .upsert(batch, { 
          onConflict: 'id',
          ignoreDuplicates: false 
        })
        .select('id');
      
      if (error) {
        throw error;
      }
      
      // Count successful uploads
      const newUploads = data ? data.length : batch.length;
      const duplicates = batch.length - newUploads;
      
      this.uploadedCount += newUploads;
      this.duplicateCount += duplicates;
      
      console.log(`  ✓ Batch ${batchIndex + 1}: ${newUploads} uploaded, ${duplicates} duplicates`);
      
    } catch (error) {
      if (retryCount < CONFIG.maxRetries) {
        console.warn(`⚠️  Batch ${batchIndex + 1} failed, retrying (${retryCount + 1}/${CONFIG.maxRetries})...`);
        await this.delay(CONFIG.retryDelay * (retryCount + 1));
        return this.uploadBatch(batch, batchIndex, retryCount + 1);
      }
      
      console.error(`❌ Batch ${batchIndex + 1} failed after ${CONFIG.maxRetries} retries:`, error.message);
      
      // Add failed items to failed uploads
      this.failedUploads.push({
        batchIndex: batchIndex,
        items: batch,
        error: error.message,
        retries: CONFIG.maxRetries
      });
    }
  }

  /**
   * Generate upload report
   */
  async generateUploadReport() {
    try {
      // Get database statistics
      const { data: stats, error } = await this.supabase
        .rpc('get_knowledge_base_stats')
        .single();
      
      const report = {
        uploadedAt: new Date().toISOString(),
        uploadStats: {
          totalUploaded: this.uploadedCount,
          duplicatesSkipped: this.duplicateCount,
          failedUploads: this.failedUploads.length
        },
        databaseStats: stats || {
          total_chunks: this.uploadedCount,
          categories: {},
          urgency_levels: {}
        }
      };
      
      // Save report
      const reportPath = path.resolve(__dirname, './processed-content/upload-report.json');
      await fs.writeFile(reportPath, JSON.stringify(report, null, 2));
      
      console.log(`📊 Upload report saved to ${reportPath}`);
      
      // Display summary
      if (stats) {
        console.log(`📈 Database now contains ${stats.total_chunks} total chunks`);
        if (stats.categories) {
          console.log('📋 Categories:', Object.keys(stats.categories).join(', '));
        }
      }
      
    } catch (error) {
      console.warn('⚠️  Could not generate complete report:', error.message);
    }
  }

  /**
   * Save failed uploads for debugging
   */
  async saveFailedUploads() {
    const failedPath = path.resolve(__dirname, './processed-content/failed-uploads.json');
    await fs.writeFile(failedPath, JSON.stringify(this.failedUploads, null, 2));
    console.log(`⚠️  Failed uploads saved to ${failedPath}`);
  }

  /**
   * Test search functionality
   */
  async testSearchFunctionality() {
    try {
      console.log('🔍 Testing search functionality...');
      
      // Test basic similarity search with dummy vector
      const dummyVector = Array(1536).fill(0.1); // Simple test vector
      
      const { data, error } = await this.supabase
        .rpc('search_knowledge_base', {
          query_embedding: dummyVector,
          match_threshold: 0.5,
          match_count: 3
        });
      
      if (error) {
        console.warn('⚠️  Search test failed:', error.message);
      } else {
        console.log(`✅ Search test successful: found ${data.length} results`);
      }
      
    } catch (error) {
      console.warn('⚠️  Search test failed:', error.message);
    }
  }

  /**
   * Delay helper function
   */
  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// Run the uploader if called directly
if (require.main === module) {
  const uploader = new DataUploader();
  uploader.upload()
    .then(() => uploader.testSearchFunctionality())
    .catch(console.error);
}

module.exports = DataUploader;