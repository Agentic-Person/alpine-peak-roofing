/*
 * DESIGN: Mountain Modernism — Alpine Luxury Editorial
 * Process page: Step-by-step workflow from consultation to completion
 * Server Component — AEO/SEO optimized with HowTo JSON-LD schema
 */
import type { Metadata } from "next";
import Image from "next/image";
import { images } from "@/lib/images";
import ProcessHeroAnimated from "@/components/process/islands/ProcessHeroAnimated";
import ProcessStepsAnimated, { type ProcessStep } from "@/components/process/islands/ProcessStepsAnimated";
import ProcessGuaranteesAnimated from "@/components/process/islands/ProcessGuaranteesAnimated";

export const metadata: Metadata = {
  title: "Our Roofing Process | Alpine Peak Roofing — Denver, Colorado",
  description:
    "Discover Alpine Peak Roofing's proven 6-step process — from free consultation and comprehensive inspection through expert installation and final warranty handover. Transparent, quality-driven roofing in Colorado.",
  keywords:
    "roofing process Colorado, roof installation steps, roofing methodology Denver, quality assurance roofing, Colorado roofing contractors process",
  alternates: {
    canonical: "https://alpinepeakroofing.com/process",
  },
  openGraph: {
    title: "Our Proven Roofing Process | Alpine Peak Roofing",
    description:
      "6 transparent steps from consultation to warranty — see exactly how Alpine Peak Roofing delivers a seamless experience for every Colorado homeowner.",
    url: "https://alpinepeakroofing.com/process",
    type: "website",
  },
};

const steps: ProcessStep[] = [
  {
    number: "01",
    iconIndex: 0, // Phone
    title: "Initial Consultation",
    description:
      "It all starts with a conversation. Call us or fill out our online form to schedule your free consultation. We'll discuss your needs, timeline, and budget — and conduct a complete property evaluation with photographic documentation.",
    details: [
      "Free, no-obligation consultation",
      "Discuss your goals and concerns",
      "Preliminary timeline and budget discussion",
      "Answer all your questions",
    ],
  },
  {
    number: "02",
    iconIndex: 1, // Search
    title: "Comprehensive Inspection",
    description:
      "Our certified inspectors conduct a thorough evaluation of your existing roof using the latest technology, including drone imagery, infrared moisture detection, and structural engineering assessment. We document every finding with photos and detailed notes.",
    details: [
      "Full roof and attic inspection",
      "Drone aerial photography",
      "Moisture and ventilation assessment",
      "Detailed photo documentation",
    ],
  },
  {
    number: "03",
    iconIndex: 2, // FileText
    title: "Detailed Proposal",
    description:
      "You'll receive a comprehensive, transparent proposal that outlines every aspect of your project — materials, labor, timeline, warranty, and pricing. We handle all required permits and insurance coordination. No hidden fees, no surprises.",
    details: [
      "Itemized cost breakdown",
      "Material specifications and options",
      "Project timeline with milestones",
      "Warranty details and coverage",
    ],
  },
  {
    number: "04",
    iconIndex: 3, // Ruler
    title: "Material Selection",
    description:
      "Work with our design team to select the perfect materials for your project. We'll bring samples to your home and help you choose colors, textures, and styles that complement your architecture and Colorado climate.",
    details: [
      "In-home material samples",
      "Color and style consultation",
      "Energy efficiency recommendations",
      "Manufacturer warranty comparison",
    ],
  },
  {
    number: "05",
    iconIndex: 4, // HardHat
    title: "Expert Installation",
    description:
      "Our factory-certified crews execute your project with precision and care. We follow OSHA-compliant safety protocols, protect your property with magnetic nail sweeps and debris removal, and keep you informed with daily progress updates.",
    details: [
      "Property protection setup",
      "Factory-certified installation crew",
      "Daily progress updates",
      "Clean worksite maintained throughout",
    ],
  },
  {
    number: "06",
    iconIndex: 5, // CheckCircle2
    title: "Final Inspection & Warranty",
    description:
      "We conduct a rigorous final inspection to ensure every detail meets our exacting standards. You'll receive your warranty documentation, complete project photo file, and a customized maintenance guide for long-term roof care.",
    details: [
      "Multi-point quality inspection",
      "Warranty registration and documentation",
      "Complete project photo file",
      "Ongoing maintenance recommendations",
    ],
  },
];

// HowTo JSON-LD schema for AEO (answer engines love structured how-to content)
const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How Alpine Peak Roofing Handles Your Roofing Project",
  description:
    "A 6-step process from initial consultation through expert installation and final warranty handover, designed for complete transparency and quality.",
  totalTime: "P14D",
  estimatedCost: {
    "@type": "MonetaryAmount",
    currency: "USD",
    value: "Contact for free estimate",
  },
  supply: [
    { "@type": "HowToSupply", name: "Premium roofing materials" },
    { "@type": "HowToSupply", name: "Factory-certified installation crew" },
  ],
  tool: [
    { "@type": "HowToTool", name: "Drone inspection equipment" },
    { "@type": "HowToTool", name: "Infrared moisture detection technology" },
  ],
  step: steps.map((s) => ({
    "@type": "HowToStep",
    name: s.title,
    text: s.description,
    position: parseInt(s.number, 10),
  })),
};

export default function ProcessPage() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />

      {/* Hero */}
      <section
        aria-label="Process hero"
        className="relative py-32 lg:py-40 overflow-hidden"
      >
        <div className="absolute inset-0">
          <Image
            src={images.inspection}
            alt="Roof inspection process"
            fill
            className="object-cover"
            priority
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[oklch(0.10_0.03_260/0.92)] via-[oklch(0.12_0.03_260/0.80)] to-[oklch(0.12_0.03_260/0.5)]" />
        </div>
        <div className="relative container">
          <div className="max-w-3xl">
            <ProcessHeroAnimated />
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" className="w-full" preserveAspectRatio="none">
            <path d="M0 80L1440 30V80H0Z" fill="oklch(0.12 0.03 260)" />
          </svg>
        </div>
      </section>

      {/* Process Steps — semantic ordered list for AEO */}
      <section
        aria-labelledby="process-steps-heading"
        className="bg-navy-dark py-24"
      >
        <div className="container">
          {/* Hidden but crawlable semantic list — the animated version is the visual layer */}
          <h2 id="process-steps-heading" className="sr-only">
            Our 6-Step Roofing Process
          </h2>
          <ol className="sr-only" aria-label="Roofing process steps">
            {steps.map((step) => (
              <li key={step.number}>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
                <ul>
                  {step.details.map((d) => (
                    <li key={d}>{d}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
          {/* Visual animated layer */}
          <ProcessStepsAnimated steps={steps} />
        </div>
      </section>

      {/* Guarantees + CTA */}
      <ProcessGuaranteesAnimated />
    </main>
  );
}
