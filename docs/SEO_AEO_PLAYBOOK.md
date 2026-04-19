# Roofing Contractor Site — SEO / AEO / GEO Playbook

> **Alpine Peak Roofing is the keystone reference implementation.** This document captures the strategy, the specific changes, and the reusable pattern so the same build can be applied to other roofing contractor sites.

**Origin pass:** 2026-04-17 — single-day rebuild across parallel Sonnet 4.6 agents
**Result:** Lighthouse SEO 100, Accessibility 92, every page crawlable HTML, 91 routes building clean under strict TS/ESLint
**Reference repo:** github.com/Agentic-Person/alpine-peak-roofing

---

## 1. Why this strategy exists

An outside SEO agency told the client the site needed a full rewrite to rank. They were wrong about the fix but right about the symptom: the site was shipping empty HTML shells to crawlers because the main pages started with `"use client"`.

The real question wasn't "which framework." Next.js 15 App Router is already one of the best SEO/AEO stacks available. The question was: **are we actually using it the way it was designed?**

### SEO vs AEO vs GEO — and why this site prioritizes AEO

- **SEO** (Search Engine Optimization) — ranking in Google / Bing search results. Mature discipline. Google can execute JavaScript, so client-rendered content eventually gets indexed, just less reliably.
- **AEO** (Answer Engine Optimization) — surfacing inside ChatGPT, Perplexity, Claude, and Google AI Overviews. Most of these crawlers **do not execute JavaScript** or execute it poorly. If your content isn't in the initial HTML response, it doesn't exist to them.
- **GEO** (Generative Engine Optimization) — getting cited as a source inside generated answers. Requires AEO-level HTML plus structured data (schema.org JSON-LD) that answer engines use to identify authoritative sources.

For a roofing contractor, AEO is the higher-leverage bet right now. When someone asks ChatGPT "who does roofing in Aspen," the site that ships clean HTML with `RoofingContractor` schema gets cited. The site that ships a JavaScript bundle does not.

### Why Next.js 15 is the right foundation for AEO

- **Server Components render full HTML on the server** — no hydration needed for content
- `generateMetadata()` gives unique title/description/canonical/OG per route
- `generateStaticParams()` pre-renders dynamic `[slug]` routes into static files at build time
- Built-in sitemap, robots, and JSON-LD support
- `next/image` handles Core Web Vitals (LCP, CLS) automatically
- Islands pattern (`"use client"` on small child components) keeps animations without sacrificing HTML output

**The rule:** a page file (`app/*/page.tsx`) should almost never start with `"use client"`. Interactivity belongs in small child components — islands — that the server page imports.

---

## 2. The ten-move strategy

Every roofing contractor site gets the same ten moves, in this order:

| # | Move | Why it matters |
|---|---|---|
| 1 | **Fix the build** — flip `ignoreBuildErrors` + `ignoreDuringBuilds` to `false` in `next.config.ts` | You can't trust SEO work if TS/lint errors are silenced and something subtly broken slips through |
| 2 | **Strip `"use client"` from main pages** — homepage, about, services, process, materials, locations, contact, portfolio, financing | Makes content visible to AEO crawlers in initial HTML |
| 3 | **Extract interactive bits into islands** — Framer Motion, useState, onClick, useEffect → `components/{route}/islands/*.tsx` | Keeps the page server-rendered while preserving UX |
| 4 | **Add `generateMetadata()` per route** — unique title, description, canonical, OG, Twitter | Per-page metadata is table-stakes for both SEO and social sharing |
| 5 | **Add `generateStaticParams()` to `[slug]` routes** — materials, locations, service subpages | Pre-renders every permutation at build time; CDN serves static HTML |
| 6 | **Emit per-page JSON-LD schema** — see the schema matrix below | Answer engines weight structured data heavily; this is how you get *cited* not just read |
| 7 | **Kill duplicate pages** — any `/about-seo`, `/services-seo`, `/process-seo` folders get merged back into originals and deleted | Duplicate content hurts rankings and confuses crawlers |
| 8 | **Expand the sitemap** — every public URL, using data files (`lib/materials.ts`, `lib/locations.ts`) as source of truth | Crawlers need to know what exists; dynamic sitemap pulls from the same data that generates the pages |
| 9 | **Internal linking matrix** — each `/locations/[city]` links to `/services/*` and `/materials/*` | Classic local-SEO play: city × service cross-linking signals topical authority |
| 10 | **`next/image` everywhere** — with proper `sizes`, `priority` on LCP, CDN hostname whitelisted in `remotePatterns` | Core Web Vitals directly affect ranking; lazy loading + WebP conversion is free |

---

## 3. Schema type matrix

Which schema to emit on which page. These are the minimum viable set for a roofing contractor site — more is fine, less leaves AEO value on the table.

| Page | Primary schema | Secondary | Notes |
|---|---|---|---|
| `/` (homepage) | `LocalBusiness` + `RoofingContractor` | `WebPage`, `Organization` | Global root-layout schemas already cover Organization — page-level adds WebPage |
| `/about` | `AboutPage` | `Organization` | Include founding date, founders, mission |
| `/services` (index) | `ItemList` | `BreadcrumbList` | Each item references a service detail page |
| `/services/residential`, `/services/commercial`, `/services/storm-damage` | `Service` | `BreadcrumbList` | `serviceType`, `provider`, `areaServed` |
| `/services/*/[slug]` | `Service` | `FAQPage`, `Review`, `BreadcrumbList` | FAQ is gold for AEO — answer engines lift these verbatim |
| `/process` | **`HowTo`** with `HowToStep` array | `BreadcrumbList` | HowTo is AEO gold — directly answers "how does a roof replacement work" |
| `/materials` (index) | `ItemList` | `BreadcrumbList` | |
| `/materials/[slug]` | `Product` | `BreadcrumbList` | `brand`, `category`, `material`, `offers` (AggregateOffer + UnitPriceSpecification), `additionalProperty` (warranty, lifespan, wind rating) |
| `/locations` (index) | `ItemList` | `BreadcrumbList` | |
| `/locations/[slug]` | `RoofingContractor` | `Place`, `GeoCoordinates`, `BreadcrumbList` | Include city elevation, service area, local phone if available |
| `/portfolio` | `CollectionPage` | `CreativeWork` array via `hasPart` | Each project = CreativeWork with name, image, dateCreated |
| `/financing` | `FinancialProduct` (one per plan) | `WebPage` | Include provider, rate, loan terms |
| `/contact` | `ContactPage` + `RoofingContractor` | — | Full `contactPoint` array (customer service + 24/7 emergency), `openingHoursSpecification`, `areaServed` |
| `/investment-analysis`, `/guides/*` | `Article` | `BreadcrumbList` | author = Organization, include dateModified |
| `/blog/[slug]` | `BlogPosting` | `BreadcrumbList` | headline, datePublished, dateModified, author, publisher, mainEntityOfPage, keywords |
| `/faq` | `FAQPage` | — | Each Q&A = `Question` + `Answer` entities |

**Global schemas** (emitted once in root layout, apply to all pages): `Organization`, `LocalBusiness`, `WebSite` with `SearchAction`.

---

## 4. The page pattern (copy-paste ready)

Every server page follows this skeleton:

```tsx
// app/{route}/page.tsx — NO "use client" at the top
import type { Metadata } from 'next';
import { SomeIsland } from '@/components/{route}/islands/SomeIsland';

export const metadata: Metadata = {
  title: 'Unique Title — Company Name',
  description: 'Concrete description with keywords and location.',
  alternates: { canonical: 'https://yoursite.com/route' },
  openGraph: {
    title: 'Unique Title',
    description: 'Concrete description.',
    url: 'https://yoursite.com/route',
    type: 'website',
    images: [{ url: '...', width: 1200, height: 630 }],
  },
  twitter: { card: 'summary_large_image', title: '...', description: '...' },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Service',
          // ... schema fields
        }) }}
      />
      <main>
        <h1>Exactly one H1</h1>
        <section>
          {/* Static content — renders in initial HTML */}
        </section>
        <SomeIsland /> {/* Interactive bits only */}
      </main>
    </>
  );
}
```

### Dynamic route pattern (Next.js 15 params Promise)

```tsx
// app/materials/[slug]/page.tsx
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { materials, getMaterialBySlug } from '@/lib/materials';

export async function generateStaticParams() {
  return materials.map(m => ({ slug: m.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const material = getMaterialBySlug(slug);
  if (!material) return {};
  return {
    title: `${material.name} Roofing — Company Name`,
    description: material.seoDescription,
    alternates: { canonical: `https://yoursite.com/materials/${slug}` },
  };
}

export default async function Page(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const material = getMaterialBySlug(slug);
  if (!material) notFound();
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Product',
          name: material.name,
          // ...
        })
      }} />
      <article>
        <h1>{material.name}</h1>
        {/* Static detail sections */}
      </article>
    </>
  );
}
```

### Client island pattern

```tsx
// components/{route}/islands/SomeIsland.tsx
'use client';
import { motion } from 'framer-motion';
import { useState } from 'react';

export function SomeIsland({ initialData }: { initialData: SomeType }) {
  const [state, setState] = useState(initialData);
  return <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>{/* ... */}</motion.div>;
}
```

Rules for islands:
- One `"use client"` at the top — don't pepper it across the tree
- Keep them small and focused (one animated grid, one calculator, one accordion)
- Pass server-fetched data in as props; don't re-fetch client-side
- Data types that include functions (e.g., icon components) **must** be mapped inside the island, not passed across the server→client boundary — this is a real error Next.js 15 will throw at build time

### Server-wrapper-client pattern (for heavily interactive pages)

When a page is dominated by interactivity (calculator, form wizard, contact page with complex state), don't extract every piece — do the wrapper split:

```tsx
// app/contact/page.tsx — Server Component with metadata
import ContactClient from './ContactClient';
export const metadata: Metadata = { /* ... */ };
export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <ContactClient />
    </>
  );
}

// app/contact/ContactClient.tsx — unchanged client code
'use client';
export default function ContactClient() { /* full existing UI */ }
```

You get per-page metadata + schema without rewriting the interactive page. Lower AEO ceiling than full SSR but still passes canonical + structured data.

---

## 5. Orchestration pattern (parallel agents)

How this was executed in one day:

```
Wave 1 (serial, 1 agent)        — Foundation: strict flags, fix TS errors, remove dead deps
     ↓
Wave 2 (parallel, 5 agents)     — One agent per page slice, disjoint file ownership:
     ├── 2a: homepage + about
     ├── 2b: services (all subpages)
     ├── 2c: process + materials
     ├── 2d: locations + service-areas
     └── 2e: global (sitemap, blog schema, canonical audit on standalone pages)
     ↓
Wave 2f (serial, 1 agent)       — Server-wrapper split for remaining client-only pages
Wave 9 (parallel, 1 agent)      — CloudFront CDN config + next/image sweep
     ↓
Wave 3 (serial, 1 agent)        — Final build, typecheck, lint, crawl verification, Lighthouse
```

**Key discipline for parallelism:** each agent owns a strict, non-overlapping file scope. When two agents would touch the same file (e.g., canonical audit vs page SSR conversion), route both changes to the same agent or sequence them.

**Verification per agent:** `npx tsc --noEmit` (safe to run in parallel — no .next writes). Only the final Wave 3 agent runs `npm run build` (concurrent .next writes would clobber each other).

---

## 6. Verification checklist

Before declaring a roofing site "AEO-ready," run these:

### Automated
- [ ] `npm run build` passes with `ignoreBuildErrors: false` and `ignoreDuringBuilds: false`
- [ ] `npx tsc --noEmit` returns zero errors
- [ ] `npm run lint` returns zero errors (warnings OK for legacy code)
- [ ] Lighthouse SEO score ≥ 95
- [ ] Lighthouse Accessibility ≥ 90

### Manual crawl check
For each of these routes, `curl -s https://yoursite.com/{route}` and verify the response body contains:
- The expected visible text (city name on a location page, material name on a material page, etc.) — **not** an empty React shell
- At least one `<script type="application/ld+json">` block
- Exactly one `<h1>` tag

Routes: `/`, `/about`, `/services`, `/services/residential`, `/services/commercial`, `/services/storm-damage`, `/process`, `/materials`, `/materials/{any-slug}`, `/locations`, `/locations/{any-city}`, `/portfolio`, `/contact`, `/blog`, `/sitemap.xml`

### Schema validation
- Use [Google Rich Results Test](https://search.google.com/test/rich-results) on 5 key routes (homepage, a service, a material, a location, a blog post)
- Paste into [Schema.org Validator](https://validator.schema.org/) for plain-JSON-LD validation

### Sitemap sanity
- `/sitemap.xml` returns valid XML
- Contains every public route (count should match expectation — 30+ for a typical roofer with 5-10 locations)
- All URLs use the canonical host (no mix of `www` and apex, no http)

---

## 7. Common pitfalls

Things that look right but are wrong:

1. **Passing icon components across the server→client boundary.** `<ServicesGrid services={[{ icon: Home, ... }]} />` throws at build time when `ServicesGrid` is a client component and `Home` is a Lucide icon. Fix: move the icon map inside the island, key by string.

2. **`next/image` with `unoptimized` as a workaround.** If you're reaching for `unoptimized`, you're probably missing a hostname in `next.config.ts` `images.remotePatterns`. Add the hostname instead.

3. **Hardcoded business address in schema when you don't have one.** Use a placeholder and **flag it as a blocker in BRIDGE_STATUS.md** — don't let a Denver-90210-style fake address go to production.

4. **`alternates.canonical` set on every page but pointing to the homepage.** A canonical should point to itself (or to the consolidated version when intentionally de-duplicating). Self-canonical is the default for unique pages.

5. **Duplicate `-seo` page folders.** If you inherit a repo with `/about-seo` next to `/about`, delete the duplicate after merging unique copy — don't leave both indexable.

6. **Dynamic routes without `generateStaticParams()`.** These become server-rendered at request time instead of static HTML at build time — slower TTFB, more cost, worse CWV. If your data is known at build time, pre-render it.

7. **`'use client'` at the top of a page just because one child is interactive.** Reverse it: server page imports an island. If the whole page is a wizard, use the server-wrapper-client pattern instead.

8. **HowTo schema on a service page instead of the process page.** HowTo belongs on `/process` — it describes *how the work is done*. Service schema goes on service pages.

9. **Root-layout schemas treated as a substitute for per-page schemas.** Global `LocalBusiness` in the layout covers the brand. Per-page `Service`, `Product`, `LocalBusiness` with location-specific data covers the *topic*. You need both.

10. **Changing `ignoreBuildErrors` back to `true` to unblock a deploy.** Fix the error. There is always a root cause and it's usually small.

---

## 8. Applying this to a new roofing contractor site

Minimum viable port, assuming a Next.js 15 codebase:

1. **Audit**: grep for `"use client"` at the top of `app/*/page.tsx` files. Every match is a candidate for conversion.
2. **Audit data layer**: every roofing site has materials and locations. Identify the `lib/*.ts` file that holds them (or create one from hardcoded arrays).
3. **Apply the ten moves** in order. Moves 1-3 have to happen before 4-10 because strict builds catch everything after.
4. **Port schema emissions** using the matrix above. Most schemas can be copy-pasted and only the business data changes.
5. **Run the verification checklist.** Don't skip the manual curl crawl — automated tools will miss client-render issues that crawlers would hit.
6. **Keep a BRIDGE_STATUS.md-style mission-control doc** to track blockers, especially missing API keys (Google Maps, Google Solar) and Supabase tables.

**Per-site customization needed:**
- Business identity (name, phone, address, service area) in root-layout `LocalBusiness` schema
- Location list in `lib/locations.ts`
- Material catalog in `lib/materials.ts`
- Service catalog in `lib/servicesData.ts` (or equivalent)
- Canonical host in every `alternates.canonical` and in sitemap
- Image CDN hostname in `next.config.ts` `remotePatterns`
- Brand colors / fonts in Tailwind config and `app/globals.css`

**Per-site customization NOT needed:**
- The page pattern (server + islands + schema) — identical everywhere
- The sitemap route logic — parameterize by URL + data files
- The schema type matrix — identical; only the values change
- The verification checklist — identical

---

## 9. What "done" looks like (Alpine Peak result)

- **Build:** 91 routes, strict TS/ESLint enforced, clean pass
- **Static pre-rendering:** 47 static routes + 4 SSG groups (materials × 4 slugs, locations × 12 slugs, services/residential × N, services/commercial × N)
- **Lighthouse (localhost):** SEO 100, Accessibility 92, Performance 66 (localhost-limited by CDN-404s; real production score pending)
- **Sitemap:** 31 static URLs + dynamic blog posts
- **Schemas emitted:** LocalBusiness, RoofingContractor, AboutPage, Service, Product, HowTo, Place, BreadcrumbList, ItemList, CollectionPage, FinancialProduct, ContactPage, BlogPosting, FAQPage, Article, WebPage, CreativeWork
- **Duplicate content:** eliminated (`/about-seo`, `/services-seo`, `/process-seo` deleted)
- **Internal linking:** every location → services + materials (cross-linked for local SEO)
- **Every page:** unique metadata, self-canonical, semantic H1, content in initial HTML

---

## 10. References

- Next.js App Router docs — https://nextjs.org/docs/app
- Schema.org vocabulary — https://schema.org
- Google Rich Results Test — https://search.google.com/test/rich-results
- Lighthouse — https://developer.chrome.com/docs/lighthouse/
- JSON-LD validation — https://validator.schema.org/
- Core Web Vitals — https://web.dev/vitals/

---

*This playbook is a living document. When the pattern evolves — new Next.js features, new schema types, new AEO crawlers — update it here first, then propagate to client sites.*
