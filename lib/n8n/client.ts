// n8n Client for webhook calls and workflow management
export class N8nClient {
  private webhookUrl: string
  private apiKey: string

  constructor() {
    this.webhookUrl = process.env.N8N_WEBHOOK_URL || ''
    this.apiKey = process.env.N8N_API_KEY || ''
  }

  async triggerWebhook(webhookPath: string, data: Record<string, unknown>) {
    try {
      // Use the full webhook URL directly, ignore webhookPath since it's already in the URL
      console.log('n8n webhook URL:', this.webhookUrl)
      console.log('n8n webhook data:', data)
      
      const response = await fetch(this.webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      })

      console.log('n8n response status:', response.status)
      console.log('n8n response headers:', response.headers.get('content-type'))

      if (!response.ok) {
        const errorText = await response.text()
        console.error('n8n webhook error response:', errorText)
        throw new Error(`n8n webhook failed: ${response.status} ${response.statusText}`)
      }

      const result = await response.json()
      console.log('n8n webhook success:', result)
      return result
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
    const payload = {
      session_id: sessionId,
      message,
      page_context: context.page || 'website',
      user_data: context.user_info || {},
      timestamp: new Date().toISOString(),
      ip_address: 'unknown'
    }
    
    console.log('n8n processChatMessage payload:', payload)
    return this.triggerWebhook('alpine-peak-chatbot', payload)
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