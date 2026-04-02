# Roof Scan Estimator Tool — Technical Specification

> **Project:** Alpine Peak Roofing (APR) Website
> **Stack:** Next.js 14 App Router, TypeScript, Tailwind CSS, Zustand, Supabase, Resend
> **Last updated:** April 2, 2026

This document is the complete technical reference for APR's satellite-powered roof estimator tool. It covers every component, API route, data structure, calculation formula, email template, and integration point. It is written for another agent or developer to fully understand how this implementation works and compare it against alternative approaches.

---

## Table of Contents

1. [Overview](#1-overview)
2. [User Flow](#2-user-flow)
3. [File Structure](#3-file-structure)
4. [Entry Points — Modal & Navigation](#4-entry-points--modal--navigation)
5. [State Management — Zustand Store](#5-state-management--zustand-store)
6. [Step 1: Address Entry](#6-step-1-address-entry)
7. [Step 2: Confirmation & Email Gate](#7-step-2-confirmation--email-gate)
8. [Step 3: Material Selection](#8-step-3-material-selection)
9. [Step 4: Contact Information](#9-step-4-contact-information)
10. [Step 5: Results & Delivery](#10-step-5-results--delivery)
11. [API Route — Roof Analysis](#11-api-route--roof-analysis)
12. [API Route — Calculate Estimate](#12-api-route--calculate-estimate)
13. [API Route — Generate PDF / Send Email](#13-api-route--generate-pdf--send-email)
14. [API Route — Lead Capture](#14-api-route--lead-capture)
15. [Pricing Model & Calculation Formulas](#15-pricing-model--calculation-formulas)
16. [Data Structures / TypeScript Interfaces](#16-data-structures--typescript-interfaces)
17. [Email Templates](#17-email-templates)
18. [Lead Pipeline (Post-Estimate)](#18-lead-pipeline-post-estimate)
19. [Third-Party Integrations](#19-third-party-integrations)
20. [Environment Variables](#20-environment-variables)
21. [Known Limitations & Gaps](#21-known-limitations--gaps)
22. [Shareable Estimate Page](#22-shareable-estimate-page)
23. [Development vs Production Behavior](#23-development-vs-production-behavior)

---

## 1. Overview

The estimator is a fully custom-built, end-to-end roof estimation system. There are **no third-party iframes, embeds, or external services** like Roofle, InstantRoofer, or similar tools. Everything — address input, satellite measurement, material pricing, cost calculation, estimate delivery, and CRM persistence — runs inside the Next.js application.

**What it does:**
1. User enters a street address
2. System geocodes it and pulls roof measurements (Google Solar API or deterministic heuristic fallback)
3. User sees their property on a satellite/map view and verifies it's correct
4. User enters their email (gate — required to continue)
5. User picks a roofing material from 5 options with live pricing
6. User provides name, phone (optional), and project timeline
7. System calculates a fully itemized estimate (materials, labor, permits, tax, financing)
8. Estimate is persisted to Supabase, emailed to the user, and team is alerted

**What it produces:**
- On-screen itemized estimate with cost breakdown
- Branded HTML email with the full estimate, timeline, and financing options
- Shareable web page at `/estimates/[id]` with print-to-PDF capability
- Supabase CRM records (leads table + roof_estimates table)
- Team alerts: email notification, SMS, and optional AI outbound call via ElevenLabs

---

## 2. User Flow

```
┌─────────────────────────────────────────────────────────────────┐
│  WEBSITE (any page)                                             │
│  User clicks "Get Your Estimate" in nav                         │
│          ↓                                                      │
│  ┌─────────────────────────────────────────┐                    │
│  │  RoofEstimateModal                      │                    │
│  │  - 5-step auto-advancing carousel       │                    │
│  │  - Address input (no email required)    │                    │
│  │  - "Analyze My Roof" button             │                    │
│  │  - GA4 event: estimate_address_entry    │                    │
│  └─────────┬───────────────────────────────┘                    │
│            │ Opens /estimator?address=<encoded> in new tab       │
└────────────┼────────────────────────────────────────────────────┘
             ↓
┌─────────────────────────────────────────────────────────────────┐
│  /estimator PAGE                                                │
│                                                                 │
│  AddressAutoAnalyzer reads ?address= param                      │
│  → POST /api/webhooks/roof-analysis                             │
│  → Sets measurements in Zustand store                           │
│  → Skips to Step 2 (confirmation)                               │
│                                                                 │
│  ┌─── EstimatorWizard (5 steps) ──────────────────────────────┐ │
│  │                                                             │ │
│  │  Step 1: ADDRESS (skipped if ?address= provided)            │ │
│  │  - Text input for street address                            │ │
│  │  - Placeholder address suggestions (not Google Places)      │ │
│  │  - Min 10 chars to enable button                            │ │
│  │  - Calls POST /api/webhooks/roof-analysis                   │ │
│  │                    ↓                                        │ │
│  │  Step 2: CONFIRMATION + EMAIL GATE                          │ │
│  │  - Google Maps satellite embed (zoom 19) or OSM fallback    │ │
│  │  - Roof measurements displayed:                             │ │
│  │    • Total area (sq ft + sq meters)                         │ │
│  │    • Pitch ratio (e.g. 6/12) + degrees + category           │ │
│  │    • Ridge lines (ft) + segment count                       │ │
│  │    • Valley lines (ft) if present                           │ │
│  │    • Complexity multiplier                                  │ │
│  │    • Confidence score (0-100%)                              │ │
│  │  - ★ EMAIL INPUT (required to proceed)                     │ │
│  │  - Fires POST /api/leads/capture (non-blocking)             │ │
│  │  - GA4 event: estimate_email_collected                      │ │
│  │  - Stores email in Zustand contactInfo.email                │ │
│  │                    ↓                                        │ │
│  │  Step 3: MATERIALS                                          │ │
│  │  - 2 category tabs: Asphalt Shingles / Metal Roofing        │ │
│  │  - 5 material cards with:                                   │ │
│  │    • Name, description, features list                       │ │
│  │    • Estimated total cost for this roof                     │ │
│  │    • Cost per sq ft                                         │ │
│  │    • Warranty period                                        │ │
│  │    • "POPULAR" badge on 30-year shingles                    │ │
│  │  - Selected material preview bar (blue gradient)            │ │
│  │  - Roof summary bar showing area, pitch, complexity         │ │
│  │                    ↓                                        │ │
│  │  Step 4: CONTACT                                            │ │
│  │  - First name (required)                                    │ │
│  │  - Last name (required)                                     │ │
│  │  - Email (pre-filled from step 2, required)                 │ │
│  │  - Phone with (XXX) XXX-XXXX mask (optional)                │ │
│  │  - Project timeline (4 radio options)                       │ │
│  │  - Privacy notice                                           │ │
│  │                    ↓                                        │ │
│  │  Step 5: RESULTS                                            │ │
│  │  - 6-step animated progress indicator                       │ │
│  │  - POST /api/webhooks/calculate-estimate                    │ │
│  │  - POST /api/webhooks/generate-pdf                          │ │
│  │  - Displays: total, cost/sqft, material/labor/tax breakdown │ │
│  │  - "Email delivered" confirmation badge                     │ │
│  │  - CTA: Call now / Download PDF / Start over                │ │
│  │  - "What Happens Next" 3-step guide                         │ │
│  │  - 30-day validity disclaimer                               │ │
│  └─────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
```

---

## 3. File Structure

```
agents/roof-estimator-agent/
├── components/
│   ├── EstimatorWizard.tsx              — Orchestrates 5 wizard steps with AnimatePresence transitions
│   ├── shared/
│   │   ├── LoadingSpinner.tsx           — Reusable spinner (sm/md/lg/xl, blue/white/gray)
│   │   └── ProgressIndicator.tsx        — Step progress bar + numbered circles + labels
│   └── steps/
│       ├── AddressStep.tsx              — Address input with placeholder suggestions
│       ├── ConfirmationStep.tsx          — Map view + measurements + email gate
│       ├── MaterialsStep.tsx            — Material selection with pricing cards
│       ├── ContactStep.tsx              — Contact form (name, phone, timeline)
│       └── ResultsStep.tsx              — Estimate generation + delivery + display
├── store/
│   └── useEstimatorStore.ts             — Zustand store with devtools middleware
└── lib/
    └── api.ts                           — Client-side API functions + material pricing data

components/estimator/
├── RoofEstimateModal.tsx                — Nav-triggered modal with carousel + address input
├── AddressAutoAnalyzer.tsx              — URL param reader → auto-triggers analysis
├── EstimateModalContext.tsx             — React context for modal open/close state
└── EstimatorCarousel.tsx                — 5-step "how it works" auto-advancing carousel

app/estimator/
└── page.tsx                             — Estimator page layout (header + carousel + wizard + footer)

app/estimates/[id]/
└── page.tsx                             — Shareable estimate page with print-to-PDF

app/api/webhooks/
├── roof-analysis/route.ts               — Address → roof measurements (Google Solar or heuristic)
├── calculate-estimate/route.ts          — Measurements + material → itemized cost breakdown
└── generate-pdf/route.ts               — Builds email HTML, sends via Resend, upserts CRM lead

app/api/leads/
└── capture/route.ts                     — Email capture → Supabase + welcome email + alerts

lib/
├── email/
│   ├── index.ts                         — Email sending functions (Resend wrapper)
│   └── templates.ts                     — HTML email template builders
└── alerts/
    └── index.ts                         — Multi-channel alert orchestrator (SMS + Emily + AI call)
```

---

## 4. Entry Points — Modal & Navigation

### RoofEstimateModal (`components/estimator/RoofEstimateModal.tsx`)

Triggered from the navigation bar via `useEstimateModal()` context hook. Both desktop and mobile nav buttons call `openEstimateModal()`.

**Behavior:**
- Opens as a fixed overlay with blur backdrop (`z-[9999]`)
- Dark navy gradient background (`#001F4D → #002D5A → #001526`)
- Auto-advancing carousel (5 slides, 3.5s interval) showing:
  1. Enter Your Address
  2. Satellite Imagery
  3. AI Roof Analysis
  4. Choose Your Materials
  5. Estimate Delivered
- Each slide has a step badge, title, description, and full-bleed image
- Dot indicators allow manual navigation (resets carousel timer)
- Address text input (replaces the original email gate)
- "Analyze My Roof" button — disabled until address >= 5 chars
- On submit: opens `/estimator?address=<encoded>` in new tab, fires GA4 event, closes modal
- Escape key closes modal; clicking backdrop closes modal; body scroll locked while open

### AddressAutoAnalyzer (`components/estimator/AddressAutoAnalyzer.tsx`)

Client component rendered on `/estimator` page inside `<Suspense>`.

**Behavior:**
- Reads `?address=` from `useSearchParams()`
- Only runs once (ref guard) and only when `currentStep === 'address'`
- Calls `analyzeRoof(address)` from the API client
- On success: sets address + measurements in store, advances to `'confirmation'` step
- On failure: sets error message, stays on address step for manual entry

### EstimateModalContext (`components/estimator/EstimateModalContext.tsx`)

Simple React context providing `{ isOpen: boolean, open: () => void, close: () => void }`.
Wrapped around the entire app in `app/layout.tsx` via `<EstimateModalProvider>`.

---

## 5. State Management — Zustand Store

**File:** `agents/roof-estimator-agent/store/useEstimatorStore.ts`

Uses Zustand with `devtools` middleware. State is partitioned for localStorage persistence — only `currentStep`, `address`, and `selectedMaterial` are persisted (no sensitive data like contact info).

### State Shape

```typescript
interface EstimatorState {
  currentStep: 'address' | 'confirmation' | 'materials' | 'contact' | 'results';
  address: string;
  measurements: RoofMeasurements | null;
  selectedMaterial: string;                    // Material ID (e.g. 'architectural-30')
  contactInfo: ContactInfo;
  estimate: EstimateResult | null;
  isAnalyzing: boolean;
  isCalculating: boolean;
  isGeneratingPdf: boolean;
  error: string | null;
}
```

### Actions

| Action | Description |
|--------|-------------|
| `setStep(step)` | Navigate to a wizard step, clears error |
| `setAddress(address)` | Store the user's address |
| `setMeasurements(m)` | Store roof analysis results |
| `setSelectedMaterial(id)` | Store chosen material ID |
| `setContactInfo(info)` | Store full contact info object |
| `setEstimate(est)` | Store final estimate result |
| `setLoading(type, bool)` | Set loading state for `analyzing` / `calculating` / `generating` |
| `setError(msg)` | Set or clear error message |
| `reset()` | Reset all state to initial values |

### Helper Hooks

- `useEstimatorActions()` — Returns only action functions
- `useEstimatorData()` — Returns only data fields (for read-only consumers)

---

## 6. Step 1: Address Entry

**Component:** `agents/roof-estimator-agent/components/steps/AddressStep.tsx`

### Behavior
- Text input with `autoComplete="street-address"`
- Minimum 10 characters to enable the "Analyze My Roof" button
- No geographic restrictions (Colorado validation was removed April 2, 2026)
- Placeholder address suggestions appear when input > 10 chars and contains "co" — these are **hardcoded demo suggestions**, NOT wired to Google Places API
- On submit: calls `analyzeRoof(address)` → on success advances to confirmation step

### Validation Rules
- Address must be at least 10 characters
- No geographic/state restrictions

### Note: This step is skipped when the user comes from the modal (via `?address=` URL param handled by `AddressAutoAnalyzer`).

---

## 7. Step 2: Confirmation & Email Gate

**Component:** `agents/roof-estimator-agent/components/steps/ConfirmationStep.tsx`

This is the most important step for lead capture — it shows the user their roof (value delivered) and gates continuation behind an email address.

### Left Column — Property View

**Map Embed:**
- If `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` is set: Google Maps Embed API iframe, satellite maptype, zoom 19
  - URL: `https://www.google.com/maps/embed/v1/place?key=KEY&q=ADDRESS&zoom=19&maptype=satellite`
- If no key: OpenStreetMap export embed with marker on coordinates
  - URL: `https://www.openstreetmap.org/export/embed.html?bbox=...&layer=mapnik&marker=LAT,LNG`
- Loading spinner overlay until iframe fires `onLoad`
- Below map: address text + imagery quality badge

### Right Column — Roof Measurements

Displays measurement cards (icon + label + value + subtitle):

| Measurement | Source Field | Example |
|-------------|-------------|---------|
| Total Roof Area | `roofAreaSqFt` / `roofAreaSqMeters` | 2,450 sq ft / 228 sq m |
| Roof Pitch | `slope.pitchRatio` / `slope.averagePitchDegrees` / `slope.category` | 6/12 / 26.6° (standard) |
| Ridge Lines | `features.ridgeLengthFt` / `features.segmentCount` | 120 ft / 4 segments |
| Valley Lines | `features.valleyLengthFt` (only if > 0) | 35 ft |
| Complexity Factor | `features.complexityMultiplier` | 1.15 (Moderate) |

Confidence score shown as a progress bar with descriptive text:
- >= 90%: "Excellent accuracy expected"
- >= 80%: "Good accuracy expected"
- < 80%: "Fair accuracy - may need manual verification"

### Email Gate (bottom section)

- Heading: "Ready for your personalized estimate?"
- Subtext: "Enter your email to continue — we'll send your detailed proposal there when it's ready."
- Email input + "Continue to Estimate" button
- Validation: required, must match `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`
- On submit:
  1. Stores email in `contactInfo.email` via Zustand
  2. Fires `POST /api/leads/capture` (non-blocking, fire-and-forget) with `source: 'estimate_confirmation'`
  3. Fires GA4 event `estimate_email_collected`
  4. Advances to materials step

---

## 8. Step 3: Material Selection

**Component:** `agents/roof-estimator-agent/components/steps/MaterialsStep.tsx`

### Material Loading
On mount, calls `getMaterialPricing(roofAreaSqFt)` which returns 5 materials with estimated total costs calculated client-side.

### Material Options

| ID | Name | Category | $/sqft | Labor Mult | Waste | Warranty | Popular |
|----|------|----------|--------|------------|-------|----------|---------|
| `architectural-25` | 25-Year Architectural Shingles | shingles | $1.25 | 1.0x | 10% | 25 years | |
| `architectural-30` | 30-Year Architectural Shingles | shingles | $1.65 | 1.0x | 10% | 30 years | Yes |
| `lifetime-premium` | Lifetime Premium Shingles | shingles | $2.25 | 1.1x | 12% | Lifetime | |
| `standing-seam-steel` | Standing Seam Steel | metal | $3.75 | 1.4x | 8% | 40 years | |
| `corrugated-metal` | Corrugated Metal Panels | metal | $2.25 | 1.2x | 10% | 25 years | |

### Client-Side Quick Estimate Formula
Used for the material cards (ballpark — the final estimate uses the server-side formula):

```
wasteAdjustedArea = roofAreaSqFt * (1 + wasteFactor)
materialCost = wasteAdjustedArea * pricePerSqft
laborCost = roofAreaSqFt * $2.25 * laborMultiplier
additionalCosts = roofAreaSqFt * $1.50
totalEstimate = materialCost + laborCost + additionalCosts
```

### UI
- Tab bar switching between "Asphalt Shingles" (3 options) and "Metal Roofing" (2 options)
- Each material is a clickable card showing: image placeholder, name, estimated cost, cost/sqft, warranty, description, feature checkmarks, select button
- Selected card gets blue border + scale-105 transform + blue "Selected" button
- "POPULAR" badge on the 30-year shingles card
- Blue gradient preview bar appears when a material is selected showing total cost + roof area + warranty
- Roof summary bar at top shows area, pitch, and complexity from measurements
- "Get My Estimate" button (disabled until a material is selected)

---

## 9. Step 4: Contact Information

**Component:** `agents/roof-estimator-agent/components/steps/ContactStep.tsx`

### Fields

| Field | Type | Required | Validation | Notes |
|-------|------|----------|------------|-------|
| First Name | text | Yes | Non-empty | |
| Last Name | text | Yes | Non-empty | |
| Email | email | Yes | Regex: `/^[^\s@]+@[^\s@]+\.[^\s@]+$/` | Pre-filled from step 2 |
| Phone | tel | No | If provided: 10+ digit check | Formatted with (XXX) XXX-XXXX mask |
| Project Timeline | radio | Yes (default: 'planning') | One of 4 options | |

### Timeline Options

| Value | Label | Icon |
|-------|-------|------|
| `urgent` | ASAP - Urgent repairs needed | Emergency |
| `soon` | Within 3 months | Calendar |
| `planning` | 6+ months - Just planning ahead | Clipboard |
| `comparing` | Getting multiple quotes to compare | Search |

### On Submit
- Validates all fields
- Stores `ContactInfo` in Zustand store
- Advances to results step

---

## 10. Step 5: Results & Delivery

**Component:** `agents/roof-estimator-agent/components/steps/ResultsStep.tsx`

### Generation Phase

Triggered automatically on mount when `estimate` is null but `measurements`, `selectedMaterial`, and `contactInfo.email` are present.

**Sequence:**
1. `calculateEstimate()` → `POST /api/webhooks/calculate-estimate`
2. On success → `generatePDF()` → `POST /api/webhooks/generate-pdf`
3. On success → marks `isComplete = true`

**Loading Animation:**
6-step animated checklist cycling every 2 seconds:
1. Analyzing roof measurements...
2. Calculating material requirements...
3. Applying regional pricing...
4. Generating detailed breakdown...
5. Creating professional PDF...
6. Sending to your email...

Completed steps show green checkmarks, current step shows a spinner, future steps show empty circles.

"Did You Know?" section with 3 cards shown during loading (Satellite Precision, Instant Analysis, Professional Quality).

### Completion Phase

**Estimate Summary (blue gradient card):**
- Total cost (large font)
- Cost per sq ft
- Roof area, warranty period, "Valid 30 Days"

**Cost Breakdown Table:**
- Materials total
- Labor & Installation total
- Additional Services total
- Subtotal
- Sales Tax
- Urgency Premium (if applicable)
- **Total Cost** (bold)

**Selected Material Card:**
- Material name, category, warranty badge

**"What Happens Next?" Section:**
1. Review Your Estimate — check email
2. Schedule Consultation — call for site visit
3. Begin Your Project — professional installation

**Action Buttons:**
- "Call Now: (970) 456-1176" (orange, tel: link)
- "Download PDF" (blue, links to `pdfUrl` — currently the `/estimates/[id]` web page)
- "New Estimate" (gray, calls `reset()` + navigates to address step)

**Disclaimer:** "This estimate is valid for 30 days. Final pricing may vary based on actual site conditions and material availability."

---

## 11. API Route — Roof Analysis

**Endpoint:** `POST /api/webhooks/roof-analysis`
**File:** `app/api/webhooks/roof-analysis/route.ts`

### Request
```json
{ "address": "123 Main St, Denver, CO 80202" }
```

### Response
```json
{
  "success": true,
  "measurements": { /* RoofMeasurements */ },
  "measurementId": "MEAS-1712000000000",
  "processedAt": "2026-04-02T...",
  "source": "google-solar" | "heuristic"
}
```

### Data Source Selection

**Path 1 — Google Solar API** (when `GOOGLE_SOLAR_API_KEY` is set):
1. Geocode address → `https://maps.googleapis.com/maps/api/geocode/json`
2. Call Solar API → `https://solar.googleapis.com/v1/buildingInsights:findClosest`
   - Parameters: `location.latitude`, `location.longitude`, `requiredQuality=LOW`
3. Extract: `maxArrayAreaMeters2` → convert to sq ft, `pitchDegrees`, `azimuthDegrees`, `roofSegmentStats`
4. Confidence score: fixed at 0.91
5. Falls back to heuristic if Solar API returns no data or errors

**Path 2 — Seeded Heuristic** (default, when no key or Solar API fails):
- Uses a deterministic hash of the address string to seed all values
- Same address always produces identical measurements (stable for demos)
- Ranges:
  - Roof area: 1,600 – 3,200 sq ft
  - Pitch: 4/12 – 9/12 (18.4° – 36.9°)
  - Complexity multiplier: 1.05 – 1.25 (based on area)
  - Segments: 4 – 8 (based on area)
  - Confidence: 82% – 97%
  - Coordinates: approximate CO Front Range (lat 38.8–39.2, lng -104.8 to -105.1)
- Always returns `imageryQuality: 'HIGH'`
- Always returns `validation: { isValid: true, warnings: [], errors: [] }`

### Heuristic Seed Function
```typescript
function addressSeed(address: string): number {
  let h = 0
  for (let i = 0; i < address.length; i++) {
    h = (Math.imul(31, h) + address.charCodeAt(i)) >>> 0
  }
  return (h % 10_000) / 10_000  // Returns 0.0000 – 0.9999
}
```

---

## 12. API Route — Calculate Estimate

**Endpoint:** `POST /api/webhooks/calculate-estimate`
**File:** `app/api/webhooks/calculate-estimate/route.ts`

### Request
```json
{
  "measurementId": "MEAS-xxx",
  "measurements": { /* RoofMeasurements from roof-analysis */ },
  "selectedMaterial": "architectural-30",
  "contactInfo": { "firstName": "...", "lastName": "...", "email": "...", "phone": "...", "projectTimeline": "planning" },
  "municipality": "Colorado Springs",
  "urgency": "planning"
}
```

### Response
```json
{
  "success": true,
  "estimateId": "EST-xxx",
  "estimate": { /* Full EstimateResult */ },
  "breakdown": { "materialCosts": {...}, "laborCosts": {...}, "additionalCosts": {...} },
  "createdAt": "..."
}
```

### Side Effects (all non-blocking / fire-and-forget)

1. **Supabase insert** → `roof_estimates` table with all cost data, address, material, status `'pending'`, 30-day expiry
2. **Estimate email** → `sendEstimateCompleteEmail()` via Resend to the user's email
3. **Team notification** → `sendLeadNotification()` via Resend to the team
4. **Hot lead alert** → `alertHotLead()` — SMS + Emily notification + outbound AI call

All side effects are wrapped in `.catch()` so API never fails due to email/alert issues.

---

## 13. API Route — Generate PDF / Send Email

**Endpoint:** `POST /api/webhooks/generate-pdf`
**File:** `app/api/webhooks/generate-pdf/route.ts`

### Request
```json
{
  "estimateId": "EST-xxx",
  "estimateData": { /* Full EstimateResult object */ }
}
```

### Response
```json
{
  "success": true,
  "estimateId": "EST-xxx",
  "pdfGenerated": true,
  "pdfUrl": "https://www.alpinepeakroofing.com/estimates/EST-xxx",
  "emailSent": true,
  "emailAddress": "user@example.com",
  "crmLeadCreated": true,
  "leadId": "uuid",
  "completedAt": "..."
}
```

### What It Actually Does

1. **Upserts lead** in Supabase `leads` table (conflict on email — updates existing)
2. **Sends branded estimate email** via Resend with full HTML template including:
   - Total cost hero banner
   - Project details table (material, area, warranty, estimate ID)
   - Full cost breakdown (materials, labor, permits/disposal/delivery, tax)
   - What's included checklist (8 items)
   - Project timeline (4-step visual)
   - Financing options (3 terms at 7.99% APR)
   - View Estimate CTA linking to `/estimates/[id]`
   - Schedule Consultation + Call CTAs
3. **PDF is NOT actually generated** — `pdfUrl` points to the `/estimates/[id]` web page which has print-to-PDF capability via the browser

---

## 14. API Route — Lead Capture

**Endpoint:** `POST /api/leads/capture`
**File:** `app/api/leads/capture/route.ts`

Called from the confirmation step email gate (non-blocking).

### Request
```json
{
  "email": "user@example.com",
  "source": "estimate_confirmation",
  "type": "email_gate",
  "metadata": {
    "address": "123 Main St...",
    "roofAreaSqFt": 2450
  }
}
```

### Side Effects
1. Save lead to Supabase `leads` table with calculated lead score (0-100)
2. Send estimate gate welcome email (if source is `estimate_modal`)
3. Send internal team notification email
4. Trigger hot lead alert (SMS + AI call) for high-priority leads (score >= 80)
5. Fire n8n webhook (if `N8N_WEBHOOK_URL` is set)

---

## 15. Pricing Model & Calculation Formulas

### Server-Side Calculation (`calculate-estimate/route.ts`)

**Constants:**
- `BASE_LABOR_RATE` = $2.25/sqft
- `SALES_TAX_RATE` = 4.9% (Colorado state 2.9% + avg local 2%)

**Material Cost:**
```
adjustedArea = roofAreaSqFt * (1 + wasteFactor)
rawMaterialCost = adjustedArea * pricePerSqft * complexityMultiplier
```

**Labor Cost:**
```
rawLaborCost = roofAreaSqFt * BASE_LABOR_RATE * laborMultiplier * complexityMultiplier
```

**Additional Costs:**
```
permitFee = max($250, roofAreaSqFt * $0.12)
disposalFee = roofAreaSqFt * $0.65
deliveryFee = max($150, rawMaterialCost * 4%)
additionalTotal = permitFee + disposalFee + deliveryFee
```

**Urgency Surcharge:**
```
urgent:    12% of (material + labor)
soon:       5% of (material + labor)
planning:   0%
comparing:  0%
```

**Final Calculation:**
```
subtotal = materialCost + laborCost + additionalCosts + urgencySurcharge
salesTax = subtotal * 4.9%
totalCost = subtotal + salesTax
costPerSqft = totalCost / roofAreaSqFt
```

### Cost Breakdown Splits

**Material costs** are split into sub-categories:
- Primary material: 55%
- Underlayment: 12%
- Flashing & trim: 12%
- Ridge vent system: 10%
- Accessories: 11%

**Labor costs** are split into:
- Primary installation: 65%
- Underlayment labor: 15%
- Flashing labor: 10%
- Ridge vent labor: 7%
- Accessories labor: 3%

### Example Calculation

For a 2,450 sq ft roof with 30-Year Architectural Shingles, complexity 1.15, "planning" timeline:

```
Material: 2,450 * 1.10 * $1.65 * 1.15 = $5,115
Labor:    2,450 * $2.25 * 1.0 * 1.15  = $6,339
Permits:  max($250, 2450*0.12)         = $294
Disposal: 2,450 * $0.65               = $1,593
Delivery: max($150, 5115*0.04)         = $205
Urgency:  $0 (planning)
Subtotal: $13,546
Tax:      $13,546 * 4.9%              = $664
Total:    $14,210
Per sqft: $14,210 / 2,450             = $5.80/sqft
```

### Financing Calculations (Email Only)

Monthly payment at 7.99% APR for 3 loan terms:
```
rate = 0.0799 / 12  (monthly rate)
payment = (total * rate) / (1 - (1 + rate)^(-months))

5 year (60 months):  ~$288/mo on $14,210
7 year (84 months):  ~$221/mo
10 year (120 months): ~$172/mo
```

### Estimate Validity
All estimates expire 30 days from creation (`validUntil` field).

---

## 16. Data Structures / TypeScript Interfaces

### RoofMeasurements
```typescript
interface RoofMeasurements {
  address: string;
  coordinates: { lat: number; lng: number };
  boundingBox: any;
  roofAreaSqFt: number;
  roofAreaSqMeters: number;
  slope: {
    averagePitchDegrees: number;
    averageAzimuthDegrees: number;
    category: 'low' | 'standard' | 'steep';
    pitchRatio: string;                       // e.g. "6/12"
  };
  features: {
    segmentCount: number;
    ridgeLengthFt: number;
    valleyLengthFt: number;
    eaveLength: number;
    rakeLength: number;
    complexityMultiplier: number;             // 1.05 – 1.25
  };
  imageryQuality: 'HIGH' | 'MEDIUM' | 'LOW';
  confidenceScore: number;                    // 0.0 – 1.0
  sunshineQuantiles: number[];
  roofSegments: any[];
  processedAt: string;                        // ISO 8601
  validation?: {
    isValid: boolean;
    warnings: string[];
    errors: string[];
  };
}
```

### ContactInfo
```typescript
interface ContactInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  projectTimeline: 'urgent' | 'soon' | 'planning' | 'comparing';
}
```

### EstimateResult
```typescript
interface EstimateResult {
  estimateId: string;                         // "EST-1712000000000"
  measurementId: string;
  roofArea: number;
  selectedMaterial: {
    id: string;
    name: string;
    category: string;
    warranty: string;
  };
  materialCosts: CostBreakdown;
  laborCosts: CostBreakdown;
  additionalCosts: CostBreakdown;
  subtotal: number;
  salesTax: number;
  urgencyAdjustment: number;
  totalCost: number;
  costPerSqft: number;
  region: string;
  municipality: string;
  urgency: string;
  contactInfo: ContactInfo;
  validUntil: string;                         // ISO 8601, 30 days out
  createdAt: string;
}

interface CostBreakdown {
  primary: number;
  underlayment: number;
  flashing: number;
  ridgeVent: number;
  accessories: number;
  total: number;
}
```

### MaterialOption (client-side)
```typescript
interface MaterialOption {
  id: string;
  name: string;
  category: 'shingles' | 'metal' | 'tile';
  pricePerSqft: number;
  laborMultiplier: number;
  wasteFactor: number;
  warranty: string;
  description: string;
  features: string[];
  imageUrl: string;
  popular?: boolean;
}
```

---

## 17. Email Templates

### Estimate Gate Welcome Email
- **Trigger:** `POST /api/leads/capture` with `source: 'estimate_modal'`
- **From:** `estimates@alpinepeakroofing.com`
- **Subject:** "Your Free Satellite Roof Analysis is Ready — Alpine Peak Roofing"
- **Template function:** `sendEstimateGateEmail(email)` in `lib/email/index.ts`

### Full Estimate Email
- **Trigger:** `POST /api/webhooks/generate-pdf` (and also from `/api/webhooks/calculate-estimate`)
- **From:** `Alpine Peak Roofing <estimates@alpinepeakroofing.com>`
- **Reply-To:** `jimmy@alpinepeakroofing.com`
- **Subject:** `Your Roof Estimate from Alpine Peak Roofing — $XX,XXX`
- **Content sections:**
  - Header (navy, company name, greeting)
  - Total hero (amber/gold, total cost, validity, tax note)
  - Project details table (material, area, warranty, estimate ID)
  - Cost breakdown table (all line items with sub-rows)
  - What's included (8-item checklist)
  - Project timeline (4-step visual)
  - Financing options (3 monthly payment cards at 7.99% APR)
  - View Estimate CTA → `/estimates/[id]`
  - Schedule + Call CTAs
  - Footer with company info

### Team Lead Notification
- **Trigger:** Both `leads/capture` and `calculate-estimate` routes
- **From:** `leads@alpinepeakroofing.com`
- **To:** Team email
- **Contains:** Lead score, priority, contact info, estimate total, material type

---

## 18. Lead Pipeline (Post-Estimate)

When an estimate is completed, the following notifications fire (all non-blocking):

```
Estimate calculated
  ├→ Supabase: roof_estimates table insert
  ├→ Resend: branded estimate email to homeowner
  ├→ Resend: team notification email
  ├→ Twilio SMS to TEAM_ALERT_PHONE
  ├→ Emily (OpenClaw) CRM notification
  └→ ElevenLabs outbound AI call to lead's phone
      └→ Personalized greeting mentioning their name, address, and that they just requested an estimate
      └→ Full Emily persona + knowledge base for the call
```

**Lead Scoring:**
- Leads from the estimator wizard get a score of 85 and priority `'high'`
- Leads from the email gate get a dynamically calculated score based on data completeness

---

## 19. Third-Party Integrations

| Service | Purpose | Env Var | Required? |
|---------|---------|---------|-----------|
| **Google Solar API** | Real satellite roof measurements | `GOOGLE_SOLAR_API_KEY` | No — falls back to heuristic |
| **Google Maps Embed API** | Satellite map view in confirmation step | `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` | No — falls back to OpenStreetMap |
| **Supabase** | Lead storage (leads table), estimate storage (roof_estimates table) | `NEXT_PUBLIC_SUPABASE_URL` + `SUPABASE_SERVICE_ROLE_KEY` | Yes (for CRM persistence) |
| **Resend** | Transactional email delivery | `RESEND_API_KEY` | No — emails silently skipped |
| **Twilio** | SMS hot lead alerts | `TWILIO_ACCOUNT_SID` + `TWILIO_AUTH_TOKEN` + `TWILIO_PHONE_NUMBER` | No — SMS skipped |
| **ElevenLabs** | Outbound AI phone call to leads | `ELEVENLABS_API_KEY` + `ELEVENLABS_PHONE_NUMBER_ID` | No — calls skipped |
| **OpenClaw** | Emily AI agent notification | `OPENCLAW_BASE_URL` + `OPENCLAW_API_KEY` | No — notifications skipped |
| **Google Analytics 4** | Event tracking (estimate_address_entry, estimate_email_collected) | `NEXT_PUBLIC_GA_ID` | No — events silently skipped |
| **n8n** | Workflow automation webhook | `N8N_WEBHOOK_URL` | No — webhook skipped |

---

## 20. Environment Variables

### Required for Core Functionality
```
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJ...
```

### Required for Real Data (currently not set)
```
GOOGLE_SOLAR_API_KEY=AIza...                    # Real roof measurements
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=AIza...          # Satellite map embed
RESEND_API_KEY=re_...                            # Email delivery
```

### Optional Enhancements
```
TEAM_ALERT_PHONE=+19704561176                    # SMS alerts
ELEVENLABS_PHONE_NUMBER_ID=phnum_...             # AI outbound calls
N8N_WEBHOOK_URL=https://...                      # Workflow automation
NEXT_PUBLIC_GA_ID=G-4KQXFSY1DH                   # Analytics
NEXT_PUBLIC_APP_URL=https://www.alpinepeakroofing.com  # Used in email links
```

---

## 21. Known Limitations & Gaps

1. **No real PDF generation** — The "PDF" is a web page at `/estimates/[id]` with browser print. No server-side PDF library (like `@react-pdf/renderer` or Puppeteer) is used.

2. **No Google Places autocomplete** — Address suggestions in AddressStep are hardcoded placeholder data, not wired to Google Places API.

3. **Material images are placeholders** — Material cards show gray gradient boxes with SVG icons instead of real product photos.

4. **Satellite image in confirmation** — Uses a map embed (street-level), not an actual satellite roof analysis overlay with segment outlines. The "satellite image with roof outline" shown in the carousel slides is aspirational.

5. **Dev mode bypasses real API** — `lib/api.ts` returns hardcoded mock data with artificial delays when `NODE_ENV === 'development'`, so the real `/api/webhooks/roof-analysis` endpoint is never called during local development.

6. **Municipality hardcoded** — Results step passes `'Colorado Springs'` as the municipality regardless of actual address. This affects the estimate ID context but not pricing.

7. **No address geocoding validation** — The system accepts any text as an address. There's no verification that the address is real, complete, or geocodable before calling the roof analysis API.

8. **Heuristic coordinates are approximate** — When using the fallback heuristic (no Google Solar key), coordinates are placed somewhere along the CO Front Range regardless of the actual address entered. This means the map embed may show the wrong location.

9. **Tax rate is fixed** — Colorado sales tax is hardcoded at 4.9% regardless of actual municipality tax rates.

10. **No estimate persistence across sessions** — If the user closes the tab and returns, the Zustand store resets (only step/address/material are localStorage-persisted, not measurements or estimate).

---

## 22. Shareable Estimate Page

**Route:** `/estimates/[id]`
**File:** `app/estimates/[id]/page.tsx`

A branded, print-ready estimate page that can be shared via URL or printed to PDF from the browser. The estimate email includes a "View Estimate" CTA linking here.

Currently, the page renders the estimate data stored in Supabase (looked up by estimate ID).

---

## 23. Development vs Production Behavior

| Behavior | Development (`NODE_ENV=development`) | Production |
|----------|--------------------------------------|------------|
| Roof analysis | Returns hardcoded mock data (2,450 sqft, 6/12 pitch) with 2s delay — never calls real API | Calls `/api/webhooks/roof-analysis` which uses Google Solar or heuristic |
| Estimate calculation | Returns mock estimate with random multiplier + 1.5s delay | Calls `/api/webhooks/calculate-estimate` with real pricing formulas |
| PDF generation | Returns mock success with example.com URL + 3s delay | Calls `/api/webhooks/generate-pdf` — sends real email if Resend key set |
| Emails | Not sent (mock returns `emailSent: true`) | Sent via Resend if `RESEND_API_KEY` is set |
| SMS alerts | Not sent | Sent via Twilio if credentials set |
| CRM persistence | Not saved (mock doesn't call Supabase) | Saved to Supabase `roof_estimates` + `leads` tables |

**Important:** To test the real API pipeline locally, you must either:
1. Set `NODE_ENV=production` (not recommended)
2. Remove/bypass the `if (process.env.NODE_ENV === 'development')` guards in `lib/api.ts`
3. Call the API routes directly via curl/Postman (they don't have dev-mode guards)

---

*This document covers the complete implementation as of April 2, 2026. For the Bridge status overview, see `docs/BRIDGE_STATUS.md`. For session-by-session change history, see `docs/operations/status/project-status.md`.*
