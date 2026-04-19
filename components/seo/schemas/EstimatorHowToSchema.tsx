import Script from 'next/script';

/**
 * HowTo structured data for the Alpine Peak Roofing instant estimator.
 *
 * Steps mirror the EstimatorCarousel flow in
 * components/estimator/EstimatorCarousel.tsx so the schema stays truthful to
 * what the user actually sees. Optimized for Google "How to" rich results and
 * voice-assistant answers to queries like
 * "How do I get a roof estimate online?"
 */
export default function EstimatorHowToSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "@id": "https://alpinepeakroofing.com/estimator#howto",
    "name": "How to Get an Instant Roof Estimate Online",
    "description":
      "Get a free, itemized roof replacement estimate in under 60 seconds using satellite imagery and AI-powered roof analysis. No phone call or home visit required.",
    "image": {
      "@type": "ImageObject",
      "url": "https://alpinepeakroofing.com/images/estimator/E5_v3_estimate_delivered.jpg"
    },
    "totalTime": "PT1M",
    "estimatedCost": {
      "@type": "MonetaryAmount",
      "currency": "USD",
      "value": "0"
    },
    "tool": [
      { "@type": "HowToTool", "name": "Internet-connected device (phone, tablet, or computer)" },
      { "@type": "HowToTool", "name": "Your property address" }
    ],
    "supply": [
      { "@type": "HowToSupply", "name": "Valid U.S. property address" }
    ],
    "step": [
      {
        "@type": "HowToStep",
        "position": 1,
        "name": "Enter your property address",
        "text":
          "Type your full property address into the estimator and confirm the correct home on the map. The system instantly matches your address to high-resolution satellite imagery.",
        "url": "https://alpinepeakroofing.com/estimator#step-1",
        "image": "https://alpinepeakroofing.com/images/estimator/E1_v3_address_entry.webp"
      },
      {
        "@type": "HowToStep",
        "position": 2,
        "name": "Confirm the satellite view of your roof",
        "text":
          "Review the aerial satellite view of your roof and confirm that the highlighted property is yours. This ensures every measurement uses your actual roof outline — not a neighbor's.",
        "url": "https://alpinepeakroofing.com/estimator#step-2",
        "image": "https://alpinepeakroofing.com/images/estimator/E2_v4_satellite_confirmation.webp"
      },
      {
        "@type": "HowToStep",
        "position": 3,
        "name": "Let AI analyze your roof",
        "text":
          "Our AI measures every plane of your roof, calculates total square footage and pitch, detects possible hail or storm damage from imagery, and determines exact material quantities needed.",
        "url": "https://alpinepeakroofing.com/estimator#step-3",
        "image": "https://alpinepeakroofing.com/images/estimator/E3_v4_ai_analysis.webp"
      },
      {
        "@type": "HowToStep",
        "position": 4,
        "name": "Choose your roofing material",
        "text":
          "Select from architectural asphalt shingles, standing-seam metal, natural slate, or cedar shake. Live pricing updates in real time as you change materials, colors, and upgrade options.",
        "url": "https://alpinepeakroofing.com/estimator#step-4",
        "image": "https://alpinepeakroofing.com/images/estimator/E4_v3_material_samples.jpg"
      },
      {
        "@type": "HowToStep",
        "position": 5,
        "name": "Receive your itemized estimate",
        "text":
          "Your fully itemized estimate — covering materials, labor, tear-off, underlayment, and timeline — is delivered instantly on-screen and by email. No waiting on a callback and no sales pressure.",
        "url": "https://alpinepeakroofing.com/estimator#step-5",
        "image": "https://alpinepeakroofing.com/images/estimator/E5_v3_estimate_delivered.jpg"
      },
      {
        "@type": "HowToStep",
        "position": 6,
        "name": "Book a free consultation (optional)",
        "text":
          "If you want to move forward, book a free 30-minute consultation with an Alpine Peak project manager to walk through your estimate, discuss insurance options, and schedule installation.",
        "url": "https://alpinepeakroofing.com/estimator#step-6",
        "image": "https://alpinepeakroofing.com/images/estimator/timber_home_brown_roof.jpg"
      }
    ],
    "about": {
      "@type": "Organization",
      "@id": "https://alpinepeakroofing.com/#organization"
    }
  };

  return (
    <Script
      id="estimator-howto-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      strategy="beforeInteractive"
    />
  );
}
