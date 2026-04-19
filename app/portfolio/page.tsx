import type { Metadata } from 'next';
import PortfolioClient from './PortfolioClient';
import { ImageObjectSchema } from '@/components/seo/schemas';
import { portfolioProjects } from '@/lib/portfolioProjects';

export const metadata: Metadata = {
  title: 'Roofing Portfolio — Completed Projects in Denver & Colorado Mountains | Alpine Peak Roofing',
  description:
    "Browse 12 completed roofing projects across Colorado's mountain communities — standing seam metal in Vail, hand-split Vermont slate in Aspen, historic restorations in Telluride, and commercial installations. See before & after transformations.",
  alternates: {
    canonical: 'https://alpinepeakroofing.com/portfolio',
  },
  openGraph: {
    title: 'Roofing Portfolio — Colorado Mountain Projects | Alpine Peak Roofing',
    description:
      "Residential and commercial roofing projects from Aspen to Durango. Metal, slate, cedar shake, and luxury shingle installations across Colorado's most demanding mountain terrain.",
    url: 'https://alpinepeakroofing.com/portfolio',
    siteName: 'Alpine Peak Roofing',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Roofing Portfolio — Colorado Mountain Projects | Alpine Peak Roofing',
    description:
      "See completed roofing projects across Colorado's mountain communities — metal, slate, cedar shake, and premium shingle installations.",
  },
};

const collectionPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Alpine Peak Roofing Portfolio',
  description:
    "A curated collection of 12 completed premium roofing projects across Colorado's mountain communities, including residential and commercial installations in Aspen, Vail, Telluride, Crested Butte, Steamboat Springs, Breckenridge, and Durango.",
  url: 'https://alpinepeakroofing.com/portfolio',
  provider: {
    '@type': 'Organization',
    name: 'Alpine Peak Roofing',
    url: 'https://alpinepeakroofing.com',
  },
  hasPart: [
    {
      '@type': 'CreativeWork',
      name: 'Summit Ridge Estate',
      description: 'Standing Seam Metal — Weathered Bronze roof on a 4,800 sq ft timber-frame residence in Crested Butte, CO at 9,100 ft elevation.',
      locationCreated: { '@type': 'Place', name: 'Crested Butte, CO' },
      dateCreated: '2023',
      url: 'https://alpinepeakroofing.com/projects/summit-ridge-estate',
    },
    {
      '@type': 'CreativeWork',
      name: 'Elk Meadow Lodge',
      description: 'GAF Timberline HDZ Charcoal on a 5,200 sq ft mountain retreat with nine roof planes in Telluride, CO.',
      locationCreated: { '@type': 'Place', name: 'Telluride, CO' },
      dateCreated: '2022',
      url: 'https://alpinepeakroofing.com/projects/elk-meadow-lodge',
    },
    {
      '@type': 'CreativeWork',
      name: 'Powder Ridge Chalet',
      description: 'Standing Seam Metal — Matte Black on a 3,600 sq ft ski-in chalet in Vail, CO engineered for 120 psf snow load.',
      locationCreated: { '@type': 'Place', name: 'Vail, CO' },
      dateCreated: '2023',
      url: 'https://alpinepeakroofing.com/projects/powder-ridge-chalet',
    },
    {
      '@type': 'CreativeWork',
      name: 'Aspen Grove Retreat',
      description: 'Vermont Black Slate Hand-Split on a 6,100 sq ft estate on Red Mountain in Aspen, CO — 100+ year lifespan.',
      locationCreated: { '@type': 'Place', name: 'Aspen, CO' },
      dateCreated: '2021',
      url: 'https://alpinepeakroofing.com/projects/aspen-grove-retreat',
    },
    {
      '@type': 'CreativeWork',
      name: 'Winter Creek Cabin',
      description: 'GAF Timberline HDZ Barkwood on a 2,800 sq ft family cabin in Winter Park, CO at 9,000 ft elevation.',
      locationCreated: { '@type': 'Place', name: 'Winter Park, CO' },
      dateCreated: '2024',
      url: 'https://alpinepeakroofing.com/projects/winter-creek-cabin',
    },
    {
      '@type': 'CreativeWork',
      name: 'Steamboat Heritage Ranch',
      description: 'Premium Grade Cedar Shake on a 5,600 sq ft ranch estate honoring Steamboat Springs ranching heritage.',
      locationCreated: { '@type': 'Place', name: 'Steamboat Springs, CO' },
      dateCreated: '2022',
      url: 'https://alpinepeakroofing.com/projects/steamboat-ranch',
    },
    {
      '@type': 'CreativeWork',
      name: 'Telluride Copper Lodge',
      description: 'Standing Seam Copper — Natural Patina on a 5,400 sq ft timber-frame home in Telluride, CO at 8,800 ft.',
      locationCreated: { '@type': 'Place', name: 'Telluride, CO' },
      dateCreated: '2024',
      url: 'https://alpinepeakroofing.com/projects/telluride-copper-lodge',
    },
    {
      '@type': 'CreativeWork',
      name: 'Aspen Modern Retreat',
      description: 'Zinc Standing Seam — Natural Matte butterfly roof on a 3,800 sq ft cantilevered modern home in Aspen, CO.',
      locationCreated: { '@type': 'Place', name: 'Aspen, CO' },
      dateCreated: '2025',
      url: 'https://alpinepeakroofing.com/projects/aspen-modern-retreat',
    },
    {
      '@type': 'CreativeWork',
      name: 'Yampa Valley Ranch Estate',
      description: 'Cedar Shake — Premium Hand-Split across 7,200 sq ft on three structures in Steamboat Springs, CO.',
      locationCreated: { '@type': 'Place', name: 'Steamboat Springs, CO' },
      dateCreated: '2023',
      url: 'https://alpinepeakroofing.com/projects/yampa-valley-ranch',
    },
    {
      '@type': 'CreativeWork',
      name: 'Château de Vail',
      description: 'Vermont Slate — Deep Charcoal with Copper Accents on a 5,800 sq ft European-inspired estate in Vail, CO.',
      locationCreated: { '@type': 'Place', name: 'Vail, CO' },
      dateCreated: '2022',
      url: 'https://alpinepeakroofing.com/projects/vail-chateau',
    },
    {
      '@type': 'CreativeWork',
      name: 'Peak 8 Ski Lodge',
      description: 'GAF Timberline HDZ Weathered Wood on a 4,200 sq ft ski-in/ski-out lodge in Breckenridge, CO at 9,600 ft.',
      locationCreated: { '@type': 'Place', name: 'Breckenridge, CO' },
      dateCreated: '2024',
      url: 'https://alpinepeakroofing.com/projects/breckenridge-ski-lodge',
    },
    {
      '@type': 'CreativeWork',
      name: 'Animas River Craftsman',
      description: 'GAF Timberline HDZ Weathered Wood on a 4,600 sq ft multi-level craftsman home overlooking the Animas River in Durango, CO.',
      locationCreated: { '@type': 'Place', name: 'Durango, CO' },
      dateCreated: '2023',
      url: 'https://alpinepeakroofing.com/projects/durango-river-house',
    },
  ],
};

// Turn "Vail, CO" → "Vail, Colorado" for schema.org contentLocation.
function normalizeLocation(projectLocation: string): string {
  const [city] = projectLocation.split(',').map((s) => s.trim());
  return city ? `${city}, Colorado` : 'Colorado';
}

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionPageSchema) }}
      />
      {portfolioProjects.map((project) => (
        <ImageObjectSchema
          key={project.id}
          idSuffix={project.id}
          url={project.image}
          name={`${project.title} — ${project.location}`}
          caption={`${project.title}: ${project.roofType} on a ${project.homeSqft.toLocaleString()} sq ft residence in ${project.location} (${project.elevation}). ${project.tagline}`}
          contentLocation={normalizeLocation(project.location)}
          uploadDate={`${project.year}-01-01`}
        />
      ))}
      <PortfolioClient />
    </>
  );
}
