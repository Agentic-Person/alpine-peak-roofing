/**
 * /api/voice/llm — ElevenLabs Custom LLM endpoint
 *
 * ElevenLabs Conversational AI calls this when configured as a "Custom LLM."
 * Returns OpenAI-compatible SSE streaming.
 *
 * ElevenLabs dashboard → Agent → Model → Custom LLM:
 *   URL: https://yoursite.com/api/voice/llm
 *
 * Flow:
 *   1. ElevenLabs sends conversation messages (OpenAI format)
 *   2. We RAG-search Supabase with the latest user message
 *   3. We inject context + voice channel hint → forward to OpenClaw Emily
 *   4. Stream OpenClaw's response back to ElevenLabs
 *   5. ElevenLabs converts to speech using the custom 11Labs voice
 *
 * Emily's persona lives in OpenClaw — we only add knowledge context here.
 */
import { NextRequest } from 'next/server'
import { searchKnowledgeBase, getAgentClient, buildSystemPrompt } from '@/lib/agent'
import OpenAI from 'openai'

export const runtime = 'nodejs'

/**
 * Verify the shared secret ElevenLabs sends on every Custom LLM request.
 *
 * In ElevenLabs dashboard → Agent → Model → Custom LLM → Custom headers:
 *   Header name:  x-elevenlabs-secret
 *   Header value: <same value as ELEVENLABS_LLM_SECRET in your .env.local>
 *
 * Also accepts standard Bearer token in Authorization header as alternative.
 */
function isAuthorized(req: NextRequest): boolean {
  const secret = process.env.ELEVENLABS_LLM_SECRET
  if (!secret) {
    // If no secret configured, log a warning but allow through
    // (lets you test before setting up the secret)
    console.warn('[voice/llm] ELEVENLABS_LLM_SECRET not set — endpoint is unprotected')
    return true
  }

  const headerSecret = req.headers.get('x-elevenlabs-secret')
  if (headerSecret === secret) return true

  // Also accept as Bearer token (some integrations use Authorization header)
  const authHeader = req.headers.get('authorization') || ''
  if (authHeader === `Bearer ${secret}`) return true

  return false
}

export async function POST(req: NextRequest) {
  if (!isAuthorized(req)) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  try {
    const body = await req.json()
    const { messages = [], stream: streamRequested = true } = body as {
      messages: OpenAI.ChatCompletionMessageParam[]
      stream?: boolean
    }

    // Extract latest user message for RAG
    const userMessages = messages.filter(m => m.role === 'user')
    const latestUserMessage =
      typeof userMessages[userMessages.length - 1]?.content === 'string'
        ? (userMessages[userMessages.length - 1].content as string)
        : ''

    // RAG: always runs against our Supabase knowledge base
    const context = await searchKnowledgeBase(latestUserMessage)

    const { client, model, useOpenClaw } = getAgentClient()

    let messagesForAgent: OpenAI.ChatCompletionMessageParam[]

    if (useOpenClaw) {
      // Emily's persona is in OpenClaw — only inject RAG context + voice hint
      const systemMessages: OpenAI.ChatCompletionMessageParam[] = []

      if (context) {
        systemMessages.push({
          role: 'system',
          content: `KNOWLEDGE BASE CONTEXT (use this to answer accurately):\n${context}`,
        })
      }

      // Always inject voice channel hint for calls
      systemMessages.push({
        role: 'system',
        content:
          'CHANNEL: Live phone call. Keep every response to 2–3 short sentences. No bullet points, no markdown. Speak naturally as if on the phone.',
      })

      // Strip any system messages ElevenLabs sent, add ours, keep conversation
      messagesForAgent = [
        ...systemMessages,
        ...messages.filter(m => m.role !== 'system').slice(-12),
      ]
    } else {
      // Fallback: full Emily prompt with RAG context
      const systemPrompt = buildSystemPrompt(context, 'voice')
      messagesForAgent = [
        { role: 'system', content: systemPrompt },
        ...messages.filter(m => m.role !== 'system').slice(-12),
      ]
    }

    // ── Streaming (default — ElevenLabs expects this) ─────────────────────────
    if (streamRequested !== false) {
      const openaiStream = await client.chat.completions.create({
        model,
        messages: messagesForAgent,
        max_tokens: 120, // Voice: short responses prevent dead air
        temperature: 0.7,
        stream: true,
      })

      const encoder = new TextEncoder()
      const readable = new ReadableStream({
        async start(controller) {
          try {
            for await (const chunk of openaiStream) {
              controller.enqueue(encoder.encode(`data: ${JSON.stringify(chunk)}\n\n`))
            }
            controller.enqueue(encoder.encode('data: [DONE]\n\n'))
          } finally {
            controller.close()
          }
        },
      })

      return new Response(readable, {
        headers: {
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache, no-transform',
          Connection: 'keep-alive',
          'X-Accel-Buffering': 'no',
          'X-Agent-Source': useOpenClaw ? 'openclaw:emily' : 'openai:fallback',
        },
      })
    }

    // ── Non-streaming fallback ────────────────────────────────────────────────
    const completion = await client.chat.completions.create({
      model,
      messages: messagesForAgent,
      max_tokens: 120,
      temperature: 0.7,
      stream: false,
    })

    return new Response(JSON.stringify(completion), {
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (err: any) {
    console.error('[voice/llm] Error:', err)
    return new Response(
      JSON.stringify({
        error: { message: err?.message || 'Internal server error', type: 'server_error' },
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}
