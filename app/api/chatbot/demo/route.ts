// Demo Chatbot API Endpoint - Local Testing Without n8n
// This endpoint simulates the n8n workflow for development and testing

import { NextRequest, NextResponse } from 'next/server'
import { dualKnowledgeBase } from '@/lib/knowledgebase'
import { demoCRMSync } from '@/lib/crm/demoSyncService'
import type { DemoChatInteraction } from '@/lib/crm/demoSyncService'

interface ChatRequest {
  session_id: string
  message: string
  context: {
    page?: string
    user_agent?: string
    referrer?: string
    conversation_history?: any[]
    user_info?: {
      name?: string
      email?: string
      phone?: string
      company?: string
    }
  }
}

interface ChatResponse {
  success: boolean
  response: string
  context_type: 'roofing' | 'agentic' | 'general'
  demo_disclaimer: string
  next_action: string
  session_id: string
  quick_actions: Array<{
    id: string
    label: string
    action: string
    value: string
  }>
  metadata?: {
    classification_confidence: number
    keywords_detected: string[]
    knowledge_base_stats: any
    crm_sync_status?: string
  }
  error?: string
}

export async function POST(request: NextRequest): Promise<NextResponse<ChatResponse>> {
  try {
    const body: ChatRequest = await request.json()
    
    // Validate request
    if (!body.session_id || !body.message) {
      return NextResponse.json({
        success: false,
        response: "I'm sorry, but I didn't receive your message properly. Could you please try again?",
        context_type: 'general' as const,
        demo_disclaimer: "This is a demonstration of Agentic Personnel's AI chatbot technology.",
        next_action: 'continue_conversation',
        session_id: body.session_id || 'unknown',
        quick_actions: [],
        error: 'Missing required fields: session_id or message'
      }, { status: 400 })
    }

    // Step 1: Classify the message context
    const classification = dualKnowledgeBase.classifyContext(body.message)
    console.log('Message classification:', classification)

    // Step 2: Generate appropriate response based on context
    const systemPrompt = dualKnowledgeBase.generateSystemPrompt(
      classification.detected_context, 
      body.message
    )
    
    // Step 3: Simulate AI response (in production, this would call OpenAI)
    const aiResponse = await generateDemoResponse(
      body.message, 
      classification.detected_context, 
      systemPrompt
    )

    // Step 4: Generate context-appropriate quick actions
    const quickActions = dualKnowledgeBase.generateQuickActions(classification.detected_context)

    // Step 5: Prepare CRM sync data
    const sessionStartTime = Date.now() - (body.context.conversation_history?.length || 0) * 30000 // Estimate session duration
    const crmInteraction: DemoChatInteraction = {
      session_id: body.session_id,
      message: body.message,
      response: aiResponse,
      context_type: classification.detected_context,
      timestamp: new Date().toISOString(),
      user_info: body.context.user_info,
      demo_metadata: {
        demo_source: 'alpine_peak_chatbot_demo',
        prospect_level: assessDemoProspectLevel(body.message, classification.detected_context),
        features_explored: getExploredFeatures(body.context.conversation_history || []),
        session_duration_seconds: Math.floor((Date.now() - sessionStartTime) / 1000),
        total_messages: (body.context.conversation_history?.length || 0) + 1
      }
    }

    // Step 6: Sync to CRM (async, don't wait for completion)
    let crmSyncStatus = 'pending'
    try {
      demoCRMSync.syncDemoInteraction(crmInteraction).then(result => {
        console.log('CRM sync result:', result)
      }).catch(error => {
        console.error('CRM sync error:', error)
      })
      crmSyncStatus = 'initiated'
    } catch (error) {
      crmSyncStatus = 'failed'
      console.error('CRM sync initiation failed:', error)
    }

    // Step 7: Return response
    const response: ChatResponse = {
      success: true,
      response: aiResponse,
      context_type: classification.detected_context,
      demo_disclaimer: "This is a demonstration of Agentic Personnel's AI chatbot technology.",
      next_action: 'continue_conversation',
      session_id: body.session_id,
      quick_actions: quickActions,
      metadata: {
        classification_confidence: classification.confidence,
        keywords_detected: classification.keywords_found,
        knowledge_base_stats: dualKnowledgeBase.getKnowledgeStats(),
        crm_sync_status: crmSyncStatus
      }
    }

    return NextResponse.json(response)

  } catch (error) {
    console.error('Demo chatbot API error:', error)
    
    return NextResponse.json({
      success: false,
      response: "I apologize, but I encountered a technical issue. This actually demonstrates how our error handling works - in production, your customers would get a seamless experience with automatic fallbacks. Would you like to know more about our reliability features?",
      context_type: 'general' as const,
      demo_disclaimer: "This is a demonstration of Agentic Personnel's AI chatbot technology.",
      next_action: 'continue_conversation',
      session_id: 'error',
      quick_actions: [
        {
          id: 'try_again',
          label: 'Try Again',
          action: 'send_message',
          value: 'Let me try asking something else'
        },
        {
          id: 'reliability_info',
          label: 'Reliability Features',
          action: 'send_message',
          value: 'Tell me about your reliability and error handling'
        }
      ],
      error: (error as Error).message
    }, { status: 500 })
  }
}

/**
 * Generate demo response based on context (simulates OpenAI API)
 * In production, this would call the actual OpenAI API with the system prompt
 */
async function generateDemoResponse(
  message: string, 
  context: 'roofing' | 'agentic' | 'general',
  systemPrompt: string
): Promise<string> {
  
  const messageLower = message.toLowerCase()
  
  // Roofing context responses
  if (context === 'roofing') {
    if (messageLower.includes('service') || messageLower.includes('what') && messageLower.includes('offer')) {
      return "Alpine Peak Roofing offers comprehensive roofing services including residential and commercial installations, repairs, and storm damage restoration. We specialize in asphalt shingles, metal roofing, tile systems, and emergency services throughout the Denver metro area. With over 15 years of experience, we're fully licensed, insured, and committed to our motto: 'Pinnacle of Protection, Peak of Performance.' Would you like a free inspection or estimate for your property?"
    }
    
    if (messageLower.includes('price') || messageLower.includes('cost') || messageLower.includes('estimate')) {
      return "Roofing costs vary based on several factors including roof size, material choice, and complexity. For a typical 2,000 sq ft home in the Denver area, asphalt shingle replacement ranges from $8,500-$15,000, while premium metal roofing runs $12,000-$25,000. We offer free, detailed estimates with no obligation, and financing options including 0% interest for qualified homeowners. This is a demonstration of Agentic Personnel's AI chatbot technology. Would you like to schedule a free inspection?"
    }
    
    if (messageLower.includes('emergency') || messageLower.includes('leak') || messageLower.includes('damage')) {
      return "I understand you have urgent roofing concerns! Alpine Peak Roofing provides 24/7 emergency response for storm damage, leaks, and structural issues. Our emergency protocol includes immediate temporary protection, comprehensive damage assessment, and insurance claim assistance. For demo purposes, I'd normally route this to our emergency team within 5 minutes. This is a demonstration of Agentic Personnel's AI chatbot technology. In a real emergency, would you need immediate callback or temporary protection?"
    }
    
    return "As Alpine Peak Roofing's AI assistant, I'm here to help with all your roofing needs! We provide expert residential and commercial roofing services throughout Colorado, specializing in quality installations, reliable repairs, and storm damage restoration. Our experienced team delivers the 'Pinnacle of Protection, Peak of Performance' on every project. This is a demonstration of Agentic Personnel's AI chatbot technology. What specific roofing questions can I help answer for you?"
  }

  // Agentic Personnel context responses  
  if (context === 'agentic') {
    if (messageLower.includes('price') || messageLower.includes('cost') || messageLower.includes('pricing')) {
      return "Agentic Personnel's AI chatbot services start at $497/month for our Starter package, perfect for small roofing companies. Our Professional package at $997/month includes advanced features and multi-channel integration, while our Enterprise solution at $1,997/month offers unlimited conversations and dedicated support. Most clients see 40-60% more qualified leads within 90 days, delivering strong ROI. This is a demonstration of Agentic Personnel's AI chatbot technology - you're experiencing it live right now! Would you like to see a custom proposal for your roofing company?"
    }
    
    if (messageLower.includes('how') && (messageLower.includes('work') || messageLower.includes('does'))) {
      return "You're experiencing exactly how it works! This chatbot uses GPT-4 AI trained on 35,000+ words of roofing expertise, automatically classifies customer intent, and provides instant responses 24/7. It seamlessly integrates with your CRM, captures leads, and routes urgent inquiries appropriately. The system includes smart context switching - notice how I can discuss both roofing services and chatbot technology? Setup takes 2-3 weeks including custom training, CRM integration, and staff onboarding. This is a demonstration of Agentic Personnel's AI chatbot technology. What aspect interests you most - the AI capabilities or business results?"
    }
    
    if (messageLower.includes('implementation') || messageLower.includes('setup') || messageLower.includes('install')) {
      return "Implementation is streamlined into 4 phases over 2-3 weeks: Discovery & Planning, Development & Training, Testing & Optimization, and Launch & Support. We handle the technical setup while you focus on your business. The process includes custom knowledge base creation, CRM integration, staff training, and performance optimization. Most clients are live and seeing results within 3 weeks. This is a demonstration of Agentic Personnel's AI chatbot technology. Would you like to see our implementation timeline and what's included?"
    }
    
    return "You're experiencing Agentic Personnel's AI chatbot technology right now! We create custom AI assistants for roofing companies that handle customer inquiries 24/7, qualify leads automatically, and integrate seamlessly with CRM systems. Our clients typically see 40-60% more qualified leads with consistent customer service that never takes a day off. This demonstration showcases both roofing expertise and our chatbot capabilities. What questions do you have about implementing this technology for your roofing business?"
  }

  // General context responses
  return "Hello! I'm Alpine Peak Roofing's AI assistant, powered by Agentic Personnel's advanced chatbot technology. I can help you with roofing services, materials, estimates, and emergency repairs - or I can explain how this AI system works and what it could do for your roofing company. You're experiencing a live demonstration of intelligent customer service automation that's available 24/7. This is a demonstration of Agentic Personnel's AI chatbot technology. What would you like to explore - our roofing expertise or the chatbot technology behind this conversation?"
}

/**
 * Assess prospect level based on message content and context
 */
function assessDemoProspectLevel(message: string, context: string): 'visitor' | 'interested' | 'qualified' | 'hot' {
  const messageLower = message.toLowerCase()
  
  // Hot prospect signals
  if (messageLower.includes('price') || messageLower.includes('cost') || messageLower.includes('pricing') ||
      messageLower.includes('proposal') || messageLower.includes('quote') || messageLower.includes('demo')) {
    return 'hot'
  }
  
  // Qualified prospect signals
  if (context === 'agentic' || messageLower.includes('my company') || messageLower.includes('our business') ||
      messageLower.includes('implement') || messageLower.includes('how does')) {
    return 'qualified'
  }
  
  // Basic interest
  if (message.length > 20 || messageLower.includes('tell me') || messageLower.includes('what')) {
    return 'interested'
  }
  
  return 'visitor'
}

/**
 * Extract explored features from conversation history
 */
function getExploredFeatures(conversationHistory: any[]): string[] {
  const features: string[] = []
  
  conversationHistory.forEach(exchange => {
    const content = (exchange.content || '').toLowerCase()
    
    if (content.includes('roofing') || content.includes('service')) features.push('roofing_services')
    if (content.includes('price') || content.includes('cost')) features.push('pricing')
    if (content.includes('chatbot') || content.includes('ai')) features.push('ai_technology')
    if (content.includes('implementation') || content.includes('setup')) features.push('implementation')
    if (content.includes('crm') || content.includes('integration')) features.push('crm_integration')
    if (content.includes('emergency') || content.includes('urgent')) features.push('emergency_handling')
  })
  
  return [...new Set(features)] // Remove duplicates
}