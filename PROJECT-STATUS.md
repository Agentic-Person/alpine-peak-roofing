# Alpine Peak Roofing — Project Status

**Last Updated:** 2026-08-15 (Session 14 — AI-readiness 100 pass: server-rendered schema rewrite, deployed + re-audited live at 98.6/100)
**Branch:** `main`
**Repo:** https://github.com/Agentic-Person/alpine-peak-roofing.git
**Local:** `D:gent-services\projects\client-siteslpine-peak-roofing` (fresh clone 2026-08-15; the old C:\projects\APR path is stale)
**Dev Server:** `http://localhost:3000`

---

## Session 14 — AI-Readiness 100 Pass + Production Deploy (2026-08-15)

Run by the Peak Growth Roofing agent fleet (Fable 5 audit/design, Sonnet 5 implementation/deploy) as part of bringing every portfolio site to ~100 on Peak Growth's five-component AI-search readiness composite [JSON-LD, llms.txt, FAQPage, Lighthouse SEO, Lighthouse Performance].

**Critical discovery:** every JSON-LD schema on the live site was CLIENT-INJECTED. All 14 components in `components/seo/schemas/` emitted via `next/script` — even `strategy="beforeInteractive"` does not server-render the tag; it defers into the hydration queue (`__next_s.push`). Raw HTML had ZERO real `<script type="application/ld+json">` tags, so AI crawlers (GPTBot, PerplexityBot, ClaudeBot — none execute JS) saw no structured data at all. This is why Session 13's schema work validated in-browser/Lighthouse yet was invisible to answer engines.

**Fixed on `feature/ai-readiness-100` (4 commits, merged to main at `658c3b0`):**
- All 14 schema components rewritten to server-render via new escape-safe `components/seo/schemas/jsonLd.ts` (`<` → `<`, script-breakout tested). Verified by raw curl on the production build: 21 routes, 208 server-rendered JSON-LD tags, FAQPage on every route, zero remaining `__next_s` injections, document ~7 KB smaller.
- Fonts were loading TWICE (next/font self-hosted AND re-fetched from Google Fonts via `@import`s in Navigation.tsx + globals.css — 790ms render-blocking). All four families self-hosted; 394 inline font-family literals rewritten to the next/font CSS vars.
- LCP: hero `fetchPriority="high"`; competing chat-avatar preload demoted to lazy; AVIF enabled; 1440 deviceSizes; nav logo `sizes="52px"` (was fetching 1440px for a 52px slot); hero quality 68 (visually verified imperceptible).

**Deployed 2026-08-15 — IMPORTANT OPERATIONAL NOTE:** this Vercel project (`jimihacks-projects/alpine-peak-roofing`, prj_veMrCTb2SsFTGsZklJtuN9Gc2klN) has **NO Git integration** — pushes to origin/main never auto-deploy. Deploy manually with `vercel deploy --prod` (that is how this release shipped: dpl_7jV54iG7DPhNeSq9JpbLYBKnpp8c, aliased to www.alpinepeakroofing.com), or wire the Git integration in the Vercel dashboard.

**Live re-audit (post-deploy, tag-aware, Lighthouse median-of-three):** JSON-LD 9 real tags ✓ · llms.txt 200 ✓ · FAQPage ✓ · SEO median 100 · Performance median 93 → **composite 98.6/100** (was 52 crawler-visible before this session). Remaining perf ceiling is element render delay (render-blocking CSS) + GA gtag.js — not image bytes. Pre-existing cosmetic bug noted, not fixed: chat avatar renders 16x124 inside its 56x56 button.

---

## Session 13 — SEO/AEO Optimization Pass (2026-04-17)

Full audit + rebuild for answer-engine crawlability. An outside SEO company had claimed the site needed a full rewrite. It didn't — just needed five pages stripped of `"use client"` plus proper metadata and schemas. Done in a day across parallel Sonnet 4.6 agents.

### Build integrity restored
- `ignoreBuildErrors` and `ignoreDuringBuilds` flipped to `false` in `next.config.ts` — TypeScript and ESLint errors can no longer be silenced
- Pre-existing TS errors resolved: Next.js 15 `params: Promise<...>` convention applied to the one remaining dynamic route, `react-markdown` implicit-any types fixed, `lib/ga4.ts` `prefer-rest-params` fixed
- `react-hot-toast` uninstalled (unused; `sonner` is the active toast lib)
- CloudFront CDN hostname added to `images.remotePatterns` so `next/image` can optimize these
- `CLAUDE.md` modernized — stack now documented as Next.js 15 / React 19 / Supabase (not the old "planning phase" framing)

### Pages converted from `"use client"` to Server Components
| Page | Schema emitted | Pre-rendered? |
|---|---|---|
| `/` | LocalBusiness, RoofingContractor, WebPage | Static |
| `/about` | AboutPage | Static |
| `/services` (+ residential, commercial, storm-damage, emergency) | Service, Breadcrumb (+ FAQ/Review on [slug]) | Static + SSG |
| `/process` | **HowTo** (6 steps — AEO gold) | Static |
| `/materials` (index + [slug] × 4) | ItemList + Product + Breadcrumb | SSG (4 slugs) |
| `/locations` (index + [slug] × 12) | ItemList + RoofingContractor + Place + Breadcrumb | SSG (12 slugs) |
| `/portfolio` | CollectionPage + 12 CreativeWork items | Static |
| `/investment-analysis` | Article | Static |
| `/financing` | FinancialProduct ×2 | Static |
| `/contact` | ContactPage + RoofingContractor | Static |

### Duplicate "SEO" pages deleted
`/about-seo`, `/services-seo`, `/process-seo` directories removed after merging their unique copy into the originals. Eliminates the duplicate-content penalty.

### Sitemap expanded
`app/sitemap.xml/route.ts`: 17 → 37 static routes + dynamic blog posts. Now includes materials index + each material slug, portfolio, service details, financing, privacy, terms. Location entries driven from `lib/locations.ts` so all 12 city pages are listed automatically (April 18 follow-up — previously only 6 were hardcoded).

### Internal linking matrix (local SEO)
Each location page now links out to `/services/residential`, `/services/commercial`, `/services/storm-damage` plus material detail pages — the classic city × service cross-linking.

### Client island pattern established
Framer Motion animations, state, and event handlers extracted into small `components/*/islands/` files that carry `"use client"`. Parent pages stay server-rendered and ship full HTML to crawlers.

### Verification (Wave 3)
- `npm run build`: clean pass, 91 routes, 47 static + 4 SSG groups + 40 dynamic API/admin
- `npx tsc --noEmit`: 0 errors
- `npm run lint`: 0 errors, 297 pre-existing warnings (legacy `any` / `unescaped-entities`)
- Crawl check on 15 routes: every page has H1, visible content, and JSON-LD in initial HTML
- Lighthouse local: **SEO 100, Accessibility 92**, Performance 66 (localhost-limited — CloudFront images 404 locally, real Vercel score will be higher)

### Known follow-ups
- `/contact` schema uses placeholder Denver 80202 address — replace with real business address once confirmed.
- 297 lint warnings remain (pre-existing, demoted to `warn`) — cleanup target, not blocking.
- Run Lighthouse against live Vercel URL for a true Performance score.

### Preview verification (April 18)
Vercel preview deploy of `feat/seo-aeo-optimization-pass` tested end-to-end via protection-bypass token:
- **16 routes returned HTTP 200** with H1, content markers, and JSON-LD present in initial HTML
- **Sitemap: 109 URLs** — 72 blog posts (table confirmed live), 12 locations, 4 materials, 3 services, 6 static informational pages, 12 other
- **Schema coverage verified:** Product + AggregateOffer + Brand on materials, RoofingContractor + Place + City + GeoCoordinates on locations, HowTo + HowToStep + HowToSupply + HowToTool on /process, ContactPage + ContactPoint + OpeningHoursSpecification on /contact, FinancialProduct on /financing, CollectionPage + CreativeWork on /portfolio, LocalBusiness schemas on homepage

### Mobile polish (April 19)
User testing on a physical phone surfaced two chat-widget issues, both fixed in `components/chatbot/ChatWidget.tsx`:
- **Floating button sized for mobile** — was 168px across on every viewport (too dominant on phones). Now 56px mobile / 168px desktop via `md:` breakpoint. Still comfortably above the 44px minimum tap-target (iOS HIG / Material Design).
- **Open chat panel fits the screen** — was fixed 380×500 anchored 30px from right edge, overflowing phones narrower than 410px. Now `inset-4` (16px from all sides, fills viewport) on mobile / fixed 400×600 on desktop. Matches the pattern used by Intercom, HubSpot, Drift.

---

## Site Architecture

### Public Routes
| Route | Status | Notes |
|-------|--------|-------|
| `/` | ✅ Done | Hero: H1 image visible, Oswald headline, chat widget top-right, Colorado branding |
| `/about` | ✅ Done | Denver Blue, new team photos (T1–T5) |
| `/services` | ✅ Done | Denver Blue design, new service images (S1–S5) |
| `/services/residential` | ✅ Exists | |
| `/services/commercial` | ✅ Exists | |
| `/services/emergency` | ✅ Exists | |
| `/portfolio` | ✅ Done | New before/after photos (BA1–BA5) wired in |
| `/process` | ✅ Done | 6-step layout — real photos replacing gradients |
| `/contact` | ✅ Exists | Contact form |
| `/blog` | ✅ Exists | Blog listing (AI-generated content) |
| `/blog/[slug]` | ✅ Exists | Individual blog posts |
| `/estimator` | ✅ Done | Carousel redesign — 6-slide auto-playing fade carousel (E1–E6 webp), "Analyze My Roof" → Calendly CTA |
| `/ai-tools` | ✅ Done | Top-of-funnel — "The Labor Equation Solved" |
| `/ai-tools/solutions` | ✅ Done | Deep-dive — "Intelligent Roofing Automations" |
| `/ai-chat` | ✅ Exists | Live chatbot interface |
| `/faq` | ✅ Exists | FAQ page |
| `/glossary` | ✅ Exists | Roofing glossary |
| `/privacy` | ✅ Exists | Privacy policy |

### Location Pages
- `/locations/aspen`, `/vail`, `/telluride`, `/steamboat-springs`, `/crested-butte`, `/winter-park`
- `/service-areas/central-mountains`

---

## Design System — Denver Blue (Session 5)

### Color Palette
| Token | Hex | Usage |
|-------|-----|-------|
| `--sky-captain` | `#004080` | Nav background, hero overlays, dark sections, footers |
| `--azure` | `#0077CC` | Buttons, section accents, card borders |
| `--cornflower` | `#5599FF` | Icons, hover states, highlights, bright accents |
| `--amber-gold` | `#E5A800` | Primary CTAs, stars, trust badges, accent bars |
| `--warm-slate` | `#4A5C6A` | Body text blocks, neutral card surfaces |
| `#FFFFFF` | — | Primary backgrounds, inverse text |
| `--ink` | `#1A2332` | Primary body text (blue-tinted near-black) |

**Legacy CSS variable names preserved** (`--forest-deep`, `--gold`, `--cedar`, etc.) — now point to Denver Blue values. All existing components work without class name changes.

### RGBA Mapping (old → new)
| Old | New |
|-----|-----|
| `rgba(26,61,43,...)` green | `rgba(0,64,128,...)` navy |
| `rgba(15,36,25,...)` dark green | `rgba(0,45,90,...)` deep navy |
| `rgba(212,175,55,...)` gold | `rgba(229,168,0,...)` amber |
| `rgba(107,58,31,...)` cedar | `rgba(0,64,128,...)` navy |
| `rgba(250,247,242,...)` cream | `rgba(255,255,255,...)` white |

### Typography
- **Display / Headings:** `Playfair Display` — CSS var `--font-playfair`
- **Body / UI:** `Lato` — CSS var `--font-lato`

### Layout Pattern
- Max width: `max-w-7xl`, padding: `px-6 lg:px-12`
- Alternating left/right content sections
- Amber gold `h-0.5` dividers as section accents

---

## Navigation — Denver Blue

- **Sky Captain** background (`#004080`)
- **Top accent bar** — 3px amber-gold stripe
- **Utility bar** (desktop only) — gold phone number, ThemeToggle
- **Nav links** — Lato 700, uppercase, amber-gold when active, white underline hover
- **AI Tools dropdown** — 3 items: AI Platform, Instant Estimator, Chat with AI
- **CTA buttons** — "Analyze My Roof" → Calendly (outline), "Free Estimate" → `/estimator` (gold)
- **Mobile menu** — "Analyze My Roof" full-width outline + "Get Free Estimate" gold
- **Scroll-aware** — adds navy shadow when scrolled

---

## Image System — v2.0.0 (Session 5)

`SiteImage` (`components/SiteImage.tsx`) imports `docs/images/imageManifest.json` directly at build time.

- `fill=true` → `<Image fill>` — parent needs `position: relative` + height
- `fill=false` → `<Image width height>` — className applied directly to img
- `onError` falls back to placeholder SVG automatically
- **No ImageProvider / useSafeImage** — removed (violated React hooks rules)

### Image Directories (`public/images/`)
```
heroes/         H1_homepage_hero.jpg, H2_homepage_hero_alt.jpg, H3_services_hero.jpg,
                H4_about_hero.jpg, H5_emergency_hero.jpg + legacy .png files
portfolio/      BA1-BA5 before/after pairs (10 files), P1-P5 showcase (5 files),
                timber_home_brown_roof.jpg (homepage portfolio section background)
services/       S1_residential.jpg, S2_commercial.jpg, S3_emergency.jpg,
                S4_metal_roofing.jpg, S5_drone_inspection.jpg
team/           T1_lead_roofer.jpg, T2_project_coordinator.jpg, T3_senior_technician.jpg,
                T4_sales_estimator.jpg, T5_female_ceo.jpg
backgrounds/    BG1_shingle_texture.jpg, BG2_mountain_panorama.jpg, BG3_cedar_texture.jpg
estimator/      E1_v3_address_entry.webp, E2_v4_satellite_confirmation.webp,
                E3_v4_ai_analysis.webp, E4_v2_material_selection.webp,
                E5_v2_estimate_delivered.webp, timber_home_brown_roof.jpg (slide 6)
M1/             Original AI-generated placeholder images (kept for pages not yet updated)
blog/           blog_1 through blog_18 .jpg
logo/           APR-LOGO-solo.png, APR-favicon.png
ai-tools/       chatbot-card, autoblog-card, roofestimator-card, crm-card .png
```

### Manifest IDs — Key Entries
| ID | Image | Used On |
|----|-------|---------|
| `hero_home` | H1_homepage_hero.jpg | Homepage hero |
| `hero_about` | H4_about_hero.jpg | About hero |
| `hero_services` | H3_services_hero.jpg | Services hero |
| `hero_emergency` | H5_emergency_hero.jpg | Emergency service section |
| `service_residential` | S1_residential.jpg | Homepage + Services |
| `service_commercial` | S2_commercial.jpg | Homepage + Services |
| `service_emergency` | S3_emergency.jpg | Homepage + Services |
| `service_inspection` | S5_drone_inspection.jpg | Services + Process |
| `ba_victorian_before/after` | BA1_*.jpg | Portfolio |
| `ba_ranch_before/after` | BA2_*.jpg | Portfolio |
| `ba_commercial_before/after` | BA3_*.jpg | Portfolio |
| `ba_mountain_before/after` | BA4_*.jpg | Portfolio |
| `ba_aurora_before/after` | BA5_*.jpg | Portfolio |
| `portfolio_victorian` | P1_victorian_after.jpg | Homepage, process |
| `portfolio_modern_metal` | P2_modern_metal_after.jpg | Homepage, process |
| `portfolio_crew_installation` | P4_crew_installation.jpg | Process step 4 |
| `team_founder` | T5_female_ceo.jpg | About — Alexandra Pierce, CEO |
| `team_foreman` | T1_lead_roofer.jpg | About — Marcus Rodriguez |
| `team_project_manager` | T2_project_coordinator.jpg | About — Sarah Mitchell |
| `team_safety` | T3_senior_technician.jpg | About — David Chen |
| `team_customer_service` | T4_sales_estimator.jpg | About — Jennifer Park |
| `estimator_address` | E1_v3_address_entry.webp | Estimator carousel slide 1 |
| `estimator_satellite` | E2_v4_satellite_confirmation.webp | Estimator carousel slide 2 |
| `estimator_analysis` | E3_v4_ai_analysis.webp | Estimator carousel slide 3 |
| `estimator_materials` | E4_v2_material_selection.webp | Estimator carousel slide 4 |
| `estimator_delivered` | E5_v2_estimate_delivered.webp | Estimator carousel slide 5 |

---

## About Page — Team Members (Session 5)

| Name | Role | Image |
|------|------|-------|
| Alexandra Pierce | CEO & Founder | T5_female_ceo.jpg |
| Marcus Rodriguez | Lead Foreman | T1_lead_roofer.jpg |
| Sarah Mitchell | Project Coordinator | T2_project_coordinator.jpg |
| David Chen | Senior Technician | T3_senior_technician.jpg |
| Jennifer Park | Sales & Estimating | T4_sales_estimator.jpg |

---

## n8n Automation Workflows

| Workflow | File | Status |
|----------|------|--------|
| Blog Content Planner | `n8n/workflows/blog-content-planner.json` | Active |
| Blog Content Generator | `n8n/workflows/blog-content-generator.json` | Active |
| Blog Publisher/Distributor | `n8n/workflows/blog-publisher-distributor.json` | Active |
| Voice Chatbot RAG | `n8n/workflows/alpine-peak-voice-chatbot-rag-FIXED-004.json` | Active |

---

## Pending / Next Steps

### High Priority
- [ ] Mobile responsiveness audit across all pages (Denver Blue)
- [ ] `/services/residential`, `/commercial`, `/emergency` sub-pages — apply Denver Blue
- [ ] Contact form — validate submission flow
- [ ] Merge branch to `main` once stable

### Medium Priority
- [x] Blog — SEO metadata (Article/BlogPosting schema added Session 13), featured image display
- [ ] Location pages — content review + Denver Blue design (SSR + LocalBusiness schema done Session 13; Denver Blue polish still pending)
- [ ] Background images (BG1-BG3) — implement in CTA sections and footer
- [ ] Replace placeholder address in `/contact` schema with real business address

### Future
- [ ] Google Analytics 4 integration
- [ ] Real customer testimonials with photos
- [ ] `/ai-tools/solutions` — wire "Request Demo" / "Get Pricing" CTAs to contact form
- [ ] Dark mode pass — verify Denver Blue `.dark` variables look correct

---

## Git Commits This Branch (key ones)

| Hash | Description |
|------|-------------|
| `c6e3b6b` | Restore full roofing website + fix image system |
| `e08eb86` | Restore Labor Equation funnel as `/ai-tools` |
| `b86096d` | Mountain Craftsman design system — homepage + nav |
| `959990f` | Mountain Craftsman applied to About, Portfolio, Services |
| `9081b17` | Process page redesign + CSS system expansion + image prompts |
| `b17d904` | Denver Blue color system + 40 AI-rendered images implemented |
| `fb35f86` | Homepage hero — fix invisible image (HeroImage → SiteImage), gradient 0.88→0.22 |
| `87f879f` | Hero polish — Oswald font, Colorado branding, chat widget moved to top-right |
| `c6f4b8b` | Estimator carousel redesign — 6-slide fade carousel, Analyze My Roof CTA globally |
| `fb8edf6` | Homepage portfolio section — timber mountain home background image |
