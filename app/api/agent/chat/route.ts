/**
 * /api/agent/chat — Unified Emily RAG chat endpoint
 * Used by the web chat widget. Returns JSON.
 * Voice calls use /api/voice/llm instead.
 */
import { NextRequest, NextResponse } from 'next/server'
import { runEmilyAgent, AgentMessage } from '@/lib/agent'
import { rateLimit, getClientIp } from '@/lib/rateLimit'

// 20 messages per IP per minute — enough for a real conversation, blocks abuse
const RATE_LIMIT = { windowMs: 60_000, max: 20 }

export async function POST(req: NextRequest) {
  // Rate limiting
  const ip = getClientIp(req)
  const { allowed, remaining, resetAt } = rateLimit(ip, RATE_LIMIT)

  if (!allowed) {
    return NextResponse.json(
      { success: false, error: 'Too many requests. Please slow down.' },
      {
        status: 429,
        headers: {
          'Retry-After': String(Math.ceil((resetAt - Date.now()) / 1000)),
          'X-RateLimit-Remaining': '0',
        },
      }
    )
  }

  try {
    const body = await req.json()
    const {
      message,
      session_id,
      conversation_history = [],
      channel = 'web',
    } = body

    if (!message?.trim()) {
      return NextResponse.json(
        { success: false, error: 'message is required' },
        { status: 400 }
      )
    }

    // Hard cap on message length — prevents prompt injection via huge payloads
    if (String(message).length > 2000) {
      return NextResponse.json(
        { success: false, error: 'Message too long.' },
        { status: 400 }
      )
    }

    // Normalize conversation history from widget format → agent format
    const history: AgentMessage[] = Array.isArray(conversation_history)
      ? conversation_history
          .filter((m: any) => m?.content)
          .slice(-20) // cap history depth
          .map((m: any) => ({
            role: (m.type === 'user' || m.role === 'user') ? 'user' as const : 'assistant' as const,
            content: String(m.content).slice(0, 2000), // cap each message too
          }))
      : []

    const result = await runEmilyAgent({
      message: String(message).trim(),
      conversationHistory: history,
      channel: channel === 'voice' ? 'voice' : 'web',
      sessionId: session_id,
    })

    // Strip internal field before sending to client
    const { openaiMessages: _omit, ...response } = result

    return NextResponse.json(response, {
      headers: { 'X-RateLimit-Remaining': String(remaining) },
    })
  } catch (err: any) {
    console.error('[agent/chat] Error:', err)
    return NextResponse.json(
      { success: false, error: err?.message || 'Unknown error' },
      { status: 500 }
    )
  }
}
