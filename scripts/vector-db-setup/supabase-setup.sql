-- Alpine Peak Roofing - Vector Database Setup
-- This script sets up the vector database in Supabase for RAG functionality

-- Enable the vector extension
CREATE EXTENSION IF NOT EXISTS vector;

-- Create the knowledge_base table for storing embeddings
CREATE TABLE IF NOT EXISTS knowledge_base (
  id TEXT PRIMARY KEY,
  content TEXT NOT NULL,
  title TEXT,
  embedding vector(1536), -- OpenAI ada-002 produces 1536-dimensional vectors
  tokens INTEGER,
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS knowledge_base_embedding_idx 
ON knowledge_base USING ivfflat (embedding vector_cosine_ops) 
WITH (lists = 100);

-- Create index on metadata for filtering
CREATE INDEX IF NOT EXISTS knowledge_base_metadata_idx 
ON knowledge_base USING GIN (metadata);

-- Create index on category for quick filtering
CREATE INDEX IF NOT EXISTS knowledge_base_category_idx 
ON knowledge_base ((metadata->>'category'));

-- Create index on urgency level for prioritization
CREATE INDEX IF NOT EXISTS knowledge_base_urgency_idx 
ON knowledge_base ((metadata->>'urgency'));

-- Create full-text search index for hybrid search
CREATE INDEX IF NOT EXISTS knowledge_base_content_fts_idx 
ON knowledge_base USING GIN (to_tsvector('english', content));

-- Create function for hybrid search (vector + keyword)
CREATE OR REPLACE FUNCTION search_knowledge_base(
  query_embedding vector(1536),
  query_text TEXT DEFAULT NULL,
  match_threshold FLOAT DEFAULT 0.78,
  match_count INTEGER DEFAULT 10,
  filter_category TEXT DEFAULT NULL,
  filter_urgency TEXT DEFAULT NULL
)
RETURNS TABLE (
  id TEXT,
  content TEXT,
  title TEXT,
  similarity FLOAT,
  tokens INTEGER,
  metadata JSONB
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT
    kb.id,
    kb.content,
    kb.title,
    (1 - (kb.embedding <=> query_embedding)) AS similarity,
    kb.tokens,
    kb.metadata
  FROM knowledge_base kb
  WHERE (kb.embedding <=> query_embedding) < (1 - match_threshold)
    AND (filter_category IS NULL OR kb.metadata->>'category' = filter_category)
    AND (filter_urgency IS NULL OR kb.metadata->>'urgency' = filter_urgency)
    AND (query_text IS NULL OR to_tsvector('english', kb.content) @@ plainto_tsquery('english', query_text))
  ORDER BY kb.embedding <=> query_embedding
  LIMIT match_count;
END;
$$;

-- Create function for category-based search
CREATE OR REPLACE FUNCTION search_by_category(
  category TEXT,
  query_embedding vector(1536),
  match_threshold FLOAT DEFAULT 0.75,
  match_count INTEGER DEFAULT 5
)
RETURNS TABLE (
  id TEXT,
  content TEXT,
  title TEXT,
  similarity FLOAT,
  subcategory TEXT
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT
    kb.id,
    kb.content,
    kb.title,
    (1 - (kb.embedding <=> query_embedding)) AS similarity,
    kb.metadata->>'subcategory' AS subcategory
  FROM knowledge_base kb
  WHERE kb.metadata->>'category' = category
    AND (kb.embedding <=> query_embedding) < (1 - match_threshold)
  ORDER BY kb.embedding <=> query_embedding
  LIMIT match_count;
END;
$$;

-- Create function for emergency content prioritization
CREATE OR REPLACE FUNCTION search_emergency_content(
  query_embedding vector(1536),
  match_count INTEGER DEFAULT 3
)
RETURNS TABLE (
  id TEXT,
  content TEXT,
  title TEXT,
  similarity FLOAT,
  urgency_level TEXT
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT
    kb.id,
    kb.content,
    kb.title,
    (1 - (kb.embedding <=> query_embedding)) AS similarity,
    kb.metadata->>'urgency' AS urgency_level
  FROM knowledge_base kb
  WHERE kb.metadata->>'urgency' IN ('emergency', 'urgent')
  ORDER BY 
    CASE kb.metadata->>'urgency' 
      WHEN 'emergency' THEN 1 
      WHEN 'urgent' THEN 2 
      ELSE 3 
    END,
    kb.embedding <=> query_embedding
  LIMIT match_count;
END;
$$;

-- Create function for seasonal content filtering
CREATE OR REPLACE FUNCTION search_seasonal_content(
  query_embedding vector(1536),
  current_season TEXT,
  match_threshold FLOAT DEFAULT 0.75,
  match_count INTEGER DEFAULT 5
)
RETURNS TABLE (
  id TEXT,
  content TEXT,
  title TEXT,
  similarity FLOAT,
  seasons JSONB
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT
    kb.id,
    kb.content,
    kb.title,
    (1 - (kb.embedding <=> query_embedding)) AS similarity,
    kb.metadata->'seasons' AS seasons
  FROM knowledge_base kb
  WHERE (kb.embedding <=> query_embedding) < (1 - match_threshold)
    AND (
      kb.metadata->'seasons' ? current_season 
      OR kb.metadata->'seasons' ? 'year-round'
    )
  ORDER BY 
    CASE 
      WHEN kb.metadata->'seasons' ? current_season THEN 1
      WHEN kb.metadata->'seasons' ? 'year-round' THEN 2
      ELSE 3
    END,
    kb.embedding <=> query_embedding
  LIMIT match_count;
END;
$$;

-- Create function to get content statistics
CREATE OR REPLACE FUNCTION get_knowledge_base_stats()
RETURNS TABLE (
  total_chunks INTEGER,
  total_tokens BIGINT,
  categories JSONB,
  urgency_levels JSONB,
  avg_similarity_threshold FLOAT
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT
    COUNT(*)::INTEGER AS total_chunks,
    SUM(tokens)::BIGINT AS total_tokens,
    json_object_agg(category, count)::JSONB AS categories,
    json_object_agg(urgency, count)::JSONB AS urgency_levels,
    0.78::FLOAT AS avg_similarity_threshold
  FROM (
    SELECT 
      metadata->>'category' AS category,
      metadata->>'urgency' AS urgency,
      COUNT(*) AS count
    FROM knowledge_base
    GROUP BY GROUPING SETS (
      (metadata->>'category'),
      (metadata->>'urgency')
    )
  ) stats;
END;
$$;

-- Create update trigger to maintain updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_knowledge_base_updated_at
  BEFORE UPDATE ON knowledge_base
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Create a view for easy content browsing
CREATE OR REPLACE VIEW knowledge_base_summary AS
SELECT 
  id,
  title,
  LEFT(content, 200) || '...' AS content_preview,
  metadata->>'category' AS category,
  metadata->>'urgency' AS urgency,
  metadata->>'serviceType' AS service_type,
  metadata->>'complexity' AS complexity,
  tokens,
  created_at
FROM knowledge_base
ORDER BY created_at DESC;

-- Create RLS policies (if using Row Level Security)
-- ALTER TABLE knowledge_base ENABLE ROW LEVEL SECURITY;

-- Policy for read access (adjust based on your auth setup)
-- CREATE POLICY "Allow read access to knowledge base" ON knowledge_base
--   FOR SELECT USING (true);

-- Policy for insert/update (restrict to service role)
-- CREATE POLICY "Allow service role to manage knowledge base" ON knowledge_base
--   FOR ALL USING (auth.role() = 'service_role');

-- Insert some sample data for testing (remove after real data is loaded)
INSERT INTO knowledge_base (id, content, title, embedding, tokens, metadata)
VALUES (
  'test_chunk_001',
  'Alpine Peak Roofing has been serving Denver and surrounding mountain communities for over 25 years. We specialize in residential and commercial roofing solutions.',
  'Company Overview',
  array_fill(0.1, ARRAY[1536])::vector, -- Dummy embedding for testing
  28,
  '{
    "category": "general",
    "urgency": "informational",
    "serviceType": "both",
    "seasons": ["year-round"],
    "location": "denver",
    "complexity": "basic"
  }'::JSONB
) ON CONFLICT (id) DO NOTHING;

-- Create helpful comments for documentation
COMMENT ON TABLE knowledge_base IS 'Stores embedded knowledge base content for RAG functionality';
COMMENT ON COLUMN knowledge_base.embedding IS 'OpenAI ada-002 1536-dimensional embedding vector';
COMMENT ON COLUMN knowledge_base.metadata IS 'Searchable metadata including category, urgency, season, etc.';
COMMENT ON FUNCTION search_knowledge_base IS 'Main search function combining vector similarity and keyword matching';
COMMENT ON FUNCTION search_emergency_content IS 'Prioritized search for emergency and urgent content';
COMMENT ON FUNCTION search_seasonal_content IS 'Search content relevant to current season';

-- Grant necessary permissions (adjust based on your setup)
GRANT USAGE ON SCHEMA public TO postgres, anon, authenticated, service_role;
GRANT ALL ON TABLE knowledge_base TO postgres, service_role;
GRANT SELECT ON TABLE knowledge_base TO anon, authenticated;
GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA public TO postgres, anon, authenticated, service_role;