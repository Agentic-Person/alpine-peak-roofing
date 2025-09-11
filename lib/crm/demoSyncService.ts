// CRM Sync Service for Demo Chatbot Interactions
// Captures both roofing demo inquiries and real Agentic Personnel prospects

export interface DemoChatInteraction {
  session_id: string
  message: string
  response: string
  context_type: 'roofing' | 'agentic' | 'general'
  timestamp: string
  user_info?: {
    name?: string
    email?: string
    phone?: string
    company?: string
    website?: string
  }
  demo_metadata: {
    demo_source: string
    prospect_level: 'visitor' | 'interested' | 'qualified' | 'hot'
    features_explored: string[]
    session_duration_seconds: number
    total_messages: number
  }
}

export interface CRMSyncResult {
  success: boolean
  crm_record_id?: string
  lead_created?: boolean
  error?: string
  sync_timestamp: string
}

export class DemoCRMSyncService {
  private readonly CRM_WEBHOOK_URL: string
  private readonly CRM_API_KEY: string
  private readonly AGENTIC_PERSONNEL_TAG = 'agentic_personnel_prospect'
  private readonly DEMO_SOURCE_TAG = 'alpine_peak_demo'

  constructor() {
    this.CRM_WEBHOOK_URL = process.env.CRM_WEBHOOK_URL || process.env.HUBSPOT_WEBHOOK_URL || ''
    this.CRM_API_KEY = process.env.CRM_API_KEY || process.env.HUBSPOT_API_KEY || ''
  }

  /**
   * Sync demo chat interaction to CRM
   * Different handling for roofing demo vs actual prospects
   */
  async syncDemoInteraction(interaction: DemoChatInteraction): Promise<CRMSyncResult> {
    try {
      // Determine prospect qualification level
      const prospectLevel = this.assessProspectLevel(interaction)
      
      // Prepare CRM payload
      const crmPayload = this.prepareCRMPayload(interaction, prospectLevel)
      
      // Send to CRM
      const result = await this.sendToCRM(crmPayload)
      
      // Log for analytics
      await this.logDemoAnalytics(interaction, prospectLevel, result)
      
      return result
      
    } catch (error) {
      console.error('Demo CRM sync failed:', error)
      return {
        success: false,
        error: (error as Error).message,
        sync_timestamp: new Date().toISOString()
      }
    }
  }

  /**
   * Assess prospect qualification level based on interaction
   */
  private assessProspectLevel(interaction: DemoChatInteraction): 'visitor' | 'interested' | 'qualified' | 'hot' {
    const { message, context_type, demo_metadata } = interaction
    const messageLower = message.toLowerCase()
    
    // Hot prospect indicators
    const hotIndicators = [
      'price', 'pricing', 'cost', 'how much', 'quote', 'proposal',
      'when can you start', 'implementation', 'setup', 'onboarding',
      'contract', 'sign up', 'get started', 'schedule call', 'demo'
    ]
    
    // Qualified prospect indicators
    const qualifiedIndicators = [
      'my company', 'our business', 'we need', 'i need', 'looking for',
      'roofing company', 'contractor', 'how does it work', 'features',
      'integration', 'crm', 'roi', 'results', 'benefits'
    ]
    
    // Check for hot prospect signals
    if (hotIndicators.some(indicator => messageLower.includes(indicator))) {
      return 'hot'
    }
    
    // Check for qualified signals + context clues
    if (qualifiedIndicators.some(indicator => messageLower.includes(indicator)) ||
        context_type === 'agentic' ||
        demo_metadata.features_explored.length > 2 ||
        demo_metadata.total_messages > 5) {
      return 'qualified'
    }
    
    // Basic interest level
    if (demo_metadata.total_messages > 2 || demo_metadata.session_duration_seconds > 120) {
      return 'interested'
    }
    
    return 'visitor'
  }

  /**
   * Prepare CRM payload based on interaction type and prospect level
   */
  private prepareCRMPayload(interaction: DemoChatInteraction, prospectLevel: string): any {
    const basePayload = {
      // Contact Information
      email: interaction.user_info?.email || `demo_${interaction.session_id}@temp.agentic.ai`,
      firstName: interaction.user_info?.name || 'Demo Visitor',
      company: interaction.user_info?.company || 'Unknown Company',
      phone: interaction.user_info?.phone || '',
      website: interaction.user_info?.website || '',
      
      // Lead Classification
      leadSource: 'Demo Chatbot - Alpine Peak Website',
      leadStatus: this.mapProspectLevelToStatus(prospectLevel),
      
      // Demo-specific data
      customProperties: {
        demo_source: this.DEMO_SOURCE_TAG,
        demo_context_explored: interaction.context_type,
        demo_prospect_level: prospectLevel,
        demo_session_id: interaction.session_id,
        demo_session_duration: interaction.demo_metadata.session_duration_seconds,
        demo_total_messages: interaction.demo_metadata.total_messages,
        demo_features_explored: interaction.demo_metadata.features_explored.join(', '),
        demo_timestamp: interaction.timestamp,
        demo_last_message: interaction.message.substring(0, 500), // Truncate for CRM storage
        demo_last_response: interaction.response.substring(0, 500)
      },
      
      // Tags for segmentation
      tags: [
        this.AGENTIC_PERSONNEL_TAG,
        this.DEMO_SOURCE_TAG,
        `prospect_${prospectLevel}`,
        `context_${interaction.context_type}`,
        'chatbot_demo_2025'
      ]
    }

    // Add context-specific information
    if (interaction.context_type === 'agentic') {
      basePayload.customProperties.interest_category = 'AI Chatbot Services'
      basePayload.customProperties.demo_intent = 'Service Inquiry'
      basePayload.tags.push('agentic_service_inquiry')
    } else if (interaction.context_type === 'roofing') {
      basePayload.customProperties.interest_category = 'Roofing Demo Interaction'
      basePayload.customProperties.demo_intent = 'Demo Exploration'
      basePayload.tags.push('demo_roofing_interaction')
    }

    return basePayload
  }

  /**
   * Map prospect level to CRM lead status
   */
  private mapProspectLevelToStatus(prospectLevel: string): string {
    const statusMap = {
      'visitor': 'Demo Visitor',
      'interested': 'Demo Interested',
      'qualified': 'Demo Qualified Lead',
      'hot': 'Hot Demo Prospect'
    }
    return statusMap[prospectLevel] || 'Demo Visitor'
  }

  /**
   * Send data to CRM system
   */
  private async sendToCRM(payload: any): Promise<CRMSyncResult> {
    if (!this.CRM_WEBHOOK_URL) {
      console.warn('CRM webhook URL not configured, skipping sync')
      return {
        success: false,
        error: 'CRM webhook URL not configured',
        sync_timestamp: new Date().toISOString()
      }
    }

    try {
      const response = await fetch(this.CRM_WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.CRM_API_KEY}`,
          'User-Agent': 'Agentic-Personnel-Demo-Chatbot/1.0'
        },
        body: JSON.stringify(payload)
      })

      if (!response.ok) {
        throw new Error(`CRM sync failed: ${response.status} ${response.statusText}`)
      }

      const result = await response.json()
      
      return {
        success: true,
        crm_record_id: result.id || result.contact_id || result.lead_id,
        lead_created: result.created || result.is_new || false,
        sync_timestamp: new Date().toISOString()
      }

    } catch (error) {
      console.error('CRM API request failed:', error)
      throw error
    }
  }

  /**
   * Log demo analytics for business intelligence
   */
  private async logDemoAnalytics(
    interaction: DemoChatInteraction, 
    prospectLevel: string, 
    syncResult: CRMSyncResult
  ): Promise<void> {
    // This could be sent to your analytics platform, database, or monitoring system
    const analyticsEvent = {
      event_type: 'demo_chat_interaction',
      timestamp: new Date().toISOString(),
      session_id: interaction.session_id,
      context_type: interaction.context_type,
      prospect_level: prospectLevel,
      crm_sync_success: syncResult.success,
      crm_record_created: syncResult.lead_created || false,
      message_length: interaction.message.length,
      response_length: interaction.response.length,
      session_duration: interaction.demo_metadata.session_duration_seconds,
      total_messages: interaction.demo_metadata.total_messages,
      features_explored: interaction.demo_metadata.features_explored
    }

    // Log to console for now (replace with your analytics service)
    console.log('Demo Analytics Event:', JSON.stringify(analyticsEvent, null, 2))
    
    // Could also send to services like:
    // - Google Analytics Events
    // - Mixpanel
    // - Amplitude  
    // - Custom analytics database
  }

  /**
   * Batch sync multiple interactions (useful for session end)
   */
  async syncDemoSession(interactions: DemoChatInteraction[]): Promise<CRMSyncResult[]> {
    const results: CRMSyncResult[] = []
    
    // Process interactions sequentially to avoid rate limits
    for (const interaction of interactions) {
      const result = await this.syncDemoInteraction(interaction)
      results.push(result)
      
      // Small delay between requests
      await new Promise(resolve => setTimeout(resolve, 100))
    }
    
    return results
  }

  /**
   * Create summary lead for high-value prospects
   */
  async createSummaryLead(sessionId: string, interactions: DemoChatInteraction[]): Promise<CRMSyncResult> {
    // Analyze entire session for comprehensive lead
    const totalMessages = interactions.length
    const contexts = [...new Set(interactions.map(i => i.context_type))]
    const agenticQuestions = interactions.filter(i => i.context_type === 'agentic').length
    const sessionDuration = Math.max(...interactions.map(i => i.demo_metadata.session_duration_seconds))
    
    // Create comprehensive summary
    const summaryPayload = {
      email: `session_${sessionId}@prospect.agentic.ai`,
      firstName: 'Demo Session Prospect',
      company: 'Roofing Company (Demo Session)',
      leadSource: 'Comprehensive Demo Session',
      leadStatus: agenticQuestions >= 2 ? 'Hot Demo Prospect' : 'Demo Qualified Lead',
      customProperties: {
        session_summary: `Completed ${totalMessages} message demo session`,
        contexts_explored: contexts.join(', '),
        agentic_questions: agenticQuestions,
        total_session_duration: sessionDuration,
        session_start: interactions[0]?.timestamp,
        session_end: interactions[interactions.length - 1]?.timestamp,
        demo_completion_score: Math.min((totalMessages * 10) + (agenticQuestions * 20), 100)
      },
      tags: [
        this.AGENTIC_PERSONNEL_TAG,
        'comprehensive_demo_session',
        `session_${totalMessages}_messages`,
        ...contexts.map(c => `explored_${c}`)
      ]
    }

    return this.sendToCRM(summaryPayload)
  }
}

// Export singleton instance
export const demoCRMSync = new DemoCRMSyncService()

// Utility functions for n8n workflows
export const crmSyncUtils = {
  syncInteraction: (interaction: DemoChatInteraction) => demoCRMSync.syncDemoInteraction(interaction),
  syncSession: (interactions: DemoChatInteraction[]) => demoCRMSync.syncDemoSession(interactions),
  createSummary: (sessionId: string, interactions: DemoChatInteraction[]) => 
    demoCRMSync.createSummaryLead(sessionId, interactions)
}