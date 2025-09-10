#!/usr/bin/env node

/**
 * Generate embeddings for knowledge base content using OpenAI API
 */

const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = 'https://adueyerxzutuuwtxyage.supabase.co';
const SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFkdWV5ZXJ4enV0dXV3dHh5YWdlIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NzAxNzk5MSwiZXhwIjoyMDcyNTkzOTkxfQ.Fwyqe-JS-qcno7bjhftM-Y8izVGsxv5sa3A9UZWBruo';

// Note: User needs to provide their OpenAI API key
const OPENAI_API_KEY = process.env.OPENAI_API_KEY || 'placeholder_openai_api_key_here';

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

async function generateEmbedding(text) {
  if (OPENAI_API_KEY === 'placeholder_openai_api_key_here') {
    console.log('⚠️  OpenAI API key not configured - simulating embedding generation');
    // Return a mock embedding for demonstration
    return Array(1536).fill(0).map(() => Math.random() * 2 - 1);
  }

  try {
    const response = await fetch('https://api.openai.com/v1/embeddings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'text-embedding-ada-002',
        input: text
      })
    });

    const data = await response.json();
    
    if (data.error) {
      throw new Error(`OpenAI API Error: ${data.error.message}`);
    }
    
    return data.data[0].embedding;
  } catch (error) {
    console.error('❌ Error generating embedding:', error.message);
    return null;
  }
}

async function generateEmbeddings() {
  console.log('🚀 Generating embeddings for knowledge base content...\n');

  try {
    // Get content without embeddings
    const { data: content, error } = await supabase
      .from('knowledge_content')
      .select('id, title, content, word_count')
      .is('embedding', null);
    
    if (error) {
      throw new Error(`Failed to fetch content: ${error.message}`);
    }

    if (!content || content.length === 0) {
      console.log('✅ All content already has embeddings generated!');
      return;
    }

    console.log(`📄 Found ${content.length} items without embeddings`);

    let successCount = 0;

    for (const item of content) {
      console.log(`\n🔄 Processing: ${item.title} (${item.word_count} words)`);
      
      // Combine title and content for better embeddings
      const textForEmbedding = `${item.title}\n\n${item.content}`;
      
      // Clean and truncate if necessary (OpenAI limit ~8000 tokens)
      const cleanText = textForEmbedding
        .replace(/\s+/g, ' ')
        .trim()
        .substring(0, 8000);

      const embedding = await generateEmbedding(cleanText);
      
      if (embedding) {
        // Update the database with the embedding
        const { error: updateError } = await supabase
          .from('knowledge_content')
          .update({
            embedding: JSON.stringify(embedding),
            embedding_model: 'text-embedding-ada-002',
            embedding_created_at: new Date().toISOString()
          })
          .eq('id', item.id);

        if (updateError) {
          console.error(`❌ Failed to update ${item.title}:`, updateError.message);
        } else {
          console.log(`✅ Generated embedding for: ${item.title}`);
          successCount++;
        }
      } else {
        console.error(`❌ Failed to generate embedding for: ${item.title}`);
      }

      // Small delay to respect API rate limits
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    console.log(`\n🎉 Embedding generation completed!`);
    console.log(`📊 Successfully generated embeddings for ${successCount}/${content.length} items`);
    
    if (OPENAI_API_KEY === 'placeholder_openai_api_key_here') {
      console.log('\n⚠️  Note: Mock embeddings were generated for demonstration.');
      console.log('   Set OPENAI_API_KEY environment variable for real embeddings.');
    }

    console.log('\n📋 Next Steps:');
    console.log('1. Deploy n8n RAG workflows');
    console.log('2. Test semantic search functionality');
    console.log('3. Connect ChatWidget to RAG system');

  } catch (error) {
    console.error('\n❌ Embedding generation failed:', error.message);
    process.exit(1);
  }
}

// Run the embedding generation
if (require.main === module) {
  generateEmbeddings();
}

module.exports = generateEmbeddings;