#!/usr/bin/env node

const { createClient } = require('@supabase/supabase-js');

// Configuration
const CONFIG = {
  supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
  supabaseServiceKey: process.env.SUPABASE_SERVICE_ROLE_KEY
};

const supabase = createClient(CONFIG.supabaseUrl, CONFIG.supabaseServiceKey);

async function testSearch() {
  try {
    console.log('🧪 Testing vector search functionality...');
    
    // Get a sample embedding from the database
    console.log('📄 Getting sample embedding...');
    const { data: sample, error } = await supabase
      .from('knowledge_base')
      .select('embedding, title')
      .limit(1);
      
    if (error) {
      console.log('❌ Error getting sample:', error);
      return;
    }
    
    if (!sample || sample.length === 0) {
      console.log('❌ No sample data found');
      return;
    }
    
    const sampleEmbedding = sample[0].embedding;
    console.log(`✅ Sample embedding length: ${sampleEmbedding.length}`);
    console.log(`📋 Sample title: "${sample[0].title}"`);
    
    // Test search with sample embedding - should find itself
    console.log('🔍 Testing search with sample embedding...');
    const { data: results, error: searchError } = await supabase
      .rpc('search_knowledge_base', {
        query_embedding: sampleEmbedding,
        query_text: null,
        match_threshold: 0.50,
        match_count: 3
      });
      
    if (searchError) {
      console.log('❌ Search error:', searchError);
      return;
    }
    
    console.log(`🎯 Search results: ${results?.length || 0} found`);
    
    if (results && results.length > 0) {
      console.log('📊 Results:');
      results.forEach((result, index) => {
        console.log(`   ${index + 1}. "${result.title}" (similarity: ${result.similarity.toFixed(4)})`);
        console.log(`      Category: ${result.metadata?.category || 'N/A'}`);
        console.log(`      Preview: ${result.content.substring(0, 100)}...`);
        console.log('');
      });
    }
    
    // Test with lower threshold
    console.log('🔍 Testing with lower threshold (0.30)...');
    const { data: results2, error: searchError2 } = await supabase
      .rpc('search_knowledge_base', {
        query_embedding: sampleEmbedding,
        query_text: null,
        match_threshold: 0.30,
        match_count: 5
      });
      
    if (!searchError2) {
      console.log(`🎯 Lower threshold results: ${results2?.length || 0} found`);
    }
    
  } catch (error) {
    console.log('💥 Test failed:', error);
  }
}

testSearch();