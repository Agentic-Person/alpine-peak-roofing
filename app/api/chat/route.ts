import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

// Server-side proxy: n8n first, OpenAI fallback if n8n is empty/unavailable.
// Env vars:
//   N8N_CHAT_WEBHOOK_URL  — full URL OR
//   N8N_BASE_URL + N8N_CHAT_WEBHOOK_PATH (default: alpine-peak-chatbot)
//   OPENAI_API_KEY        — required for fallback
//   OPENAI_FALLBACK_MODEL — optional, default gpt-4o-mini

const ALPINE_PEAK_SYSTEM_PROMPT = `You are Emily, the AI assistant for Alpine Peak Roofing — a premium roofing contractor serving Denver, Colorado and surrounding areas. Our motto: "Pinnacle of Protection, Peak of Performance."

COMPANY:
- Location: Denver metro + Front Range, CO
- Services: Residential & commercial roofing, storm damage restoration, repairs, emergency service
- Materials: Asphalt shingles, metal roofing, tile, flat/TPO
- Experience: 15+ years, fully licensed & insured
- Insurance claim assistance included

PRICING (typical 2,000 sq ft home):
- Asphalt Shingle Replacement: $8,500–$15,000
- Metal Roofing: $12,000–$25,000
- Free inspections always offered
- 0% financing available for qualified homeowners
- 24/7 emergency response

BEHAVIOR:
- Be helpful, warm, and professional — you're a knowledgeable roofing expert
- Always offer free inspections for serious inquiries
- For emergencies/leaks, emphasize 24/7 availability immediately
- Ask 1–2 qualifying questions to understand the customer's situation
- Suggest clear next steps (schedule inspection, call now, get estimate)
- Keep responses concise (2–4 sentences) unless detail is needed
- Do NOT fabricate specific contractor names, warranty lengths, or permit details you don't know`

async function callOpenAIFallback(
  message: string,
  conversationHistory: Array<{ role: 'user' | 'assistant'; content: string }> = []
): Promise<{ response: string; lead_score: number; is_hot_lead: boolean; next_action: string; quick_actions: Array<{ id: string; label: string; action: string; value: string }> }> {
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  const model = process.env.OPENAI_FALLBACK_MODEL || 'gpt-4o-mini'

  const messages: OpenAI.ChatCompletionMessageParam[] = [
    { role: 'system', content: ALPINE_PEAK_SYSTEM_PROMPT },
    ...conversationHistory.slice(-6), // keep last 6 turns for context
    { role: 'user', content: message }
  ]

  const completion = await openai.chat.completions.create({
    model,
    messages,
    max_tokens: 350,
    temperature: 0.7
  })

  const reply = completion.choices[0]?.message?.content?.trim() ||
    "I'm sorry, I had trouble with that. Please call us at (970) 446-8995 for immediate help."

  // Simple lead scoring from message intent
  const lower = message.toLowerCase()
  let lead_score = 20
  let next_action = 'continue_conversation'
  let is_hot_lead = false

  if (/emergency|urgent|leak|flood|collapse|storm damage/i.test(lower)) {
    lead_score = 95; is_hot_lead = true; next_action = 'emergency_response'
  } else if (/estimate|quote|price|cost|how much/i.test(lower)) {
    lead_score = 85; is_hot_lead = true; next_action = 'schedule_estimate'
  } else if (/schedule|appointment|inspection|inspect/i.test(lower)) {
    lead_score = 75; is_hot_lead = true; next_action = 'schedule_inspection'
  } else if (/material|shingle|metal|tile|warranty|insurance/i.test(lower)) {
    lead_score = 45; next_action = 'provide_info'
  }

  const quick_actions = lead_score >= 70
    ? [
        { id: 'schedule', label: 'Schedule Free Inspection', action: 'send_message', value: 'I would like to schedule a free inspection' },
        { id: 'estimate', label: 'Get an Estimate', action: 'send_message', value: 'Can you give me an estimate?' },
        { id: 'call', label: 'Call Now', action: 'send_message', value: 'What is your phone number?' }
      ]
    : [
        { id: 'inspection', label: 'Free Inspection', action: 'send_message', value: 'How does the free inspection work?' },
        { id: 'services', label: 'Our Services', action: 'send_message', value: 'What roofing services do you offer?' },
        { id: 'materials', label: 'Roofing Materials', action: 'send_message', value: 'What roofing materials do you recommend?' }
      ]

  return { response: reply, lead_score, is_hot_lead, next_action, quick_actions }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}))
    const message = typeof body?.message === 'string' ? body.message.trim() : ''

    if (!message) {
      return NextResponse.json({ success: false, error: 'message is required' }, { status: 400 })
    }

    // Build n8n webhook URL
    const n8nWebhookUrl =
      process.env.N8N_CHAT_WEBHOOK_URL ||
      (process.env.N8N_BASE_URL
        ? `${process.env.N8N_BASE_URL.replace(/\/$/, '')}/webhook/${(process.env.N8N_CHAT_WEBHOOK_PATH || 'alpine-peak-chatbot').replace(/^\//, '')}`
        : '')

    // --- Attempt n8n first ---
    let n8nResponse: any = null
    let n8nError: string | null = null

    if (n8nWebhookUrl) {
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

      try {
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 12000)

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

        console.log('n8n proxy:', { status: res.status, ok: res.ok, contentType, bodyPreview: rawText?.slice(0, 200) || '' })

        if (res.ok && contentType.includes('application/json') && rawText.trim()) {
          const json = JSON.parse(rawText.trim())
          // Only use n8n response if it has actual content (not empty/error)
          if (json?.message || json?.response || json?.reply) {
            n8nResponse = json
          } else {
            n8nError = 'n8n returned empty JSON payload'
          }
        } else if (res.ok && rawText.trim() && !contentType.includes('application/json')) {
          // Plain text response
          n8nResponse = { success: true, message: rawText.trim(), source: 'n8n' }
        } else if (!res.ok) {
          n8nError = `n8n ${res.status} ${res.statusText}`
        } else {
          n8nError = 'n8n returned empty body'
        }
      } catch (err: any) {
        n8nError = err?.name === 'AbortError' ? 'n8n timed out' : (err?.message || 'n8n unreachable')
        console.warn('n8n chat proxy error:', n8nError)
      }
    } else {
      n8nError = 'n8n not configured'
    }

    // Use n8n response if it came back with real content
    if (n8nResponse) {
      return NextResponse.json({ ...n8nResponse, source: 'n8n' })
    }

    // --- Fallback: OpenAI ---
    console.log(`n8n unavailable (${n8nError}), falling back to OpenAI`)

    if (!process.env.OPENAI_API_KEY) {
      // Absolute last resort
      return NextResponse.json({
        success: true,
        message: "Thanks for reaching out! Please call us at (970) 446-8995 or we'll follow up with you shortly.",
        source: 'static_fallback'
      })
    }

    // Parse conversation history if provided
    const conversationHistory: Array<{ role: 'user' | 'assistant'; content: string }> =
      Array.isArray(body?.conversation_history)
        ? body.conversation_history
            .filter((m: any) => m?.type && m?.content)
            .map((m: any) => ({
              role: m.type === 'user' ? 'user' as const : 'assistant' as const,
              content: String(m.content)
            }))
        : []

    const fallback = await callOpenAIFallback(message, conversationHistory)

    return NextResponse.json({
      success: true,
      ...fallback,
      source: 'openai_fallback',
      n8n_unavailable: true,
      n8n_error: n8nError
    })

  } catch (err: any) {
    console.error('Chat route error:', err)
    return NextResponse.json(
      { success: false, error: err?.message || 'Unknown error' },
      { status: 500 }
    )
  }
}
