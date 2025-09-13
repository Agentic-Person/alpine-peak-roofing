import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// Supabase configuration - using environment variables for security
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
  throw new Error('Missing Supabase configuration. Check NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY environment variables.')
}

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY)

// Mock OpenAI API key (user needs to provide real one)
const OPENAI_API_KEY = process.env.OPENAI_API_KEY || 'placeholder_openai_api_key_here'

async function generateQueryEmbedding(text: string): Promise<number[] | null> {
  if (OPENAI_API_KEY === 'placeholder_openai_api_key_here') {
    // Return mock embedding for demo
    return Array(1536).fill(0).map(() => Math.random() * 2 - 1)
  }

  try {
    const response = await fetch('https://api.openai.com/v1/embeddings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'text-embedding-ada-002',
        input: text
      })
    })

    const data = await response.json()
    
    if (data.error) {
      throw new Error(`OpenAI API Error: ${data.error.message}`)
    }
    
    return data.data[0].embedding
  } catch (error) {
    console.error('Error generating embedding:', error)
    return null
  }
}

async function searchKnowledgeBase(embedding: number[], limit: number = 3) {
  try {
    const { data, error } = await supabase.rpc('search_knowledge_content', {
      query_embedding: embedding,
      similarity_threshold: 0.1, // Low threshold for demo with mock embeddings
      match_count: limit
    })

    if (error) {
      console.error('Knowledge base search error:', error)
      return []
    }

    return data || []
  } catch (error) {
    console.error('Search error:', error)
    return []
  }
}

function generateRAGResponse(userMessage: string, knowledgeResults: any[]): string {
  if (knowledgeResults.length === 0) {
    return `I'd be happy to help you with your roofing question: "${userMessage}". 

While I don't have specific information in my knowledge base for this query, I can tell you that Alpine Peak Roofing specializes in mountain roofing solutions throughout Colorado. We focus on:

- High-altitude roofing challenges
- Impact-resistant materials for hail protection  
- Heavy snow load capacity
- Sustainable roofing options
- Emergency repair services

For the most accurate information about your specific needs, I'd recommend contacting our expert team directly. Would you like me to help you schedule a consultation?`
  }

  // Build context from search results
  let contextText = ''
  knowledgeResults.forEach((result, index) => {
    contextText += `${index + 1}. ${result.title}\n${result.content.substring(0, 300)}...\n\n`
  })

  return `Based on your question about "${userMessage}", here's what I can help you with:

${contextText}

These recommendations are specifically tailored for Colorado's mountain climate and weather conditions. Alpine Peak Roofing has extensive experience with the unique challenges of high-altitude roofing.

Would you like more specific information about any of these topics, or would you prefer to speak with one of our roofing experts?`
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { message, session_id } = body

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required and must be a string' },
        { status: 400 }
      )
    }

    // Generate embedding for the user's query
    const queryEmbedding = await generateQueryEmbedding(message)
    
    if (!queryEmbedding) {
      return NextResponse.json(
        { error: 'Failed to process query' },
        { status: 500 }
      )
    }

    // Search knowledge base
    const knowledgeResults = await searchKnowledgeBase(queryEmbedding, 3)
    
    // Generate contextual response
    const response = generateRAGResponse(message, knowledgeResults)
    
    // Calculate similarity score for metadata
    const avgSimilarity = knowledgeResults.length > 0 
      ? knowledgeResults.reduce((sum, r) => sum + r.similarity, 0) / knowledgeResults.length 
      : 0

    // Store conversation in database (simplified)
    if (session_id) {
      try {
        await supabase.from('chat_messages').insert([
          {
            conversation_id: session_id,
            role: 'user',
            content: message,
            created_at: new Date().toISOString()
          },
          {
            conversation_id: session_id,
            role: 'assistant',
            content: response,
            retrieved_content_ids: knowledgeResults.map(r => r.id),
            confidence_score: avgSimilarity,
            created_at: new Date().toISOString()
          }
        ])
      } catch (dbError) {
        console.error('Database storage error:', dbError)
        // Don't fail the request if storage fails
      }
    }

    return NextResponse.json({
      success: true,
      message: response,
      session_id: session_id || `session_${Date.now()}`,
      metadata: {
        sources_used: knowledgeResults.length,
        search_quality: avgSimilarity,
        response_type: knowledgeResults.length > 0 ? 'knowledge_based' : 'general',
        relevant_sources: knowledgeResults.map(source => ({
          title: source.title,
          category: source.category_name,
          similarity: Math.round(source.similarity * 100) / 100
        })),
        using_demo_embeddings: OPENAI_API_KEY === 'placeholder_openai_api_key_here'
      }
    })

  } catch (error) {
    console.error('RAG Chat API error:', error)
    return NextResponse.json(
      { 
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({
    status: 'Alpine Peak Roofing RAG Chat API',
    version: '1.0.0',
    features: [
      'Semantic search of knowledge base',
      'Contextual AI responses',
      'Conversation storage',
      'Multi-source knowledge retrieval'
    ],
    endpoints: {
      'POST /api/chat/rag': 'Send message and get AI response with knowledge base context'
    },
    demo_mode: OPENAI_API_KEY === 'placeholder_openai_api_key_here'
  })
}