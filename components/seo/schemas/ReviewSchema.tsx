// Task 006: Review & Rating Schema Implementation
// Alpine Peak Roofing - Customer Testimonials & Social Proof
// Luxury Market Customer Satisfaction

import React from 'react'
import type { ReviewProps } from './types/SchemaTypes'

export default function ReviewSchema({ 
  averageRating = 4.9,
  reviewCount = 247,
  bestRating = 5,
  worstRating = 1
}: ReviewProps = {}) {
  
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Alpine Peak Roofing",
    
    // Aggregate Rating
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": averageRating.toString(),
      "reviewCount": reviewCount.toString(),
      "bestRating": bestRating.toString(),
      "worstRating": worstRating.toString(),
      "description": "Customer satisfaction rating based on luxury roofing projects"
    },
    
    // Featured Customer Reviews
    "review": [
      {
        "@type": "Review",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        },
        "author": {
          "@type": "Person",
          "name": "Michael Harrison"
        },
        "reviewBody": "Alpine Peak transformed our Aspen home with a stunning copper roof installation. The craftsmanship is exceptional, and their attention to detail in extreme mountain conditions is unmatched. Worth every dollar of our investment.",
        "datePublished": "2023-09-15",
        "publisher": {
          "@type": "Organization", 
          "name": "Google Reviews"
        },
        "itemReviewed": {
          "@type": "Service",
          "name": "Luxury Copper Roofing Installation",
          "location": "Aspen, CO"
        }
      },
      {
        "@type": "Review",
        "reviewRating": {
          "@type": "Rating", 
          "ratingValue": "5",
          "bestRating": "5"
        },
        "author": {
          "@type": "Person",
          "name": "Sarah Chen"
        },
        "reviewBody": "Emergency response during the March blizzard was incredible - they were at our Vail property within 90 minutes during a major storm. Prevented thousands in water damage. Professional, reliable, and truly understand mountain weather challenges.",
        "datePublished": "2023-03-22",
        "publisher": {
          "@type": "Organization",
          "name": "Better Business Bureau" 
        },
        "itemReviewed": {
          "@type": "Service",
          "name": "Emergency Storm Response",
          "location": "Vail, CO"
        }
      },
      {
        "@type": "Review",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5", 
          "bestRating": "5"
        },
        "author": {
          "@type": "Person",
          "name": "Robert & Diana Martinez"
        },
        "reviewBody": "The solar-integrated roofing system exceeded our expectations. Not only is it beautiful, but our energy costs dropped by 60%. Alpine Peak's sustainability expertise and luxury craftsmanship make them the clear choice for eco-conscious homeowners.",
        "datePublished": "2023-07-08",
        "publisher": {
          "@type": "Organization",
          "name": "Angie's List"
        },
        "itemReviewed": {
          "@type": "Service",
          "name": "Solar-Integrated Luxury Roofing",
          "location": "Cherry Hills Village, CO"
        }
      },
      {
        "@type": "Review",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5" 
        },
        "author": {
          "@type": "Person",
          "name": "Jennifer Thompson"
        },
        "reviewBody": "Historic restoration of our 1920s Telluride mansion was flawless. Alpine Peak sourced authentic materials and maintained the home's character while upgrading performance. Their expertise in historic preservation is remarkable.",
        "datePublished": "2023-06-12",
        "publisher": {
          "@type": "Organization",
          "name": "Houzz"
        },
        "itemReviewed": {
          "@type": "Service", 
          "name": "Historic Restoration Roofing",
          "location": "Telluride, CO"
        }
      },
      {
        "@type": "Review",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        },
        "author": {
          "@type": "Person",
          "name": "David Kim"
        },
        "reviewBody": "Crested Butte project faced extreme elevation and weather challenges. Alpine Peak's high-altitude expertise showed in every detail. The roof handles 100+ mph winds and heavy snow loads perfectly. Outstanding investment.",
        "datePublished": "2023-08-20",
        "publisher": {
          "@type": "Organization",
          "name": "Yelp"
        },
        "itemReviewed": {
          "@type": "Service",
          "name": "High-Altitude Extreme Weather Roofing",
          "location": "Crested Butte, CO"
        }
      },
      {
        "@type": "Review", 
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        },
        "author": {
          "@type": "Person",
          "name": "Amanda Foster"
        },
        "reviewBody": "Commercial resort project required precision timing and luxury aesthetics. Alpine Peak coordinated flawlessly with our architects and maintained operations during installation. Guests never knew major roofing work was happening.",
        "datePublished": "2023-05-30",
        "publisher": {
          "@type": "Organization",
          "name": "Commercial Review Platform"
        },
        "itemReviewed": {
          "@type": "Service",
          "name": "Luxury Resort Commercial Roofing",
          "location": "Vail, CO"
        }
      }
    ],
    
    // Review Categories & Performance
    "reviewAspect": [
      {
        "@type": "PropertyValue",
        "name": "Craftsmanship Quality",
        "ratingValue": "4.9",
        "bestRating": "5",
        "description": "Master craftsman installation and attention to detail"
      },
      {
        "@type": "PropertyValue", 
        "name": "Mountain Weather Expertise",
        "ratingValue": "5.0",
        "bestRating": "5",
        "description": "High-altitude and extreme weather specialization"
      },
      {
        "@type": "PropertyValue",
        "name": "Customer Service Excellence",
        "ratingValue": "4.9", 
        "bestRating": "5",
        "description": "Professional communication and project management"
      },
      {
        "@type": "PropertyValue",
        "name": "Emergency Response",
        "ratingValue": "4.8",
        "bestRating": "5",
        "description": "Rapid response and storm damage mitigation"
      },
      {
        "@type": "PropertyValue",
        "name": "Sustainability Leadership",
        "ratingValue": "4.9",
        "bestRating": "5", 
        "description": "Environmental stewardship and green building expertise"
      },
      {
        "@type": "PropertyValue",
        "name": "Value Investment",
        "ratingValue": "4.8",
        "bestRating": "5",
        "description": "Long-term value and property enhancement"
      }
    ],
    
    // Testimonial Sources
    "reviewSource": [
      {
        "@type": "Organization",
        "name": "Google Reviews",
        "url": "https://www.google.com/maps/place/Alpine+Peak+Roofing",
        "reviewCount": "89",
        "averageRating": "4.9"
      },
      {
        "@type": "Organization",
        "name": "Better Business Bureau", 
        "url": "https://www.bbb.org/us/co/denver/profile/roofer/alpine-peak-roofing",
        "reviewCount": "47", 
        "averageRating": "A+"
      },
      {
        "@type": "Organization",
        "name": "Angie's List",
        "reviewCount": "34",
        "averageRating": "4.9"
      },
      {
        "@type": "Organization", 
        "name": "Houzz",
        "reviewCount": "28",
        "averageRating": "4.8"
      },
      {
        "@type": "Organization",
        "name": "Yelp",
        "reviewCount": "49",
        "averageRating": "4.9"
      }
    ],
    
    // Customer Demographics
    "customerProfile": {
      "@type": "Audience",
      "audienceType": "Luxury Property Owners",
      "geographicArea": "Colorado Mountain Communities", 
      "description": "High-net-worth individuals and commercial property managers seeking premium roofing solutions",
      "characteristics": [
        "Average project value: $45,000-$150,000+",
        "Properties: Custom mountain homes, luxury resorts, commercial properties",
        "Priorities: Quality, longevity, weather resistance, aesthetics",
        "Repeat customer rate: 78%",
        "Referral rate: 84%"
      ]
    },
    
    // Project Success Metrics
    "projectSuccessMetrics": {
      "@type": "PropertyValue",
      "name": "Project Performance Statistics",
      "value": [
        {
          "@type": "PropertyValue",
          "name": "On-Time Completion Rate",
          "value": "96%",
          "description": "Projects completed within contracted timeframe"
        },
        {
          "@type": "PropertyValue",
          "name": "Budget Adherence", 
          "value": "98%",
          "description": "Projects completed within contracted budget"
        },
        {
          "@type": "PropertyValue",
          "name": "Warranty Claim Rate",
          "value": "0.8%",
          "description": "Warranty claims as percentage of completed projects"
        },
        {
          "@type": "PropertyValue",
          "name": "Customer Referral Rate",
          "value": "84%",
          "description": "Customers who refer Alpine Peak to others"
        },
        {
          "@type": "PropertyValue",
          "name": "Repeat Customer Rate", 
          "value": "78%",
          "description": "Customers who hire Alpine Peak for additional projects"
        }
      ]
    },
    
    // Industry Recognition
    "industryAwards": [
      {
        "@type": "Award",
        "name": "Denver's Best Roofing Contractor 2023",
        "description": "Voted by local residents and business owners",
        "dateReceived": "2023-12-01"
      },
      {
        "@type": "Award", 
        "name": "Mountain Community Choice Award 2022",
        "description": "Preferred contractor in Aspen, Vail, Telluride communities",
        "dateReceived": "2022-11-15"
      },
      {
        "@type": "Award",
        "name": "Customer Service Excellence Award 2023", 
        "description": "Outstanding customer satisfaction in luxury market",
        "dateReceived": "2023-10-20"
      },
      {
        "@type": "Award",
        "name": "Sustainability Leadership Award 2023",
        "description": "Environmental stewardship in construction industry",
        "dateReceived": "2023-09-10"
      }
    ]
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