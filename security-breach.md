# 🚨 SECURITY BREACH INCIDENT REPORT
## Alpine Peak Roofing - API Key Exposure

**Date:** September 12, 2025  
**Severity:** CRITICAL  
**Status:** DISCOVERED - IMMEDIATE ACTION REQUIRED  
**Reporter:** Friend testing chatbot functionality  

---

## 📋 INCIDENT SUMMARY

A critical security vulnerability was discovered where sensitive API keys and credentials are exposed in browser network requests, visible through DevTools. This represents a complete compromise of multiple service accounts and requires immediate remediation.

## 🔍 DISCOVERED VULNERABILITIES

### **Exposed Credentials:**
1. **OpenAI API Key**: `sk-proj-SmbxNWWEr-LAm1uGt...` (PRODUCTION KEY)
2. **Supabase Service Role Key**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`
3. **GitHub Personal Access Token**: `github_pat_11BQOIE3I0CTCnlXdPvLuF...`
4. **n8n API Keys**: Multiple workflow access tokens
5. **Supabase Access Token**: `sbp_86f37a9af098760663734873dba7ebe6...`

### **Exposure Vector:**
- **Location**: Browser DevTools → Network tab → Request headers
- **Endpoint**: `https://adueyerxzutuuwtxyage.supabase.co/rest/v1/chat_conversations`
- **Method**: Visible in Authorization headers during API calls
- **Accessibility**: Anyone with browser access can see these credentials

## 🕵️ ROOT CAUSE ANALYSIS

### **Primary Issues:**

1. **Hardcoded Service Role Key** (`/app/api/chat/rag/route.ts:6`):
   ```typescript
   const SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiI...' // DIRECTLY IN SOURCE CODE!
   ```

2. **Improper Environment Variable Usage**:
   - Production keys stored in `.env.local` (should be server-only)
   - Using `NEXT_PUBLIC_` prefix exposes keys to browser
   - No distinction between client-safe and server-only variables

3. **Client-Side API Calls**:
   - Supabase service role key sent to browser
   - Frontend making direct database calls with admin privileges
   - No server-side API route protection

4. **Git Repository Exposure**:
   - Sensitive keys may be in commit history
   - `.env.local` potentially tracked in version control
   - No proper `.gitignore` patterns for secrets

## 📁 AFFECTED FILES

### **Files Containing Hardcoded Secrets:**
- `/app/api/chat/rag/route.ts` - Hardcoded Supabase service role key
- `/.env.local` - All production API keys stored
- `/lib/supabase/client.ts` - Client configuration with exposed keys

### **Files Making Insecure API Calls:**
- `/lib/chatbot/chatService.ts` - Direct Supabase calls from browser
- `/components/chatbot/*` - Frontend components with admin access

## 🔓 SECURITY IMPACT ASSESSMENT

### **Immediate Risks:**
- **OpenAI Account Compromise**: Unlimited API usage, potential $1000s in charges
- **Database Full Access**: Read/write/delete all customer data
- **GitHub Repository Access**: Source code theft, malicious commits
- **n8n Workflow Control**: Automation system takeover
- **Customer Data Breach**: Personal information exposure

### **Potential Attack Scenarios:**
1. **API Key Harvesting**: Automated scraping of exposed credentials
2. **Data Exfiltration**: Download entire customer database
3. **Service Disruption**: Delete or corrupt production data  
4. **Financial Impact**: Exhaust API quotas and incur massive charges
5. **Reputation Damage**: Customer trust loss from data breach

## 📊 DISCOVERY TIMELINE

1. **Unknown Start Date**: Vulnerability introduced during development
2. **September 12, 2025**: Friend discovers exposed keys in DevTools
3. **Immediate**: Security analysis confirms critical breach
4. **Next Actions**: Immediate key revocation and system hardening

## ⚠️ LESSONS LEARNED

### **Development Mistakes:**
1. **No Security Review**: Code deployed without credential audit
2. **Copy-Paste Errors**: Hardcoded keys instead of environment references
3. **Client-Server Confusion**: Admin keys sent to browser environment
4. **Testing Oversight**: No security testing during QA process

### **Process Failures:**
1. **No Secret Scanning**: Git commits not scanned for credentials
2. **Environment Confusion**: Dev/staging/prod key management unclear
3. **Access Controls**: No principle of least privilege applied
4. **Monitoring Gaps**: No alerts for suspicious API usage

## 🛠️ IMMEDIATE REMEDIATION PLAN

### **PHASE 1: STOP THE BLEEDING (DO FIRST)**
1. **Revoke ALL Exposed Keys**:
   - OpenAI: platform.openai.com → API Keys → Revoke
   - Supabase: Dashboard → Settings → API → Regenerate all keys
   - GitHub: Settings → Developer Settings → PAT → Delete
   - n8n: Regenerate API credentials

2. **Block Suspicious Activity**:
   - Monitor OpenAI usage for unauthorized charges
   - Check Supabase logs for data access
   - Review GitHub activity logs

### **PHASE 2: SECURE THE CODE**
1. **Remove Hardcoded Credentials**:
   - Delete hardcoded SERVICE_ROLE_KEY from route files
   - Replace with proper environment variable references
   - Use server-side only environment variables

2. **Fix Client-Side Exposure**:
   - Move all database calls to API routes
   - Use anonymous Supabase key for client
   - Implement Row Level Security (RLS)

3. **Environment Variable Security**:
   - Create `.env.example` with placeholder values
   - Never use `NEXT_PUBLIC_` for sensitive data
   - Separate client-safe from server-only variables

### **PHASE 3: PREVENT RECURRENCE**
1. **Security Scanning**:
   - Implement pre-commit hooks for secret detection
   - Use tools like GitGuardian or TruffleHog
   - Regular credential audits

2. **Architecture Security**:
   - API-first design (no direct DB access from frontend)
   - Proper authentication and authorization
   - Rate limiting and monitoring

3. **Process Improvements**:
   - Security review for all deployments
   - Separate environments for dev/staging/prod
   - Regular security training for developers

## 🔒 SECURITY BEST PRACTICES VIOLATED

1. **Never Hardcode Secrets**: Use environment variables always
2. **Client vs Server**: Keep sensitive operations server-side only
3. **Principle of Least Privilege**: Use minimal permissions for each service
4. **Environment Separation**: Different keys for dev/staging/prod
5. **Secret Rotation**: Regular credential updates
6. **Monitoring**: Track API usage and access patterns
7. **Version Control**: Never commit secrets to git

## 📈 POST-INCIDENT MONITORING

### **Monitoring Requirements:**
- API usage alerts for unusual patterns
- Database access logging and alerts
- GitHub repository activity monitoring
- OpenAI usage and billing alerts
- Failed authentication attempt tracking

### **Success Metrics:**
- Zero hardcoded credentials in codebase
- All API calls through secure server routes
- Environment variables properly segregated
- Pre-commit secret scanning active
- Security review process implemented

## 📝 INCIDENT CLASSIFICATION

**Severity**: CRITICAL (P0)  
**Impact**: HIGH - Multiple production credentials compromised  
**Likelihood**: HIGH - Easily discoverable by anyone  
**Risk Score**: CRITICAL (9.5/10)  

**Recovery Priority**: IMMEDIATE - All hands on deck until resolved

---

## 🎯 ACTION ITEMS

- [ ] **IMMEDIATE**: Revoke all exposed API keys
- [ ] **IMMEDIATE**: Remove hardcoded credentials from code
- [ ] **IMMEDIATE**: Deploy secure version
- [ ] **24H**: Implement proper environment variable handling
- [ ] **48H**: Add pre-commit secret scanning
- [ ] **1W**: Complete security architecture review
- [ ] **1W**: Implement comprehensive monitoring

**Assigned To**: Development Team  
**Due Date**: IMMEDIATE (Critical Path)  
**Review Date**: Weekly until fully resolved  

---

*This incident report serves as a learning document to prevent similar security breaches in the future. All team members should review and understand these security principles.*