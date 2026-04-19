import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { materials } from '@/lib/materials'
import { locations } from '@/lib/locations'

// Premium locations get higher sitemap priority — mirrors marketing focus.
const PREMIUM_LOCATION_SLUGS = new Set(['aspen', 'vail', 'telluride'])

interface SitemapURL {
  url: string
  lastModified: string
  changeFreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'
  priority: number
  category?: string
  semanticType?: string
  relatedPages?: string[]
  keywords?: string[]
}

async function getPublishedBlogPosts(): Promise<Array<{ slug: string; published_at: string | null; updated_at: string | null }>> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !key) return []

  try {
    const client = createClient(url, key)
    const { data, error } = await client
      .from('blog_posts')
      .select('slug, published_at, updated_at')
      .eq('status', 'published')
      .order('published_at', { ascending: false })

    if (error || !data) return []
    return data
  } catch {
    return []
  }
}

export async function GET() {
  const baseUrl = 'https://alpinepeakroofing.com'

  // Fetch live blog posts for dynamic sitemap entries
  const blogPosts = await getPublishedBlogPosts()

  // Enhanced sitemap data with semantic relationships
  const pages: SitemapURL[] = [
    // Core Pages
    {
      url: `${baseUrl}/`,
      lastModified: new Date().toISOString(),
      changeFreq: 'weekly',
      priority: 1.0,
      category: 'core',
      semanticType: 'WebPage',
      keywords: ['alpine peak roofing', 'colorado roofing', 'mountain roofing', 'denver roofing']
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date().toISOString(),
      changeFreq: 'monthly',
      priority: 0.8,
      category: 'core',
      semanticType: 'AboutPage',
      relatedPages: ['/', '/contact', '/process'],
      keywords: ['company history', 'roofing expertise', 'mountain specialists']
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date().toISOString(),
      changeFreq: 'monthly',
      priority: 0.9,
      category: 'core',
      semanticType: 'ContactPage',
      relatedPages: ['/', '/about'],
      keywords: ['contact roofing contractor', 'free estimate', 'emergency service']
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date().toISOString(),
      changeFreq: 'weekly',
      priority: 0.9,
      category: 'services',
      semanticType: 'ServicePage',
      relatedPages: ['/about', '/process'],
      keywords: ['roofing services', 'roof repair', 'roof replacement', 'mountain roofing']
    },
    {
      url: `${baseUrl}/process`,
      lastModified: new Date().toISOString(),
      changeFreq: 'monthly',
      priority: 0.7,
      category: 'core',
      semanticType: 'WebPage',
      relatedPages: ['/about', '/contact', '/services'],
      keywords: ['roofing process', 'project timeline', 'installation steps']
    },

    // Authority Content Pages
    {
      url: `${baseUrl}/guides/mountain-roofing-colorado`,
      lastModified: new Date().toISOString(),
      changeFreq: 'monthly',
      priority: 0.9,
      category: 'guides',
      semanticType: 'TechnicalGuide',
      relatedPages: ['/sustainability', '/investment-analysis', '/glossary', '/faq'],
      keywords: ['mountain roofing guide', 'colorado climate', 'high altitude challenges', 'snow loads', 'wind resistance']
    },
    {
      url: `${baseUrl}/sustainability`,
      lastModified: new Date().toISOString(),
      changeFreq: 'monthly',
      priority: 0.8,
      category: 'sustainability',
      semanticType: 'EnvironmentalLeadership',
      relatedPages: ['/guides/mountain-roofing-colorado', '/investment-analysis', '/services'],
      keywords: ['sustainable roofing', 'eco-friendly', 'energy efficiency', 'green building', 'LEED certification']
    },
    {
      url: `${baseUrl}/investment-analysis`,
      lastModified: new Date().toISOString(),
      changeFreq: 'monthly',
      priority: 0.8,
      category: 'financial',
      semanticType: 'FinancialAnalysis',
      relatedPages: ['/sustainability', '/guides/mountain-roofing-colorado', '/services'],
      keywords: ['roofing investment', 'ROI analysis', 'premium materials cost', 'financing options']
    },

    // Knowledge Base
    {
      url: `${baseUrl}/faq`,
      lastModified: new Date().toISOString(),
      changeFreq: 'weekly',
      priority: 0.8,
      category: 'knowledge',
      semanticType: 'FAQPage',
      relatedPages: ['/glossary', '/guides/mountain-roofing-colorado', '/knowledge'],
      keywords: ['roofing questions', 'mountain roofing FAQ', 'colorado roofing answers']
    },
    {
      url: `${baseUrl}/glossary`,
      lastModified: new Date().toISOString(),
      changeFreq: 'monthly',
      priority: 0.7,
      category: 'knowledge',
      semanticType: 'TechnicalReference',
      relatedPages: ['/faq', '/guides/mountain-roofing-colorado', '/knowledge'],
      keywords: ['roofing terminology', 'technical definitions', 'mountain roofing terms']
    },
    {
      url: `${baseUrl}/knowledge`,
      lastModified: new Date().toISOString(),
      changeFreq: 'weekly',
      priority: 0.8,
      category: 'knowledge',
      semanticType: 'ResourceHub',
      relatedPages: ['/faq', '/glossary', '/guides/mountain-roofing-colorado'],
      keywords: ['roofing resources', 'knowledge base', 'technical information']
    },

    // Location Pages — every slug in lib/locations.ts gets an entry.
    // Premium markets (aspen/vail/telluride) get priority 0.9; others 0.8.
    ...locations
      .filter(loc => loc.slug !== 'central-mountains') // listed separately under Service Areas
      .map<SitemapURL>(loc => {
        const elevationDigits = loc.elevation.replace(/[^0-9]/g, '')
        const nameLower = loc.name.toLowerCase()
        return {
          url: `${baseUrl}/locations/${loc.slug}`,
          lastModified: new Date().toISOString(),
          changeFreq: 'monthly',
          priority: PREMIUM_LOCATION_SLUGS.has(loc.slug) ? 0.9 : 0.8,
          category: 'locations',
          semanticType: 'LocalBusinessPage',
          relatedPages: ['/guides/mountain-roofing-colorado', '/services/residential', '/services/commercial'],
          keywords: [
            `${nameLower} roofing`,
            `${nameLower} contractors`,
            `${loc.region.toLowerCase()} roofing`,
            elevationDigits ? `${elevationDigits} feet elevation` : loc.elevation,
          ],
        }
      }),

    // Service Areas
    {
      url: `${baseUrl}/service-areas/central-mountains`,
      lastModified: new Date().toISOString(),
      changeFreq: 'monthly',
      priority: 0.8,
      category: 'service-areas',
      semanticType: 'ServiceAreaPage',
      relatedPages: ['/locations/aspen', '/locations/vail', '/guides/mountain-roofing-colorado'],
      keywords: ['central mountains roofing', 'colorado mountains', 'high altitude service', 'summit county', 'eagle county', 'pitkin county']
    },

    // Blog index
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date().toISOString(),
      changeFreq: 'daily',
      priority: 0.8,
      category: 'content',
      semanticType: 'Blog',
      relatedPages: ['/guides/mountain-roofing-colorado', '/faq'],
      keywords: ['roofing blog', 'industry news', 'maintenance tips', 'seasonal advice']
    },

    // Materials index
    {
      url: `${baseUrl}/materials`,
      lastModified: new Date().toISOString(),
      changeFreq: 'monthly',
      priority: 0.9,
      category: 'materials',
      semanticType: 'CollectionPage',
      relatedPages: ['/services', '/investment-analysis', '/process'],
      keywords: ['roofing materials', 'premium materials', 'GAF shingles', 'metal roofing', 'slate roofing', 'cedar shake']
    },

    // Material detail pages (dynamic from lib/materials.ts)
    ...materials.map(m => ({
      url: `${baseUrl}/materials/${m.slug}`,
      lastModified: new Date().toISOString(),
      changeFreq: 'monthly' as const,
      priority: 0.8,
      category: 'materials',
      semanticType: 'ProductPage',
      relatedPages: ['/materials', '/investment-analysis', '/services'],
      keywords: [m.name, m.shortName, m.manufacturer, 'colorado roofing material']
    })),

    // Portfolio
    {
      url: `${baseUrl}/portfolio`,
      lastModified: new Date().toISOString(),
      changeFreq: 'monthly',
      priority: 0.8,
      category: 'portfolio',
      semanticType: 'CollectionPage',
      relatedPages: ['/services', '/contact', '/about'],
      keywords: ['roofing portfolio', 'completed projects', 'mountain roofing showcase', 'before after roof']
    },

    // Service sub-pages
    {
      url: `${baseUrl}/services/residential`,
      lastModified: new Date().toISOString(),
      changeFreq: 'monthly',
      priority: 0.9,
      category: 'services',
      semanticType: 'ServicePage',
      relatedPages: ['/services', '/materials', '/process', '/contact'],
      keywords: ['residential roofing', 'home roofing', 'colorado residential roofing', 'roof replacement']
    },
    {
      url: `${baseUrl}/services/commercial`,
      lastModified: new Date().toISOString(),
      changeFreq: 'monthly',
      priority: 0.9,
      category: 'services',
      semanticType: 'ServicePage',
      relatedPages: ['/services', '/materials', '/process', '/contact'],
      keywords: ['commercial roofing', 'flat roofing', 'colorado commercial roofing', 'TPO roofing']
    },
    {
      url: `${baseUrl}/services/storm-damage`,
      lastModified: new Date().toISOString(),
      changeFreq: 'monthly',
      priority: 0.9,
      category: 'services',
      semanticType: 'ServicePage',
      relatedPages: ['/services', '/contact', '/faq'],
      keywords: ['storm damage roofing', 'hail damage', 'insurance claim roofing', 'emergency roof repair']
    },

    // Financing
    {
      url: `${baseUrl}/financing`,
      lastModified: new Date().toISOString(),
      changeFreq: 'monthly',
      priority: 0.7,
      category: 'financial',
      semanticType: 'WebPage',
      relatedPages: ['/investment-analysis', '/contact', '/services'],
      keywords: ['roofing financing', 'roof payment plans', 'zero percent financing roofing', 'monthly roof payments']
    },

    // Legal / utility
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date().toISOString(),
      changeFreq: 'yearly',
      priority: 0.3,
      category: 'legal',
      semanticType: 'WebPage',
      relatedPages: ['/terms', '/contact'],
      keywords: ['privacy policy', 'data protection']
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date().toISOString(),
      changeFreq: 'yearly',
      priority: 0.3,
      category: 'legal',
      semanticType: 'WebPage',
      relatedPages: ['/privacy', '/contact'],
      keywords: ['terms of service', 'service agreement']
    }
  ]

  // Build blog post URL entries dynamically
  const blogEntries = blogPosts.map(post => {
    const lastMod = post.updated_at || post.published_at || new Date().toISOString()
    return `
  <url>
    <loc>${baseUrl}/blog/${post.slug}</loc>
    <lastmod>${new Date(lastMod).toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
    <alpine:category>blog</alpine:category>
    <alpine:type>BlogPosting</alpine:type>
  </url>`
  }).join('')

  // Generate enhanced XML sitemap with semantic annotations
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:alpine="https://alpinepeakroofing.com/schemas/semantic-sitemap/1.0"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
                           http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
  
  <!-- 
    Enhanced Sitemap for Alpine Peak Roofing
    Optimized for LLM Understanding and Semantic Search
    Generated: ${new Date().toISOString()}
    Total Pages: ${pages.length + blogPosts.length} (${pages.length} static/dynamic + ${blogPosts.length} blog posts)
  -->
  
  ${pages.map(page => `
  <url>
    <loc>${page.url}</loc>
    <lastmod>${page.lastModified}</lastmod>
    <changefreq>${page.changeFreq}</changefreq>
    <priority>${page.priority}</priority>
    
    <!-- Semantic Annotations for LLM Understanding -->
    <alpine:category>${page.category}</alpine:category>
    <alpine:type>${page.semanticType}</alpine:type>
    ${page.keywords ? `<alpine:keywords>${page.keywords.join(', ')}</alpine:keywords>` : ''}
    ${page.relatedPages ? `
    <alpine:related>
      ${page.relatedPages.map(relatedUrl => `<alpine:page>${baseUrl}${relatedUrl}</alpine:page>`).join('\n      ')}
    </alpine:related>` : ''}
  </url>`).join('')}

  <!-- Dynamic Blog Posts (${blogPosts.length} published articles) -->
  ${blogEntries}

</urlset>`

  return new NextResponse(sitemap, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600', // 1 hour (was 24h — blog posts daily)
    },
  })
}
