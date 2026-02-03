import { NextRequest, NextResponse } from 'next/server'

// Server-side proxy to n8n so we don't expose webhook URLs or deal with CORS in the browser.
// Expects env:
// - N8N_CHAT_WEBHOOK_URL (full URL) OR
// - N8N_BASE_URL (e.g. https://agenticpersonnel.app.n8n.cloud)
// - N8N_CHAT_WEBHOOK_PATH (default: alpine-peak-chatbot)

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}))
    const message = typeof body?.message === 'string' ? body.message.trim() : ''

    if (!message) {
      return NextResponse.json({ success: false, error: 'message is required' }, { status: 400 })
    }

    const n8nWebhookUrl =
      process.env.N8N_CHAT_WEBHOOK_URL ||
      (process.env.N8N_BASE_URL
        ? `${process.env.N8N_BASE_URL.replace(/\/$/, '')}/webhook/${(process.env.N8N_CHAT_WEBHOOK_PATH || 'alpine-peak-chatbot').replace(/^\//, '')}`
        : '')

    if (!n8nWebhookUrl) {
      return NextResponse.json(
        { success: false, error: 'n8n webhook not configured (set N8N_CHAT_WEBHOOK_URL or N8N_BASE_URL)' },
        { status: 500 }
      )
    }

    const payload = {
      message,
      session_id: body?.session_id,
      page_context: body?.page_context,
      user_data: body?.user_data,
      conversation_history: body?.conversation_history,
      timestamp: new Date().toISOString(),
      page: body?.page,
      userAgent: req.headers.get('user-agent') || 'unknown',
      referrer: req.headers.get('referer') || ''
    }

    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 15000)

    const res = await fetch(n8nWebhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'alpine-peak-roofing-web/1.0'
      },
      body: JSON.stringify(payload),
      signal: controller.signal
    }).finally(() => clearTimeout(timeoutId))

    const contentType = res.headers.get('content-type') || ''
    const rawText = await res.text()

    if (!res.ok) {
      return NextResponse.json(
        { success: false, error: `n8n webhook failed: ${res.status} ${res.statusText}`, details: rawText },
        { status: 502 }
      )
    }

    // n8n workflow typically responds with JSON like { success: true, message: "..." }
    if (contentType.includes('application/json')) {
      const json = JSON.parse(rawText)
      return NextResponse.json(json)
    }

    // fallback: treat non-JSON as the assistant reply
    return NextResponse.json({ success: true, message: rawText })
  } catch (err: any) {
    const isAbort = err?.name === 'AbortError'
    return NextResponse.json(
      { success: false, error: isAbort ? 'n8n webhook timed out' : err?.message || 'Unknown error' },
      { status: 500 }
    )
  }
}
