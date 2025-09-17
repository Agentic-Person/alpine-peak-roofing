-- Alpine Peak Roofing - Vector Operations Management
-- Version: 1.0
-- Date: 2025-09-15
-- Description: Dedicated vector index management and RAG operations

-- =====================================================
-- VECTOR EXTENSION STATUS CHECK
-- =====================================================

-- Check if vector extension is installed
-- SELECT extname, extversion FROM pg_extension WHERE extname = 'vector';

-- =====================================================
-- EXISTING VECTOR INDEXES (FOR REFERENCE)
-- =====================================================

-- The following indexes already exist on knowledge_base table:
-- 1. knowledge_base_embedding_idx (IVFFlat with 100 lists) - Main vector similarity search
-- 2. knowledge_base_category_idx - Category-based filtering
-- 3. knowledge_base_content_fts_idx - Full-text search (GIN)
-- 4. knowledge_base_metadata_idx - Metadata JSON search (GIN)
-- 5. knowledge_base_urgency_idx - Urgency-based filtering

-- Check existing vector indexes
-- SELECT indexname, indexdef
-- FROM pg_indexes
-- WHERE tablename = 'knowledge_base'
-- AND indexdef LIKE '%vector%'
-- ORDER BY indexname;

-- =====================================================
-- VECTOR INDEX MANAGEMENT FUNCTIONS
-- =====================================================

-- Function to rebuild vector index if needed (use with caution)
CREATE OR REPLACE FUNCTION rebuild_vector_index()
RETURNS TEXT AS $$
BEGIN
    -- Only run this if you have memory issues or corruption
    -- REQUIRES: maintenance_work_mem = '128MB' or higher

    -- Drop existing index
    DROP INDEX IF EXISTS knowledge_base_embedding_idx;

    -- Recreate with optimized settings
    CREATE INDEX knowledge_base_embedding_idx
    ON knowledge_base
    USING ivfflat (embedding vector_cosine_ops)
    WITH (lists = 50); -- Reduced from 100 for memory efficiency

    RETURN 'Vector index rebuilt successfully';
EXCEPTION
    WHEN OTHERS THEN
        RETURN 'Error rebuilding index: ' || SQLERRM;
END;
$$ LANGUAGE plpgsql;

-- Function to check vector index statistics
CREATE OR REPLACE FUNCTION vector_index_stats()
RETURNS TABLE(
    index_name TEXT,
    table_size TEXT,
    index_size TEXT,
    total_rows BIGINT,
    rows_with_embeddings BIGINT,
    embedding_dimensions INTEGER
) AS $$
BEGIN
    RETURN QUERY
    SELECT
        'knowledge_base_embedding_idx'::TEXT,
        pg_size_pretty(pg_total_relation_size('knowledge_base')),
        pg_size_pretty(pg_relation_size('knowledge_base_embedding_idx')),
        COUNT(*)::BIGINT,
        COUNT(kb.embedding)::BIGINT,
        CASE
            WHEN COUNT(kb.embedding) > 0 THEN vector_dims((SELECT embedding FROM knowledge_base WHERE embedding IS NOT NULL LIMIT 1))
            ELSE NULL
        END
    FROM knowledge_base kb;
END;
$$ LANGUAGE plpgsql;

-- =====================================================
-- RAG SEARCH FUNCTIONS
-- =====================================================

-- Function for semantic similarity search
CREATE OR REPLACE FUNCTION search_knowledge_semantic(
    query_embedding vector(1536),
    similarity_threshold FLOAT DEFAULT 0.7,
    max_results INTEGER DEFAULT 5
)
RETURNS TABLE(
    id TEXT,
    title TEXT,
    content TEXT,
    similarity_score FLOAT,
    metadata JSONB,
    category TEXT
) AS $$
BEGIN
    RETURN QUERY
    SELECT
        kb.id,
        kb.title,
        kb.content,
        (1 - (kb.embedding <=> query_embedding))::FLOAT as similarity_score,
        kb.metadata,
        (kb.metadata->>'category')::TEXT as category
    FROM knowledge_base kb
    WHERE kb.embedding IS NOT NULL
    AND (1 - (kb.embedding <=> query_embedding)) >= similarity_threshold
    ORDER BY kb.embedding <=> query_embedding
    LIMIT max_results;
END;
$$ LANGUAGE plpgsql;

-- Function for hybrid search (vector + full-text)
CREATE OR REPLACE FUNCTION search_knowledge_hybrid(
    query_text TEXT,
    query_embedding vector(1536),
    similarity_threshold FLOAT DEFAULT 0.6,
    max_results INTEGER DEFAULT 10
)
RETURNS TABLE(
    id TEXT,
    title TEXT,
    content TEXT,
    similarity_score FLOAT,
    text_rank FLOAT,
    combined_score FLOAT,
    metadata JSONB
) AS $$
BEGIN
    RETURN QUERY
    WITH vector_results AS (
        SELECT
            kb.id,
            kb.title,
            kb.content,
            (1 - (kb.embedding <=> query_embedding))::FLOAT as sim_score,
            kb.metadata
        FROM knowledge_base kb
        WHERE kb.embedding IS NOT NULL
    ),
    text_results AS (
        SELECT
            kb.id,
            ts_rank_cd(to_tsvector('english', kb.content), plainto_tsquery('english', query_text))::FLOAT as txt_rank
        FROM knowledge_base kb
        WHERE to_tsvector('english', kb.content) @@ plainto_tsquery('english', query_text)
    )
    SELECT
        vr.id,
        vr.title,
        vr.content,
        vr.sim_score as similarity_score,
        COALESCE(tr.txt_rank, 0.0) as text_rank,
        (vr.sim_score * 0.7 + COALESCE(tr.txt_rank, 0.0) * 0.3)::FLOAT as combined_score,
        vr.metadata
    FROM vector_results vr
    LEFT JOIN text_results tr ON vr.id = tr.id
    WHERE vr.sim_score >= similarity_threshold
    ORDER BY combined_score DESC
    LIMIT max_results;
END;
$$ LANGUAGE plpgsql;

-- Function for category-filtered search
CREATE OR REPLACE FUNCTION search_knowledge_by_category(
    query_embedding vector(1536),
    category_filter TEXT,
    max_results INTEGER DEFAULT 5
)
RETURNS TABLE(
    id TEXT,
    title TEXT,
    content TEXT,
    similarity_score FLOAT,
    category TEXT
) AS $$
BEGIN
    RETURN QUERY
    SELECT
        kb.id,
        kb.title,
        kb.content,
        (1 - (kb.embedding <=> query_embedding))::FLOAT as similarity_score,
        (kb.metadata->>'category')::TEXT as category
    FROM knowledge_base kb
    WHERE kb.embedding IS NOT NULL
    AND (kb.metadata->>'category') = category_filter
    ORDER BY kb.embedding <=> query_embedding
    LIMIT max_results;
END;
$$ LANGUAGE plpgsql;

-- =====================================================
-- PERFORMANCE MONITORING QUERIES
-- =====================================================

-- Query to check vector search performance
-- Run this to monitor search times and result quality
/*
EXPLAIN (ANALYZE, BUFFERS)
SELECT
    id,
    title,
    1 - (embedding <=> (SELECT embedding FROM knowledge_base WHERE content ILIKE '%emergency%' LIMIT 1)) as similarity
FROM knowledge_base
WHERE embedding IS NOT NULL
ORDER BY embedding <=> (SELECT embedding FROM knowledge_base WHERE content ILIKE '%emergency%' LIMIT 1)
LIMIT 5;
*/

-- Query to check index usage
-- SELECT
--     schemaname,
--     tablename,
--     attname,
--     n_distinct,
--     correlation
-- FROM pg_stats
-- WHERE tablename = 'knowledge_base'
-- AND attname = 'embedding';

-- Query to monitor embedding coverage
-- SELECT
--     COUNT(*) as total_rows,
--     COUNT(embedding) as rows_with_embeddings,
--     ROUND(COUNT(embedding) * 100.0 / COUNT(*), 2) as embedding_coverage_percent
-- FROM knowledge_base;

-- =====================================================
-- MAINTENANCE OPERATIONS
-- =====================================================

-- Function to update vector index statistics
CREATE OR REPLACE FUNCTION refresh_vector_stats()
RETURNS TEXT AS $$
BEGIN
    -- Refresh index statistics for better query planning
    ANALYZE knowledge_base;
    RETURN 'Vector statistics refreshed successfully';
END;
$$ LANGUAGE plpgsql;

-- Function to check for missing embeddings
CREATE OR REPLACE FUNCTION check_missing_embeddings()
RETURNS TABLE(
    id TEXT,
    title TEXT,
    content_length INTEGER,
    created_at TIMESTAMPTZ
) AS $$
BEGIN
    RETURN QUERY
    SELECT
        kb.id,
        kb.title,
        LENGTH(kb.content)::INTEGER,
        kb.created_at
    FROM knowledge_base kb
    WHERE kb.embedding IS NULL
    ORDER BY kb.created_at DESC;
END;
$$ LANGUAGE plpgsql;

-- =====================================================
-- VECTOR INDEX OPTIMIZATION SETTINGS
-- =====================================================

-- For rebuilding indexes with different settings:
-- ALTER SYSTEM SET maintenance_work_mem = '128MB';  -- Increase for index operations
-- SELECT pg_reload_conf();  -- Reload configuration

-- For query optimization:
-- SET enable_seqscan = off;  -- Force index usage for testing
-- SET work_mem = '64MB';     -- Increase for complex vector queries

-- =====================================================
-- USAGE EXAMPLES
-- =====================================================

/*
-- Example 1: Get vector index statistics
SELECT * FROM vector_index_stats();

-- Example 2: Check for missing embeddings
SELECT * FROM check_missing_embeddings();

-- Example 3: Refresh vector statistics
SELECT refresh_vector_stats();

-- Example 4: Semantic search (requires embedding vector)
-- Note: In production, you'd get the query_embedding from OpenAI API
SELECT * FROM search_knowledge_semantic(
    (SELECT embedding FROM knowledge_base WHERE content ILIKE '%emergency%' LIMIT 1),
    0.7,  -- similarity threshold
    5     -- max results
);

-- Example 5: Category-filtered search
SELECT * FROM search_knowledge_by_category(
    (SELECT embedding FROM knowledge_base WHERE content ILIKE '%roof%' LIMIT 1),
    'emergency',  -- category filter
    3             -- max results
);

-- Example 6: Check vector search performance
EXPLAIN (ANALYZE, BUFFERS)
SELECT id, title, 1 - (embedding <=> $1) as similarity
FROM knowledge_base
WHERE embedding IS NOT NULL
ORDER BY embedding <=> $1
LIMIT 5;
*/

-- =====================================================
-- COMMENTS AND DOCUMENTATION
-- =====================================================

COMMENT ON FUNCTION search_knowledge_semantic IS 'Performs semantic similarity search using vector embeddings';
COMMENT ON FUNCTION search_knowledge_hybrid IS 'Combines vector similarity with full-text search for better results';
COMMENT ON FUNCTION search_knowledge_by_category IS 'Searches within specific category using vector similarity';
COMMENT ON FUNCTION vector_index_stats IS 'Returns comprehensive statistics about vector index and embeddings';
COMMENT ON FUNCTION check_missing_embeddings IS 'Identifies knowledge base entries without embeddings';
COMMENT ON FUNCTION refresh_vector_stats IS 'Updates PostgreSQL statistics for vector index optimization';