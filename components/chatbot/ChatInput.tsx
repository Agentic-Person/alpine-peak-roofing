'use client'

import React, { useState, useRef, forwardRef } from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

interface ChatInputProps {
  onSendMessage: (message: string) => void
  onFileUpload: (file: File) => void
  disabled?: boolean
  placeholder?: string
  className?: string
}

export const ChatInput = forwardRef<HTMLTextAreaElement, ChatInputProps>(
  ({ onSendMessage, onFileUpload, disabled = false, placeholder = "Type your message...", className }, ref) => {
    const [message, setMessage] = useState('')
    const [isUploading, setIsUploading] = useState(false)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault()
      if (message.trim() && !disabled) {
        onSendMessage(message.trim())
        setMessage('')
      }
    }

    const handleKeyPress = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault()
        handleSubmit(e)
      }
    }

    const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (!file) return

      setIsUploading(true)
      try {
        await onFileUpload(file)
      } catch (error) {
        console.error('File upload error:', error)
      } finally {
        setIsUploading(false)
        // Reset file input
        if (fileInputRef.current) {
          fileInputRef.current.value = ''
        }
      }
    }

    const triggerFileUpload = () => {
      fileInputRef.current?.click()
    }

    const adjustTextareaHeight = (textarea: HTMLTextAreaElement) => {
      textarea.style.height = 'auto'
      textarea.style.height = Math.min(textarea.scrollHeight, 120) + 'px'
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setMessage(e.target.value)
      adjustTextareaHeight(e.target)
    }

    return (
      <form onSubmit={handleSubmit} className={cn('flex items-end space-x-2', className)}>
        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*,.pdf,.txt"
          onChange={handleFileSelect}
          className="hidden"
          disabled={disabled || isUploading}
        />

        {/* File upload button */}
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={triggerFileUpload}
          disabled={disabled || isUploading}
          className="h-10 w-10 p-0 text-gray-500 hover:text-gray-700"
          aria-label="Upload file"
        >
          {isUploading ? (
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-blue-600 border-t-transparent" />
          ) : (
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" 
              />
            </svg>
          )}
        </Button>

        {/* Message input */}
        <div className="flex-1 relative">
          <textarea
            ref={ref}
            value={message}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            placeholder={placeholder}
            disabled={disabled}
            rows={1}
            className={cn(
              'w-full resize-none rounded-lg border border-gray-300 px-3 py-2 pr-12 text-sm',
              'focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500',
              'placeholder-gray-500 disabled:bg-gray-50 disabled:text-gray-500',
              'min-h-[40px] max-h-[120px] overflow-y-auto'
            )}
          />
          
          {/* Character counter for long messages */}
          {message.length > 200 && (
            <div className="absolute -top-6 right-0 text-xs text-gray-500">
              {message.length}/500
            </div>
          )}
        </div>

        {/* Send button */}
        <Button
          type="submit"
          disabled={!message.trim() || disabled}
          size="sm"
          className="h-10 w-10 p-0"
          aria-label="Send message"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" 
            />
          </svg>
        </Button>
      </form>
    )
  }
)

ChatInput.displayName = 'ChatInput'

export default ChatInput