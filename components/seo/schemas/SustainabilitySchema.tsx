import Script from 'next/script';

export default function SustainabilitySchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": ["Organization", "GreenBusiness"],
    "@id": "https://alpinepeakroofing.com/#sustainability",
    "name": "Alpine Peak Roofing - Sustainable Practices",
    "description": "Leading the roofing industry in environmental stewardship and sustainable building practices across Colorado's mountain communities",
    "mainEntity": {
      "@id": "https://alpinepeakroofing.com/#organization"
    },
    "knowsAbout": [
      "Sustainable roofing materials",
      "Energy-efficient roofing systems", 
      "Solar panel integration",
      "Recycled material applications",
      "Carbon footprint reduction",
      "LEED certification processes",
      "Green building standards",
      "Environmental impact mitigation"
    ],
    "hasCredential": [
      {
        "@type": "EducationalOccupationalCredential",
        "name": "LEED Accredited Professional",
        "credentialCategory": "Green Building Certification"
      },
      {
        "@type": "EducationalOccupationalCredential", 
        "name": "Sustainable Roofing Specialist",
        "credentialCategory": "Environmental Construction"
      },
      {
        "@type": "EducationalOccupationalCredential",
        "name": "Solar Installation Certified",
        "credentialCategory": "Renewable Energy Systems"
      }
    ],
    "sustainability": {
      "@type": "SustainabilityAction",
      "name": "Comprehensive Environmental Initiative",
      "description": "Multi-faceted approach to sustainable roofing practices",
      "actionableFeedbackPolicy": "We provide detailed environmental impact reports for every project",
      "instrument": [
        {
          "@type": "Product",
          "name": "Recycled Roofing Materials",
          "description": "Utilizing up to 80% recycled content in roofing systems"
        },
        {
          "@type": "Product", 
          "name": "Energy-Efficient Cool Roofs",
          "description": "Reflective roofing systems that reduce energy consumption by 30%"
        },
        {
          "@type": "Service",
          "name": "Solar Integration Planning", 
          "description": "Designing roofing systems optimized for solar panel installation"
        }
      ]
    },
    "environmentalPolicy": {
      "@type": "CreativeWork",
      "name": "Mountain Environmental Protection Policy",
      "description": "Comprehensive policy ensuring minimal environmental impact in sensitive mountain ecosystems",
      "text": "Alpine Peak Roofing is committed to preserving Colorado's pristine mountain environment through responsible construction practices, waste reduction, and the use of sustainable materials."
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Sustainable Roofing Solutions",
      "itemListElement": [
        {
          "@type": "Offer",
          "name": "Solar-Ready Roofing Systems", 
          "description": "Roofing designed specifically to maximize solar panel efficiency",
          "itemOffered": {
            "@type": "Service",
            "name": "Solar Integration Roofing",
            "category": "Renewable Energy Compatible"
          }
        },
        {
          "@type": "Offer",
          "name": "Recycled Material Roofing",
          "description": "Eco-friendly roofing using recycled and reclaimed materials",
          "itemOffered": {
            "@type": "Service", 
            "name": "Sustainable Material Installation",
            "category": "Environmental Construction"
          }
        },
        {
          "@type": "Offer",
          "name": "Energy-Efficient Cool Roofs",
          "description": "High-reflectivity roofing systems for reduced energy consumption",
          "itemOffered": {
            "@type": "Service",
            "name": "Cool Roof Installation", 
            "category": "Energy Efficiency"
          }
        },
        {
          "@type": "Offer",
          "name": "Green Living Roof Systems",
          "description": "Living roof installations for ultimate sustainability",
          "itemOffered": {
            "@type": "Service",
            "name": "Living Roof Construction",
            "category": "Ecological Building"
          }
        }
      ]
    },
    "award": [
      {
        "@type": "Award",
        "name": "Colorado Green Business Leader 2024",
        "description": "Recognition for outstanding environmental stewardship"
      },
      {
        "@type": "Award",
        "name": "Sustainable Construction Excellence Award",
        "description": "Industry recognition for innovative sustainable practices"
      }
    ],
    "memberOf": [
      {
        "@type": "Organization",
        "name": "U.S. Green Building Council",
        "description": "Leading organization promoting sustainable building practices"
      },
      {
        "@type": "Organization",
        "name": "Colorado Environmental Coalition",
        "description": "State organization advancing environmental protection"
      }
    ],
    "additionalProperty": [
      {
        "@type": "PropertyValue",
        "name": "Carbon Neutral Operations",
        "value": "Achieved 2024"
      },
      {
        "@type": "PropertyValue", 
        "name": "Waste Diversion Rate",
        "value": "95%"
      },
      {
        "@type": "PropertyValue",
        "name": "Renewable Energy Usage",
        "value": "100%"
      },
      {
        "@type": "PropertyValue",
        "name": "Sustainable Material Percentage",
        "value": "80%+"
      }
    ]
  };

  return (
    <Script
      id="sustainability-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      strategy="beforeInteractive"
    />
  );
}