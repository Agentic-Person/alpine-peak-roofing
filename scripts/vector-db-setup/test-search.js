#!/usr/bin/env node

/**
 * Alpine Peak Roofing - Vector Search Test Suite
 * 
 * Test the vector database setup with common roofing queries
 */

const { createClient } = require('@supabase/supabase-js');
const axios = require('axios');

// Configuration
const CONFIG = {
  supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
  supabaseServiceKey: process.env.SUPABASE_SERVICE_ROLE_KEY,
  openaiApiKey: process.env.OPENAI_API_KEY,
  embeddingModel: 'text-embedding-ada-002'
};

// Test queries representing common customer inquiries
const TEST_QUERIES = [
  {
    category: 'Emergency',
    query: "My roof is leaking water into my living room after the storm last night",
    expectedIntent: 'emergency',
    expectedCategories: ['emergency', 'maintenance']
  },
  {
    category: 'Materials - Hail Resistance', 
    query: "What's the best shingle type for Colorado hail damage protection?",
    expectedIntent: 'product_inquiry',
    expectedCategories: ['materials', 'climate']
  },
  {
    category: 'Seasonal Preparation',
    query: "How should I prepare my roof for Denver winter snow loads?",
    expectedIntent: 'maintenance',
    expectedCategories: ['maintenance', 'climate']
  },
  {
    category: 'Commercial Systems',
    query: "TPO membrane installation best practices for commercial buildings",
    expectedIntent: 'product_inquiry', 
    expectedCategories: ['commercial', 'materials']
  },
  {
    category: 'Cost Estimation',
    query: "How much does a metal roof cost for a 2000 sq ft house in Denver?",
    expectedIntent: 'estimation_request',
    expectedCategories: ['materials', 'pricing']
  },
  {
    category: 'Installation Process',
    query: "What's involved in proper roof ventilation installation?",
    expectedIntent: 'product_inquiry',
    expectedCategories: ['installation', 'materials']
  },
  {
    category: 'Insurance Claims',
    query: "Help with roof insurance claim after hail damage",
    expectedIntent: 'general',
    expectedCategories: ['maintenance', 'emergency']
  },
  {
    category: 'Maintenance',
    query: "When should I schedule my annual roof inspection?",
    expectedIntent: 'scheduling',
    expectedCategories: ['maintenance', 'general']
  }
];

class VectorSearchTester {
  constructor() {
    this.supabase = createClient(CONFIG.supabaseUrl, CONFIG.supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    });
    
    this.testResults = [];
    this.totalQueries = 0;
    this.successfulQueries = 0;
  }

  /**
   * Run all tests
   */
  async runTests() {
    try {
      console.log('🧪 Starting Vector Search Test Suite...\n');
      
      // Validate setup
      await this.validateSetup();
      
      // Test database statistics
      await this.testDatabaseStats();
      
      // Run search tests
      console.log('🔍 Testing search queries...\n');
      
      for (let i = 0; i < TEST_QUERIES.length; i++) {
        const testCase = TEST_QUERIES[i];
        console.log(`📝 Test ${i + 1}/${TEST_QUERIES.length}: ${testCase.category}`);
        console.log(`   Query: "${testCase.query}"`);
        
        await this.testSingleQuery(testCase, i + 1);
        console.log(''); // Empty line between tests
        
        // Small delay between tests
        await this.delay(500);
      }
      
      // Generate test report
      await this.generateTestReport();
      
      console.log('✅ Test suite complete!\n');
      this.displaySummary();
      
    } catch (error) {
      console.error('❌ Test suite failed:', error);
      throw error;
    }
  }

  /**
   * Validate the setup
   */
  async validateSetup() {
    console.log('🔧 Validating setup...');
    
    // Check environment variables
    if (!CONFIG.supabaseUrl || !CONFIG.supabaseServiceKey || !CONFIG.openaiApiKey) {
      throw new Error('Missing required environment variables');
    }
    
    // Test database connection
    const { error } = await this.supabase.from('knowledge_base').select('id').limit(1);
    if (error) {
      throw new Error(`Database connection failed: ${error.message}`);
    }
    
    console.log('✅ Setup validation passed\n');
  }

  /**
   * Test database statistics
   */
  async testDatabaseStats() {
    try {
      console.log('📊 Testing database statistics...');
      
      const { data: stats, error } = await this.supabase
        .rpc('get_knowledge_base_stats')
        .single();
      
      if (error) {
        console.warn('⚠️  Could not get database stats:', error.message);
        return;
      }
      
      console.log(`   Total chunks: ${stats.total_chunks || 0}`);
      console.log(`   Total tokens: ${stats.total_tokens?.toLocaleString() || 'Unknown'}`);
      
      if (stats.categories && typeof stats.categories === 'object') {
        const categories = Object.keys(stats.categories);
        console.log(`   Categories: ${categories.join(', ')}`);
      }
      
      console.log('✅ Database stats retrieved\n');
      
    } catch (error) {
      console.warn('⚠️  Database stats test failed:', error.message, '\n');
    }
  }

  /**
   * Test a single search query
   */
  async testSingleQuery(testCase, testNumber) {
    const startTime = Date.now();
    let result = {
      testNumber,
      category: testCase.category,
      query: testCase.query,
      success: false,
      error: null,
      embedding_time: 0,
      search_time: 0,
      total_time: 0,
      results_count: 0,
      top_similarity: 0,
      relevant_categories: []
    };

    try {
      // Step 1: Generate embedding
      const embeddingStart = Date.now();
      const embedding = await this.generateEmbedding(testCase.query);
      result.embedding_time = Date.now() - embeddingStart;

      if (!embedding) {
        throw new Error('Failed to generate embedding');
      }

      // Step 2: Search knowledge base
      const searchStart = Date.now();
      const searchResults = await this.searchKnowledgeBase(embedding, testCase);
      result.search_time = Date.now() - searchStart;

      // Step 3: Analyze results
      result.results_count = searchResults.length;
      
      if (searchResults.length > 0) {
        result.top_similarity = Math.round(searchResults[0].similarity * 100) / 100;
        result.relevant_categories = [...new Set(
          searchResults
            .filter(r => r.similarity > 0.75)
            .map(r => r.metadata?.category)
            .filter(Boolean)
        )];
        
        result.success = true;
        this.successfulQueries++;
      }

      result.total_time = Date.now() - startTime;
      
      // Display results
      this.displayTestResult(result, searchResults);
      
    } catch (error) {
      result.error = error.message;
      result.total_time = Date.now() - startTime;
      
      console.log(`   ❌ Test failed: ${error.message}`);
    }

    this.testResults.push(result);
    this.totalQueries++;
  }

  /**
   * Generate embedding for query
   */
  async generateEmbedding(query) {
    try {
      const response = await axios.post(
        'https://api.openai.com/v1/embeddings',
        {
          model: CONFIG.embeddingModel,
          input: query + ' Denver Colorado roofing',
          encoding_format: 'float'
        },
        {
          headers: {
            'Authorization': `Bearer ${CONFIG.openaiApiKey}`,
            'Content-Type': 'application/json'
          },
          timeout: 10000
        }
      );

      return response.data.data[0].embedding;
    } catch (error) {
      throw new Error(`Embedding generation failed: ${error.response?.data?.error?.message || error.message}`);
    }
  }

  /**
   * Search knowledge base
   */
  async searchKnowledgeBase(embedding, testCase) {
    const { data, error } = await this.supabase
      .rpc('search_knowledge_base', {
        query_embedding: embedding,
        query_text: testCase.query,
        match_threshold: 0.70, // Lower threshold for testing
        match_count: 5,
        filter_category: null,
        filter_urgency: testCase.expectedIntent === 'emergency' ? 'emergency' : null
      });

    if (error) {
      throw new Error(`Search failed: ${error.message}`);
    }

    return data || [];
  }

  /**
   * Display test result
   */
  displayTestResult(result, searchResults) {
    if (result.success) {
      console.log(`   ✅ Found ${result.results_count} results`);
      console.log(`   📈 Top similarity: ${result.top_similarity}`);
      console.log(`   ⏱️  Total time: ${result.total_time}ms (embed: ${result.embedding_time}ms, search: ${result.search_time}ms)`);
      
      if (result.relevant_categories.length > 0) {
        console.log(`   🏷️  Categories: ${result.relevant_categories.join(', ')}`);
      }
      
      // Show top result
      if (searchResults.length > 0) {
        const topResult = searchResults[0];
        const preview = topResult.content.substring(0, 100) + '...';
        console.log(`   📄 Top result: "${topResult.title || 'Untitled'}" (${preview})`);
      }
    } else {
      console.log(`   ❌ Failed: ${result.error}`);
    }
  }

  /**
   * Generate test report
   */
  async generateTestReport() {
    const report = {
      testSuite: 'Alpine Peak Roofing Vector Search',
      timestamp: new Date().toISOString(),
      summary: {
        totalTests: this.totalQueries,
        successfulTests: this.successfulQueries,
        failedTests: this.totalQueries - this.successfulQueries,
        successRate: Math.round((this.successfulQueries / this.totalQueries) * 100)
      },
      performance: {
        avgTotalTime: Math.round(this.testResults.reduce((sum, r) => sum + r.total_time, 0) / this.testResults.length),
        avgEmbeddingTime: Math.round(this.testResults.reduce((sum, r) => sum + r.embedding_time, 0) / this.testResults.length),
        avgSearchTime: Math.round(this.testResults.reduce((sum, r) => sum + r.search_time, 0) / this.testResults.length),
        avgResultsCount: Math.round(this.testResults.reduce((sum, r) => sum + r.results_count, 0) / this.testResults.length),
        avgTopSimilarity: Math.round(this.testResults.reduce((sum, r) => sum + r.top_similarity, 0) / this.testResults.length * 100) / 100
      },
      detailedResults: this.testResults
    };

    // Save report
    const fs = require('fs').promises;
    const reportPath = './processed-content/test-report.json';
    await fs.writeFile(reportPath, JSON.stringify(report, null, 2));
    
    console.log(`📊 Test report saved to ${reportPath}`);
  }

  /**
   * Display summary
   */
  displaySummary() {
    console.log('📊 TEST SUMMARY');
    console.log('================');
    console.log(`Total Tests: ${this.totalQueries}`);
    console.log(`Successful: ${this.successfulQueries}`);
    console.log(`Failed: ${this.totalQueries - this.successfulQueries}`);
    console.log(`Success Rate: ${Math.round((this.successfulQueries / this.totalQueries) * 100)}%`);
    
    if (this.testResults.length > 0) {
      const avgTime = Math.round(this.testResults.reduce((sum, r) => sum + r.total_time, 0) / this.testResults.length);
      const avgSimilarity = Math.round(this.testResults.reduce((sum, r) => sum + r.top_similarity, 0) / this.testResults.length * 100) / 100;
      
      console.log(`Average Response Time: ${avgTime}ms`);
      console.log(`Average Top Similarity: ${avgSimilarity}`);
    }
    
    console.log('\n🎯 RECOMMENDATIONS:');
    
    if (this.successfulQueries === this.totalQueries) {
      console.log('✅ All tests passed! Your vector search is working perfectly.');
    } else if (this.successfulQueries >= this.totalQueries * 0.8) {
      console.log('🔶 Most tests passed. Consider fine-tuning similarity thresholds.');
    } else {
      console.log('🔴 Many tests failed. Check your knowledge base content and embeddings.');
    }
    
    const avgTime = this.testResults.reduce((sum, r) => sum + r.total_time, 0) / this.testResults.length;
    if (avgTime < 500) {
      console.log('⚡ Excellent response times!');
    } else if (avgTime < 1000) {
      console.log('👍 Good response times.');
    } else {
      console.log('⏰ Consider optimizing for better response times.');
    }
  }

  /**
   * Delay helper
   */
  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// Run tests if called directly
if (require.main === module) {
  const tester = new VectorSearchTester();
  tester.runTests().catch(console.error);
}

module.exports = VectorSearchTester;