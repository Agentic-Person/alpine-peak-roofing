import { NextRequest, NextResponse } from 'next/server'
import { n8nClient } from '@/lib/n8n/client'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { session_id, message, context } = body

    if (!session_id || !message) {
      return NextResponse.json(
        { error: 'Missing required fields: session_id, message' },
        { status: 400 }
      )
    }

    // Process the message through n8n workflow
    const result = await n8nClient.processChatMessage(session_id, message, context || {})

    return NextResponse.json({
      success: true,
      data: result
    })

  } catch (error) {
    console.error('Chatbot process error:', error)
    
    return NextResponse.json(
      { 
        error: 'Failed to process chat message',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Chatbot process endpoint is active',
    methods: ['POST'],
    requiredFields: ['session_id', 'message'],
    optionalFields: ['context']
  })
}