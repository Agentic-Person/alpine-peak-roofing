import Script from 'next/script';

export default function PrimaryBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "RoofingContractor", "ProfessionalService"],
    "@id": "https://alpinepeakroofing.com/#organization",
    "name": "Alpine Peak Roofing",
    "legalName": "Alpine Peak Roofing LLC",
    "slogan": "Pinnacle of Protection, Peak of Performance",
    "description": "Premier mountain roofing specialists serving Colorado's exclusive mountain communities including Aspen, Vail, and Telluride. Specializing in high-altitude sustainable roofing solutions with 24/7 emergency service.",
    "url": "https://alpinepeakroofing.com",
    "logo": "https://alpinepeakroofing.com/logo.png",
    "image": [
      "https://alpinepeakroofing.com/images/company/alpine-peak-team.jpg",
      "https://alpinepeakroofing.com/images/portfolio/luxury-mountain-home.jpg"
    ],
    "telephone": "+1-720-555-ROOF",
    "email": "contact@alpinepeakroofing.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "123 Mountain View Drive",
      "addressLocality": "Denver",
      "addressRegion": "Colorado",
      "postalCode": "80202",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "39.7392",
      "longitude": "-104.9903"
    },
    "areaServed": [
      {
        "@type": "City",
        "name": "Aspen",
        "containedInPlace": { "@type": "State", "name": "Colorado" }
      },
      {
        "@type": "City", 
        "name": "Vail",
        "containedInPlace": { "@type": "State", "name": "Colorado" }
      },
      {
        "@type": "City",
        "name": "Telluride", 
        "containedInPlace": { "@type": "State", "name": "Colorado" }
      }
    ],
    "serviceType": [
      "Luxury Mountain Roofing",
      "High-Altitude Roofing Specialist",
      "Sustainable Roofing Solutions",
      "Emergency Storm Response",
      "Historic Preservation Roofing"
    ],
    "priceRange": "$$$$",
    "currenciesAccepted": "USD",
    "paymentAccepted": ["Cash", "Credit Card", "Check", "Insurance Claims"],
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
      }
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Premium Mountain Roofing Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Luxury Residential Roofing",
            "description": "Premium roofing solutions for exclusive mountain properties"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service", 
            "name": "Commercial Mountain Roofing",
            "description": "Specialized commercial roofing for mountain resorts and businesses"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "24/7 Emergency Storm Response",
            "description": "Immediate response for weather-related roofing emergencies"
          }
        }
      ]
    },
    "knowsAbout": [
      "High-altitude roofing challenges",
      "Mountain weather patterns",
      "Sustainable roofing materials",
      "Historic preservation techniques",
      "Luxury home construction",
      "Insurance claim processing"
    ],
    "founder": {
      "@type": "Person",
      "name": "Michael Alpine",
      "jobTitle": "Master Roofer & Company Founder"
    },
    "employee": [
      {
        "@type": "Person",
        "name": "Sarah Peak",
        "jobTitle": "Project Manager"
      },
      {
        "@type": "Person",
        "name": "David Ridge", 
        "jobTitle": "Lead Foreman"
      }
    ],
    "award": [
      "Best Mountain Roofing Contractor 2024",
      "Sustainable Business Leadership Award",
      "Aspen Chamber of Commerce Excellence Award"
    ],
    "memberOf": [
      {
        "@type": "Organization",
        "name": "National Roofing Contractors Association"
      },
      {
        "@type": "Organization",
        "name": "Better Business Bureau"
      }
    ]
  };

  return (
    <Script
      id="primary-business-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      strategy="beforeInteractive"
    />
  );
}