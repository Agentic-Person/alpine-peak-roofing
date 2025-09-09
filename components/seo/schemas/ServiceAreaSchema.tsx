import Script from 'next/script';

export default function ServiceAreaSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": "https://alpinepeakroofing.com/#service-areas",
    "name": "Mountain Community Roofing Services",
    "description": "Comprehensive roofing services across Colorado's premier mountain communities",
    "provider": {
      "@id": "https://alpinepeakroofing.com/#organization"
    },
    "areaServed": [
      {
        "@type": "City",
        "name": "Aspen",
        "alternateName": ["Aspen, CO", "Aspen Colorado"],
        "containedInPlace": {
          "@type": "State", 
          "name": "Colorado",
          "@id": "https://schema.org/Colorado"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": "39.1911",
          "longitude": "-106.8175"
        }
      },
      {
        "@type": "City",
        "name": "Vail", 
        "alternateName": ["Vail, CO", "Vail Colorado"],
        "containedInPlace": {
          "@type": "State",
          "name": "Colorado"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": "39.6403",
          "longitude": "-106.3742"
        }
      },
      {
        "@type": "City",
        "name": "Telluride",
        "alternateName": ["Telluride, CO", "Telluride Colorado"],
        "containedInPlace": {
          "@type": "State",
          "name": "Colorado"
        },
        "geo": {
          "@type": "GeoCoordinates", 
          "latitude": "37.9375",
          "longitude": "-107.8123"
        }
      },
      {
        "@type": "City",
        "name": "Crested Butte",
        "alternateName": ["Crested Butte, CO"],
        "containedInPlace": {
          "@type": "State",
          "name": "Colorado"
        }
      },
      {
        "@type": "City",
        "name": "Steamboat Springs", 
        "alternateName": ["Steamboat Springs, CO"],
        "containedInPlace": {
          "@type": "State",
          "name": "Colorado"
        }
      },
      {
        "@type": "City",
        "name": "Breckenridge",
        "alternateName": ["Breckenridge, CO"],
        "containedInPlace": {
          "@type": "State",
          "name": "Colorado"
        }
      },
      {
        "@type": "City",
        "name": "Keystone",
        "alternateName": ["Keystone, CO"],
        "containedInPlace": {
          "@type": "State",
          "name": "Colorado"
        }
      },
      {
        "@type": "City",
        "name": "Winter Park",
        "alternateName": ["Winter Park, CO"],
        "containedInPlace": {
          "@type": "State", 
          "name": "Colorado"
        }
      },
      {
        "@type": "AdministrativeArea",
        "name": "Denver Metro Area",
        "alternateName": ["Greater Denver", "Denver Metropolitan Area"],
        "containedInPlace": {
          "@type": "State",
          "name": "Colorado"
        }
      }
    ],
    "serviceOutput": {
      "@type": "Service",
      "name": "Professional Mountain Roofing Installation",
      "description": "Expert roofing solutions designed for mountain climate challenges"
    },
    "category": [
      "Mountain Roofing Specialist",
      "High-Altitude Construction", 
      "Luxury Home Services",
      "Weather-Resistant Roofing",
      "Sustainable Building Solutions"
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Regional Service Offerings",
      "itemListElement": [
        {
          "@type": "Offer",
          "name": "Aspen Premium Roofing",
          "description": "Luxury roofing services for Aspen's exclusive properties",
          "eligibleRegion": {
            "@type": "City",
            "name": "Aspen"
          }
        },
        {
          "@type": "Offer", 
          "name": "Vail Resort Roofing",
          "description": "Specialized roofing for Vail's world-class resorts and chalets",
          "eligibleRegion": {
            "@type": "City",
            "name": "Vail"
          }
        },
        {
          "@type": "Offer",
          "name": "Telluride Historic Preservation",
          "description": "Historic-appropriate roofing for Telluride's Victorian architecture",
          "eligibleRegion": {
            "@type": "City",
            "name": "Telluride"
          }
        }
      ]
    },
    "serviceArea": {
      "@type": "GeoShape",
      "name": "Colorado Mountain Region Service Area",
      "description": "Primary service area covering Colorado's premier mountain communities within 200 miles of Denver"
    }
  };

  return (
    <Script
      id="service-area-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      strategy="beforeInteractive"
    />
  );
}