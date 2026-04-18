# Alpine Peak Roofing — Bridge Status
> Last updated: April 17, 2026

## 🟡 Status: In Progress — SEO/AEO Optimization Complete, Lead Pipeline Activation Pending

**Phase:** SEO/AEO optimization landed, estimator UX stable, lead capture pipeline awaiting API keys
**Live:** https://alpinepeakroofing.com (Vercel)
**Repo:** github.com/Agentic-Person/alpine-peak-roofing
**Stack:** Next.js 15.5 App Router, React 19, TypeScript, Tailwind CSS 3, Supabase (Postgres + pgvector), OpenAI, OpenClaw, ElevenLabs, Twilio, Resend

---

## 🚫 Blockers
- **HIGH** — `RESEND_API_KEY` not set — all outbound emails (estimate delivery, welcome, team alerts) are dead. Need Resend account + domain verification for `alpinepeakroofing.com`
- **HIGH** — `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` not set — estimator confirmation step falls back to OpenStreetMap instead of Google satellite view. Need Maps Embed API enabled on Google Cloud project
- **HIGH** — `GOOGLE_SOLAR_API_KEY` not set — roof analysis uses seeded heuristic (fake but stable numbers) instead of real satellite measurements. Need Solar API enabled on Google Cloud project
- **MED** — `TEAM_ALERT_PHONE` not set — SMS hot lead alerts to team phone are disabled
- **MED** — `ELEVENLABS_PHONE_NUMBER_ID` not set — Emily's outbound AI calls to new leads are disabled
- **MED** — `blog_posts` Supabase table not provisioned — build warns, `/blog/[slug]` returns empty shell; blog Article schema ready but no live posts until table exists
- **LOW** — `/contact` `RoofingContractor` schema uses placeholder Denver 80202 address — replace with real business address

## 🔨 Recently Built
- [x] **SEO/AEO optimization pass** (April 17) — converted 5 main pages (`/`, `/about`, `/services*`, `/process`, `/materials*`, `/locations*`, `/portfolio`, `/contact`, `/financing`, `/investment-analysis`) from client to server components. Every page now renders full content in initial HTML with per-page metadata, canonical URLs, and JSON-LD schemas. AEO crawlers (ChatGPT, Perplexity, Claude, Google AI Overviews) can finally see the content.
- [x] **Duplicate `-seo` pages removed** (April 17) — `/about-seo`, `/services-seo`, `/process-seo` deleted after merging unique copy into originals. Eliminates duplicate-content penalty.
- [x] **Sitemap expanded** (April 17) — 17 → 31 static routes + dynamic blog. Materials, portfolio, service detail pages, financing, legal pages all now listed.
- [x] **Schema coverage** (April 17) — LocalBusiness, RoofingContractor, Service, Product, HowTo, Place, BreadcrumbList, ItemList, CollectionPage, FinancialProduct, ContactPage, BlogPosting, FAQPage, Article, AboutPage emitted across the site.
- [x] **Pre-rendering** (April 17) — 12 location pages + 4 material pages now statically generated via `generateStaticParams`.
- [x] **Internal linking matrix** (April 17) — each `/locations/[city]` page cross-links to services + materials (classic local-SEO play).
- [x] **Client island pattern** (April 17) — Framer Motion animations + state extracted into small client components under `components/*/islands/`; parent pages stay server-rendered.
- [x] **Build integrity enforced** (April 17) — `ignoreBuildErrors` + `ignoreDuringBuilds` flipped to `false` in `next.config.ts`. TS and ESLint errors can no longer be silenced. `react-hot-toast` dead dep removed.
- [x] **Lighthouse** (April 17, localhost) — SEO 100, Accessibility 92. (Performance 66 localhost-limited; real Vercel score pending.)
- [x] **Estimator flow restructured** — removed email gate from modal; users now enter address → see their roof on a map → enter email to continue → pick materials → contact info → estimate (April 2)
- [x] Email collection moved to confirmation step (after seeing roof) instead of before any value delivered (April 2)
- [x] Colorado-only address restriction removed — anyone can use the tool (April 2)
- [x] Real map embed (Google Maps satellite / OpenStreetMap fallback) replaces placeholder image (April 2)
- [x] `AddressAutoAnalyzer` component — reads `?address=` URL param, auto-triggers analysis, skips to confirmation (April 2)
- [x] Admin CRM: Contacts page joining leads + estimates by session_id, inline lead status management, CSV export (March)
- [x] Admin dashboards: Leads + Estimates with stats APIs + admin hub (March)
- [x] Full lead capture pipeline: welcome email → team email → SMS alert → Emily CRM notification → AI outbound call (March 11)
- [x] GA4 live analytics widget in footer via custom Web Crypto JWT + REST API (March 11)
- [x] Branded estimate emails with full cost breakdown, timeline, financing options (March)
- [x] `/estimates/[id]` — shareable estimate page with print-to-PDF (March)
- [x] Email-gate modal with 5-step carousel + dark navy design (March 10)
- [x] Manus SEO integration: 12 dynamic service sub-pages, schema markup, GA4 tracking, 15 images (March 9)

## ⏳ Up Next
- [ ] Activate lead pipeline — add `RESEND_API_KEY` + verify domain + add `TEAM_ALERT_PHONE` + `ELEVENLABS_PHONE_NUMBER_ID`
- [ ] Set up `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` for satellite view in estimator
- [ ] Set up `GOOGLE_SOLAR_API_KEY` for real roof measurements
- [ ] Provision `blog_posts` Supabase table so `/blog/[slug]` renders live posts
- [ ] Replace `/contact` schema placeholder address with real business address
- [ ] Run Lighthouse against live Vercel domain for true Performance score
- [ ] Cleanup pass on 297 pre-existing lint warnings (legacy `any` types, unescaped entities)
- [ ] Standalone estimator tool (separate project — reusable across roofing clients)
- [ ] Google Places autocomplete on address input (currently placeholder suggestions)
- [ ] Automated blog system
- [ ] Domain / DNS finalization
- [ ] Final QA + go-live checklist

---

## 📐 Estimator Tool — Deep Dive

### Architecture
The estimator is a fully custom-built, in-house tool — no third-party iframes or services like Roofle/InstantRoofer. Everything runs inside the Next.js app.

**Components:**
```
agents/roof-estimator-agent/
├── components/
│   ├── EstimatorWizard.tsx          — 5-step wizard orchestrator (Zustand state)
│   └── steps/
│       ├── AddressStep.tsx          — address input + validation
│       ├── ConfirmationStep.tsx     — map view + measurements + EMAIL GATE
│       ├── MaterialsStep.tsx        — 5 material options with live pricing
│       ├── ContactStep.tsx          — name, phone (optional), timeline
│       └── ResultsStep.tsx          — estimate generation + PDF + email delivery
├── store/useEstimatorStore.ts       — Zustand store (step, address, measurements, contact, estimate)
└── lib/api.ts                       — API client (analyzeRoof, calculateEstimate, generatePDF, getMaterialPricing)

components/estimator/
├── RoofEstimateModal.tsx            — modal triggered from nav — address entry + carousel
├── AddressAutoAnalyzer.tsx          — reads ?address= URL param, auto-triggers analysis
├── EstimateModalContext.tsx          — React context for modal open/close
└── EstimatorCarousel.tsx            — 5-step "how it works" carousel
```

**API Routes:**
```
/api/webhooks/roof-analysis      — POST address → roof measurements (Google Solar API or seeded heuristic)
/api/webhooks/calculate-estimate — POST measurements + material + contact → itemized estimate
/api/webhooks/generate-pdf       — POST estimate data → HTML email + PDF + Supabase lead upsert
/api/leads/capture               — POST email/source → Supabase lead + welcome email + team alert + SMS + AI call
```

### Current User Flow (as of April 2)
```
1. Click "Get Your Estimate" in nav
2. Modal opens — carousel shows how it works
3. User types their address → clicks "Analyze My Roof"
4. /estimator opens in new tab with ?address= param
5. AddressAutoAnalyzer auto-calls /api/webhooks/roof-analysis
6. ConfirmationStep loads — shows:
   - Google Maps satellite embed (or OpenStreetMap fallback)
   - Roof measurements: area (sq ft), pitch, ridge lines, valleys, complexity
   - Confidence score
7. ★ EMAIL GATE — user must enter email to click "Continue to Estimate"
   - Fires /api/leads/capture (non-blocking)
   - Fires GA4 event: estimate_email_collected
   - Stores email in Zustand → pre-fills ContactStep
8. MaterialsStep — 5 options:
   - 25-Year Architectural Shingles ($1.25/sqft)
   - 30-Year Architectural Shingles ($1.65/sqft) ← popular
   - Lifetime Premium Shingles ($2.25/sqft)
   - Standing Seam Steel ($3.75/sqft)
   - Corrugated Metal Panels ($2.25/sqft)
9. ContactStep — first name, last name, phone (optional), project timeline
10. ResultsStep — calls calculate-estimate + generate-pdf APIs
    - Shows animated 6-step progress
    - Displays total with material/labor/tax breakdown
    - Sends branded estimate email to user
    - Upserts lead in Supabase CRM
```

### Roof Analysis Backend
- **With `GOOGLE_SOLAR_API_KEY`:** Geocodes address → calls Google Solar `buildingInsights:findClosest` → returns real roof area, pitch, azimuth, segments, sunshine data
- **Without key (current):** Uses a deterministic seeded heuristic — same address always returns same plausible numbers (1,600–3,200 sqft, 4/12–9/12 pitch, CO Front Range coordinates)
- **Dev mode:** `api.ts` returns hardcoded mock data with 2-second delay, bypassing the real API entirely

### Known Estimator Issues
1. **No Google Maps API key** — satellite embed falls back to OpenStreetMap (no satellite view)
2. **No Google Solar API key** — all measurements are synthetic heuristic data
3. **Address suggestions are placeholder** — not wired to Google Places API yet, just shows demo suggestions when text contains "co"
4. **Dev mode bypasses real API** — `api.ts` line 57 returns static mock data in development
5. **No real PDF generation** — the "PDF" is an HTML email, no actual downloadable PDF file

### Standalone Estimator (Planned)
Building a separate, reusable estimator tool that can be deployed for any roofing client — not just APR. Will share the same core architecture but be configurable per-client (materials, pricing, branding, service area).

---

## ✅ Done (Shipped)
- 37+ page site (services, locations, about, FAQ, materials, glossary, guides, financing, portfolio, blog, estimator, admin)
- 15 API routes (chat, voice, leads, estimator, analytics, admin, webhooks, sitemap)
- RAG-powered AI chat widget (Emily persona via OpenClaw, Supabase pgvector knowledge base — 569 chunks)
- ElevenLabs voice agent (Emily on phone via Twilio → `/api/voice/llm`)
- Emily on Telegram via OpenClaw
- Blog CMS (Supabase-backed)
- Admin hub with Leads, Estimates, and Contacts dashboards + CSV export
- Contact form → Supabase (server-side validated)
- GA4 live analytics footer widget (Web Crypto JWT → GA4 REST API)
- 12 dynamic service sub-pages + storm damage page
- JSON-LD schema markup (LocalBusiness, Service, FAQ, Breadcrumb, Review)
- 60+ custom AI images
- SEO: sitemap, robots.txt, structured data, meta tags
- Dark navy/gold brand system with Playfair Display + Lato typography

---
*Update this file + push to sync the Bridge.*
