/**
 * SchemaMarkup.tsx — Alpine Peak Roofing
 * Reusable JSON-LD structured data component for SEO/AEO optimization.
 * Next.js App Router version — renders <script> tags server-side (SSR-safe).
 * Supports: LocalBusiness, Service, BlogPosting, BreadcrumbList, FAQPage, WebSite, WebPage
 */

const COMPANY = {
  name: 'Alpine Peak Roofing',
  url: 'https://alpinepeakroofing.com',
  logo: 'https://alpinepeakroofing.com/logo.png',
  phone: '(970) 446-8995',
  email: 'info@alpinepeakroofing.com',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Summit County',
    addressLocality: 'Frisco',
    addressRegion: 'CO',
    postalCode: '80443',
    addressCountry: 'US',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 39.5747,
    longitude: -106.0975,
  },
  priceRange: '$$-$$$$',
  foundingDate: '1989',
  description: "Colorado's premier roofing specialists serving mountain communities from Aspen to Telluride. Expert craftsmanship meets mountain-grade durability.",
  sameAs: [
    'https://www.facebook.com/alpinepeakroofing',
    'https://www.instagram.com/alpinepeakroofing',
    'https://www.linkedin.com/company/alpinepeakroofing',
  ],
  areaServed: [
    'Aspen, CO', 'Vail, CO', 'Telluride, CO', 'Crested Butte, CO',
    'Steamboat Springs, CO', 'Winter Park, CO', 'Breckenridge, CO',
    'Durango, CO', 'Glenwood Springs, CO', 'Frisco, CO',
    'Silverthorne, CO', 'Central Mountains, CO',
  ],
};

function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

// ─── LocalBusiness Schema (Homepage) ────────────────────────────────────────
export function LocalBusinessSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'RoofingContractor',
    '@id': `${COMPANY.url}/#organization`,
    name: COMPANY.name,
    url: COMPANY.url,
    logo: COMPANY.logo,
    image: COMPANY.logo,
    telephone: COMPANY.phone,
    email: COMPANY.email,
    address: COMPANY.address,
    geo: COMPANY.geo,
    priceRange: COMPANY.priceRange,
    foundingDate: COMPANY.foundingDate,
    description: COMPANY.description,
    sameAs: COMPANY.sameAs,
    areaServed: COMPANY.areaServed.map(area => ({
      '@type': 'City',
      name: area,
    })),
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Roofing Services',
      itemListElement: [
        {
          '@type': 'OfferCatalog',
          name: 'Residential Roofing Services',
          itemListElement: [
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Complete Roof Replacement' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Roof Repairs' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'New Construction Roofing' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Gutter Systems' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Ventilation' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Skylights & Solar' } },
          ],
        },
        {
          '@type': 'OfferCatalog',
          name: 'Commercial Roofing Services',
          itemListElement: [
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Flat Roof Systems (TPO/PVC/EPDM)' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Commercial Metal Roofing' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Commercial Maintenance Programs' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Roof Coatings & Restoration' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Snow & Ice Management' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Commercial Emergency Repairs' } },
          ],
        },
      ],
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '487',
      bestRating: '5',
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '07:00',
        closes: '18:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Saturday',
        opens: '08:00',
        closes: '16:00',
      },
    ],
  };
  return <JsonLd data={schema} />;
}

// ─── WebSite Schema (Homepage) ──────────────────────────────────────────────
export function WebSiteSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: COMPANY.name,
    url: COMPANY.url,
    description: COMPANY.description,
    publisher: {
      '@type': 'Organization',
      name: COMPANY.name,
      logo: { '@type': 'ImageObject', url: COMPANY.logo },
    },
  };
  return <JsonLd data={schema} />;
}

// ─── BreadcrumbList Schema ──────────────────────────────────────────────────
interface BreadcrumbItem {
  name: string;
  url: string;
}

export function BreadcrumbSchema({ items }: { items: BreadcrumbItem[] }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${COMPANY.url}${item.url}`,
    })),
  };
  return <JsonLd data={schema} />;
}

// ─── Service Schema (Individual Service Pages) ─────────────────────────────
interface ServiceSchemaProps {
  name: string;
  description: string;
  image: string;
  url: string;
  category: string;
  areaServed?: string[];
}

export function ServiceSchema({ name, description, image, url, category, areaServed }: ServiceSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    image,
    url: `${COMPANY.url}${url}`,
    serviceType: name,
    category,
    provider: {
      '@type': 'RoofingContractor',
      name: COMPANY.name,
      url: COMPANY.url,
      telephone: COMPANY.phone,
      address: COMPANY.address,
    },
    areaServed: (areaServed || COMPANY.areaServed).map(area => ({
      '@type': 'City',
      name: area,
    })),
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      priceSpecification: {
        '@type': 'PriceSpecification',
        priceCurrency: 'USD',
      },
    },
  };
  return <JsonLd data={schema} />;
}

// ─── FAQ Schema (Service Detail Pages) ──────────────────────────────────────
interface FAQItem {
  question: string;
  answer: string;
}

export function FAQSchema({ faqs }: { faqs: FAQItem[] }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
  return <JsonLd data={schema} />;
}

// ─── BlogPosting Schema ─────────────────────────────────────────────────────
interface BlogPostSchemaProps {
  title: string;
  description: string;
  image: string;
  url: string;
  datePublished: string;
  dateModified?: string;
  author?: string;
  category?: string;
  tags?: string[];
}

export function BlogPostSchema({ title, description, image, url, datePublished, dateModified, author, category, tags }: BlogPostSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description,
    image,
    url: `${COMPANY.url}${url}`,
    datePublished,
    dateModified: dateModified || datePublished,
    author: {
      '@type': 'Organization',
      name: author || COMPANY.name,
      url: COMPANY.url,
    },
    publisher: {
      '@type': 'Organization',
      name: COMPANY.name,
      logo: { '@type': 'ImageObject', url: COMPANY.logo },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${COMPANY.url}${url}`,
    },
    ...(category && { articleSection: category }),
    ...(tags && tags.length > 0 && { keywords: tags.join(', ') }),
  };
  return <JsonLd data={schema} />;
}

// ─── Blog Listing Schema ────────────────────────────────────────────────────
interface BlogListItem {
  title: string;
  url: string;
}

export function BlogListSchema({ posts }: { posts: BlogListItem[] }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Alpine Peak Roofing Blog',
    description: "Expert roofing insights, maintenance tips, and industry updates from Colorado's premier mountain roofing specialists.",
    url: `${COMPANY.url}/blog`,
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: posts.map((post, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        url: `${COMPANY.url}${post.url}`,
        name: post.title,
      })),
    },
  };
  return <JsonLd data={schema} />;
}

// ─── Location Schema (Location Detail Pages) ───────────────────────────────
interface LocationSchemaProps {
  name: string;
  description: string;
  image: string;
  url: string;
  elevation?: string;
}

export function LocationSchema({ name, description, image, url, elevation }: LocationSchemaProps) {
  const schema = [
    {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      name: `Alpine Peak Roofing — ${name}`,
      description,
      image,
      url: `${COMPANY.url}${url}`,
      telephone: COMPANY.phone,
      address: {
        '@type': 'PostalAddress',
        addressLocality: name,
        addressRegion: 'CO',
        addressCountry: 'US',
      },
      parentOrganization: {
        '@type': 'RoofingContractor',
        name: COMPANY.name,
        url: COMPANY.url,
      },
      areaServed: {
        '@type': 'City',
        name: `${name}, CO`,
      },
      ...(elevation && { additionalProperty: { '@type': 'PropertyValue', name: 'Elevation', value: elevation } }),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: `Roofing Services in ${name}, Colorado`,
      description: `Professional residential and commercial roofing services in ${name}, CO. Expert mountain roofing solutions from Alpine Peak Roofing.`,
      provider: {
        '@type': 'RoofingContractor',
        name: COMPANY.name,
        url: COMPANY.url,
      },
      areaServed: {
        '@type': 'City',
        name: `${name}, CO`,
      },
      serviceType: 'Roofing',
    },
  ];
  return <JsonLd data={schema as unknown as Record<string, unknown>} />;
}

// ─── About Page Schema ──────────────────────────────────────────────────────
export function AboutPageSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'About Alpine Peak Roofing',
    description: "Learn about Alpine Peak Roofing — Colorado's premier mountain roofing specialists since 1989. Our story, team, and commitment to excellence.",
    url: `${COMPANY.url}/about`,
    mainEntity: {
      '@type': 'RoofingContractor',
      '@id': `${COMPANY.url}/#organization`,
      name: COMPANY.name,
      foundingDate: COMPANY.foundingDate,
      description: COMPANY.description,
    },
  };
  return <JsonLd data={schema} />;
}

// ─── Contact Page Schema ────────────────────────────────────────────────────
export function ContactPageSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact Alpine Peak Roofing',
    description: 'Get in touch with Alpine Peak Roofing for a free estimate. Call (970) 446-8995 or fill out our contact form.',
    url: `${COMPANY.url}/contact`,
    mainEntity: {
      '@type': 'RoofingContractor',
      name: COMPANY.name,
      telephone: COMPANY.phone,
      email: COMPANY.email,
      address: COMPANY.address,
    },
  };
  return <JsonLd data={schema} />;
}

// ─── Portfolio/Gallery Schema ───────────────────────────────────────────────
interface PortfolioItem {
  name: string;
  image: string;
  description: string;
}

export function PortfolioSchema({ items }: { items: PortfolioItem[] }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Alpine Peak Roofing Portfolio',
    description: "View our completed roofing projects across Colorado's mountain communities. From luxury residential to commercial installations.",
    url: `${COMPANY.url}/portfolio`,
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: items.map((item, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        item: {
          '@type': 'CreativeWork',
          name: item.name,
          image: item.image,
          description: item.description,
        },
      })),
    },
  };
  return <JsonLd data={schema} />;
}

// ─── Services Overview Schema ───────────────────────────────────────────────
export function ServicesOverviewSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Roofing Services | Alpine Peak Roofing',
    description: "Comprehensive residential and commercial roofing services across Colorado's mountain communities. From repairs to full replacements.",
    url: `${COMPANY.url}/services`,
    mainEntity: {
      '@type': 'ItemList',
      name: 'Roofing Services',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Residential Roofing Services', url: `${COMPANY.url}/services/residential` },
        { '@type': 'ListItem', position: 2, name: 'Commercial Roofing Services', url: `${COMPANY.url}/services/commercial` },
        { '@type': 'ListItem', position: 3, name: 'Storm Damage Services', url: `${COMPANY.url}/services/storm-damage` },
      ],
    },
    provider: {
      '@type': 'RoofingContractor',
      name: COMPANY.name,
      url: COMPANY.url,
    },
  };
  return <JsonLd data={schema} />;
}

// ─── Locations Overview Schema ──────────────────────────────────────────────
interface LocationListItem {
  name: string;
  slug: string;
}

export function LocationsOverviewSchema({ locations }: { locations: LocationListItem[] }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Service Areas | Alpine Peak Roofing',
    description: 'Alpine Peak Roofing serves 12 mountain communities across Colorado. Find roofing services near you.',
    url: `${COMPANY.url}/locations`,
    mainEntity: {
      '@type': 'ItemList',
      name: 'Service Areas',
      itemListElement: locations.map((loc, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: `${loc.name}, Colorado`,
        url: `${COMPANY.url}/locations/${loc.slug}`,
      })),
    },
  };
  return <JsonLd data={schema} />;
}

// ─── Review/Testimonial Schema (Service Detail Pages) ─────────────────────
interface ReviewSchemaProps {
  serviceName: string;
  serviceUrl: string;
  reviews: {
    name: string;
    location: string;
    rating: number;
    date: string;
    text: string;
  }[];
}

export function ReviewSchema({ serviceName, serviceUrl, reviews }: ReviewSchemaProps) {
  if (!reviews || reviews.length === 0) return null;

  const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: serviceName,
    url: `${COMPANY.url}${serviceUrl}`,
    provider: {
      '@type': 'RoofingContractor',
      name: COMPANY.name,
      url: COMPANY.url,
      telephone: COMPANY.phone,
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: avgRating.toFixed(1),
      reviewCount: reviews.length.toString(),
      bestRating: '5',
      worstRating: '1',
    },
    review: reviews.map((r) => ({
      '@type': 'Review',
      author: {
        '@type': 'Person',
        name: r.name,
      },
      datePublished: r.date,
      reviewRating: {
        '@type': 'Rating',
        ratingValue: r.rating.toString(),
        bestRating: '5',
        worstRating: '1',
      },
      reviewBody: r.text,
    })),
  };
  return <JsonLd data={schema} />;
}
