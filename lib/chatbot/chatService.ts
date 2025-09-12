import { n8nClient } from '../n8n/client'
import { supabase } from '../supabase/client'
import type { 
  ChatMessage, 
  ChatResponse, 
  ChatSession, 
  UserInfo, 
  ConversationContext,
  FileUpload,
  UploadResponse,
  HandoffRequest,
  HandoffResponse,
  ChatError,
  MessageClassification,
  LeadScore
} from './types'

export class ChatService {
  private readonly SESSION_STORAGE_KEY = 'alpine_chat_session'
  private readonly MAX_RETRY_ATTEMPTS = 3
  private readonly REQUEST_TIMEOUT = 10000 // 10 seconds

  /**
   * Send a message to the chatbot and get an AI response
   */
  async sendMessage(
    sessionId: string, 
    message: string, 
    context?: Partial<ConversationContext>
  ): Promise<ChatResponse> {
    try {
      // Get current session context
      const currentContext = await this.getSessionContext(sessionId)
      
      // Merge with provided context
      const fullContext = {
        ...currentContext,
        ...context,
        last_activity: new Date(),
      }

      // Try n8n first, fallback to local demo API if n8n is unavailable
      let response: any
      let usedN8n = false
      try {
        console.log('ChatService: Attempting n8n webhook call')
        response = await n8nClient.processChatMessage(sessionId, message, {
          context: fullContext,
          timestamp: new Date().toISOString()
        })
        console.log('ChatService: n8n response received:', response)
        usedN8n = true

        // Handle n8n response format - it might have different structure
        if (response.success && response.message) {
          response.response = response.message
        }
      } catch (n8nError) {
        console.warn('n8n unavailable, using local demo API:', n8nError)
        // Fallback to local demo API
        response = await this.callLocalDemoAPI(sessionId, message, fullContext)
        console.log('ChatService: Using demo API response:', response.response.substring(0, 100) + '...')
      }

      // Store the conversation in Supabase
      await this.storeMessage(sessionId, {
        id: this.generateMessageId(),
        type: 'user',
        content: message,
        timestamp: new Date()
      })

      if (response.response) {
        await this.storeMessage(sessionId, {
          id: this.generateMessageId(),
          type: 'bot',
          content: response.response,
          timestamp: new Date(),
          metadata: {
            lead_score: response.lead_score,
            is_emergency: response.is_emergency,
            requires_human: response.requires_human
          }
        })
      }

      const finalResponse = {
        success: true,
        response: response.response || 'I apologize, but I encountered an issue processing your message. Please try again.',
        lead_score: response.lead_score || 0,
        is_hot_lead: response.is_hot_lead || false,
        next_action: response.next_action || 'continue_conversation',
        session_id: sessionId,
        quick_actions: response.quick_actions
      }

      console.log(`ChatService: Returning response (used ${usedN8n ? 'n8n' : 'demo API'}):`, finalResponse.response.substring(0, 100) + '...')
      return finalResponse

    } catch (error) {
      console.error('ChatService.sendMessage error:', error)
      return this.handleError(sessionId, error as Error)
    }
  }

  /**
   * Upload a file (e.g., damage photos) for analysis
   */
  async uploadFile(sessionId: string, file: File): Promise<UploadResponse> {
    try {
      // Validate file
      const validation = this.validateFile(file)
      if (!validation.isValid) {
        throw new Error(validation.error)
      }

      // Compress if needed
      const processedFile = await this.processFile(file)

      // Upload to Supabase storage
      const fileExt = file.name.split('.').pop()
      const fileName = `${sessionId}/${Date.now()}.${fileExt}`
      
      const { data, error } = await supabase.storage
        .from('chat-uploads')
        .upload(fileName, processedFile, {
          cacheControl: '3600',
          upsert: false
        })

      if (error) throw error

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('chat-uploads')
        .getPublicUrl(fileName)

      // Store file reference in conversation
      const fileUpload: FileUpload = {
        id: this.generateMessageId(),
        filename: file.name,
        size: file.size,
        type: file.type,
        url: publicUrl,
        uploaded_at: new Date()
      }

      await this.storeMessage(sessionId, {
        id: this.generateMessageId(),
        type: 'user',
        content: `[File uploaded: ${file.name}]`,
        timestamp: new Date(),
        metadata: {
          file_upload: fileUpload
        }
      })

      // Trigger n8n workflow for file analysis if image
      if (file.type.startsWith('image/')) {
        await n8nClient.triggerWebhook('file-analysis', {
          session_id: sessionId,
          file_url: publicUrl,
          file_type: file.type,
          context: await this.getSessionContext(sessionId)
        })
      }

      return {
        success: true,
        file_id: fileUpload.id,
        url: publicUrl
      }

    } catch (error) {
      console.error('ChatService.uploadFile error:', error)
      return {
        success: false,
        error: `Failed to upload file: ${(error as Error).message}`
      }
    }
  }

  /**
   * Get conversation history for a session
   */
  async getConversation(sessionId: string): Promise<ChatMessage[]> {
    try {
      const { data, error } = await supabase
        .from('chat_conversations')
        .select('messages')
        .eq('session_id', sessionId)
        .single()

      // If no record found (PGRST116), that's fine for new sessions
      if (error) {
        if (error.code === 'PGRST116') {
          return [] // No conversation found, return empty array
        }
        console.warn('Supabase error getting conversation:', error)
        return [] // Return empty array for any other errors too
      }

      return data?.messages || []
    } catch (error) {
      console.warn('ChatService.getConversation error (returning empty):', error)
      return []
    }
  }

  /**
   * Update user context information
   */
  async updateContext(sessionId: string, context: Partial<ConversationContext>): Promise<void> {
    try {
      const currentContext = await this.getSessionContext(sessionId)
      const updatedContext = { ...currentContext, ...context }

      const { error } = await supabase
        .from('chat_conversations')
        .upsert({
          session_id: sessionId,
          context: updatedContext,
          updated_at: new Date().toISOString()
        })

      if (error) throw error

    } catch (error) {
      console.error('ChatService.updateContext error:', error)
      throw error
    }
  }

  /**
   * Request handoff to human agent
   */
  async requestHumanAgent(
    sessionId: string, 
    reason: string,
    urgency: 'low' | 'medium' | 'high' | 'critical' = 'medium'
  ): Promise<HandoffResponse> {
    try {
      // Get conversation context for handoff
      const context = await this.getSessionContext(sessionId)
      const messages = await this.getConversation(sessionId)
      
      const contextSummary = this.generateContextSummary(messages, context)

      // Trigger n8n handoff workflow
      const response = await n8nClient.triggerWebhook('human-handoff', {
        session_id: sessionId,
        reason,
        urgency,
        context_summary: contextSummary,
        user_info: context.user_info || {},
        lead_score: context.lead_score || 0
      })

      // Store handoff request message
      await this.storeMessage(sessionId, {
        id: this.generateMessageId(),
        type: 'system',
        content: `Request for human agent: ${reason}`,
        timestamp: new Date(),
        metadata: {
          handoff_request: true,
          urgency
        }
      })

      return {
        success: true,
        estimated_wait_time: response.estimated_wait_time || 300, // 5 minutes default
        queue_position: response.queue_position || 1,
        agent_name: response.agent_name
      }

    } catch (error) {
      console.error('ChatService.requestHumanAgent error:', error)
      return {
        success: false,
        error: `Failed to request human agent: ${(error as Error).message}`
      }
    }
  }

  /**
   * Create or get a chat session
   */
  async createSession(initialContext?: Partial<ConversationContext>): Promise<string> {
    const sessionId = this.generateSessionId()
    
    const context: ConversationContext = {
      page: window.location.pathname,
      user_agent: navigator.userAgent,
      referrer: document.referrer,
      conversation_history: [],
      session_start: new Date(),
      last_activity: new Date(),
      ...initialContext
    }

    try {
      const { error } = await supabase
        .from('chat_conversations')
        .insert({
          session_id: sessionId,
          context: context,
          messages: [],
          status: 'active'
        })

      if (error) throw error

      // Store in session storage
      sessionStorage.setItem(this.SESSION_STORAGE_KEY, sessionId)
      
      return sessionId
    } catch (error) {
      console.error('ChatService.createSession error:', error)
      throw error
    }
  }

  /**
   * Get existing session ID from storage or create new one
   */
  getOrCreateSessionId(): string {
    const existingSession = sessionStorage.getItem(this.SESSION_STORAGE_KEY)
    if (existingSession) {
      return existingSession
    }
    return this.generateSessionId()
  }

  // Private helper methods

  private async callLocalDemoAPI(sessionId: string, message: string, context: ConversationContext): Promise<any> {
    try {
      const response = await fetch('/api/chatbot/demo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          session_id: sessionId,
          message,
          context: {
            page: context.page,
            user_agent: context.user_agent,
            referrer: context.referrer,
            conversation_history: context.conversation_history,
            user_info: context.user_info
          }
        })
      })

      if (!response.ok) {
        throw new Error(`Demo API failed: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Local demo API call failed:', error)
      throw error
    }
  }

  private async getSessionContext(sessionId: string): Promise<ConversationContext> {
    try {
      const { data, error } = await supabase
        .from('chat_conversations')
        .select('context')
        .eq('session_id', sessionId)
        .single()

      if (error && error.code !== 'PGRST116') {
        throw error
      }

      return data?.context || {
        page: window.location.pathname,
        user_agent: navigator.userAgent,
        conversation_history: [],
        session_start: new Date(),
        last_activity: new Date()
      }
    } catch (error) {
      console.error('ChatService.getSessionContext error:', error)
      return {
        page: window.location.pathname,
        user_agent: navigator.userAgent,
        conversation_history: [],
        session_start: new Date(),
        last_activity: new Date()
      }
    }
  }

  private async storeMessage(sessionId: string, message: ChatMessage): Promise<void> {
    try {
      const messages = await this.getConversation(sessionId)
      const updatedMessages = [...messages, message]

      const { error } = await supabase
        .from('chat_conversations')
        .upsert({
          session_id: sessionId,
          messages: updatedMessages,
          updated_at: new Date().toISOString()
        })

      if (error) throw error
    } catch (error) {
      console.error('ChatService.storeMessage error:', error)
      // Don't throw - message storage failure shouldn't break conversation
    }
  }

  private validateFile(file: File): { isValid: boolean; error?: string } {
    const MAX_SIZE = 10 * 1024 * 1024 // 10MB
    const ALLOWED_TYPES = [
      'image/jpeg',
      'image/png',
      'image/gif',
      'image/webp',
      'application/pdf',
      'text/plain'
    ]

    if (file.size > MAX_SIZE) {
      return { isValid: false, error: 'File size must be less than 10MB' }
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return { isValid: false, error: 'File type not allowed' }
    }

    return { isValid: true }
  }

  private async processFile(file: File): Promise<File | Blob> {
    // For images, compress if needed
    if (file.type.startsWith('image/') && file.size > 1024 * 1024) { // 1MB
      return await this.compressImage(file)
    }
    return file
  }

  private async compressImage(file: File): Promise<Blob> {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')!
      const img = new Image()

      img.onload = () => {
        const maxWidth = 1200
        const maxHeight = 1200
        let { width, height } = img

        if (width > height) {
          if (width > maxWidth) {
            height = (height * maxWidth) / width
            width = maxWidth
          }
        } else {
          if (height > maxHeight) {
            width = (width * maxHeight) / height
            height = maxHeight
          }
        }

        canvas.width = width
        canvas.height = height
        ctx.drawImage(img, 0, 0, width, height)

        canvas.toBlob(
          (blob) => resolve(blob!),
          'image/jpeg',
          0.8
        )
      }

      img.src = URL.createObjectURL(file)
    })
  }

  private generateSessionId(): string {
    return `chat_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }

  private generateMessageId(): string {
    return `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }

  private generateContextSummary(messages: ChatMessage[], context: ConversationContext): string {
    const messageCount = messages.length
    const userMessages = messages.filter(m => m.type === 'user')
    const lastUserMessage = userMessages[userMessages.length - 1]
    
    return `
Conversation Summary:
- Messages: ${messageCount}
- Duration: ${Math.round((Date.now() - new Date(context.session_start).getTime()) / 1000 / 60)} minutes
- Last message: "${lastUserMessage?.content || 'N/A'}"
- Page: ${context.page}
- User info collected: ${JSON.stringify(context.user_info || {})}
    `.trim()
  }

  private handleError(sessionId: string, error: Error): ChatResponse {
    const chatError: ChatError = {
      code: 'CHAT_SERVICE_ERROR',
      message: error.message,
      timestamp: new Date(),
      session_id: sessionId,
      recoverable: true
    }

    return {
      success: false,
      response: 'I apologize, but I encountered a technical issue. Please try again in a moment.',
      lead_score: 0,
      is_hot_lead: false,
      next_action: 'continue_conversation',
      session_id: sessionId,
      error: chatError.message
    }
  }
}

// Export singleton instance
export const chatService = new ChatService()