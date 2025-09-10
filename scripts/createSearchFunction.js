#!/usr/bin/env node

/**
 * Create the semantic search function in Supabase
 */

const SUPABASE_ACCESS_TOKEN = 'sbp_86f37a9af098760663734873dba7ebe6b97ace92';
const PROJECT_ID = 'adueyerxzutuuwtxyage';

const searchFunctionSQL = `
CREATE OR REPLACE FUNCTION search_knowledge_content(
  query_embedding vector(1536),
  similarity_threshold float DEFAULT 0.78,
  match_count int DEFAULT 5
)
RETURNS TABLE(
  id uuid,
  title varchar,
  content text,
  category_name varchar,
  tags text[],
  priority integer,
  similarity float
) 
LANGUAGE sql
AS $$
  SELECT 
    kc.id,
    kc.title,
    kc.content,
    cc.name AS category_name,
    kc.tags,
    kc.priority,
    1 - (kc.embedding <=> query_embedding) AS similarity
  FROM knowledge_content kc
  JOIN content_categories cc ON kc.category_id = cc.id
  WHERE kc.embedding IS NOT NULL
    AND kc.is_active = true
    AND 1 - (kc.embedding <=> query_embedding) > similarity_threshold
  ORDER BY kc.embedding <=> query_embedding
  LIMIT match_count;
$$;
`;

async function createSearchFunction() {
  console.log('🔧 Creating semantic search function in Supabase...');

  try {
    const response = await fetch(`https://api.supabase.com/v1/projects/${PROJECT_ID}/database/query`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${SUPABASE_ACCESS_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ query: searchFunctionSQL })
    });

    if (response.ok) {
      console.log('✅ search_knowledge_content function created successfully!');
      console.log('\n📋 Function features:');
      console.log('- Cosine similarity search using pgvector');
      console.log('- Configurable similarity threshold (default: 0.78)');
      console.log('- Configurable match count (default: 5)');
      console.log('- Returns category names and similarity scores');
      console.log('- Only searches active content with embeddings');
      return true;
    } else {
      const error = await response.text();
      console.error('❌ Error creating function:', error);
      return false;
    }
  } catch (error) {
    console.error('❌ Failed to create function:', error.message);
    return false;
  }
}

if (require.main === module) {
  createSearchFunction().then(success => {
    process.exit(success ? 0 : 1);
  });
}

module.exports = createSearchFunction;