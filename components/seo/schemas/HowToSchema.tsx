import Script from 'next/script';

export interface HowToStepInput {
  /** Short title of the step — e.g. "Free Inspection & Assessment". */
  name: string;
  /** Full prose instructions for the step. */
  text: string;
  /** Optional deep-link to the step anchor on the live page. */
  url?: string;
  /** Optional illustrative image URL. */
  image?: string;
}

export interface HowToSchemaProps {
  /** Page-facing name of the HowTo (used as the schema `name`). */
  name: string;
  /** Summary description for crawlers and answer engines. */
  description: string;
  /** Optional ISO 8601 duration — e.g. "PT1H", "P14D". */
  totalTime?: string;
  /** Optional monetary estimate (USD). Use a numeric string or "0". */
  estimatedCost?: string;
  /** Optional list of supplies required to complete the HowTo. */
  supply?: string[];
  /** Optional list of tools required to complete the HowTo. */
  tool?: string[];
  /** Ordered list of steps — `position` is derived from array index. */
  steps: HowToStepInput[];
  /** Optional schema `@id` — defaults to `<first-step-url or empty>#howto`. */
  id?: string;
  /** Optional unique id for the injected <script> tag. */
  scriptId?: string;
  /** Optional hero image URL for the HowTo. */
  image?: string;
}

/**
 * Emits a schema.org `HowTo` JSON-LD block. Designed to be reusable across
 * process-oriented pages (e.g. `/process`, guides, how-to articles) so every
 * HowTo on the site uses the same schema shape and entity wiring back to the
 * Alpine Peak Roofing organization.
 */
export default function HowToSchema({
  name,
  description,
  totalTime,
  estimatedCost,
  supply,
  tool,
  steps,
  id,
  scriptId,
  image,
}: HowToSchemaProps) {
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    '@id': id ?? `${steps[0]?.url ?? 'https://alpinepeakroofing.com'}#howto`,
    name,
    description,
    step: steps.map((step, index) => {
      const entry: Record<string, unknown> = {
        '@type': 'HowToStep',
        position: index + 1,
        name: step.name,
        text: step.text,
      };
      if (step.url) entry.url = step.url;
      if (step.image) entry.image = step.image;
      return entry;
    }),
    about: {
      '@type': 'Organization',
      '@id': 'https://alpinepeakroofing.com/#organization',
    },
  };

  if (totalTime) schema.totalTime = totalTime;

  if (estimatedCost) {
    schema.estimatedCost = {
      '@type': 'MonetaryAmount',
      currency: 'USD',
      value: estimatedCost,
    };
  }

  if (supply && supply.length > 0) {
    schema.supply = supply.map((s) => ({ '@type': 'HowToSupply', name: s }));
  }

  if (tool && tool.length > 0) {
    schema.tool = tool.map((t) => ({ '@type': 'HowToTool', name: t }));
  }

  if (image) {
    schema.image = { '@type': 'ImageObject', url: image };
  }

  return (
    <Script
      id={scriptId ?? `howto-schema-${name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      strategy="beforeInteractive"
    />
  );
}
