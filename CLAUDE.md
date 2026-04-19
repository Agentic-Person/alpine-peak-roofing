# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## WARNING: Build Integrity

**Never re-enable `ignoreBuildErrors` or `ignoreDuringBuilds` in `next.config.ts`.** All TypeScript and ESLint errors must be fixed at the source — not silenced. If a build breaks, fix the underlying issue.

## Git Commit Convention

All commits in this repo use this Co-Authored-By trailer (not the default Claude attribution):

```
Co-Authored-By: Jimmy Davidson, Solutions Developer, Agentic Personnel LLC <jimmy@agenticpersonnel.com>
```

This overrides any default Claude Code Co-Authored-By line. Apply it to every commit on this project.

## Project Overview

This is a **live, production Next.js 15 website** for Alpine Peak Roofing — a high-end roofing contractor in the Denver metro area. The site features an AI-powered chat agent (Emily), voice/phone integration, a multi-step roof estimator, a blog with automated content generation, and comprehensive lead capture flows.

**Company Identity:** "Pinnacle of Protection, Peak of Performance"
**Location:** Denver metro area and surrounding regions
**Target Market:** Residential homeowners, commercial property managers, and insurance adjusters

## Actual Technology Stack

### Frontend
- **Framework:** Next.js 15.5 with App Router, React 19, TypeScript
- **Styling:** Tailwind CSS 3 with custom design tokens (navy/gold palette)
- **Components:** Radix UI primitives, Framer Motion for animations
- **State Management:** Zustand
- **Forms:** React Hook Form with Zod validation
- **Notifications:** Sonner (not react-hot-toast — removed)

### Backend (all Next.js route handlers — no Express, no n8n)
- **Database:** Supabase (Postgres + pgvector for RAG)
- **AI Chat:** OpenAI SDK (`gpt-4o-mini`) via `lib/agent.ts` (single source of truth)
- **Agent Persona:** OpenClaw at `http://100.124.20.121:18790/v1` (Tailscale), model `openclaw:emily`; falls back to direct OpenAI
- **Voice/Phone:** ElevenLabs Conversational AI + Twilio routing → `/api/voice/llm` (OpenAI-compatible SSE)
- **Email:** Resend for transactional email
- **Analytics:** Google Analytics 4 via `lib/ga4.ts`

### Infrastructure
- **Hosting:** Vercel
- **No Docker, no Kubernetes, no Redis, no n8n runtime, no HubSpot/Salesforce**

## Project Structure

```
app/                        # Next.js App Router pages & route handlers
├── api/                    # API route handlers
│   ├── agent/chat/        # Primary chat endpoint (JSON)
│   ├── chat/              # Legacy chat endpoint
│   ├── voice/llm/         # ElevenLabs Custom LLM (SSE streaming)
│   ├── voice/route.ts     # Twilio TwiML webhook
│   ├── admin/             # Admin endpoints (protected by ADMIN_SECRET)
│   └── webhooks/          # Webhook handlers
├── blog/[slug]/           # Blog detail (dynamic, SSR)
├── locations/[slug]/      # Location detail (dynamic)
├── materials/[slug]/      # Material detail (dynamic)
├── services/              # Residential + commercial service pages
├── estimator/             # Multi-step roof estimator wizard
└── ...
agents/                    # Self-contained agent component library
├── roof-estimator-agent/  # Estimator wizard (used by /estimator)
└── lead-crm-agent/        # Lead capture components
lib/                       # Shared utilities
├── agent.ts               # Emily persona, RAG search, lead scoring (single source of truth)
├── materials.ts           # Roofing materials data
├── locations.ts           # Service area location data
├── ga4.ts                 # GA4 event tracking
└── ...
components/                # Shared React components
docs/                      # Reference documentation
scripts/                   # Blog generation scripts
```

## Agent Architecture

- **Single source of truth:** `lib/agent.ts` — Emily persona, RAG search, lead scoring
- **Web chat:** `/api/agent/chat` (JSON) + `/api/chat` (legacy endpoint)
- **Voice/phone:** `/api/voice/llm` — OpenAI-compatible SSE streaming for ElevenLabs Custom LLM
- **ChatWidget** calls `/api/agent/chat` via `lib/chatbot/chatService.ts`
- **OpenClaw session persistence:** pass `user: sessionId` in request body — OpenClaw routes repeat visitors to same Emily session

## Knowledge Base (Supabase)
- Table: `knowledge_base` (chunks from docs/, materials, locations, FAQ, services)
- Search: `search_knowledge_base(query_embedding, match_threshold, match_count)`
- Ingest: POST `/api/admin/ingest-knowledge` with `Authorization: Bearer {ADMIN_SECRET}`

## Development Commands

```bash
# Development
npm run dev

# Production build (must pass with zero errors)
npm run build

# Type check only
npx tsc --noEmit

# Lint
npm run lint

# Blog generation
npm run blog:generate
npm run blog:generate:dry    # dry run
npm run blog:generate:no-image
```

## Key Environment Variables

```
OPENAI_API_KEY
OPENAI_AGENT_MODEL          # default: gpt-4o-mini
OPENCLAW_API_KEY            # OpenClaw Bearer token
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
ELEVENLABS_AGENT_ID
ELEVENLABS_API_KEY
TWILIO_ACCOUNT_SID
TWILIO_AUTH_TOKEN
TWILIO_PHONE_NUMBER
RESEND_API_KEY
ADMIN_SECRET                # protects /api/admin/* routes
NEXT_PUBLIC_GA4_ID          # Google Analytics 4 measurement ID
```

## Next.js 15 Dynamic Route Convention

All dynamic route params are `Promise<{...}>` in Next.js 15. Always use:

```ts
// Correct (Next.js 15):
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
}

// Client component (use React.use()):
export default function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
}
```

Same applies to `generateMetadata` and `generateStaticParams`.

## Business Context

### Target Metrics
- **Lead Generation:** 150+ qualified leads monthly
- **Conversion Rate:** 35% visitor-to-lead conversion
- **Customer Satisfaction:** 95%+ satisfaction scores
- **SEO Performance:** Top 3 rankings for target keywords
- **Revenue Impact:** 40% increase in annual revenue

### Industry Challenges Addressed
- Labor shortages (61% of contractors affected)
- Administrative inefficiencies (18-day payment delays)
- Lead qualification and response time issues
- Limited digital presence in roofing industry

## Development Guidelines

### Code Quality Standards
- Follow Next.js 15 App Router conventions (server components by default, `"use client"` only when needed)
- TypeScript strict mode — no `any` without justification
- Tailwind CSS for all styling — no inline style objects except for dynamic font-family overrides
- Mobile-first responsive design
- WCAG 2.1 AA accessibility compliance
- Use `next/image` instead of `<img>` for all content images

### Security Best Practices
- Never commit environment variables or API keys
- All `/api/admin/*` routes must check `ADMIN_SECRET`
- Validate all user inputs with Zod schemas
- Rate limiting on public API endpoints

### Performance Requirements
- Page load times under 3 seconds
- Mobile PageSpeed score of 90+
- Core Web Vitals compliance
- Prefer static generation (`○`) over dynamic (`ƒ`) where possible
- Optimized images with `next/image`

### Known Pre-existing Warnings (not blocking, fix incrementally)
- `react/no-unescaped-entities` — apostrophes/quotes in JSX text across many files
- `@typescript-eslint/no-explicit-any` — legacy `any` types in agents/ and some API routes
- `@typescript-eslint/no-unused-vars` — unused imports in several pages
- `@next/next/no-img-element` — raw `<img>` tags in a few components
- These are demoted to `warn` in `eslint.config.mjs` — do not re-promote to `error` until fully resolved
