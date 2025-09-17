-- Alpine Peak Roofing CRM System Migration (Memory-Optimized)
-- Version: 2.0 - Simple
-- Date: 2025-09-15
-- Description: CRM schema for voice/text chatbot integration (without vector index)

-- =====================================================
-- CRM TABLES CREATION
-- =====================================================

-- Create leads table for customer information
CREATE TABLE IF NOT EXISTS leads (
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
CREATE TABLE IF NOT EXISTS conversations (
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
CREATE TABLE IF NOT EXISTS email_queue (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    lead_id UUID REFERENCES leads(id) ON DELETE CASCADE,
    email_type TEXT NOT NULL DEFAULT 'knowledge_followup',
    email_content TEXT NOT NULL,
    knowledge_articles JSONB,
    scheduled_at TIMESTAMP WITH TIME ZONE NOT NULL,
    sent_at TIMESTAMP WITH TIME ZONE,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'sent', 'failed', 'cancelled'))
);

-- =====================================================
-- BASIC INDEXES FOR PERFORMANCE
-- =====================================================

-- Leads table indexes
CREATE INDEX IF NOT EXISTS idx_leads_email ON leads(email);
CREATE INDEX IF NOT EXISTS idx_leads_session_id ON leads(session_id);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at);
CREATE INDEX IF NOT EXISTS idx_leads_lead_score ON leads(lead_score);
CREATE INDEX IF NOT EXISTS idx_leads_priority ON leads(priority);

-- Conversations table indexes
CREATE INDEX IF NOT EXISTS idx_conversations_lead_id ON conversations(lead_id);
CREATE INDEX IF NOT EXISTS idx_conversations_session_id ON conversations(session_id);
CREATE INDEX IF NOT EXISTS idx_conversations_timestamp ON conversations(timestamp);
CREATE INDEX IF NOT EXISTS idx_conversations_knowledge_used ON conversations(knowledge_used);

-- Email queue table indexes
CREATE INDEX IF NOT EXISTS idx_email_queue_lead_id ON email_queue(lead_id);
CREATE INDEX IF NOT EXISTS idx_email_queue_scheduled_at ON email_queue(scheduled_at);
CREATE INDEX IF NOT EXISTS idx_email_queue_status ON email_queue(status);

-- =====================================================
-- ROW LEVEL SECURITY (RLS)
-- =====================================================

-- Enable RLS on all CRM tables
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_queue ENABLE ROW LEVEL SECURITY;

-- Create policies for service role access (needed for n8n)
CREATE POLICY "Service role can manage leads" ON leads
    FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role can manage conversations" ON conversations
    FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role can manage email queue" ON email_queue
    FOR ALL USING (auth.role() = 'service_role');

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
DROP TRIGGER IF EXISTS update_leads_updated_at ON leads;
CREATE TRIGGER update_leads_updated_at BEFORE UPDATE ON leads
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();