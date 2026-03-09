# N8n API Setup Documentation

This folder contains complete documentation for managing the Alpine Peak Roofing N8n cloud workflows programmatically.

## 📁 Contents

### Core Documentation
- **[n8n-api-setup.md](./n8n-api-setup.md)** - Complete API setup guide with authentication, endpoints, and examples
- **[n8n-quick-reference.md](./n8n-quick-reference.md)** - Quick reference card with one-liners and common fixes
- **[n8n-mcp-configuration.md](./n8n-mcp-configuration.md)** - MCP server configuration for direct cloud access

### Related Files
- **[../lib/n8n-api.js](../lib/n8n-api.js)** - Reusable API module (created alongside this documentation)

## 🎯 Quick Start for Agents

When an agent needs to fix N8n workflows:

1. **Read the setup guide**: Start with `n8n-api-setup.md` for context
2. **Use the API module**: Import and use `lib/n8n-api.js` for programmatic access
3. **Reference quick guide**: Use `n8n-quick-reference.md` for common operations
4. **Check MCP config**: If MCP tools aren't working, see `n8n-mcp-configuration.md`

## 🔑 Key Information

### Instance Details
- **URL**: https://agenticpersonnel.app.n8n.cloud
- **Main Workflow ID**: `tBNDwZL1zCEIq9ZK`
- **API Key Location**: `.env.local` → `N8N_API_KEY`

### Most Common Fix (Email Formatting)
```javascript
const N8nApi = require('../lib/n8n-api');
const api = new N8nApi();
const workflow = await api.getWorkflow('tBNDwZL1zCEIq9ZK');
api.fixGmailEmailFormatting(workflow);
await api.updateWorkflow(workflow.id, workflow);
```

### Authentication Pattern
```javascript
headers: {
  'X-N8N-API-KEY': process.env.N8N_API_KEY,
  'Content-Type': 'application/json'
}
```

## 🚨 Emergency Reference

### Fix Email Not Sending
```javascript
// Gmail node should have:
emailNode.parameters.emailType = 'html';
emailNode.parameters.message = '={{ $json.email_content }}';
```

### Common API Errors
- `X-N8N-API-KEY header required` → Wrong auth header format
- `request/body/active is read-only` → Remove `active` field from update payload
- `HTTP 404` → Check workflow ID exists

## 📚 Documentation History

Created: 2025-09-17
Purpose: Eliminate manual N8n workflow fixing processes
Context: After successfully fixing email formatting issue in Alpine Peak chatbot workflow

## 🔄 Usage Pattern

1. Agent encounters N8n workflow issue
2. Agent reads this README for orientation
3. Agent follows appropriate documentation
4. Agent uses provided tools/modules to fix issue
5. Agent updates documentation if new patterns emerge

This documentation package ensures consistent, efficient N8n workflow management without requiring manual setup each time.