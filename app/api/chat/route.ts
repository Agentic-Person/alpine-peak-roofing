/**
 * /api/chat — Web chat proxy (used by ChatWidget / ChatService)
 * Delegates to Emily RAG agent. No n8n dependency.
 *
 * Persistence (fire-and-forget, non-blocking):
 *   - chat_conversations: full message history + lead score per session
 *   - leads: upserted for hot leads (score >= 70)
 */
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { runEmilyAgent, AgentMessage, AgentResponse } from '@/lib/agent'

// ─── Supabase ────────────────────────────────────────────────────────────────

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) throw new Error('Missing Supabase configuration')
  return createClient(url, key)
}

// ─── Persistence helpers ─────────────────────────────────────────────────────

interface PersistParams {
  sessionId: string
  userMessage: string
  result: AgentResponse & { openaiMessages?: unknown }
}

/**
 * Upsert the chat conversation row (append messages, keep highest lead score).
 * Uses a select-then-upsert pattern to safely append to the JSONB messages array.
 */
async function persistConversation({
  sessionId,
  userMessage,
  result,
}: PersistParams): Promise<void> {
  const supabase = getSupabase()

  const newMessages = [
    {
      role: 'user',
      content: userMessage,
      timestamp: new Date().toISOString(),
    },
    {
      role: 'assistant',
      content: result.response,
      lead_score: result.lead_score,
      next_action: result.next_action,
      timestamp: new Date().toISOString(),
    },
  ]

  // Fetch existing conversation (may not exist yet)
  const { data: existing } = await supabase
    .from('chat_conversations')
    .select('messages, lead_score')
    .eq('session_id', sessionId)
    .single()

  const existingMessages: unknown[] = Array.isArray(existing?.messages)
    ? existing.messages
    : []
  const existingScore: number =
    typeof existing?.lead_score === 'number' ? existing.lead_score : 0

  const updatedMessages = [...existingMessages, ...newMessages]
  const updatedScore = Math.max(existingScore, result.lead_score)
  const status = result.is_hot_lead ? 'hot' : 'active'

  const { error } = await supabase.from('chat_conversations').upsert(
    {
      session_id: sessionId,
      messages: updatedMessages,
      lead_score: updatedScore,
      status,
      updated_at: new Date().toISOString(),
    },
    { onConflict: 'session_id' }
  )

  if (error) {
    console.error('[/api/chat] chat_conversations upsert error:', error.message)
  }
}

/**
 * Upsert a leads row for hot conversations.
 * Only fires when lead_score >= 70. Uses session_id as the dedup key.
 * We store only what we know: session_id, source, score, next_action.
 * Contact details (name/phone) get captured when the form is submitted.
 */
async function persistLead({
  sessionId,
  userMessage,
  result,
}: PersistParams): Promise<void> {
  if (!result.is_hot_lead) return

  const supabase = getSupabase()

  // Check for an existing lead row with this session_id
  const { data: existing } = await supabase
    .from('leads')
    .select('id, lead_score')
    .eq('session_id', sessionId)
    .single()

  // Only create once; on subsequent hot turns just update the score
  if (existing) {
    const { error } = await supabase
      .from('leads')
      .update({
        lead_score: Math.max(existing.lead_score ?? 0, result.lead_score),
        status: 'new',
        updated_at: new Date().toISOString(),
      })
      .eq('id', existing.id)

    if (error) {
      console.error('[/api/chat] leads update error:', error.message)
    }
    return
  }

  // First hot message — create the lead row
  const { error } = await supabase.from('leads').insert({
    session_id: sessionId,
    source: 'chat_widget',
    lead_score: result.lead_score,
    priority: result.lead_score >= 90 ? 'high' : 'medium',
    status: 'new',
    project_type: mapNextActionToProjectType(result.next_action),
    // Store the first message as context in user_agent field until contact form fills it
    user_agent: `first_message: ${userMessage.slice(0, 200)}`,
  })

  if (error) {
    console.error('[/api/chat] leads insert error:', error.message)
  }
}

/** Map Emily's next_action codes to rough project types for the leads table */
function mapNextActionToProjectType(nextAction: string): string {
  switch (nextAction) {
    case 'emergency_response':
      return 'emergency_repair'
    case 'schedule_estimate':
      return 'estimate_request'
    case 'schedule_inspection':
      return 'inspection'
    case 'insurance_consultation':
      return 'insurance_claim'
    default:
      return 'general_inquiry'
  }
}

// ─── Route handler ────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}))
    const message =
      typeof body?.message === 'string' ? body.message.trim() : ''

    if (!message) {
      return NextResponse.json(
        { success: false, error: 'message is required' },
        { status: 400 }
      )
    }

    // Use provided session_id or generate one — keep it stable across turns
    const sessionId: string =
      typeof body?.session_id === 'string' && body.session_id.trim()
        ? body.session_id.trim()
        : `chat_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`

    // Normalize conversation history (widget sends array of {type, content})
    const history: AgentMessage[] = Array.isArray(body?.conversation_history)
      ? body.conversation_history
          .filter((m: any) => m?.content)
          .map((m: any) => ({
            role:
              m.type === 'user' || m.role === 'user'
                ? ('user' as const)
                : ('assistant' as const),
            content: String(m.content),
          }))
      : []

    const result = await runEmilyAgent({
      message,
      conversationHistory: history,
      channel: 'web',
      sessionId,
    })

    // Fire-and-forget persistence — never block or fail the response
    const params: PersistParams = { sessionId, userMessage: message, result }
    persistConversation(params).catch(err =>
      console.error('[/api/chat] persist conversation failed:', err)
    )
    persistLead(params).catch(err =>
      console.error('[/api/chat] persist lead failed:', err)
    )

    const { openaiMessages: _omit, ...response } = result
    return NextResponse.json({ ...response, session_id: sessionId })
  } catch (err: any) {
    console.error('[/api/chat] Error:', err)
    return NextResponse.json(
      { success: false, error: err?.message || 'Unknown error' },
      { status: 500 }
    )
  }
}
