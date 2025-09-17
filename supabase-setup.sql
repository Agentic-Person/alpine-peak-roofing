-- Enable the pgvector extension
CREATE EXTENSION IF NOT EXISTS vector;

-- Create the knowledge_base table
CREATE TABLE IF NOT EXISTS knowledge_base (
  id SERIAL PRIMARY KEY,
  content TEXT,
  metadata JSONB,
  embedding VECTOR(1536)
);

-- Create the match_documents function for similarity search
CREATE OR REPLACE FUNCTION match_documents(
  query_embedding VECTOR(1536),
  match_count INT DEFAULT 5,
  filter JSONB DEFAULT '{}'
)
RETURNS TABLE(
  id INT,
  content TEXT,
  metadata JSONB,
  similarity FLOAT
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT
    knowledge_base.id,
    knowledge_base.content,
    knowledge_base.metadata,
    1 - (knowledge_base.embedding <=> query_embedding) AS similarity
  FROM knowledge_base
  WHERE (filter = '{}' OR knowledge_base.metadata @> filter)
  ORDER BY knowledge_base.embedding <=> query_embedding
  LIMIT match_count;
END;
$$;

-- Create an index for faster similarity search
CREATE INDEX IF NOT EXISTS knowledge_base_embedding_idx
ON knowledge_base USING ivfflat (embedding vector_cosine_ops)
WITH (lists = 100);

-- Create tables for CRM functionality
CREATE TABLE IF NOT EXISTS leads (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255),
  session_id VARCHAR(255),
  lead_score INTEGER,
  intent VARCHAR(50),
  priority VARCHAR(20),
  lead_source VARCHAR(50),
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS conversations (
  id SERIAL PRIMARY KEY,
  session_id VARCHAR(255),
  message TEXT,
  response TEXT,
  input_type VARCHAR(10),
  knowledge_used BOOLEAN,
  timestamp TIMESTAMP DEFAULT NOW()
);

-- Insert sample roofing knowledge
INSERT INTO knowledge_base (content, metadata, embedding) VALUES
(
  'Alpine Peak Roofing specializes in residential and commercial roofing services in the Denver metro area. We handle roof inspections, repairs, replacements, and emergency services. Our team is experienced with high-altitude roofing challenges, hail damage repairs, and snow load management.',
  '{"title": "Company Overview", "category": "company_info"}',
  '[0.1, 0.2, 0.3]'::vector -- Replace with actual embeddings
),
(
  'For Denver weather, we recommend impact-resistant shingles, TPO membrane for flat roofs, and metal roofing for durability. Asphalt shingles work well but should be Class 4 impact-rated for hail protection. Proper underlayment and ventilation are crucial for snow and ice management.',
  '{"title": "Roofing Materials for Denver", "category": "materials"}',
  '[0.2, 0.3, 0.4]'::vector -- Replace with actual embeddings
),
(
  'Emergency roof services are available 24/7. Call (970) 446-8995 immediately for leaks, storm damage, or structural issues. We provide temporary tarping, emergency repairs, and full damage assessment. Safety is our top priority.',
  '{"title": "Emergency Services", "category": "emergency"}',
  '[0.3, 0.4, 0.5]'::vector -- Replace with actual embeddings
);