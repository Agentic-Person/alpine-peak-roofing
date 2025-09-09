import Script from 'next/script';

export default function FAQSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": "https://alpinepeakroofing.com/faq#faqpage",
    "name": "Alpine Peak Roofing - Frequently Asked Questions",
    "description": "Comprehensive FAQ covering mountain roofing, emergency services, and premium roofing solutions in Colorado",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What makes Alpine Peak Roofing different from other Colorado roofing contractors?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Alpine Peak Roofing specializes exclusively in luxury mountain properties across Colorado's premier communities like Aspen, Vail, and Telluride. Our expertise in high-altitude conditions, sustainable practices, and premium materials sets us apart. We offer concierge-level service with dedicated project management and 25-year warranties on all luxury installations."
        }
      },
      {
        "@type": "Question", 
        "name": "Do you provide 24/7 emergency roofing services in mountain communities?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, we provide 24/7/365 emergency response across all Colorado mountain communities. Our emergency hotline +1-720-555-ROOF connects you directly to our dispatch center, and we guarantee response within 2 hours for all emergency calls in our service area, including Aspen, Vail, Telluride, and surrounding mountain towns."
        }
      },
      {
        "@type": "Question",
        "name": "What roofing materials work best for Colorado mountain homes?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "For Colorado mountain properties, we recommend premium materials designed for extreme weather conditions: architectural shingles with high wind ratings, metal roofing systems for snow load management, slate or synthetic slate for historic properties, and cool roof systems for energy efficiency. All materials are selected for their ability to withstand hail, heavy snow loads, and UV exposure at high altitudes."
        }
      },
      {
        "@type": "Question",
        "name": "How much does a luxury mountain roof cost in Colorado?",
        "acceptedAnswer": {
          "@type": "Answer", 
          "text": "Luxury mountain roofing projects typically range from $150,000 to $500,000+ depending on size, materials, and complexity. Factors affecting cost include: high-altitude accessibility, premium material selection, architectural complexity, solar integration, and sustainable features. We provide detailed estimates that include all aspects of mountain installation challenges."
        }
      },
      {
        "@type": "Question",
        "name": "Do you work with historic properties in mountain towns?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Absolutely. Alpine Peak specializes in historic preservation roofing throughout Colorado's mountain communities, especially in Telluride, Aspen, and Crested Butte. We maintain relationships with historic preservation societies and have extensive experience with Victorian-era homes, mining-era buildings, and other historic structures requiring period-appropriate materials and techniques."
        }
      },
      {
        "@type": "Question",
        "name": "What sustainable roofing options do you offer?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Our sustainable roofing solutions include: solar-ready installations, recycled content materials (up to 80%), energy-efficient cool roof systems, living roof systems for appropriate applications, and sustainable material sourcing. We're LEED accredited and help properties achieve green building certifications while maintaining luxury aesthetics."
        }
      },
      {
        "@type": "Question",
        "name": "How long do your roofing warranties last?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Alpine Peak offers comprehensive 25-year warranties on all luxury installations, covering materials, workmanship, and performance. This includes protection against leaks, material defects, and installation issues. Our warranty is fully transferable and backed by our bonding and insurance. We also provide extended manufacturer warranties on premium materials."
        }
      },
      {
        "@type": "Question",
        "name": "Can you install solar panels as part of roofing projects?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, we design and install solar-ready roofing systems and can coordinate solar panel installation. Our solar integration planning ensures optimal placement for Colorado's mountain sun conditions, proper structural support for snow loads, and seamless aesthetic integration with your roof design. We work with certified solar partners for complete energy solutions."
        }
      },
      {
        "@type": "Question", 
        "name": "What areas do you serve in Colorado?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Alpine Peak serves Colorado's premier mountain communities including Aspen, Vail, Telluride, Crested Butte, Steamboat Springs, Breckenridge, Keystone, Winter Park, and the greater Denver metro area. We specialize in high-altitude installations and understand the unique challenges of mountain roofing projects."
        }
      },
      {
        "@type": "Question",
        "name": "How do you handle insurance claims for storm damage?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Alpine Peak has extensive experience with insurance claims and can bill directly to most major insurers. We provide detailed damage assessments, work directly with adjusters, and ensure all storm damage is properly documented and repaired to exceed original specifications. Our emergency response team can secure properties immediately while claims are processed."
        }
      }
    ],
    "about": {
      "@type": "Organization",
      "@id": "https://alpinepeakroofing.com/#organization"
    },
    "audience": {
      "@type": "Audience", 
      "audienceType": "Mountain Property Owners",
      "geographicArea": [
        "Aspen", "Vail", "Telluride", "Crested Butte", "Colorado"
      ]
    }
  };

  return (
    <Script
      id="faq-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      strategy="beforeInteractive"
    />
  );
}