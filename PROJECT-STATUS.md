# Alpine Peak Roofing — Project Status

**Last Updated:** 2026-03-03 (Session 3)
**Branch:** `feature/blog-automation-and-workflow-optimization`
**Repo:** https://github.com/Agentic-Person/alpine-peak-roofing.git
**Local:** `D:\APS\Projects\AlpinePeakCompany\AlpinePeakRoofing\apr-website`
**Dev Server:** `http://localhost:3004`

---

## Site Architecture

### Public Routes
| Route | Status | Notes |
|-------|--------|-------|
| `/` | ✅ Done | **Mountain Craftsman** homepage — full redesign |
| `/about` | ✅ Exists | Team page — needs design system audit |
| `/services` | ✅ Exists | Services overview |
| `/services/residential` | ✅ Exists | |
| `/services/commercial` | ✅ Exists | |
| `/services/emergency` | ✅ Exists | |
| `/portfolio` | ✅ Exists | Before/after projects — needs design audit |
| `/process` | ✅ Exists | Our process steps |
| `/contact` | ✅ Exists | Contact form |
| `/blog` | ✅ Exists | Blog listing (AI-generated content) |
| `/blog/[slug]` | ✅ Exists | Individual blog posts |
| `/estimator` | ✅ Exists | Instant roof estimator tool |
| `/ai-tools` | ✅ Done | **Top-of-funnel** — "The Labor Equation Solved" (hero slideshow, 3-card overview, testimonials) |
| `/ai-tools/solutions` | ✅ Done | **Deep-dive** — "Intelligent Roofing Automations" (4 feature cards, ROI calculator, CTA) |
| `/ai-chat` | ✅ Exists | Live chatbot interface |
| `/faq` | ✅ Exists | FAQ page |
| `/glossary` | ✅ Exists | Roofing glossary |
| `/privacy` | ✅ Exists | Privacy policy |

### Location Pages
- `/locations/aspen`, `/vail`, `/telluride`, `/steamboat-springs`, `/crested-butte`, `/winter-park`
- `/service-areas/central-mountains`

---

## Design System — Mountain Craftsman (Current)

### Color Palette
| Token | Hex | Usage |
|-------|-----|-------|
| `--forest-deep` | `#1A3D2B` | Nav background, hero overlays, dark CTAs |
| `--forest-mid` | `#2E6B4A` | Accents, section dividers |
| `--cedar` | `#6B3A1F` | Warm brown — headings, top accent bar |
| `--sandstone` | `#C4956A` | Warm tan — subheadings, muted text |
| `--gold` | `#D4AF37` | Mountain gold — CTAs, stars, highlights |
| `--cream` | `#FAF7F2` | Primary background |
| `--cream-dark` | slightly darker cream | Alternating section backgrounds |
| `--charcoal` | dark charcoal | Final CTA strip, dark text |

### Typography
- **Display / Headings:** `Playfair Display` — loaded via `next/font/google`, CSS var `--font-playfair`
- **Body / UI:** `Lato` — loaded via `next/font/google`, CSS var `--font-lato`
- Both loaded in `app/layout.tsx`, applied via className on `<body>`

### Layout Pattern
- Max width: `max-w-7xl`, padding: `px-6 lg:px-12`
- Alternating left/right content sections (image + text) — "swimming down the page" feel
- Generous vertical spacing: `py-24` sections, `space-y-28` between service rows
- Gold `h-0.5` dividers used as section accents

---

## Current Homepage (`/`) — Mountain Craftsman

Sections top to bottom:
1. **Hero** — full-bleed (`min-h-[88vh]`), deep forest gradient overlay, "Pinnacle of Protection. Peak of Performance." in Playfair Display, gold CTA buttons
2. **Trust Strip** — 4 stat cards: 25+ Years, 1,200+ Projects, 24/7 Emergency, 5★ Rating
3. **Services** — 3 alternating `ServiceRow` components: Residential, Commercial, Emergency (each with SiteImage + feature list + CTA)
4. **Before & After Showcase** — dark forest section, 2 project cards with before/after labels
5. **AI Estimator Teaser** — sandstone section, steps list + estimator UI mockup card
6. **Testimonials** — 3 customer cards with gold stars
7. **Philosophy** — cedar section ("Built on Trust, Sealed with Craft") with 4 value pillars
8. **Service Areas** — city pills for 12 Colorado locations
9. **Final CTA Strip** — charcoal with gold border-top, "Ready to Protect What Matters Most?"

---

## Current Navigation — Mountain Craftsman

- **Forest-deep** background (`#1A3D2B`)
- **Top accent bar** — 3px cedar stripe
- **Utility bar** (desktop only) — "Serving Colorado Since 1999", gold phone number, ThemeToggle
- **Logo** — APR image in gold-bordered 36×36 square + "Alpine Peak / ROOFING" text
- **Nav links** — Lato 700, 0.775rem, uppercase, gold when active
- **AI Tools dropdown** — 3 items: AI Platform (`/ai-tools`), Instant Estimator, Chat with AI
- **CTA button** — gold "Free Estimate" → `/estimator`
- **Scroll-aware** — adds shadow when scrolled past 20px
- **Mobile** — hamburger with full nav list + gold CTA

---

## AI Tools Funnel

| URL | Page | Description |
|-----|------|-------------|
| `/ai-tools` | "The Labor Equation Solved" | Top-of-funnel: blue/navy hero slideshow, 3 tool overview cards, testimonials |
| `/ai-tools/solutions` | "Intelligent Roofing Automations" | Deep-dive: 4 full feature cards, ROI calculator, business inquiry CTA |

Cards on `/ai-tools` link to `/ai-tools/solutions` for full details.

---

## Image System

- `SiteImage` (`components/SiteImage.tsx`) imports `docs/images/imageManifest.json` directly
- `fill=true` → `<Image fill className={...} />` — parent needs `position: relative` + height
- `fill=false` → `<Image width height className={...} />` — no wrapper div, className on img
- `onError` swaps to placeholder SVG automatically
- **No ImageProvider / useSafeImage** — removed (violated React hooks rules)

### Available Images (`public/images/`)
```
heroes/   hero-home-001/2/3.png, hero-roofers-001/2/3/4.png, roofing_split_screen_sunset_rain.png
M1/       hero_about/services/portfolio/contact/homepage.png, service_residential/commercial/emergency.png,
          commercial_after/before.png, team_founder/foreman/safety/roofer_2/customer_service.png, + more
services/ residential/commercial/emergency.webp
team/     founder/foreman/customer-service/roofer-2/safety/project-manager.webp
ai-tools/ chatbot-card/autoblog-card/roofestimator-card/crm-card.png
blog/     blog_1 through blog_18 .jpg
logo/     APR-LOGO-solo.png, APR-favicon.png
```

**Note:** No actual before/after photography exists yet. Portfolio images use M1 AI-generated stand-ins.

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
- [ ] **Real photography** — actual before/after project photos → `/images/portfolio/`
- [ ] **About page** — apply Mountain Craftsman design system, audit SiteImage IDs
- [ ] **Portfolio page** — apply Mountain Craftsman design, fix fill/aspect-ratio patterns
- [ ] **Services pages** — audit for design consistency with new system

### Medium Priority
- [ ] Mobile responsiveness audit across all pages
- [ ] Contact form — validate submission flow works end to end
- [ ] Blog — SEO metadata, featured image display
- [ ] Merge branch to `main` once site is stable

### Future
- [ ] Google Analytics 4 integration
- [ ] Real customer testimonials with photos
- [ ] Location pages content review
- [ ] `/ai-tools/solutions` — wire up "Request Demo" and "Get Pricing" CTAs to contact form

---

## Git Commits This Branch (key ones)
| Hash | Description |
|------|-------------|
| `c6e3b6b` | Restore full roofing website + fix image system |
| `e08eb86` | Restore Labor Equation funnel as `/ai-tools` |
| `9694cfb` | PROJECT-STATUS.md initial version |
| latest | Mountain Craftsman homepage + navigation redesign |
