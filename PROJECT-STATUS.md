# Alpine Peak Roofing — Project Status

**Last Updated:** 2026-03-02
**Branch:** `feature/blog-automation-and-workflow-optimization`
**Repo:** https://github.com/Agentic-Person/alpine-peak-roofing.git
**Local:** `D:\APS\Projects\AlpinePeakCompany\AlpinePeakRoofing\apr-website`
**Dev Server:** `http://localhost:3004`

---

## Site Architecture

### Public Routes
| Route | Status | Notes |
|-------|--------|-------|
| `/` | ✅ Done | Traditional roofing homepage restored |
| `/about` | ✅ Exists | Team page — check SiteImage usage |
| `/services` | ✅ Exists | Services overview |
| `/services/residential` | ✅ Exists | |
| `/services/commercial` | ✅ Exists | |
| `/services/emergency` | ✅ Exists | |
| `/portfolio` | ✅ Exists | Before/after projects |
| `/process` | ✅ Exists | Our process steps |
| `/contact` | ✅ Exists | Contact form |
| `/blog` | ✅ Exists | Blog listing (AI-generated content) |
| `/blog/[slug]` | ✅ Exists | Individual blog posts |
| `/estimator` | ✅ Exists | Instant roof estimator tool |
| `/ai-tools` | ✅ Done | **AI Funnel Page** — "Intelligent Roofing Automations" |
| `/ai-chat` | ✅ Exists | Live chatbot interface |
| `/faq` | ✅ Exists | FAQ page |
| `/glossary` | ✅ Exists | Roofing glossary |
| `/privacy` | ✅ Exists | Privacy policy |

### Location Pages
- `/locations/aspen`, `/vail`, `/telluride`, `/steamboat-springs`, `/crested-butte`, `/winter-park`
- `/service-areas/central-mountains`

---

## What Was Done This Session

### Problem
The site was stuck on an AI-marketing-focused homepage ("The Labor Equation Solved") with empty navigation. The original professional roofing website had been overwritten without branching.

### Restored
1. **`app/page.tsx`** — Full traditional roofing homepage with:
   - Hero image section (60vh, overlay)
   - Value props (Licensed & Insured, 25+ Years, Emergency, 5-Star)
   - Services overview (Residential, Commercial, Emergency)
   - Featured Projects section
   - Testimonials (3 customers)
   - Philosophy section
   - Service Areas (Denver, Aurora, Lakewood, Highlands Ranch, etc.)

2. **`components/layout/Navigation.tsx`** — Full navigation restored:
   - Home, About Us, Services, Portfolio, Our Process, Blog, Contact
   - AI Tools dropdown → Roofing AI Toolset (`/ai-tools`), Instant Roof Estimator, Chat with AI
   - APR logo image, phone (970) 446-8995, ThemeToggle, Free Estimate CTA
   - Mobile hamburger menu

3. **`tailwind.config.ts`** — Added CSS variable color system:
   - `bg-background-primary/secondary/tertiary/inverse`
   - `text-text-primary/secondary/tertiary/inverse/muted`
   - `text-interactive-primary`, `border-interactive-primary`, etc.

4. **`app/globals.css`** — Added semantic CSS custom properties:
   - Light mode: white/gray backgrounds, dark navy nav, blue interactive
   - Dark mode: dark navy backgrounds, adjusted colors
   - All existing chatbot/holographic CSS preserved

5. **`components/SiteImage.tsx`** — Complete rewrite (simpler, correct):
   - Imports `imageManifest.json` directly (no React context/provider)
   - `fill=true`: renders `<Image fill className={...} />` directly on img
   - `fill=false`: renders `<Image width height className={...} />` directly
   - `onError` falls back to placeholder SVG
   - Removed the broken `ImageProvider`/`useSafeImage` context system entirely

6. **`docs/images/imageManifest.json`** — Rewritten with correct file paths:
   - All images map to actual files in `public/images/M1/`, `public/images/heroes/`, etc.

7. **`app/layout.tsx`** — Removed broken `ImageProvider` wrapper

### AI Tools Funnel (PRESERVED at `/ai-tools`)
The `app/ai-tools/page.tsx` contains the full "Intelligent Roofing Automations" funnel page with:
- Hero: purple-to-blue gradient, "Intelligent Roofing Automations"
- 4 feature cards (holographic hover effects):
  - 🤖 AI-Powered Chatbot System
  - 📝 Automated Blog Content System
  - 🏠 Instant Roof Estimator
  - 🎯 Lead Generation & CRM System
- ROI Calculator section
- Business Inquiry / CTA section
- **Navigation AI Tools dropdown → "Roofing AI Toolset" links directly here**

---

## Image System

### How It Works
- `SiteImage` component reads `docs/images/imageManifest.json` at build time
- Each image has an `id`, `path` (in `public/`), `placeholder`, `alt`, `dimensions`
- `onError` fallback to placeholder SVG
- For fill images (hero, portfolio): parent needs `relative` + height/aspect-ratio

### Available Images (in `public/images/`)
```
heroes/
  hero-home-001.png       ← Homepage hero (WORKING)
  hero-home-002.png
  hero-home-003.png
  hero-roofers-001/2/3/4.png
  roofing_split_screen_sunset_rain.png
  residential.webp

M1/                        ← AI-generated roofing imagery
  hero_about.png
  hero_services.png
  hero_portfolio.png
  hero_contact.png
  hero_homepage.png
  service_residential.png
  service_commercial.png
  service_emergency.png
  commercial_after.png
  commercial_before.png
  team_founder.png
  team_foreman.png
  team_safety.png
  team_roofer_2.png
  team_customer_service.png
  facebook_crew.png
  quality_inspection.png
  + many more...

services/
  residential.webp
  commercial.webp
  emergency.webp

team/
  founder.webp
  foreman.webp
  customer-service.webp
  roofer-2.webp
  safety.webp
  project-manager.webp

ai-tools/
  chatbot-card.png
  autoblog-card.png
  roofestimator-card.png
  crm-card.png

blog/
  blog_1_diy_vs_professional.jpg  through  blog_18_warranties.jpg

logo/
  APR-LOGO-solo.png
  APR-favicon.png

placeholders/
  hero-placeholder.svg
  team-placeholder.svg
  service-placeholder.svg
  project-before-placeholder.svg
  project-after-placeholder.svg
```

### Portfolio "Before/After" Note
The homepage Featured Projects section uses `/images/M1/service_residential.png` and `/images/M1/commercial_after.png` as stand-ins. **Real before/after photography is needed** to populate the portfolio properly.

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
- [ ] **Commit current work** to `feature/blog-automation-and-workflow-optimization`
- [ ] **Real photography** — upload actual before/after project photos to `/images/portfolio/`
- [ ] **About page audit** — check team SiteImage ids match manifest
- [ ] **Portfolio page audit** — check all SiteImage ids and fix fill/aspect-ratio

### Medium Priority
- [ ] Mobile responsiveness check across all restored pages
- [ ] Contact form validation and submission flow
- [ ] Blog SEO metadata review

### Future
- [ ] Google Analytics 4 integration
- [ ] Real customer testimonials with photos
- [ ] Location pages content review

---

## Key Design Decisions

**CSS Variable System:**
All colors use semantic variables (`--background-primary`, `--interactive-primary`, etc.) defined in `globals.css` and mapped in `tailwind.config.ts`. This supports light/dark mode via `.dark` class.

**SiteImage Philosophy:**
Keep `SiteImage` as a thin wrapper — its only job is ID→path lookup and onError fallback. No async checks, no providers, no complexity.

**AI Tools Strategy:**
`/ai-tools` serves as the sales/funnel page for the AI automation services. It's separate from the main roofing site persona but accessible via the nav dropdown. This keeps the company's roofing credibility on the main pages while showcasing the tech on `/ai-tools`.
