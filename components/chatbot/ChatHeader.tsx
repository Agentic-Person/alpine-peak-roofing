'use client'

import React from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

interface ChatHeaderProps {
  isConnected: boolean
  leadScore?: number
  onClose: () => void
  onMinimize: () => void
  className?: string
}

export function ChatHeader({ 
  isConnected, 
  leadScore = 0, 
  onClose, 
  onMinimize,
  className 
}: ChatHeaderProps) {
  const getScoreColor = (score: number) => {
    if (score >= 70) return 'text-red-500'
    if (score >= 50) return 'text-yellow-500'
    if (score > 0) return 'text-green-500'
    return 'text-gray-400'
  }

  const getScoreLabel = (score: number) => {
    if (score >= 70) return 'Hot Lead'
    if (score >= 50) return 'Qualified'
    if (score > 0) return 'Interested'
    return 'New'
  }

  return (
    <div className={cn(
      'flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-lg',
      className
    )}>
      <div className="flex items-center space-x-3">
        {/* Company Logo/Icon */}
        <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center">
          <svg
            className="h-5 w-5"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 3L2 12h3v8h6v-6h2v6h6v-8h3L12 3z" />
          </svg>
        </div>
        
        <div className="flex flex-col">
          <h3 className="font-semibold text-sm">Alpine Peak Roofing</h3>
          <div className="flex items-center space-x-2 text-xs">
            {/* Connection Status */}
            <div className="flex items-center space-x-1">
              <div className={cn(
                'h-2 w-2 rounded-full',
                isConnected ? 'bg-green-400' : 'bg-red-400'
              )} />
              <span>{isConnected ? 'Online' : 'Connecting...'}</span>
            </div>
            
            {/* Lead Score (for admin/demo purposes) */}
            {leadScore > 0 && process.env.NODE_ENV === 'development' && (
              <>
                <span>•</span>
                <span className={getScoreColor(leadScore)}>
                  {leadScore}/100 ({getScoreLabel(leadScore)})
                </span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Control Buttons */}
      <div className="flex items-center space-x-1">
        {/* Minimize Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={onMinimize}
          className="text-white hover:bg-white/20 h-8 w-8 p-0"
          aria-label="Minimize chat"
        >
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20 12H4"
            />
          </svg>
        </Button>

        {/* Close Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="text-white hover:bg-white/20 h-8 w-8 p-0"
          aria-label="Close chat"
        >
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </Button>
      </div>
    </div>
  )
}

export default ChatHeader