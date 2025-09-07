// Main chatbot components exports
export { default as ChatWidget } from './ChatWidget'
export { default as ChatHeader } from './ChatHeader'
export { default as ChatMessage } from './ChatMessage'
export { default as ChatInput } from './ChatInput'
export { default as TypingIndicator } from './TypingIndicator'
export { default as QuickActions } from './QuickActions'

// Re-export types for convenience (avoiding naming conflicts with components)
export type {
  ChatMessage as ChatMessageType,
  QuickAction,
  ChatSession,
  ChatResponse,
  UserInfo,
  ConversationContext,
  ChatWidgetConfig
} from '@/lib/chatbot/types'