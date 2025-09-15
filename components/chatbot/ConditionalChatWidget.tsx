'use client'

import { usePathname } from 'next/navigation'
import ChatWidget from './ChatWidget'

export default function ConditionalChatWidget() {
  const pathname = usePathname()
  
  // Hide ChatWidget on the full-page AI chat route
  if (pathname === '/ai-chat') {
    return null
  }
  
  return <ChatWidget />
}