import Script from 'next/script';

export default function EmergencyServiceSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "EmergencyService",
    "@id": "https://alpinepeakroofing.com/#emergency-service",
    "name": "24/7 Mountain Emergency Roofing Service",
    "description": "Immediate response emergency roofing services across Colorado's mountain communities, available 24/7 for storm damage, leaks, and urgent repairs",
    "provider": {
      "@id": "https://alpinepeakroofing.com/#organization"
    },
    "serviceType": "Emergency Roofing Repair",
    "category": [
      "Emergency Roofing Service",
      "Storm Damage Response",
      "Urgent Roof Repair",
      "24/7 Emergency Response"
    ],
    "availableChannel": [
      {
        "@type": "ServiceChannel",
        "name": "Emergency Hotline",
        "servicePhone": "+1-720-555-ROOF",
        "availableLanguage": ["English", "Spanish"],
        "hoursAvailable": {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
          "opens": "00:00",
          "closes": "23:59"
        }
      },
      {
        "@type": "ServiceChannel", 
        "name": "Online Emergency Request",
        "serviceUrl": "https://alpinepeakroofing.com/emergency",
        "hoursAvailable": {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
          "opens": "00:00", 
          "closes": "23:59"
        }
      }
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Emergency Response Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "name": "Storm Damage Emergency Response",
          "description": "Immediate response to wind, hail, and snow damage across mountain communities",
          "priceSpecification": {
            "@type": "PriceSpecification",
            "priceCurrency": "USD",
            "price": "Emergency pricing available - insurance accepted"
          },
          "itemOffered": {
            "@type": "Service",
            "name": "Emergency Storm Damage Repair",
            "serviceType": "Emergency Response"
          },
          "availabilityStarts": "2024-01-01T00:00:00Z",
          "availabilityEnds": "2024-12-31T23:59:59Z"
        },
        {
          "@type": "Offer",
          "name": "Urgent Leak Repair",
          "description": "Fast response to roof leaks preventing interior damage",
          "itemOffered": {
            "@type": "Service",
            "name": "Emergency Leak Stoppage",
            "serviceType": "Urgent Repair"
          }
        },
        {
          "@type": "Offer", 
          "name": "Mountain Weather Emergency Service",
          "description": "Specialized response for high-altitude weather emergencies",
          "itemOffered": {
            "@type": "Service",
            "name": "High-Altitude Emergency Repair",
            "serviceType": "Mountain Specialist Response"
          }
        },
        {
          "@type": "Offer",
          "name": "Property Protection Tarping",
          "description": "Emergency tarping services to protect property until permanent repairs",
          "itemOffered": {
            "@type": "Service", 
            "name": "Emergency Property Protection",
            "serviceType": "Temporary Protection"
          }
        }
      ]
    },
    "serviceArea": {
      "@type": "GeoShape",
      "name": "Colorado Mountain Emergency Response Zone",
      "description": "24/7 emergency response covering all major Colorado mountain communities"
    },
    "areaServed": [
      "Aspen", "Vail", "Telluride", "Crested Butte", "Steamboat Springs", 
      "Breckenridge", "Keystone", "Winter Park", "Denver Metro Area"
    ],
    "additionalProperty": [
      {
        "@type": "PropertyValue",
        "name": "Response Time",
        "value": "Within 2 hours"
      },
      {
        "@type": "PropertyValue",
        "name": "Availability", 
        "value": "24/7/365"
      },
      {
        "@type": "PropertyValue",
        "name": "Insurance Direct Billing",
        "value": "Available"
      },
      {
        "@type": "PropertyValue",
        "name": "Emergency Equipment",
        "value": "Fully Equipped Trucks"
      }
    ],
    "potentialAction": [
      {
        "@type": "ReserveAction",
        "name": "Request Emergency Service",
        "description": "Immediate emergency roofing service request",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": "https://alpinepeakroofing.com/emergency?service={emergency_type}",
          "inLanguage": "en-US"
        }
      },
      {
        "@type": "CommunicateAction",
        "name": "Emergency Phone Call",
        "description": "Direct emergency hotline contact",
        "instrument": {
          "@type": "ContactPoint",
          "telephone": "+1-720-555-ROOF",
          "contactType": "Emergency Service"
        }
      }
    ],
    "review": [
      {
        "@type": "Review",
        "author": {
          "@type": "Person",
          "name": "Sarah Johnson"
        },
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        },
        "reviewBody": "Alpine Peak responded to our emergency call in Aspen within an hour during a snowstorm. Professional, fast, and saved our home from water damage.",
        "datePublished": "2024-03-15"
      },
      {
        "@type": "Review", 
        "author": {
          "@type": "Person",
          "name": "Michael Chen"
        },
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5", 
          "bestRating": "5"
        },
        "reviewBody": "Exceptional emergency service in Vail. They had our roof secured within 2 hours of our call. True professionals.",
        "datePublished": "2024-02-28"
      }
    ]
  };

  return (
    <Script
      id="emergency-service-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      strategy="beforeInteractive"
    />
  );
}