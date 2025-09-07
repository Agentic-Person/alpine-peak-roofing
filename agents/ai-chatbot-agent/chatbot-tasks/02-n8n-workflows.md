# n8n Workflow Implementation Tasks

## 🚨 MANDATORY: Use n8n MCP Server Tools

**CRITICAL:** You MUST use the n8n MCP server tools for ALL workflow creation and management. Do not use any other tools or methods for n8n operations.

## 🔄 Workflow #1: Main Chatbot Processing Pipeline

### Workflow Name: `chatbot-message-processor`

### Required Nodes:
1. **Webhook Trigger Node**
   - Path: `/chatbot/message`
   - Method: POST
   - Expected payload:
     ```json
     {
       "session_id": "unique-session-id",
       "message": "user message text",
       "context": {
         "page": "homepage",
         "user_agent": "browser info",
         "conversation_history": []
       }
     }
     ```

2. **Session Context Retrieval**
   - **Supabase Node:** Query `chat_conversations` table
   - Find existing conversation by `session_id`
   - Load conversation history and context
   - If new session, create record with initial context

3. **Message Classification**
   - **OpenAI Node (GPT-4):**
     ```
     Classify this roofing customer message into categories:
     
     Message: "{{$json.message}}"
     
     Categories:
     - emergency (urgent repair needed)
     - quote_request (wants pricing info)
     - information (general questions)
     - scheduling (wants appointment)
     - complaint (dissatisfaction)
     
     Also extract:
     - urgency_level (1-5)
     - project_type (repair/replacement/inspection/commercial)
     - sentiment (positive/neutral/negative)
     
     Return JSON format.
     ```

4. **Context-Aware Response Generation**
   - **OpenAI Node (GPT-4):**
     ```
     You are Alpine Peak Roofing's helpful AI assistant. 
     
     Conversation History: {{$json.conversation_history}}
     Current Message: {{$json.message}}
     Classification: {{$json.classification}}
     
     Respond professionally and helpfully. If this is a potential lead:
     - Ask qualifying questions about their roofing needs
     - Collect contact information progressively
     - Suggest scheduling a free inspection
     
     Keep responses under 100 words. Be conversational but professional.
     ```

5. **Lead Scoring Calculation**
   - **Function Node:** Implement scoring algorithm
     ```javascript
     const message = items[0].json.message;
     const classification = items[0].json.classification;
     const context = items[0].json.context;
     
     let score = 0;
     
     // Urgency scoring
     if (classification.urgency_level >= 4) score += 25;
     else if (classification.urgency_level >= 3) score += 15;
     else if (classification.urgency_level >= 2) score += 5;
     
     // Project type scoring
     if (classification.project_type === 'replacement') score += 20;
     else if (classification.project_type === 'commercial') score += 25;
     else if (classification.project_type === 'repair') score += 10;
     
     // Contact info completeness
     if (context.email) score += 15;
     if (context.phone) score += 15;
     if (context.address) score += 10;
     
     // Keywords indicating buying intent
     const buyingKeywords = ['cost', 'price', 'quote', 'estimate', 'schedule', 'when can you'];
     const messageText = message.toLowerCase();
     const keywordMatches = buyingKeywords.filter(keyword => messageText.includes(keyword));
     score += keywordMatches.length * 5;
     
     return [{
       json: {
         lead_score: Math.min(score, 100),
         scoring_factors: {
           urgency: classification.urgency_level,
           project_type: classification.project_type,
           contact_completeness: (context.email ? 1 : 0) + (context.phone ? 1 : 0),
           buying_intent: keywordMatches.length
         }
       }
     }];
     ```

6. **Conversation Storage**
   - **Supabase Node:** Update `chat_conversations` table
     ```sql
     UPDATE chat_conversations 
     SET 
       messages = $1,
       context = $2,
       updated_at = NOW()
     WHERE session_id = $3
     ```

7. **Response Delivery**
   - **HTTP Response Node:** Send response back to frontend
     ```json
     {
       "response": "AI generated message",
       "lead_score": 75,
       "next_questions": ["Would you like to schedule a free inspection?"],
       "requires_human": false
     }
     ```

### Conditional Branches:

#### Branch A: High Priority Lead (Score > 70)
- **Trigger CRM Workflow:** Call lead creation workflow
- **Send Alert:** Notify sales team via Slack/email
- **Offer Scheduling:** Present calendar booking option

#### Branch B: Emergency Detected
- **Immediate Escalation:** Route to emergency workflow
- **Collect Contact Info:** Prioritize phone number collection
- **Send Urgent Alert:** Page on-call technician

#### Branch C: Information Request
- **Knowledge Base Search:** Query FAQ database
- **Provide Resources:** Share relevant guides/documents
- **Gentle Lead Nurturing:** Suggest inspection after information sharing

---

## 🔄 Workflow #2: Lead Creation & CRM Sync

### Workflow Name: `chatbot-lead-processor`

### Trigger:
- **Webhook:** Called from main chatbot workflow
- **Condition:** Lead score > 50 OR explicit quote request

### Nodes:
1. **Lead Data Preparation**
   - Extract contact details from conversation context
   - Calculate final lead score
   - Determine lead priority level

2. **Supabase Lead Creation**
   - Insert into `leads` table with conversation data
   - Link to chat conversation record

3. **CRM Integration**
   - **HTTP Request Node:** Push to HubSpot/Salesforce API
   - Map conversation data to CRM fields
   - Create deal record for high-value leads

4. **Team Notifications**
   - **Email Node:** Send lead alert to sales team
   - **Slack Node:** Post to #sales-leads channel
   - **SMS Node:** Alert for urgent/high-score leads

---

## 🔄 Workflow #3: Emergency Response Handler

### Workflow Name: `chatbot-emergency-response`

### Trigger Keywords:
`"leak", "emergency", "urgent", "flooding", "storm damage", "roof collapsed"`

### Nodes:
1. **Emergency Classification**
   - Severity assessment based on keywords
   - Time-sensitivity evaluation

2. **Contact Collection**
   - Priority: phone number for immediate callback
   - Location for dispatch if needed

3. **Immediate Response**
   - Acknowledge emergency
   - Provide safety instructions if applicable
   - Promise immediate human contact

4. **Human Escalation**
   - Page on-call technician
   - Create emergency ticket in system
   - Schedule immediate callback (< 5 minutes)

---

## 🔄 Workflow #4: Appointment Scheduler

### Workflow Name: `chatbot-appointment-scheduler`

### Integration Requirements:
- Google Calendar API or Calendly integration
- Available time slot checking
- Automatic confirmation emails

### Nodes:
1. **Availability Check**
   - Query calendar for open slots
   - Consider technician availability
   - Account for travel time between jobs

2. **Appointment Creation**
   - Book time slot
   - Send calendar invites
   - Create job record in system

3. **Confirmation & Reminders**
   - Email confirmation with details
   - SMS reminder 24 hours before
   - Follow-up sequence workflow

---

## 📋 Implementation Checklist

### Phase 1: Core Workflow Setup
- [ ] Create `chatbot-message-processor` workflow using n8n MCP
- [ ] Set up webhook endpoints and test connectivity
- [ ] Configure OpenAI nodes with proper prompts
- [ ] Implement lead scoring function node
- [ ] Set up Supabase integration nodes

### Phase 2: Advanced Workflows
- [ ] Build `chatbot-lead-processor` workflow
- [ ] Create `chatbot-emergency-response` workflow  
- [ ] Implement `chatbot-appointment-scheduler` workflow
- [ ] Configure all conditional routing logic

### Phase 3: Integrations
- [ ] Connect to CRM APIs (HubSpot/Salesforce)
- [ ] Set up email notification system
- [ ] Configure Slack integration
- [ ] Test SMS alerting (Twilio)

### Phase 4: Testing & Validation
- [ ] Test all workflow paths with sample data
- [ ] Validate lead scoring accuracy
- [ ] Verify emergency escalation works
- [ ] Test appointment scheduling flow

## 🚨 Critical Notes

### Error Handling
- **Implement try-catch blocks** in all function nodes
- **Set up fallback responses** for API failures
- **Log all errors** to monitoring system
- **Graceful degradation** when services are down

### Performance Optimization
- **Cache frequently accessed data** (FAQs, pricing info)
- **Implement workflow timeouts** (30 seconds max)
- **Monitor API rate limits** for OpenAI and other services
- **Queue management** for high-volume periods

### Security
- **Validate all incoming data** at webhook entry points
- **Sanitize user inputs** before processing
- **Use environment variables** for all API keys
- **Implement rate limiting** to prevent abuse

---

**Next Steps:** 
1. Use n8n MCP server to create the first workflow
2. Document any issues or blockers in `05-handoff-notes.md`
3. Test thoroughly before moving to frontend integration