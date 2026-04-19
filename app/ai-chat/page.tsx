'use client'

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { chatService } from '@/lib/chatbot/chatService'
import type { ChatMessage as ChatMessageType, ChatResponse } from '@/lib/chatbot/types'
import {
  ArrowLeft,
  Send,
  Mic,
  Copy,
  MoreVertical,
  Trash2,
  Phone
} from 'lucide-react'

// Roofing-specific sample questions
const SAMPLE_QUESTIONS = [
  "How do I prevent ice dams in Colorado winters?",
  "What's the lifespan of a metal roof in Denver?",
  "Signs my roof needs replacement after hail damage",
  "Cost comparison: asphalt vs. metal roofing",
  "Do you handle insurance claims for storm damage?",
  "What's included in your roofing warranty?",
  "How do I prepare for roof replacement?",
  "What are the best materials for Colorado weather?"
]

interface FullChatMessageProps {
  message: ChatMessageType
  onCopy?: (content: string) => void
}

function FullChatMessage({ message, onCopy }: FullChatMessageProps) {
  const isBot = message.type === 'bot'
  const [showTime, setShowTime] = useState(false)

  return (
    <div className={cn(
      'flex w-full mb-6 message-slide-in',
      isBot ? 'justify-start' : 'justify-end'
    )}>
      <div className={cn(
        'flex max-w-[85%] space-x-3',
        isBot ? 'flex-row' : 'flex-row-reverse space-x-reverse'
      )}>
        {/* Avatar */}
        <div className="flex-shrink-0">
          {isBot ? (
            <div className="h-10 w-10 rounded-full overflow-hidden bg-white flex items-center justify-center">
              <Image
                src="/images/logo/APR-LOGO-solo.webp"
                alt="Alpine Peak Roofing Logo"
                width={32}
                height={32}
                className="object-contain"
              />
            </div>
          ) : (
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
              <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
            </div>
          )}
        </div>

        {/* Message Bubble */}
        <div
          className={cn(
            'relative rounded-2xl px-4 py-3 max-w-full break-words chat-bubble glass-effect',
            isBot
              ? 'border border-white/20 shadow-lg text-gray-900'
              : 'bg-gradient-to-br from-white/20 to-white/10 text-white border border-white/20'
          )}
          style={isBot ? { backgroundColor: '#C7E1FC' } : {}}
          onMouseEnter={() => setShowTime(true)}
          onMouseLeave={() => setShowTime(false)}
        >
          <div className={cn(
            'text-base leading-relaxed',
            isBot ? 'text-gray-900' : 'text-white'
          )}>
            {message.content}
          </div>

          {/* Timestamp and actions */}
          {showTime && (
            <div className={cn(
              'absolute -bottom-6 text-xs flex items-center space-x-2',
              isBot ? 'left-0 text-white/70' : 'right-0 text-white/70'
            )}>
              <span>
                {new Date(message.timestamp).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </span>
              {onCopy && (
                <button
                  onClick={() => onCopy(message.content)}
                  className="hover:text-white transition-colors"
                  title="Copy message"
                >
                  <Copy className="h-3 w-3" />
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function TypingIndicator() {
  return (
    <div className="flex justify-start mb-6">
      <div className="flex max-w-[85%] space-x-3">
        <div className="h-10 w-10 rounded-full overflow-hidden bg-white flex items-center justify-center">
          <Image
            src="/images/logo/APR-LOGO-solo.webp"
            alt="Alpine Peak Roofing Logo"
            width={32}
            height={32}
            className="object-contain"
          />
        </div>
        <div className="glass-effect border border-white/20 shadow-lg rounded-2xl px-4 py-3" style={{ backgroundColor: '#C7E1FC' }}>
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
        </div>
      </div>
    </div>
  )
}

function SampleQuestions({ onQuestionClick }: { onQuestionClick: (question: string) => void }) {
  return (
    <div className="w-full">
      <div className="mb-4">
        <h3 className="text-center text-white/80 font-medium mb-3">Try asking:</h3>
      </div>
      <div className="flex flex-wrap justify-center gap-2">
        {SAMPLE_QUESTIONS.map((question, index) => (
          <button
            key={index}
            onClick={() => onQuestionClick(question)}
            className="sample-question px-4 py-2 bg-white/10 hover:bg-white/20 glass-effect text-white text-sm rounded-full border border-white/20 transition-all duration-200 hover:scale-105"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {question}
          </button>
        ))}
      </div>
    </div>
  )
}

export default function AIChatPage() {
  const [messages, setMessages] = useState<ChatMessageType[]>([])
  const [isTyping, setIsTyping] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [sessionId, setSessionId] = useState<string | null>(null)
  const [isConnected, setIsConnected] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // Initialize session
  useEffect(() => {
    initializeSession()
  }, [])

  // Auto-scroll to bottom
  useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping])

  const initializeSession = async () => {
    try {
      const existingSessionId = chatService.getOrCreateSessionId()
      setSessionId(existingSessionId)
      setIsConnected(true)

      // Send welcome message
      const welcomeMessage: ChatMessageType = {
        id: `welcome_${Date.now()}`,
        type: 'bot',
        content: "Hi! I'm Emily, Alpine Peak Roofing's AI assistant. I'm here to help you with all your roofing questions and needs. Whether you're dealing with storm damage, considering a roof replacement, or just want to learn about different roofing materials, I'm here to provide expert guidance. What can I help you with today?",
        timestamp: new Date(),
        metadata: {}
      }
      setMessages([welcomeMessage])
    } catch (error) {
      console.error('Failed to initialize chat session:', error)
      setSessionId(`local_${Date.now()}`)
      setIsConnected(true)
    }
  }

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      const chatContainer = messagesEndRef.current.closest('.chat-messages-container')
      if (chatContainer) {
        chatContainer.scrollTop = chatContainer.scrollHeight
      }
    }
  }

  const handleSendMessage = async (messageContent: string) => {
    if (!sessionId || !messageContent.trim()) return

    const userMessage: ChatMessageType = {
      id: `msg_${Date.now()}`,
      type: 'user',
      content: messageContent.trim(),
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsTyping(true)

    try {
      const response: ChatResponse = await chatService.sendMessage(
        sessionId,
        messageContent,
        {
          page: '/ai-chat',
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
      } else {
        throw new Error(response.error || 'Failed to get response')
      }
    } catch (error) {
      console.error('Failed to send message:', error)
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

  const handleQuestionClick = (question: string) => {
    setInputValue(question)
    textareaRef.current?.focus()
  }

  const handleCopyMessage = (content: string) => {
    navigator.clipboard.writeText(content)
  }

  const handleClearChat = () => {
    setMessages([])
    initializeSession()
  }

  const handleInputSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (inputValue.trim()) {
      handleSendMessage(inputValue)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleInputSubmit(e)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value)
    // Auto-resize textarea
    const textarea = e.target
    textarea.style.height = 'auto'
    textarea.style.height = Math.min(textarea.scrollHeight, 120) + 'px'
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#0066CC' }}>
      {/* Header */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <Link
            href="/ai-tools"
            className="text-white hover:text-white/80 transition-colors flex items-center space-x-2"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Back to AI Tools</span>
          </Link>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClearChat}
              className="text-white hover:text-white/80 hover:bg-white/10"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:text-white/80 hover:bg-white/10"
            >
              <MoreVertical className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Title Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Meet Emily, your personalized, go-to roofing expert.
          </h1>
          <p className="text-xl text-white/90 max-w-4xl mx-auto leading-relaxed">
            From materials and maintenance tips to Alpine Peak services, Emily answers any roofing question. She can book appointments and deliver the info you need, right to your inbox.
          </p>
        </div>

        {/* Main Content - Two Panel Layout */}
        <div className="flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto">

          {/* Left Panel - Emily Avatar & Start Call (30%) */}
          <div className="lg:w-[30%] flex flex-col items-center">
            <div className="ai-avatar-border pulsing-border holographic-panel rounded-3xl p-1" style={{ height: '600px' }}>
              <div className="bg-white/10 glass-effect rounded-3xl p-8 h-full flex flex-col justify-center">
                <div className="text-center">
                  <div className="relative mb-6">
                    <div className="w-48 h-48 mx-auto rounded-full overflow-hidden border-4 border-white/20 shadow-xl">
                      <Image
                        src="/images/team/ai-agent-avatar-02.webp"
                        alt="Emily - AI Consultant"
                        width={192}
                        height={192}
                        className="object-cover object-center w-full h-full"
                      />
                    </div>
                  </div>

                  <h2 className="text-3xl font-bold text-white mb-2">"Emily"</h2>
                  <p className="text-xl text-white/80 mb-6">AI Consultant Ready</p>
                  <p className="text-white/70 text-sm mb-8">Type or speak to learn about Alpine Peak Roofing</p>

                  <button
                    className="premium-call-button px-8 py-4 rounded-xl text-lg font-semibold flex items-center justify-center space-x-2"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M15.5 1H8.5C7.67 1 7 1.67 7 2.5V21.5C7 22.33 7.67 23 8.5 23H15.5C16.33 23 17 22.33 17 21.5V2.5C17 1.67 16.33 1 15.5 1ZM12 22C11.17 22 10.5 21.33 10.5 20.5S11.17 19 12 19 13.5 19.67 13.5 20.5 12.83 22 12 22ZM15 18H9V4H15V18ZM9.5 5.5V6.5H14.5V5.5H9.5ZM10.5 7.5H13.5V8.5H10.5V7.5ZM10.5 9.5H13.5V10.5H10.5V9.5Z"/>
                    </svg>
                    <span>Connect with Emily</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel - Chat Window (70%) */}
          <div className="lg:w-[70%]">
            <div className="embedded-window rounded-3xl flex flex-col" style={{ height: '600px' }}>

              {/* Messages Container */}
              <div className="flex-1 overflow-y-auto p-6 pr-3 chat-messages-container">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <FullChatMessage
                      key={message.id}
                      message={message}
                      onCopy={handleCopyMessage}
                    />
                  ))}
                  {isTyping && <TypingIndicator />}
                  <div ref={messagesEndRef} />
                </div>
              </div>

              {/* Input Area */}
              <div className="border-t border-white/20 p-4">
                <form onSubmit={handleInputSubmit} className="flex items-end space-x-3">
                  <div className="flex-1 relative">
                    <textarea
                      ref={textareaRef}
                      value={inputValue}
                      onChange={handleInputChange}
                      onKeyPress={handleKeyPress}
                      placeholder="Ask me anything about roofing..."
                      disabled={!isConnected || isTyping}
                      rows={1}
                      className={cn(
                        'w-full resize-none rounded-xl border border-white/20 px-4 py-3 text-base',
                        'bg-white/20 backdrop-blur-sm text-white placeholder-white/70',
                        'focus:border-white/50 focus:outline-none focus:ring-2 focus:ring-white/30',
                        'focus:bg-white/30',
                        'disabled:bg-white/10 disabled:text-white/50',
                        'min-h-[48px] max-h-[120px] overflow-y-auto'
                      )}
                    />
                  </div>

                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-12 w-12 p-0 text-white hover:text-white/80 hover:bg-white/10 rounded-xl"
                  >
                    <Mic className="h-5 w-5" />
                  </Button>

                  <Button
                    type="submit"
                    disabled={!inputValue.trim() || !isConnected || isTyping}
                    className="h-12 w-12 p-0 rounded-xl bg-cyan-500 hover:bg-cyan-600"
                  >
                    <Send className="h-5 w-5" />
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* Sample Questions */}
        {messages.length <= 1 && !isTyping && (
          <div className="mt-12">
            <SampleQuestions onQuestionClick={handleQuestionClick} />
          </div>
        )}
      </div>
    </div>
  )
}