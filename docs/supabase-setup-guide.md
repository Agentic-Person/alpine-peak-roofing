# Alpine Peak Roofing - Supabase Setup Guide
## LLM-RAG Integration Database Configuration

This guide walks through setting up the Supabase database infrastructure for Alpine Peak Roofing's LLM-RAG chatbot system.

## 🚀 Quick Start

### 1. Install Supabase CLI

```bash
# Install Supabase CLI globally
npm install -g supabase

# Verify installation
supabase --version
```

### 2. Initialize Local Development

```bash
# Initialize Supabase in the project
supabase init

# Start local Supabase services
npm run supabase:start

# Check service status
npm run supabase:status
```

### 3. Run Database Migrations

The database schema is already prepared in `supabase/migrations/001_initial_knowledge_base.sql`.

```bash
# Apply migrations to local database
supabase db reset

# Generate TypeScript types
npm run generate-types
```

## 📊 Database Schema Overview

### Core Tables

1. **content_categories** - Content organization
2. **knowledge_content** - Main content storage with embeddings
3. **chat_conversations** - Chat session tracking
4. **chat_messages** - Individual messages with RAG context
5. **search_analytics** - Query performance tracking
6. **content_performance** - Content usage metrics

### Key Features

- **pgvector Integration**: 1536-dimension embeddings for semantic search
- **Full-Text Search**: PostgreSQL native search capabilities
- **Row Level Security**: Secure access patterns
- **Performance Indexes**: Optimized for RAG queries
- **Analytics Tracking**: Comprehensive usage monitoring

## 🔧 Production Setup

### 1. Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Create new project: "Alpine Peak Roofing LLM-RAG"
3. Note your project URL and keys

### 2. Configure Environment Variables

Copy `.env.local.example` to `.env.local` and update:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
OPENAI_API_KEY=your-openai-api-key-here
```

### 3. Deploy Database Schema

```bash
# Link to your production project
supabase link --project-ref your-project-ref

# Deploy migrations to production
supabase db push

# Generate production types
supabase gen types typescript --project-id your-project-ref > lib/supabase/database.types.ts
```

### 4. Enable Required Extensions

In your Supabase dashboard SQL editor:

```sql
-- Enable pgvector for embeddings
CREATE EXTENSION IF NOT EXISTS vector;

-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
```

## 📝 Content Migration

### 1. Prepare Content

The migration script automatically extracts content from:
- `app/faq/FAQPageClient.tsx` - FAQ entries
- `app/glossary/GlossaryPageClient.tsx` - Technical terms
- `app/knowledge/KnowledgeBaseClient.tsx` - Knowledge articles

### 2. Run Migration

```bash
# Install dependencies if needed
npm install @supabase/supabase-js

# Run content migration
npm run migrate-content
```

### Expected Output:
```
🚀 Starting Alpine Peak Roofing content migration...
✅ Database connection successful
📖 Extracting content from files...
📊 Content Summary:
   FAQ: 22 items
   Glossary: 95 items  
   Knowledge: 18 items
   Total: 135 items
   Total words: 35,247
📝 Inserting FAQ items...
✅ Inserted: What types of roofing materials do you work with? (156 words)
[... continues for all items ...]
🎉 Content migration completed successfully!
```

## 🔍 Semantic Search Setup

### 1. Generate Embeddings

Content is inserted without embeddings initially. Use n8n workflows to generate embeddings:

```javascript
// Example n8n HTTP Request node configuration
{
  "method": "POST",
  "url": "https://api.openai.com/v1/embeddings",
  "headers": {
    "Authorization": "Bearer {{ $env.OPENAI_API_KEY }}",
    "Content-Type": "application/json"
  },
  "body": {
    "model": "text-embedding-ada-002",
    "input": "{{ $json.title }} {{ $json.content }}"
  }
}
```

### 2. Update Database

```sql
-- Update content with generated embedding
UPDATE knowledge_content 
SET 
  embedding = $1,
  embedding_model = 'text-embedding-ada-002',
  embedding_created_at = NOW()
WHERE id = $2;
```

### 3. Test Semantic Search

```typescript
import { searchKnowledgeContent } from '@/lib/supabase/client'

// Generate query embedding first (via OpenAI API)
const queryEmbedding = await generateEmbedding("roofing materials for mountain homes")

// Search knowledge base
const results = await searchKnowledgeContent(queryEmbedding, {
  matchThreshold: 0.78,
  matchCount: 5,
  categoryFilter: 'knowledge'
})

console.log('Search results:', results)
```

## 📈 Performance Monitoring

### 1. Query Analytics

Monitor search performance:
```sql
SELECT 
  query_text,
  avg(response_time_ms) as avg_response_time,
  count(*) as query_count,
  avg(top_result_score) as avg_relevance
FROM search_analytics 
WHERE created_at > NOW() - INTERVAL '7 days'
GROUP BY query_text
ORDER BY query_count DESC;
```

### 2. Content Performance

Track content effectiveness:
```sql
SELECT 
  kc.title,
  cp.retrieval_count,
  cp.helpful_votes,
  cp.unhelpful_votes,
  cp.conversion_count,
  cp.avg_relevance_score
FROM content_performance cp
JOIN knowledge_content kc ON cp.content_id = kc.id
ORDER BY cp.retrieval_count DESC;
```

## 🔒 Security Configuration

### Row Level Security Policies

The migration includes RLS policies:
- **Public read** for active content (n8n access)
- **Service role** full access for administration
- **User-specific** policies for conversations

### API Access

- **Anonymous key**: Read-only content access
- **Service role key**: Full database access (server-side only)
- **User tokens**: Scoped access per authenticated user

## 🚦 Health Checks

### Database Connection Test

```typescript
import { supabase } from '@/lib/supabase/client'

export async function testDatabaseConnection() {
  try {
    const { data, error } = await supabase
      .from('content_categories')
      .select('count')
      .limit(1)
    
    if (error) throw error
    console.log('✅ Database connection successful')
    return true
  } catch (error) {
    console.error('❌ Database connection failed:', error.message)
    return false
  }
}
```

### Embedding Search Test

```typescript
export async function testSemanticSearch() {
  // Test with a sample query
  const testEmbedding = new Array(1536).fill(0) // Placeholder
  
  try {
    const results = await searchKnowledgeContent(testEmbedding, {
      matchCount: 1
    })
    console.log('✅ Semantic search working')
    return true
  } catch (error) {
    console.error('❌ Semantic search failed:', error.message)
    return false
  }
}
```

## 🔄 Maintenance Tasks

### Regular Maintenance

1. **Update embeddings** when content changes
2. **Analyze search patterns** for content gaps
3. **Monitor performance metrics** for optimization
4. **Clean up old conversations** (optional)
5. **Backup critical data** regularly

### Performance Optimization

```sql
-- Reindex vector embeddings periodically
REINDEX INDEX CONCURRENTLY idx_knowledge_content_embedding;

-- Update table statistics
ANALYZE knowledge_content;
ANALYZE chat_messages;
```

## 📞 Troubleshooting

### Common Issues

1. **pgvector not available**
   - Ensure extension is installed: `CREATE EXTENSION vector;`
   - Check Supabase project settings for enabled extensions

2. **Embedding search returns no results**
   - Verify embeddings are generated and stored
   - Check similarity threshold (try lowering to 0.5)
   - Ensure query embedding dimensions match (1536)

3. **Performance issues**
   - Check index usage with `EXPLAIN ANALYZE`
   - Consider increasing `lists` parameter for IVFFlat index
   - Monitor connection pooling

4. **Migration errors**
   - Verify file paths in migration script
   - Check content extraction patterns match React components
   - Ensure database permissions for service role

## 📚 Next Steps

After completing the database setup:

1. **Configure n8n workflows** for embedding generation
2. **Implement RAG chat workflows** with semantic search
3. **Connect ChatWidget** to n8n webhooks
4. **Test end-to-end** chat functionality
5. **Monitor and optimize** based on usage patterns

## 🛠️ Development Commands

```bash
# Local development
npm run supabase:start      # Start local Supabase
npm run supabase:stop       # Stop local services
npm run supabase:status     # Check service status
npm run supabase:reset      # Reset local database

# Content management
npm run migrate-content     # Import content from files
npm run generate-types      # Generate TypeScript types

# Production deployment
supabase link              # Link to production project
supabase db push           # Deploy migrations
supabase functions deploy  # Deploy edge functions (if any)
```

This completes the Supabase setup for Alpine Peak Roofing's LLM-RAG integration. The database is now ready to support semantic search, conversation tracking, and performance analytics.