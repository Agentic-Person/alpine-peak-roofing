#!/usr/bin/env node

/**
 * Alpine Peak Roofing - Embedding Generator
 * 
 * This script generates OpenAI embeddings for processed content chunks
 * and prepares them for storage in Supabase vector database.
 */

const fs = require('fs').promises;
const path = require('path');
const axios = require('axios');

// Configuration
const CONFIG = {
  openaiApiKey: process.env.OPENAI_API_KEY,
  embeddingModel: 'text-embedding-ada-002',
  batchSize: 100,              // Process embeddings in batches
  requestDelay: 1000,          // Delay between API calls (ms)
  inputFile: './processed-content/processed-chunks.json',
  outputFile: './processed-content/embeddings.json',
  maxRetries: 3
};

class EmbeddingGenerator {
  constructor() {
    this.processedEmbeddings = [];
    this.totalTokensUsed = 0;
    this.apiCallsCount = 0;
    this.failedChunks = [];
  }

  /**
   * Main embedding generation function
   */
  async generate() {
    try {
      console.log('🚀 Starting embedding generation...');
      
      // Validate OpenAI API key
      if (!CONFIG.openaiApiKey) {
        throw new Error('OPENAI_API_KEY environment variable not set');
      }

      // Load processed chunks
      const chunks = await this.loadProcessedChunks();
      console.log(`📄 Loaded ${chunks.length} chunks for embedding`);

      // Process chunks in batches
      const batches = this.createBatches(chunks, CONFIG.batchSize);
      console.log(`📦 Processing ${batches.length} batches of ${CONFIG.batchSize} chunks each`);

      for (let i = 0; i < batches.length; i++) {
        console.log(`🔄 Processing batch ${i + 1}/${batches.length}...`);
        await this.processBatch(batches[i], i);
        
        // Delay between batches to respect rate limits
        if (i < batches.length - 1) {
          await this.delay(CONFIG.requestDelay);
        }
      }

      // Save embeddings
      await this.saveEmbeddings();
      
      console.log('✅ Embedding generation complete!');
      console.log(`📊 Generated ${this.processedEmbeddings.length} embeddings`);
      console.log(`🔢 Total tokens used: ${this.totalTokensUsed.toLocaleString()}`);
      console.log(`📞 Total API calls: ${this.apiCallsCount}`);
      
      if (this.failedChunks.length > 0) {
        console.warn(`⚠️  Failed to process ${this.failedChunks.length} chunks`);
        await this.saveFailedChunks();
      }

      // Estimate costs
      this.estimateCosts();

    } catch (error) {
      console.error('❌ Error generating embeddings:', error);
      throw error;
    }
  }

  /**
   * Load processed chunks from file
   */
  async loadProcessedChunks() {
    const filePath = path.resolve(__dirname, CONFIG.inputFile);
    const content = await fs.readFile(filePath, 'utf8');
    return JSON.parse(content);
  }

  /**
   * Create batches for processing
   */
  createBatches(chunks, batchSize) {
    const batches = [];
    for (let i = 0; i < chunks.length; i += batchSize) {
      batches.push(chunks.slice(i, i + batchSize));
    }
    return batches;
  }

  /**
   * Process a batch of chunks
   */
  async processBatch(batch, batchIndex) {
    const batchPromises = batch.map((chunk, index) => 
      this.generateEmbeddingWithRetry(chunk, batchIndex * CONFIG.batchSize + index)
    );

    const results = await Promise.allSettled(batchPromises);
    
    // Process results
    for (let i = 0; i < results.length; i++) {
      const result = results[i];
      if (result.status === 'fulfilled' && result.value) {
        this.processedEmbeddings.push(result.value);
      } else {
        console.error(`❌ Failed to process chunk ${batchIndex * CONFIG.batchSize + i}:`, 
                     result.reason?.message || 'Unknown error');
        this.failedChunks.push({
          chunk: batch[i],
          error: result.reason?.message || 'Unknown error'
        });
      }
    }
  }

  /**
   * Generate embedding with retry logic
   */
  async generateEmbeddingWithRetry(chunk, index, retryCount = 0) {
    try {
      return await this.generateEmbedding(chunk, index);
    } catch (error) {
      if (retryCount < CONFIG.maxRetries) {
        console.warn(`⚠️  Retrying chunk ${index} (attempt ${retryCount + 1}/${CONFIG.maxRetries})`);
        await this.delay(1000 * (retryCount + 1)); // Exponential backoff
        return this.generateEmbeddingWithRetry(chunk, index, retryCount + 1);
      }
      throw error;
    }
  }

  /**
   * Generate embedding for a single chunk
   */
  async generateEmbedding(chunk, index) {
    try {
      // Prepare content for embedding
      const textToEmbed = this.prepareTextForEmbedding(chunk);
      
      // Call OpenAI API
      const response = await axios.post(
        'https://api.openai.com/v1/embeddings',
        {
          model: CONFIG.embeddingModel,
          input: textToEmbed,
          encoding_format: 'float'
        },
        {
          headers: {
            'Authorization': `Bearer ${CONFIG.openaiApiKey}`,
            'Content-Type': 'application/json'
          },
          timeout: 30000 // 30 second timeout
        }
      );

      this.apiCallsCount++;
      this.totalTokensUsed += response.data.usage.total_tokens;

      const embedding = response.data.data[0].embedding;

      // Create embedding object
      const embeddingObject = {
        id: chunk.id,
        content: chunk.content,
        title: chunk.title,
        embedding: embedding,
        tokens: chunk.tokens,
        metadata: {
          ...chunk.metadata,
          embeddingModel: CONFIG.embeddingModel,
          embeddingTokens: response.data.usage.total_tokens,
          generatedAt: new Date().toISOString(),
          index: index
        }
      };

      // Progress indicator
      if ((index + 1) % 10 === 0 || index === 0) {
        console.log(`  ✓ Generated embedding ${index + 1} (${chunk.tokens} tokens)`);
      }

      return embeddingObject;

    } catch (error) {
      if (error.response?.status === 429) {
        // Rate limit hit, wait longer
        console.warn(`⚠️  Rate limit hit, waiting 60 seconds...`);
        await this.delay(60000);
        throw new Error(`Rate limit exceeded for chunk ${index}`);
      } else if (error.response?.status === 400) {
        // Bad request, likely content too long
        console.warn(`⚠️  Content too long for chunk ${index}, truncating...`);
        const truncatedChunk = { ...chunk, content: chunk.content.substring(0, 8000) };
        return this.generateEmbedding(truncatedChunk, index);
      } else {
        throw new Error(`API error for chunk ${index}: ${error.response?.data?.error?.message || error.message}`);
      }
    }
  }

  /**
   * Prepare text for embedding by combining title and content
   */
  prepareTextForEmbedding(chunk) {
    let text = '';
    
    // Add title if available
    if (chunk.title && chunk.title !== 'Untitled Section') {
      text += `Title: ${chunk.title}\n\n`;
    }
    
    // Add category context
    if (chunk.metadata.category) {
      text += `Category: ${chunk.metadata.category}\n`;
    }
    
    // Add urgency context
    if (chunk.metadata.urgency && chunk.metadata.urgency !== 'normal') {
      text += `Urgency: ${chunk.metadata.urgency}\n`;
    }
    
    text += '\nContent:\n' + chunk.content;
    
    // Ensure content isn't too long (OpenAI limit is ~8000 tokens)
    if (text.length > 32000) { // Conservative limit (8000 tokens * 4 chars/token)
      text = text.substring(0, 32000) + '...';
    }
    
    return text;
  }

  /**
   * Save embeddings to file
   */
  async saveEmbeddings() {
    const outputPath = path.resolve(__dirname, CONFIG.outputFile);
    await fs.writeFile(outputPath, JSON.stringify(this.processedEmbeddings, null, 2));
    
    // Also save a summary file
    const summaryPath = path.resolve(__dirname, './processed-content/embedding-summary.json');
    const summary = {
      totalEmbeddings: this.processedEmbeddings.length,
      totalTokensUsed: this.totalTokensUsed,
      apiCallsCount: this.apiCallsCount,
      failedChunks: this.failedChunks.length,
      model: CONFIG.embeddingModel,
      generatedAt: new Date().toISOString(),
      categoryDistribution: this.getCategoryDistribution()
    };
    
    await fs.writeFile(summaryPath, JSON.stringify(summary, null, 2));
    
    console.log(`💾 Saved embeddings to ${outputPath}`);
    console.log(`📊 Saved summary to ${summaryPath}`);
  }

  /**
   * Save failed chunks for debugging
   */
  async saveFailedChunks() {
    const failedPath = path.resolve(__dirname, './processed-content/failed-chunks.json');
    await fs.writeFile(failedPath, JSON.stringify(this.failedChunks, null, 2));
    console.log(`⚠️  Saved failed chunks to ${failedPath}`);
  }

  /**
   * Get category distribution
   */
  getCategoryDistribution() {
    const distribution = {};
    for (const embedding of this.processedEmbeddings) {
      const category = embedding.metadata.category;
      distribution[category] = (distribution[category] || 0) + 1;
    }
    return distribution;
  }

  /**
   * Estimate costs
   */
  estimateCosts() {
    // OpenAI pricing for text-embedding-ada-002: $0.0001 per 1K tokens
    const costPer1000Tokens = 0.0001;
    const estimatedCost = (this.totalTokensUsed / 1000) * costPer1000Tokens;
    
    console.log(`💰 Estimated cost: $${estimatedCost.toFixed(4)}`);
    
    // Monthly cost estimate for re-processing (unlikely)
    const monthlyCost = estimatedCost * 12; // If updated monthly
    console.log(`📅 Annual re-processing cost: $${monthlyCost.toFixed(2)}`);
  }

  /**
   * Delay helper function
   */
  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// Helper function to create Supabase-ready format
function createSupabaseFormat(embeddings) {
  return embeddings.map(emb => ({
    id: emb.id,
    content: emb.content,
    title: emb.title,
    embedding: emb.embedding,
    metadata: emb.metadata,
    tokens: emb.tokens,
    created_at: new Date().toISOString()
  }));
}

// Run the generator if called directly
if (require.main === module) {
  const generator = new EmbeddingGenerator();
  generator.generate().catch(console.error);
}

module.exports = { EmbeddingGenerator, createSupabaseFormat };