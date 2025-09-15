# n8n MCP Server Setup and Troubleshooting Guide

This guide documents the complete setup process for the n8n MCP (Model Context Protocol) server to work with Claude Code.

## Overview

The n8n MCP server provides Claude Code with access to:
- 535+ n8n nodes with comprehensive documentation
- Node configuration validation
- Workflow templates and examples
- AI tool integration capabilities

## Installation and Setup

### 1. Install the n8n MCP Server

**Local Installation Directory:** `C:\Users\jimmy\n8n-mcp`

**Option A: Global Installation (Recommended)**
```bash
npm install -g n8n-mcp
```

**Option B: Local Installation (Current Setup)**
```bash
git clone https://github.com/czlonkowski/n8n-mcp.git C:\Users\jimmy\n8n-mcp
cd C:\Users\jimmy\n8n-mcp
npm install
npm run build
npm run rebuild
```

### 2. Configure Claude Code

Add the following configuration to your Claude Code config file:
`%APPDATA%\.claude-code\config.json`

```json
{
  "mcpServers": {
    "n8n-mcp": {
      "command": "node",
      "args": [
        "C:\\Users\\jimmy\\n8n-mcp\\dist\\mcp\\index.js"
      ],
      "env": {
        "NODE_ENV": "production",
        "LOG_LEVEL": "error",
        "MCP_MODE": "stdio",
        "DISABLE_CONSOLE_OUTPUT": "true"
      }
    }
  }
}
```

**Note:** Adjust the path in `args` to match your actual installation directory.

## Building and Populating the Database

The n8n MCP server requires a populated database to function. If you encounter an empty database (0 nodes), follow these steps:

### 1. Build the Server
```bash
cd C:\Users\jimmy\n8n-mcp
npm run build
```

### 2. Rebuild the Node Database
```bash
npm run rebuild
```

This command will:
- Load all n8n nodes from `n8n-nodes-base` package (437 nodes)
- Load all LangChain AI nodes from `@n8n/n8n-nodes-langchain` package (98 nodes)
- Total: 535 nodes with documentation
- Create the local database file

### 3. Restart Claude Code
After rebuilding the database, you must restart Claude Code completely (not just the MCP server) for it to recognize the populated database.

## Verification

After setup, verify the connection works by testing these commands in Claude Code:

**Essential Verification Commands:**
```bash
# 1. MOST IMPORTANT: Check total node count
get_database_statistics
# Expected: 535 total nodes, NOT 0

# 2. Test search functionality
search_nodes with query "webhook"  
# Expected: Multiple webhook-related nodes returned

# 3. Test category filtering
list_nodes with category "trigger"
# Expected: 100+ trigger nodes listed
```

**Detailed Health Check:**
```bash
# Check specific node counts
list_nodes with limit 200  # Should return 200 nodes
search_nodes with query "slack"  # Should find Slack nodes
get_node_info with nodeType "nodes-base.webhook"  # Should return webhook docs
```

**Red Flags (System is broken):**
- `get_database_statistics` returns `totalNodes: 0` 
- Any search returns empty results
- MCP tools respond but with no data

**Green Flags (System is healthy):**
- `get_database_statistics` shows 535 total nodes immediately
- `search_nodes` returns multiple relevant results
- All MCP commands respond quickly with data
- No need to restart Claude Code repeatedly

## Critical Troubleshooting - The Daily Nightmare Fix

### The "Rebuild Shows 535 Nodes But MCP Shows 0" Problem
**This is the most frustrating issue that happens 3-5 times daily**

**Symptoms:**
- `npm run rebuild` completes successfully showing 535 total nodes
- But `get_database_statistics` in Claude Code still returns 0 total nodes
- MCP server appears connected but all tools return empty responses

**Root Cause:**
The system has TWO database files:
- `data/nodes.db` - The REAL database (12MB+ when populated)
- `nodes.db` - An old empty database in root (20KB, outdated)

Multiple node processes accumulate and get stuck on the old database.

**NUCLEAR OPTION FIX (Most Reliable):**
```bash
# Kill ALL node processes (save work first!)
taskkill /F /IM node.exe

# Completely close and restart Claude Code (not just reload)
# Wait 5 seconds, then reopen Claude Code

# Verify fix
# In Claude Code, test: get_database_statistics should show 535 nodes
```

**SURGICAL FIX (If nuclear option too aggressive):**
```bash
cd C:\Users\jimmy\n8n-mcp

# Check which databases exist
ls -la *.db data/*.db

# If old empty database exists in root, delete it
del nodes.db

# Keep only the populated one in data/nodes.db
# Restart Claude Code completely
```

## Daily Quick Fix Command
**When you see 0 nodes but rebuild worked:**
```bash
# One-liner nuclear fix
taskkill /F /IM node.exe && echo "Now restart Claude Code completely"
```

## Common Issues and Solutions

### Empty Database (0 nodes)
**Symptoms:**
- `get_database_statistics` returns 0 total nodes
- Search queries return no results
- All MCP tools return empty responses

**Solutions:**
1. Run `npm run rebuild` in the n8n-mcp directory
2. **CHECK FOR MULTIPLE DATABASES** - this is often the real issue
3. Kill all node processes: `taskkill /F /IM node.exe`
4. Restart Claude Code completely (not just the window)
5. Verify the config path in `claude_desktop_config.json` is correct

### Installation Errors
**Issue:** Package `@n8n-mcp/server` not found
**Solution:** Use correct package name `n8n-mcp` instead

**Issue:** Node.js version mismatch errors
**Solution:**
```bash
cd C:\Users\jimmy\n8n-mcp
npm rebuild better-sqlite3
```

### Configuration Issues
**Issue:** MCP server not connecting
**Solutions:**
1. Verify config file location: `%APPDATA%\.claude-code\config.json`
2. Check file path in config matches actual installation
3. Ensure proper JSON syntax in config file
4. Restart Claude Code after config changes

## Environment Variables

Optional environment variables for advanced configuration:

- `NODE_ENV`: Set to "production" for production use
- `LOG_LEVEL`: Control logging verbosity (error, warn, info, debug)
- `MCP_MODE`: Communication mode (stdio for Claude Code)
- `DISABLE_CONSOLE_OUTPUT`: Suppress console output when "true"
- `N8N_API_URL`: URL of n8n instance for workflow management (optional)
- `N8N_API_KEY`: API key for n8n instance access (optional)

## Repository Information

- **Repository:** https://github.com/czlonkowski/n8n-mcp
- **Package:** n8n-mcp (not @n8n-mcp/server)
- **Installation Directory:** C:\Users\jimmy\n8n-mcp
- **Database File:** Located in the installation directory

## Maintenance

### Regular Updates
```bash
# Update to latest version
npm update -g n8n-mcp

# Rebuild database after updates
cd C:\Users\jimmy\n8n-mcp
npm run rebuild
```

### Advanced Troubleshooting Commands

**Zombie Process Diagnosis:**
```bash
# Check how many node processes are running (should be just a few)
tasklist | findstr node.exe | wc -l

# If you see 20+ processes, you have zombie processes
tasklist | findstr node.exe
```

**Database Investigation:**
```bash
# Check ALL database locations
ls -la C:\Users\jimmy\n8n-mcp\*.db
ls -la C:\Users\jimmy\n8n-mcp\data\*.db

# Compare database sizes (real one should be 12MB+)
ls -lh C:\Users\jimmy\n8n-mcp\data\nodes.db
ls -lh C:\Users\jimmy\n8n-mcp\nodes.db 2>/dev/null || echo "Root db doesn't exist (good)"

# Check database update times
stat C:\Users\jimmy\n8n-mcp\data\nodes.db
```

**MCP Server Test:**
```bash
# Test server startup (will hang if working - Ctrl+C to stop)
cd C:\Users\jimmy\n8n-mcp
node dist/mcp/index.js

# Verify installation
npm list -g n8n-mcp

# Force rebuild if database issues persist
npm run clean && npm run build && npm run rebuild
```

## Preventive Maintenance

**Daily Housekeeping (Prevents the 3-5x daily issue):**
```bash
# Before starting work, check node process count
tasklist | findstr node.exe | wc -l

# If more than 10 processes, clean up
if [ $(tasklist | findstr node.exe | wc -l) -gt 10 ]; then
  echo "Too many node processes, cleaning up..."
  taskkill /F /IM node.exe
  echo "Restart Claude Code now"
fi
```

**Weekly Deep Clean:**
```bash
cd C:\Users\jimmy\n8n-mcp

# Remove any stale database files
rm -f nodes.db  # Only keep data/nodes.db

# Clean rebuild
npm run clean
npm run build  
npm run rebuild

# Verify
ls -lh data/nodes.db  # Should be 12MB+
```

## Success Indicators

**Healthy System:**
- `tasklist | findstr node.exe | wc -l` shows fewer than 10 processes
- Only one database file: `data/nodes.db` (12MB+)
- MCP `get_database_statistics` shows 535 total nodes immediately
- Node searches return relevant results instantly
- No need to restart Claude Code multiple times daily

**Unhealthy System (Time to Fix):**
- 20+ node processes running
- Both `nodes.db` and `data/nodes.db` exist
- MCP shows 0 nodes despite successful rebuild
- Need to restart Claude Code 3-5 times daily

---

**Last Updated:** 2025-08-29
**Tested With:** n8n-mcp v2.10.4, Node.js v22.17.0, Claude Code