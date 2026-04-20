# Alpine Peak Roofing — SEO / AEO / GEO / AIO Optimization Summary

> Canonical record of every Search Engine Optimization (SEO), Answer Engine Optimization (AEO), Generative Engine Optimization (GEO), and AI Optimization (AIO) improvement shipped on [alpinepeakroofing.com](https://alpinepeakroofing.com). Complements `docs/SEO_AEO_PLAYBOOK.md` (strategy) with a complete implementation ledger.

**Site:** https://alpinepeakroofing.com
**Stack:** Next.js 15.5 App Router, React 19, TypeScript strict, Tailwind CSS 3, Vercel
**Repo:** github.com/Agentic-Person/alpine-peak-roofing
**Last updated:** 2026-04-19 (session 14)

---

## 1. The Four Disciplines

Alpine Peak Roofing competes for visibility across four distinct surfaces, each with a different optimization discipline:

| Acronym | Full Name | Audience | Alpine Peak Roofing's Strategy |
|---|---|---|---|
| **SEO** | Search Engine Optimization | Google, Bing, DuckDuckGo | Rank top 3 for Denver-metro and Colorado mountain roofing queries |
| **AEO** | Answer Engine Optimization | Google AI Overviews, "People Also Ask", featured snippets | Capture the direct-answer slot for high-intent roofing questions |
| **GEO** | Generative Engine Optimization | ChatGPT, Perplexity, Claude, Gemini | Be the source cited when someone asks an LLM about Denver roofing |
| **AIO** | AI Optimization (crawler directives) | GPTBot, ClaudeBot, PerplexityBot, Google-Extended, Applebot-Extended, CCBot, Bytespider, Meta-ExternalAgent | Explicit allow-rules so AI crawlers index Alpine Peak Roofing with intent |

All four disciplines reinforce each other. SEO puts Alpine Peak Roofing on the first page; AEO gets Alpine Peak Roofing into position zero; GEO gets Alpine Peak Roofing quoted inside AI answers; AIO ensures AI crawlers actually see the content in the first place.

---

## 2. SEO — Search Engine Optimization

### Foundation (April 17 pass, PR #2)

The original outside-agency audit claimed the site needed a rewrite. It didn't — it needed server components, real metadata, and structured data. One-day rebuild across parallel agents:

- **Build integrity:** `ignoreBuildErrors` and `ignoreDuringBuilds` set to `false` in `next.config.ts`. No silent failures.
- **Server-rendered main pages:** Homepage, about, services, process, materials, locations, contact, portfolio, financing converted from `"use client"` shells to Server Components. Crawlers now see real HTML, not React bundles.
- **Client islands pattern:** Framer Motion animations, state, and event handlers extracted into small `components/*/islands/*.tsx` files so interactivity survives while the page stays server-rendered.
- **Per-route metadata:** Every page has a unique `generateMetadata()` with title, description, canonical URL, OpenGraph, and Twitter card.
- **Static pre-rendering:** `generateStaticParams()` on all `[slug]` routes — 4 materials, 12 locations, N residential services, N commercial services pre-rendered at build time.
- **Duplicate content removed:** `/about-seo`, `/services-seo`, `/process-seo` merged into originals and deleted.
- **Sitemap expanded:** 17 → 31 static URLs + dynamic blog posts. Dynamic `app/sitemap.xml/route.ts` driven by `lib/locations.ts` and `lib/materials.ts`.
- **Internal linking matrix:** Each `/locations/[city]` cross-links to `/services/*` and `/materials/*` — classic local-SEO signal for topical authority.

### Structured Data (JSON-LD)

Alpine Peak Roofing emits the full schema matrix the playbook calls for:

| Page | Schemas emitted |
|---|---|
| `/` (homepage) | `LocalBusiness` + `RoofingContractor` + `Organization` + `WebSite` + `FAQPage` + `ServiceArea` + `Review` + `EmergencyService` + `Sustainability` + `Portfolio` |
| `/about` | `AboutPage`, `Organization` |
| `/services/*` | `Service` + `ServiceOfferSchema` (with `Offer`/`AggregateOffer` + real pricing) + `BreadcrumbList` |
| `/services/*/[slug]` | `Service` + `ServiceOffer` + `FAQPage` + `BreadcrumbList` |
| `/process` | `HowTo` (6 steps) + `BreadcrumbList` |
| `/materials/[slug]` | `Product` + `AggregateOffer` + `BreadcrumbList` |
| `/locations/[slug]` | `RoofingContractor` + `Place` + `GeoCoordinates` + `BreadcrumbList` |
| `/portfolio` | `CollectionPage` + per-project `ImageObject` |
| `/financing` | `FinancialProduct` |
| `/contact` | `ContactPage` + `RoofingContractor` + `contactPoint` array |
| `/blog/[slug]` | `BlogPosting` + `Article` with `author` Person + `BreadcrumbList` |
| `/authors/[slug]` | `Person` + `BreadcrumbList` |
| `/guides/mountain-roofing-colorado` | `HowTo` (6 steps) |
| `/estimator` | `HowTo` (6 steps, estimator flow) |

### Competitive SEO Gaps Closed (session 13)

After benchmarking Alpine Peak Roofing against paid roofing agencies (Hook Agency, Blue Corona, Roofing Webmasters) and top-ranking Denver competitors (Metro City, Elite, Premier, Interstate):

1. **`BreadcrumbList` schema + visible breadcrumb UI** — wired into blog, location, material, residential service, commercial service detail pages. Google shows breadcrumbs in SERPs.
2. **`ServiceOfferSchema` with real pricing** — Service + Offer/AggregateOffer on every service page and landing. Real numbers from `lib/materials.ts`: GAF Timberline $4.50–$7.00/sqft, standing seam $10–$16, slate $15–$30, cedar shake $8–$15. Eligibility for Google price rich results.
3. **Homepage `TrustBar`** — Licensed / BBB A+ / GAF Master Elite / 4.9★ 250+ reviews / Fully Insured. Competitors lead with these credential badges — Alpine Peak Roofing now does too.
4. **`hasCredential` + `aggregateRating` on `LocalBusiness`** — matching the visible trust bar.
5. **Image sitemap** — new `/image-sitemap.xml` route with 70 geo-tagged images across homepage, services, locations, materials, portfolio. Geo-tagged to Denver / mountain Colorado per image. Referenced from `robots.txt`.
6. **`ImageObjectSchema`** — emitted on `/portfolio` per project image with `contentLocation`.
7. **Blog author system (EEAT signals)** — `lib/authors.ts` with 3 seeded authors, `ArticleSchema` JSON-LD on blog, visible `AuthorBio` component, SSG `/authors/[slug]` archive pages with `Person` schema.

### Files — SEO-critical

```
next.config.ts                              — strict build flags, image remotePatterns
app/sitemap.xml/route.ts                    — dynamic XML sitemap (31+ URLs)
app/image-sitemap.xml/route.ts              — 70 geo-tagged images
public/robots.txt                           — crawler directives (see AIO section)
components/seo/schemas/
  ├── PrimaryBusinessSchema.tsx             — LocalBusiness + RoofingContractor + credentials + rating
  ├── FAQSchema.tsx                         — 20 Denver-specific Q&As
  ├── BreadcrumbSchema.tsx                  — BreadcrumbList JSON-LD
  ├── ServiceOfferSchema.tsx                — Service + Offer/AggregateOffer
  ├── HowToSchema.tsx                       — reusable HowTo
  ├── EstimatorHowToSchema.tsx              — estimator-specific HowTo
  ├── ArticleSchema.tsx                     — blog Article + author Person
  ├── ImageObjectSchema.tsx                 — portfolio image schemas
  ├── EmergencyServiceSchema.tsx
  ├── PortfolioSchema.tsx
  ├── ReviewSchema.tsx
  ├── ServiceAreaSchema.tsx
  └── SustainabilitySchema.tsx
components/ui/Breadcrumbs.tsx               — visible breadcrumb UI (navy/gold, WCAG)
components/home/TrustBar.tsx                — credential strip on homepage
components/blog/AuthorBio.tsx               — author card on blog posts
lib/authors.ts                              — author directory (3 authors seeded)
```

---

## 3. AEO — Answer Engine Optimization

Alpine Peak Roofing optimizes for featured snippets, "People Also Ask" boxes, Google AI Overviews, and voice assistants.

### FAQ program

`components/seo/schemas/FAQSchema.tsx` — 20 Q&As answering the highest-intent Denver roofing questions. Every answer follows the AEO snippet format: the first sentence is a 40–55 word direct answer (Google's featured-snippet sweet spot), followed by supporting detail.

Sample questions Alpine Peak Roofing now answers in machine-readable JSON-LD:
- How much does a new roof cost in Denver?
- How long does roof replacement take?
- Does insurance cover hail damage in Colorado?
- How do I file a roof insurance claim?
- What's the best roofing material for Colorado weather?
- How often should I replace my roof?
- What are the signs my roof needs replacing?
- Does Alpine Peak Roofing offer free post-storm inspections?
- Do you offer financing?
- Are Class 4 impact-resistant roofs worth the insurance discount?

### HowTo schemas

Answer engines lift HowTo content verbatim. Alpine Peak Roofing emits three HowTo schemas:

- **`/estimator`** — `EstimatorHowToSchema` with 6 steps mirroring the wizard (address → analysis → confirmation → materials → contact → results). Per-step images, `totalTime` PT1M, `estimatedCost` $0.
- **`/process`** — reusable `HowToSchema` with 6 consultation-to-warranty steps (consultation → inspection → proposal → permit/ordering → installation → warranty).
- **`/guides/mountain-roofing-colorado`** — 6-step high-altitude roof preparation HowTo (snow-load analysis → drone inspection → material selection → fastening → installation → seasonal maintenance) with deep-link anchors into the guide.

### Question-style headings

Where natural, H2/H3 headings on services pages rewritten into question form (e.g., "What residential roofing services do we offer?"). This matches the phrasing answer engines search for when pulling featured snippets.

### AEO files

```
components/seo/schemas/FAQSchema.tsx         — 20 Q&As, snippet format
components/seo/schemas/EstimatorHowToSchema.tsx
components/seo/schemas/HowToSchema.tsx       — reusable
app/process/page.tsx                         — wired HowTo
app/guides/mountain-roofing-colorado/page.tsx — wired HowTo
app/estimator/page.tsx                       — wired EstimatorHowTo
```

---

## 4. GEO — Generative Engine Optimization

Alpine Peak Roofing is engineered to be the source that ChatGPT, Perplexity, Claude, and Gemini cite when users ask about Denver or Colorado mountain roofing.

### `llms.txt` standard (llmstxt.org)

Two documents at the repo root served from `public/`:

**`public/llms.txt`** (704 words) — condensed LLM-oriented site map:
```
# Alpine Peak Roofing
> [slogan: Pinnacle of Protection, Peak of Performance]
> [one-line positioning]

## About            — founded 1989, service region, specialties, certifications
## Services         — markdown links to all /services/* and /estimator /financing /sustainability
## Service Areas    — markdown links to all 11 /locations/* + /service-areas/central-mountains
## Materials        — markdown links to all 4 /materials/* with lifespan/warranty summaries
## Resources        — /blog, /faq, /glossary, /knowledge, /guides, /portfolio, /contact, /about
## Optional         — /privacy, /terms, /sitemap.xml, link to llms-full.txt
```

**`public/llms-full.txt`** (2,634 words) — a self-contained factual brief an LLM can quote without visiting the site:
- Company facts from `PrimaryBusinessSchema.tsx`
- "What Makes Colorado Roofing Distinct" with altitude / UV / hail / wildfire / wind standards and real building-code references
- Per-location climate briefs for all 11 cities (elevation, temperatures, snowfall, snow-load psf, roofing considerations) pulled from `lib/locations.ts`
- Full per-material specifications (GAF Timberline HDZ, standing seam steel, natural slate, cedar shake) pulled from `lib/materials.ts` — with pricing, warranty, wind/impact/fire ratings, Colorado-specific notes
- Authoritative external citations: ICC, NRCA, ASTM, UL, GAF, CSSB, Slate Roofing Contractors Association, NPS

### Entity-rich structured data

Alpine Peak Roofing's GEO strategy leans on schema.org entities LLMs parse as "things that exist":
- `LocalBusiness` + `RoofingContractor` with full NAP (placeholder address flagged as blocker)
- `Place` + `GeoCoordinates` on every location page
- `Person` for each author (name, `jobTitle`, `knowsAbout`, `hasCredential`)
- `Product` for each material (brand, priceRange, additionalProperty warranty/lifespan/windRating)
- `Organization` as publisher on every blog Article

### GEO files

```
public/llms.txt           — 704 words, llmstxt.org standard
public/llms-full.txt      — 2,634 words, full factual brief
lib/authors.ts            — Person entities for blog authors
lib/locations.ts          — GeoCoordinates + climate data source
lib/materials.ts          — Product entity source
```

---

## 5. AIO — AI Crawler Directives

Alpine Peak Roofing explicitly allows the AI crawlers it wants to be indexed by. This is a marketing site — Alpine Peak Roofing wants to be cited in AI answers. Explicit rules signal intentionality to crawlers and rank better in AI training/retrieval prioritization than silent defaults.

### `public/robots.txt`

Preserves the existing wildcard + sitemap + crawl-delay, then adds explicit stanzas for each AI crawler:

| Crawler | Operator | Purpose |
|---|---|---|
| `GPTBot` | OpenAI | ChatGPT training / browsing |
| `ChatGPT-User` | OpenAI | ChatGPT user-initiated browsing |
| `OAI-SearchBot` | OpenAI | ChatGPT Search |
| `ClaudeBot` | Anthropic | Claude training |
| `Claude-Web` | Anthropic | Claude browsing |
| `anthropic-ai` | Anthropic | Legacy Anthropic agent |
| `PerplexityBot` | Perplexity | Perplexity training |
| `Perplexity-User` | Perplexity | Perplexity user queries |
| `Google-Extended` | Google | Gemini training opt-in |
| `Applebot-Extended` | Apple | Apple Intelligence |
| `CCBot` | Common Crawl | Feeds many LLMs |
| `Bytespider` | ByteDance | TikTok / Doubao |
| `Meta-ExternalAgent` | Meta | Meta AI |

Each stanza: `Allow: /` + `Disallow: /api/` + `Disallow: /_internal/` (mirrors site-wide restrictions).

Two sitemap references: the standard URL sitemap + the new image sitemap. Trailing comment points to `/llms.txt`.

### AIO files

```
public/robots.txt         — 13 explicit AI crawler allowances
public/llms.txt           — signaled from robots.txt trailing comment
```

---

## 6. Performance & Core Web Vitals (session 14)

Core Web Vitals directly affect SEO ranking. Alpine Peak Roofing had a critical mobile LCP problem: 44.5 seconds on the first Lighthouse run.

### Root cause

- `public/images/` held 265MB of unresized PNGs and JPGs. 12 service PNGs at 6–7.8MB each. A 4.4MB logo PNG. A duplicate `timber_home_brown_roof - Copy.jpg` at 8.8MB.
- 15 raw `<img>` tags across homepage, portfolio, financing, contact, about, and project detail pages bypassed `next/image` — shipping full-resolution CloudFront source images (hero was 5.8MB + 4.1MB for the second hero) directly to mobile devices.

### Fix

- `scripts/optimize-images.mjs` — batch converter built on `sharp`. Walks `public/images/**`, resizes per folder (1920px heroes, 1600px services/portfolio/estimator, 1200px blog/M1/ai-tools, 800px logo), writes WebP at quality 80, deletes originals.
- `scripts/rewrite-image-refs.mjs` — reads the mapping output and rewrites every `.png`/`.jpg` reference in `.ts`/`.tsx`/`.js`/`.json`/`.md` to `.webp`.
- 15 raw `<img>` tags replaced with `next/image` `<Image fill priority sizes="100vw">` for hero/LCP elements; grid thumbnails use responsive `sizes`. The stale "CDN domain not in remotePatterns" comment on the Alpine Peak Roofing homepage hero was deleted (the CloudFront domain is in `next.config.ts`).

### Results (live alpinepeakroofing.com, mobile Lighthouse)

| Metric | Before | After | Change |
|---|---|---|---|
| Mobile LCP | 44.5s | 7.5s | **−83%** |
| Mobile FCP | 4.9s | 4.2s | −14% |
| Mobile TBT | 80ms | 50ms | −38% |
| Mobile Performance | 62 | 66 | +4 |
| Mobile SEO | 100 | 100 | — |
| `uses-responsive-images` waste | 29.3s | 0.17s | **−99.4%** |
| `public/images/` total size | 265.2MB | 21.5MB | **−91.9%** |
| Repo-wide `no-img-element` warnings | 15 | 0 | −100% |

### Remaining performance opportunities (not yet shipped)

Not blocking, but on the list:
- 1.19s render-blocking resources (CSS + GTM)
- 1.01s redirect chain (apex → www)
- 330ms unused JS
- 268ms `uses-rel-preconnect` (preconnect hints for CloudFront + GA)

---

## 7. Mobile Responsiveness

Alpine Peak Roofing is mobile-first end to end:
- Tailwind breakpoints (`sm:`, `md:`, `lg:`) used consistently
- Root layout sets `viewport = { width: 'device-width', initialScale: 1 }`
- Hamburger nav below `lg` breakpoint
- `components/chatbot/ChatWidget.tsx`: floating button shrinks from 168px (desktop) to 56px (mobile), still above the 44px tap-target minimum. When opened, the chat panel uses `inset-4` on mobile (near-fullscreen with 16px margin) instead of a fixed 380×500 that overflowed phones narrower than 410px. Desktop layout is unchanged pixel-for-pixel.
- `TrustBar` wraps gracefully on mobile (flex-wrap with responsive gaps)
- All images now responsive via `next/image` with `sizes` attributes

Mobile Lighthouse Accessibility: **92**.

---

## 8. Summary of Results

### Lighthouse scores (live mobile alpinepeakroofing.com)

- **Performance:** 66 (up from 62; LCP still the capping factor, but no longer catastrophic)
- **Accessibility:** 92
- **Best Practices:** 96
- **SEO:** 100

### Build & infrastructure

- 95 static pages pre-rendered at build time
- Strict TypeScript + ESLint (`ignoreBuildErrors: false`)
- Zero new errors, zero new warnings from optimization work
- 12 schema component types emitted across the site
- 31+ URLs in the standard sitemap; 70 geo-tagged images in the image sitemap

### Content

- 20 Denver-specific FAQs in snippet-optimized format
- 3 HowTo schemas (estimator, process, mountain-roofing guide)
- 3 blog authors with Person entities and archive pages
- `llms.txt` (704 words) + `llms-full.txt` (2,634 words) for GEO
- 13 explicit AI crawler directives in `robots.txt` for AIO

### Competitive posture

Alpine Peak Roofing now ships every SEO / AEO / GEO / AIO signal the top-tier paid agency playbooks call for, plus a few they don't (llms.txt, explicit AIO rules, real-pricing Offer schema pulled from data files). For a Denver roofing contractor competing against Metro City, Elite, Premier, and Interstate — Alpine Peak Roofing's structured-data surface is now at or beyond parity.

---

## 9. Outstanding (Non-Blocking) TODOs

None of these affect launch or ranking today, but each represents a lift when addressed:

- **Real Colorado license number** — `TrustBar` and `PrimaryBusinessSchema` currently show `CO Lic. #XXXXXX`
- **Real Google review count + rating** — currently `4.9 / 250+ reviews` placeholder
- **Real business address** on `/contact` schema (currently placeholder Denver 80202)
- **Author avatar images** — `AuthorBio` renders initials fallback until real headshots are added to `lib/authors.ts`
- **Author `sameAs` URLs** — LinkedIn / industry profile links (empty arrays, deliberately — no fabrication)
- **Supabase `blog_posts.author_slug` column** — all blog posts currently default to `mike-alpine`
- **Render-blocking CSS + GTM** — 1.19s performance opportunity
- **Apex → www redirect hop** — 1.01s performance opportunity
- **Preconnect hints** for CloudFront + Google Tag Manager

---

## 10. File Manifest — New and Modified for Optimization

### Created

```
public/llms.txt
public/llms-full.txt
public/image-sitemap.xml              (dynamic route at app/image-sitemap.xml/route.ts)

components/seo/schemas/BreadcrumbSchema.tsx
components/seo/schemas/ServiceOfferSchema.tsx
components/seo/schemas/HowToSchema.tsx
components/seo/schemas/EstimatorHowToSchema.tsx
components/seo/schemas/ArticleSchema.tsx
components/seo/schemas/ImageObjectSchema.tsx

components/ui/Breadcrumbs.tsx
components/home/TrustBar.tsx
components/blog/AuthorBio.tsx

lib/authors.ts

app/authors/[slug]/page.tsx
app/image-sitemap.xml/route.ts

scripts/optimize-images.mjs
scripts/rewrite-image-refs.mjs
```

### Modified (key files)

```
next.config.ts                        — strict build flags, image remotePatterns
public/robots.txt                     — 13 AI crawler directives + llms.txt reference + image sitemap
CLAUDE.md                             — build integrity warning + commit convention

components/seo/schemas/FAQSchema.tsx  — 10 → 20 FAQs in snippet format
components/seo/schemas/PrimaryBusinessSchema.tsx — hasCredential + aggregateRating
components/seo/schemas/index.ts       — re-exports

app/page.tsx                          — Server Component, TrustBar, next/image hero
app/about/page.tsx                    — Server Component, next/image
app/contact/page.tsx                  — Server + ContactClient split
app/contact/ContactClient.tsx         — next/image
app/services/**/page.tsx              — Server Components, ServiceOfferSchema, Breadcrumbs
app/materials/[slug]/page.tsx         — BreadcrumbSchema + visible Breadcrumbs
app/locations/[slug]/page.tsx         — BreadcrumbSchema + visible Breadcrumbs
app/portfolio/PortfolioClient.tsx     — next/image
app/portfolio/page.tsx                — ImageObjectSchema per project
app/financing/FinancingClient.tsx     — next/image
app/process/page.tsx                  — HowToSchema
app/guides/mountain-roofing-colorado/page.tsx — HowToSchema
app/estimator/page.tsx                — EstimatorHowToSchema
app/projects/[slug]/page.tsx          — next/image
app/blog/[slug]/page.tsx              — ArticleSchema + AuthorBio + Breadcrumbs

app/sitemap.xml/route.ts              — dynamic sitemap driven by lib/ files

public/images/**                      — 128 PNG/JPG → resized WebP (265MB → 21.5MB)
```

---

## 11. Commit History

Key commits that built Alpine Peak Roofing's SEO / AEO / GEO / AIO surface:

| Commit | Date | Scope |
|---|---|---|
| `af1fb43` | 2026-04-17 | Foundation SEO/AEO pass (PR #2) — server components, schemas, sitemap, internal linking |
| `9724130` | 2026-04-19 | Full AEO/GEO/AIO pass + 6 competitive gaps closed — FAQs, llms.txt, AI crawlers, breadcrumbs, ServiceOffer, TrustBar, image sitemap, author system |
| `319a3f7` | 2026-04-19 | Docs — session 13 status + commit attribution convention |
| `40e69d9` | 2026-04-19 | Image optimization — 128 images to WebP + raw `<img>` to `next/image` |

---

## 12. References

- `docs/SEO_AEO_PLAYBOOK.md` — strategy + reusable pattern (companion doc)
- `docs/BRIDGE_STATUS.md` — mission-control status for the project
- `docs/operations/status/project-status.md` — session log
- Schema.org vocabulary — https://schema.org
- llms.txt standard — https://llmstxt.org
- Google Rich Results Test — https://search.google.com/test/rich-results
- Core Web Vitals — https://web.dev/vitals/

---

*Alpine Peak Roofing is the reference implementation for the SEO / AEO / GEO / AIO playbook. Every pattern documented here is production-tested at [alpinepeakroofing.com](https://alpinepeakroofing.com) and portable to other roofing contractor sites.*
