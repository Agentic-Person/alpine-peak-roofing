import Script from 'next/script';

export default function ReviewSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "AggregateRating",
    "@id": "https://alpinepeakroofing.com/#reviews",
    "itemReviewed": {
      "@id": "https://alpinepeakroofing.com/#organization"
    },
    "ratingValue": "4.9",
    "bestRating": "5", 
    "worstRating": "1",
    "ratingCount": "247",
    "reviewCount": "189",
    "review": [
      {
        "@type": "Review",
        "author": {
          "@type": "Person",
          "name": "Jennifer Walsh"
        },
        "reviewRating": {
          "@type": "Rating", 
          "ratingValue": "5",
          "bestRating": "5"
        },
        "reviewBody": "Alpine Peak Roofing transformed our Aspen mountain home with their exceptional craftsmanship and attention to detail. The team handled our complex roof design with professionalism and expertise that exceeded expectations. Their use of sustainable materials aligned perfectly with our environmental values.",
        "datePublished": "2024-08-15",
        "publisher": {
          "@type": "Organization",
          "name": "Google Reviews"
        }
      },
      {
        "@type": "Review",
        "author": {
          "@type": "Person", 
          "name": "Robert Chen"
        },
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        },
        "reviewBody": "Outstanding emergency response during the spring storm season in Vail. Alpine Peak's 24/7 service saved our resort property from significant water damage. Their mountain expertise and rapid response time make them the only choice for serious property owners.",
        "datePublished": "2024-07-22",
        "publisher": {
          "@type": "Organization",
          "name": "Better Business Bureau"
        }
      },
      {
        "@type": "Review",
        "author": {
          "@type": "Person",
          "name": "Maria Rodriguez"
        },
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5", 
          "bestRating": "5"
        },
        "reviewBody": "The historic restoration work on our Telluride Victorian home was absolutely masterful. Alpine Peak preserved the architectural integrity while upgrading the performance to modern standards. Their expertise in historic preservation is unmatched in Colorado.",
        "datePublished": "2024-06-30",
        "publisher": {
          "@type": "Organization",
          "name": "Angie's List"
        }
      },
      {
        "@type": "Review",
        "author": {
          "@type": "Person",
          "name": "David Mitchell"
        },
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        },
        "reviewBody": "From initial consultation to project completion, Alpine Peak demonstrated why they're the premium choice for luxury mountain properties. Their project management, material quality, and workmanship justify every dollar of the investment.",
        "datePublished": "2024-06-10",
        "publisher": {
          "@type": "Organization",
          "name": "HomeAdvisor"
        }
      },
      {
        "@type": "Review",
        "author": {
          "@type": "Person",
          "name": "Lisa Thompson"
        },
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        },
        "reviewBody": "Alpine Peak's sustainable roofing solutions exceeded our environmental goals while delivering stunning aesthetics for our Crested Butte property. Their knowledge of green building practices and mountain conditions is exceptional.",
        "datePublished": "2024-05-18",
        "publisher": {
          "@type": "Organization", 
          "name": "Yelp"
        }
      },
      {
        "@type": "Review",
        "author": {
          "@type": "Person",
          "name": "James Anderson"
        },
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        },
        "reviewBody": "The level of service and expertise provided by Alpine Peak is unmatched in the roofing industry. Their team's professionalism and the quality of their work on our Steamboat Springs home makes them our exclusive choice for all roofing needs.",
        "datePublished": "2024-04-25",
        "publisher": {
          "@type": "Organization",
          "name": "Google Reviews"
        }
      }
    ],
    "additionalProperty": [
      {
        "@type": "PropertyValue",
        "name": "Average Response Time",
        "value": "Same Day"
      },
      {
        "@type": "PropertyValue",
        "name": "Customer Satisfaction Rate",
        "value": "98%"
      },
      {
        "@type": "PropertyValue",
        "name": "Repeat Customer Rate", 
        "value": "85%"
      },
      {
        "@type": "PropertyValue",
        "name": "Referral Rate",
        "value": "92%"
      }
    ],
    "audience": {
      "@type": "Audience",
      "name": "Luxury Property Owners",
      "audienceType": "Premium Mountain Property Owners",
      "geographicArea": [
        "Aspen", "Vail", "Telluride", "Crested Butte", "Steamboat Springs"
      ]
    }
  };

  return (
    <Script
      id="review-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      strategy="beforeInteractive"
    />
  );
}