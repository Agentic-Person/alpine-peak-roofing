# Alpine Peak Roofing - n8n RAG Setup Guide
## Complete LLM-RAG Integration with Semantic Search

This guide covers the complete setup of n8n workflows for Alpine Peak Roofing's AI-powered chat system with semantic search capabilities.

## 🏗️ Architecture Overview

```
User Question → ChatWidget → n8n RAG Workflow → Semantic Search → OpenAI → Response
                ↓                    ↓              ↓            ↓         ↓
              Session         Generate Query    Supabase      GPT-4    Database
              Tracking        Embedding        pgvector      Chat      Logging
```

## 📋 Prerequisites

### 1. Required Services
- **n8n instance** (cloud or self-hosted)
- **Supabase project** with pgvector enabled
- **OpenAI API key** with GPT-4 and embeddings access
- **Alpine Peak website** with ChatWidget component

### 2. Environment Variables
```env
# n8n Environment
OPENAI_API_KEY=your-openai-api-key
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Website Environment  
NEXT_PUBLIC_N8N_WEBHOOK_BASE_URL=https://your-n8n-instance.com/webhook
```

## 🚀 Quick Setup

### 1. Import Workflow Templates

1. Download `n8n-workflow-templates.json`
2. In n8n dashboard: **Workflows → Import from File**
3. Import both workflows:
   - `Alpine Peak - Embedding Generation`
   - `Alpine Peak - RAG Chat System`

### 2. Configure Credentials

#### OpenAI API Credential
```
Credential Type: HTTP Header Auth
Name: Authorization
Value: Bearer YOUR_OPENAI_API_KEY
```

#### Supabase Credential
```
Credential Type: Supabase
Host: YOUR_SUPABASE_URL
Service Role: YOUR_SUPABASE_SERVICE_ROLE_KEY
```

### 3. Activate Webhooks

1. **Embedding Generation**: `/webhook/alpine-peak-generate-embeddings`
2. **RAG Chat System**: `/webhook/alpine-peak-chat`

## 📊 Workflow 1: Embedding Generation

### Purpose
Generates OpenAI embeddings for all knowledge base content and stores them in Supabase for semantic search.

### Process Flow
```
Webhook Trigger → Get Content → Split Batches → Prepare Text → 
Generate Embedding → Process Response → Update Supabase → Response
```

### Key Features
- **Batch Processing**: Handles 50 items per batch to avoid rate limits
- **Text Optimization**: Combines title + content for better embeddings  
- **Error Handling**: Robust error handling with retry logic
- **Token Tracking**: Monitors OpenAI API usage
- **Progress Responses**: Returns status for long-running operations

### Configuration Parameters

#### Webhook Settings
```json
{
  "httpMethod": "GET",
  "path": "generate-embeddings",
  "responseMode": "responseNode"
}
```

#### OpenAI Embedding Request
```json
{
  "model": "text-embedding-ada-002",
  "input": "{{ combined title and content }}",
  "timeout": 30000
}
```

#### Batch Processing Logic
```javascript
// Process in batches of 5 to respect rate limits
const batchSize = 5;
const maxTokensPerRequest = 8000; // OpenAI limit

// Clean and truncate text if necessary
const cleanText = textForEmbedding
  .replace(/\s+/g, ' ')
  .trim()
  .substring(0, 8000);
```

### Testing the Workflow

```bash
# Test embedding generation
curl -X GET "https://your-n8n-instance.com/webhook/alpine-peak-generate-embeddings"

# Expected Response
{
  "success": true,
  "message": "Embeddings generated successfully", 
  "processed_items": 25,
  "total_tokens_used": 15420,
  "timestamp": "2025-01-09T07:00:00.000Z"
}
```

## 🤖 Workflow 2: RAG Chat System

### Purpose
Complete conversational AI system with semantic search, context retrieval, and intelligent response generation.

### Process Flow
```
Chat Webhook → Validate Request → Generate Query Embedding →
Semantic Search → Prepare RAG Context → Generate AI Response →
Save Messages → Return Response
```

### Key Features
- **Semantic Search**: Uses pgvector for similarity matching
- **Context Assembly**: Intelligent context window management
- **Conversation Tracking**: Persistent chat sessions
- **Response Optimization**: GPT-4 with specialized prompts
- **Analytics Logging**: Comprehensive interaction tracking

### Request Format

```json
{
  "message": "What roofing materials work best for mountain homes?",
  "session_id": "session_1704785400000_abc123",
  "conversation_id": "conv_uuid_optional",
  "max_results": 5,
  "similarity_threshold": 0.78,
  "category_filter": null
}
```

### Response Format

```json
{
  "success": true,
  "response": "For mountain homes in Colorado, we recommend...",
  "session_id": "session_1704785400000_abc123", 
  "conversation_id": "550e8400-e29b-41d4-a716-446655440000",
  "metadata": {
    "retrieved_sources": 3,
    "confidence_score": 0.89,
    "tokens_used": 245,
    "processing_time_ms": 1823
  },
  "timestamp": "2025-01-09T07:00:00.000Z"
}
```

### RAG Context Assembly

The system intelligently assembles context from semantic search results:

```javascript
// Context building logic
let ragContext = '';
const retrievedContentIds = [];
let totalWords = 0;
const maxContextWords = 3000; // Balance context vs token limits

for (const result of searchResults) {
  if (totalWords >= maxContextWords) break;
  
  const contentSnippet = `## ${result.title}\n\n${result.content}\n\n`;
  const wordCount = contentSnippet.split(' ').length;
  
  if (totalWords + wordCount <= maxContextWords) {
    ragContext += contentSnippet;
    retrievedContentIds.push(result.id);
    totalWords += wordCount;
  }
}
```

### System Prompt Template

```javascript
const systemPrompt = `You are Alpine Peak Roofing's expert assistant. You specialize in premium roofing services for Colorado mountain communities including Aspen, Vail, Telluride, and Denver metro areas.

IMPORTANT INSTRUCTIONS:
- Use ONLY the provided context to answer questions
- If information is not in the context, say "I don't have that specific information, but I'd be happy to connect you with our team"
- Focus on Alpine Peak's high-end, sustainable roofing solutions
- Emphasize expertise in extreme weather conditions and high-altitude installations
- Maintain a professional, knowledgeable tone
- Always offer to schedule consultations for complex questions

CONTEXT INFORMATION:
${ragContext}

User Question: ${queryData.original_message}`;
```

## 🎯 ChatWidget Integration

The ChatWidget component automatically connects to n8n workflows:

### Key Features
- **Auto Session Management**: Generates unique session IDs
- **Real-time Messaging**: Instant message exchange
- **Metadata Display**: Shows confidence scores and source counts
- **Error Handling**: Graceful fallbacks for connection issues
- **Mobile Responsive**: Works on all device sizes

### Environment Configuration

```env
# Required in .env.local
NEXT_PUBLIC_N8N_WEBHOOK_BASE_URL=https://your-n8n-instance.com/webhook
```

### Chat Flow
1. User opens chat widget
2. System generates session ID
3. User sends message
4. Widget calls n8n RAG workflow
5. n8n performs semantic search
6. OpenAI generates contextual response
7. Response returned to widget
8. Conversation saved to database

## 📈 Performance Optimization

### Rate Limiting
```javascript
// OpenAI rate limits (adjust based on your plan)
const REQUESTS_PER_MINUTE = 60; // Embeddings API
const REQUESTS_PER_MINUTE_CHAT = 20; // GPT-4 API
const TOKENS_PER_MINUTE = 150000; // Total tokens
```

### Caching Strategy
```javascript
// Cache embeddings to avoid regeneration
const shouldRegenerateEmbedding = (
  !content.embedding || 
  !content.embedding_created_at ||
  content.updated_at > content.embedding_created_at
);
```

### Context Window Management
```javascript
// Optimize context for token limits
const MAX_CONTEXT_TOKENS = 3000; // ~75% of 4K context window
const MAX_RESPONSE_TOKENS = 1000;
const RESERVE_TOKENS = 200; // For system prompt
```

## 🔍 Testing & Validation

### 1. Test Embedding Generation

```bash
# Check if embeddings are generated
curl -X GET "https://your-n8n-instance.com/webhook/alpine-peak-generate-embeddings" \
  -H "Content-Type: application/json"
```

### 2. Test Semantic Search

```sql
-- Verify embeddings in Supabase
SELECT 
  title,
  CASE WHEN embedding IS NOT NULL THEN 'Has Embedding' ELSE 'No Embedding' END as embedding_status,
  word_count,
  embedding_created_at
FROM knowledge_content 
ORDER BY embedding_created_at DESC NULLS LAST;
```

### 3. Test Chat Workflow

```bash
# Test chat endpoint
curl -X POST "https://your-n8n-instance.com/webhook/alpine-peak-chat" \
  -H "Content-Type: application/json" \
  -d '{
    "message": "What types of roofing materials do you work with?",
    "session_id": "test_session_123",
    "max_results": 3
  }'
```

### 4. Test Widget Integration

1. Open website with ChatWidget
2. Click chat icon in bottom-right
3. Send test message: "Tell me about your roofing services"
4. Verify response includes relevant context
5. Check database for saved conversation

## 📊 Monitoring & Analytics

### Key Metrics to Track

```sql
-- Popular queries
SELECT 
  query_text,
  count(*) as frequency,
  avg(top_result_score) as avg_relevance,
  avg(response_time_ms) as avg_response_time
FROM search_analytics 
WHERE created_at > NOW() - INTERVAL '7 days'
GROUP BY query_text
ORDER BY frequency DESC;

-- Content performance
SELECT 
  kc.title,
  cp.retrieval_count,
  cp.helpful_votes,
  cp.unhelpful_votes,
  CASE 
    WHEN cp.helpful_votes + cp.unhelpful_votes > 0 
    THEN cp.helpful_votes::float / (cp.helpful_votes + cp.unhelpful_votes) 
    ELSE 0 
  END as helpfulness_ratio
FROM content_performance cp
JOIN knowledge_content kc ON cp.content_id = kc.id
ORDER BY cp.retrieval_count DESC;

-- Conversation insights
SELECT 
  DATE(started_at) as date,
  count(*) as conversations,
  avg(total_messages) as avg_messages_per_conversation,
  sum(total_tokens) as total_tokens_used
FROM chat_conversations 
WHERE started_at > NOW() - INTERVAL '30 days'
GROUP BY DATE(started_at)
ORDER BY date DESC;
```

### n8n Execution Monitoring

1. **Workflow Executions**: Monitor success/failure rates
2. **Response Times**: Track average processing times  
3. **Token Usage**: Monitor OpenAI API costs
4. **Error Patterns**: Identify common failure points

## 🚨 Troubleshooting

### Common Issues

#### 1. No Embeddings Generated
```
Problem: Workflow runs but no embeddings saved
Solution: Check OpenAI API key and rate limits
Debug: Look at n8n execution logs for API errors
```

#### 2. Poor Search Results
```
Problem: Chat returns irrelevant responses
Solution: Lower similarity threshold from 0.78 to 0.65
Debug: Check if query embeddings are being generated
```

#### 3. Chat Widget Not Connecting
```
Problem: Widget shows "connection issue"
Solution: Verify NEXT_PUBLIC_N8N_WEBHOOK_BASE_URL
Debug: Check browser network tab for 404/500 errors
```

#### 4. High Response Times
```
Problem: Chat responses take >10 seconds
Solution: Optimize context window size and batch processing
Debug: Monitor n8n execution times by node
```

#### 5. Token Limit Exceeded
```
Problem: OpenAI returns token limit error
Solution: Reduce maxContextWords in RAG context assembly
Debug: Log token counts before GPT-4 requests
```

### Debug Commands

```bash
# Check n8n webhook status
curl -I https://your-n8n-instance.com/webhook/alpine-peak-chat

# Test database connection
curl -X POST "https://your-supabase-url.supabase.co/rest/v1/knowledge_content" \
  -H "apikey: YOUR_ANON_KEY" \
  -H "Authorization: Bearer YOUR_ANON_KEY"

# Validate OpenAI API
curl -X POST "https://api.openai.com/v1/embeddings" \
  -H "Authorization: Bearer YOUR_OPENAI_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model": "text-embedding-ada-002", "input": "test"}'
```

## 🔄 Maintenance Tasks

### Weekly Tasks
1. **Review chat logs** for common questions not covered
2. **Monitor token usage** and optimize costs
3. **Check embedding freshness** for updated content
4. **Analyze user feedback** and satisfaction metrics

### Monthly Tasks
1. **Update system prompts** based on user feedback
2. **Retrain on new content** if significant updates
3. **Review and optimize** similarity thresholds
4. **Performance tuning** of database queries

### Quarterly Tasks
1. **Content audit** and gap analysis
2. **Model updates** (GPT-4 → newer versions)
3. **Workflow optimization** based on usage patterns
4. **Security review** of API keys and access patterns

## 🎯 Success Metrics

### Technical KPIs
- **Response Time**: <3 seconds average
- **Accuracy**: >85% helpful ratings  
- **Uptime**: >99.5% availability
- **Token Efficiency**: <500 tokens average per response

### Business KPIs
- **Engagement**: >60% of visitors interact with chat
- **Lead Quality**: 30% of conversations result in contact forms
- **Customer Satisfaction**: >4.5/5 average rating
- **Support Deflection**: 40% reduction in phone inquiries

This completes the n8n RAG setup for Alpine Peak Roofing. The system is now ready to provide intelligent, context-aware responses about roofing services using the company's comprehensive knowledge base.