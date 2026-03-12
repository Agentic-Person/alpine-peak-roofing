/**
 * /api/voice — Twilio inbound call webhook
 *
 * Set this as the "A Call Comes In" webhook in the Twilio console:
 *   Phone Numbers → Manage → Active Numbers → 970-456-1176
 *   Voice & Fax → A Call Comes In → Webhook → POST
 *   URL: https://<your-domain>/api/voice
 *
 * Flow:
 *   1. Twilio calls this URL when someone dials (970) 456-1176
 *   2. We return TwiML that greets the caller and opens a <Gather> for speech
 *   3. Twilio streams the caller's speech → transcribes it → POSTs to /api/voice/process
 *   4. /api/voice/process calls Emily (runEmilyAgent), returns <Say> + next <Gather>
 *   5. Conversation loops until the caller hangs up
 *
 * Requires these env vars (set in .env.local and Vercel/production):
 *   TWILIO_ACCOUNT_SID   — from Twilio console
 *   TWILIO_AUTH_TOKEN    — from Twilio console (used to validate signatures)
 *   TWILIO_PHONE_NUMBER  — +19704561176
 *   NEXT_APP_URL         — full public URL of this deployment (e.g. https://alpinepeakroofing.com)
 */
import { NextRequest, NextResponse } from 'next/server'
import twilio from 'twilio'

/**
 * Optionally validate that the request genuinely came from Twilio.
 * Skip validation if TWILIO_AUTH_TOKEN is not set (placeholder still in place).
 */
function validateTwilioSignature(req: NextRequest, body: string): boolean {
  const authToken = process.env.TWILIO_AUTH_TOKEN
  if (!authToken || authToken.startsWith('placeholder_')) {
    console.warn('[voice] TWILIO_AUTH_TOKEN not set — skipping signature validation')
    return true
  }

  const signature = req.headers.get('x-twilio-signature') || ''
  const url = req.url
  // Parse form-encoded body into params object for validation
  const params: Record<string, string> = {}
  for (const [key, value] of new URLSearchParams(body)) {
    params[key] = value
  }

  return twilio.validateRequest(authToken, signature, url, params)
}

export async function POST(req: NextRequest) {
  const rawBody = await req.text()

  if (!validateTwilioSignature(req, rawBody)) {
    console.warn('[voice] Invalid Twilio signature — rejecting request')
    return new NextResponse('Forbidden', { status: 403 })
  }

  // Base URL for action callbacks — must be the public-facing URL in production
  const baseUrl = process.env.NEXT_APP_URL?.replace(/\/$/, '') || 'http://localhost:8080'
  const processUrl = `${baseUrl}/api/voice/process`

  // Build greeting TwiML
  const twiml = new twilio.twiml.VoiceResponse()

  twiml.say(
    { voice: 'Polly.Joanna', language: 'en-US' },
    "Hi! You've reached Alpine Peak Roofing. I'm Emily, your AI roofing assistant. How can I help you today?"
  )

  twiml.gather({
    input: ['speech'],
    action: processUrl,
    method: 'POST',
    speechTimeout: 'auto',
    speechModel: 'phone_call',
    language: 'en-US',
    timeout: 10,
  })

  // If caller says nothing, prompt once more then hang up gracefully
  twiml.say(
    { voice: 'Polly.Joanna' },
    "I didn't catch that. Please call us back at 9 7 0, 4 5 6, 1 1 7 6, or visit alpinepeakroofing.com. Have a great day!"
  )

  return new NextResponse(twiml.toString(), {
    headers: { 'Content-Type': 'text/xml' },
  })
}

// Twilio also sends GET for some configuration checks
export async function GET() {
  const twiml = new twilio.twiml.VoiceResponse()
  twiml.say({ voice: 'Polly.Joanna' }, 'Alpine Peak Roofing AI voice system is online.')
  return new NextResponse(twiml.toString(), {
    headers: { 'Content-Type': 'text/xml' },
  })
}
