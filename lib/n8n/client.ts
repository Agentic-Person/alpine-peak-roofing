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
      if (!this.webhookUrl) {
        throw new Error('N8N_WEBHOOK_URL not configured')
      }

      console.log('n8n webhook URL:', this.webhookUrl)
      console.log('n8n webhook data:', JSON.stringify(data, null, 2))

      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 10000) // 10 second timeout

      const response = await fetch(this.webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': 'Alpine-Peak-Roofing-Chatbot/1.0'
        },
        body: JSON.stringify(data),
        signal: controller.signal
      })

      clearTimeout(timeoutId)

      console.log('n8n response status:', response.status)
      console.log('n8n response headers:', response.headers.get('content-type'))

      if (!response.ok) {
        const errorText = await response.text()
        console.error('n8n webhook error response:', errorText)
        throw new Error(`n8n webhook failed: ${response.status} ${response.statusText} - ${errorText}`)
      }

      const contentType = response.headers.get('content-type')
      if (!contentType?.includes('application/json')) {
        console.warn('n8n response is not JSON:', contentType)
        const text = await response.text()
        return { response: text, success: true }
      }

      const result = await response.json()
      console.log('n8n webhook success:', JSON.stringify(result, null, 2))
      return result
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        console.error('n8n webhook timeout')
        throw new Error('n8n webhook timeout after 10 seconds')
      }
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
      message: message.trim(),
      page_context: context.page || 'website',
      user_data: context.user_info || {},
      conversation_history: context.conversation_history || [],
      timestamp: new Date().toISOString(),
      user_agent: context.user_agent || 'unknown',
      referrer: context.referrer || '',
      session_start: context.session_start || new Date().toISOString(),
      last_activity: context.last_activity || new Date().toISOString(),
      ip_address: 'unknown' // In production, get from request headers
    }

    console.log('n8n processChatMessage payload:', JSON.stringify(payload, null, 2))
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