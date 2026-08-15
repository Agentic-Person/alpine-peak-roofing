import { jsonLdHtml } from './jsonLd';

/**
 * FAQ schema optimized for Answer Engine Optimization (AEO).
 *
 * Each answer follows the featured-snippet format:
 *   1) First sentence: a direct, complete answer (≈40–55 words) written so it
 *      can stand alone in a Google "People Also Ask" box or a voice response.
 *   2) Following sentences: supporting detail, numbers, and context.
 *
 * Facts are sourced from lib/locations.ts, lib/materials.ts, and company data.
 */
export default function FAQSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": "https://alpinepeakroofing.com/faq#faqpage",
    "name": "Alpine Peak Roofing - Frequently Asked Questions",
    "description":
      "Answers to common Denver and Colorado roofing questions covering cost, insurance claims, hail damage, materials, timelines, and emergency service.",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What makes Alpine Peak Roofing different from other Colorado roofing contractors?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text":
            "Alpine Peak Roofing specializes in premium residential and commercial roofing across the Denver metro area and Colorado's mountain communities, combining factory-certified installers, Class 4 impact-resistant systems, and 25-year workmanship warranties. Family-owned since 1989, we deliver concierge-level project management, transparent pricing, and direct insurance-claim support on every job."
        }
      },
      {
        "@type": "Question",
        "name": "How much does a new roof cost in Denver, Colorado?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text":
            "A new asphalt-shingle roof in Denver typically costs $12,000 to $25,000 for an average 2,000 sq ft home, or about $4.50 to $7.00 per square foot installed. Metal roofing runs $9 to $14 per square foot, standing-seam metal $12 to $18, and natural slate $20 to $40. Final price depends on roof pitch, tear-off layers, underlayment, and hail-resistant shingle upgrades."
        }
      },
      {
        "@type": "Question",
        "name": "How long does a roof replacement take in Colorado?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text":
            "Most Denver-area roof replacements are completed in one to three days for standard asphalt-shingle homes, weather permitting. Larger homes, metal systems, tile, or slate installations usually take four to seven days. Crews tear off the old roof, install synthetic underlayment and ice-and-water shield, then install the new roofing system and complete a final inspection before cleanup."
        }
      },
      {
        "@type": "Question",
        "name": "Does homeowners insurance cover hail damage to my roof in Colorado?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text":
            "Yes — most Colorado homeowners policies cover hail damage under dwelling (Coverage A), minus your wind/hail deductible, which is typically 1% to 5% of your home's insured value. Colorado is the #2 hail state in the U.S., so carriers routinely pay claims. File within one year of the storm date, document the damage with photos, and request a licensed roofer's inspection before the adjuster arrives."
        }
      },
      {
        "@type": "Question",
        "name": "How do I file a roof insurance claim for storm damage?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text":
            "To file a roof insurance claim in Colorado, first document the damage with dated photos, then call your insurance carrier to open a claim and receive a claim number, and finally schedule a free inspection with a licensed roofing contractor before the adjuster visits. Alpine Peak handles the full process: we meet the adjuster on-site, provide Xactimate-aligned estimates, and supplement the claim if anything is missed."
        }
      },
      {
        "@type": "Question",
        "name": "What is the best roofing material for Colorado weather?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text":
            "The best roofing material for Colorado weather is a Class 4 impact-resistant architectural shingle such as GAF Timberline HDZ IR, which resists hail, carries a 130 mph wind rating, and qualifies for insurance discounts of 10% to 30%. Standing-seam metal is the top choice for mountain homes with heavy snow loads, and synthetic slate performs best on historic or luxury properties."
        }
      },
      {
        "@type": "Question",
        "name": "How often should I replace my roof in Denver?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text":
            "Most Denver asphalt-shingle roofs last 15 to 20 years — shorter than the national average of 20 to 30 years because of intense UV exposure at altitude and frequent hailstorms along the Front Range. Metal roofs last 40 to 70 years, tile 50+ years, and natural slate up to 100 years. Schedule annual inspections after age 10 and after any storm with hail larger than 1 inch."
        }
      },
      {
        "@type": "Question",
        "name": "What are the signs my Denver roof needs to be replaced?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text":
            "The clearest signs a Denver roof needs replacement are curling or cracked shingles, bald spots where granules are missing, dented metal vents or flashing from hail, daylight visible in the attic, and active leaks or water stains on ceilings. Granules collecting in gutters and a roof older than 15 years are also strong indicators. Book a free inspection to confirm before filing an insurance claim."
        }
      },
      {
        "@type": "Question",
        "name": "Can I get a free roof inspection after a hail storm?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text":
            "Yes, Alpine Peak Roofing provides free post-storm roof inspections throughout the Denver metro area and along the Front Range, usually within 24 to 48 hours of your request. Our inspectors photograph and document every hail impact, measure bruising on shingles, check soft metals, and provide a written damage report you can submit to your insurance carrier."
        }
      },
      {
        "@type": "Question",
        "name": "Do you offer financing for roof replacement?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text":
            "Yes, Alpine Peak Roofing offers financing for qualified homeowners through our lending partners, including 0% APR promotional plans for up to 18 months and fixed-rate terms from 5 to 15 years. Monthly payments on a typical $18,000 Denver roof replacement start around $180. Applications take about 60 seconds and approval decisions are usually returned the same day."
        }
      },
      {
        "@type": "Question",
        "name": "Do you provide 24/7 emergency roofing services?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text":
            "Yes, Alpine Peak Roofing provides 24/7/365 emergency roofing service across the Denver metro area and Colorado mountain communities, with a guaranteed on-site response within 2 hours for active leaks and storm damage. Our emergency crews tarp exposed areas, stop active leaks, board up skylights, and document the damage for your insurance claim — all before permanent repairs begin."
        }
      },
      {
        "@type": "Question",
        "name": "What roofing materials work best for Colorado mountain homes?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text":
            "For Colorado mountain homes above 7,000 feet, standing-seam metal is the top choice because it sheds heavy snow, carries a 50+ year lifespan, and handles extreme UV exposure. Class 4 impact-resistant architectural shingles work well at mid-elevations, and synthetic slate suits historic properties in Aspen, Telluride, and Crested Butte. All selections should carry a Class A fire rating for wildfire protection."
        }
      },
      {
        "@type": "Question",
        "name": "How much does a luxury mountain roof cost in Colorado?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text":
            "Luxury mountain roofing projects in Aspen, Vail, and Telluride typically range from $150,000 to $500,000 or more, driven by premium materials, high-altitude access logistics, architectural complexity, and snow-load engineering. Standing-seam copper, natural slate, and cedar-shake restorations fall at the higher end. Estimates include heated-eave systems, ice-and-water shield upgrades, and integrated solar readiness where appropriate."
        }
      },
      {
        "@type": "Question",
        "name": "Do you work with historic properties in mountain towns?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text":
            "Yes, Alpine Peak specializes in historic preservation roofing throughout Colorado's mountain communities, particularly Telluride, Aspen, and Crested Butte, where Victorian-era and mining-era structures require period-accurate materials. We coordinate with local historic preservation commissions, source synthetic slate and cedar shake that meets design-review standards, and use detailing techniques consistent with the original roof age."
        }
      },
      {
        "@type": "Question",
        "name": "What sustainable roofing options do you offer?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text":
            "Alpine Peak offers several sustainable roofing systems, including cool-roof reflective shingles that lower cooling loads by 10% to 25%, solar-ready underlayments engineered for PV panel attachment, recycled-content metal panels containing up to 95% recycled steel, and living-roof assemblies for appropriate commercial applications. We are LEED-accredited and help projects pursue Energy Star and green-building certifications."
        }
      },
      {
        "@type": "Question",
        "name": "How long do your roofing warranties last?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text":
            "Alpine Peak Roofing installations carry a 25-year workmanship warranty on labor plus the full manufacturer material warranty, which is lifetime-limited on GAF, CertainTeed, and Owens Corning architectural shingles and 30 to 50 years on standing-seam metal. Warranties are transferable to future homeowners, cover leaks and installation defects, and can be upgraded to GAF Golden Pledge or System Plus for full-system coverage."
        }
      },
      {
        "@type": "Question",
        "name": "Can you install solar panels as part of my roof replacement?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text":
            "Yes, Alpine Peak designs solar-ready roofing systems and coordinates PV installation with certified solar partners, which is the most cost-effective approach because mounting racks and flashing are integrated during the new-roof install. Our team engineers the structure for Colorado snow loads, orients panels for peak sun exposure, and ensures manufacturer warranties remain intact after panel attachment."
        }
      },
      {
        "@type": "Question",
        "name": "What areas do you serve in Colorado?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text":
            "Alpine Peak Roofing serves the full Denver metropolitan area plus Colorado's premier mountain communities, including Aspen, Vail, Telluride, Crested Butte, Steamboat Springs, Breckenridge, Frisco, Silverthorne, Winter Park, Durango, and Glenwood Springs. We operate crews from Front Range dispatch centers and mobile mountain teams so response times stay under two hours for emergency calls in our service region."
        }
      },
      {
        "@type": "Question",
        "name": "How do you handle insurance claims for storm damage?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text":
            "Alpine Peak manages the full insurance-claim process for storm damage: we inspect the roof, produce a line-item Xactimate-compatible estimate, meet your adjuster on-site, and supplement the claim if items are missed. We bill most major Colorado carriers directly, coordinate ACV and depreciation release paperwork, and you pay only your deductible — there is no out-of-pocket cost for approved claims."
        }
      },
      {
        "@type": "Question",
        "name": "What is an impact-resistant (Class 4) roof and is it worth it in Colorado?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text":
            "A Class 4 impact-resistant roof uses shingles tested under UL 2218 to survive a 2-inch steel-ball drop without cracking, providing the highest hail rating available. In Colorado, most major insurers offer 10% to 30% annual premium discounts for Class 4 roofs, and the systems typically pay back the $500 to $1,500 upgrade cost within three to five years while dramatically reducing hail-claim frequency."
        }
      }
    ],
    "about": {
      "@type": "Organization",
      "@id": "https://alpinepeakroofing.com/#organization"
    },
    "audience": {
      "@type": "Audience",
      "audienceType": "Colorado homeowners and commercial property owners",
      "geographicArea": [
        "Denver",
        "Aurora",
        "Lakewood",
        "Arvada",
        "Boulder",
        "Aspen",
        "Vail",
        "Telluride",
        "Crested Butte",
        "Colorado"
      ]
    }
  };

  return (
    <script
      id="faq-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: jsonLdHtml(schema) }}
    />
  );
}
