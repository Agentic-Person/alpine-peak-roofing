# N8n Quick Reference Card

## 🚀 Your N8n Instance

- **URL**: https://agenticpersonnel.app.n8n.cloud
- **Main Workflow**: [alpine-peak-voice-chatbot-rag](https://agenticpersonnel.app.n8n.cloud/workflow/tBNDwZL1zCEIq9ZK)
- **Workflow ID**: `tBNDwZL1zCEIq9ZK`
- **API Base**: `https://agenticpersonnel.app.n8n.cloud/api/v1`

## 🔑 Quick Setup

```bash
# Environment Variables (.env.local)
N8N_API_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
N8N_BASE_URL=https://agenticpersonnel.app.n8n.cloud
N8N_MAIN_WORKFLOW_ID=tBNDwZL1zCEIq9ZK
```

```javascript
// Quick API Access
const N8nApi = require('./lib/n8n-api');
const api = new N8nApi();
```

## 🔧 Common Fixes

### Fix Gmail Email Formatting
```javascript
const workflow = await api.getWorkflow('tBNDwZL1zCEIq9ZK');
api.fixGmailEmailFormatting(workflow); // Auto-fixes common issues
await api.updateWorkflow(workflow.id, workflow);
```

### Manual Gmail Fix
```javascript
emailNode.parameters.emailType = 'html';
emailNode.parameters.message = '={{ $json.email_content }}';
```

### Fix Webhook Response
```javascript
webhookNode.parameters.responseMode = 'responseNode';
webhookNode.parameters.options = webhookNode.parameters.options || {};
```

## 📡 API Calls

| Operation | Method | Endpoint | Usage |
|-----------|--------|----------|--------|
| Get Workflow | `GET` | `/workflows/{id}` | `api.getWorkflow(id)` |
| Update Workflow | `PUT` | `/workflows/{id}` | `api.updateWorkflow(id, data)` |
| List Workflows | `GET` | `/workflows` | `api.listWorkflows()` |
| Activate | `PATCH` | `/workflows/{id}/activate` | `api.activateWorkflow(id)` |
| Execute | `POST` | `/workflows/{id}/execute` | `api.executeWorkflow(id, data)` |

## 🔍 Authentication

```javascript
// Headers for direct API calls
headers: {
  'X-N8N-API-KEY': 'your-api-key',
  'Content-Type': 'application/json'
}
```

## ⚠️ Common Errors

| Error | Cause | Fix |
|-------|-------|-----|
| `X-N8N-API-KEY header required` | Wrong auth header | Use `X-N8N-API-KEY` not `Authorization` |
| `request/body/active is read-only` | Including read-only fields | Only send: `name`, `nodes`, `connections`, `settings` |
| `HTTP 404` | Wrong workflow ID | Check workflow exists and ID is correct |

## 🎯 One-Liner Fixes

```bash
# Fix email formatting (using Node.js)
node -e "const api=require('./lib/n8n-api');(async()=>{const a=new api(),w=await a.getWorkflow('tBNDwZL1zCEIq9ZK');a.fixGmailEmailFormatting(w);await a.updateWorkflow(w.id,w)})()"

# Get workflow status
curl -H "X-N8N-API-KEY: $N8N_API_KEY" https://agenticpersonnel.app.n8n.cloud/api/v1/workflows/tBNDwZL1zCEIq9ZK

# Activate workflow
curl -X PATCH -H "X-N8N-API-KEY: $N8N_API_KEY" https://agenticpersonnel.app.n8n.cloud/api/v1/workflows/tBNDwZL1zCEIq9ZK/activate
```

## 🛠️ Workflow Nodes to Know

| Node Type | Purpose | Common Issues |
|-----------|---------|---------------|
| `n8n-nodes-base.webhook` | Receive HTTP requests | Missing `responseMode: "responseNode"` |
| `n8n-nodes-base.gmail` | Send emails | `emailType: "html"`, `message: "={{ $json.email_content }}"` |
| `n8n-nodes-base.code` | Custom JavaScript | Syntax errors, missing return statements |
| `@n8n/n8n-nodes-langchain.openAi` | OpenAI operations | API key configuration, model selection |
| `n8n-nodes-base.supabase` | Database operations | Connection string, table permissions |

## 📞 Webhook URLs

```bash
# Main chatbot webhook
N8N_WEBHOOK_CHATBOT=https://agenticpersonnel.app.n8n.cloud/webhook/alpine-peak-chatbot-rag

# Test webhook
curl -X POST $N8N_WEBHOOK_CHATBOT \
  -H "Content-Type: application/json" \
  -d '{"message":"test message","session_id":"test123"}'
```

## 🎨 Email Template Fix

```html
<!-- Gmail node HTML email template -->
<div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
  <h1 style="color: #2c5aa0;">🏔️ Alpine Peak Roofing</h1>
  <div style="background: #f8fafc; padding: 20px; border-radius: 8px;">
    {{ $('Build Response Metadata1').first()?.json?.response?.message }}
  </div>
  <p>📞 <strong>Emergency:</strong> (970) 446-8995</p>
  <p>📅 <a href="https://calendly.com/jimmy-agenticpersonnel/30min">Schedule Inspection</a></p>
</div>
```

## 🔄 Update Payload Template

```javascript
// Safe workflow update payload
const updatePayload = {
  name: workflow.name,
  nodes: workflow.nodes,
  connections: workflow.connections,
  settings: workflow.settings || {}
};
// DO NOT include: id, active, createdAt, updatedAt, versionId, meta
```

## 🚨 Emergency Procedures

### Workflow Not Responding
1. Check if workflow is active: `api.getWorkflow(id)`
2. Check recent executions: `api.getExecutions(id)`
3. Verify webhook URL in browser
4. Test with simple payload

### Email Not Sending
1. Check Gmail node configuration
2. Verify `emailType: "html"`
3. Check `message` parameter points to content
4. Test Gmail credentials in N8n

### Connection Issues
1. Verify API key is current (expires 2025-05-19)
2. Check network connectivity
3. Confirm N8n cloud instance is running
4. Test with direct curl command

## 📁 Related Files

- `docs/n8n-api-setup.md` - Complete setup guide
- `lib/n8n-api.js` - Reusable API module
- `docs/n8n-mcp-configuration.md` - MCP server setup
- `.env.local` - Environment variables
- `n8n/workflows/` - Local workflow backups

## 🔗 Useful Links

- [N8n Documentation](https://docs.n8n.io/)
- [N8n API Reference](https://docs.n8n.io/api/)
- [Your N8n Instance](https://agenticpersonnel.app.n8n.cloud)
- [Main Workflow](https://agenticpersonnel.app.n8n.cloud/workflow/tBNDwZL1zCEIq9ZK)