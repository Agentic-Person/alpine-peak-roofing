# N8n MCP Server Configuration Guide

## Overview

This guide explains how to configure the N8n MCP (Model Context Protocol) server to directly access your N8n cloud instance through Claude Code. This will enable you to use tools like `n8n_get_workflow`, `n8n_update_workflow`, etc. directly without creating custom scripts.

## Current Status

**Currently Available**: Local workflow validation and node documentation tools
- ✅ `mcp__n8n-mcp__validate_workflow`
- ✅ `mcp__n8n-mcp__search_nodes`
- ✅ `mcp__n8n-mcp__get_node_info`

**Missing**: Cloud API management tools
- ❌ `n8n_get_workflow`
- ❌ `n8n_update_workflow`
- ❌ `n8n_create_workflow`

## Why MCP Tools Aren't Working for Cloud Access

The N8n MCP tools require specific environment variables to enable cloud API access:

```bash
# Required for cloud API tools
N8N_API_URL=https://agenticpersonnel.app.n8n.cloud/api/v1
N8N_API_KEY=your-api-key-here
```

These variables need to be configured in the MCP server environment, not just your project `.env.local`.

## Configuration Options

### Option 1: Update MCP Server Environment (Recommended)

1. **Locate MCP Server Configuration**
   Your MCP server is located at: `C:\\Users\\jimmy\\n8n-mcp\\dist\\mcp\\index.js`

2. **Update Environment Variables**
   Add these to your system environment or MCP server configuration:
   ```bash
   N8N_API_URL=https://agenticpersonnel.app.n8n.cloud/api/v1
   N8N_API_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkZDY5Nzg4ZC03YTAzLTQxNjEtYmJiMS03Njk3ODA3YTE4YjMiLCJpc3MiOiJuOG4iLCJhdWQiOiJwdWJsaWMtYXBpIiwiaWF0IjoxNzU3NjQyMDY0LCJleHAiOjE3NjUzNDY0MDB9.fXhjHjlzKat8KkU46hn3EG5c5VIAVNxfdBYdf88ibgc
   ```

3. **Update MCP Configuration**
   Modify `.private/n8n.mcp.json`:
   ```json
   {
     "mcpServers": {
       "n8n-mcp": {
         "command": "node",
         "args": ["C:\\\\Users\\\\jimmy\\\\n8n-mcp\\\\dist\\\\mcp\\\\index.js"],
         "env": {
           "NODE_ENV": "production",
           "LOG_LEVEL": "error",
           "MCP_MODE": "stdio",
           "DISABLE_CONSOLE_OUTPUT": "true",
           "N8N_API_URL": "https://agenticpersonnel.app.n8n.cloud/api/v1",
           "N8N_API_KEY": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkZDY5Nzg4ZC03YTAzLTQxNjEtYmJiMS03Njk3ODA3YTE4YjMiLCJpc3MiOiJuOG4iLCJhdWQiOiJwdWJsaWMtYXBpIiwiaWF0IjoxNzU3NjQyMDY0LCJleHAiOjE3NjUzNDY0MDB9.fXhjHjlzKat8KkU46hn3EG5c5VIAVNxfdBYdf88ibgc"
         }
       }
     }
   }
   ```

### Option 2: Use Direct API Calls (Current Solution)

Continue using the `lib/n8n-api.js` module for programmatic access:

```javascript
const N8nApi = require('./lib/n8n-api');
const api = new N8nApi();

// Get and update workflow
const workflow = await api.getWorkflow('tBNDwZL1zCEIq9ZK');
api.fixGmailEmailFormatting(workflow);
await api.updateWorkflow(workflow.id, workflow);
```

## Expected Tools After Configuration

Once properly configured, these tools should become available:

### Workflow Management
- `n8n_get_workflow(workflowId)` - Get workflow by ID
- `n8n_update_workflow(workflowId, data)` - Update workflow
- `n8n_create_workflow(data)` - Create new workflow
- `n8n_delete_workflow(workflowId)` - Delete workflow
- `n8n_list_workflows()` - List all workflows

### Execution Management
- `n8n_execute_workflow(workflowId, data)` - Execute workflow
- `n8n_get_executions(workflowId)` - Get execution history
- `n8n_get_execution(executionId)` - Get execution details

### Workflow Operations
- `n8n_activate_workflow(workflowId)` - Activate workflow
- `n8n_deactivate_workflow(workflowId)` - Deactivate workflow
- `n8n_validate_workflow(workflowId)` - Validate from cloud

## Testing Configuration

After updating the MCP configuration:

1. **Restart Claude Code** to reload MCP server
2. **Test cloud connectivity**:
   ```
   n8n_health_check()
   ```
3. **List available tools**:
   ```
   n8n_list_available_tools()
   ```
4. **Test workflow access**:
   ```
   n8n_get_workflow('tBNDwZL1zCEIq9ZK')
   ```

## Troubleshooting

### "No such tool available: n8n_get_workflow"
- MCP server doesn't have cloud API tools configured
- Missing N8N_API_URL or N8N_API_KEY environment variables
- Need to restart Claude Code after configuration changes

### "HTTP 401: X-N8N-API-KEY header required"
- API key is incorrect or expired
- Check that the key in MCP config matches your cloud instance

### "Connection refused"
- N8N_API_URL is incorrect
- Network connectivity issues
- Check firewall/proxy settings

## Alternative: Local MCP Server

You could also run a local MCP server with cloud access:

1. **Create local MCP server** (`scripts/n8n-mcp-local.js`):
   ```javascript
   // Custom MCP server with cloud access
   const { N8nApi } = require('../lib/n8n-api');
   // Implement MCP protocol with cloud API
   ```

2. **Update Claude Code configuration** to use local server
3. **Implement missing tools** as needed

## Security Considerations

- **Never commit API keys** to version control
- **Use environment variables** for sensitive configuration
- **Rotate API keys** regularly
- **Monitor API usage** in N8n dashboard
- **Restrict MCP server access** to necessary tools only

## Benefits of Proper MCP Configuration

Once configured, you'll be able to:
- ✅ **Direct workflow access** without custom scripts
- ✅ **Real-time validation** against your cloud instance
- ✅ **Seamless workflow updates** through Claude Code
- ✅ **Execution monitoring** and debugging
- ✅ **Automated workflow management** workflows

## Current Workaround

Until MCP is fully configured, use:
- **`lib/n8n-api.js`** for programmatic access
- **Direct API calls** for one-off operations
- **Local validation tools** for workflow checking
- **Manual cloud access** for complex operations