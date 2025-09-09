'use client'

// Alpine Peak Roofing - AI Chat Widget
// Integrated with n8n RAG workflows

import React, { useState, useRef, useEffect } from 'react'
import { MessageCircle, X, Send, Loader2, Bot, User, HelpCircle, AlertCircle } from 'lucide-react'

interface ChatMessage {
  id: string
  role: 'user' | 'assistant' | 'system'
  content: string
  timestamp: Date
  metadata?: {
    retrievedSources?: number
    confidenceScore?: number
    tokensUsed?: number
    processingTimeMs?: number
  }
}

interface ChatResponse {
  success: boolean
  response: string
  session_id: string
  conversation_id: string
  metadata: {
    retrieved_sources: number
    confidence_score: number
    tokens_used: number
    processing_time_ms: number
  }
  timestamp: string
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [inputMessage, setInputMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [sessionId, setSessionId] = useState('')
  const [conversationId, setConversationId] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Initialize session on component mount
  useEffect(() => {
    const newSessionId = `session_${Date.now()}_${Math.random().toString(36).substring(2)}`
    setSessionId(newSessionId)
    
    // Add welcome message
    const welcomeMessage: ChatMessage = {
      id: `msg_${Date.now()}`,
      role: 'assistant',
      content: "👋 Hi! I'm Alpine Peak Roofing's AI assistant. I can help you with questions about our premium roofing services, materials, processes, and expertise in Colorado mountain communities. How can I assist you today?",
      timestamp: new Date()
    }
    setMessages([welcomeMessage])
  }, [])

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return

    const userMessage: ChatMessage = {
      id: `msg_${Date.now()}_user`,
      role: 'user',
      content: inputMessage.trim(),
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputMessage('')
    setIsLoading(true)
    setError(null)

    try {
      // Call n8n RAG chat workflow
      const response = await fetch(`${process.env.NEXT_PUBLIC_N8N_WEBHOOK_BASE_URL}/alpine-peak-chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage.content,
          session_id: sessionId,
          conversation_id: conversationId,
          max_results: 5,
          similarity_threshold: 0.78,
          include_context: true,
          timestamp: new Date().toISOString()
        }),
      })

      if (!response.ok) {
        throw new Error(`Chat service error: ${response.status}`)
      }

      const chatResponse: ChatResponse = await response.json()

      if (chatResponse.success) {
        // Update conversation ID if this is the first exchange
        if (!conversationId && chatResponse.conversation_id) {
          setConversationId(chatResponse.conversation_id)
        }

        const assistantMessage: ChatMessage = {
          id: `msg_${Date.now()}_assistant`,
          role: 'assistant',
          content: chatResponse.response,
          timestamp: new Date(chatResponse.timestamp),
          metadata: chatResponse.metadata
        }

        setMessages(prev => [...prev, assistantMessage])
      } else {
        throw new Error('Chat service returned unsuccessful response')
      }
    } catch (error) {
      console.error('Chat error:', error)
      
      const errorMessage: ChatMessage = {
        id: `msg_${Date.now()}_error`,
        role: 'assistant',
        content: "I apologize, but I'm having trouble connecting to our chat service right now. Please try again in a moment, or feel free to call us directly at (303) 555-ROOF for immediate assistance.",
        timestamp: new Date()
      }

      setMessages(prev => [...prev, errorMessage])
      setError(error instanceof Error ? error.message : 'Unknown error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const clearChat = () => {
    const welcomeMessage: ChatMessage = {
      id: `msg_${Date.now()}`,
      role: 'assistant',
      content: "Chat cleared. How can I help you today?",
      timestamp: new Date()
    }
    setMessages([welcomeMessage])
    setConversationId(null)
    setError(null)
  }

  const formatTimestamp = (timestamp: Date) => {
    return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-lg transition-all duration-300 hover:scale-105"
        aria-label="Open chat"
      >
        <MessageCircle className="h-6 w-6" />
      </button>
    )
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 w-96 max-w-[90vw] bg-white rounded-lg shadow-2xl border border-gray-200 flex flex-col max-h-[600px]">
      {/* Header */}
      <div className="bg-blue-600 text-white p-4 rounded-t-lg flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Bot className="h-5 w-5" />
          <div>
            <h3 className="font-semibold text-sm">Alpine Peak AI Assistant</h3>
            <p className="text-xs text-blue-100">
              {isLoading ? 'Thinking...' : 'Online'}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={clearChat}
            className="text-blue-100 hover:text-white transition-colors"
            title="Clear chat"
          >
            <HelpCircle className="h-4 w-4" />
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="text-blue-100 hover:text-white transition-colors"
            title="Close chat"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex items-start space-x-2 ${
              message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''
            }`}
          >
            <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
              message.role === 'user' 
                ? 'bg-gray-600 text-white' 
                : 'bg-blue-600 text-white'
            }`}>
              {message.role === 'user' ? (
                <User className="h-4 w-4" />
              ) : (
                <Bot className="h-4 w-4" />
              )}
            </div>
            
            <div className={`flex-1 max-w-xs ${
              message.role === 'user' ? 'text-right' : ''
            }`}>
              <div className={`inline-block p-3 rounded-lg text-sm ${
                message.role === 'user'
                  ? 'bg-gray-600 text-white'
                  : 'bg-gray-100 text-gray-800'
              }`}>
                <p className="whitespace-pre-wrap">{message.content}</p>
                
                {/* Metadata for assistant messages */}
                {message.role === 'assistant' && message.metadata && (
                  <div className="mt-2 pt-2 border-t border-gray-200 text-xs text-gray-500">
                    <div className="flex justify-between items-center">
                      <span>Sources: {message.metadata.retrievedSources}</span>
                      <span>
                        Confidence: {Math.round(message.metadata.confidenceScore * 100)}%
                      </span>
                    </div>
                  </div>
                )}
              </div>
              
              <div className={`text-xs text-gray-500 mt-1 ${
                message.role === 'user' ? 'text-right' : ''
              }`}>
                {formatTimestamp(message.timestamp)}
              </div>
            </div>
          </div>
        ))}

        {/* Loading indicator */}
        {isLoading && (
          <div className="flex items-start space-x-2">
            <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center">
              <Bot className="h-4 w-4" />
            </div>
            <div className="bg-gray-100 p-3 rounded-lg text-sm">
              <div className="flex items-center space-x-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Searching our knowledge base...</span>
              </div>
            </div>
          </div>
        )}

        {/* Error display */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            <div className="flex items-center space-x-2 text-red-600">
              <AlertCircle className="h-4 w-4" />
              <span className="text-sm">Connection issue - please try again</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t border-gray-200 p-4">
        <div className="flex space-x-2">
          <input
            ref={inputRef}
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask about roofing services..."
            disabled={isLoading}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm disabled:bg-gray-100"
            maxLength={500}
          />
          <button
            onClick={sendMessage}
            disabled={isLoading || !inputMessage.trim()}
            className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            title="Send message"
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </button>
        </div>
        
        <div className="text-xs text-gray-500 mt-2 text-center">
          Powered by AI • {sessionId.split('_')[1] ? 'Session active' : 'Ready'}
        </div>
      </div>
    </div>
  )
}