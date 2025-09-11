# Demo Chatbot Workflow Specification - Agentic Personnel

## Overview
This is a simplified n8n workflow designed specifically for demonstrating AI chatbot capabilities to potential roofing company clients. The chatbot showcases dual knowledge domains and CRM integration without complex lead scoring or emergency routing.

## Workflow Name: `demo-chatbot-processor`

### Core Features
- **Dual Knowledge Base**: Alpine Peak Roofing expertise + Agentic Personnel services
- **Context-Aware Responses**: Intelligently switches between roofing and chatbot service topics
- **Universal CRM Sync**: Every conversation logged for prospect tracking
- **Demo Disclaimer**: Clear indication this is a demonstration system

## Node Structure

### 1. Webhook Trigger Node
- **Type:** Webhook
- **Method:** POST  
- **Path:** `/webhook/chatbot-process`
- **Expected Payload:**
```json
{
  "session_id": "unique-session-identifier",
  "message": "user message text",
  "context": {
    "page": "homepage",
    "user_agent": "Mozilla/5.0...",
    "referrer": "https://google.com",
    "conversation_history": []
  }
}
```

### 2. Context Classification Node
- **Type:** OpenAI
- **Model:** gpt-4-turbo-preview
- **Temperature:** 0.2
- **System Prompt:**
```
Classify this message to determine the appropriate response context:

CONTEXT OPTIONS:
1. "roofing" - Questions about roofing services, materials, repairs, installation
2. "agentic" - Questions about chatbots, AI implementation, Agentic Personnel services
3. "general" - Greetings, general conversation, unclear intent

Message: {{$json.message}}

Return only one word: roofing, agentic, or general
```

### 3. Dual-Context Response Generator
- **Type:** OpenAI
- **Model:** gpt-4-turbo-preview
- **Temperature:** 0.7
- **System Prompt:**
```
You are an AI assistant for Alpine Peak Roofing, powered by Agentic Personnel's chatbot technology.

CONTEXT TYPE: {{$node["Context Classification"].json.response}}

KNOWLEDGE BASE:

# ROOFING EXPERTISE (Alpine Peak Roofing)
- Premium residential and commercial roofing services in Denver metro
- Specializes in: Asphalt shingles, Metal roofing, Tile installation, Storm damage repair
- 15+ years experience, fully licensed and insured
- Free inspections and detailed estimates
- Emergency storm response available
- "Pinnacle of Protection, Peak of Performance"

# CHATBOT SERVICES (Agentic Personnel)
- AI-powered chatbots for roofing contractors
- 24/7 customer engagement and lead qualification
- Seamless CRM integration (HubSpot, Salesforce)
- Custom knowledge bases with 35,000+ words of industry expertise
- Implementation time: 2-3 weeks
- Setup includes: Custom training, CRM integration, staff training
- Monthly packages starting at $497/month
- ROI: Average 40% increase in qualified leads

RESPONSE GUIDELINES:
- Keep responses under 150 words
- Be professional but conversational
- If context is "roofing" - focus on Alpine Peak services
- If context is "agentic" - explain chatbot capabilities and Agentic services
- If context is "general" - default to friendly roofing assistant
- Always end responses with a relevant question to continue engagement
- Include demo disclaimer: "This is a demonstration of Agentic Personnel's AI chatbot technology."

USER MESSAGE: {{$json.message}}
CONVERSATION HISTORY: {{$json.context.conversation_history}}

Respond helpfully based on the detected context.
```

### 4. Session Storage Node
- **Type:** Supabase
- **Action:** Upsert
- **Table:** chat_conversations
- **Data:**
```json
{
  "session_id": "{{$json.session_id}}",
  "messages": "{{$json.context.conversation_history}} + new messages",
  "context": "{{$json.context}}",
  "context_type": "{{$node['Context Classification'].json.response}}",
  "demo_session": true,
  "updated_at": "{{new Date().toISOString()}}"
}
```

### 5. CRM Sync Node (All Conversations)
- **Type:** HTTP Request
- **Method:** POST
- **URL:** `{{$env.CRM_WEBHOOK_URL}}`
- **Headers:** 
  - `Authorization: Bearer {{$env.CRM_API_KEY}}`
  - `Content-Type: application/json`
- **Body:**
```json
{
  "type": "demo_chat_interaction",
  "session_id": "{{$json.session_id}}",
  "message": "{{$json.message}}",
  "response": "{{$node['Dual-Context Response Generator'].json.response}}",
  "context_type": "{{$node['Context Classification'].json.response}}",
  "timestamp": "{{new Date().toISOString()}}",
  "demo_source": "alpine_peak_chatbot",
  "agentic_personnel_prospect": true
}
```

### 6. Response Delivery Node
- **Type:** Webhook Response
- **Response Data:**
```json
{
  "success": true,
  "response": "{{$node['Dual-Context Response Generator'].json.response}}",
  "context_type": "{{$node['Context Classification'].json.response}}",
  "demo_disclaimer": "This is a demonstration of Agentic Personnel's AI chatbot technology.",
  "next_action": "continue_conversation",
  "session_id": "{{$json.session_id}}",
  "quick_actions": [
    {
      "id": "roofing_services",
      "label": "Our Services",
      "action": "send_message", 
      "value": "What roofing services does Alpine Peak offer?"
    },
    {
      "id": "chatbot_demo",
      "label": "About This Chatbot",
      "action": "send_message",
      "value": "How does this AI chatbot work?"
    },
    {
      "id": "get_pricing",
      "label": "Get Pricing",
      "action": "send_message", 
      "value": "What does it cost to get a chatbot like this for my roofing company?"
    }
  ]
}
```

## Demo-Specific Enhancements

### Welcome Message Override
When session is new, send contextual welcome:
```
"Hi! I'm Alpine Peak Roofing's AI assistant, powered by Agentic Personnel's chatbot technology. 

I can help you with:
🏠 Roofing services and expertise
🤖 Questions about how this chatbot works
💰 Pricing for getting your own AI assistant

This is a live demonstration - what would you like to explore?"
```

### Analytics Tracking
Log all demo interactions:
- Roofing vs Agentic Personnel question ratio
- Most common questions by category  
- Session duration and engagement
- Conversion to pricing inquiries

### Error Handling
If any node fails:
```
"I apologize for the technical hiccup! This demonstrates how our chatbot handles errors gracefully. 

In production, your customers would get seamless responses backed by multiple failsafes. Would you like to know more about our reliability features?"
```

## Environment Variables Required

```env
# OpenAI Configuration
OPENAI_API_KEY=your_openai_api_key

# Supabase Configuration  
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_KEY=your_supabase_service_key

# CRM Integration
CRM_WEBHOOK_URL=your_crm_webhook
CRM_API_KEY=your_crm_api_key

# Demo Configuration
DEMO_DISCLAIMER_ENABLED=true
AGENTIC_PERSONNEL_BRANDING=true
```

## Success Metrics for Demo

### Engagement Metrics
- Average conversation length > 5 messages
- Context switching (roofing ↔ agentic) demonstrates intelligence
- Pricing inquiries indicate sales interest

### Technical Demonstration
- Response time < 3 seconds
- Context-appropriate responses
- Seamless knowledge domain switching
- CRM integration visible in real-time

## Next Steps

1. Import this workflow into your n8n instance
2. Configure all environment variables
3. Test both knowledge domains thoroughly
4. Set up CRM webhook to capture all demo interactions
5. Train your sales team on the dual-context features

This workflow showcases both the roofing expertise AND the chatbot technology, making it a powerful sales demonstration tool.