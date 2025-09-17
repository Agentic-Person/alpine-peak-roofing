-- Alpine Peak Roofing CRM System Migration
-- Version: 2.0
-- Date: 2025-09-15
-- Description: Complete CRM schema for voice/text chatbot integration

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "vector";

-- =====================================================
-- CRM TABLES CREATION
-- =====================================================

-- Create leads table for customer information
CREATE TABLE leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT NOT NULL,
    name TEXT,
    phone TEXT,
    session_id TEXT NOT NULL,
    lead_score INTEGER DEFAULT 10,
    lead_source TEXT NOT NULL CHECK (lead_source IN ('voice_chatbot', 'text_chatbot')),
    intent TEXT CHECK (intent IN ('emergency', 'estimation_request', 'scheduling', 'contact_sharing', 'general')),
    priority TEXT CHECK (priority IN ('urgent', 'high', 'normal')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create conversations table for interaction history
CREATE TABLE conversations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    lead_id UUID REFERENCES leads(id) ON DELETE CASCADE,
    session_id TEXT NOT NULL,
    message TEXT NOT NULL,
    response TEXT NOT NULL,
    input_type TEXT NOT NULL CHECK (input_type IN ('voice', 'text')),
    knowledge_used BOOLEAN DEFAULT FALSE,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create email queue table for automated follow-ups
CREATE TABLE email_queue (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    lead_id UUID REFERENCES leads(id) ON DELETE CASCADE,
    email_type TEXT NOT NULL DEFAULT 'knowledge_followup',
    email_content TEXT NOT NULL,
    knowledge_articles JSONB,
    scheduled_at TIMESTAMP WITH TIME ZONE NOT NULL,
    sent_at TIMESTAMP WITH TIME ZONE,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'sent', 'failed', 'cancelled'))
);

-- Knowledge base table (already exists but documenting structure)
CREATE TABLE IF NOT EXISTS knowledge_base (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  embedding vector(1536), -- OpenAI text-embedding-ada-002 dimensions
  metadata JSONB,
  category TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- INDEXES FOR PERFORMANCE
-- =====================================================

-- Leads table indexes
CREATE INDEX idx_leads_email ON leads(email);
CREATE INDEX idx_leads_session_id ON leads(session_id);
CREATE INDEX idx_leads_created_at ON leads(created_at);
CREATE INDEX idx_leads_lead_score ON leads(lead_score);
CREATE INDEX idx_leads_priority ON leads(priority);

-- Conversations table indexes
CREATE INDEX idx_conversations_lead_id ON conversations(lead_id);
CREATE INDEX idx_conversations_session_id ON conversations(session_id);
CREATE INDEX idx_conversations_timestamp ON conversations(timestamp);
CREATE INDEX idx_conversations_knowledge_used ON conversations(knowledge_used);

-- Email queue table indexes
CREATE INDEX idx_email_queue_lead_id ON email_queue(lead_id);
CREATE INDEX idx_email_queue_scheduled_at ON email_queue(scheduled_at);
CREATE INDEX idx_email_queue_status ON email_queue(status);

-- Knowledge base indexes (already exist - managed separately)
-- Vector index: knowledge_base_embedding_idx (IVFFlat with 100 lists)
-- Category index: knowledge_base_category_idx
-- Full-text search: knowledge_base_content_fts_idx
-- See supabase-vector-operations.sql for vector index management

-- =====================================================
-- TRIGGERS AND FUNCTIONS
-- =====================================================

-- Create updated_at trigger function if it doesn't exist
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at on leads table
CREATE TRIGGER update_leads_updated_at BEFORE UPDATE ON leads
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_knowledge_base_updated_at BEFORE UPDATE ON knowledge_base
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- ROW LEVEL SECURITY (RLS)
-- =====================================================

-- Enable RLS on all CRM tables
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_queue ENABLE ROW LEVEL SECURITY;
ALTER TABLE knowledge_base ENABLE ROW LEVEL SECURITY;

-- Create policies for service role access (needed for n8n)
CREATE POLICY "Service role can manage leads" ON leads
    FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role can manage conversations" ON conversations
    FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role can manage email queue" ON email_queue
    FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Allow service role access to knowledge_base" ON knowledge_base
FOR ALL USING (auth.role() = 'service_role');

-- =====================================================
-- VERIFICATION QUERIES
-- =====================================================

-- Verify all tables were created
-- SELECT table_name, table_type
-- FROM information_schema.tables
-- WHERE table_schema = 'public'
-- AND table_name IN ('leads', 'conversations', 'email_queue');

-- Check indexes were created
-- SELECT indexname, tablename
-- FROM pg_indexes
-- WHERE tablename IN ('leads', 'conversations', 'email_queue')
-- ORDER BY tablename, indexname;

-- Verify RLS is enabled
-- SELECT schemaname, tablename, rowsecurity
-- FROM pg_tables
-- WHERE tablename IN ('leads', 'conversations', 'email_queue');

-- Check policies were created
-- SELECT schemaname, tablename, policyname
-- FROM pg_policies
-- WHERE tablename IN ('leads', 'conversations', 'email_queue');

-- =====================================================
-- MONITORING QUERIES
-- =====================================================

-- Lead sources breakdown
-- SELECT
--     lead_source,
--     COUNT(*) as total_leads,
--     AVG(lead_score) as avg_score,
--     COUNT(CASE WHEN priority = 'urgent' THEN 1 END) as urgent_leads
-- FROM leads
-- WHERE created_at > NOW() - INTERVAL '30 days'
-- GROUP BY lead_source;

-- High-priority leads
-- SELECT
--     email,
--     name,
--     intent,
--     lead_score,
--     lead_source,
--     created_at
-- FROM leads
-- WHERE priority = 'urgent' OR lead_score > 80
-- ORDER BY created_at DESC;

-- Conversation volume by type
-- SELECT
--     DATE(timestamp) as date,
--     input_type,
--     COUNT(*) as conversations,
--     COUNT(DISTINCT session_id) as unique_sessions
-- FROM conversations
-- WHERE timestamp > NOW() - INTERVAL '7 days'
-- GROUP BY DATE(timestamp), input_type
-- ORDER BY date DESC;

-- Email queue status
-- SELECT
--     status,
--     COUNT(*) as count,
--     AVG(EXTRACT(EPOCH FROM (sent_at - scheduled_at))/60) as avg_delay_minutes
-- FROM email_queue
-- GROUP BY status;

-- =====================================================
-- ANALYTICS VIEWS
-- =====================================================

-- Lead analytics view
CREATE OR REPLACE VIEW lead_analytics AS
SELECT
  DATE_TRUNC('day', created_at) as date,
  intent,
  priority,
  lead_source,
  COUNT(*) as lead_count,
  AVG(lead_score) as avg_lead_score,
  COUNT(*) FILTER (WHERE priority = 'urgent') as urgent_leads,
  COUNT(*) FILTER (WHERE priority = 'high') as high_priority_leads
FROM leads
GROUP BY DATE_TRUNC('day', created_at), intent, priority, lead_source
ORDER BY date DESC;

-- Conversation analytics view
CREATE OR REPLACE VIEW conversation_analytics AS
SELECT
  DATE_TRUNC('day', timestamp) as date,
  input_type,
  COUNT(*) as conversation_count,
  COUNT(DISTINCT session_id) as unique_sessions,
  COUNT(*) FILTER (WHERE knowledge_used = true) as knowledge_based_responses
FROM conversations
GROUP BY DATE_TRUNC('day', timestamp), input_type
ORDER BY date DESC;

-- =====================================================
-- TABLE COMMENTS
-- =====================================================

COMMENT ON TABLE leads IS 'CRM leads captured from voice/text chatbot interactions';
COMMENT ON TABLE conversations IS 'Complete conversation history for all chatbot interactions';
COMMENT ON TABLE email_queue IS 'Automated email follow-up queue with knowledge base content';
COMMENT ON TABLE knowledge_base IS 'Vector database for RAG (Retrieval Augmented Generation)';

COMMENT ON COLUMN leads.lead_score IS 'Lead qualification score: 10 base + bonuses (voice +15, emergency +50, etc.)';
COMMENT ON COLUMN leads.intent IS 'Primary intent detected from user interaction';
COMMENT ON COLUMN leads.priority IS 'Priority level: urgent (emergency), high (estimate/schedule), normal (general)';
COMMENT ON COLUMN conversations.knowledge_used IS 'True if knowledge base was used to generate response';
COMMENT ON COLUMN conversations.input_type IS 'Whether user input was voice or text';
COMMENT ON COLUMN email_queue.knowledge_articles IS 'JSON array of relevant knowledge base articles for follow-up';