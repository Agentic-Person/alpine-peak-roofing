-- Alpine Peak Roofing - Knowledge Base Schema
-- LLM-RAG Integration Database Setup
-- Phase 1: Core Tables and pgvector Setup

-- Enable pgvector extension for embeddings
CREATE EXTENSION IF NOT EXISTS vector;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Content Categories Table
CREATE TABLE content_categories (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR(50) NOT NULL UNIQUE,
  description TEXT,
  icon VARCHAR(50),
  color VARCHAR(20),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert initial categories
INSERT INTO content_categories (name, description, icon, color) VALUES
('faq', 'Frequently Asked Questions', 'HelpCircle', 'blue'),
('glossary', 'Technical Roofing Terminology', 'BookOpen', 'green'),
('knowledge', 'Comprehensive Knowledge Base', 'Brain', 'purple'),
('services', 'Service Descriptions and Details', 'Wrench', 'orange'),
('materials', 'Roofing Materials Information', 'Package', 'red'),
('processes', 'Installation and Repair Processes', 'Settings', 'gray');

-- Knowledge Base Content Table
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
  embedding vector(1536), -- OpenAI text-embedding-ada-002 dimensions
  embedding_model VARCHAR(100) DEFAULT 'text-embedding-ada-002',
  embedding_created_at TIMESTAMP WITH TIME ZONE,
  
  -- Metadata
  priority INTEGER DEFAULT 5, -- 1-10 scale for RAG ranking
  is_active BOOLEAN DEFAULT true,
  last_reviewed_at TIMESTAMP WITH TIME ZONE,
  review_notes TEXT,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Chat Conversations Table
CREATE TABLE chat_conversations (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  session_id VARCHAR(100),
  user_id UUID, -- nullable for anonymous users
  
  -- Conversation metadata
  conversation_title VARCHAR(200),
  total_messages INTEGER DEFAULT 0,
  total_tokens INTEGER DEFAULT 0,
  
  -- Status tracking
  status VARCHAR(20) DEFAULT 'active', -- active, completed, archived
  sentiment VARCHAR(20), -- positive, neutral, negative
  lead_score INTEGER, -- 1-10 quality score
  
  -- Context and outcomes
  resolved BOOLEAN DEFAULT false,
  resolution_type VARCHAR(50), -- info_provided, appointment_scheduled, quote_requested
  follow_up_required BOOLEAN DEFAULT false,
  
  -- Timestamps
  started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_activity_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE
);

-- Chat Messages Table
CREATE TABLE chat_messages (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  conversation_id UUID REFERENCES chat_conversations(id) ON DELETE CASCADE,
  
  -- Message details
  role VARCHAR(20) NOT NULL, -- user, assistant, system
  content TEXT NOT NULL,
  message_type VARCHAR(30) DEFAULT 'text', -- text, image, file, quote_request
  
  -- RAG context
  retrieved_content_ids UUID[], -- references to knowledge_content used
  embedding vector(1536), -- for semantic search
  confidence_score FLOAT, -- RAG retrieval confidence
  
  -- Token usage
  prompt_tokens INTEGER,
  completion_tokens INTEGER,
  total_tokens INTEGER,
  
  -- User feedback
  user_rating INTEGER, -- 1-5 stars
  user_feedback TEXT,
  was_helpful BOOLEAN,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Search Analytics Table
CREATE TABLE search_analytics (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  
  -- Query details
  query_text TEXT NOT NULL,
  query_embedding vector(1536),
  query_type VARCHAR(20) DEFAULT 'semantic', -- semantic, keyword, hybrid
  
  -- Results and performance
  results_count INTEGER,
  top_result_id UUID REFERENCES knowledge_content(id),
  top_result_score FLOAT,
  response_time_ms INTEGER,
  
  -- User interaction
  session_id VARCHAR(100),
  user_clicked BOOLEAN DEFAULT false,
  clicked_result_id UUID,
  time_to_click_ms INTEGER,
  
  -- Context
  source VARCHAR(20) DEFAULT 'chat', -- chat, search, api
  user_agent TEXT,
  ip_address INET,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Content Performance Table
CREATE TABLE content_performance (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  content_id UUID REFERENCES knowledge_content(id) ON DELETE CASCADE,
  
  -- Usage metrics
  retrieval_count INTEGER DEFAULT 0,
  click_count INTEGER DEFAULT 0,
  helpful_votes INTEGER DEFAULT 0,
  unhelpful_votes INTEGER DEFAULT 0,
  
  -- Quality metrics
  avg_relevance_score FLOAT,
  avg_user_rating FLOAT,
  conversion_count INTEGER DEFAULT 0, -- led to quote/appointment
  
  -- Time windows
  last_retrieved_at TIMESTAMP WITH TIME ZONE,
  metrics_updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX idx_knowledge_content_category ON knowledge_content(category_id);
CREATE INDEX idx_knowledge_content_active ON knowledge_content(is_active);
CREATE INDEX idx_knowledge_content_priority ON knowledge_content(priority DESC);
CREATE INDEX idx_knowledge_content_embedding ON knowledge_content USING ivfflat (embedding vector_cosine_ops) WITH (lists = 100);

CREATE INDEX idx_chat_conversations_session ON chat_conversations(session_id);
CREATE INDEX idx_chat_conversations_status ON chat_conversations(status);
CREATE INDEX idx_chat_conversations_activity ON chat_conversations(last_activity_at DESC);

CREATE INDEX idx_chat_messages_conversation ON chat_messages(conversation_id);
CREATE INDEX idx_chat_messages_role ON chat_messages(role);
CREATE INDEX idx_chat_messages_created ON chat_messages(created_at DESC);
CREATE INDEX idx_chat_messages_embedding ON chat_messages USING ivfflat (embedding vector_cosine_ops) WITH (lists = 100);

CREATE INDEX idx_search_analytics_query ON search_analytics(query_text);
CREATE INDEX idx_search_analytics_created ON search_analytics(created_at DESC);
CREATE INDEX idx_search_analytics_session ON search_analytics(session_id);

CREATE INDEX idx_content_performance_content ON content_performance(content_id);
CREATE INDEX idx_content_performance_retrieval ON content_performance(retrieval_count DESC);

-- Row Level Security (RLS) Setup
ALTER TABLE content_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE knowledge_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE search_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_performance ENABLE ROW LEVEL SECURITY;

-- RLS Policies - Content is publicly readable for n8n workflows
CREATE POLICY "Public read access for content" ON content_categories FOR SELECT USING (true);
CREATE POLICY "Public read access for knowledge" ON knowledge_content FOR SELECT USING (is_active = true);

-- Admin policies for content management
CREATE POLICY "Service role full access to categories" ON content_categories FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role full access to knowledge" ON knowledge_content FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role full access to conversations" ON chat_conversations FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role full access to messages" ON chat_messages FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role full access to analytics" ON search_analytics FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role full access to performance" ON content_performance FOR ALL USING (auth.role() = 'service_role');

-- Functions for updating timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_content_categories_updated_at BEFORE UPDATE ON content_categories FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_knowledge_content_updated_at BEFORE UPDATE ON knowledge_content FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function for semantic similarity search
CREATE OR REPLACE FUNCTION search_knowledge_content(
  query_embedding vector(1536),
  match_threshold float DEFAULT 0.78,
  match_count int DEFAULT 10,
  category_filter text DEFAULT NULL
)
RETURNS TABLE (
  id uuid,
  title varchar,
  content text,
  category_name varchar,
  similarity float,
  word_count int,
  priority int
) 
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    kc.id,
    kc.title,
    kc.content,
    cc.name as category_name,
    (kc.embedding <=> query_embedding) * -1 + 1 AS similarity,
    kc.word_count,
    kc.priority
  FROM knowledge_content kc
  JOIN content_categories cc ON kc.category_id = cc.id
  WHERE 
    kc.is_active = true
    AND kc.embedding IS NOT NULL
    AND (category_filter IS NULL OR cc.name = category_filter)
    AND (kc.embedding <=> query_embedding) < (1 - match_threshold)
  ORDER BY 
    kc.priority DESC,
    kc.embedding <=> query_embedding
  LIMIT match_count;
END;
$$;