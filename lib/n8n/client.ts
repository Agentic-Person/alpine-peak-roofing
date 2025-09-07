// n8n Client for webhook calls and workflow management
export class N8nClient {
  private baseUrl: string
  private apiKey: string

  constructor() {
    this.baseUrl = process.env.N8N_WEBHOOK_URL || ''
    this.apiKey = process.env.N8N_API_KEY || ''
  }

  async triggerWebhook(webhookPath: string, data: Record<string, unknown>) {
    try {
      const response = await fetch(`${this.baseUrl}/${webhookPath}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify(data)
      })

      if (!response.ok) {
        throw new Error(`n8n webhook failed: ${response.statusText}`)
      }

      return await response.json()
    } catch (error) {
      console.error('n8n webhook error:', error)
      throw error
    }
  }

  // Trigger lead processing workflow
  async processLead(leadData: Record<string, unknown>) {
    return this.triggerWebhook('lead-processing', leadData)
  }

  // Trigger chatbot conversation workflow
  async processChatMessage(sessionId: string, message: string, context: Record<string, unknown>) {
    return this.triggerWebhook('chatbot-process', {
      session_id: sessionId,
      message,
      context
    })
  }

  // Trigger blog generation workflow
  async generateBlogPost(topic?: string, keywords?: string[]) {
    return this.triggerWebhook('blog-generation', {
      topic,
      keywords,
      triggered_at: new Date().toISOString()
    })
  }

  // Trigger roof estimation workflow
  async generateRoofEstimate(address: string, preferences: Record<string, unknown>) {
    return this.triggerWebhook('roof-estimation', {
      address,
      preferences,
      timestamp: new Date().toISOString()
    })
  }

  // Trigger CRM sync workflow
  async syncToCRM(leadId: string, action: string, data: Record<string, unknown>) {
    return this.triggerWebhook('crm-sync', {
      lead_id: leadId,
      action,
      data,
      timestamp: new Date().toISOString()
    })
  }
}

export const n8nClient = new N8nClient()