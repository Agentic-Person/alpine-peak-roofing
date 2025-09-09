import Script from 'next/script';

export default function PremiumServiceSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": "https://alpinepeakroofing.com/#premium-services",
    "name": "Premium Mountain Roofing Services",
    "description": "Exclusive, high-end roofing solutions for Colorado's most prestigious mountain properties",
    "provider": {
      "@id": "https://alpinepeakroofing.com/#organization"
    },
    "serviceType": "Luxury Roofing Contractor",
    "category": [
      "Premium Roofing Services",
      "Luxury Home Construction", 
      "High-End Property Maintenance",
      "Exclusive Mountain Services"
    ],
    "audience": {
      "@type": "Audience",
      "name": "Luxury Property Owners",
      "audienceType": [
        "High-net-worth individuals",
        "Luxury resort owners", 
        "Historic property stewards",
        "Celebrity homeowners",
        "Investment property managers"
      ],
      "geographicArea": [
        "Aspen",
        "Vail", 
        "Telluride",
        "Crested Butte"
      ]
    },
    "brand": {
      "@type": "Brand",
      "name": "Alpine Peak Roofing",
      "slogan": "Pinnacle of Protection, Peak of Performance",
      "description": "The premier choice for discerning mountain property owners"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Premium Service Portfolio",
      "itemListElement": [
        {
          "@type": "Offer",
          "name": "Luxury Residential Roofing",
          "description": "Bespoke roofing solutions for exclusive mountain estates",
          "priceSpecification": {
            "@type": "PriceSpecification",
            "priceCurrency": "USD",
            "price": "150000+",
            "valueAddedTaxIncluded": false
          },
          "itemOffered": {
            "@type": "Service",
            "name": "Custom Mountain Home Roofing",
            "serviceType": "Installation",
            "category": "Luxury Construction"
          }
        },
        {
          "@type": "Offer", 
          "name": "Historic Property Restoration",
          "description": "Preserving architectural heritage with modern performance",
          "priceSpecification": {
            "@type": "PriceSpecification",
            "priceCurrency": "USD",
            "price": "200000+",
            "valueAddedTaxIncluded": false
          },
          "itemOffered": {
            "@type": "Service",
            "name": "Historic Roof Restoration",
            "serviceType": "Restoration & Preservation"
          }
        },
        {
          "@type": "Offer",
          "name": "Resort & Commercial Roofing", 
          "description": "Large-scale luxury roofing for hospitality properties",
          "priceSpecification": {
            "@type": "PriceSpecification",
            "priceCurrency": "USD", 
            "price": "500000+",
            "valueAddedTaxIncluded": false
          },
          "itemOffered": {
            "@type": "Service",
            "name": "Commercial Mountain Roofing",
            "serviceType": "Commercial Installation"
          }
        }
      ]
    },
    "additionalProperty": [
      {
        "@type": "PropertyValue",
        "name": "Service Level",
        "value": "White Glove"
      },
      {
        "@type": "PropertyValue", 
        "name": "Response Time",
        "value": "Same Day"
      },
      {
        "@type": "PropertyValue",
        "name": "Warranty Period", 
        "value": "25 Years"
      },
      {
        "@type": "PropertyValue",
        "name": "Project Manager",
        "value": "Dedicated"
      }
    ],
    "makesOffer": [
      {
        "@type": "Offer",
        "name": "Concierge Roofing Service",
        "description": "Full-service luxury roofing with dedicated project management"
      },
      {
        "@type": "Offer",
        "name": "Architectural Collaboration",
        "description": "Direct collaboration with renowned architects and designers"
      },
      {
        "@type": "Offer",
        "name": "Premium Materials Access",
        "description": "Exclusive access to the finest roofing materials available"
      }
    ],
    "serviceOutput": {
      "@type": "CreativeWork",
      "name": "Luxury Mountain Roof Installation",
      "description": "A masterfully crafted roofing system that enhances property value and withstands mountain conditions"
    },
    "award": [
      "Luxury Home Builder Award 2024",
      "Architectural Excellence Recognition",
      "Premium Service Provider Certification"
    ]
  };

  return (
    <Script
      id="premium-service-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      strategy="beforeInteractive"
    />
  );
}