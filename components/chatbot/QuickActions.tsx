'use client'

import React from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import type { QuickAction } from '@/lib/chatbot/types'

interface QuickActionsProps {
  actions: QuickAction[]
  onActionClick: (action: QuickAction) => void
  className?: string
}

export function QuickActions({ actions, onActionClick, className }: QuickActionsProps) {
  if (!actions || actions.length === 0) {
    return null
  }

  const getActionIcon = (action: QuickAction) => {
    switch (action.action) {
      case 'send_message':
        return (
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        )
      case 'request_callback':
        return (
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
        )
      case 'schedule_inspection':
        return (
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        )
      case 'emergency_contact':
        return (
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        )
      default:
        return (
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )
    }
  }

  const getActionColor = (action: QuickAction) => {
    switch (action.action) {
      case 'emergency_contact':
        return 'bg-red-50 text-red-600 hover:bg-red-100 border-red-200'
      case 'schedule_inspection':
        return 'bg-green-50 text-green-600 hover:bg-green-100 border-green-200'
      case 'request_callback':
        return 'bg-blue-50 text-blue-600 hover:bg-blue-100 border-blue-200'
      default:
        return 'bg-gray-50 text-gray-600 hover:bg-gray-100 border-gray-200'
    }
  }

  return (
    <div className={cn('space-y-2', className)}>
      <div className="text-xs text-gray-500 font-medium">Quick Actions:</div>
      <div className="flex flex-wrap gap-2">
        {actions.map((action) => (
          <Button
            key={action.id}
            variant="outline"
            size="sm"
            onClick={() => onActionClick(action)}
            className={cn(
              'h-8 text-xs border transition-colors',
              getActionColor(action)
            )}
          >
            <span className="flex items-center space-x-1">
              {getActionIcon(action)}
              <span>{action.label}</span>
            </span>
          </Button>
        ))}
      </div>
    </div>
  )
}

export default QuickActions