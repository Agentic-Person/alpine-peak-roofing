-- Alpine Peak Roofing - Supabase Vector Database Setup
-- Creates tables and functions for vector-powered chatbot knowledge base

-- Enable the vector extension
CREATE EXTENSION IF NOT EXISTS vector;

-- Create the knowledge base table
CREATE TABLE IF NOT EXISTS roofing_knowledge (
    id BIGSERIAL PRIMARY KEY,
    chunk_id TEXT UNIQUE NOT NULL,
    content TEXT NOT NULL,
    embedding vector(1536), -- OpenAI text-embedding-ada-002 dimensions
    tokens INTEGER NOT NULL,
    
    -- Metadata for filtering and routing
    category TEXT NOT NULL CHECK (category IN ('materials', 'climate', 'installation', 'maintenance', 'commercial', 'troubleshooting')),
    subcategory TEXT,
    urgency TEXT NOT NULL CHECK (urgency IN ('emergency', 'high', 'normal', 'informational')),
    season TEXT CHECK (season IN ('spring', 'summer', 'fall', 'winter', 'year-round')),
    location TEXT CHECK (location IN ('denver', 'mountains', 'colorado', 'general')),
    service_type TEXT CHECK (service_type IN ('residential', 'commercial', 'both')),
    complexity TEXT CHECK (complexity IN ('basic', 'intermediate', 'advanced')),
    
    -- Tracking and optimization
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    search_count INTEGER DEFAULT 0,
    relevance_score FLOAT DEFAULT 0.0
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS roofing_knowledge_embedding_idx ON roofing_knowledge 
USING ivfflat (embedding vector_cosine_ops) WITH (lists = 100);

CREATE INDEX IF NOT EXISTS roofing_knowledge_category_idx ON roofing_knowledge (category);
CREATE INDEX IF NOT EXISTS roofing_knowledge_urgency_idx ON roofing_knowledge (urgency);
CREATE INDEX IF NOT EXISTS roofing_knowledge_service_type_idx ON roofing_knowledge (service_type);
CREATE INDEX IF NOT EXISTS roofing_knowledge_location_idx ON roofing_knowledge (location);

-- Function to search knowledge base with filters
CREATE OR REPLACE FUNCTION search_roofing_knowledge(
    query_embedding vector(1536),
    match_threshold float DEFAULT 0.7,
    match_count int DEFAULT 5,
    filter_category text DEFAULT NULL,
    filter_urgency text DEFAULT NULL,
    filter_service_type text DEFAULT NULL,
    filter_location text DEFAULT NULL
)
RETURNS TABLE (
    chunk_id text,
    content text,
    similarity float,
    category text,
    subcategory text,
    urgency text,
    tokens integer,
    metadata jsonb
)
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN QUERY
    SELECT 
        rk.chunk_id,
        rk.content,
        1 - (rk.embedding <=> query_embedding) AS similarity,
        rk.category,
        rk.subcategory,
        rk.urgency,
        rk.tokens,
        jsonb_build_object(
            'season', rk.season,
            'location', rk.location,
            'service_type', rk.service_type,
            'complexity', rk.complexity,
            'search_count', rk.search_count,
            'relevance_score', rk.relevance_score
        ) AS metadata
    FROM roofing_knowledge rk
    WHERE 
        1 - (rk.embedding <=> query_embedding) > match_threshold
        AND (filter_category IS NULL OR rk.category = filter_category)
        AND (filter_urgency IS NULL OR rk.urgency = filter_urgency)
        AND (filter_service_type IS NULL OR rk.service_type = filter_service_type OR rk.service_type = 'both')
        AND (filter_location IS NULL OR rk.location = filter_location OR rk.location = 'general')
    ORDER BY rk.embedding <=> query_embedding
    LIMIT match_count;
END;
$$;

-- Function to get contextual knowledge based on intent
CREATE OR REPLACE FUNCTION get_contextual_knowledge(
    query_embedding vector(1536),
    user_intent text DEFAULT 'general',
    match_count int DEFAULT 3
)
RETURNS TABLE (
    chunk_id text,
    content text,
    similarity float,
    category text,
    urgency text,
    tokens integer
)
LANGUAGE plpgsql
AS $$
DECLARE
    urgency_filter text;
    category_filter text;
BEGIN
    -- Map intent to urgency and category filters
    CASE user_intent
        WHEN 'emergency' THEN 
            urgency_filter := 'emergency';
            category_filter := 'troubleshooting';
        WHEN 'estimation_request' THEN
            urgency_filter := 'high';
            category_filter := 'materials';
        WHEN 'scheduling' THEN
            urgency_filter := 'normal';
            category_filter := 'maintenance';
        ELSE
            urgency_filter := NULL;
            category_filter := NULL;
    END CASE;

    RETURN QUERY
    SELECT * FROM search_roofing_knowledge(
        query_embedding,
        0.7, -- match_threshold
        match_count,
        category_filter,
        urgency_filter,
        NULL, -- filter_service_type
        'colorado' -- filter_location (prioritize Colorado-specific)
    );
END;
$$;

-- Function to update search statistics
CREATE OR REPLACE FUNCTION update_search_stats(chunk_ids text[], relevance_scores float[])
RETURNS void
LANGUAGE plpgsql
AS $$
DECLARE
    i int;
BEGIN
    FOR i IN 1..array_length(chunk_ids, 1) LOOP
        UPDATE roofing_knowledge 
        SET 
            search_count = search_count + 1,
            relevance_score = (relevance_score * search_count + relevance_scores[i]) / (search_count + 1),
            updated_at = NOW()
        WHERE chunk_id = chunk_ids[i];
    END LOOP;
END;
$$;

-- Create chat interaction log table for analytics
CREATE TABLE IF NOT EXISTS chat_interactions (
    id BIGSERIAL PRIMARY KEY,
    session_id TEXT NOT NULL,
    message TEXT NOT NULL,
    response TEXT NOT NULL,
    intent TEXT,
    priority TEXT,
    page_context TEXT,
    ip_address TEXT,
    
    -- Vector search results
    retrieved_chunks TEXT[], -- chunk_ids that were used
    search_query TEXT, -- processed search query
    avg_similarity FLOAT, -- average similarity of retrieved chunks
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for analytics queries
CREATE INDEX IF NOT EXISTS chat_interactions_session_idx ON chat_interactions (session_id);
CREATE INDEX IF NOT EXISTS chat_interactions_intent_idx ON chat_interactions (intent);
CREATE INDEX IF NOT EXISTS chat_interactions_created_at_idx ON chat_interactions (created_at);

-- RLS (Row Level Security) policies for API access
ALTER TABLE roofing_knowledge ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_interactions ENABLE ROW LEVEL SECURITY;

-- Policy for N8n service to read knowledge base
CREATE POLICY "N8n can read roofing knowledge" ON roofing_knowledge
    FOR SELECT USING (true);

-- Policy for N8n service to insert chat logs
CREATE POLICY "N8n can insert chat interactions" ON chat_interactions
    FOR INSERT WITH CHECK (true);

-- Create a view for analytics dashboard
CREATE OR REPLACE VIEW knowledge_analytics AS
SELECT 
    category,
    subcategory,
    COUNT(*) as total_chunks,
    AVG(search_count) as avg_searches,
    AVG(relevance_score) as avg_relevance,
    SUM(tokens) as total_tokens
FROM roofing_knowledge
GROUP BY category, subcategory
ORDER BY avg_searches DESC;

-- Sample data insertion function (for testing)
CREATE OR REPLACE FUNCTION insert_sample_knowledge()
RETURNS void
LANGUAGE plpgsql
AS $$
BEGIN
    -- This would be replaced by your actual embedding pipeline
    INSERT INTO roofing_knowledge (
        chunk_id, content, embedding, tokens, category, subcategory, 
        urgency, season, location, service_type, complexity
    ) VALUES (
        'sample_asphalt_001',
        'Asphalt shingles are the most common roofing material in Colorado, offering good protection against hail and wind when properly installed.',
        '[0.1, 0.2, 0.3]'::vector, -- This would be actual embeddings
        25,
        'materials',
        'asphalt-shingles',
        'normal',
        'year-round',
        'colorado',
        'residential',
        'basic'
    ) ON CONFLICT (chunk_id) DO NOTHING;
END;
$$;

-- Grant permissions for service account
-- GRANT USAGE ON SCHEMA public TO service_role;
-- GRANT SELECT ON roofing_knowledge TO service_role;
-- GRANT INSERT ON chat_interactions TO service_role;
-- GRANT EXECUTE ON FUNCTION search_roofing_knowledge TO service_role;
-- GRANT EXECUTE ON FUNCTION get_contextual_knowledge TO service_role;

COMMENT ON TABLE roofing_knowledge IS 'Vector database for Alpine Peak Roofing knowledge base';
COMMENT ON FUNCTION search_roofing_knowledge IS 'Semantic search with metadata filtering';
COMMENT ON FUNCTION get_contextual_knowledge IS 'Intent-aware knowledge retrieval';
COMMENT ON VIEW knowledge_analytics IS 'Analytics for knowledge base usage and performance';
