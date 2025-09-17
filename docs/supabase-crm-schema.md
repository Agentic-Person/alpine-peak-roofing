# Supabase CRM Database Schema

This document outlines the database schema required for the Alpine Peak Roofing Supabase CRM integration with the n8n voice chatbot workflow.

## Overview

The CRM system captures leads, logs conversations, and manages follow-up email queues through three main tables in Supabase. The system integrates with a vector-powered knowledge base for RAG (Retrieval Augmented Generation) functionality, enabling intelligent chatbot responses and knowledge-based follow-up emails.

### Key Features
- **Voice-Enhanced Lead Scoring**: +15 bonus points for voice interactions
- **Vector-Powered RAG**: 566 knowledge base entries with 1536-dimensional embeddings
- **Automated Email Queuing**: Follow-up emails with relevant knowledge base content
- **Real-time Conversation Logging**: Complete audit trail of all interactions

## Tables

### 1. leads

Primary table for storing lead information captured through the chatbot.

```sql
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

-- Indexes for performance
CREATE INDEX idx_leads_email ON leads(email);
CREATE INDEX idx_leads_session_id ON leads(session_id);
CREATE INDEX idx_leads_created_at ON leads(created_at);
CREATE INDEX idx_leads_lead_score ON leads(lead_score);
CREATE INDEX idx_leads_priority ON leads(priority);
```

**Field Descriptions:**
- `id`: Unique identifier for each lead
- `email`: Lead's email address (extracted from conversation or placeholder)
- `name`: Lead's name (from user_data or "Chatbot Lead")
- `phone`: Optional phone number (for future enhancement)
- `session_id`: Unique session tracking identifier
- `lead_score`: Calculated buying intent score (10-100)
- `lead_source`: Whether lead came from voice or text chatbot
- `intent`: Detected intent from conversation analysis
- `priority`: Urgency level based on intent
- `created_at`: When lead was first captured
- `updated_at`: When lead was last modified

### 2. conversations

Logs all chatbot interactions for complete conversation history.

```sql
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

-- Indexes for performance
CREATE INDEX idx_conversations_lead_id ON conversations(lead_id);
CREATE INDEX idx_conversations_session_id ON conversations(session_id);
CREATE INDEX idx_conversations_timestamp ON conversations(timestamp);
CREATE INDEX idx_conversations_knowledge_used ON conversations(knowledge_used);
```

**Field Descriptions:**
- `id`: Unique identifier for each conversation
- `lead_id`: Foreign key linking to leads table
- `session_id`: Session identifier for grouping related messages
- `message`: User's input message
- `response`: AI-generated response
- `input_type`: Whether input was voice or text
- `knowledge_used`: Whether RAG knowledge base was utilized
- `timestamp`: When the conversation occurred

### 3. email_queue

Manages automated follow-up emails with knowledge base content.

```sql
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

-- Indexes for performance
CREATE INDEX idx_email_queue_lead_id ON email_queue(lead_id);
CREATE INDEX idx_email_queue_scheduled_at ON email_queue(scheduled_at);
CREATE INDEX idx_email_queue_status ON email_queue(status);
```

**Field Descriptions:**
- `id`: Unique identifier for each email queue entry
- `lead_id`: Foreign key linking to leads table
- `email_type`: Type of email (currently 'knowledge_followup')
- `email_content`: Base email content/template
- `knowledge_articles`: JSON array of relevant knowledge base articles
- `scheduled_at`: When email should be sent (typically 5 minutes after capture)
- `sent_at`: When email was actually sent (null if pending)
- `status`: Current status of the email

## Row Level Security (RLS)

Enable RLS for security:

```sql
-- Enable RLS on all tables
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_queue ENABLE ROW LEVEL SECURITY;

-- Create policies for authenticated users (service role)
CREATE POLICY "Service role can manage leads" ON leads
    FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role can manage conversations" ON conversations
    FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role can manage email queue" ON email_queue
    FOR ALL USING (auth.role() = 'service_role');
```

## Setup Instructions

1. **Create Tables**: Run the SQL commands above in your Supabase SQL editor
2. **Configure n8n Credentials**: Set up Supabase API credentials in n8n with your:
   - Project URL
   - Service Role Key (for server-side operations)
3. **Update Workflow**: Import the updated workflow JSON file
4. **Test Integration**: Verify data flows correctly through all tables

## Data Flow

1. **User Interaction** → Chatbot processes message
2. **Lead Capture** → Creates/updates record in `leads` table
3. **Conversation Logging** → Stores interaction in `conversations` table
4. **Email Queue** → If email captured + knowledge used, adds to `email_queue`

## Lead Scoring Algorithm

**Base Score**: 10 points
- **Voice Interaction**: +15 points (higher engagement)
- **Emergency Intent**: +50 points
- **Estimation Request**: +40 points
- **Scheduling Request**: +35 points
- **Email Provided**: +25 points
- **Long Message** (>100 chars): +5 points

**Maximum Score**: 100 points

## Monitoring Queries

Useful queries for monitoring CRM performance:

```sql
-- Lead sources breakdown
SELECT lead_source, COUNT(*) as count, AVG(lead_score) as avg_score
FROM leads
GROUP BY lead_source;

-- High-priority leads
SELECT email, name, intent, lead_score, created_at
FROM leads
WHERE priority = 'urgent' OR lead_score > 80
ORDER BY created_at DESC;

-- Conversation volume by type
SELECT input_type, COUNT(*) as conversations, COUNT(DISTINCT session_id) as sessions
FROM conversations
WHERE timestamp > NOW() - INTERVAL '7 days'
GROUP BY input_type;

-- Email queue status
SELECT status, COUNT(*) as count
FROM email_queue
GROUP BY status;
```

## Vector-Powered Knowledge Base Integration

### Overview

The CRM system integrates seamlessly with a vector-powered knowledge base containing 566 roofing-related documents with 1536-dimensional embeddings (OpenAI text-embedding-ada-002). This enables sophisticated RAG functionality for both chatbot responses and automated follow-up emails.

### Knowledge Base Table Structure

```sql
-- Existing knowledge_base table (read-only reference)
knowledge_base (
    id TEXT PRIMARY KEY,
    content TEXT NOT NULL,
    title TEXT,
    embedding vector(1536),  -- OpenAI ada-002 embeddings
    tokens INTEGER,
    metadata JSONB,          -- Category, urgency, season, etc.
    created_at TIMESTAMPTZ,
    updated_at TIMESTAMPTZ
);
```

### Vector Indexes (Already Configured)

The following high-performance indexes are already in place:

1. **`knowledge_base_embedding_idx`** - IVFFlat vector similarity search (100 lists)
2. **`knowledge_base_category_idx`** - Category-based filtering
3. **`knowledge_base_content_fts_idx`** - Full-text search (GIN)
4. **`knowledge_base_metadata_idx`** - Metadata JSON search (GIN)
5. **`knowledge_base_urgency_idx`** - Urgency-based filtering

### RAG Workflow Integration

#### 1. Conversation Enhancement
When `knowledge_used = TRUE` in the conversations table, it indicates that the RAG system:
- Performed vector similarity search on user query
- Retrieved relevant knowledge base content
- Enhanced the AI response with authoritative information
- Stored the interaction for follow-up processing

#### 2. Email Queue Knowledge Articles
The `knowledge_articles` JSONB field in `email_queue` contains:
```json
[
  {
    "id": "chunk_ea2939894bd7",
    "title": "Commercial Roofing",
    "excerpt": "A damaged or leaky roof can be...",
    "similarity_score": 0.94,
    "category": "emergency"
  }
]
```

#### 3. Vector Search Functions

For advanced RAG operations, use the functions in `supabase-vector-operations.sql`:

```sql
-- Semantic similarity search
SELECT * FROM search_knowledge_semantic(query_embedding, 0.7, 5);

-- Hybrid search (vector + full-text)
SELECT * FROM search_knowledge_hybrid(query_text, query_embedding, 0.6, 10);

-- Category-filtered search
SELECT * FROM search_knowledge_by_category(query_embedding, 'emergency', 5);
```

### Performance Metrics

- **Knowledge Base Size**: 566 documents
- **Embedding Coverage**: 100% (all entries have embeddings)
- **Vector Dimensions**: 1536 (OpenAI text-embedding-ada-002)
- **Search Performance**: Sub-100ms for similarity queries
- **Index Type**: IVFFlat optimized for cosine similarity

### Integration with n8n Workflow

1. **User Query** → Vector embedding generation (OpenAI API)
2. **Similarity Search** → Retrieve top 3-5 relevant knowledge entries
3. **Context Enhancement** → Inject knowledge into AI prompt
4. **Response Generation** → AI response with authoritative information
5. **CRM Logging** → Record interaction with `knowledge_used = TRUE`
6. **Email Queue** → Add follow-up email with knowledge articles (if email captured)

### Monitoring and Maintenance

Use these queries to monitor vector performance:

```sql
-- Check vector index statistics
SELECT * FROM vector_index_stats();

-- Monitor embedding coverage
SELECT
    COUNT(*) as total_rows,
    COUNT(embedding) as rows_with_embeddings,
    ROUND(COUNT(embedding) * 100.0 / COUNT(*), 2) as coverage_percent
FROM knowledge_base;

-- Find missing embeddings
SELECT * FROM check_missing_embeddings();
```

## Future Enhancements

- **Phone Number Capture**: Add phone field validation and capture
- **Email Templates**: Create multiple email template types
- **Lead Scoring ML**: Implement machine learning for dynamic scoring
- **Real-time Dashboard**: Use Supabase real-time subscriptions
- **Integration APIs**: Connect with external CRM systems if needed