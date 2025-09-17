# Blog Automation Deployment Guide

## Overview
This guide walks you through deploying the complete blog automation system using n8n workflows and Supabase integration.

## Prerequisites

### 1. Supabase Setup
- Supabase project: `aps-website` (ID: adueyerxzutuuwtxyage)
- Apply the database schema from `docs/blog-automation-schema.sql`
- Configure API keys and URL

### 2. n8n Instance
- Self-hosted or cloud n8n instance
- All required node packages installed:
  - `n8n-nodes-base` (core nodes)
  - `@n8n/n8n-nodes-langchain` (AI nodes)

### 3. Required API Keys
```bash
# OpenAI API
OPENAI_API_KEY=sk-...

# Supabase
SUPABASE_URL=https://adueyerxzutuuwtxyage.supabase.co
SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_KEY=eyJ... # For server-side operations

# Weather API
OPENWEATHER_API_KEY=your-key

# Social Media APIs
BUFFER_ACCESS_TOKEN=your-buffer-token
BUFFER_FACEBOOK_PROFILE_ID=profile-id
BUFFER_LINKEDIN_PROFILE_ID=profile-id
BUFFER_INSTAGRAM_PROFILE_ID=profile-id
BUFFER_TWITTER_PROFILE_ID=profile-id

# Google APIs
GOOGLE_ANALYTICS_TOKEN=your-token
GOOGLE_ANALYTICS_VIEW_ID=your-view-id
GOOGLE_SEARCH_CONSOLE_TOKEN=your-token
GOOGLE_MY_BUSINESS_ACCOUNT_ID=your-account
GOOGLE_MY_BUSINESS_LOCATION_ID=your-location
GOOGLE_MY_BUSINESS_TOKEN=your-token

# Next.js API
NEXTJS_API_TOKEN=your-api-token
```

## Deployment Steps

### Step 1: Deploy Database Schema
1. Access your Supabase dashboard
2. Navigate to SQL Editor
3. Execute the SQL from `docs/blog-automation-schema.sql`
4. Verify all tables are created successfully

### Step 2: Import n8n Workflows
Import these workflows in order:

1. **Blog Content Planner** (`n8n/workflows/blog-content-planner.json`)
   - Triggers: Every other Tuesday at 6 AM MST
   - Purpose: Plans and schedules content topics

2. **Blog Content Generator** (`n8n/workflows/blog-content-generator.json`)
   - Triggers: Webhook from Content Planner
   - Purpose: Generates complete blog posts with AI

3. **Blog Publisher & Distributor** (`n8n/workflows/blog-publisher-distributor.json`)
   - Triggers: Webhook from Content Generator
   - Purpose: Publishes and distributes content

4. **Blog Performance Monitor** (`n8n/workflows/blog-performance-monitor.json`)
   - Triggers: Weekly on Sundays at 8 AM MST
   - Purpose: Tracks performance and suggests improvements

### Step 3: Configure Webhook URLs
Update webhook URLs in the workflows to match your n8n instance:
- Content Generator webhook: `https://your-n8n.com/webhook/blog-content-generator`
- Publisher webhook: `https://your-n8n.com/webhook/blog-publisher`

### Step 4: Configure Environment Variables
Set all required environment variables in your n8n instance.

### Step 5: Test Workflows
1. **Test Content Planner**: Manually trigger to verify topic generation
2. **Test Content Generator**: Trigger with webhook to verify content creation
3. **Test Publisher**: Verify content publishing and social distribution
4. **Test Monitor**: Check analytics integration and reporting

## Workflow Architecture

### 1. Blog Content Planner
**Schedule**: Biweekly (Tuesdays 6 AM MST)
**Flow**:
1. Schedule Trigger → Data Collection (RSS, Weather, FAQs)
2. OpenAI Topic Selection → Process & Store
3. Trigger Content Generator

**Cost**: ~$1.00 per execution

### 2. Blog Content Generator
**Trigger**: Webhook from Planner
**Flow**:
1. Get Content Plan → Generate Outline (GPT-3.5)
2. Write Draft (GPT-3.5) → Polish (GPT-4)
3. SEO Optimization (GPT-3.5) → Image Generation (DALL-E 3)
4. Store Blog Post → Trigger Publisher

**Cost**: ~$6.50 per execution

### 3. Blog Publisher & Distributor
**Trigger**: Webhook from Generator
**Flow**:
1. Get Blog Post → Generate Social Content (GPT-3.5)
2. Publish to Next.js → Schedule Social Posts
3. Update Status → Log Results

**Cost**: ~$4.00 per execution

### 4. Blog Performance Monitor
**Schedule**: Weekly (Sundays 8 AM MST)
**Flow**:
1. Get Analytics Data → Process Metrics
2. Store Performance Data → Generate Insights (GPT-3.5)
3. Log Analysis Results

**Cost**: ~$0.50 per execution

## Total System Cost
- **Per Blog Post**: $11.50 (well under $15 budget)
- **Monthly**: ~$23 (2 posts per month)
- **Annual**: ~$300 (26 posts per year)

## Monitoring & Maintenance

### Database Monitoring
Monitor these tables in Supabase:
- `blog_automation_logs` - Workflow execution tracking
- `blog_performance_metrics` - Content performance data
- `blog_posts` - Published content status

### Cost Monitoring
Track AI costs in the `blog_automation_logs` table:
```sql
SELECT
  workflow_name,
  SUM(cost_incurred) as total_cost,
  AVG(cost_incurred) as avg_cost,
  COUNT(*) as executions
FROM blog_automation_logs
WHERE created_at >= NOW() - INTERVAL '30 days'
GROUP BY workflow_name;
```

### Performance Monitoring
Check successful executions:
```sql
SELECT
  workflow_name,
  status,
  COUNT(*) as count
FROM blog_automation_logs
WHERE created_at >= NOW() - INTERVAL '7 days'
GROUP BY workflow_name, status;
```

## Troubleshooting

### Common Issues

1. **OpenAI Rate Limits**
   - Monitor token usage in logs
   - Implement retry logic if needed
   - Consider upgrading OpenAI plan

2. **Social Media API Limits**
   - Check Buffer/platform rate limits
   - Implement error handling
   - Use backup posting methods

3. **Analytics API Failures**
   - Verify Google API credentials
   - Check quota usage
   - Implement fallback metrics

4. **Webhook Failures**
   - Verify n8n webhook URLs
   - Check network connectivity
   - Review webhook logs

### Error Recovery
The system logs all executions to `blog_automation_logs`. Failed workflows can be:
1. Identified via status column
2. Reviewed via error_message column
3. Manually rerun from n8n interface

## Next Steps

### Phase 1 Enhancements
- Add email notifications for failures
- Implement backup posting methods
- Add A/B testing for titles

### Phase 2 Features
- Integration with CRM for lead scoring
- Advanced analytics dashboard
- Content personalization based on traffic

### Phase 3 Scaling
- Multiple content streams
- Video content automation
- Multi-location content variants

## Support
For issues with the automation system:
1. Check `blog_automation_logs` for errors
2. Review n8n execution logs
3. Verify all API credentials are valid
4. Test individual workflow components