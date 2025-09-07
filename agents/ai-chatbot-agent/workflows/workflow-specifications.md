# n8n Workflow Specifications for AI Chatbot

## 🚨 CRITICAL NOTE
These workflows must be created using the n8n MCP server tools. This document provides the exact specifications needed for implementation once MCP server access is available.

## 🔄 Workflow #1: Main Chatbot Processing Pipeline

### Workflow Name: `chatbot-message-processor`
### Description: Processes incoming chat messages, generates AI responses, calculates lead scores, and manages conversation flow.

### Node Structure:

#### 1. Webhook Trigger Node
- **Type:** Webhook
- **Method:** POST
- **Path:** `/webhook/chatbot/message`
- **Authentication:** None (handled by API key in headers)
- **Expected Payload:**
```json
{
  "session_id": "unique-session-identifier",
  "message": "user message text",
  "context": {
    "page": "homepage",
    "user_agent": "Mozilla/5.0...",
    "referrer": "https://google.com",
    "conversation_history": [],
    "user_info": {
      "name": "",
      "email": "",
      "phone": "",
      "address": ""
    }
  }
}
```

#### 2. Session Context Retrieval Node
- **Type:** Supabase
- **Action:** Select
- **Table:** chat_conversations
- **Query:** `SELECT * FROM chat_conversations WHERE session_id = '{{$json.session_id}}'`
- **On Empty Result:** Create new conversation record

#### 3. Message Classification Node
- **Type:** OpenAI
- **Model:** gpt-4-turbo-preview
- **Temperature:** 0.3
- **System Prompt:**
```
You are an expert at analyzing customer messages for a roofing company. Classify the message and extract key information.

Analyze this message and return JSON with:
{
  "category": "emergency|quote_request|information|scheduling|complaint",
  "urgency_level": 1-5,
  "project_type": "repair|replacement|inspection|commercial|residential",
  "sentiment": "positive|neutral|negative",
  "buying_intent": 1-5,
  "keywords_detected": ["list", "of", "relevant", "keywords"],
  "contact_info_provided": {
    "name": boolean,
    "email": boolean,
    "phone": boolean,
    "address": boolean
  }
}
```
- **User Message:** `{{$json.message}}`

#### 4. Context-Aware Response Generation Node
- **Type:** OpenAI
- **Model:** gpt-4-turbo-preview
- **Temperature:** 0.7
- **System Prompt:**
```
You are Alpine Peak Roofing's helpful AI assistant. You're knowledgeable about roofing, professional, and focused on helping customers.

CONTEXT:
- Conversation History: {{$node["Session Context Retrieval"].json.messages}}
- Current Message: {{$json.message}}
- Classification: {{$node["Message Classification"].json}}
- User Info: {{$json.context.user_info}}

GUIDELINES:
- Keep responses under 100 words
- Be conversational but professional
- If this seems like a potential lead, gently ask qualifying questions
- For emergencies, prioritize safety and immediate contact
- Progressively collect: name → email → phone → project details
- Always offer a free inspection for qualified leads
- Use emojis sparingly and professionally

Respond helpfully to their message.
```

#### 5. Lead Scoring Calculation Node
- **Type:** Function
- **JavaScript Code:**
```javascript
const message = items[0].json.message.toLowerCase();
const classification = items[0].json.classification;
const context = items[0].json.context;
const userInfo = context.user_info || {};

let score = 0;
const factors = {};

// Urgency scoring (0-30 points)
if (classification.urgency_level >= 4) {
  score += 25;
  factors.urgency = 25;
} else if (classification.urgency_level >= 3) {
  score += 15;
  factors.urgency = 15;
} else if (classification.urgency_level >= 2) {
  score += 5;
  factors.urgency = 5;
}

// Project type scoring (5-30 points)
if (classification.project_type === 'replacement') {
  score += 25;
  factors.project_type = 25;
} else if (classification.project_type === 'commercial') {
  score += 30;
  factors.project_type = 30;
} else if (classification.project_type === 'repair') {
  score += 15;
  factors.project_type = 15;
} else if (classification.project_type === 'inspection') {
  score += 10;
  factors.project_type = 10;
} else {
  score += 5;
  factors.project_type = 5;
}

// Contact completeness (0-25 points)
let contactScore = 0;
if (userInfo.name) contactScore += 5;
if (userInfo.email) contactScore += 8;
if (userInfo.phone) contactScore += 8;
if (userInfo.address) contactScore += 4;
score += contactScore;
factors.contact_completeness = contactScore;

// Buying intent keywords (0-15 points)
const buyingKeywords = [
  'cost', 'price', 'quote', 'estimate', 'budget', 
  'schedule', 'when can you', 'how much', 'pricing',
  'install', 'replace', 'need done', 'hire'
];
const keywordMatches = buyingKeywords.filter(keyword => message.includes(keyword));
const keywordScore = Math.min(keywordMatches.length * 3, 15);
score += keywordScore;
factors.buying_intent = keywordScore;

// Geographic relevance (0-10 points)
const serviceAreas = ['colorado', 'denver', 'boulder', 'fort collins', 'colorado springs'];
const locationScore = serviceAreas.some(area => message.includes(area)) ? 10 : 0;
score += locationScore;
factors.location = locationScore;

// Cap at 100
score = Math.min(score, 100);

return [{
  json: {
    lead_score: score,
    scoring_factors: factors,
    is_hot_lead: score >= 70,
    is_qualified_lead: score >= 50,
    needs_immediate_attention: classification.category === 'emergency' || score >= 85
  }
}];
```

#### 6. Conversation Storage Node
- **Type:** Supabase
- **Action:** Upsert
- **Table:** chat_conversations
- **Data:**
```json
{
  "session_id": "{{$json.session_id}}",
  "messages": "{{$node['Session Context Retrieval'].json.messages || []}} + new message",
  "context": "{{$json.context}}",
  "lead_score": "{{$node['Lead Scoring Calculation'].json.lead_score}}",
  "updated_at": "{{new Date().toISOString()}}"
}
```

#### 7. Response Delivery Node
- **Type:** Webhook Response
- **Response Data:**
```json
{
  "success": true,
  "response": "{{$node['Context-Aware Response Generation'].json.response}}",
  "lead_score": "{{$node['Lead Scoring Calculation'].json.lead_score}}",
  "is_hot_lead": "{{$node['Lead Scoring Calculation'].json.is_hot_lead}}",
  "next_action": "continue_conversation",
  "session_id": "{{$json.session_id}}"
}
```

### Conditional Branches:

#### Branch A: High Priority Lead (Score >= 70)
- **Condition:** `{{$node['Lead Scoring Calculation'].json.is_hot_lead}}`
- **Actions:**
  1. Trigger lead creation workflow via webhook
  2. Send Slack notification to #sales-hot-leads
  3. Create follow-up task in CRM

#### Branch B: Emergency Detected
- **Condition:** `{{$node['Message Classification'].json.category === 'emergency'}}`
- **Actions:**
  1. Trigger emergency response workflow
  2. Send SMS alert to on-call technician
  3. Priority response in < 5 minutes

#### Branch C: Qualified Lead (Score >= 50)
- **Condition:** `{{$node['Lead Scoring Calculation'].json.is_qualified_lead}}`
- **Actions:**
  1. Add to lead nurturing sequence
  2. Send email to sales team
  3. Schedule follow-up reminder

---

## 🔄 Workflow #2: Lead Creation & CRM Sync

### Workflow Name: `chatbot-lead-processor`
### Description: Creates leads from qualified chat conversations and syncs to CRM.

### Trigger: Webhook from main chatbot workflow
### Expected Payload:
```json
{
  "session_id": "session-id",
  "lead_score": 75,
  "conversation_data": {},
  "contact_info": {
    "name": "John Doe",
    "email": "john@email.com",
    "phone": "555-0123",
    "address": "123 Main St"
  },
  "project_details": {
    "type": "replacement",
    "urgency": 3,
    "notes": "Conversation summary"
  }
}
```

### Node Structure:

#### 1. Lead Creation Node (Supabase)
```sql
INSERT INTO leads (
  first_name, last_name, email, phone, address,
  project_type, urgency_level, lead_score, source,
  conversation_data, status, created_at
) VALUES (
  $1, $2, $3, $4, $5, $6, $7, $8, 'chatbot', $9, 'new', NOW()
)
```

#### 2. CRM Sync Node (HTTP Request)
- **Method:** POST
- **URL:** CRM webhook endpoint
- **Headers:** Authorization, Content-Type
- **Body:** Formatted lead data

#### 3. Notification Nodes
- **Slack:** Post to #new-leads channel
- **Email:** Send to sales@alpinepeakroofing.com
- **SMS:** Alert for high-priority leads only

---

## 🔄 Workflow #3: Emergency Response Handler

### Workflow Name: `chatbot-emergency-response`
### Description: Handles urgent roofing emergencies with immediate escalation.

### Trigger: Called from main chatbot when emergency keywords detected

### Emergency Keywords:
- "leak", "flooding", "emergency", "urgent", "storm damage"
- "roof collapsed", "water damage", "falling", "dangerous"

### Node Structure:

#### 1. Emergency Assessment Node (OpenAI)
```
Assess the emergency severity and provide safety instructions:

Message: {{$json.message}}

Classify as:
- CRITICAL (immediate danger to life/property)
- HIGH (significant property damage risk)
- MEDIUM (standard urgent repair)

Provide appropriate safety instructions and response time.
```

#### 2. Contact Collection Node (OpenAI)
```
You must collect a phone number for immediate callback. Be urgent but reassuring:

"This sounds urgent. I'm connecting you with our emergency team right now. I need your phone number for an immediate callback within 5 minutes. What's the best number to reach you?"

If they provide a number, confirm it back to them.
```

#### 3. Emergency Ticket Creation (Supabase)
```sql
INSERT INTO emergency_tickets (
  phone, description, severity, location,
  created_at, status, source
) VALUES (
  $1, $2, $3, $4, NOW(), 'new', 'chatbot'
)
```

#### 4. Immediate Escalation Nodes
- **SMS to On-Call:** Send details immediately
- **Phone Call API:** Trigger automated callback system
- **Slack Alert:** Post to #emergency-response

---

## 🔄 Workflow #4: Appointment Scheduler

### Workflow Name: `chatbot-appointment-scheduler`
### Description: Schedules inspections and consultations directly through chat.

### Trigger: When user requests scheduling

### Integration: Google Calendar API or Calendly

### Node Structure:

#### 1. Availability Check
- Query calendar for open slots
- Consider technician locations and travel time
- Present 3-5 options to customer

#### 2. Appointment Confirmation
- Book selected time slot
- Send calendar invites
- Create job record

#### 3. Reminder Setup
- Email confirmation immediately
- SMS reminder 24 hours before
- Follow-up sequence after appointment

---

## 📋 Implementation Checklist for n8n MCP Server

### Phase 1: Core Workflow
- [ ] Create `chatbot-message-processor` workflow using n8n MCP tools
- [ ] Configure webhook trigger with proper authentication
- [ ] Set up OpenAI nodes with API key from environment variables
- [ ] Implement lead scoring function node with exact JavaScript code above
- [ ] Configure Supabase nodes with database connection
- [ ] Test basic message flow end-to-end

### Phase 2: Advanced Workflows
- [ ] Create `chatbot-lead-processor` workflow 
- [ ] Build `chatbot-emergency-response` workflow
- [ ] Implement `chatbot-appointment-scheduler` workflow
- [ ] Configure all webhook connections between workflows
- [ ] Set up conditional routing logic

### Phase 3: Integrations
- [ ] Connect Slack notifications with webhook URLs
- [ ] Set up email notifications via SendGrid or similar
- [ ] Configure SMS alerts through Twilio
- [ ] Test CRM integration endpoints
- [ ] Validate Google Calendar API connection

### Phase 4: Testing
- [ ] Test with sample conversations covering all scenarios
- [ ] Verify lead scoring accuracy with different message types
- [ ] Test emergency escalation with urgent keywords
- [ ] Validate appointment scheduling flow
- [ ] Check all notification systems

---

## 🔧 Environment Variables Needed

```env
# OpenAI Configuration
OPENAI_API_KEY=sk-...

# Supabase Configuration  
SUPABASE_URL=https://...
SUPABASE_SERVICE_KEY=eyJ...

# Notification Services
SLACK_WEBHOOK_URL=https://hooks.slack.com/...
SENDGRID_API_KEY=SG...
TWILIO_ACCOUNT_SID=AC...
TWILIO_AUTH_TOKEN=...

# CRM Integration
HUBSPOT_API_KEY=...
# or
SALESFORCE_CLIENT_ID=...
SALESFORCE_CLIENT_SECRET=...
```

---

## 🚨 NEXT STEPS

1. **IMMEDIATE:** Senior developer must provide n8n MCP server access
2. **THEN:** Use n8n MCP tools to create workflows exactly as specified above
3. **TEST:** Each workflow individually before connecting them
4. **DOCUMENT:** Export workflow JSON files to workflows/ directory
5. **INTEGRATE:** Connect frontend components to webhook endpoints

This specification provides everything needed to implement the chatbot automation once n8n MCP server tools become available.