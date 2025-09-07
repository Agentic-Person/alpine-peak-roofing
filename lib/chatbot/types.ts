// TypeScript interfaces for the AI Chatbot system

export interface ChatMessage {
  id: string
  type: 'user' | 'bot' | 'system'
  content: string
  timestamp: Date
  metadata?: {
    lead_score?: number
    confidence?: number
    actions?: QuickAction[]
    is_emergency?: boolean
    requires_human?: boolean
  }
}

export interface QuickAction {
  id: string
  label: string
  action: 'send_message' | 'request_callback' | 'schedule_inspection' | 'emergency_contact'
  value?: string
}

export interface ChatSession {
  session_id: string
  user_info: UserInfo
  messages: ChatMessage[]
  context: ConversationContext
  status: 'active' | 'completed' | 'transferred'
  lead_score: number
  created_at: Date
  updated_at: Date
}

export interface UserInfo {
  name?: string
  email?: string
  phone?: string
  address?: string
  project_type?: ProjectType
  urgency_level?: number
}

export interface ConversationContext {
  page: string
  user_agent: string
  referrer?: string
  utm_params?: UtmParameters
  conversation_history: ChatMessage[]
  session_start: Date
  last_activity: Date
  ip_address?: string
  location?: GeographicInfo
}

export interface UtmParameters {
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  utm_term?: string
  utm_content?: string
}

export interface GeographicInfo {
  city?: string
  state?: string
  zipcode?: string
  coordinates?: {
    lat: number
    lng: number
  }
}

export type ProjectType = 
  | 'repair'
  | 'replacement' 
  | 'inspection'
  | 'commercial'
  | 'residential'
  | 'emergency'

export type MessageCategory = 
  | 'emergency'
  | 'quote_request'
  | 'information'
  | 'scheduling'
  | 'complaint'
  | 'general'

export type UrgencyLevel = 1 | 2 | 3 | 4 | 5

export type Sentiment = 'positive' | 'neutral' | 'negative'

// API Response types
export interface ChatResponse {
  success: boolean
  response: string
  lead_score: number
  is_hot_lead: boolean
  next_action: NextAction
  session_id: string
  quick_actions?: QuickAction[]
  error?: string
}

export type NextAction = 
  | 'continue_conversation'
  | 'request_contact_info'
  | 'schedule_inspection'
  | 'transfer_to_human'
  | 'emergency_escalation'

export interface MessageClassification {
  category: MessageCategory
  urgency_level: UrgencyLevel
  project_type: ProjectType
  sentiment: Sentiment
  buying_intent: number // 1-5 scale
  keywords_detected: string[]
  contact_info_provided: {
    name: boolean
    email: boolean
    phone: boolean
    address: boolean
  }
  confidence: number // 0-1 scale
}

export interface LeadScoringFactors {
  urgency: number
  project_type: number
  contact_completeness: number
  buying_intent: number
  location: number
  conversation_length: number
  engagement_quality: number
}

export interface LeadScore {
  total_score: number
  factors: LeadScoringFactors
  is_hot_lead: boolean
  is_qualified_lead: boolean
  needs_immediate_attention: boolean
}

// File upload types
export interface FileUpload {
  id: string
  filename: string
  size: number
  type: string
  url: string
  thumbnail_url?: string
  description?: string
  uploaded_at: Date
}

export interface UploadResponse {
  success: boolean
  file_id?: string
  url?: string
  error?: string
}

// Handoff types
export interface HandoffRequest {
  session_id: string
  reason: HandoffReason
  urgency: 'low' | 'medium' | 'high' | 'critical'
  user_message?: string
  context_summary: string
}

export type HandoffReason = 
  | 'emergency'
  | 'complex_question'
  | 'pricing_negotiation'
  | 'user_request'
  | 'technical_issue'

export interface HandoffResponse {
  success: boolean
  estimated_wait_time?: number
  queue_position?: number
  agent_name?: string
  error?: string
}

// Widget configuration types
export interface ChatWidgetConfig {
  position: 'bottom-right' | 'bottom-left' | 'center'
  theme: 'light' | 'dark' | 'alpine'
  auto_open: boolean
  greeting_message: string
  business_hours?: BusinessHours
  offline_message?: string
  branding: BrandingConfig
}

export interface BusinessHours {
  enabled: boolean
  timezone: string
  schedule: {
    [key: string]: {
      open: string
      close: string
      enabled: boolean
    }
  }
}

export interface BrandingConfig {
  company_name: string
  logo_url?: string
  primary_color: string
  secondary_color: string
  accent_color: string
  font_family?: string
}

// Analytics types
export interface ChatEvent {
  event_type: ChatEventType
  session_id: string
  timestamp: Date
  data?: Record<string, unknown>
  user_id?: string
  page_url?: string
}

export type ChatEventType = 
  | 'conversation_started'
  | 'message_sent'
  | 'message_received'
  | 'lead_qualified'
  | 'file_uploaded'
  | 'human_requested'
  | 'conversation_ended'
  | 'emergency_detected'
  | 'appointment_requested'

// Error types
export interface ChatError {
  code: string
  message: string
  details?: Record<string, unknown>
  timestamp: Date
  session_id?: string
  recoverable: boolean
}

// Database types (matching existing schema)
export interface ChatConversationRecord {
  id: string
  created_at: string
  updated_at: string
  session_id: string
  lead_id?: string
  messages: ChatMessage[]
  context: ConversationContext
  status: string
  lead_score?: number
}

export interface LeadRecord {
  id: string
  created_at: string
  updated_at: string
  first_name: string
  last_name: string
  email: string
  phone?: string
  address?: string
  project_type?: string
  urgency_level?: number
  budget_range?: string
  source?: string
  lead_score?: number
  status?: string
  conversation_data?: ChatConversationRecord
}

// Service layer types
export interface ChatServiceConfig {
  api_base_url: string
  webhook_endpoints: {
    message_processor: string
    lead_processor: string
    emergency_handler: string
    appointment_scheduler: string
  }
  timeout: number
  retry_attempts: number
}

// State management types
export interface ChatState {
  isOpen: boolean
  isConnected: boolean
  isTyping: boolean
  session: ChatSession | null
  messages: ChatMessage[]
  pending_uploads: FileUpload[]
  error: ChatError | null
  config: ChatWidgetConfig
}

export interface ChatActions {
  openWidget: () => void
  closeWidget: () => void
  sendMessage: (message: string) => Promise<void>
  uploadFile: (file: File) => Promise<void>
  requestHuman: (reason: HandoffReason) => Promise<void>
  clearError: () => void
  updateUserInfo: (info: Partial<UserInfo>) => void
}