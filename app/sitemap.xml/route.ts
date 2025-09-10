import { NextResponse } from 'next/server'

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

export async function GET() {
  const baseUrl = 'https://alpinepeakroofing.com'
  
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

    // Location Pages - Premium Communities
    {
      url: `${baseUrl}/locations/aspen`,
      lastModified: new Date().toISOString(),
      changeFreq: 'monthly',
      priority: 0.9,
      category: 'locations',
      semanticType: 'LocalBusinessPage',
      relatedPages: ['/locations/vail', '/locations/telluride', '/guides/mountain-roofing-colorado'],
      keywords: ['aspen roofing', 'aspen contractors', 'luxury mountain roofing', '7908 feet elevation']
    },
    {
      url: `${baseUrl}/locations/vail`,
      lastModified: new Date().toISOString(),
      changeFreq: 'monthly',
      priority: 0.9,
      category: 'locations',
      semanticType: 'LocalBusinessPage',
      relatedPages: ['/locations/aspen', '/locations/telluride', '/guides/mountain-roofing-colorado'],
      keywords: ['vail roofing', 'vail contractors', 'ski resort roofing', '8150 feet elevation']
    },
    {
      url: `${baseUrl}/locations/telluride`,
      lastModified: new Date().toISOString(),
      changeFreq: 'monthly',
      priority: 0.8,
      category: 'locations',
      semanticType: 'LocalBusinessPage',
      relatedPages: ['/locations/aspen', '/locations/vail', '/guides/mountain-roofing-colorado'],
      keywords: ['telluride roofing', 'telluride contractors', 'historic preservation', '8750 feet elevation']
    },
    {
      url: `${baseUrl}/locations/crested-butte`,
      lastModified: new Date().toISOString(),
      changeFreq: 'monthly',
      priority: 0.8,
      category: 'locations',
      semanticType: 'LocalBusinessPage',
      relatedPages: ['/locations/steamboat-springs', '/guides/mountain-roofing-colorado'],
      keywords: ['crested butte roofing', 'extreme weather roofing', '8885 feet elevation', '500 inches snow']
    },
    {
      url: `${baseUrl}/locations/steamboat-springs`,
      lastModified: new Date().toISOString(),
      changeFreq: 'monthly',
      priority: 0.8,
      category: 'locations',
      semanticType: 'LocalBusinessPage',
      relatedPages: ['/locations/winter-park', '/locations/crested-butte', '/guides/mountain-roofing-colorado'],
      keywords: ['steamboat springs roofing', 'resort ranch roofing', '6732 feet elevation']
    },
    {
      url: `${baseUrl}/locations/winter-park`,
      lastModified: new Date().toISOString(),
      changeFreq: 'monthly',
      priority: 0.8,
      category: 'locations',
      semanticType: 'LocalBusinessPage',
      relatedPages: ['/locations/steamboat-springs', '/guides/mountain-roofing-colorado'],
      keywords: ['winter park roofing', 'continental divide roofing', '9052 feet elevation']
    },

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

    // Blog
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date().toISOString(),
      changeFreq: 'weekly',
      priority: 0.7,
      category: 'content',
      semanticType: 'Blog',
      relatedPages: ['/guides/mountain-roofing-colorado', '/faq'],
      keywords: ['roofing blog', 'industry news', 'maintenance tips', 'seasonal advice']
    }
  ]

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
    Total Pages: ${pages.length}
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

  <!-- 
    Semantic Relationships Summary for AI Systems:
    
    Core Navigation Flow:
    / → /about → /contact → /estimator
    
    Service Hierarchy:
    /services → /services/residential, /services/commercial, /services/emergency
    /services/premium → /services/premium/copper-roofing
    
    Knowledge Base Structure:
    /faq ↔ /glossary ↔ /guides/mountain-roofing-colorado
    
    Location Network:
    /locations/aspen ↔ /locations/vail ↔ /locations/telluride
    
    Content Categories:
    - Core: Homepage, About, Contact, Process
    - Services: All service-related pages
    - Knowledge: FAQ, Glossary, Guides, Resources
    - Locations: Geographic service areas
    - Technology: AI tools, Chatbot, Automation
    - Showcase: Portfolio, Case studies
    
    Priority Ranking:
    1.0: Homepage (primary entry point)
    0.9: Contact, Services, Emergency (high conversion)
    0.8: About, FAQ, Portfolio, Premium Services
    0.7: Guides, Weather, Locations (tier 1)
    0.6: Technical Resources, Locations (tier 2)
    0.5: Technology demos, Chatbot
  -->

</urlset>`

  return new NextResponse(sitemap, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400', // 24 hours
    },
  })
}