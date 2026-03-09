/**
 * Alpine Peak Roofing — Emily AI Agent
 * Single source of truth for chat + voice. All channels import from here.
 *
 * PRIMARY:  Routes to Emily in OpenClaw (http://100.124.20.121:18790/v1)
 *           Her persona lives there. We only inject RAG context + channel hints.
 * FALLBACK: Direct OpenAI if OpenClaw is unreachable, with full Emily prompt.
 *
 * Env vars (set in .env.local):
 *   OPENCLAW_BASE_URL        — e.g. http://100.124.20.121:18790/v1
 *   OPENCLAW_API_KEY         — Bearer token from OpenClaw dashboard
 *   OPENCLAW_AGENT_MODEL     — default: openclaw:emily
 *   OPENAI_API_KEY           — used for RAG embeddings + fallback chat
 *   OPENAI_AGENT_MODEL       — fallback model, default: gpt-4o-mini
 */
import { createClient } from '@supabase/supabase-js'
import OpenAI from 'openai'

// ─── Types ────────────────────────────────────────────────────────────────────

export interface AgentMessage {
  role: 'user' | 'assistant'
  content: string
}

export interface QuickAction {
  id: string
  label: string
  action: string
  value: string
}

export interface AgentResponse {
  success: boolean
  response: string
  lead_score: number
  is_hot_lead: boolean
  next_action: string
  quick_actions: QuickAction[]
  rag_context_used: boolean
  source: string
  session_id?: string
}

// ─── Emily fallback prompt (used only when OpenClaw is unreachable) ───────────
// When OpenClaw is live, Emily's persona is managed inside OpenClaw.
// This is the safety net so the website still works even if OpenClaw is down.

const EMILY_FALLBACK_PROMPT = `You are Emily, the AI assistant for Alpine Peak Roofing — a premium roofing contractor serving Denver, Colorado and surrounding mountain communities. Our motto: "Pinnacle of Protection, Peak of Performance."

COMPANY:
- Locations: Denver metro, Front Range, Aspen, Vail, Telluride, Breckenridge, Steamboat Springs, Winter Park, Keystone, Crested Butte, Copper Mountain
- Phone: (970) 456-1176
- Services: Residential roofing, commercial roofing, storm damage restoration, 24/7 emergency repairs, insurance claim assistance
- Materials: GAF Timberline HDZ shingles, standing seam metal, stone-coated steel, natural slate, cedar shake, copper, TPO/EPDM
- Experience: 15+ years, fully licensed, bonded, and insured in Colorado
- Financing: 0% interest financing available for qualified homeowners
- Emergency: 24/7 emergency response

PRICING (approximate — always offer a free inspection for accurate quotes):
- GAF Timberline HDZ Shingles: $4.50–$7.00/sqft installed ($9,000–$14,000 typical home)
- Standing Seam Metal: $10.00–$16.00/sqft installed
- Slate: $20,000–$50,000+ residential
- Cedar Shake: $15,000–$30,000 typical
- Mountain projects: 20–40% premium over standard installations

BEHAVIOR:
- Warm, helpful, and professional — you're a knowledgeable roofing expert
- For emergencies/leaks: immediately give the phone number (970) 456-1176 and 24/7 availability
- Always offer a free inspection for serious inquiries
- Ask 1–2 qualifying questions before diving into solutions
- Suggest clear next steps: free inspection, call, or estimate
- Never fabricate warranty terms, permit numbers, or pricing you don't know
- You are Emily, an AI assistant — never claim to be human`

// ─── Client factory ───────────────────────────────────────────────────────────

interface AgentClient {
  client: OpenAI
  model: string
  useOpenClaw: boolean
}

function getAgentClient(): AgentClient {
  const openclawUrl = process.env.OPENCLAW_BASE_URL
  const openclawKey = process.env.OPENCLAW_API_KEY

  if (openclawUrl && openclawKey) {
    return {
      client: new OpenAI({
        baseURL: openclawUrl,
        apiKey: openclawKey,
        // Increase timeout — OpenClaw is on Tailscale, not a CDN
        timeout: 30_000,
      }),
      model: process.env.OPENCLAW_AGENT_MODEL || 'openclaw:emily',
      useOpenClaw: true,
    }
  }

  // Fallback: direct OpenAI
  return {
    client: new OpenAI({
      apiKey: process.env.OPENAI_API_KEY!,
    }),
    model: process.env.OPENAI_AGENT_MODEL || 'gpt-4o-mini',
    useOpenClaw: false,
  }
}

// Separate client just for embeddings — always uses OpenAI directly
// (OpenClaw doesn't need to handle embedding generation)
export function getEmbeddingClient(): OpenAI {
  const key = process.env.OPENAI_API_KEY
  if (!key) throw new Error('OPENAI_API_KEY is required for RAG embeddings')
  return new OpenAI({ apiKey: key })
}

// ─── Supabase ─────────────────────────────────────────────────────────────────

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) throw new Error('Missing Supabase configuration')
  return createClient(url, key)
}

// ─── RAG: Semantic search of the knowledge base ───────────────────────────────

export async function searchKnowledgeBase(query: string): Promise<string> {
  try {
    const openai = getEmbeddingClient()
    const embeddingResponse = await openai.embeddings.create({
      model: 'text-embedding-ada-002',
      input: query.slice(0, 8000),
    })
    const embedding = embeddingResponse.data[0].embedding

    const supabase = getSupabase()
    const { data, error } = await supabase.rpc('search_knowledge_base', {
      query_embedding: embedding,
      match_threshold: 0.62,
      match_count: 5,
    })

    if (error) {
      console.warn('[agent] Knowledge base search error:', error.message)
      return ''
    }
    if (!data?.length) return ''

    return (data as Array<{ content: string }>)
      .map(row => row.content)
      .join('\n\n---\n\n')
  } catch (err) {
    console.error('[agent] RAG search failed:', err)
    return ''
  }
}

// ─── Prompt builders ──────────────────────────────────────────────────────────

/**
 * When using OpenClaw: only inject RAG context (Emily's persona lives there).
 * Optionally add a voice channel hint so Emily keeps responses short on calls.
 */
export function buildOpenClawMessages(
  context: string,
  channel: 'web' | 'voice',
  conversationHistory: AgentMessage[],
  userMessage: string
): OpenAI.ChatCompletionMessageParam[] {
  const messages: OpenAI.ChatCompletionMessageParam[] = []

  if (context) {
    messages.push({
      role: 'system',
      content: `KNOWLEDGE BASE CONTEXT (use this to answer the user accurately):\n${context}`,
    })
  }

  if (channel === 'voice') {
    messages.push({
      role: 'system',
      content:
        'CHANNEL: Live phone call. Keep every response to 2–3 short sentences. No bullet points, no markdown, no lists. Speak naturally.',
    })
  }

  messages.push(...conversationHistory.slice(-10))
  messages.push({ role: 'user', content: userMessage })

  return messages
}

/**
 * When using OpenAI fallback: full Emily persona + RAG context in one system message.
 */
export function buildFallbackMessages(
  context: string,
  channel: 'web' | 'voice',
  conversationHistory: AgentMessage[],
  userMessage: string
): OpenAI.ChatCompletionMessageParam[] {
  const voiceNote =
    channel === 'voice'
      ? '\n\nVOICE CALL: Keep every response to 2–3 short sentences. No bullet points or markdown. Speak naturally.'
      : ''

  const contextBlock = context
    ? `\n\nKNOWLEDGE BASE CONTEXT:\n${context}`
    : ''

  return [
    { role: 'system', content: EMILY_FALLBACK_PROMPT + voiceNote + contextBlock },
    ...conversationHistory.slice(-10),
    { role: 'user', content: userMessage },
  ]
}

// Keep this exported so /api/voice/llm can still call it for non-OpenClaw path
export function buildSystemPrompt(context: string, channel: 'web' | 'voice' = 'web'): string {
  const voiceNote =
    channel === 'voice'
      ? '\n\nVOICE CALL: Keep every response to 2–3 short sentences. No bullet points or markdown. Speak naturally.'
      : ''
  const contextBlock = context
    ? `\n\nKNOWLEDGE BASE CONTEXT:\n${context}`
    : ''
  return EMILY_FALLBACK_PROMPT + voiceNote + contextBlock
}

// ─── Lead scoring ─────────────────────────────────────────────────────────────

export function scoreLead(message: string): {
  lead_score: number
  is_hot_lead: boolean
  next_action: string
} {
  const lower = message.toLowerCase()
  if (/emergency|urgent|active leak|water coming in|flood|collapse|storm damage/.test(lower)) {
    return { lead_score: 95, is_hot_lead: true, next_action: 'emergency_response' }
  }
  if (/estimate|quote|price|cost|how much|what.*(cost|charge|run)/.test(lower)) {
    return { lead_score: 85, is_hot_lead: true, next_action: 'schedule_estimate' }
  }
  if (/schedule|appointment|inspection|come out|free inspection|inspect/.test(lower)) {
    return { lead_score: 75, is_hot_lead: true, next_action: 'schedule_inspection' }
  }
  if (/insurance|claim|hail damage|adjuster|supplement/.test(lower)) {
    return { lead_score: 70, is_hot_lead: true, next_action: 'insurance_consultation' }
  }
  if (/material|shingle|metal|tile|slate|copper|cedar|warranty/.test(lower)) {
    return { lead_score: 45, is_hot_lead: false, next_action: 'provide_info' }
  }
  return { lead_score: 20, is_hot_lead: false, next_action: 'continue_conversation' }
}

function getQuickActions(leadScore: number): QuickAction[] {
  if (leadScore >= 70) {
    return [
      { id: 'inspect', label: 'Schedule Free Inspection', action: 'send_message', value: 'I would like to schedule a free inspection' },
      { id: 'estimate', label: 'Get an Estimate', action: 'send_message', value: 'Can you give me an estimate?' },
      { id: 'call', label: 'Call (970) 456-1176', action: 'phone', value: '9704561176' },
    ]
  }
  return [
    { id: 'inspection', label: 'Free Inspection', action: 'send_message', value: 'How does the free inspection work?' },
    { id: 'services', label: 'Our Services', action: 'send_message', value: 'What roofing services do you offer?' },
    { id: 'materials', label: 'Roofing Materials', action: 'send_message', value: 'What roofing materials do you recommend?' },
  ]
}

// ─── Main agent runner ────────────────────────────────────────────────────────

export async function runEmilyAgent(params: {
  message: string
  conversationHistory: AgentMessage[]
  channel: 'web' | 'voice'
  sessionId?: string
}): Promise<AgentResponse & { openaiMessages: OpenAI.ChatCompletionMessageParam[] }> {
  const { message, conversationHistory, channel, sessionId } = params

  // RAG search runs regardless of which backend we use
  const context = await searchKnowledgeBase(message)

  const { client, model, useOpenClaw } = getAgentClient()

  const openaiMessages = useOpenClaw
    ? buildOpenClawMessages(context, channel, conversationHistory, message)
    : buildFallbackMessages(context, channel, conversationHistory, message)

  const maxTokens = channel === 'voice' ? 120 : 380

  let response: string
  let source: string

  try {
    const completion = await client.chat.completions.create({
      model,
      messages: openaiMessages,
      max_tokens: maxTokens,
      temperature: 0.7,
      // Pass session ID so OpenClaw routes repeat visitors to the same Emily session
      user: sessionId,
    })

    response =
      completion.choices[0]?.message?.content?.trim() ||
      "I'm sorry, I had trouble with that. Please call us at (970) 456-1176 for immediate assistance."

    source = useOpenClaw ? 'openclaw:emily' : 'openai:emily_fallback'
  } catch (err: any) {
    // If OpenClaw is unreachable, attempt direct OpenAI fallback
    if (useOpenClaw) {
      console.warn('[agent] OpenClaw unreachable, falling back to OpenAI:', err.message)
      const fallbackClient = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! })
      const fallbackMessages = buildFallbackMessages(context, channel, conversationHistory, message)

      const fallback = await fallbackClient.chat.completions.create({
        model: process.env.OPENAI_AGENT_MODEL || 'gpt-4o-mini',
        messages: fallbackMessages,
        max_tokens: maxTokens,
        temperature: 0.7,
      })

      response =
        fallback.choices[0]?.message?.content?.trim() ||
        "I'm sorry, I had trouble with that. Please call us at (970) 456-1176."

      source = 'openai:emily_fallback'
    } else {
      throw err
    }
  }

  const scoring = scoreLead(message)

  return {
    success: true,
    response,
    session_id: sessionId,
    ...scoring,
    quick_actions: getQuickActions(scoring.lead_score),
    rag_context_used: !!context,
    source,
    openaiMessages,
  }
}

// Exported so /api/voice/llm can build its own streaming request to OpenClaw
export { getAgentClient }
