'use client'

import React from 'react'
import { cn } from '@/lib/utils'

interface TypingIndicatorProps {
  className?: string
}

export function TypingIndicator({ className }: TypingIndicatorProps) {
  return (
    <div className={cn('flex w-full justify-start', className)}>
      <div className="flex max-w-[85%] space-x-2">
        {/* Bot Avatar */}
        <div className="flex-shrink-0 h-8 w-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-semibold">
          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 3L2 12h3v8h6v-6h2v6h6v-8h3L12 3z" />
          </svg>
        </div>

        {/* Typing Bubble */}
        <div className="bg-gray-100 rounded-2xl rounded-bl-md px-4 py-3">
          <div className="flex space-x-1">
            <div className="flex space-x-1">
              <div 
                className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"
                style={{ animationDelay: '0ms', animationDuration: '1.4s' }}
              />
              <div 
                className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"
                style={{ animationDelay: '160ms', animationDuration: '1.4s' }}
              />
              <div 
                className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"
                style={{ animationDelay: '320ms', animationDuration: '1.4s' }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TypingIndicator