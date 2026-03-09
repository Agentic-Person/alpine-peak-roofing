/**
 * /api/admin/ingest-knowledge
 *
 * One-time (re-runnable) admin endpoint that ingests all current website content
 * into the Supabase knowledge_base vector table.
 *
 * Covers:
 *  - All roofing materials (from lib/materials.ts)
 *  - All service area locations (from lib/locations.ts)
 *  - Company FAQ (from website FAQ page)
 *  - Services: residential, commercial, emergency
 *  - Process, financing, pricing, sustainability, company info
 *
 * Usage:
 *   curl -X POST https://yourdomain.com/api/admin/ingest-knowledge \
 *     -H "Authorization: Bearer YOUR_ADMIN_SECRET" \
 *     -H "Content-Type: application/json"
 *
 * Set ADMIN_SECRET env var to protect this endpoint.
 * Safe to re-run — uses upsert (ON CONFLICT DO UPDATE).
 */
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import OpenAI from 'openai'
import { materials } from '@/lib/materials'
import { locations } from '@/lib/locations'

// ─── Auth guard ───────────────────────────────────────────────────────────────

function isAuthorized(req: NextRequest): boolean {
  const secret = process.env.ADMIN_SECRET
  if (!secret) return false
  const auth = req.headers.get('authorization') || ''
  return auth === `Bearer ${secret}`
}

// ─── Infrastructure ───────────────────────────────────────────────────────────

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  )
}

function getOpenAI() {
  return new OpenAI({ apiKey: process.env.OPENAI_API_KEY! })
}

// ─── Types ────────────────────────────────────────────────────────────────────

interface KnowledgeEntry {
  id: string
  title: string
  content: string
  metadata: Record<string, unknown>
}

// ─── Embedding + upsert ───────────────────────────────────────────────────────

async function embedAndUpsert(
  entries: KnowledgeEntry[],
  openai: OpenAI,
  supabase: ReturnType<typeof getSupabase>
): Promise<{ upserted: number; failed: number }> {
  let upserted = 0
  let failed = 0

  // Batch embed in groups of 20 to stay within rate limits
  const BATCH = 20
  for (let i = 0; i < entries.length; i += BATCH) {
    const batch = entries.slice(i, i + BATCH)

    try {
      const embeddingResponse = await openai.embeddings.create({
        model: 'text-embedding-ada-002',
        input: batch.map(e => e.content.slice(0, 8000)),
      })

      const rows = batch.map((entry, idx) => ({
        id: entry.id,
        title: entry.title,
        content: entry.content,
        embedding: embeddingResponse.data[idx].embedding,
        tokens: Math.ceil(entry.content.length / 4),
        metadata: {
          ...entry.metadata,
          ingested_at: new Date().toISOString(),
          source: 'website-ingest',
        },
      }))

      const { error } = await supabase
        .from('knowledge_base')
        .upsert(rows, { onConflict: 'id' })

      if (error) {
        console.error(`[ingest] Upsert error on batch ${i}:`, error.message)
        failed += batch.length
      } else {
        upserted += batch.length
      }
    } catch (err: any) {
      console.error(`[ingest] Embedding error on batch ${i}:`, err.message)
      failed += batch.length
    }

    // Small delay between batches to respect rate limits
    if (i + BATCH < entries.length) {
      await new Promise(r => setTimeout(r, 400))
    }
  }

  return { upserted, failed }
}

// ─── Content generators ───────────────────────────────────────────────────────

function generateMaterialEntries(): KnowledgeEntry[] {
  return materials.map(m => {
    const content = [
      `${m.name} — Roofing Material`,
      `Manufacturer: ${m.manufacturer}`,
      `Warranty: ${m.warranty} | Lifespan: ${m.lifespan}`,
      `Material cost: $${m.materialPrice.low}–$${m.materialPrice.high}/sqft`,
      `Fully installed: $${m.installedPrice.low}–$${m.installedPrice.high}/sqft`,
      `Wind rating: ${m.windRating} | Impact rating: ${m.impactRating} | Fire rating: ${m.fireRating}`,
      '',
      m.description,
      '',
      m.longDescription,
      '',
      `Ideal for: ${m.idealFor}`,
      `Color options: ${m.colorOptions}`,
      '',
      'Advantages:',
      ...m.pros.map(p => `- ${p}`),
      '',
      'Considerations:',
      ...m.cons.map(c => `- ${c}`),
      '',
      'Warranty details:',
      ...m.warrantyDetails.map(w => `- ${w}`),
      '',
      'Why choose this material:',
      ...m.whyChoose.map(w => `- ${w}`),
      '',
      'Maintenance tips:',
      ...m.maintenanceTips.map(t => `- ${t}`),
      '',
      'Colorado-specific considerations:',
      ...m.coloradoConsiderations.map(c => `- ${c}`),
    ].join('\n')

    return {
      id: `material_${m.slug}`,
      title: m.name,
      content,
      metadata: {
        category: 'materials',
        urgency: 'informational',
        serviceType: 'residential',
        seasons: ['year-round'],
        location: 'colorado',
        slug: m.slug,
      },
    }
  })
}

function generateLocationEntries(): KnowledgeEntry[] {
  return locations.map(loc => {
    const challenges = loc.environment.challenges
      .flatMap(ch => [`${ch.title}: ${ch.description}`, ...ch.items.map(i => `  - ${i}`)])
      .join('\n')

    const services = loc.services
      .map(s => `${s.title}: ${s.description}\n${s.items.map(i => `  - ${i}`).join('\n')}`)
      .join('\n\n')

    const seasonal = loc.seasonal
      .map(s => `${s.season} — ${s.title}:\n${s.items.map(i => `  - ${i}`).join('\n')}`)
      .join('\n\n')

    const content = [
      `Alpine Peak Roofing — ${loc.name} Service Area`,
      `Region: ${loc.region} | Elevation: ${loc.elevation}`,
      `Tagline: ${loc.tagline}`,
      '',
      loc.description,
      '',
      'Environmental Challenges:',
      loc.environment.intro,
      challenges,
      '',
      'Services Offered in This Area:',
      services,
      '',
      'Seasonal Roofing Guide:',
      seasonal,
    ].join('\n')

    return {
      id: `location_${loc.slug}`,
      title: `${loc.name} Roofing Services`,
      content,
      metadata: {
        category: 'climate',
        urgency: 'informational',
        serviceType: 'both',
        seasons: ['year-round'],
        location: loc.slug,
        region: loc.region,
      },
    }
  })
}

function generateFAQEntries(): KnowledgeEntry[] {
  const faqData = [
    {
      id: 'company-1',
      category: 'Company',
      question: 'What makes Alpine Peak Roofing different from other Colorado roofing contractors?',
      answer: "Alpine Peak Roofing specializes in high-altitude, premium mountain roofing for Colorado's most exclusive communities including Aspen, Vail, Telluride, and Crested Butte. We combine mountain-specific expertise with sustainable practices, investment-grade materials, and 24/7 emergency response. Our 'Pinnacle of Protection, Peak of Performance' approach ensures your roof withstands extreme mountain weather while maintaining the highest aesthetic standards.",
    },
    {
      id: 'company-2',
      category: 'Company',
      question: 'Which Colorado mountain communities do you serve?',
      answer: 'We serve all major Colorado mountain communities including Aspen, Vail, Telluride, Crested Butte, Steamboat Springs, Winter Park, Keystone, Breckenridge, Copper Mountain, and surrounding areas. Our expertise extends throughout the Front Range, Western Slope, and central mountain regions.',
    },
    {
      id: 'company-3',
      category: 'Company',
      question: 'Are you licensed and insured for work in Colorado mountain communities?',
      answer: 'Yes, Alpine Peak Roofing is fully licensed, bonded, and insured with comprehensive coverage specifically for high-altitude work. We maintain all required state and local licenses, carry extensive liability insurance, and are certified for historic preservation work.',
    },
    {
      id: 'altitude-1',
      category: 'High-Altitude Roofing',
      question: 'What are the biggest challenges of roofing at high altitude in Colorado?',
      answer: 'High-altitude roofing faces unique challenges including extreme temperature fluctuations (-30°F to 90°F), intense UV exposure (40% stronger than sea level), hurricane-force winds up to 200+ mph, snow loads exceeding 150 lbs/sq ft, and rapid weather changes. Our specialized techniques and premium materials are engineered specifically for these harsh mountain conditions.',
    },
    {
      id: 'altitude-2',
      category: 'High-Altitude Roofing',
      question: 'How do you handle extreme wind conditions in Colorado mountains?',
      answer: 'Mountain winds can exceed 200 mph during chinook events. We use enhanced fastening systems with 40% more attachment points than standard installations, specialized wind-resistant materials, and aerodynamic design principles. Every project includes wind load calculations specific to local topography.',
    },
    {
      id: 'altitude-3',
      category: 'High-Altitude Roofing',
      question: 'What snow load considerations are important for mountain roofs?',
      answer: 'Colorado mountain roofs must handle snow loads from 50–200+ lbs/sq ft depending on elevation and location. Critical considerations include structural support, ice dam prevention, proper insulation, ventilation design, and emergency snow removal protocols.',
    },
    {
      id: 'weather-1',
      category: 'Weather',
      question: 'How do you protect against ice dams in Colorado mountain homes?',
      answer: 'Ice dam prevention requires proper insulation (R-60+ in mountain climates), strategic ventilation systems, heated cables in critical areas, and specialized membrane systems. We install continuous ridge and soffit ventilation, vapor barriers, and thermal breaks.',
    },
    {
      id: 'weather-2',
      category: 'Weather',
      question: 'What happens during hailstorms in the Colorado mountains?',
      answer: 'Mountain hailstorms can produce golf ball to tennis ball-sized hail with devastating impact. We use Class 4 impact-resistant materials as standard. Our emergency response team can deploy within 2–4 hours after severe weather, providing temporary protection while assessing damage and coordinating with insurance adjusters.',
    },
    {
      id: 'materials-1',
      category: 'Materials',
      question: 'What roofing materials work best in Colorado mountain climates?',
      answer: 'Premium materials excel in mountain conditions: Copper develops protective patina and lasts 100+ years; natural slate provides superior durability and freeze-thaw resistance; high-grade steel offers wind resistance and snow shedding; synthetic slate and composite materials combine durability with lighter weight.',
    },
    {
      id: 'emergency-1',
      category: 'Emergency',
      question: 'What constitutes a roofing emergency in Colorado mountains?',
      answer: 'Mountain roofing emergencies include severe storm damage with active leaks, structural damage from snow load or wind, ice dam flooding, and heating system failures in winter. Our 24/7 emergency team responds within 2–4 hours with temporary protection, structural assessment, and coordination with insurance adjusters.',
    },
    {
      id: 'emergency-2',
      category: 'Emergency',
      question: 'How quickly can you respond to emergencies in remote mountain locations?',
      answer: 'Response times: Aspen/Vail area (2–3 hours), Telluride/Crested Butte (3–4 hours), remote locations (4–8 hours depending on road conditions). We maintain strategically located emergency supplies and specialized mountain vehicles.',
    },
    {
      id: 'emergency-3',
      category: 'Emergency',
      question: 'Do you work during Colorado winter months?',
      answer: 'Yes, we provide year-round service with specialized winter protocols. Emergency repairs are performed regardless of weather using heated work areas, specialized materials, and safety equipment. New installations are scheduled during optimal weather windows (typically April–October).',
    },
    {
      id: 'pricing-1',
      category: 'Pricing',
      question: 'What is the typical cost range for mountain roofing projects?',
      answer: 'Mountain roofing investments typically range from $25,000–$150,000+ for residential projects, depending on size, materials, and complexity. Premium copper installations range $30–50 per sq ft, while high-grade synthetic materials range $15–25 per sq ft. Mountain projects cost 20–40% more than standard installations due to specialized materials, logistics, and installation requirements.',
    },
    {
      id: 'pricing-2',
      category: 'Pricing',
      question: 'Do you offer financing options for large mountain roofing projects?',
      answer: 'Yes, we offer 0% interest financing for qualified homeowners, extended payment plans, seasonal payment structures accommodating rental income cycles, and coordination with construction loans. We work with specialized lenders familiar with mountain property investments.',
    },
    {
      id: 'sustainability-1',
      category: 'Sustainability',
      question: 'What sustainable roofing options do you offer for mountain homes?',
      answer: 'Our sustainable solutions include solar-ready installations with optimal panel integration, cool roofing systems reducing energy consumption, recycled and recyclable materials, rainwater harvesting systems, green roof components, and energy-efficient ventilation systems.',
    },
  ]

  return faqData.map(faq => ({
    id: `faq_${faq.id}`,
    title: faq.question,
    content: `Q: ${faq.question}\n\nA: ${faq.answer}`,
    metadata: {
      category: faq.category.toLowerCase() === 'emergency' ? 'troubleshooting' : 'maintenance',
      urgency: faq.category === 'Emergency' ? 'emergency' : 'informational',
      serviceType: 'both',
      seasons: ['year-round'],
      location: 'colorado',
      faq_category: faq.category,
    },
  }))
}

function generateServiceEntries(): KnowledgeEntry[] {
  return [
    {
      id: 'service_residential',
      title: 'Residential Roofing Services',
      content: `Alpine Peak Roofing Residential Services

We protect Denver-area homes with quality craftsmanship and premium materials.

Services include:
- Full roof replacement (asphalt, metal, slate, cedar shake)
- Roof repair and maintenance
- Storm damage assessment and restoration
- Emergency leak response
- Free roof inspections
- Insurance claim assistance and documentation

Our residential process:
1. Free comprehensive inspection and assessment
2. Detailed written estimate with material options
3. Insurance coordination if applicable
4. Professional installation by certified crews
5. Final walkthrough and quality check
6. Post-installation warranty and support

Why choose us for residential:
- 15+ years serving Denver metro and mountain communities
- Fully licensed, bonded, and insured
- GAF Master Elite certified installer
- 24/7 emergency response
- 0% financing for qualified homeowners
- 5-star rated by hundreds of Denver homeowners`,
      metadata: {
        category: 'installation',
        urgency: 'normal',
        serviceType: 'residential',
        seasons: ['year-round'],
        location: 'denver',
      },
    },
    {
      id: 'service_commercial',
      title: 'Commercial Roofing Services',
      content: `Alpine Peak Roofing Commercial Services

We serve commercial properties across Denver metro and Colorado mountain communities.

Commercial roofing systems we install and service:
- TPO (Thermoplastic Polyolefin) single-ply membrane
- EPDM rubber roofing systems
- Modified bitumen systems
- Built-up roofing (BUR)
- Metal panel systems for commercial applications
- Standing seam metal for commercial
- Roof coatings and restoration systems

Commercial property types served:
- Office buildings and retail centers
- HOA and multi-family residential
- Mountain lodges and resort properties
- Historic commercial buildings
- Industrial and warehouse facilities

Commercial advantages:
- Minimal business disruption scheduling
- Phased installation available
- Preventive maintenance programs
- Detailed inspection reports for property managers
- Emergency response for commercial properties
- Multi-property contractor relationships`,
      metadata: {
        category: 'commercial',
        urgency: 'normal',
        serviceType: 'commercial',
        seasons: ['year-round'],
        location: 'colorado',
      },
    },
    {
      id: 'service_emergency',
      title: '24/7 Emergency Roofing Services',
      content: `Alpine Peak Roofing Emergency Services — Available 24/7

We provide rapid emergency response for all roofing emergencies across Denver metro and Colorado mountain communities.

What we handle:
- Active roof leaks and water intrusion
- Storm damage (hail, wind, heavy snow)
- Ice dam damage and flooding
- Structural damage from snow load
- Fallen tree or debris damage
- Fire-damaged roof areas
- Emergency tarping and temporary protection

Emergency response process:
1. Call (970) 456-1176 — answered 24/7
2. Emergency crew dispatch within 1–4 hours depending on location
3. Immediate temporary protection installation
4. Damage assessment and documentation
5. Insurance adjuster coordination
6. Permanent repair scheduling

Response time estimates:
- Denver metro: 1–2 hours
- Front Range / foothills: 1–3 hours
- Aspen / Vail area: 2–3 hours
- Telluride / Crested Butte: 3–4 hours
- Remote mountain locations: 4–8 hours

Emergency contact: (970) 456-1176 — 24 hours a day, 7 days a week`,
      metadata: {
        category: 'troubleshooting',
        urgency: 'emergency',
        serviceType: 'both',
        seasons: ['year-round'],
        location: 'colorado',
      },
    },
    {
      id: 'service_insurance',
      title: 'Insurance Claims and Storm Damage Assistance',
      content: `Alpine Peak Roofing — Insurance Claim Assistance

We help Colorado homeowners navigate the insurance claim process for storm-damaged roofs.

How we help with insurance claims:
- Free storm damage inspection and documentation
- Professional damage reports with photos for your adjuster
- Direct communication with insurance adjusters
- Supplement filing for additional covered damage
- We work with all major insurance providers
- No upfront costs — we work within your approved claim

Common insurance claim scenarios we handle:
- Hail damage (most common in Colorado)
- Wind damage
- Snow and ice load damage
- Fire damage
- Falling object damage

The insurance claim process with Alpine Peak:
1. Call us after a storm — free inspection, no obligation
2. We document all damage professionally
3. We meet with your adjuster on-site if needed
4. Once claim approved, we schedule installation
5. We ensure all approved work is completed to code
6. Final inspection and sign-off

Important: Colorado has a statute of limitations on storm damage claims. Contact us promptly after a storm to protect your rights.`,
      metadata: {
        category: 'maintenance',
        urgency: 'high',
        serviceType: 'residential',
        seasons: ['spring', 'summer', 'fall'],
        location: 'colorado',
      },
    },
    {
      id: 'company_about',
      title: 'About Alpine Peak Roofing',
      content: `About Alpine Peak Roofing

"Pinnacle of Protection, Peak of Performance"

Alpine Peak Roofing is a premium roofing contractor serving the Denver metro area and Colorado mountain communities. We've been protecting Colorado homes and businesses for over 15 years.

Our credentials:
- Fully licensed and bonded in Colorado
- Comprehensive liability and workers' comp insurance
- GAF Master Elite certified installer
- Class 4 impact-resistant installation certified
- OSHA certified crews for mountain/high-altitude work
- BBB accredited

What sets us apart:
- We specialize in Colorado's unique climate challenges — from hailstorms on the Front Range to extreme snow loads in mountain communities
- Premium materials only — we won't install products we wouldn't put on our own homes
- Transparent pricing — detailed written estimates before any work begins
- 24/7 emergency response — real people answer our phone around the clock
- 0% financing available — we make premium roofing accessible
- Free inspections — no pressure, no obligation

Service area:
Denver metro, Boulder, Fort Collins, Colorado Springs, and all major mountain communities including Aspen, Vail, Telluride, Breckenridge, Steamboat Springs, Winter Park, Crested Butte, Keystone, and Copper Mountain.

Contact us: (970) 456-1176`,
      metadata: {
        category: 'maintenance',
        urgency: 'informational',
        serviceType: 'both',
        seasons: ['year-round'],
        location: 'colorado',
      },
    },
    {
      id: 'process_howwework',
      title: 'Our Roofing Process — How Alpine Peak Works',
      content: `Alpine Peak Roofing — Our Process

We make roofing easy, transparent, and stress-free.

Step 1: Free Inspection
Our certified inspector evaluates your roof at no charge. We provide a detailed written report with photos documenting any damage or areas of concern. No high-pressure sales tactics — just honest assessment.

Step 2: Detailed Estimate
We present a written estimate covering all materials, labor, and timeline. We offer multiple material options at different price points so you can make an informed decision. We'll answer all your questions before you sign anything.

Step 3: Insurance Coordination (if applicable)
If you're filing an insurance claim, we handle communication with your adjuster, provide all required documentation, and can meet on-site with the adjuster to ensure all damage is properly accounted for.

Step 4: Material Selection & Scheduling
Once you've approved the estimate, we order your materials and schedule installation. We work around your schedule and minimize disruption to your daily life.

Step 5: Professional Installation
Our certified crews complete your installation efficiently and safely. We protect your property, clean up daily, and perform quality checks throughout the process.

Step 6: Final Walkthrough & Warranty
We walk through the completed project with you, answer any questions, and provide all warranty documentation. We register your manufacturer warranty and provide our own workmanship guarantee.

Timeline:
- Inspection to estimate: same day or next day
- Estimate to scheduling: as soon as you're ready
- Typical residential installation: 1–3 days
- Mountain or complex projects: 5–10+ days`,
      metadata: {
        category: 'installation',
        urgency: 'normal',
        serviceType: 'both',
        seasons: ['year-round'],
        location: 'colorado',
      },
    },
    {
      id: 'financing_options',
      title: 'Financing Options for Roofing Projects',
      content: `Alpine Peak Roofing — Financing Options

A new roof is a major investment. We offer flexible financing options to make premium roofing accessible for every budget.

0% Interest Financing:
- Available for qualified homeowners
- No interest for promotional period
- Easy online application
- Quick approval decisions
- No prepayment penalties

Extended Payment Plans:
- Spread payments over time
- Fixed monthly payments
- Multiple term lengths available

How to apply:
- Ask during your free inspection
- Apply online or by phone
- Get a decision typically within 24 hours

Mountain property financing:
We work with lenders familiar with mountain/vacation property investments and can structure payments around rental income cycles for investment properties.

Note: Financing is subject to credit approval. Ask about current promotional rates and terms during your consultation.`,
      metadata: {
        category: 'maintenance',
        urgency: 'normal',
        serviceType: 'both',
        seasons: ['year-round'],
        location: 'colorado',
      },
    },
  ]
}

// ─── Route handler ────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const supabase = getSupabase()
  const openai = getOpenAI()

  console.log('[ingest] Starting knowledge base ingestion...')

  const allEntries: KnowledgeEntry[] = [
    ...generateMaterialEntries(),
    ...generateLocationEntries(),
    ...generateFAQEntries(),
    ...generateServiceEntries(),
  ]

  console.log(`[ingest] Generated ${allEntries.length} entries. Embedding and upserting...`)

  const { upserted, failed } = await embedAndUpsert(allEntries, openai, supabase)

  const summary = {
    success: true,
    total_entries: allEntries.length,
    upserted,
    failed,
    breakdown: {
      materials: generateMaterialEntries().length,
      locations: generateLocationEntries().length,
      faq: generateFAQEntries().length,
      services: generateServiceEntries().length,
    },
    timestamp: new Date().toISOString(),
  }

  console.log('[ingest] Complete:', summary)

  return NextResponse.json(summary)
}

// Health check
export async function GET(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const supabase = getSupabase()
  const { count, error } = await supabase
    .from('knowledge_base')
    .select('*', { count: 'exact', head: true })

  return NextResponse.json({
    knowledge_base_rows: error ? 'error' : count,
    error: error?.message,
  })
}
