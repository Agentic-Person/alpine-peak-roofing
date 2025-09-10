#!/usr/bin/env node

/**
 * Deploy the knowledge_content table with vector support
 */

const SUPABASE_ACCESS_TOKEN = 'sbp_86f37a9af098760663734873dba7ebe6b97ace92';
const PROJECT_ID = 'adueyerxzutuuwtxyage';

const knowledgeTableSQL = `
CREATE TABLE knowledge_content (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  category_id UUID REFERENCES content_categories(id) ON DELETE CASCADE,
  title VARCHAR(500) NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  tags TEXT[],
  search_keywords TEXT[],
  slug VARCHAR(200) UNIQUE,
  source_url VARCHAR(500),
  word_count INTEGER,
  char_count INTEGER,
  
  -- LLM-specific fields
  embedding vector(1536),
  embedding_model VARCHAR(100) DEFAULT 'text-embedding-ada-002',
  embedding_created_at TIMESTAMP WITH TIME ZONE,
  
  -- Metadata
  priority INTEGER DEFAULT 5,
  is_active BOOLEAN DEFAULT true,
  last_reviewed_at TIMESTAMP WITH TIME ZONE,
  review_notes TEXT,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);`;

async function deployKnowledgeTable() {
  console.log('🚀 Creating knowledge_content table with vector support...');

  try {
    const response = await fetch(`https://api.supabase.com/v1/projects/${PROJECT_ID}/database/query`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${SUPABASE_ACCESS_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ query: knowledgeTableSQL })
    });

    if (response.ok) {
      console.log('✅ knowledge_content table created successfully!');
      return true;
    } else {
      const error = await response.text();
      console.error('❌ Error creating table:', error);
      return false;
    }
  } catch (error) {
    console.error('❌ Failed to create table:', error.message);
    return false;
  }
}

if (require.main === module) {
  deployKnowledgeTable().then(success => {
    process.exit(success ? 0 : 1);
  });
}

module.exports = deployKnowledgeTable;