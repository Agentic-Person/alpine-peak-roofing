# Alpine Peak Roofing - Vector Database Setup

This directory contains scripts to process your 45,000+ words of roofing expertise and set up a vector database for RAG (Retrieval-Augmented Generation) functionality in your n8n chatbot.

## 🏗️ Overview

The system transforms your documentation into an intelligent, searchable knowledge base that powers contextually relevant AI responses.

```
Documentation → Chunks → Embeddings → Vector DB → RAG Search → Enhanced AI
```

## 📁 Files

- **`content-processor.js`** - Chunks documentation into optimal sizes with metadata
- **`embedding-generator.js`** - Generates OpenAI embeddings for each chunk
- **`data-uploader.js`** - Uploads embeddings to Supabase vector database
- **`supabase-setup.sql`** - Database schema and search functions
- **`test-search.js`** - Test search functionality (created after setup)
- **`package.json`** - Dependencies and npm scripts

## 🚀 Quick Start

### 1. Prerequisites

```bash
# Install dependencies
npm install

# Ensure environment variables are set
# OPENAI_API_KEY=your_openai_key
# NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
# SUPABASE_SERVICE_ROLE_KEY=your_service_key
```

### 2. Set up Supabase Vector Database

```bash
# Copy the SQL from supabase-setup.sql
# Paste and run it in your Supabase SQL Editor
# This enables the vector extension and creates tables/functions
```

### 3. Run Full Setup

```bash
# Process all documentation, generate embeddings, and upload to database
npm run full-setup
```

### 4. Individual Steps (if needed)

```bash
# Step 1: Process documentation into chunks
npm run process

# Step 2: Generate OpenAI embeddings
npm run embed

# Step 3: Upload to Supabase
npm run upload

# Test search functionality
npm run test-search
```

## 📊 What Each Script Does

### Content Processor (`content-processor.js`)
- Scans all documentation files in `../../docs`
- Cleans and normalizes content
- Splits into 500-800 token chunks with 100-token overlap
- Adds metadata: category, urgency, season, service type, complexity
- Outputs: `processed-content/processed-chunks.json`

**Categories detected:**
- `materials` - Shingles, metal, tile, TPO, etc.
- `climate` - Colorado weather, snow, hail, altitude
- `installation` - Techniques, nailing, flashing, ventilation
- `maintenance` - Repairs, inspections, seasonal care
- `commercial` - TPO, EPDM, membrane systems
- `emergency` - Leaks, storm damage, urgent repairs
- `pricing` - Costs, estimates, quotes, budgets

### Embedding Generator (`embedding-generator.js`)
- Uses OpenAI `text-embedding-ada-002` model
- Processes chunks in batches with rate limiting
- Combines title + metadata + content for rich embeddings
- Handles errors and retries automatically
- Cost estimation and progress tracking
- Outputs: `processed-content/embeddings.json`

### Data Uploader (`data-uploader.js`)
- Uploads embeddings to Supabase `knowledge_base` table
- Batch processing with duplicate detection
- Comprehensive error handling and retry logic
- Generates upload reports and statistics
- Tests search functionality after upload

## 📈 Expected Results

### Processing Stats
- **~45,000 words** of source content
- **~150-200 chunks** at 500-800 tokens each  
- **~25,000-35,000 tokens** for embeddings
- **~$3-5** in OpenAI embedding costs

### Performance Targets
- **Search latency:** < 200ms
- **Relevance threshold:** > 0.78 similarity
- **Context retrieval:** Top 3-5 chunks per query
- **Token efficiency:** ~2,000 tokens of context max

## 🔍 Search Functions Created

The setup creates these Supabase functions for n8n integration:

### `search_knowledge_base(query_embedding, query_text, filters...)`
Main hybrid search combining vector similarity + keyword matching

### `search_emergency_content(query_embedding)`
Prioritizes emergency and urgent content for safety-critical queries

### `search_seasonal_content(query_embedding, season)`
Returns seasonally relevant content (spring storms, winter ice dams, etc.)

### `search_by_category(category, query_embedding)`
Searches within specific categories (materials, installation, etc.)

## 📝 Output Files

After running the scripts, you'll have:

```
processed-content/
├── processed-chunks.json      # Chunked content with metadata
├── content-metadata.json      # Processing statistics
├── processing-report.md       # Human-readable summary
├── embeddings.json           # OpenAI embeddings
├── embedding-summary.json    # Embedding statistics
├── upload-report.json        # Upload results
└── failed-chunks.json        # Any failed items (if any)
```

## 🔧 Configuration

Edit the CONFIG objects in each script to customize:

- **Chunk size:** 500-800 tokens (optimal for most queries)
- **Overlap:** 100 tokens (ensures context continuity)
- **Batch sizes:** Balanced for rate limits and performance
- **Similarity thresholds:** 0.78+ for high relevance
- **Retry logic:** 3 attempts with exponential backoff

## 🧪 Testing

After setup, test with common roofing queries:

```javascript
// Test emergency detection
"My roof is leaking water into my living room"

// Test material expertise  
"What's the best shingle type for Colorado hail?"

// Test seasonal knowledge
"How should I prepare my roof for winter snow?"

// Test commercial knowledge
"TPO membrane installation best practices"
```

## 🐛 Troubleshooting

### Common Issues

**"OPENAI_API_KEY not set"**
- Ensure your .env.local file has a valid OpenAI API key

**"Database connection failed"**
- Check Supabase URL and service role key
- Ensure you've run the SQL setup script

**"Vector extension not found"**
- Run `supabase-setup.sql` in your Supabase SQL editor
- The `vector` extension must be enabled

**"Rate limit exceeded"**
- The embedding generator has built-in delays and retries
- For large datasets, it may take 10-15 minutes

### Performance Issues

**Slow search results**
- Check if indexes are created properly
- Consider adjusting similarity thresholds
- Monitor Supabase performance metrics

**High embedding costs**
- Review chunk sizes and overlap settings
- Consider filtering duplicate or low-value content

## 🔄 Updating Content

To update the knowledge base with new content:

1. Add new documentation files to `../../docs`
2. Run `npm run process` to re-chunk everything
3. Run `npm run embed` to generate new embeddings  
4. Run `npm run upload` to update the database

The system handles updates gracefully with duplicate detection.

## 📞 Integration with N8n

Once the vector database is set up, your n8n workflow can search it using HTTP requests to Supabase's REST API or direct database connections.

See the enhanced n8n workflow that will be created next! 🚀