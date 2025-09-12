'use client'

import React from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import type { ChatMessage as ChatMessageType } from '@/lib/chatbot/types'

interface ChatMessageProps {
  message: ChatMessageType
  theme?: 'light' | 'dark' | 'alpine'
  className?: string
}

export function ChatMessage({ message, theme = 'alpine', className }: ChatMessageProps) {
  const formatTimestamp = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    }).format(new Date(date))
  }

  const renderMessageContent = (content: string) => {
    // Simple markdown-like formatting
    let formattedContent = content
      // Bold text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      // Italic text
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      // Line breaks
      .replace(/\n/g, '<br />')

    // Handle links
    const linkRegex = /(https?:\/\/[^\s]+)/g
    formattedContent = formattedContent.replace(linkRegex, '<a href="$1" target="_blank" rel="noopener noreferrer" class="text-blue-600 underline hover:text-blue-800">$1</a>')

    return <div dangerouslySetInnerHTML={{ __html: formattedContent }} />
  }

  if (message.type === 'system') {
    return (
      <div className={cn('flex justify-center py-2', className)}>
        <div className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full">
          {message.content}
        </div>
      </div>
    )
  }

  const isBot = message.type === 'bot'
  const isUser = message.type === 'user'

  return (
    <div className={cn(
      'flex w-full',
      isUser ? 'justify-end' : 'justify-start',
      className
    )}>
      <div className={cn(
        'flex max-w-[85%] space-x-2',
        isUser ? 'flex-row-reverse space-x-reverse' : 'flex-row'
      )}>
        {/* Avatar */}
        <div className={cn(
          'flex-shrink-0 h-8 w-8 rounded-full overflow-hidden',
          isBot 
            ? 'border border-blue-200' 
            : 'bg-gray-300 flex items-center justify-center text-sm font-semibold text-gray-700'
        )}>
          {isBot ? (
            <Image
              src="/images/team/ai-agent-avatar-02.png"
              alt="Sarah - AI Assistant"
              width={32}
              height={32}
              className="object-cover object-center w-full h-full"
            />
          ) : (
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
          )}
        </div>

        {/* Message Bubble */}
        <div className="flex flex-col space-y-1 min-w-0">
          <div className={cn(
            'px-4 py-2 rounded-2xl text-sm leading-relaxed break-words',
            isBot 
              ? 'bg-gray-100 text-gray-900 rounded-bl-md' 
              : 'bg-blue-600 text-white rounded-br-md'
          )}>
            {renderMessageContent(message.content)}
            
            {/* Show lead score for development */}
            {isBot && message.metadata?.lead_score && process.env.NODE_ENV === 'development' && (
              <div className="text-xs text-gray-500 mt-1 pt-1 border-t border-gray-200">
                Score: {message.metadata.lead_score}
                {message.metadata.is_emergency && ' • 🚨 Emergency'}
              </div>
            )}
          </div>

          {/* Timestamp */}
          <div className={cn(
            'text-xs text-gray-500 px-1',
            isUser ? 'text-right' : 'text-left'
          )}>
            {formatTimestamp(message.timestamp)}
            {message.metadata?.confidence && process.env.NODE_ENV === 'development' && (
              <span className="ml-1">({Math.round(message.metadata.confidence * 100)}%)</span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatMessage