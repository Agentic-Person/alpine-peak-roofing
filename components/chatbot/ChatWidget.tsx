'use client'

import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { ChatHeader } from './ChatHeader'
import { ChatMessage } from './ChatMessage'
import { ChatInput } from './ChatInput'
import { TypingIndicator } from './TypingIndicator'
import { QuickActions } from './QuickActions'
import { chatService } from '@/lib/chatbot/chatService'
import type { 
  ChatMessage as ChatMessageType, 
  ChatWidgetConfig, 
  QuickAction,
  ChatResponse 
} from '@/lib/chatbot/types'

interface ChatWidgetProps {
  position?: 'bottom-right' | 'bottom-left'
  theme?: 'light' | 'dark' | 'alpine'
  autoOpen?: boolean
  className?: string
}

export function ChatWidget({ 
  position = 'bottom-right',
  theme = 'alpine',
  autoOpen = false,
  className 
}: ChatWidgetProps) {
  // State management
  const [isOpen, setIsOpen] = useState(autoOpen)
  const [isConnected, setIsConnected] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const [sessionId, setSessionId] = useState<string | null>(null)
  const [messages, setMessages] = useState<ChatMessageType[]>([])
  const [quickActions, setQuickActions] = useState<QuickAction[]>([])
  const [error, setError] = useState<string | null>(null)
  const [leadScore, setLeadScore] = useState(0)

  // Refs
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  // Initialize session on mount
  useEffect(() => {
    initializeSession()
  }, [])

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Focus input when widget opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  const initializeSession = async () => {
    try {
      const existingSessionId = chatService.getOrCreateSessionId()
      setSessionId(existingSessionId)

      // Load existing conversation
      const existingMessages = await chatService.getConversation(existingSessionId)
      setMessages(existingMessages)
      
      setIsConnected(true)

      // Send welcome message for new sessions
      if (existingMessages.length === 0) {
        await sendWelcomeMessage(existingSessionId)
      }

    } catch (error) {
      console.error('Failed to initialize chat session:', error)
      setError('Failed to connect to chat service')
      setIsConnected(false)
    }
  }

  const sendWelcomeMessage = async (sessionId: string) => {
    const welcomeMessage: ChatMessageType = {
      id: `welcome_${Date.now()}`,
      type: 'bot',
      content: "Hi! I'm Alpine Peak Roofing's AI assistant. I can help you with roofing questions, provide estimates, or schedule an inspection. What brings you here today?",
      timestamp: new Date(),
      metadata: {
        actions: [
          { id: 'quote', label: 'Get a Quote', action: 'send_message', value: 'I need a roofing quote' },
          { id: 'inspection', label: 'Schedule Inspection', action: 'schedule_inspection' },
          { id: 'emergency', label: 'Emergency Repair', action: 'emergency_contact' }
        ]
      }
    }

    setMessages([welcomeMessage])
    setQuickActions(welcomeMessage.metadata?.actions || [])
  }

  const sendMessage = async (content: string) => {
    if (!sessionId || !content.trim()) return

    const userMessage: ChatMessageType = {
      id: `msg_${Date.now()}`,
      type: 'user',
      content: content.trim(),
      timestamp: new Date()
    }

    // Add user message immediately
    setMessages(prev => [...prev, userMessage])
    setIsTyping(true)
    setError(null)

    try {
      // Send to chatbot service
      const response: ChatResponse = await chatService.sendMessage(
        sessionId,
        content,
        {
          page: window.location.pathname,
          user_agent: navigator.userAgent,
          referrer: document.referrer
        }
      )

      if (response.success) {
        const botMessage: ChatMessageType = {
          id: `bot_${Date.now()}`,
          type: 'bot',
          content: response.response,
          timestamp: new Date(),
          metadata: {
            lead_score: response.lead_score,
            actions: response.quick_actions
          }
        }

        setMessages(prev => [...prev, botMessage])
        setQuickActions(response.quick_actions || [])
        setLeadScore(response.lead_score)

        // Handle special responses
        if (response.is_hot_lead) {
          handleHotLead()
        }
      } else {
        throw new Error(response.error || 'Failed to get response')
      }
    } catch (error) {
      console.error('Failed to send message:', error)
      setError('Failed to send message. Please try again.')
      
      const errorMessage: ChatMessageType = {
        id: `error_${Date.now()}`,
        type: 'bot',
        content: 'I apologize, but I encountered a technical issue. Please try again in a moment.',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsTyping(false)
    }
  }

  const handleQuickAction = async (action: QuickAction) => {
    switch (action.action) {
      case 'send_message':
        if (action.value) {
          await sendMessage(action.value)
        }
        break
      case 'schedule_inspection':
        await sendMessage('I would like to schedule a roof inspection')
        break
      case 'emergency_contact':
        await sendMessage('I have a roofing emergency that needs immediate attention')
        break
      case 'request_callback':
        await sendMessage('Please have someone call me back')
        break
    }
  }

  const handleFileUpload = async (file: File) => {
    if (!sessionId) return

    setIsTyping(true)
    try {
      const response = await chatService.uploadFile(sessionId, file)
      
      if (response.success) {
        const uploadMessage: ChatMessageType = {
          id: `upload_${Date.now()}`,
          type: 'user',
          content: `📷 Uploaded: ${file.name}`,
          timestamp: new Date()
        }
        
        setMessages(prev => [...prev, uploadMessage])
        
        // Send a follow-up message about the upload
        await sendMessage('I uploaded a photo. Can you help me with what you see?')
      } else {
        setError(response.error || 'Failed to upload file')
      }
    } catch (error) {
      console.error('File upload error:', error)
      setError('Failed to upload file')
    } finally {
      setIsTyping(false)
    }
  }

  const handleHotLead = () => {
    // Could trigger additional UI elements, notifications, etc.
    console.log('Hot lead detected! Score:', leadScore)
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const toggleWidget = () => {
    setIsOpen(!isOpen)
  }

  const clearError = () => {
    setError(null)
  }

  // Position classes
  const positionClasses = {
    'bottom-right': 'bottom-4 right-4',
    'bottom-left': 'bottom-4 left-4'
  }

  // Theme classes
  const themeClasses = {
    light: 'bg-white border-gray-200 text-gray-900',
    dark: 'bg-gray-900 border-gray-700 text-white',
    alpine: 'bg-white border-blue-200 text-gray-900'
  }

  if (!isOpen) {
    return (
      <div className={cn('fixed z-50', positionClasses[position])}>
        {/* Animated gradient border container */}
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-yellow-400 opacity-75 blur-sm animate-pulse" />
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600 via-blue-400 to-yellow-400 animate-spin-slow opacity-60" style={{ animation: 'spin 8s linear infinite' }} />
          
          <Button
            onClick={toggleWidget}
            className="relative h-42 w-42 rounded-full bg-gradient-to-br from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 shadow-2xl border-4 border-white/20 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-blue-500/25 group overflow-hidden"
            aria-label="Open AI Assistant Chat"
          >
            {/* AI Agent Avatar */}
            <div className="relative w-full h-full flex items-center justify-center">
              <div className="relative w-36 h-36 rounded-full overflow-hidden border-3 border-white/30 shadow-inner">
                <Image
                  src="/images/team/ai-agent-avatar-02.png"
                  alt="AI Assistant"
                  fill
                  className="object-cover object-center"
                  priority
                />
              </div>
              {/* Pulse overlay */}
              <div className="absolute inset-0 rounded-full bg-blue-400/20 animate-ping" />
              {/* Glow effect */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400/0 via-blue-400/10 to-blue-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </Button>

          {/* Enhanced notification badge */}
          {leadScore > 0 && (
            <div className="absolute -top-3 -right-3 h-8 w-8 rounded-full bg-gradient-to-r from-red-500 to-orange-500 flex items-center justify-center text-sm text-white font-bold shadow-lg animate-bounce border-2 border-white">
              !
            </div>
          )}

          {/* Floating text hint */}
          <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-3 py-1 rounded-lg text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
            Chat with AI Assistant
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900" />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={cn('fixed z-50', positionClasses[position])}>
      <div className={cn(
        'flex flex-col h-[500px] w-[380px] rounded-lg border shadow-2xl',
        'md:h-[600px] md:w-[400px]',
        themeClasses[theme],
        className
      )}>
        {/* Header */}
        <ChatHeader 
          isConnected={isConnected}
          leadScore={leadScore}
          onClose={toggleWidget}
          onMinimize={toggleWidget}
        />

        {/* Messages Container */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <ChatMessage
              key={message.id}
              message={message}
              theme={theme}
            />
          ))}
          
          {isTyping && <TypingIndicator />}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Actions */}
        {quickActions.length > 0 && (
          <div className="px-4 py-2 border-t border-gray-200">
            <QuickActions
              actions={quickActions}
              onActionClick={handleQuickAction}
            />
          </div>
        )}

        {/* Error Display */}
        {error && (
          <div className="px-4 py-2 bg-red-50 border-t border-red-200">
            <div className="flex items-center justify-between">
              <p className="text-sm text-red-600">{error}</p>
              <Button
                variant="ghost"
                size="sm"
                onClick={clearError}
                className="text-red-600 hover:text-red-700"
              >
                ✕
              </Button>
            </div>
          </div>
        )}

        {/* Input */}
        <div className="border-t border-gray-200 p-4">
          <ChatInput
            ref={inputRef}
            onSendMessage={sendMessage}
            onFileUpload={handleFileUpload}
            disabled={!isConnected || isTyping}
            placeholder={
              !isConnected 
                ? "Connecting..." 
                : isTyping 
                ? "Thinking..." 
                : "Type your message..."
            }
          />
        </div>
      </div>
    </div>
  )
}

export default ChatWidget