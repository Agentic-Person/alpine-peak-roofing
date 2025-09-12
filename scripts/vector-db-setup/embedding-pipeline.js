/**
 * Alpine Peak Roofing - Embedding Pipeline
 * Generates OpenAI embeddings and populates Supabase vector database
 */

const { createClient } = require('@supabase/supabase-js');
const OpenAI = require('openai');
const fs = require('fs');
const path = require('path');

class EmbeddingPipeline {
  constructor(config = {}) {
    this.openai = new OpenAI({
      apiKey: config.openaiApiKey || process.env.OPENAI_API_KEY
    });
    
    this.supabase = createClient(
      config.supabaseUrl || process.env.NEXT_PUBLIC_SUPABASE_URL,
      config.supabaseServiceKey || process.env.SUPABASE_SERVICE_ROLE_KEY
    );
    
    this.batchSize = config.batchSize || 10;
    this.retryAttempts = config.retryAttempts || 3;
    this.retryDelay = config.retryDelay || 1000;
  }

  // Generate embedding for text
  async generateEmbedding(text) {
    try {
      const response = await this.openai.embeddings.create({
        model: 'text-embedding-ada-002',
        input: text.substring(0, 8000) // Ensure we don't exceed token limits
      });
      
      return response.data[0].embedding;
    } catch (error) {
      console.error('Error generating embedding:', error.message);
      throw error;
    }
  }

  // Generate embeddings with retry logic
  async generateEmbeddingWithRetry(text, attempts = 0) {
    try {
      return await this.generateEmbedding(text);
    } catch (error) {
      if (attempts < this.retryAttempts) {
        console.log(`Retrying embedding generation (attempt ${attempts + 1}/${this.retryAttempts})`);
        await new Promise(resolve => setTimeout(resolve, this.retryDelay * (attempts + 1)));
        return this.generateEmbeddingWithRetry(text, attempts + 1);
      }
      throw error;
    }
  }

  // Process chunks in batches
  async processBatch(chunks, batchIndex) {
    console.log(`📦 Processing batch ${batchIndex + 1} (${chunks.length} chunks)`);
    
    const processedChunks = [];
    
    for (let i = 0; i < chunks.length; i++) {
      const chunk = chunks[i];
      console.log(`  🔄 Processing chunk ${i + 1}/${chunks.length}: ${chunk.id}`);
      
      try {
        // Generate embedding
        const embedding = await this.generateEmbeddingWithRetry(chunk.content);
        
        // Prepare data for database
        const dbRecord = {
          chunk_id: chunk.id,
          content: chunk.content,
          embedding: embedding,
          tokens: chunk.tokens,
          category: chunk.metadata.category,
          subcategory: chunk.metadata.subcategory,
          urgency: chunk.metadata.urgency,
          season: chunk.metadata.season,
          location: chunk.metadata.location,
          service_type: chunk.metadata.service_type,
          complexity: chunk.metadata.complexity
        };
        
        processedChunks.push(dbRecord);
        
        // Small delay to respect rate limits
        await new Promise(resolve => setTimeout(resolve, 100));
        
      } catch (error) {
        console.error(`❌ Failed to process chunk ${chunk.id}:`, error.message);
        // Continue processing other chunks
      }
    }
    
    return processedChunks;
  }

  // Insert processed chunks into Supabase
  async insertIntoDatabase(chunks) {
    console.log(`💾 Inserting ${chunks.length} chunks into database`);
    
    try {
      const { data, error } = await this.supabase
        .from('roofing_knowledge')
        .upsert(chunks, { 
          onConflict: 'chunk_id',
          returning: 'minimal' 
        });
      
      if (error) {
        throw error;
      }
      
      console.log(`✅ Successfully inserted ${chunks.length} chunks`);
      return data;
      
    } catch (error) {
      console.error('❌ Database insertion error:', error.message);
      throw error;
    }
  }

  // Validate database connection and schema
  async validateSetup() {
    console.log('🔍 Validating database setup...');
    
    try {
      // Check if table exists and has correct structure
      const { data, error } = await this.supabase
        .from('roofing_knowledge')
        .select('chunk_id')
        .limit(1);
      
      if (error) {
        throw new Error(`Database validation failed: ${error.message}`);
      }
      
      console.log('✅ Database connection and schema validated');
      return true;
      
    } catch (error) {
      console.error('❌ Database validation failed:', error.message);
      console.log('💡 Make sure you have run the Supabase setup SQL script');
      return false;
    }
  }

  // Test search functionality
  async testSearch(query = "What are the best roofing materials for Colorado?") {
    console.log(`🔍 Testing search with query: "${query}"`);
    
    try {
      // Generate embedding for test query
      const queryEmbedding = await this.generateEmbedding(query);
      
      // Search using the database function
      const { data, error } = await this.supabase
        .rpc('search_roofing_knowledge', {
          query_embedding: queryEmbedding,
          match_threshold: 0.7,
          match_count: 3
        });
      
      if (error) {
        throw error;
      }
      
      console.log('🎯 Search results:');
      data.forEach((result, index) => {
        console.log(`  ${index + 1}. Similarity: ${result.similarity.toFixed(3)}`);
        console.log(`     Category: ${result.category}/${result.subcategory}`);
        console.log(`     Content: ${result.content.substring(0, 100)}...`);
        console.log('');
      });
      
      return data;
      
    } catch (error) {
      console.error('❌ Search test failed:', error.message);
      return null;
    }
  }

  // Load chunked content from file
  loadChunkedContent(filePath) {
    console.log(`📂 Loading chunked content from: ${filePath}`);
    
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const data = JSON.parse(content);
      
      console.log(`📊 Loaded ${data.chunks.length} chunks (${data.total_tokens} total tokens)`);
      return data.chunks;
      
    } catch (error) {
      console.error('❌ Failed to load chunked content:', error.message);
      throw error;
    }
  }

  // Main pipeline execution
  async run(inputFile = './chunked-content/roofing-knowledge-chunks.json') {
    console.log('🚀 Starting embedding pipeline...');
    
    try {
      // Validate setup
      const isValid = await this.validateSetup();
      if (!isValid) {
        throw new Error('Database setup validation failed');
      }
      
      // Load chunked content
      const chunks = this.loadChunkedContent(inputFile);
      
      // Process in batches
      const totalBatches = Math.ceil(chunks.length / this.batchSize);
      let totalProcessed = 0;
      
      for (let i = 0; i < totalBatches; i++) {
        const batchStart = i * this.batchSize;
        const batchEnd = Math.min(batchStart + this.batchSize, chunks.length);
        const batch = chunks.slice(batchStart, batchEnd);
        
        // Process batch
        const processedChunks = await this.processBatch(batch, i);
        
        if (processedChunks.length > 0) {
          // Insert into database
          await this.insertIntoDatabase(processedChunks);
          totalProcessed += processedChunks.length;
        }
        
        // Progress update
        console.log(`📈 Progress: ${totalProcessed}/${chunks.length} chunks processed`);
        
        // Delay between batches to respect rate limits
        if (i < totalBatches - 1) {
          console.log('⏳ Waiting before next batch...');
          await new Promise(resolve => setTimeout(resolve, 2000));
        }
      }
      
      console.log('🎉 Embedding pipeline completed successfully!');
      console.log(`📊 Final stats: ${totalProcessed}/${chunks.length} chunks processed`);
      
      // Test search functionality
      await this.testSearch();
      
      return {
        totalChunks: chunks.length,
        processedChunks: totalProcessed,
        success: true
      };
      
    } catch (error) {
      console.error('❌ Pipeline failed:', error.message);
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Get pipeline statistics
  async getStats() {
    try {
      const { data, error } = await this.supabase
        .from('knowledge_analytics')
        .select('*');
      
      if (error) throw error;
      
      console.log('📊 Knowledge Base Statistics:');
      console.table(data);
      
      return data;
      
    } catch (error) {
      console.error('❌ Failed to get stats:', error.message);
      return null;
    }
  }
}

// Export for use in other scripts
module.exports = EmbeddingPipeline;

// Run if called directly
if (require.main === module) {
  const pipeline = new EmbeddingPipeline();
  
  // Run the pipeline
  pipeline.run()
    .then(result => {
      if (result.success) {
        console.log('✨ Pipeline completed successfully!');
        // Get final statistics
        return pipeline.getStats();
      } else {
        console.error('💥 Pipeline failed:', result.error);
        process.exit(1);
      }
    })
    .then(() => {
      console.log('🏁 All done!');
    })
    .catch(error => {
      console.error('💥 Unexpected error:', error);
      process.exit(1);
    });
}
