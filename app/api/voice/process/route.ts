/**
 * /api/voice/process — Twilio <Gather> action handler
 *
 * Twilio POSTs here after transcribing the caller's speech.
 * We call runEmilyAgent() with the transcription and return TwiML:
 *   <Say> Emily's response </Say>
 *   <Gather> next caller turn </Gather>
 *
 * Conversation history is threaded via a compact base64-encoded JSON blob
 * passed through Twilio's <Gather action="...?history=..."> query param,
 * so no server-side session storage is needed.
 */
import { NextRequest, NextResponse } from 'next/server'
import twilio from 'twilio'
import { runEmilyAgent, type AgentMessage } from '@/lib/agent'

const MAX_HISTORY_TURNS = 8 // keep last N assistant/user pairs to stay within URL limits

function encodeHistory(history: AgentMessage[]): string {
  try {
    return Buffer.from(JSON.stringify(history.slice(-MAX_HISTORY_TURNS * 2))).toString('base64url')
  } catch {
    return ''
  }
}

function decodeHistory(encoded: string): AgentMessage[] {
  try {
    if (!encoded) return []
    return JSON.parse(Buffer.from(encoded, 'base64url').toString('utf-8'))
  } catch {
    return []
  }
}

export async function POST(req: NextRequest) {
  const rawBody = await req.text()
  const params = new URLSearchParams(rawBody)

  const speechResult = params.get('SpeechResult') || ''
  const callSid = params.get('CallSid') || ''

  // Conversation history is carried in the query string of the action URL
  const { searchParams } = new URL(req.url)
  const historyEncoded = searchParams.get('history') || ''
  const conversationHistory = decodeHistory(historyEncoded)

  // Strip \r\n and trailing whitespace that can creep in from env vars (causes &#xD;&#xA; in TwiML)
  const baseUrl = (process.env.NEXT_APP_URL || 'http://localhost:8080').replace(/[\r\n\s]+/g, '').replace(/\/$/, '')
  const twiml = new twilio.twiml.VoiceResponse()

  // If Twilio couldn't transcribe anything, re-prompt once
  if (!speechResult.trim()) {
    twiml.say(
      { voice: 'Polly.Joanna' },
      "Sorry, I didn't catch that. Could you repeat your question?"
    )
    twiml.gather({
      input: ['speech'],
      action: `${baseUrl}/api/voice/process?history=${encodeURIComponent(historyEncoded)}`,
      method: 'POST',
      speechTimeout: 'auto',
      speechModel: 'phone_call',
      language: 'en-US',
      timeout: 10,
    })
    twiml.say({ voice: 'Polly.Joanna' }, 'No problem — feel free to call us back. Goodbye!')
    twiml.hangup()
    return new NextResponse(twiml.toString(), { headers: { 'Content-Type': 'text/xml' } })
  }

  // Call Emily
  let emilyResponse: string
  let updatedHistory: AgentMessage[]

  try {
    const result = await runEmilyAgent({
      message: speechResult,
      conversationHistory,
      channel: 'voice',
      sessionId: callSid,
    })

    emilyResponse = result.response

    // Update history for the next turn
    updatedHistory = [
      ...conversationHistory,
      { role: 'user' as const, content: speechResult },
      { role: 'assistant' as const, content: emilyResponse },
    ]
  } catch (err: any) {
    console.error('[voice/process] Emily agent error:', err)
    emilyResponse =
      "I'm sorry, I ran into a technical issue. Please call us directly at 9 7 0, 4 5 6, 1 1 7 6 and we'll be happy to help."
    updatedHistory = conversationHistory
  }

  // Speak Emily's response
  twiml.say({ voice: 'Polly.Joanna', language: 'en-US' }, emilyResponse)

  // Gather next turn (with updated history in the action URL)
  const nextHistoryParam = encodeURIComponent(encodeHistory(updatedHistory))
  twiml.gather({
    input: ['speech'],
    action: `${baseUrl}/api/voice/process?history=${nextHistoryParam}`,
    method: 'POST',
    speechTimeout: 'auto',
    speechModel: 'phone_call',
    language: 'en-US',
    timeout: 12,
  })

  // If caller goes silent after response, offer a polite close
  twiml.say(
    { voice: 'Polly.Joanna' },
    "Is there anything else I can help you with? If not, feel free to call us back at 9 7 0, 4 5 6, 1 1 7 6. Have a great day!"
  )
  twiml.hangup()

  return new NextResponse(twiml.toString(), {
    headers: { 'Content-Type': 'text/xml' },
  })
}
