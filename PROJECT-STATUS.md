# Alpine Peak Roofing — Project Status

**Last Updated:** 2026-03-04 (Session 7)
**Branch:** `feature/blog-automation-and-workflow-optimization`
**Repo:** https://github.com/Agentic-Person/alpine-peak-roofing.git
**Local:** `D:\APS\Projects\AlpinePeakCompany\AlpinePeakRoofing\apr-website`
**Dev Server:** `http://localhost:3004`

---

## Site Architecture

### Public Routes
| Route | Status | Notes |
|-------|--------|-------|
| `/` | ✅ Done | **Denver Blue** homepage — hero image visible (H1 gradient fix) |
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
| `/estimator` | ✅ Done | Redesigned — Denver Blue + 5-step How It Works (E1–E5) |
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
- **CTA button** — amber-gold "Free Estimate" → `/estimator`
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
portfolio/      BA1-BA5 before/after pairs (10 files), P1-P5 showcase (5 files)
services/       S1_residential.jpg, S2_commercial.jpg, S3_emergency.jpg,
                S4_metal_roofing.jpg, S5_drone_inspection.jpg
team/           T1_lead_roofer.jpg, T2_project_coordinator.jpg, T3_senior_technician.jpg,
                T4_sales_estimator.jpg, T5_female_ceo.jpg
backgrounds/    BG1_shingle_texture.jpg, BG2_mountain_panorama.jpg, BG3_cedar_texture.jpg
estimator/      E1_address_entry.jpg through E5_estimate_delivered.jpg
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
| `estimator_address` | E1_address_entry.jpg | Estimator How It Works |
| `estimator_satellite` | E2_satellite_confirmation.jpg | Estimator How It Works |
| `estimator_analysis` | E3_ai_analysis_v2.jpg | Estimator How It Works |
| `estimator_materials` | E4_material_selection.jpg | Estimator How It Works |
| `estimator_delivered` | E5_estimate_delivered.jpg | Estimator How It Works |

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
- [ ] Blog — SEO metadata, featured image display
- [ ] Location pages — content review + Denver Blue design
- [ ] Background images (BG1-BG3) — implement in CTA sections and footer

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
| `latest` | Homepage hero — fix invisible image (HeroImage → SiteImage), gradient 0.88→0.22 |
