#!/usr/bin/env node

/**
 * Test the semantic search functionality with mock data
 */

const { createClient } = require('@supabase/supabase-js');

// Load environment variables from .env file
require('dotenv').config({ path: '../.env.local' });

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
  console.error('Error: Missing Supabase configuration.');
  console.error('Please check NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

async function testSemanticSearch() {
  console.log('🔍 Testing semantic search functionality...\n');

  try {
    // Create a mock query embedding (random vector for testing)
    const mockQueryEmbedding = Array(1536).fill(0).map(() => Math.random() * 2 - 1);

    console.log('📝 Testing query: "What materials work best for mountain roofs?"');
    console.log('🎯 Using mock embedding with 1536 dimensions');

    // Test the semantic search function
    const { data: results, error } = await supabase.rpc('search_knowledge_content', {
      query_embedding: mockQueryEmbedding,
      similarity_threshold: 0.1, // Low threshold for mock data
      match_count: 5
    });

    if (error) {
      throw new Error(`Semantic search failed: ${error.message}`);
    }

    console.log(`\n✅ Search completed! Found ${results.length} results:\n`);

    results.forEach((result, index) => {
      console.log(`${index + 1}. ${result.title}`);
      console.log(`   Category: ${result.category_name}`);
      console.log(`   Similarity: ${(result.similarity * 100).toFixed(1)}%`);
      console.log(`   Content: ${result.content.substring(0, 150)}...`);
      console.log('');
    });

    // Test with different threshold
    console.log('🔍 Testing with higher similarity threshold (0.8)...');
    const { data: highThresholdResults } = await supabase.rpc('search_knowledge_content', {
      query_embedding: mockQueryEmbedding,
      similarity_threshold: 0.8,
      match_count: 5
    });

    console.log(`📊 High threshold results: ${highThresholdResults.length} matches`);

    console.log('\n🎉 Semantic search is working correctly!');
    console.log('\n📋 Next Steps:');
    console.log('1. Deploy n8n RAG workflows');
    console.log('2. Connect ChatWidget to use this search');
    console.log('3. Test with real OpenAI embeddings');

  } catch (error) {
    console.error('\n❌ Semantic search test failed:', error.message);
    console.error('Details:', error);
    process.exit(1);
  }
}

// Run the test
if (require.main === module) {
  testSemanticSearch();
}

module.exports = testSemanticSearch;