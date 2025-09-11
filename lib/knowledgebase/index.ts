// Knowledge Base Management for Dual-Context Demo Chatbot
import fs from 'fs'
import path from 'path'

export interface KnowledgeContent {
  domain: 'roofing' | 'agentic' | 'general'
  content: string
  title: string
  weight: number // Priority weighting for context selection
}

export interface ContextClassification {
  detected_context: 'roofing' | 'agentic' | 'general'
  confidence: number
  keywords_found: string[]
  reasoning: string
}

export class DualKnowledgeBase {
  private roofingContent: string = ''
  private agenticContent: string = ''
  
  constructor() {
    this.loadKnowledgeBase()
  }

  private loadKnowledgeBase(): void {
    try {
      // Load Alpine Peak Roofing content
      const roofingPath = path.join(process.cwd(), 'lib', 'knowledgebase', 'alpine-peak-content.md')
      if (fs.existsSync(roofingPath)) {
        this.roofingContent = fs.readFileSync(roofingPath, 'utf-8')
      }

      // Load Agentic Personnel content  
      const agenticPath = path.join(process.cwd(), 'lib', 'knowledgebase', 'agentic-personnel-content.md')
      if (fs.existsSync(agenticPath)) {
        this.agenticContent = fs.readFileSync(agenticPath, 'utf-8')
      }
    } catch (error) {
      console.error('Failed to load knowledge base:', error)
    }
  }

  /**
   * Classify user message to determine appropriate knowledge context
   */
  public classifyContext(message: string): ContextClassification {
    const messageLower = message.toLowerCase()
    
    // Define keyword patterns for each context
    const roofingKeywords = [
      'roof', 'roofing', 'shingle', 'tile', 'metal', 'leak', 'repair', 'replacement',
      'storm', 'hail', 'wind', 'damage', 'inspection', 'estimate', 'quote',
      'contractor', 'installation', 'warranty', 'gutter', 'flashing', 'vent',
      'commercial', 'residential', 'asphalt', 'slate', 'clay', 'tpo', 'epdm',
      'emergency', 'insurance', 'claim', 'alpine peak'
    ]

    const agenticKeywords = [
      'chatbot', 'ai', 'artificial intelligence', 'automation', 'agentic',
      'pricing', 'cost', 'package', 'implementation', 'integration', 'crm',
      'how does this work', 'how much', 'setup', 'install', 'features',
      'demo', 'technology', 'gpt', 'openai', 'n8n', 'workflow', 'api',
      'support', 'training', 'onboarding', 'customization', 'white label',
      'personnel', 'service', 'subscription', 'monthly', 'enterprise'
    ]

    // Count keyword matches
    const roofingMatches = roofingKeywords.filter(keyword => messageLower.includes(keyword))
    const agenticMatches = agenticKeywords.filter(keyword => messageLower.includes(keyword))

    // Determine context based on matches
    let detected_context: 'roofing' | 'agentic' | 'general' = 'general'
    let confidence = 0
    let reasoning = 'No specific keywords detected, defaulting to general roofing assistance'

    if (roofingMatches.length > agenticMatches.length && roofingMatches.length > 0) {
      detected_context = 'roofing'
      confidence = Math.min(roofingMatches.length * 0.2, 0.95)
      reasoning = `Detected roofing-related keywords: ${roofingMatches.slice(0, 3).join(', ')}`
    } else if (agenticMatches.length > roofingMatches.length && agenticMatches.length > 0) {
      detected_context = 'agentic'
      confidence = Math.min(agenticMatches.length * 0.2, 0.95)
      reasoning = `Detected chatbot/service-related keywords: ${agenticMatches.slice(0, 3).join(', ')}`
    } else if (roofingMatches.length === agenticMatches.length && roofingMatches.length > 0) {
      // Tie-breaker: default to roofing for demo authenticity
      detected_context = 'roofing'
      confidence = 0.6
      reasoning = 'Mixed context detected, defaulting to roofing expertise'
    }

    return {
      detected_context,
      confidence,
      keywords_found: [...roofingMatches, ...agenticMatches],
      reasoning
    }
  }

  /**
   * Get relevant knowledge content based on context
   */
  public getContextualContent(context: 'roofing' | 'agentic' | 'general'): string {
    switch (context) {
      case 'roofing':
        return this.roofingContent
      case 'agentic':
        return this.agenticContent
      case 'general':
        // For general queries, provide a summary of both
        return this.getGeneralContext()
      default:
        return this.roofingContent // Default to roofing
    }
  }

  /**
   * Generate combined context for general inquiries
   */
  private getGeneralContext(): string {
    return `
ALPINE PEAK ROOFING OVERVIEW:
${this.roofingContent.substring(0, 1000)}...

ABOUT THIS AI CHATBOT (POWERED BY AGENTIC PERSONNEL):
${this.agenticContent.substring(0, 1000)}...

This demonstration showcases both roofing expertise and chatbot technology capabilities.
    `.trim()
  }

  /**
   * Generate system prompt for the AI based on context
   */
  public generateSystemPrompt(context: 'roofing' | 'agentic' | 'general', message: string): string {
    const basePrompt = `
You are an AI assistant for Alpine Peak Roofing, powered by Agentic Personnel's chatbot technology.

CONTEXT: ${context.toUpperCase()}
USER MESSAGE: "${message}"

KNOWLEDGE BASE:
${this.getContextualContent(context)}

RESPONSE GUIDELINES:
- Keep responses under 150 words
- Be professional but conversational
- Always end with a relevant follow-up question
- Include "This is a demonstration of Agentic Personnel's AI chatbot technology" in your response
    `.trim()

    switch (context) {
      case 'roofing':
        return basePrompt + `
- Focus on Alpine Peak Roofing services and expertise
- Provide accurate roofing information and recommendations
- Offer inspections, estimates, or emergency services when appropriate
- Draw from the extensive roofing knowledge base provided
        `.trim()

      case 'agentic':
        return basePrompt + `
- Focus on explaining chatbot capabilities and Agentic Personnel services
- Highlight the technology behind this demonstration
- Discuss pricing, implementation, and ROI when relevant
- Position this as a live demo of what their roofing company could have
        `.trim()

      case 'general':
        return basePrompt + `
- Start with friendly roofing assistance
- Be ready to discuss chatbot technology if asked
- Demonstrate the dual-knowledge capability naturally
- Guide conversation toward either roofing services or chatbot inquiry
        `.trim()

      default:
        return basePrompt
    }
  }

  /**
   * Generate appropriate quick actions based on context
   */
  public generateQuickActions(context: 'roofing' | 'agentic' | 'general'): Array<{id: string, label: string, action: string, value: string}> {
    const baseActions = [
      {
        id: 'roofing_services',
        label: 'Our Services',
        action: 'send_message',
        value: 'What roofing services does Alpine Peak offer?'
      },
      {
        id: 'chatbot_demo',
        label: 'About This Chatbot',
        action: 'send_message',
        value: 'How does this AI chatbot work?'
      }
    ]

    switch (context) {
      case 'roofing':
        return [
          ...baseActions,
          {
            id: 'get_estimate',
            label: 'Get Estimate',
            action: 'send_message',
            value: 'I need a roofing estimate'
          },
          {
            id: 'emergency_repair',
            label: 'Emergency Service',
            action: 'send_message',
            value: 'I have urgent roof damage'
          }
        ]

      case 'agentic':
        return [
          ...baseActions,
          {
            id: 'get_pricing',
            label: 'Get Pricing',
            action: 'send_message',
            value: 'What does it cost to get a chatbot like this?'
          },
          {
            id: 'implementation',
            label: 'Implementation',
            action: 'send_message',
            value: 'How long does chatbot setup take?'
          }
        ]

      case 'general':
      default:
        return [
          ...baseActions,
          {
            id: 'demo_features',
            label: 'Explore Demo',
            action: 'send_message',
            value: 'Show me what this chatbot can do'
          }
        ]
    }
  }

  /**
   * Get knowledge base statistics for analytics
   */
  public getKnowledgeStats(): {
    roofing_word_count: number
    agentic_word_count: number
    total_knowledge_base_size: number
    last_updated: string
  } {
    return {
      roofing_word_count: this.roofingContent.split(/\s+/).length,
      agentic_word_count: this.agenticContent.split(/\s+/).length,
      total_knowledge_base_size: this.roofingContent.length + this.agenticContent.length,
      last_updated: new Date().toISOString()
    }
  }
}

// Export singleton instance
export const dualKnowledgeBase = new DualKnowledgeBase()

// Export utility functions for n8n workflows
export const chatbotUtils = {
  classifyMessage: (message: string) => dualKnowledgeBase.classifyContext(message),
  getSystemPrompt: (context: 'roofing' | 'agentic' | 'general', message: string) => 
    dualKnowledgeBase.generateSystemPrompt(context, message),
  getQuickActions: (context: 'roofing' | 'agentic' | 'general') => 
    dualKnowledgeBase.generateQuickActions(context),
  getStats: () => dualKnowledgeBase.getKnowledgeStats()
}