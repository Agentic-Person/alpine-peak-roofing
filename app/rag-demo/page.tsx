'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface RAGResponse {
  success: boolean
  message: string
  session_id: string
  metadata: {
    sources_used: number
    search_quality: number
    response_type: string
    relevant_sources: Array<{
      title: string
      category: string
      similarity: number
    }>
    using_demo_embeddings: boolean
  }
  error?: string
}

interface Message {
  id: string
  type: 'user' | 'assistant'
  content: string
  timestamp: Date
  metadata?: RAGResponse['metadata']
}

export default function RAGDemo() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [sessionId, setSessionId] = useState(`demo_${Date.now()}`)

  const sampleQuestions = [
    "What roofing materials work best for mountain homes?",
    "How do you handle emergency roof repairs?",
    "What makes Alpine Peak Roofing different?",
    "Do you work with insurance for storm damage?",
    "What are impact-resistant roofing materials?"
  ]

  const sendMessage = async (messageText: string) => {
    if (!messageText.trim()) return

    setIsLoading(true)
    const userMessage: Message = {
      id: `user_${Date.now()}`,
      type: 'user',
      content: messageText.trim(),
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])

    try {
      const response = await fetch('/api/chat/rag', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: messageText.trim(),
          session_id: sessionId
        })
      })

      const data: RAGResponse = await response.json()

      if (data.success) {
        const assistantMessage: Message = {
          id: `assistant_${Date.now()}`,
          type: 'assistant',
          content: data.message,
          timestamp: new Date(),
          metadata: data.metadata
        }
        setMessages(prev => [...prev, assistantMessage])
        setSessionId(data.session_id)
      } else {
        throw new Error(data.error || 'Failed to get response')
      }
    } catch (error) {
      console.error('Chat error:', error)
      const errorMessage: Message = {
        id: `error_${Date.now()}`,
        type: 'assistant',
        content: 'I apologize, but I encountered an error. Please try again.',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
      setInput('')
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    sendMessage(input)
  }

  const handleSampleQuestion = (question: string) => {
    setInput(question)
    sendMessage(question)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Alpine Peak Roofing - RAG Chat Demo
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Experience our AI-powered knowledge system that provides intelligent answers 
            based on our expert roofing knowledge base. Ask about materials, services, 
            or Colorado mountain roofing challenges.
          </p>
          <Badge variant="outline" className="mt-2">
            🧪 Demo Mode - Using Mock Embeddings
          </Badge>
        </div>

        {/* Sample Questions */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">Try These Questions:</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {sampleQuestions.map((question, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => handleSampleQuestion(question)}
                  className="text-left h-auto p-3 justify-start"
                  disabled={isLoading}
                >
                  {question}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Chat Messages */}
        <Card className="mb-6 h-96 overflow-hidden">
          <CardContent className="p-0">
            <div className="h-96 overflow-y-auto p-4 space-y-4">
              {messages.length === 0 ? (
                <div className="text-center text-gray-500 mt-8">
                  <p>Start a conversation by typing a message or clicking a sample question above.</p>
                </div>
              ) : (
                messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${
                        message.type === 'user'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-900'
                      }`}
                    >
                      <div className="whitespace-pre-wrap">{message.content}</div>
                      
                      {/* Metadata for assistant messages */}
                      {message.type === 'assistant' && message.metadata && (
                        <div className="mt-3 pt-2 border-t border-gray-200 text-xs">
                          <div className="flex flex-wrap gap-2 mb-2">
                            <Badge variant="secondary" className="text-xs">
                              {message.metadata.response_type}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {message.metadata.sources_used} sources
                            </Badge>
                            {message.metadata.search_quality > 0 && (
                              <Badge variant="outline" className="text-xs">
                                {(message.metadata.search_quality * 100).toFixed(1)}% match
                              </Badge>
                            )}
                          </div>
                          
                          {message.metadata.relevant_sources.length > 0 && (
                            <div>
                              <p className="text-gray-600 mb-1">Sources:</p>
                              {message.metadata.relevant_sources.map((source, idx) => (
                                <div key={idx} className="text-gray-500">
                                  • {source.title} ({source.category})
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))
              )}
              
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 rounded-lg p-3 text-gray-600">
                    <div className="flex items-center space-x-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                      <span>Searching knowledge base...</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Input Form */}
        <Card>
          <CardContent className="p-4">
            <form onSubmit={handleSubmit} className="flex space-x-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about roofing materials, services, or Colorado mountain roofing..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isLoading}
              />
              <Button 
                type="submit" 
                disabled={isLoading || !input.trim()}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {isLoading ? 'Sending...' : 'Send'}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* System Info */}
        <div className="mt-6 text-center text-sm text-gray-500">
          <p>Session ID: {sessionId}</p>
          <p className="mt-1">
            This demo uses the same knowledge base and search system that powers the live ChatWidget.
          </p>
        </div>
      </div>
    </div>
  )
}