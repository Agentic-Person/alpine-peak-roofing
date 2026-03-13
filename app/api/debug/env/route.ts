// Debug endpoint - restricted to development only
// This endpoint is intentionally locked in production for security
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  // Block in production — never expose env var status publicly
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  return NextResponse.json({
    N8N_WEBHOOK_URL: process.env.N8N_WEBHOOK_URL ? 'SET' : 'NOT SET',
    N8N_API_KEY: process.env.N8N_API_KEY ? 'SET' : 'NOT SET',
    OPENAI_API_KEY: process.env.OPENAI_API_KEY ? 'SET' : 'NOT SET',
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL ? 'SET' : 'NOT SET',
    CMS_API_KEY: process.env.CMS_API_KEY ? 'SET' : 'NOT SET',
    TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID ? 'SET' : 'NOT SET',
    TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN ? 'SET' : 'NOT SET',
    NODE_ENV: process.env.NODE_ENV,
    timestamp: new Date().toISOString()
  })
}
