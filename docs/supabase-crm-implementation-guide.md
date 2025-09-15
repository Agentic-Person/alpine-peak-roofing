# Alpine Peak Roofing: Supabase CRM Implementation Guide

## 🚀 Complete Step-by-Step Implementation Guide

This comprehensive guide covers everything you need to implement the Supabase CRM integration for your Alpine Peak Roofing voice chatbot workflow.

---

## 📋 Overview

### What This Implementation Includes

- **3 Supabase Tables**: `leads`, `conversations`, `email_queue`
- **Voice-Enhanced Lead Scoring**: +15 points for voice interactions
- **Automated Email Queuing**: Follow-up emails with knowledge base content
- **Complete Conversation Logging**: Full audit trail of all interactions
- **Real-time CRM**: Direct PostgreSQL integration with your existing knowledge base

### Benefits Over HubSpot
- ✅ **Unified Infrastructure**: Same database as your knowledge base
- ✅ **Cost Savings**: No per-contact charges
- ✅ **Full Control**: Own your customer data completely
- ✅ **Real-time Access**: Direct SQL queries and real-time subscriptions
- ✅ **Custom Schema**: Tailored exactly to your needs

---

## 🗄️ STEP 1: Supabase Database Setup

### 1.1 Create Database Tables

Log into your Supabase dashboard and go to **SQL Editor**. Run these commands in order:

#### Create the `leads` table:
```sql
-- Create leads table for customer information
CREATE TABLE leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT NOT NULL,
    name TEXT,
    phone TEXT,
    session_id TEXT NOT NULL,
    lead_score INTEGER DEFAULT 10,
    lead_source TEXT NOT NULL CHECK (lead_source IN ('voice_chatbot', 'text_chatbot')),
    intent TEXT CHECK (intent IN ('emergency', 'estimation_request', 'scheduling', 'contact_sharing', 'general')),
    priority TEXT CHECK (priority IN ('urgent', 'high', 'normal')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX idx_leads_email ON leads(email);
CREATE INDEX idx_leads_session_id ON leads(session_id);
CREATE INDEX idx_leads_created_at ON leads(created_at);
CREATE INDEX idx_leads_lead_score ON leads(lead_score);
CREATE INDEX idx_leads_priority ON leads(priority);
```

#### Create the `conversations` table:
```sql
-- Create conversations table for interaction history
CREATE TABLE conversations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    lead_id UUID REFERENCES leads(id) ON DELETE CASCADE,
    session_id TEXT NOT NULL,
    message TEXT NOT NULL,
    response TEXT NOT NULL,
    input_type TEXT NOT NULL CHECK (input_type IN ('voice', 'text')),
    knowledge_used BOOLEAN DEFAULT FALSE,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX idx_conversations_lead_id ON conversations(lead_id);
CREATE INDEX idx_conversations_session_id ON conversations(session_id);
CREATE INDEX idx_conversations_timestamp ON conversations(timestamp);
CREATE INDEX idx_conversations_knowledge_used ON conversations(knowledge_used);
```

#### Create the `email_queue` table:
```sql
-- Create email queue table for automated follow-ups
CREATE TABLE email_queue (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    lead_id UUID REFERENCES leads(id) ON DELETE CASCADE,
    email_type TEXT NOT NULL DEFAULT 'knowledge_followup',
    email_content TEXT NOT NULL,
    knowledge_articles JSONB,
    scheduled_at TIMESTAMP WITH TIME ZONE NOT NULL,
    sent_at TIMESTAMP WITH TIME ZONE,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'sent', 'failed', 'cancelled'))
);

-- Create indexes for performance
CREATE INDEX idx_email_queue_lead_id ON email_queue(lead_id);
CREATE INDEX idx_email_queue_scheduled_at ON email_queue(scheduled_at);
CREATE INDEX idx_email_queue_status ON email_queue(status);
```

### 1.2 Set Up Row Level Security (RLS)

**IMPORTANT**: Enable RLS for security:

```sql
-- Enable RLS on all tables
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_queue ENABLE ROW LEVEL SECURITY;

-- Create policies for service role access
CREATE POLICY "Service role can manage leads" ON leads
    FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role can manage conversations" ON conversations
    FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role can manage email queue" ON email_queue
    FOR ALL USING (auth.role() = 'service_role');
```

### 1.3 Verify Table Creation

Run this query to verify all tables were created successfully:

```sql
-- Verify tables exist
SELECT table_name, table_type
FROM information_schema.tables
WHERE table_schema = 'public'
AND table_name IN ('leads', 'conversations', 'email_queue');
```

You should see all 3 tables listed.

---

## 🔐 STEP 2: Supabase API Configuration

### 2.1 Get Your Supabase Credentials

1. Go to your Supabase project dashboard
2. Click **Settings** → **API**
3. Copy these values:
   - **Project URL**: `https://your-project-id.supabase.co`
   - **Service Role Key**: `eyJ...` (starts with eyJ, this is for server-side operations)

⚠️ **IMPORTANT**: Use the **Service Role Key**, not the anon key, for n8n operations.

### 2.2 Test Database Connection

Verify your connection works by testing with curl:

```bash
# Test connection (replace with your actual values)
curl -X GET 'https://YOUR-PROJECT-ID.supabase.co/rest/v1/leads?select=*' \
  -H "apikey: YOUR-SERVICE-ROLE-KEY" \
  -H "Authorization: Bearer YOUR-SERVICE-ROLE-KEY"
```

Should return: `[]` (empty array, which is correct for a new table)

---

## ⚙️ STEP 3: n8n Configuration

### 3.1 Set Up Supabase Credentials in n8n

1. In your n8n instance, go to **Settings** → **Credentials**
2. Click **Add Credential** → **Supabase**
3. Fill in:
   - **Name**: `Supabase APS`
   - **Host**: `https://YOUR-PROJECT-ID.supabase.co`
   - **Service Role Secret**: `YOUR-SERVICE-ROLE-KEY`
4. Click **Test** to verify connection
5. **Save** the credential
6. **Note the credential ID** - you'll need this in the next step

### 3.2 Import the New Workflow

1. Download the workflow file: `alpine-peak-voice-chatbot-rag-with-supabase-crm.json`
2. In n8n, go to **Workflows** → **Import from File**
3. Select the downloaded JSON file
4. The workflow will be imported but **not yet active**

### 3.3 Update Credential References

**CRITICAL**: You must update the credential IDs in the workflow:

1. Open the imported workflow
2. Click on the **"Supabase Lead Capture"** node
3. In the **Credentials** field, select **"Supabase APS"** (the credential you created)
4. Repeat for these nodes:
   - **"Log Conversation"**
   - **"Queue Follow-up Email"**
5. **Save** the workflow

### 3.4 Verify Existing Credentials

Make sure these existing credentials are still working:
- **OpenAI API**: For Whisper, TTS, and embeddings
- **PostgreSQL**: For your existing knowledge base

---

## 🧪 STEP 4: Testing Your Implementation

### 4.1 Test Text Input

```bash
# Test text chatbot (replace with your actual n8n webhook URL)
curl -X POST 'https://your-n8n-instance.com/webhook/alpine-peak-chatbot-rag' \
  -H 'Content-Type: application/json' \
  -d '{
    "message": "I need a roof estimate for my house, email me at test@example.com",
    "session_id": "test_session_123",
    "page_context": "website",
    "user_data": {"name": "Test User"}
  }'
```

**Expected Result**:
- Should receive a JSON response with chatbot reply
- Check Supabase `leads` table for new record
- Check `conversations` table for logged interaction
- If email was detected and knowledge was used, check `email_queue` table

### 4.2 Verify Data in Supabase

After testing, check your tables:

```sql
-- Check leads table
SELECT * FROM leads ORDER BY created_at DESC LIMIT 5;

-- Check conversations table
SELECT * FROM conversations ORDER BY timestamp DESC LIMIT 5;

-- Check email queue (if email was captured)
SELECT * FROM email_queue ORDER BY scheduled_at DESC LIMIT 5;
```

### 4.3 Test Voice Input (if applicable)

If you have voice functionality set up, test with:

```javascript
// Frontend JavaScript example
const formData = new FormData();
formData.append('audio', audioBlob, 'voice.webm');
formData.append('session_id', 'voice_test_456');
formData.append('page_context', 'website');
formData.append('user_data', JSON.stringify({name: 'Voice Test User'}));

fetch('https://your-n8n-instance.com/webhook/alpine-peak-voice-chat', {
  method: 'POST',
  body: formData
});
```

---

## 📊 STEP 5: Lead Scoring System

### Understanding the Scoring Algorithm

**Base Score**: 10 points for any interaction

**Bonuses**:
- **Voice interaction**: +15 points (higher engagement)
- **Emergency intent**: +50 points (leak, emergency)
- **Estimation request**: +40 points (estimate, quote)
- **Scheduling request**: +35 points (schedule, inspection)
- **Email provided**: +25 points (contact information shared)
- **Long message**: +5 points (>100 characters)

**Maximum possible score**: 100 points

### Priority Levels

- **Urgent**: Emergency situations (leaks, immediate repairs)
- **High**: Estimation requests, scheduling, email sharing
- **Normal**: General inquiries

---

## 📧 STEP 6: Email Queue System

### How It Works

1. **Trigger Condition**: Email captured AND knowledge base was used
2. **Delay**: 5 minutes after lead capture
3. **Content**: Includes relevant knowledge base articles in JSON format
4. **Status Tracking**: pending → sent/failed

### Processing Email Queue (Future Enhancement)

Create a separate n8n workflow to process the email queue:

```sql
-- Query for pending emails
SELECT eq.*, l.email, l.name
FROM email_queue eq
JOIN leads l ON eq.lead_id = l.id
WHERE eq.status = 'pending'
AND eq.scheduled_at <= NOW()
ORDER BY eq.scheduled_at ASC;
```

---

## 🔍 STEP 7: Monitoring and Analytics

### Useful Monitoring Queries

#### Lead Sources Breakdown
```sql
SELECT
    lead_source,
    COUNT(*) as total_leads,
    AVG(lead_score) as avg_score,
    COUNT(CASE WHEN priority = 'urgent' THEN 1 END) as urgent_leads
FROM leads
WHERE created_at > NOW() - INTERVAL '30 days'
GROUP BY lead_source;
```

#### High-Priority Leads
```sql
SELECT
    email,
    name,
    intent,
    lead_score,
    lead_source,
    created_at
FROM leads
WHERE priority = 'urgent' OR lead_score > 80
ORDER BY created_at DESC;
```

#### Conversation Volume
```sql
SELECT
    DATE(timestamp) as date,
    input_type,
    COUNT(*) as conversations,
    COUNT(DISTINCT session_id) as unique_sessions
FROM conversations
WHERE timestamp > NOW() - INTERVAL '7 days'
GROUP BY DATE(timestamp), input_type
ORDER BY date DESC;
```

#### Email Queue Status
```sql
SELECT
    status,
    COUNT(*) as count,
    AVG(EXTRACT(EPOCH FROM (sent_at - scheduled_at))/60) as avg_delay_minutes
FROM email_queue
GROUP BY status;
```

---

## 🚨 STEP 8: Troubleshooting Common Issues

### Issue: n8n Can't Connect to Supabase

**Solution**:
1. Verify your Supabase URL and Service Role Key
2. Check that RLS policies allow service role access
3. Ensure tables exist in the `public` schema

### Issue: Tables Not Found

**Solution**:
1. Run the table creation SQL again
2. Check you're using the correct Supabase project
3. Verify schema name is `public`

### Issue: Workflow Fails on Supabase Nodes

**Solution**:
1. Check n8n execution logs for specific error messages
2. Verify credential configuration in each Supabase node
3. Test table operations directly in Supabase SQL editor

### Issue: No Data in Conversation Table

**Solution**:
1. Check if the `lead_id` foreign key is being set correctly
2. Verify the "Log Conversation" node is properly connected
3. Check for errors in the "Build Context1" node output

---

## 🔄 STEP 9: Going Live

### Pre-Launch Checklist

- [ ] All 3 Supabase tables created with indexes
- [ ] RLS policies configured and tested
- [ ] n8n workflow imported and credentials configured
- [ ] Test data successfully flowing to all tables
- [ ] Lead scoring working correctly (check voice bonus)
- [ ] Email queue entries being created when appropriate
- [ ] Monitoring queries tested and working
- [ ] Backup plan for rollback to HubSpot if needed

### Launch Steps

1. **Activate the workflow** in n8n
2. **Monitor the first few interactions** closely
3. **Check Supabase tables** for data consistency
4. **Test both text and voice inputs** if available
5. **Verify email queue** is working for qualified leads

### Post-Launch Monitoring

**Week 1**: Daily checks of lead data and scoring accuracy
**Week 2**: Weekly monitoring and adjustment of lead scoring if needed
**Month 1**: Set up automated alerts for high-priority leads

---

## 📈 STEP 10: Future Enhancements

### Planned Improvements

1. **Real-time Dashboard**: Use Supabase real-time subscriptions
2. **Email Processing Workflow**: Automated sending of queued emails
3. **Advanced Analytics**: Lead conversion tracking and forecasting
4. **Integration APIs**: Connect with external tools if needed
5. **Mobile App**: Direct access to lead data for field teams

### Schema Additions

Future table additions you might want:

```sql
-- Lead status tracking
CREATE TABLE lead_status_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    lead_id UUID REFERENCES leads(id) ON DELETE CASCADE,
    old_status TEXT,
    new_status TEXT,
    changed_by TEXT,
    changed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Custom lead fields
ALTER TABLE leads ADD COLUMN property_address TEXT;
ALTER TABLE leads ADD COLUMN roof_type TEXT;
ALTER TABLE leads ADD COLUMN estimated_sq_ft INTEGER;
```

---

## 📞 Support and Backup

### Emergency Rollback

If you need to quickly rollback to HubSpot:

1. **Deactivate** the new Supabase workflow
2. **Reactivate** your original HubSpot workflow
3. **Export lead data** from Supabase if needed:

```sql
-- Export leads as CSV-compatible format
SELECT
    email,
    name,
    lead_score,
    intent,
    priority,
    lead_source,
    created_at
FROM leads
WHERE created_at > '2024-01-01'
ORDER BY created_at DESC;
```

### Data Backup

**Weekly backup** of your CRM data:

```bash
# Using Supabase CLI (install first: npm install -g supabase)
supabase db dump --db-url="postgresql://[user]:[password]@[host]:[port]/[database]" > backup_$(date +%Y%m%d).sql
```

---

## 🎯 Success Metrics

### Key Performance Indicators

- **Lead Capture Rate**: % of conversations that capture email addresses
- **Voice Interaction Bonus**: Average lead score difference between voice/text
- **Email Queue Processing**: % of queued emails successfully sent
- **Conversation Logging**: 100% of interactions should be logged
- **Response Time**: CRM operations should not slow down chatbot responses

### Monthly Review Checklist

- [ ] Review lead scoring accuracy and adjust if needed
- [ ] Analyze voice vs text interaction patterns
- [ ] Check email queue performance and delivery rates
- [ ] Monitor database performance and optimize if needed
- [ ] Review conversation logs for insights

---

## 📝 Final Notes

### Important Reminders

1. **Never commit** Supabase credentials to version control
2. **Regularly backup** your CRM data
3. **Monitor costs** (Supabase has generous free tier limits)
4. **Keep documentation updated** as you make changes
5. **Test thoroughly** before making changes to live workflow

### Files Created

- `alpine-peak-voice-chatbot-rag-with-supabase-crm.json` - New workflow file
- `supabase-crm-schema.md` - Database schema documentation
- `supabase-crm-implementation-guide.md` - This implementation guide

### Next Steps After Implementation

1. Set up regular monitoring and analytics
2. Create automated email processing workflow
3. Implement real-time notifications for urgent leads
4. Consider mobile app for field team access
5. Plan integration with existing business tools

---

**🚀 You're now ready to implement your Supabase CRM system! Follow this guide step-by-step, and you'll have a fully functional, voice-enhanced CRM that's perfectly integrated with your Alpine Peak Roofing chatbot system.**