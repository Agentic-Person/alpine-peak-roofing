// Debug endpoint to check environment variables
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  return NextResponse.json({
    N8N_WEBHOOK_URL: process.env.N8N_WEBHOOK_URL || 'NOT SET',
    N8N_API_KEY: process.env.N8N_API_KEY ? 'SET' : 'NOT SET',
    OPENAI_API_KEY: process.env.OPENAI_API_KEY ? 'SET' : 'NOT SET',
    NODE_ENV: process.env.NODE_ENV,
    timestamp: new Date().toISOString()
  })
}