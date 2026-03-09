/**
 * /api/chat — Web chat proxy (used by ChatWidget / ChatService)
 * Delegates to Emily RAG agent. No n8n dependency.
 */
import { NextRequest, NextResponse } from 'next/server'
import { runEmilyAgent, AgentMessage } from '@/lib/agent'

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
      sessionId: body?.session_id,
    })

    const { openaiMessages: _omit, ...response } = result
    return NextResponse.json(response)
  } catch (err: any) {
    console.error('[/api/chat] Error:', err)
    return NextResponse.json(
      { success: false, error: err?.message || 'Unknown error' },
      { status: 500 }
    )
  }
}
