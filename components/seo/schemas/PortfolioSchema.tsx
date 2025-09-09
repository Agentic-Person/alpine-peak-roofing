import Script from 'next/script';

export default function PortfolioSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "@id": "https://alpinepeakroofing.com/#portfolio",
    "name": "Alpine Peak Roofing Portfolio - Premium Mountain Projects",
    "description": "Showcase of luxury mountain roofing projects across Colorado's premier communities, featuring sustainable materials and architectural excellence",
    "creator": {
      "@id": "https://alpinepeakroofing.com/#organization"
    },
    "about": {
      "@type": "ProfessionalService",
      "name": "Luxury Mountain Roofing",
      "description": "Premium roofing solutions for Colorado's most exclusive properties"
    },
    "hasPart": [
      {
        "@type": "VisualArtwork",
        "name": "Aspen Luxury Estate Roofing Project",
        "description": "Complete roof renovation of 12,000 sq ft mountain estate featuring sustainable slate installation and solar integration",
        "image": "https://alpinepeakroofing.com/images/portfolio/aspen-luxury-estate.jpg",
        "locationCreated": {
          "@type": "Place", 
          "name": "Aspen",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Aspen",
            "addressRegion": "Colorado"
          }
        },
        "dateCreated": "2024-06-15",
        "material": ["Premium Slate", "Solar Integration", "Copper Gutters"],
        "artform": "Architectural Roofing",
        "additionalProperty": [
          {
            "@type": "PropertyValue",
            "name": "Project Value",
            "value": "$450,000"
          },
          {
            "@type": "PropertyValue",
            "name": "Square Footage", 
            "value": "12,000 sq ft"
          },
          {
            "@type": "PropertyValue",
            "name": "Completion Time",
            "value": "8 weeks"
          }
        ]
      },
      {
        "@type": "VisualArtwork",
        "name": "Vail Resort Commercial Roofing",
        "description": "Large-scale commercial roofing project for luxury ski resort featuring weather-resistant metal systems",
        "image": "https://alpinepeakroofing.com/images/portfolio/vail-resort-commercial.jpg",
        "locationCreated": {
          "@type": "Place",
          "name": "Vail",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Vail", 
            "addressRegion": "Colorado"
          }
        },
        "dateCreated": "2024-04-20",
        "material": ["Standing Seam Metal", "Snow Guards", "Commercial Insulation"],
        "artform": "Commercial Roofing Architecture",
        "additionalProperty": [
          {
            "@type": "PropertyValue",
            "name": "Project Value",
            "value": "$850,000"
          },
          {
            "@type": "PropertyValue",
            "name": "Square Footage",
            "value": "35,000 sq ft"
          }
        ]
      },
      {
        "@type": "VisualArtwork", 
        "name": "Telluride Historic Victorian Restoration",
        "description": "Meticulous restoration of 1880s Victorian home maintaining historic authenticity with modern performance",
        "image": "https://alpinepeakroofing.com/images/portfolio/telluride-historic-victorian.jpg",
        "locationCreated": {
          "@type": "Place",
          "name": "Telluride",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Telluride",
            "addressRegion": "Colorado"
          }
        },
        "dateCreated": "2024-03-10",
        "material": ["Historic Slate Restoration", "Cedar Shake", "Period Copper"],
        "artform": "Historic Preservation Roofing",
        "additionalProperty": [
          {
            "@type": "PropertyValue", 
            "name": "Historic Period",
            "value": "1880s Victorian"
          },
          {
            "@type": "PropertyValue",
            "name": "Preservation Award",
            "value": "Telluride Historic Society Recognition"
          }
        ]
      },
      {
        "@type": "VisualArtwork",
        "name": "Crested Butte Sustainable Living Roof",
        "description": "Innovative living roof system combining ecological benefits with luxury mountain aesthetics",
        "image": "https://alpinepeakroofing.com/images/portfolio/crested-butte-living-roof.jpg",
        "locationCreated": {
          "@type": "Place",
          "name": "Crested Butte",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Crested Butte",
            "addressRegion": "Colorado"
          }
        },
        "dateCreated": "2024-05-25",
        "material": ["Living Roof System", "Native Plants", "Sustainable Membrane"],
        "artform": "Ecological Architecture",
        "additionalProperty": [
          {
            "@type": "PropertyValue",
            "name": "Environmental Certification", 
            "value": "LEED Platinum Contributing"
          },
          {
            "@type": "PropertyValue",
            "name": "Energy Savings",
            "value": "40% Annual Reduction"
          }
        ]
      }
    ],
    "genre": [
      "Luxury Mountain Architecture",
      "Sustainable Roofing",
      "Historic Preservation", 
      "Commercial Mountain Development"
    ],
    "keywords": [
      "luxury mountain roofing",
      "Colorado premium roofing",
      "Aspen roofing contractor",
      "Vail roofing services", 
      "Telluride historic roofing",
      "sustainable mountain roofing",
      "high altitude roofing specialist"
    ],
    "audience": {
      "@type": "Audience",
      "audienceType": "Luxury Property Owners",
      "geographicArea": [
        "Aspen", "Vail", "Telluride", "Crested Butte", "Colorado Mountains"
      ]
    },
    "copyrightHolder": {
      "@id": "https://alpinepeakroofing.com/#organization"
    },
    "license": "https://creativecommons.org/licenses/by-nc-sa/4.0/",
    "mainEntityOfPage": "https://alpinepeakroofing.com/portfolio",
    "award": [
      "Excellence in Mountain Architecture 2024",
      "Sustainable Building Innovation Award",
      "Historic Preservation Excellence Recognition"
    ]
  };

  return (
    <Script
      id="portfolio-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      strategy="beforeInteractive"
    />
  );
}