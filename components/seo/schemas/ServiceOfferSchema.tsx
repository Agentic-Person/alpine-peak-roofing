import { jsonLdHtml } from './jsonLd';

export interface ServiceOfferItem {
  /** Display name of the offer (e.g. "GAF Timberline Installed") */
  name: string;
  /** Optional description shown to crawlers for this specific offer. */
  description?: string;
  /** Low end of the price range in USD (omit to use `priceRange` string only). */
  minPrice?: number;
  /** High end of the price range in USD. */
  maxPrice?: number;
  /** Optional unit the price applies to, e.g. "sqft" or "project". Defaults to "sqft". */
  unitText?: string;
  /** schema.org availability URL. Defaults to `https://schema.org/InStock`. */
  availability?: string;
}

export interface ServiceOfferSchemaProps {
  /** Service name — e.g. "Complete Roof Replacement". */
  name: string;
  /** Plain-language description of the service. */
  description: string;
  /** schema.org `Service.serviceType` — e.g. "Roof Replacement". */
  serviceType: string;
  /** Full canonical URL of the service page (e.g. "https://alpinepeakroofing.com/services/..."). */
  url: string;
  /** Optional single-price range fallback when numeric bounds aren't available (e.g. "$$$"). */
  priceRange?: string;
  /** Optional numeric low-end price (USD). */
  minPrice?: number;
  /** Optional numeric high-end price (USD). */
  maxPrice?: number;
  /** Optional unit the min/max price applies to (e.g. "sqft", "project"). Defaults to "sqft". */
  unitText?: string;
  /** schema.org availability URL. Defaults to `https://schema.org/InStock`. */
  availability?: string;
  /** Optional per-variant offers (e.g. multiple material tiers). When present, rendered as an `AggregateOffer` with nested `Offer`s. */
  offers?: ServiceOfferItem[];
  /** Optional unique id for the injected script tag. */
  id?: string;
}

const DEFAULT_AREA_SERVED = [
  'Denver, Colorado',
  'Boulder, Colorado',
  'Aspen, Colorado',
  'Vail, Colorado',
  'Telluride, Colorado',
  'Crested Butte, Colorado',
  'Breckenridge, Colorado',
  'Winter Park, Colorado',
  'Steamboat Springs, Colorado',
  'Fort Collins, Colorado',
  'Colorado Springs, Colorado',
];

/**
 * Emits a schema.org `Service` JSON-LD block with a nested `Offer` or
 * `AggregateOffer` so Google and answer engines can surface pricing signals
 * alongside the service entry. `provider` points back to the Alpine Peak
 * Roofing organization entity defined in `PrimaryBusinessSchema`.
 */
export default function ServiceOfferSchema({
  name,
  description,
  serviceType,
  url,
  priceRange,
  minPrice,
  maxPrice,
  unitText = 'sqft',
  availability = 'https://schema.org/InStock',
  offers,
  id,
}: ServiceOfferSchemaProps) {
  const buildOffer = (item: ServiceOfferItem) => {
    const offer: Record<string, unknown> = {
      '@type': 'Offer',
      name: item.name,
      priceCurrency: 'USD',
      availability: item.availability ?? availability,
      url,
      seller: { '@id': 'https://alpinepeakroofing.com/#organization' },
    };
    if (item.description) offer.description = item.description;
    if (typeof item.minPrice === 'number' && typeof item.maxPrice === 'number') {
      offer.priceSpecification = {
        '@type': 'UnitPriceSpecification',
        priceCurrency: 'USD',
        minPrice: item.minPrice,
        maxPrice: item.maxPrice,
        unitText: item.unitText ?? unitText,
      };
    } else if (typeof item.minPrice === 'number') {
      offer.price = item.minPrice;
    }
    return offer;
  };

  const topLevelOffer: Record<string, unknown> = (() => {
    if (offers && offers.length > 0) {
      const numericMins = offers
        .map((o) => o.minPrice)
        .filter((v): v is number => typeof v === 'number');
      const numericMaxes = offers
        .map((o) => o.maxPrice ?? o.minPrice)
        .filter((v): v is number => typeof v === 'number');
      const aggregate: Record<string, unknown> = {
        '@type': 'AggregateOffer',
        priceCurrency: 'USD',
        availability,
        offerCount: offers.length,
        url,
        offers: offers.map(buildOffer),
      };
      if (numericMins.length > 0) aggregate.lowPrice = Math.min(...numericMins);
      if (numericMaxes.length > 0) aggregate.highPrice = Math.max(...numericMaxes);
      return aggregate;
    }

    const offer: Record<string, unknown> = {
      '@type': 'Offer',
      name,
      priceCurrency: 'USD',
      availability,
      url,
      seller: { '@id': 'https://alpinepeakroofing.com/#organization' },
    };
    if (typeof minPrice === 'number' && typeof maxPrice === 'number') {
      offer.priceSpecification = {
        '@type': 'UnitPriceSpecification',
        priceCurrency: 'USD',
        minPrice,
        maxPrice,
        unitText,
      };
    } else if (typeof minPrice === 'number') {
      offer.price = minPrice;
    }
    return offer;
  })();

  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${url}#service-offer`,
    name,
    description,
    serviceType,
    url,
    provider: { '@id': 'https://alpinepeakroofing.com/#organization' },
    areaServed: [
      {
        '@type': 'State',
        name: 'Colorado',
      },
      ...DEFAULT_AREA_SERVED.map((city) => ({
        '@type': 'City',
        name: city,
      })),
    ],
    offers: topLevelOffer,
  };

  if (priceRange) {
    schema.priceRange = priceRange;
  }

  return (
    <script
      id={id ?? `service-offer-schema-${name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: jsonLdHtml(schema) }}
    />
  );
}
