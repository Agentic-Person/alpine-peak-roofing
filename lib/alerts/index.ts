/**
 * Alpine Peak Roofing — Hot Lead Alert System
 *
 * When a high-value lead comes in, three things fire simultaneously:
 *
 * 1. SMS → Team's cell phone via Twilio (instant, human-readable)
 * 2. Emily (OpenClaw) → CRM agent gets the lead data to process
 * 3. ElevenLabs outbound AI call → Emily calls the lead directly (if phone present)
 *
 * Env vars needed:
 *   TEAM_ALERT_PHONE          — Team mobile number (e.g. +19704561176)
 *   ELEVENLABS_PHONE_NUMBER_ID — From ElevenLabs dashboard → Phone Numbers
 *                                (only needed if you want AI outbound calls)
 */

export interface LeadAlertData {
  email: string
  firstName?: string
  lastName?: string
  phone?: string
  address?: string
  source?: string
  leadScore?: number
  priority?: string
  estimateTotal?: number
  materialType?: string
  leadId?: string
}

// ─────────────────────────────────────────────────────────────────────────────
// 1. Twilio SMS — instant team notification
// ─────────────────────────────────────────────────────────────────────────────
export async function sendSmsAlert(lead: LeadAlertData): Promise<boolean> {
  const sid   = process.env.TWILIO_ACCOUNT_SID
  const token = process.env.TWILIO_AUTH_TOKEN
  const from  = process.env.TWILIO_PHONE_NUMBER
  const to    = process.env.TEAM_ALERT_PHONE

  if (!sid || !token || !from || !to) {
    console.warn('[alert] Twilio SMS skipped — missing env vars (TEAM_ALERT_PHONE etc.)')
    return false
  }

  const name       = [lead.firstName, lead.lastName].filter(Boolean).join(' ') || 'Unknown'
  const scoreEmoji = (lead.leadScore ?? 0) >= 80 ? '🔥' : (lead.leadScore ?? 0) >= 50 ? '⚡' : '📋'
  const estimate   = lead.estimateTotal
    ? ` | Est: $${lead.estimateTotal.toLocaleString()}`
    : ''
  const phone      = lead.phone ? `\nPhone: ${lead.phone}` : ''
  const address    = lead.address ? `\nAddress: ${lead.address}` : ''

  const body = `${scoreEmoji} HOT LEAD — Alpine Peak Roofing\n` +
    `Name: ${name}\n` +
    `Email: ${lead.email}` +
    phone +
    address +
    `\nScore: ${lead.leadScore ?? 0}/100${estimate}` +
    `\nSource: ${lead.source || 'website'}` +
    `\n\nCALL NOW — high intent lead.`

  try {
    const res = await fetch(
      `https://api.twilio.com/2010-04-01/Accounts/${sid}/Messages.json`,
      {
        method: 'POST',
        headers: {
          Authorization: 'Basic ' + Buffer.from(`${sid}:${token}`).toString('base64'),
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({ From: from, To: to, Body: body }).toString(),
      }
    )
    if (!res.ok) {
      const err = await res.text()
      console.error('[alert] Twilio SMS failed:', res.status, err)
      return false
    }
    console.log('[alert] SMS sent to team')
    return true
  } catch (err) {
    console.error('[alert] Twilio SMS exception:', err)
    return false
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// 2. OpenClaw Emily notification — CRM agent processes the lead
// ─────────────────────────────────────────────────────────────────────────────
export async function notifyEmilyNewLead(lead: LeadAlertData): Promise<boolean> {
  const baseUrl = process.env.OPENCLAW_BASE_URL || 'http://100.124.20.121:18790/v1'
  const apiKey  = process.env.OPENCLAW_API_KEY
  const model   = process.env.OPENCLAW_AGENT_MODEL || 'openclaw:emily'

  if (!apiKey) {
    console.warn('[alert] OpenClaw notification skipped — no OPENCLAW_API_KEY')
    return false
  }

  const name       = [lead.firstName, lead.lastName].filter(Boolean).join(' ') || 'Unknown'
  const priority   = lead.priority?.toUpperCase() ?? 'MEDIUM'
  const estimate   = lead.estimateTotal
    ? `\n- Estimate Total: $${lead.estimateTotal.toLocaleString()}`
    : ''
  const material   = lead.materialType ? `\n- Material Selected: ${lead.materialType}` : ''

  // Use a unique session ID per lead so Emily keeps context about this specific person
  const sessionId = `lead-${lead.leadId || Date.now()}`

  const systemMessage = `[INTERNAL LEAD NOTIFICATION]
A new ${priority} priority lead has come in from the Alpine Peak Roofing website.

LEAD DETAILS:
- Name: ${name}
- Email: ${lead.email}
- Phone: ${lead.phone || 'Not provided'}
- Address: ${lead.address || 'Not provided'}
- Source: ${lead.source || 'website'}
- Lead Score: ${lead.leadScore ?? 0}/100
- Priority: ${priority}${estimate}${material}

ACTION REQUIRED:
${lead.phone
  ? `This lead has a phone number. They should be contacted by phone immediately. Lead score ${lead.leadScore ?? 0}/100 indicates ${priority === 'HIGH' ? 'very high' : 'solid'} purchase intent.`
  : `No phone number captured yet. Follow up via email at ${lead.email}.`
}

Please log this lead in your CRM context and initiate appropriate follow-up.`

  try {
    const res = await fetch(`${baseUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model,
        user: sessionId,
        messages: [
          { role: 'system', content: systemMessage },
          { role: 'user', content: `New lead received: ${name} (${lead.email}). Please acknowledge and log this lead.` }
        ],
        max_tokens: 200,
      }),
    })

    if (!res.ok) {
      const err = await res.text()
      console.error('[alert] OpenClaw Emily notification failed:', res.status, err)
      return false
    }

    const data = await res.json()
    console.log('[alert] Emily notified of new lead. Response:', data?.choices?.[0]?.message?.content?.slice(0, 100))
    return true
  } catch (err) {
    console.error('[alert] OpenClaw Emily exception:', err)
    return false
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// 3. ElevenLabs outbound call — Emily calls the lead directly
//
// Requires: ELEVENLABS_PHONE_NUMBER_ID
//   → Find in ElevenLabs dashboard → Phone Numbers
//   → The Twilio number must be connected there first
// ─────────────────────────────────────────────────────────────────────────────
export async function initiateEmilyOutboundCall(lead: LeadAlertData): Promise<{ callId?: string; success: boolean }> {
  if (!lead.phone) {
    console.log('[alert] Outbound call skipped — no phone number')
    return { success: false }
  }

  const agentId     = process.env.ELEVENLABS_AGENT_ID
  const apiKey      = process.env.ELEVENLABS_API_KEY
  const phoneNumId  = process.env.ELEVENLABS_PHONE_NUMBER_ID

  if (!agentId || !apiKey || !phoneNumId) {
    console.warn('[alert] ElevenLabs outbound call skipped — add ELEVENLABS_PHONE_NUMBER_ID to .env.local')
    console.warn('  Find it: ElevenLabs dashboard → Phone Numbers → your Twilio number → ID')
    return { success: false }
  }

  // Normalize phone to E.164 format (+1XXXXXXXXXX)
  const raw = lead.phone.replace(/\D/g, '')
  const e164 = raw.startsWith('1') ? `+${raw}` : `+1${raw}`

  const name       = lead.firstName ? `, ${lead.firstName}` : ''
  const addressStr = lead.address ? ` regarding their property at ${lead.address}` : ''

  // Override first message so Emily greets with context
  const firstMessage = `Hi${name}! This is Emily calling from Alpine Peak Roofing. You just requested a free roof estimate${addressStr} on our website. I wanted to reach out personally to make sure you have everything you need and answer any questions. Is now a good time to chat?`

  try {
    const res = await fetch('https://api.elevenlabs.io/v1/convai/conversations/outbound_call', {
      method: 'POST',
      headers: {
        'xi-api-key': apiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        agent_id: agentId,
        agent_phone_number_id: phoneNumId,
        to_number: e164,
        conversation_config_override: {
          agent: {
            first_message: firstMessage,
          },
        },
      }),
    })

    if (!res.ok) {
      const err = await res.text()
      console.error('[alert] ElevenLabs outbound call failed:', res.status, err)
      return { success: false }
    }

    const data = await res.json()
    console.log('[alert] Emily outbound call initiated. Call ID:', data?.conversation_id)
    return { callId: data?.conversation_id, success: true }
  } catch (err) {
    console.error('[alert] ElevenLabs outbound call exception:', err)
    return { success: false }
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Master orchestrator — fires all three alert channels simultaneously
// ─────────────────────────────────────────────────────────────────────────────
export async function alertHotLead(lead: LeadAlertData): Promise<void> {
  console.log(`[alert] Hot lead alert firing for ${lead.email} (score: ${lead.leadScore}, priority: ${lead.priority})`)

  // All fire in parallel — none block the API response
  const tasks: Promise<unknown>[] = [
    sendSmsAlert(lead),
    notifyEmilyNewLead(lead),
  ]

  // Only attempt outbound call for leads with a phone number
  if (lead.phone) {
    tasks.push(initiateEmilyOutboundCall(lead))
  }

  await Promise.allSettled(tasks)
}
