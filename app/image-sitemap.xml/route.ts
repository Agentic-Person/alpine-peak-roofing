import { NextResponse } from 'next/server'
import { images, logoNew } from '@/lib/images'
import { materials } from '@/lib/materials'
import { locations } from '@/lib/locations'
import { portfolioProjects } from '@/lib/portfolioProjects'

// Google Image Sitemap protocol reference:
// https://developers.google.com/search/docs/crawling-indexing/sitemaps/image-sitemaps
//
// Each <url> entry represents a page on the site and lists every image that
// appears on that page via <image:image> children. Each image block carries
// <image:loc>, <image:caption>, <image:title>, and where appropriate
// <image:geo_location> pointing at the real Colorado locality.

const BASE_URL = 'https://alpinepeakroofing.com'
const DEFAULT_GEO = 'Denver, Colorado'

interface ImageEntry {
  loc: string
  caption: string
  title: string
  geoLocation?: string
  license?: string
}

interface PageEntry {
  url: string
  lastModified: string
  images: ImageEntry[]
}

// XML-safe escape for text nodes.
function xmlEscape(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

// Humanize a project-image key or slug for a fallback caption.
function humanize(input: string): string {
  return input
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .trim()
}

// Map a location slug to its "City, Colorado" form for <image:geo_location>.
function locationGeo(slug: string): string {
  const loc = locations.find((l) => l.slug === slug)
  if (!loc) return DEFAULT_GEO
  if (slug === 'central-mountains') return 'Central Colorado Mountains, Colorado'
  return `${loc.name}, Colorado`
}

// Extract "City" from a portfolio project's `location` field ("Vail, CO") and
// return the "City, Colorado" geo string Google recognises.
function projectGeo(projectLocation: string): string {
  const [city] = projectLocation.split(',').map((s) => s.trim())
  if (!city) return DEFAULT_GEO
  return `${city}, Colorado`
}

export async function GET() {
  const now = new Date().toISOString()
  const pages: PageEntry[] = []

  // Home page — the marquee hero, logo, team, and gallery shots all appear here.
  pages.push({
    url: `${BASE_URL}/`,
    lastModified: now,
    images: [
      {
        loc: images.heroHome,
        title: 'Alpine Peak Roofing — Denver Colorado Roofing Contractor',
        caption:
          'Alpine Peak Roofing premium residential roof installation in the Denver metro area, featuring Class 4 impact-resistant architectural shingles and custom copper flashing.',
        geoLocation: DEFAULT_GEO,
      },
      {
        loc: logoNew,
        title: 'Alpine Peak Roofing Logo',
        caption:
          'Alpine Peak Roofing logo — Pinnacle of Protection, Peak of Performance. Denver, Colorado roofing contractor serving the Front Range and mountain communities.',
        geoLocation: DEFAULT_GEO,
      },
      {
        loc: images.teamPhoto,
        title: 'Alpine Peak Roofing Crew',
        caption:
          'Alpine Peak Roofing installation crew — factory-certified GAF Master Elite installers based in Denver, Colorado.',
        geoLocation: DEFAULT_GEO,
      },
      {
        loc: images.gallery1,
        title: 'Mountain Standing Seam Metal Roof',
        caption:
          'Standing seam metal roof installation on a Colorado mountain residence, engineered for heavy snow load and high-altitude UV exposure.',
        geoLocation: 'Crested Butte, Colorado',
      },
      {
        loc: images.gallery2,
        title: 'Architectural Shingle Mountain Home',
        caption:
          'GAF Timberline HDZ architectural shingle roof on a Telluride mountain lodge with nine distinct roof planes and custom copper flashing.',
        geoLocation: 'Telluride, Colorado',
      },
      {
        loc: images.gallery3,
        title: 'Matte Black Standing Seam Chalet Roof',
        caption:
          'Matte black standing seam metal roof on a ski-in/ski-out chalet in Vail, Colorado, engineered for 120 psf snow load.',
        geoLocation: 'Vail, Colorado',
      },
    ],
  })

  // About page — office and team imagery.
  pages.push({
    url: `${BASE_URL}/about`,
    lastModified: now,
    images: [
      {
        loc: images.aboutOffice,
        title: 'Alpine Peak Roofing Denver Office',
        caption:
          'Alpine Peak Roofing headquarters in the Denver metro area — family-owned roofing contractor serving Colorado since 1989.',
        geoLocation: DEFAULT_GEO,
      },
      {
        loc: images.teamPhoto,
        title: 'Alpine Peak Roofing Team',
        caption:
          'The Alpine Peak Roofing team — certified installers and project managers serving Denver and Colorado mountain communities.',
        geoLocation: DEFAULT_GEO,
      },
    ],
  })

  // Services hub pages
  pages.push({
    url: `${BASE_URL}/services/residential`,
    lastModified: now,
    images: [
      {
        loc: images.heroResidential,
        title: 'Residential Roofing Services in Denver, Colorado',
        caption:
          'Residential roof replacement in the Denver metro area — architectural asphalt shingles, metal roofing, and impact-resistant Class 4 systems.',
        geoLocation: DEFAULT_GEO,
      },
      {
        loc: images.residentialWork,
        title: 'Colorado Home Roof Installation',
        caption:
          'Alpine Peak Roofing residential crew installing premium architectural shingles on a Denver-area home.',
        geoLocation: DEFAULT_GEO,
      },
    ],
  })

  pages.push({
    url: `${BASE_URL}/services/commercial`,
    lastModified: now,
    images: [
      {
        loc: images.heroCommercial,
        title: 'Commercial Roofing Services in Denver, Colorado',
        caption:
          'Commercial TPO and standing-seam metal roofing installation on a Denver-area commercial property.',
        geoLocation: DEFAULT_GEO,
      },
      {
        loc: images.commercialWork,
        title: 'Commercial Flat Roof Installation',
        caption:
          'Flat-roof TPO membrane installation on a Colorado commercial property by Alpine Peak Roofing commercial division.',
        geoLocation: DEFAULT_GEO,
      },
    ],
  })

  pages.push({
    url: `${BASE_URL}/services/storm-damage`,
    lastModified: now,
    images: [
      {
        loc: images.emergencyRepair,
        title: 'Emergency Roof Repair — Denver, Colorado',
        caption:
          '24/7 emergency roof repair after hail and wind damage in the Denver metro area, including insurance-claim documentation and tarp-and-dry services.',
        geoLocation: DEFAULT_GEO,
      },
      {
        loc: images.inspection,
        title: 'Storm-Damage Roof Inspection',
        caption:
          'Certified roof inspector documenting hail and wind damage for an insurance claim on a Denver-area home.',
        geoLocation: DEFAULT_GEO,
      },
    ],
  })

  // Materials index page
  pages.push({
    url: `${BASE_URL}/materials`,
    lastModified: now,
    images: [
      {
        loc: images.materialsDisplay,
        title: 'Premium Roofing Materials Display',
        caption:
          'Alpine Peak Roofing materials showroom featuring GAF Timberline HDZ architectural shingles, standing seam metal, natural slate, and premium cedar shake.',
        geoLocation: DEFAULT_GEO,
      },
      {
        loc: images.materialsDisplayBg,
        title: 'Colorado Roofing Materials Selection',
        caption:
          'Side-by-side comparison of premium roofing materials available from Alpine Peak Roofing for Colorado homes.',
        geoLocation: DEFAULT_GEO,
      },
    ],
  })

  // Material detail pages — each material's hero image.
  for (const m of materials) {
    if (!m.image) continue
    pages.push({
      url: `${BASE_URL}/materials/${m.slug}`,
      lastModified: now,
      images: [
        {
          loc: m.image,
          title: `${m.name} — Colorado Roofing`,
          caption: `${m.name} by ${m.manufacturer}. ${m.tagline} Installed across Denver and Colorado mountain communities by Alpine Peak Roofing.`,
          geoLocation: DEFAULT_GEO,
        },
      ],
    })
  }

  // Location detail pages — each location's hero image.
  for (const loc of locations) {
    if (!loc.image) continue
    pages.push({
      url: `${BASE_URL}/locations/${loc.slug}`,
      lastModified: now,
      images: [
        {
          loc: loc.image,
          title: `${loc.name}, Colorado Roofing Services`,
          caption: `Alpine Peak Roofing serving ${loc.name}, Colorado (elevation ${loc.elevation}). ${loc.tagline} — residential and commercial roofing engineered for ${loc.region} conditions.`,
          geoLocation: locationGeo(loc.slug),
        },
      ],
    })
  }

  // Portfolio index — every project's hero image keyed to /portfolio since the
  // public gallery lives on that URL. Each project's geo_location reflects the
  // actual Colorado mountain town where the project was installed.
  const portfolioImages: ImageEntry[] = portfolioProjects.map((project) => ({
    loc: project.image,
    title: `${project.title} — ${project.location}`,
    caption: `${project.title}: ${project.roofType} on a ${project.homeSqft.toLocaleString()} sq ft residence in ${project.location} (${project.elevation}). ${project.tagline}`,
    geoLocation: projectGeo(project.location),
  }))

  pages.push({
    url: `${BASE_URL}/portfolio`,
    lastModified: now,
    images: portfolioImages,
  })

  // Project detail pages — individual project pages also surface the same hero
  // plus the blueprint overlay; list them so Google can index project-scoped
  // image queries.
  for (const project of portfolioProjects) {
    const projectImages: ImageEntry[] = [
      {
        loc: project.image,
        title: `${project.title} — ${project.location}`,
        caption: `${project.title}: ${project.roofType} on a ${project.homeSqft.toLocaleString()} sq ft residence in ${project.location} (${project.elevation}). ${project.tagline}`,
        geoLocation: projectGeo(project.location),
      },
    ]
    if (project.blueprintImage) {
      projectImages.push({
        loc: project.blueprintImage,
        title: `${project.title} — Architectural Blueprint`,
        caption: `${project.title} architectural blueprint: ${project.blueprintCaption}`,
        geoLocation: projectGeo(project.location),
      })
    }
    pages.push({
      url: `${BASE_URL}/projects/${project.id}`,
      lastModified: now,
      images: projectImages,
    })
  }

  // Before/after imagery showcased on the portfolio page.
  pages.push({
    url: `${BASE_URL}/portfolio#before-after`,
    lastModified: now,
    images: [
      {
        loc: images.portfolioBefore,
        title: 'Colorado Roof — Before Replacement',
        caption:
          'Weathered Colorado roof prior to Alpine Peak Roofing replacement, showing granule loss and hail damage typical of Front Range storms.',
        geoLocation: DEFAULT_GEO,
      },
      {
        loc: images.portfolioAfter,
        title: 'Colorado Roof — After Alpine Peak Replacement',
        caption:
          'The same Colorado home after Alpine Peak Roofing installed new GAF Timberline HDZ Class 4 impact-resistant shingles.',
        geoLocation: DEFAULT_GEO,
      },
    ],
  })

  const totalImages = pages.reduce((acc, p) => acc + p.images.length, 0)

  const urlBlocks = pages
    .map((page) => {
      const imageBlocks = page.images
        .map((img) => {
          const geo = img.geoLocation
            ? `\n      <image:geo_location>${xmlEscape(img.geoLocation)}</image:geo_location>`
            : ''
          const license = img.license
            ? `\n      <image:license>${xmlEscape(img.license)}</image:license>`
            : ''
          return `    <image:image>
      <image:loc>${xmlEscape(img.loc)}</image:loc>
      <image:title>${xmlEscape(img.title)}</image:title>
      <image:caption>${xmlEscape(img.caption)}</image:caption>${geo}${license}
    </image:image>`
        })
        .join('\n')

      return `  <url>
    <loc>${xmlEscape(page.url)}</loc>
    <lastmod>${page.lastModified}</lastmod>
${imageBlocks}
  </url>`
    })
    .join('\n')

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <!--
    Image Sitemap for Alpine Peak Roofing
    Generated: ${now}
    Pages: ${pages.length}
    Images: ${totalImages}
    Protocol: https://developers.google.com/search/docs/crawling-indexing/sitemaps/image-sitemaps
  -->
${urlBlocks}
</urlset>`

  return new NextResponse(sitemap, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  })
}
