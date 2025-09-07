import type { ChatMessage, ConversationContext, UserInfo, LeadScoringFactors } from './types'

/**
 * Utility functions for conversation management and analysis
 */

/**
 * Extract user information from conversation messages
 */
export function extractUserInfo(messages: ChatMessage[]): UserInfo {
  const userMessages = messages
    .filter(m => m.type === 'user')
    .map(m => m.content.toLowerCase())
    .join(' ')

  const userInfo: UserInfo = {}

  // Extract name patterns
  const namePatterns = [
    /(?:my name is|i'm|i am|call me)\s+([a-z]+(?:\s+[a-z]+)?)/i,
    /(?:this is|it's)\s+([a-z]+(?:\s+[a-z]+)?)/i
  ]

  for (const pattern of namePatterns) {
    const match = userMessages.match(pattern)
    if (match) {
      userInfo.name = match[1].trim()
      break
    }
  }

  // Extract email patterns
  const emailPattern = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/
  const emailMatch = userMessages.match(emailPattern)
  if (emailMatch) {
    userInfo.email = emailMatch[0]
  }

  // Extract phone patterns
  const phonePatterns = [
    /\b(\d{3}[-.]?\d{3}[-.]?\d{4})\b/,
    /\b(\(\d{3}\)\s?\d{3}[-.]?\d{4})\b/,
    /\b(\d{10})\b/
  ]

  for (const pattern of phonePatterns) {
    const match = userMessages.match(pattern)
    if (match) {
      userInfo.phone = match[1]
      break
    }
  }

  // Extract project type from keywords
  const projectKeywords = {
    repair: ['repair', 'fix', 'leak', 'damage', 'hole', 'broken'],
    replacement: ['replace', 'new roof', 'complete', 'tear off', 'install'],
    inspection: ['inspect', 'look at', 'check', 'assess', 'evaluate'],
    commercial: ['commercial', 'business', 'office', 'warehouse', 'industrial'],
    emergency: ['emergency', 'urgent', 'flooding', 'storm', 'immediate']
  }

  for (const [type, keywords] of Object.entries(projectKeywords)) {
    if (keywords.some(keyword => userMessages.includes(keyword))) {
      userInfo.project_type = type as any
      break
    }
  }

  // Extract urgency level from language
  const urgencyKeywords = {
    5: ['emergency', 'urgent', 'immediate', 'asap', 'flooding'],
    4: ['soon', 'quickly', 'this week', 'urgent'],
    3: ['couple weeks', 'month', 'planning'],
    2: ['few months', 'spring', 'summer', 'eventually'],
    1: ['someday', 'future', 'thinking about']
  }

  for (const [level, keywords] of Object.entries(urgencyKeywords)) {
    if (keywords.some(keyword => userMessages.includes(keyword))) {
      userInfo.urgency_level = parseInt(level)
      break
    }
  }

  return userInfo
}

/**
 * Calculate conversation engagement score
 */
export function calculateEngagementScore(messages: ChatMessage[]): number {
  const userMessages = messages.filter(m => m.type === 'user')
  const botMessages = messages.filter(m => m.type === 'bot')
  
  if (userMessages.length === 0) return 0

  let score = 0

  // Message count factor (0-30 points)
  score += Math.min(userMessages.length * 3, 30)

  // Response rate factor (0-20 points)
  const responseRate = botMessages.length > 0 ? userMessages.length / botMessages.length : 0
  score += Math.min(responseRate * 10, 20)

  // Message length factor (0-25 points)
  const avgMessageLength = userMessages.reduce((sum, msg) => sum + msg.content.length, 0) / userMessages.length
  if (avgMessageLength > 100) score += 25
  else if (avgMessageLength > 50) score += 15
  else if (avgMessageLength > 20) score += 10
  else score += 5

  // Question engagement (0-15 points)
  const questionsAsked = userMessages.filter(msg => msg.content.includes('?')).length
  score += Math.min(questionsAsked * 5, 15)

  // Information sharing (0-10 points)
  const contactInfoShared = extractUserInfo(messages)
  if (contactInfoShared.name) score += 3
  if (contactInfoShared.email) score += 4
  if (contactInfoShared.phone) score += 3

  return Math.min(score, 100)
}

/**
 * Analyze conversation sentiment
 */
export function analyzeConversationSentiment(messages: ChatMessage[]): 'positive' | 'neutral' | 'negative' {
  const userMessages = messages
    .filter(m => m.type === 'user')
    .map(m => m.content.toLowerCase())
    .join(' ')

  // Positive indicators
  const positiveWords = [
    'great', 'excellent', 'perfect', 'awesome', 'wonderful', 'fantastic',
    'yes', 'definitely', 'absolutely', 'sure', 'thanks', 'thank you',
    'please', 'help', 'interested', 'looking forward', 'excited'
  ]

  // Negative indicators
  const negativeWords = [
    'terrible', 'awful', 'horrible', 'bad', 'worst', 'hate',
    'no', 'never', 'don\'t', 'can\'t', 'won\'t', 'frustrated',
    'angry', 'annoyed', 'disappointed', 'upset', 'problem'
  ]

  const positiveScore = positiveWords.filter(word => userMessages.includes(word)).length
  const negativeScore = negativeWords.filter(word => userMessages.includes(word)).length

  if (positiveScore > negativeScore + 1) return 'positive'
  if (negativeScore > positiveScore + 1) return 'negative'
  return 'neutral'
}

/**
 * Generate conversation summary for handoffs
 */
export function generateConversationSummary(
  messages: ChatMessage[], 
  context: ConversationContext
): string {
  const userInfo = extractUserInfo(messages)
  const engagement = calculateEngagementScore(messages)
  const sentiment = analyzeConversationSentiment(messages)
  
  const userMessages = messages.filter(m => m.type === 'user')
  const duration = Math.round((Date.now() - new Date(context.session_start).getTime()) / 1000 / 60)

  const summary = [
    `Conversation Summary:`,
    `• Duration: ${duration} minutes`,
    `• Messages: ${messages.length} total (${userMessages.length} from user)`,
    `• Engagement Score: ${engagement}/100`,
    `• Sentiment: ${sentiment}`,
    `• Page: ${context.page}`,
    ''
  ]

  if (Object.keys(userInfo).length > 0) {
    summary.push(`User Information:`)
    if (userInfo.name) summary.push(`• Name: ${userInfo.name}`)
    if (userInfo.email) summary.push(`• Email: ${userInfo.email}`)
    if (userInfo.phone) summary.push(`• Phone: ${userInfo.phone}`)
    if (userInfo.project_type) summary.push(`• Project Type: ${userInfo.project_type}`)
    if (userInfo.urgency_level) summary.push(`• Urgency Level: ${userInfo.urgency_level}/5`)
    summary.push('')
  }

  const recentMessages = userMessages.slice(-3)
  if (recentMessages.length > 0) {
    summary.push(`Recent Messages:`)
    recentMessages.forEach((msg, i) => {
      const preview = msg.content.length > 100 ? msg.content.substring(0, 100) + '...' : msg.content
      summary.push(`${i + 1}. "${preview}"`)
    })
  }

  return summary.join('\n')
}

/**
 * Detect emergency keywords and urgency level
 */
export function detectEmergency(message: string): { isEmergency: boolean; urgencyLevel: number; keywords: string[] } {
  const emergencyKeywords = {
    critical: ['flooding', 'collapsed', 'falling', 'dangerous', 'injury', 'structural'],
    high: ['leak', 'leaking', 'water damage', 'storm damage', 'emergency', 'urgent'],
    medium: ['repair needed', 'asap', 'immediately', 'right away', 'today']
  }

  const messageText = message.toLowerCase()
  const detectedKeywords: string[] = []
  let maxUrgency = 0

  for (const [level, keywords] of Object.entries(emergencyKeywords)) {
    for (const keyword of keywords) {
      if (messageText.includes(keyword)) {
        detectedKeywords.push(keyword)
        switch (level) {
          case 'critical': maxUrgency = Math.max(maxUrgency, 5); break
          case 'high': maxUrgency = Math.max(maxUrgency, 4); break
          case 'medium': maxUrgency = Math.max(maxUrgency, 3); break
        }
      }
    }
  }

  return {
    isEmergency: maxUrgency >= 4,
    urgencyLevel: maxUrgency,
    keywords: detectedKeywords
  }
}

/**
 * Calculate lead scoring factors based on conversation
 */
export function calculateLeadScoringFactors(
  messages: ChatMessage[], 
  context: ConversationContext,
  userInfo?: UserInfo
): LeadScoringFactors {
  const engagement = calculateEngagementScore(messages)
  const extractedInfo = userInfo || extractUserInfo(messages)
  const conversationText = messages
    .filter(m => m.type === 'user')
    .map(m => m.content.toLowerCase())
    .join(' ')

  // Urgency scoring (0-30 points)
  let urgencyScore = 0
  if (extractedInfo.urgency_level) {
    urgencyScore = Math.min(extractedInfo.urgency_level * 6, 30)
  } else {
    const emergency = detectEmergency(conversationText)
    urgencyScore = emergency.urgencyLevel * 6
  }

  // Project type scoring (0-30 points)
  let projectTypeScore = 5 // default
  if (extractedInfo.project_type) {
    switch (extractedInfo.project_type) {
      case 'commercial': projectTypeScore = 30; break
      case 'replacement': projectTypeScore = 25; break
      case 'emergency': projectTypeScore = 25; break
      case 'repair': projectTypeScore = 15; break
      case 'inspection': projectTypeScore = 10; break
    }
  }

  // Contact completeness (0-25 points)
  let contactScore = 0
  if (extractedInfo.name) contactScore += 5
  if (extractedInfo.email) contactScore += 10
  if (extractedInfo.phone) contactScore += 10

  // Buying intent keywords (0-15 points)
  const buyingKeywords = [
    'cost', 'price', 'quote', 'estimate', 'budget', 'how much',
    'schedule', 'when can you', 'book', 'appointment', 'hire'
  ]
  const keywordMatches = buyingKeywords.filter(keyword => conversationText.includes(keyword))
  const buyingIntentScore = Math.min(keywordMatches.length * 3, 15)

  // Location relevance (0-10 points)
  const serviceAreas = ['colorado', 'denver', 'boulder', 'fort collins', 'colorado springs', 'aurora', 'lakewood']
  const locationScore = serviceAreas.some(area => conversationText.includes(area.toLowerCase())) ? 10 : 0

  // Conversation length and engagement (0-15 points)
  const conversationScore = Math.min(Math.round(engagement * 0.15), 15)

  return {
    urgency: urgencyScore,
    project_type: projectTypeScore,
    contact_completeness: contactScore,
    buying_intent: buyingIntentScore,
    location: locationScore,
    conversation_length: conversationScore,
    engagement_quality: Math.min(Math.round(engagement * 0.1), 10)
  }
}

/**
 * Format message for display with proper line breaks and emphasis
 */
export function formatMessageContent(content: string): string {
  return content
    .replace(/\n\n+/g, '\n\n') // Normalize multiple line breaks
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // Bold
    .replace(/\*(.*?)\*/g, '<em>$1</em>') // Italic
    .replace(/\n/g, '<br />') // Line breaks
    .replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank" rel="noopener noreferrer" class="text-blue-600 underline hover:text-blue-800">$1</a>') // Links
}

/**
 * Validate and sanitize user input
 */
export function sanitizeUserInput(input: string): string {
  return input
    .trim()
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') // Remove script tags
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .replace(/javascript:/gi, '') // Remove javascript: urls
    .substring(0, 500) // Limit length
}

/**
 * Generate session ID
 */
export function generateSessionId(): string {
  return `chat_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}

/**
 * Check if conversation qualifies for human handoff
 */
export function shouldRequestHumanHandoff(
  messages: ChatMessage[],
  leadScore: number
): { shouldHandoff: boolean; reason: string } {
  
  // Emergency detected
  const lastUserMessage = messages.filter(m => m.type === 'user').slice(-1)[0]
  if (lastUserMessage) {
    const emergency = detectEmergency(lastUserMessage.content)
    if (emergency.isEmergency) {
      return { shouldHandoff: true, reason: 'emergency' }
    }
  }

  // High-value lead
  if (leadScore >= 80) {
    return { shouldHandoff: true, reason: 'high_value_lead' }
  }

  // Complex conversation (many back-and-forth messages)
  if (messages.length >= 20) {
    return { shouldHandoff: true, reason: 'complex_conversation' }
  }

  // User explicitly asks for human
  const recentMessages = messages.slice(-5).map(m => m.content.toLowerCase()).join(' ')
  const humanRequestKeywords = ['human', 'person', 'agent', 'representative', 'speak to someone', 'talk to someone']
  if (humanRequestKeywords.some(keyword => recentMessages.includes(keyword))) {
    return { shouldHandoff: true, reason: 'user_request' }
  }

  return { shouldHandoff: false, reason: 'continue_bot' }
}