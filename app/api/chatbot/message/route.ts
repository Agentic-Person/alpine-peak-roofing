import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase/client'
import { ChatService } from '@/lib/chatbot/chatService'

const chatService = new ChatService()

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { sessionId, message, context } = body

    if (!sessionId || !message) {
      return NextResponse.json(
        { error: 'Missing required fields: sessionId, message' },
        { status: 400 }
      )
    }

    // Process the message through the chat service
    const response = await chatService.sendMessage(sessionId, message, context)

    return NextResponse.json({
      success: true,
      data: response
    })

  } catch (error) {
    console.error('Chat message error:', error)
    
    return NextResponse.json(
      { 
        error: 'Failed to process chat message',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const sessionId = searchParams.get('sessionId')

    if (!sessionId) {
      return NextResponse.json(
        { error: 'Missing sessionId parameter' },
        { status: 400 }
      )
    }

    // Get conversation history
    const messages = await chatService.getConversation(sessionId)

    return NextResponse.json({
      success: true,
      data: { messages }
    })

  } catch (error) {
    console.error('Get messages error:', error)
    
    return NextResponse.json(
      { 
        error: 'Failed to get conversation',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}