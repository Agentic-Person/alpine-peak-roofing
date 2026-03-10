# Alpine Peak Roofing — Project Status

---

## Last Activity — 2026-03-09 (session 6)

### Session Summary
Restructured the top navigation bar — removed Home, Blog, and Contact tabs, reordered remaining tabs, added `whitespace-nowrap` to the phone CTA. Merged `manus-redesign` directly into `main` and switched to working off `main` going forward.

### Work Done

**Nav restructure (`components/layout/Navigation.tsx`)**
- Removed `Home` tab — logo/company name already links to `/`
- Removed `Blog` and `Contact` tabs — both accessible via footer
- New desktop nav order: **Services → Portfolio → About → Locations → Financing → Our Process → AI Tools ↓ → Analyze My Roof → (970) 456-1176**
- Added `whitespace-nowrap` to phone number `<a>` tag so it never wraps to two lines
- Mobile menu updated to match (Blog and Contact removed, order preserved)

**Branch merge: `manus-redesign` → `main`**
- Pulled remote `main` (was 9 commits ahead locally) then pushed merge commit `d06cc3b`
- All work now on `main` — `manus-redesign` branch preserved but no longer active
- Vercel auto-deploy triggered on `main`

### Commits This Session
- `7bb7587` feat(nav): restructure nav — remove Home/Blog/Contact, reorder tabs, fix phone wrapping
- `008be93` merge: manus-redesign → main — nav restructure
- `d06cc3b` Merge branch 'main' of https://github.com/Agentic-Person/alpine-peak-roofing

### Active Branch Going Forward
- **`main`** — all future work committed directly here

### Current Blockers / Next Steps
- [ ] Confirm Vercel build succeeded on `main`
- [ ] Set env vars in Vercel dashboard if not done: `OPENAI_API_KEY`, `NEXT_PUBLIC_SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- [ ] Wire contact form to `/api/leads/capture` (currently shows toast only)
- [ ] Publish Privacy Policy at `https://agenticpersonnel.com/privacy`
- [ ] Publish Terms & Conditions at `https://agenticpersonnel.com/terms`
- [ ] Submit both URLs to Twilio during 10DLC campaign registration
- [ ] Enable OpenClaw gateway in `openclaw.json`: `gateway.http.endpoints.chatCompletions.enabled: true`
- [ ] Add env vars to VPS `.env.local`: `OPENCLAW_BASE_URL`, `OPENCLAW_API_KEY`, `OPENCLAW_AGENT_MODEL`, `ELEVENLABS_LLM_SECRET`, `ADMIN_SECRET`
- [ ] Run knowledge base ingestion: `POST /api/admin/ingest-knowledge` with `Authorization: Bearer {ADMIN_SECRET}`
- [ ] Configure ElevenLabs dashboard: Agent → Model → Custom LLM → URL + `x-elevenlabs-secret` header
- [ ] Test voice call end-to-end: Twilio → ElevenLabs → `/api/voice/llm` → OpenClaw Emily → RAG → caller
- [ ] Test web chat: confirm `source: "openclaw:emily"` in response JSON
- [ ] Confirm `search_knowledge_base` Postgres function exists in Supabase

---

## Previous Activity — 2026-03-09 (session 5)

### Session Summary
Tagged the original blue APR build for preservation, resolved 4 merge conflicts between `manus-redesign` and `main`, and merged PR #1. The Manus mountain modernism redesign is now live on `main` and auto-deploying to Vercel. Navigation updated to include both "Analyze My Roof" CTA and the correct APR phone number.

### Work Done

**Git tag created: `v1.0-original-blue`**
- Tagged the last commit on `main` before the redesign merge (`c27a3c1`)
- Pushed to GitHub — permanently preserves the original blue APR build
- To restore or branch off: `git checkout v1.0-original-blue` or `git checkout -b new-branch v1.0-original-blue`

**Merge conflict resolution (4 files)**
Main had diverged with 9 new commits. Conflicts resolved keeping Manus design as primary:

- `app/blog/page.tsx` — Kept Manus navy/gold design with framer-motion category filter + static `blogPosts`; removed main's Supabase `EnhancedBlogGrid` variant (different design system — white bg)
- `app/page.tsx` — Kept Manus stats bar section; removed main's alternate services layout that had crept in
- `app/services/page.tsx` — Kept Manus lucide icon set (`Building2, Layers, Droplets, Wind, Sun, Thermometer, Leaf, DollarSign`); kept `images.heroResidential` hero image
- `components/layout/Navigation.tsx` — Merged best of both: kept Manus phone `(970) 456-1176` / `9704561176`; added "Analyze My Roof" CTA button from main (links to `/estimator`) for both desktop and mobile nav

**PR #1 merged**
- PR: `manus-redesign` → `main`
- Merged at: `2026-03-09T19:20:15Z`
- State: `MERGED`
- Vercel auto-deploy triggered on `main`

### Commits This Session
- `f10395c` merge: bring main into manus-redesign, resolve 4 conflicts
- Tag: `v1.0-original-blue` → commit `c27a3c1` (original blue build preserved)

### Current Blockers / Next Steps
- [ ] Confirm Vercel build succeeded — check Vercel dashboard for `main` deploy status
- [ ] Set env vars in Vercel dashboard if not already done: `OPENAI_API_KEY`, `NEXT_PUBLIC_SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- [ ] Wire contact form to `/api/leads/capture` (currently shows toast only)
- [ ] Publish Privacy Policy at `https://agenticpersonnel.com/privacy` (MN / Mille Lacs County)
- [ ] Publish Terms & Conditions at `https://agenticpersonnel.com/terms`
- [ ] Submit both URLs to Twilio during 10DLC campaign registration
- [ ] Enable OpenClaw gateway in `openclaw.json`: `gateway.http.endpoints.chatCompletions.enabled: true`
- [ ] Add env vars to VPS `.env.local`: `OPENCLAW_BASE_URL`, `OPENCLAW_API_KEY`, `OPENCLAW_AGENT_MODEL`, `ELEVENLABS_LLM_SECRET`, `ADMIN_SECRET`
- [ ] Run knowledge base ingestion: `POST /api/admin/ingest-knowledge` with `Authorization: Bearer {ADMIN_SECRET}`
- [ ] Configure ElevenLabs dashboard: Agent → Model → Custom LLM → URL: `https://yoursite.com/api/voice/llm`; Custom headers: `x-elevenlabs-secret: <value>`
- [ ] Test voice call end-to-end: Twilio → ElevenLabs → `/api/voice/llm` → OpenClaw Emily → RAG → caller
- [ ] Test web chat: confirm `source: "openclaw:emily"` in response JSON
- [ ] Confirm `search_knowledge_base` Postgres function exists in Supabase

---

## Previous Activity — 2026-03-09 (session 4)

### Session Summary
Repo and branch confirmed. APR site `/privacy` and `/terms` pages updated with full Twilio 10DLC compliance content (SMS consent, AI disclosure, opt-out, data handling). Separate Twilio compliance docs drafted for Agentic Personnel LLC (agenticpersonnel.com) — state/county left as MN / Mille Lacs County per Dave's direction. Project status updated and changes committed and pushed.

### Work Done

**Repository & Branch Confirmed**
- Repo: `https://github.com/Agentic-Person/alpine-peak-roofing.git`
- Active branch: `manus-redesign` (all work committed here; PR #1 open → `main`)
- Other remote branches: `main`, `backup/pre-manus-main`, `emily-voice-chat-integration`, `feature/blog-automation-and-workflow-optimization`, `feature/blog-page`, `feature/complete-redesign`, `feature/llm-seo-optimization`

**Updated: `app/privacy/page.tsx` — Full Twilio compliance**
- Added Section 4: SMS consent + STOP/HELP opt-out; message frequency + rates disclosure
- Added Section 5: AI-powered communications disclosure (chat + voice agent)
- Added Section 7: Named third-party processors (contractually prohibited from marketing use)
- Added Section 8: Data retention (24 months)
- Added Section 11: Children's privacy (COPPA — under 13)
- Added CCPA disclosure for California residents
- Effective date: 2026-03-08

**Updated: `app/terms/page.tsx` — Full Twilio compliance**
- Added Section 3: SMS consent — explicit opt-in, message types listed, STOP/HELP, frequency + rates, "not a condition of purchase" statement
- Added Section 4: AI-powered services — accuracy disclaimer, logging notice, emergency phone fallback
- Governing law: Colorado / Denver County (Alpine Peak Roofing)
- Effective date: 2026-03-08

**Agentic Personnel LLC — Twilio compliance docs (separate site, text provided for copy/paste)**
- Privacy Policy for `https://agenticpersonnel.com/privacy`
- Terms & Conditions for `https://agenticpersonnel.com/terms`
- Jurisdiction: Minnesota / Mille Lacs County (confirmed by Dave)
- Both documents cover all Twilio 10DLC carrier registration requirements

### Commits This Session
- `18f6166` feat: update APR privacy and terms pages for Twilio 10DLC compliance
- `71199bf` feat: unified Emily agent (lib/agent.ts, voice/llm, agent/chat, admin/ingest-knowledge)
- `6f9c5c7` docs: update project status with session 3 work

### Current Blockers / Next Steps
- [ ] Publish Privacy Policy at `https://agenticpersonnel.com/privacy` (MN / Mille Lacs County already set in Section 12)
- [ ] Publish Terms & Conditions at `https://agenticpersonnel.com/terms`
- [ ] Submit both URLs to Twilio during 10DLC campaign registration
- [ ] Enable OpenClaw gateway in `openclaw.json`: `gateway.http.endpoints.chatCompletions.enabled: true`
- [ ] Add env vars to VPS `.env.local`: `OPENCLAW_BASE_URL`, `OPENCLAW_API_KEY`, `OPENCLAW_AGENT_MODEL`, `ELEVENLABS_LLM_SECRET`, `ADMIN_SECRET`
- [ ] Run knowledge base ingestion: `POST /api/admin/ingest-knowledge` with `Authorization: Bearer {ADMIN_SECRET}`
- [ ] Configure ElevenLabs dashboard: Agent → Model → Custom LLM → URL: `https://yoursite.com/api/voice/llm`; Custom headers: `x-elevenlabs-secret: <value>`
- [ ] Test voice call end-to-end: Twilio → ElevenLabs → `/api/voice/llm` → OpenClaw Emily → RAG → caller
- [ ] Test web chat: confirm `source: "openclaw:emily"` in response JSON
- [ ] Confirm `search_knowledge_base` Postgres function exists in Supabase
- [ ] Review preview URL and approve PR #1 to merge `manus-redesign` → `main`
- [ ] Wire contact form to `/api/leads/capture` (currently shows toast only)

---

## Previous Activity — 2026-03-08 (session 3)

### Session Summary
Twilio compliance documentation drafted for Agentic Personnel LLC. Privacy Policy and Terms & Conditions written to satisfy Twilio's 10DLC carrier registration requirements, covering SMS consent, opt-out procedures, AI disclosure, data handling, and third-party processor disclosure. Project status updated, changes committed and pushed to GitHub.

### Work Done

**Twilio Compliance — Privacy Policy (`https://agenticpersonnel.com/privacy`)**
- Drafted full Privacy Policy for Agentic Personnel LLC (separate site, not APR repo — text provided for copy/paste)
- Section 2: Itemized data collection (name, email, phone, message content, IP, timestamps, request details)
- Section 3: Explicit use cases + "We do not sell, rent, or share your personal information with third parties for marketing purposes"
- Section 4: AI/automated communications disclosure (required for AI agent deployments)
- Section 5: Named third-party processors: Twilio, ElevenLabs, OpenAI/Anthropic, Supabase — each contractually prohibited from marketing use
- Section 7: Data retention (24 months)
- Section 8: Data security
- Section 9: Children's privacy (COPPA)
- Section 10: User rights + CCPA disclosure for California residents
- Effective date included

**Twilio Compliance — Terms & Conditions (`https://agenticpersonnel.com/terms`)**
- Drafted full Terms & Conditions for Agentic Personnel LLC (text provided for copy/paste)
- Section 3: Explicit SMS consent language, message types listed, opt-in/opt-out (STOP/HELP), message frequency, rates disclosure, "not a condition of purchase" statement
- Section 4: AI interaction disclosure — accuracy disclaimer, logging notice
- Section 5: User responsibilities
- Section 6: Third-party providers named
- Section 7–8: Warranty disclaimer + liability limitation
- Section 10: Privacy Policy incorporated by reference
- Section 12: Governing law (two blanks left for user to fill: state + county)
- Both URLs confirmed for 10DLC registration submission

**Twilio compliance checklist confirmed:**
- ✅ What data is collected — detailed in Privacy Policy Section 2
- ✅ How it's used — Privacy Policy Section 3
- ✅ Will not be shared with third parties for marketing — Privacy Policy Section 3 + T&C Section 6
- ✅ SMS consent mechanism — T&C Section 3
- ✅ STOP/HELP opt-out — both documents
- ✅ Message frequency + rates disclosure — both documents
- ✅ AI disclosure — both documents

### Git & Deployment
- All session 2 + session 3 changes committed and pushed to `manus-redesign` branch

### Current Blockers / Next Steps
- [ ] Publish Privacy Policy at `https://agenticpersonnel.com/privacy`
- [ ] Publish Terms & Conditions at `https://agenticpersonnel.com/terms` — fill in state + county in Section 12 before publishing
- [ ] Submit both URLs to Twilio during 10DLC campaign registration
- [ ] Enable OpenClaw gateway in `openclaw.json`: `gateway.http.endpoints.chatCompletions.enabled: true`
- [ ] Add env vars to VPS `.env.local`: `OPENCLAW_BASE_URL`, `OPENCLAW_API_KEY`, `OPENCLAW_AGENT_MODEL`, `ELEVENLABS_LLM_SECRET`, `ADMIN_SECRET`
- [ ] Run knowledge base ingestion: `POST /api/admin/ingest-knowledge` with `Authorization: Bearer {ADMIN_SECRET}`
- [ ] Configure ElevenLabs dashboard: Agent → Model → Custom LLM → URL + `x-elevenlabs-secret` header
- [ ] Test voice call end-to-end: Twilio → ElevenLabs → `/api/voice/llm` → OpenClaw Emily → RAG → caller
- [ ] Test web chat: confirm `source: "openclaw:emily"` in response JSON

---

## Previous Activity — 2026-03-08 (session 2)

### Session Summary
Unified AI agent architecture built from scratch. Emily chat agent wired into OpenClaw (the user's existing agent framework), Supabase RAG connected to both web chat and voice, ElevenLabs Custom LLM endpoint created for phone integration, knowledge base ingestion endpoint built for new website content, security hardened with shared secrets and rate limiting.

### Work Done

**New file: `lib/agent.ts` — Single source of truth for Emily agent**
- `searchKnowledgeBase()` — embeds user query → semantic search of Supabase `knowledge_base` table → returns top 5 context chunks
- `getAgentClient()` — auto-detects OpenClaw via env vars; falls back to direct OpenAI if unreachable
- `buildOpenClawMessages()` — injects RAG context + voice channel hint (no persona — lives in OpenClaw)
- `buildFallbackMessages()` — full Emily persona + RAG for OpenAI fallback path
- `runEmilyAgent()` — complete pipeline: RAG → OpenClaw/OpenAI → lead scoring → quick actions; includes automatic OpenAI fallback if OpenClaw unreachable
- `scoreLead()` — intent detection for emergency / estimate / inspection / insurance / materials

**New file: `lib/rateLimit.ts` — In-memory rate limiter**
- Sliding window rate limit, 20 req/min per IP
- Auto-cleanup of expired windows every 5 min
- `getClientIp()` respects `x-forwarded-for` proxy headers

**New file: `app/api/agent/chat/route.ts` — Unified web chat endpoint**
- Rate limited (20 req/IP/min), message length capped at 2,000 chars
- Normalizes widget conversation history format → agent format
- Returns JSON with response, lead_score, is_hot_lead, next_action, quick_actions, rag_context_used, source

**New file: `app/api/voice/llm/route.ts` — ElevenLabs Custom LLM endpoint**
- Receives OpenAI-compatible messages from ElevenLabs Conversational AI
- Verifies `x-elevenlabs-secret` header (shared secret auth)
- RAG searches Supabase, injects context + voice channel hint to OpenClaw Emily
- Streams response as SSE (`data: <json>\n\n` ... `data: [DONE]`) — OpenAI format, ElevenLabs compatible
- Voice responses capped at 120 tokens; no markdown/bullets injected via channel hint

**New file: `app/api/admin/ingest-knowledge/route.ts` — Knowledge base ingestion**
- Protected by `Authorization: Bearer {ADMIN_SECRET}` header
- Imports `lib/materials.ts` and `lib/locations.ts` directly; FAQ and service content inlined
- Generates embeddings via OpenAI `text-embedding-ada-002`
- Upserts to Supabase `knowledge_base` table (safe to re-run; uses `onConflict: 'id'`)
- Covers: all roofing materials (full specs, pricing, pros/cons, Colorado considerations), all service area locations (challenges, services, seasonal guide), FAQ (17 Q&As across company/altitude/weather/materials/emergency/pricing/sustainability), services (residential, commercial, emergency, insurance, about, process, financing)
- GET endpoint shows current row count for health check

**Modified: `app/api/chat/route.ts`**
- Replaced n8n-first / OpenAI-fallback logic (100+ lines) with simple delegation to `runEmilyAgent()` from `lib/agent.ts`
- n8n dependency fully removed

**Modified: `lib/chatbot/chatService.ts`**
- `callN8nWithTimeout()` updated to call `/api/agent/chat` instead of `/api/chat`
- Passes `channel: 'web'` explicitly

**Modified: `.env.local.example`**
- Added: `OPENCLAW_BASE_URL`, `OPENCLAW_API_KEY`, `OPENCLAW_AGENT_MODEL`
- Added: `ELEVENLABS_LLM_SECRET` (shared secret for voice endpoint auth)
- Added: `OPENAI_AGENT_MODEL`, `ADMIN_SECRET`
- Annotated with setup instructions for ElevenLabs dashboard header config

### OpenClaw Integration Details
- Emily's persona/rules/behavior managed inside OpenClaw — not duplicated in code
- OpenClaw endpoint: `http://100.124.20.121:18790/v1` (Tailscale IP, VPN-only reachable)
- OpenAI-compatible API; model name: `openclaw:emily`
- Session persistence: `user: sessionId` passed in request; OpenClaw routes repeat visitors to same Emily session
- Emily active on: Telegram (existing), website chat (new), phone/voice (new)
- All three channels share one agent, one persona, one place to update

### Security Model
- **OpenClaw ← VPS**: Tailscale VPN only; Bearer token; not publicly reachable
- **ElevenLabs → `/api/voice/llm`**: `x-elevenlabs-secret` header verification; 401 if missing/wrong
- **Public → `/api/agent/chat`**: Rate limited 20 req/IP/min; message length cap 2,000 chars
- **Public → `/api/admin/ingest-knowledge`**: Bearer token (`ADMIN_SECRET`) required
- Secret generation: `openssl rand -hex 32`

### Current Blockers / Next Steps
- [ ] Enable OpenClaw gateway in `openclaw.json`: `gateway.http.endpoints.chatCompletions.enabled: true`
- [ ] Add env vars to VPS `.env.local`: `OPENCLAW_BASE_URL`, `OPENCLAW_API_KEY`, `OPENCLAW_AGENT_MODEL`, `ELEVENLABS_LLM_SECRET`, `ADMIN_SECRET`
- [ ] Run knowledge base ingestion: `POST /api/admin/ingest-knowledge` with `Authorization: Bearer {ADMIN_SECRET}` — adds all new website content to Supabase RAG
- [ ] Configure ElevenLabs dashboard: Agent → Model → Custom LLM → URL: `https://yoursite.com/api/voice/llm`; Custom headers: `x-elevenlabs-secret: <value>`
- [ ] Test voice call end-to-end: Twilio → ElevenLabs → `/api/voice/llm` → OpenClaw Emily → RAG context → response → ElevenLabs TTS → caller
- [ ] Test web chat: confirm widget hits `/api/agent/chat`, confirm `source: "openclaw:emily"` in response
- [ ] Confirm `search_knowledge_base` Postgres function exists in Supabase (from `scripts/vector-db-setup/supabase-setup.sql`)

---

## Previous Activity — 2026-03-08 (session 1)

### Session Summary
Header/footer polish pass + site-wide phone number correction after Manus redesign went live on Vercel preview.

### Work Done

**Header changes (`components/layout/Navigation.tsx`)**
- Removed top utility bar ("Rocky Mountains' Premier Roofing Specialist" tagline strip)
- Increased main nav height from `h-16` (64px) → `h-[74px]` (+10px)
- Replaced "Free Estimate" CTA button with clickable gold phone pill `(970) 456-1176`
- Mobile menu phone link updated to match
- Removed unused `ArrowRight` import

**Footer redesign (`components/layout/Footer.tsx`)**
- Slimmed vertical padding: `py-12` → `pt-8 pb-4`
- All text scaled to `xs`, headings tightened
- Service Areas column converted to 2-column grid (6 cities per column) to reduce height
- Extracted `serviceAreas` array for cleaner JSX

**Phone number — site-wide update**
- Old number `(970) 446-8995` / `9704468995` replaced with `(970) 456-1176` / `9704561176`
- Files updated: `app/contact/page.tsx`, `app/estimator/page.tsx`, `app/locations/page.tsx`, `app/materials/[slug]/page.tsx`, `app/page.tsx`, `app/privacy/page.tsx`, `app/services/page.tsx`, `app/terms/page.tsx`, `app/api/chat/route.ts`

**Build & deployment fixes (earlier same session)**
- `app/api/chatbot/openai/route.ts` — moved `new OpenAI()` inside handler (was throwing at build time)
- `app/api/chat/rag/route.ts` — moved `createClient()` + throw inside lazy `getSupabase()` fn
- `tailwind.config.ts` — added `container: { center: true, padding: '2rem' }` to fix left-aligned layout on Manus pages
- Production build passes cleanly: 53 pages, 0 errors

**Git & deployment**
- Branch: `manus-redesign` → pushed to `origin`
- PR #1 opened: `manus-redesign` → `main`
- Backup branch `backup/pre-manus-main` created and pushed
- Preview URL: `https://alpine-peak-roofing-git-manus-redesign-jimihacks-projects.vercel.app`

### Commits This Session
- `6a13206` feat: header/footer redesign + phone number update
- `65e31ed` fix: center container with padding to match Manus design
- `44fb585` fix: lazy-init OpenAI and Supabase clients to prevent build-time failures

### Current Blockers / Next Steps
- [ ] Review preview URL and approve PR #1 to merge `manus-redesign` → `main`
- [ ] Confirm Vercel env vars are set: `OPENAI_API_KEY`, `NEXT_PUBLIC_SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- [ ] Wire contact form to `/api/leads/capture` (currently shows toast only)
- [ ] Review `app/materials/[slug]/page.tsx` — background agent changed "Back to Materials" links to `/services#materials`; consider reverting to `/materials`

---

## Previous Activity — 2026-03-07 (overnight session)

### Session Summary
Full port of Manus-built design into the existing Next.js 14 App Router repo. All pages converted from Vite/React/wouter SPA to Next.js App Router. Build verified. Branch pushed to GitHub.

### Manus Source
- Downloaded from Manus, stored at: `/c/projects/APR/website/alpine-peak-complete/alpine-peak-roofing-source/`
- Tech: React + Vite + TypeScript + wouter routing + framer-motion + Tailwind v4

### Target Repo
- `https://github.com/Agentic-Person/alpine-peak-roofing.git`
- Local: `/c/projects/APR/website/existing-repo/`
- Branch: `manus-redesign` (created from `main`)

### Files Created / Modified

**Foundation**
- `app/globals.css` — Added Manus CSS utility classes (bg-navy-dark, bg-navy, bg-gold, text-gold, gold-line, diagonal-top, diagonal-bottom, scrim-bottom, scrim-full, etc.) + Source Sans 3 Google Font import
- `app/layout.tsx` — Added `<Toaster richColors position="top-right" />` from sonner
- `package.json` — Added `sonner` dependency (`npm install sonner`)
- `tailwind.config.ts` — (fixed in follow-up session; see above)

**Data files (copied from Manus source)**
- `lib/images.ts` — All CloudFront CDN image URLs
- `lib/materials.ts` — 4 roofing materials with full specs + `getMaterialBySlug()`
- `lib/portfolioProjects.ts` — 12 showcase projects
- `lib/locations.ts` — 12 Colorado mountain town location pages
- `lib/blogPosts.ts` — Static blog posts

**Pages ported**
- `app/page.tsx` — Home (dark navy mountain modernism, hero/stats/services/portfolio/testimonials)
- `app/about/page.tsx` — About
- `app/process/page.tsx` — Process (6-step timeline + Triple Guarantee)
- `app/financing/page.tsx` — Financing (3 plans + payment calculator with useState + FAQ accordion)
- `app/contact/page.tsx` — Contact (form with toast.success + contact info sidebar)
- `app/services/page.tsx` — Services
- `app/portfolio/page.tsx` — Portfolio (filterable grid with lightbox)
- `app/projects/[slug]/page.tsx` — Project detail dynamic route
- `app/locations/page.tsx` — Locations index
- `app/locations/[slug]/page.tsx` — Location detail dynamic route (replaced 6 static location folders)
- `app/materials/page.tsx` — Materials index
- `app/materials/[slug]/page.tsx` — Material detail dynamic route (price calculator with range slider)
- `app/blog/page.tsx` — Blog (category filtering with useState)
- `app/blog/[slug]/page.tsx` — Blog detail

**Layout**
- `components/layout/Navigation.tsx` — Added Locations + Financing to navItems
- `components/layout/Footer.tsx` — Added Financing, Materials to Company column; added 6 more location links

### Conversion Rules Applied (wouter → Next.js)
- `import { Link } from "wouter"` → `import Link from "next/link"`
- Added `"use client"` to all interactive pages
- `useParams()` removed → component props `{ params }: { params: { slug: string } }`
- Removed `useEffect` calls that manipulated `document.title`/meta tags

### Commits (overnight)
- `0bd91a6` feat: port Manus home page design
- `d1fea53` feat: port Manus financing and contact pages
- `360e99b` feat: port Manus about and process pages
- `460a558` feat: port Manus services page
- `2e06538` feat: update footer with financing, materials, and all 12 location links
- `6a151d3` feat: add Sonner Toaster to root layout
- `c6aa5e1` feat: port Manus blog pages and update navigation
- `00d18c1` feat: port Manus locations pages, replace static with dynamic [slug] route
- `01e0003` feat: port Manus portfolio page and project detail dynamic route
- `6864a43` feat: add Manus data files and CSS utilities
- `8dc871e` feat: add materials listing page and dynamic material detail route
- `1f8db47` feat: add material detail dynamic route with price calculator (background agent correction)

### Infrastructure Preserved (untouched)
- `/app/estimator/page.tsx` — AI roof estimator (Google Maps API)
- `/app/api/chatbot/` — AI chatbot endpoints
- `/app/api/leads/` — Lead capture (Supabase)
- `/components/chatbot/ConditionalChatWidget.tsx` — Chat widget
- `supabase/migrations/` — DB schema
