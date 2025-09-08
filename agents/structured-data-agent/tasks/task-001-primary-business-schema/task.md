# Task 001: Primary Business Schema Implementation
## Alpine Peak Roofing - Master JSON-LD Schema

**Phase:** 1 - Structured Data Implementation  
**Priority:** Critical (Blocks all other tasks)  
**Estimated Time:** 4-6 hours  
**Assigned To:** Junior Developer  

---

## Task Objective

Create the master JSON-LD schema that defines Alpine Peak Roofing as Colorado's premier luxury, sustainable roofing contractor specializing in high-altitude mountain communities.

**Success Criteria:**
- Schema validates 100% on Google Structured Data Testing Tool
- LLMs understand Alpine Peak as premium mountain roofing specialist
- All brand positioning elements integrated
- Ready for integration in app/layout.tsx

---

## Technical Requirements

### File Location: 
`components/seo/schemas/PrimaryBusinessSchema.tsx`

### Dependencies:
- Next.js 13+ App Router
- TypeScript strict mode
- React 18+

### Integration Point:
```typescript
// app/layout.tsx
import { PrimaryBusinessSchema } from '@/components/seo/schemas'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <PrimaryBusinessSchema />
      </head>
      <body>{children}</body>
    </html>
  )
}
```

---

## Implementation Specification

### Complete Schema Structure:

```typescript
// components/seo/schemas/PrimaryBusinessSchema.tsx
import React from 'react'

interface BusinessSchemaProps {
  organizationName?: string
  description?: string
  customizations?: Record<string, any>
}

export default function PrimaryBusinessSchema({ 
  organizationName = "Alpine Peak Roofing",
  description = "Colorado's premier luxury roofing contractor specializing in high-altitude, sustainable roofing solutions for mountain communities including Aspen, Vail, and Telluride.",
  customizations = {}
}: BusinessSchemaProps = {}) {
  
  const schema = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "RoofingContractor", "GreenBusiness", "PremiumService"],
    
    // Core Business Identity
    "name": organizationName,
    "legalName": "Alpine Peak Roofing LLC",
    "description": description,
    "slogan": "Pinnacle of Protection, Peak of Performance",
    "foundingDate": "2015",
    "url": "https://alpinepeakroofing.com",
    
    // Premium Market Positioning
    "priceRange": "$15000-$150000+",
    "paymentAccepted": ["Cash", "Check", "Credit Card", "Financing"],
    "currenciesAccepted": "USD",
    "serviceLevel": "Premium",
    "businessType": "Luxury Service Provider",
    
    // Geographic Coverage (High-Level)
    "areaServed": [
      {
        "@type": "State",
        "name": "Colorado",
        "alternateName": "CO"
      }
    ],
    "serviceArea": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": 39.7392,
        "longitude": -104.9903,
        "name": "Denver, CO"
      },
      "geoRadius": "241401" // 150 miles in meters
    },
    
    // Contact Information
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "1234 Mountain View Drive",
      "addressLocality": "Denver",
      "addressRegion": "CO",
      "postalCode": "80202",
      "addressCountry": "US"
    },
    "telephone": "+1-303-555-7663", // 303-555-ROOF
    "email": "info@alpinepeakroofing.com",
    
    // Business Hours
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "07:00",
        "closes": "18:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Saturday"],
        "opens": "08:00",
        "closes": "16:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Sunday",
        "opens": "00:00",
        "closes": "23:59",
        "description": "Emergency services only"
      }
    ],
    
    // Specializations (Mountain Focus)
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Mountain Roofing Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "High-Altitude Roofing",
            "description": "Specialized roofing solutions for elevations up to 12,000+ feet"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service", 
            "name": "Extreme Weather Roofing",
            "description": "Wind-resistant systems rated for 100+ mph mountain winds"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Snow Management Systems", 
            "description": "Ice dam prevention, heat cables, snow guards for heavy snow loads"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Sustainable Roofing Solutions",
            "description": "Eco-friendly materials, solar integration, energy efficiency"
          }
        },
        {
          "@type": "Offer", 
          "itemOffered": {
            "@type": "Service",
            "name": "Luxury Resort Roofing",
            "description": "Premium roofing for high-end mountain properties and resorts"
          }
        }
      ]
    },
    
    // Credentials & Certifications
    "hasCredential": [
      {
        "@type": "EducationalOccupationalCredential",
        "credentialCategory": "Professional Certification",
        "recognizedBy": {
          "@type": "Organization",
          "name": "Better Business Bureau",
          "alternateName": "BBB"
        },
        "description": "A+ Rating with Better Business Bureau"
      },
      {
        "@type": "EducationalOccupationalCredential", 
        "credentialCategory": "Environmental Certification",
        "recognizedBy": {
          "@type": "Organization",
          "name": "Energy Star",
          "url": "https://www.energystar.gov/"
        },
        "description": "Energy Star Certified Partner"
      },
      {
        "@type": "EducationalOccupationalCredential",
        "credentialCategory": "Green Building",
        "recognizedBy": {
          "@type": "Organization", 
          "name": "U.S. Green Building Council",
          "alternateName": "USGBC"
        },
        "description": "LEED Project Capability"
      }
    ],
    
    // Insurance & Bonding
    "hasOfferCatalog": {
      "@type": "InsurancePolicy",
      "name": "Comprehensive Coverage",
      "description": "Fully licensed, bonded, and insured roofing contractor",
      "coverageAmount": {
        "@type": "MonetaryAmount",
        "currency": "USD", 
        "value": "2000000"
      },
      "coverageArea": "Colorado Statewide"
    },
    
    // Awards & Recognition
    "award": [
      "Denver's Best Roofing Contractor 2023",
      "Mountain Community Choice Award 2022",
      "Sustainability Leadership Award 2023",
      "Customer Service Excellence 2022"
    ],
    
    // Social Proof
    "aggregateRating": {
      "@type": "AggregateRating", 
      "ratingValue": "4.9",
      "reviewCount": "247",
      "bestRating": "5",
      "worstRating": "1"
    },
    
    // Social Media Presence
    "sameAs": [
      "https://www.facebook.com/AlpinePeakRoofing",
      "https://www.instagram.com/alpinepeakroofing", 
      "https://www.linkedin.com/company/alpine-peak-roofing",
      "https://www.youtube.com/c/AlpinePeakRoofing"
    ],
    
    // Emergency Services
    "additionalType": "EmergencyService",
    "serviceType": "24/7 Emergency Roofing Repairs",
    "availableAtOrFrom": {
      "@type": "Place",
      "name": "Colorado Mountain Communities",
      "description": "Emergency response within 2 hours for mountain communities"
    },
    
    // Custom Extensions
    ...customizations
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema, null, 2)
      }}
    />
  )
}
```

---

## Brand Messaging Validation

### Required Elements Checklist:
- [ ] **Premium Positioning** - "Luxury," "Premium," "Investment-grade"
- [ ] **Mountain Specialization** - "High-altitude," "Extreme weather"  
- [ ] **Sustainability Leadership** - "Eco-friendly," "Energy Star," "LEED"
- [ ] **Geographic Focus** - Colorado mountains, Denver premium areas
- [ ] **Emergency Response** - 24/7 availability, rapid response times
- [ ] **Quality Emphasis** - Lifetime warranties, master craftsmen
- [ ] **Investment Messaging** - Long-term value, property enhancement

### Prohibited Language:
- ❌ "Cheap," "Budget," "Discount" 
- ❌ "Quick fix," "Patch job"
- ❌ Generic contractor language
- ❌ Cookie-cutter solutions

### Required Tone:
- ✅ Professional authority
- ✅ Understated elegance  
- ✅ Technical expertise
- ✅ Environmental consciousness
- ✅ Investment mindset

---

## Testing & Validation Protocol

### 1. Schema Validation:
```bash
# Test URLs:
# Google Structured Data Testing Tool
https://search.google.com/test/rich-results

# Schema.org Validator  
https://validator.schema.org/

# JSON-LD Playground
https://json-ld.org/playground/
```

### 2. Integration Testing:
```typescript
// Test in development
npm run dev

// Navigate to localhost:3000
// View page source to verify schema presence
// Test with browser developer tools
```

### 3. Brand Validation:
- Schema reflects premium mountain positioning
- Geographic coverage emphasizes luxury markets
- Service descriptions match brand voice
- Price positioning appropriate for luxury market

### 4. LLM Testing:
After implementation, test these queries:
- "luxury roofing contractor Colorado mountains"
- "Aspen roofing company sustainable"  
- "high altitude roofing specialist Colorado"
- "emergency roof repair mountain communities"

---

## Common Issues & Solutions

### Issue 1: Schema Validation Errors
**Symptom:** Red errors in Google testing tool
**Solution:** Check JSON syntax, required fields, proper nesting
**Prevention:** Use TypeScript for type safety

### Issue 2: Duplicate Schema Conflicts
**Symptom:** Multiple business schemas detected
**Solution:** Ensure only one primary business schema per page
**Prevention:** Check existing components before adding

### Issue 3: Brand Inconsistency
**Symptom:** Generic language in descriptions
**Solution:** Review against brand guidelines, emphasize premium/mountain focus
**Prevention:** Use approved messaging templates

### Issue 4: Geographic Confusion
**Symptom:** LLMs misunderstand service area
**Solution:** Clarify mountain communities vs. Denver metro distinction
**Prevention:** Test geographic queries regularly

---

## Documentation Requirements

### Update task.md with:
1. **Implementation Start Time:** YYYY-MM-DD HH:MM
2. **Challenges Encountered:** List any difficulties
3. **Solutions Applied:** How issues were resolved  
4. **Testing Results:** Schema validation outcomes
5. **LLM Query Results:** Before/after comparison
6. **Integration Success:** Component working in layout
7. **Completion Time:** YYYY-MM-DD HH:MM
8. **Next Steps:** Ready for Task 002

### Documentation Template:
```markdown
## Implementation Log

**Started:** 2024-01-XX XX:XX  
**Developer:** [Your Name]  

### Progress Notes:
- [Timestamp] Created component file
- [Timestamp] Added TypeScript interfaces  
- [Timestamp] Implemented schema structure
- [Timestamp] Validated on Google tools
- [Timestamp] Integrated into layout
- [Timestamp] Tested LLM queries

### Challenges:
1. [Issue description]
   - Solution: [How resolved]

### Testing Results:
- Google Validation: ✅ Pass
- Rich Results Test: ✅ Pass  
- Brand Validation: ✅ Pass
- LLM Query Test: ✅ Pass

**Completed:** 2024-01-XX XX:XX
**Status:** ✅ Ready for Task 002
```

---

## Success Metrics

### Technical Success:
- [ ] Schema validates 100% error-free
- [ ] Component renders without React errors
- [ ] TypeScript compilation successful
- [ ] No console warnings/errors

### Brand Success:
- [ ] Premium positioning maintained
- [ ] Mountain specialization clear
- [ ] Sustainability credentials prominent
- [ ] Geographic focus accurate

### LLM Success:
- [ ] Improved query understanding
- [ ] Accurate company representation
- [ ] Enhanced local relevance
- [ ] Better competitive positioning

**Ready for:** Task 002 - Service Area Schema  
**Blocks:** All subsequent schema tasks until completion