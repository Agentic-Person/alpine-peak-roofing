// Alpine Peak Roofing - Supabase Client Configuration
// LLM-RAG Integration Support

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types for TypeScript support
export interface ContentCategory {
  id: string
  name: string
  description: string | null
  icon: string | null
  color: string | null
  created_at: string
  updated_at: string
}

export interface KnowledgeContent {
  id: string
  category_id: string
  title: string
  content: string
  excerpt: string | null
  tags: string[]
  search_keywords: string[]
  slug: string | null
  source_url: string | null
  word_count: number | null
  char_count: number | null
  
  // LLM fields
  embedding: number[] | null
  embedding_model: string | null
  embedding_created_at: string | null
  
  // Metadata
  priority: number
  is_active: boolean
  last_reviewed_at: string | null
  review_notes: string | null
  
  created_at: string
  updated_at: string
  
  // Relations
  category?: ContentCategory
}

export interface ChatConversation {
  id: string
  session_id: string | null
  user_id: string | null
  
  conversation_title: string | null
  total_messages: number
  total_tokens: number
  
  status: string
  sentiment: string | null
  lead_score: number | null
  
  resolved: boolean
  resolution_type: string | null
  follow_up_required: boolean
  
  started_at: string
  last_activity_at: string
  completed_at: string | null
}

export interface ChatMessage {
  id: string
  conversation_id: string
  
  role: string
  content: string
  message_type: string
  
  retrieved_content_ids: string[]
  embedding: number[] | null
  confidence_score: number | null
  
  prompt_tokens: number | null
  completion_tokens: number | null
  total_tokens: number | null
  
  user_rating: number | null
  user_feedback: string | null
  was_helpful: boolean | null
  
  created_at: string
}

// Semantic search function wrapper
export async function searchKnowledgeContent(
  queryEmbedding: number[],
  options: {
    matchThreshold?: number
    matchCount?: number
    categoryFilter?: string
  } = {}
) {
  const { matchThreshold = 0.78, matchCount = 10, categoryFilter } = options
  
  const { data, error } = await supabase.rpc('search_knowledge_content', {
    query_embedding: queryEmbedding,
    match_threshold: matchThreshold,
    match_count: matchCount,
    category_filter: categoryFilter
  })
  
  if (error) {
    throw new Error(`Semantic search failed: ${error.message}`)
  }
  
  return data as Array<{
    id: string
    title: string
    content: string
    category_name: string
    similarity: number
    word_count: number
    priority: number
  }>
}

// Helper functions for RAG operations
export async function getContentById(id: string): Promise<KnowledgeContent | null> {
  const { data, error } = await supabase
    .from('knowledge_content')
    .select(`
      *,
      category:content_categories(*)
    `)
    .eq('id', id)
    .eq('is_active', true)
    .single()
  
  if (error) {
    console.error('Error fetching content:', error)
    return null
  }
  
  return data
}

export async function getContentByCategory(
  categoryName: string,
  limit: number = 20
): Promise<KnowledgeContent[]> {
  const { data, error } = await supabase
    .from('knowledge_content')
    .select(`
      *,
      category:content_categories(*)
    `)
    .eq('category.name', categoryName)
    .eq('is_active', true)
    .order('priority', { ascending: false })
    .order('created_at', { ascending: false })
    .limit(limit)
  
  if (error) {
    console.error('Error fetching content by category:', error)
    return []
  }
  
  return data || []
}

export async function createChatConversation(
  sessionId: string,
  userId?: string
): Promise<string | null> {
  const { data, error } = await supabase
    .from('chat_conversations')
    .insert({
      session_id: sessionId,
      user_id: userId || null,
      status: 'active'
    })
    .select('id')
    .single()
  
  if (error) {
    console.error('Error creating conversation:', error)
    return null
  }
  
  return data.id
}

export async function saveChatMessage(
  conversationId: string,
  role: string,
  content: string,
  metadata: {
    messageType?: string
    retrievedContentIds?: string[]
    embedding?: number[]
    confidenceScore?: number
    tokenUsage?: {
      promptTokens: number
      completionTokens: number
      totalTokens: number
    }
  } = {}
): Promise<string | null> {
  const { data, error } = await supabase
    .from('chat_messages')
    .insert({
      conversation_id: conversationId,
      role,
      content,
      message_type: metadata.messageType || 'text',
      retrieved_content_ids: metadata.retrievedContentIds || [],
      embedding: metadata.embedding || null,
      confidence_score: metadata.confidenceScore || null,
      prompt_tokens: metadata.tokenUsage?.promptTokens || null,
      completion_tokens: metadata.tokenUsage?.completionTokens || null,
      total_tokens: metadata.tokenUsage?.totalTokens || null
    })
    .select('id')
    .single()
  
  if (error) {
    console.error('Error saving message:', error)
    return null
  }
  
  return data.id
}