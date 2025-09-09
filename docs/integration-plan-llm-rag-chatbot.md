# 3-Part Integration Plan for Alpine Peak Roofing
## LLM-RAG Chatbot & Knowledge Base Implementation

**Project Status**: Ready to Implement  
**Priority**: High  
**Estimated Timeline**: 1-2 weeks  
**Dependencies**: n8n MCP Server (✅ Verified Working)

---

## 1️⃣ **Add Resource Links to Footer (Sophisticated Layout)**

### Overview
Add a professional "Resources" section to the footer for non-intrusive access to knowledge content.

### Resources to Include
- **FAQ** - Frequently Asked Questions
- **Glossary** - Roofing Terms Guide  
- **Knowledge Hub** - Resource Center
- **AI Assistant** - Get Instant Help

### Design Specifications
- Create a 5th column in the footer grid
- Use subtle `gray-400` text with hover effects
- Include a small "AI" badge next to chatbot link
- Position between "Company" and "Contact" sections
- Maintain responsive design for mobile devices

### Implementation Details
```tsx
// Footer.tsx modifications
<div>
  <h3 className="text-white font-semibold mb-4">Resources</h3>
  <ul className="space-y-2 text-gray-400 text-sm">
    <li><Link href="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
    <li><Link href="/glossary" className="hover:text-white transition-colors">Glossary</Link></li>
    <li><Link href="/knowledge" className="hover:text-white transition-colors">Knowledge Hub</Link></li>
    <li>
      <Link href="/chatbot-demo" className="hover:text-white transition-colors inline-flex items-center">
        AI Assistant <span className="ml-2 text-xs bg-blue-600 text-white px-2 py-0.5 rounded">AI</span>
      </Link>
    </li>
  </ul>
</div>
```

---

## 2️⃣ **Supabase Integration Strategy**

### Current Situation
- Content is currently static in React components (~35,000 words)
- Need to move into Supabase for dynamic access and RAG capabilities

### Database Schema Design

#### FAQ Table
```sql
CREATE TABLE faqs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  category VARCHAR(100),
  search_terms TEXT[],
  display_order INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

#### Glossary Table
```sql
CREATE TABLE glossary_terms (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  term VARCHAR(200) NOT NULL,
  definition TEXT NOT NULL,
  category VARCHAR(100),
  related_terms TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

#### Knowledge Base Articles
```sql
CREATE TABLE knowledge_articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(300) NOT NULL,
  content TEXT NOT NULL,
  category VARCHAR(100),
  tags TEXT[],
  url VARCHAR(500),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

#### Chat Context Table (with pgvector)
```sql
-- Enable pgvector extension
CREATE EXTENSION IF NOT EXISTS vector;

CREATE TABLE chat_contexts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  content_type VARCHAR(50), -- 'faq', 'glossary', 'knowledge'
  content TEXT NOT NULL,
  embeddings vector(1536), -- OpenAI embeddings dimension
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index for similarity search
CREATE INDEX ON chat_contexts 
USING ivfflat (embeddings vector_cosine_ops)
WITH (lists = 100);
```

### Migration Benefits
- ✅ Dynamic content management without code changes
- ✅ AI chatbot can query database for accurate answers
- ✅ Easier content updates and additions
- ✅ Better search functionality with vector similarity
- ✅ Analytics on most accessed content

---

## 3️⃣ **AI Chatbot Integration with Knowledge Base**

### Current Status
- ✅ Components exist (`ChatWidget.tsx` ready)
- ⏳ n8n workflows planned but not implemented
- ⏳ Needs connection to knowledge base

### RAG Implementation Architecture

#### Step 1: Connect Chatbot to Supabase
- Configure Supabase client in chatbot components
- Set up real-time subscriptions for chat sessions
- Implement conversation persistence

#### Step 2: Create Content Embeddings
```javascript
// n8n workflow for embedding generation
1. Fetch content from Supabase tables
2. Chunk text into ~500 token segments
3. Generate embeddings via OpenAI API
4. Store embeddings in chat_contexts table
```

#### Step 3: Implement RAG Pipeline
```mermaid
User Query → Generate Embedding → Vector Search → 
Retrieve Top 5 Chunks → Augment Prompt → 
GPT-4 Response → Stream to User
```

#### Step 4: Add ChatWidget to Main Layout
```tsx
// layout.tsx modifications
import { ChatWidget } from '@/components/chatbot';

// Add before closing body tag
<ChatWidget 
  position="bottom-right"
  theme="alpine"
  autoOpen={false}
  emergencyKeywords={['leak', 'emergency', 'urgent', 'storm']}
/>
```

### Knowledge Sources for Chatbot

| Content Type | Word Count | Purpose |
|-------------|------------|---------|
| FAQ Answers | ~8,000 | Common customer questions |
| Glossary Terms | ~15,000 | Technical roofing definitions |
| Knowledge Articles | ~7,000 | Resource guides and how-tos |
| Service Descriptions | ~3,000 | Company offerings |
| Company Policies | ~2,000 | Warranties and procedures |

**Total Knowledge Base**: ~35,000 words of roofing expertise

---

## 📊 **n8n Workflow Components Required**

### Workflow 1: Content Ingestion & Embedding
- **Trigger**: Manual or scheduled
- **Nodes**: Supabase → Text Splitter → OpenAI Embeddings → Supabase Vector Store

### Workflow 2: Chat RAG Processing
- **Trigger**: Webhook from website
- **Nodes**: 
  - Receive chat message
  - Generate query embedding
  - Vector similarity search
  - Context assembly
  - GPT-4 completion
  - Response streaming

### Workflow 3: Lead Qualification
- **Trigger**: Conversation completion
- **Nodes**: 
  - Analyze conversation
  - Score lead (0-100)
  - CRM sync if qualified
  - Email/SMS notifications

---

## 🚀 **Implementation Timeline**

### Week 1
- **Day 1-2**: Update footer with resource links
- **Day 3-4**: Set up Supabase tables and pgvector
- **Day 5**: Migrate static content to Supabase

### Week 2
- **Day 1-2**: Build n8n embedding generation workflow
- **Day 3-4**: Implement chat RAG workflow
- **Day 5**: Testing and optimization

---

## ✅ **Success Metrics**

- [ ] All resource links accessible in footer
- [ ] 35,000+ words indexed in Supabase
- [ ] Chatbot responds with context-aware answers
- [ ] Response time < 2 seconds
- [ ] 95% answer accuracy for common questions
- [ ] Lead qualification scoring functional

---

## 🔧 **Technical Requirements**

### APIs & Services
- OpenAI API key for embeddings and GPT-4
- Supabase project with pgvector enabled
- n8n instance with webhook access
- Node.js environment for content migration

### Environment Variables
```env
OPENAI_API_KEY=sk-...
SUPABASE_URL=https://...supabase.co
SUPABASE_ANON_KEY=eyJ...
N8N_WEBHOOK_URL=https://...
```

---
    🤖 Agent Architecture for Implementation

    Agent 1: Footer UI Agent
    - Responsibility: Update footer with Resources section
    - Timeline: 1-2 hours
    - Tasks:
      - Add 5th column to footer grid
      - Create Resources links section
      - Implement AI badge for chatbot link
      - Ensure responsive design
    - Dependencies: None
    - Success Criteria: All resource links accessible in footer

    Agent 2: Supabase Migration Agent
    - Responsibility: Database setup and content migration
    - Timeline: 1-2 days
    - Tasks:
      - Create Supabase tables (faqs, glossary_terms, knowledge_articles)
      - Enable pgvector extension
      - Migrate 35,000+ words from static components
      - Generate embeddings for all content
      - Create vector indexes
    - Dependencies: Supabase credentials, OpenAI API key
    - Success Criteria: All content indexed with embeddings

    Agent 3: n8n RAG Workflow Agent
    - Responsibility: Build RAG workflows and integrate chatbot
    - Timeline: 2-3 days
    - Tasks:
      - Create embedding generation workflow
      - Build chat RAG processing workflow
      - Implement lead qualification workflow
      - Connect ChatWidget to n8n webhooks
      - Add ChatWidget to main layout
    - Dependencies: n8n MCP Server (verified ✅), Supabase setup complete
    - Success Criteria: Chatbot responds with context-aware answers < 2 seconds

    
## 📝 **Notes & Considerations**

1. **Content Chunking**: Keep chunks under 500 tokens for optimal embedding quality
2. **Rate Limiting**: Implement throttling for OpenAI API calls
3. **Caching**: Consider Redis for frequently accessed embeddings
4. **Monitoring**: Set up analytics for chat interactions and knowledge base usage
5. **Fallback**: Implement graceful degradation if AI services are unavailable

---

**Document Created**: September 9, 2025  
**Last Updated**: September 9, 2025  
**Author**: Alpine Peak Roofing Development Team