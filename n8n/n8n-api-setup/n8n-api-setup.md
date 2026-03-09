# N8n Cloud API Setup Guide

## Overview

This guide explains how to access and manage your N8n cloud workflows programmatically using the N8n REST API. This documentation was created after successfully fixing email formatting issues in the Alpine Peak chatbot workflow.

## Your N8n Instance Details

- **Cloud URL**: `https://agenticpersonnel.app.n8n.cloud`
- **Main Workflow ID**: `tBNDwZL1zCEIq9ZK` (alpine-peak-voice-chatbot-rag)
- **API Base URL**: `https://agenticpersonnel.app.n8n.cloud/api/v1`

## Authentication

N8n uses a custom authentication header format (not standard Bearer token):

```javascript
headers: {
  'X-N8N-API-KEY': 'your-api-key-here',
  'Content-Type': 'application/json',
  'Accept': 'application/json'
}
```

### Your API Key Location

Your API key is stored in `.env.local`:
```bash
N8N_API_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkZDY5Nzg4ZC03YTAzLTQxNjEtYmJiMS03Njk3ODA3YTE4YjMiLCJpc3MiOiJuOG4iLCJhdWQiOiJwdWJsaWMtYXBpIiwiaWF0IjoxNzU3NjQyMDY0LCJleHAiOjE3NjUzNDY0MDB9.fXhjHjlzKat8KkU46hn3EG5c5VIAVNxfdBYdf88ibgc
```

### How to Get a New API Key

1. Log into your N8n cloud instance: https://agenticpersonnel.app.n8n.cloud
2. Go to Settings → Personal → API Keys
3. Click "Create New API Key"
4. Copy the key and update your `.env.local` file

## Common API Operations

### 1. Get Workflow

```bash
GET /api/v1/workflows/{workflow-id}
```

```javascript
const response = await fetch('https://agenticpersonnel.app.n8n.cloud/api/v1/workflows/tBNDwZL1zCEIq9ZK', {
  headers: {
    'X-N8N-API-KEY': process.env.N8N_API_KEY
  }
});
const workflow = await response.json();
```

### 2. Update Workflow

```bash
PUT /api/v1/workflows/{workflow-id}
```

**Important**: Only send these fields in the update payload:
- `name` - Workflow name
- `nodes` - Array of nodes
- `connections` - Node connections object
- `settings` - Workflow settings

**Do NOT include**: `id`, `active`, `createdAt`, `updatedAt`, `versionId`, `meta`

```javascript
const updatePayload = {
  name: workflow.name,
  nodes: workflow.nodes,
  connections: workflow.connections,
  settings: workflow.settings || {}
};

const response = await fetch('https://agenticpersonnel.app.n8n.cloud/api/v1/workflows/tBNDwZL1zCEIq9ZK', {
  method: 'PUT',
  headers: {
    'X-N8N-API-KEY': process.env.N8N_API_KEY,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(updatePayload)
});
```

### 3. List All Workflows

```bash
GET /api/v1/workflows
```

### 4. Activate/Deactivate Workflow

```bash
PATCH /api/v1/workflows/{workflow-id}/activate
PATCH /api/v1/workflows/{workflow-id}/deactivate
```

### 5. Execute Workflow

```bash
POST /api/v1/workflows/{workflow-id}/execute
```

## Common Workflow Fixes

### Fix Email Formatting Issue

The most common issue is Gmail nodes not sending HTML emails properly:

```javascript
// Find the Gmail node
const emailNode = workflow.nodes.find(node =>
  node.name === 'Send Email1' &&
  node.type === 'n8n-nodes-base.gmail'
);

// Fix the parameters
emailNode.parameters.emailType = 'html';
emailNode.parameters.message = '={{ $json.email_content }}';
```

### Fix Webhook Configuration

```javascript
// Find webhook node
const webhookNode = workflow.nodes.find(node =>
  node.type === 'n8n-nodes-base.webhook'
);

// Ensure proper response mode
webhookNode.parameters.responseMode = 'responseNode';
webhookNode.parameters.options = webhookNode.parameters.options || {};
```

## Error Handling

### Common HTTP Status Codes

- **401 Unauthorized**: Wrong API key or missing `X-N8N-API-KEY` header
- **400 Bad Request**: Invalid payload (often read-only fields included)
- **404 Not Found**: Workflow ID doesn't exist
- **429 Rate Limited**: Too many requests

### API Error Response Format

```json
{
  "message": "Error description",
  "code": "ERROR_CODE"
}
```

## Environment Variables Needed

Add these to your `.env.local`:

```bash
# N8n Cloud Configuration
N8N_API_KEY=your-api-key-here
N8N_BASE_URL=https://agenticpersonnel.app.n8n.cloud
N8N_WEBHOOK_URL=https://agenticpersonnel.app.n8n.cloud/webhook/alpine-peak-chatbot-rag

# Workflow IDs (for easy reference)
N8N_MAIN_WORKFLOW_ID=tBNDwZL1zCEIq9ZK
```

## Rate Limits

N8n cloud has rate limits:
- **API calls**: 300 requests per minute
- **Workflow executions**: Based on your plan

## Security Best Practices

1. **Never commit API keys** to version control
2. **Use environment variables** for all sensitive data
3. **Rotate API keys** regularly (every 90 days)
4. **Monitor API usage** in the N8n dashboard
5. **Use HTTPS only** for all API calls

## Troubleshooting

### "X-N8N-API-KEY header required"
- You're using `Authorization: Bearer` instead of `X-N8N-API-KEY`
- The header name is case-sensitive

### "request/body must NOT have additional properties"
- You're including read-only fields in the update payload
- Only send: `name`, `nodes`, `connections`, `settings`

### "request/body/active is read-only"
- Remove the `active` field from your update payload
- Use the activate/deactivate endpoints instead

### Workflow not executing
- Check if the workflow is active
- Verify webhook URLs are correct
- Check for node configuration errors

## Next Steps

1. Use the reusable API module in `lib/n8n-api.js` for consistent API access
2. Set up proper MCP server configuration for direct tool access
3. Create automated backup scripts for your workflows
4. Implement monitoring for workflow execution failures

## Related Files

- `lib/n8n-api.js` - Reusable API module
- `n8n/mcp-server-config.json` - MCP server configuration
- `.env.local` - Environment variables
- `docs/n8n-quick-reference.md` - Quick reference card