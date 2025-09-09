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
      relatedPages: ['/', '/about', '/estimator'],
      keywords: ['contact roofing contractor', 'free estimate', 'emergency service']
    },

    // Service Pages - Main
    {
      url: `${baseUrl}/services`,
      lastModified: new Date().toISOString(),
      changeFreq: 'weekly',
      priority: 0.9,
      category: 'services',
      semanticType: 'ServicePage',
      relatedPages: ['/services/residential', '/services/commercial', '/services/emergency'],
      keywords: ['roofing services', 'roof repair', 'roof replacement', 'mountain roofing']
    },
    {
      url: `${baseUrl}/services/residential`,
      lastModified: new Date().toISOString(),
      changeFreq: 'weekly',
      priority: 0.8,
      category: 'services',
      semanticType: 'ServicePage',
      relatedPages: ['/services', '/services/premium', '/portfolio'],
      keywords: ['residential roofing', 'home roofing', 'roof replacement']
    },
    {
      url: `${baseUrl}/services/commercial`,
      lastModified: new Date().toISOString(),
      changeFreq: 'weekly',
      priority: 0.8,
      category: 'services',
      semanticType: 'ServicePage',
      relatedPages: ['/services', '/portfolio', '/sustainability'],
      keywords: ['commercial roofing', 'business roofing', 'flat roof', 'TPO']
    },
    {
      url: `${baseUrl}/services/emergency`,
      lastModified: new Date().toISOString(),
      changeFreq: 'daily',
      priority: 0.9,
      category: 'services',
      semanticType: 'EmergencyServicePage',
      relatedPages: ['/services', '/contact', '/weather-impacts'],
      keywords: ['emergency roof repair', '24/7 service', 'storm damage', 'hail damage']
    },

    // Premium Services
    {
      url: `${baseUrl}/services/premium`,
      lastModified: new Date().toISOString(),
      changeFreq: 'weekly',
      priority: 0.8,
      category: 'premium',
      semanticType: 'ServicePage',
      relatedPages: ['/services/premium/copper-roofing', '/sustainability', '/portfolio'],
      keywords: ['premium roofing', 'luxury roofing', 'high-end materials']
    },
    {
      url: `${baseUrl}/services/premium/copper-roofing`,
      lastModified: new Date().toISOString(),
      changeFreq: 'monthly',
      priority: 0.7,
      category: 'premium',
      semanticType: 'ServicePage',
      relatedPages: ['/services/premium', '/glossary', '/sustainability'],
      keywords: ['copper roofing', 'standing seam copper', 'patina', 'luxury materials']
    },

    // Sustainability
    {
      url: `${baseUrl}/sustainability`,
      lastModified: new Date().toISOString(),
      changeFreq: 'weekly',
      priority: 0.8,
      category: 'sustainability',
      semanticType: 'WebPage',
      relatedPages: ['/sustainability/solar-integration', '/services/premium', '/glossary'],
      keywords: ['sustainable roofing', 'eco-friendly', 'energy efficiency', 'green building']
    },
    {
      url: `${baseUrl}/sustainability/solar-integration`,
      lastModified: new Date().toISOString(),
      changeFreq: 'monthly',
      priority: 0.7,
      category: 'sustainability',
      semanticType: 'WebPage',
      relatedPages: ['/sustainability', '/investment-analysis', '/glossary'],
      keywords: ['solar roofing', 'solar integration', 'renewable energy', 'energy savings']
    },

    // Knowledge Base
    {
      url: `${baseUrl}/faq`,
      lastModified: new Date().toISOString(),
      changeFreq: 'weekly',
      priority: 0.8,
      category: 'knowledge',
      semanticType: 'FAQPage',
      relatedPages: ['/glossary', '/guides/mountain-roofing-colorado', '/resources/technical'],
      keywords: ['roofing questions', 'mountain roofing FAQ', 'colorado roofing answers']
    },
    {
      url: `${baseUrl}/glossary`,
      lastModified: new Date().toISOString(),
      changeFreq: 'monthly',
      priority: 0.7,
      category: 'knowledge',
      semanticType: 'WebPage',
      relatedPages: ['/faq', '/resources/technical', '/guides/mountain-roofing-colorado'],
      keywords: ['roofing terminology', 'technical definitions', 'mountain roofing terms']
    },

    // Location Pages
    {
      url: `${baseUrl}/locations/aspen`,
      lastModified: new Date().toISOString(),
      changeFreq: 'monthly',
      priority: 0.7,
      category: 'locations',
      semanticType: 'LocalBusinessPage',
      relatedPages: ['/locations/vail', '/locations/telluride', '/guides/mountain-roofing-colorado'],
      keywords: ['aspen roofing', 'aspen contractors', 'luxury mountain roofing']
    },
    {
      url: `${baseUrl}/locations/vail`,
      lastModified: new Date().toISOString(),
      changeFreq: 'monthly',
      priority: 0.7,
      category: 'locations',
      semanticType: 'LocalBusinessPage',
      relatedPages: ['/locations/aspen', '/locations/telluride', '/guides/mountain-roofing-colorado'],
      keywords: ['vail roofing', 'vail contractors', 'ski resort roofing']
    },
    {
      url: `${baseUrl}/locations/telluride`,
      lastModified: new Date().toISOString(),
      changeFreq: 'monthly',
      priority: 0.7,
      category: 'locations',
      semanticType: 'LocalBusinessPage',
      relatedPages: ['/locations/aspen', '/locations/vail', '/guides/mountain-roofing-colorado'],
      keywords: ['telluride roofing', 'telluride contractors', 'historic preservation']
    },
    {
      url: `${baseUrl}/locations/crested-butte`,
      lastModified: new Date().toISOString(),
      changeFreq: 'monthly',
      priority: 0.6,
      category: 'locations',
      semanticType: 'LocalBusinessPage',
      relatedPages: ['/locations/aspen', '/guides/mountain-roofing-colorado'],
      keywords: ['crested butte roofing', 'high altitude roofing']
    },
    {
      url: `${baseUrl}/locations/steamboat-springs`,
      lastModified: new Date().toISOString(),
      changeFreq: 'monthly',
      priority: 0.6,
      category: 'locations',
      semanticType: 'LocalBusinessPage',
      relatedPages: ['/locations/winter-park', '/guides/mountain-roofing-colorado'],
      keywords: ['steamboat springs roofing', 'ski town roofing']
    },
    {
      url: `${baseUrl}/locations/winter-park`,
      lastModified: new Date().toISOString(),
      changeFreq: 'monthly',
      priority: 0.6,
      category: 'locations',
      semanticType: 'LocalBusinessPage',
      relatedPages: ['/locations/steamboat-springs', '/guides/mountain-roofing-colorado'],
      keywords: ['winter park roofing', 'mountain resort roofing']
    },

    // Service Areas
    {
      url: `${baseUrl}/service-areas/central-mountains`,
      lastModified: new Date().toISOString(),
      changeFreq: 'monthly',
      priority: 0.6,
      category: 'service-areas',
      semanticType: 'ServiceAreaPage',
      relatedPages: ['/locations/aspen', '/locations/vail', '/guides/mountain-roofing-colorado'],
      keywords: ['central mountains roofing', 'colorado mountains', 'high altitude service']
    },

    // Educational Content
    {
      url: `${baseUrl}/guides/mountain-roofing-colorado`,
      lastModified: new Date().toISOString(),
      changeFreq: 'monthly',
      priority: 0.7,
      category: 'guides',
      semanticType: 'Article',
      relatedPages: ['/weather-impacts', '/glossary', '/faq'],
      keywords: ['mountain roofing guide', 'colorado climate', 'high altitude challenges']
    },
    {
      url: `${baseUrl}/weather-impacts`,
      lastModified: new Date().toISOString(),
      changeFreq: 'weekly',
      priority: 0.7,
      category: 'guides',
      semanticType: 'Article',
      relatedPages: ['/guides/mountain-roofing-colorado', '/services/emergency', '/glossary'],
      keywords: ['weather impacts', 'hail damage', 'snow load', 'wind resistance']
    },
    {
      url: `${baseUrl}/investment-analysis`,
      lastModified: new Date().toISOString(),
      changeFreq: 'monthly',
      priority: 0.6,
      category: 'guides',
      semanticType: 'Article',
      relatedPages: ['/sustainability', '/services/premium', '/estimator'],
      keywords: ['roofing investment', 'ROI analysis', 'premium materials cost']
    },
    {
      url: `${baseUrl}/resources/technical`,
      lastModified: new Date().toISOString(),
      changeFreq: 'monthly',
      priority: 0.6,
      category: 'resources',
      semanticType: 'TechnicalArticle',
      relatedPages: ['/glossary', '/faq', '/guides/mountain-roofing-colorado'],
      keywords: ['technical resources', 'installation guides', 'specifications']
    },

    // Tools and Interactive
    {
      url: `${baseUrl}/estimator`,
      lastModified: new Date().toISOString(),
      changeFreq: 'weekly',
      priority: 0.8,
      category: 'tools',
      semanticType: 'WebApplication',
      relatedPages: ['/contact', '/investment-analysis', '/services'],
      keywords: ['roof cost estimator', 'pricing calculator', 'free estimate']
    },
    {
      url: `${baseUrl}/ai-tools/intelligent-roofing-automations`,
      lastModified: new Date().toISOString(),
      changeFreq: 'monthly',
      priority: 0.6,
      category: 'technology',
      semanticType: 'WebPage',
      relatedPages: ['/chatbot-demo', '/resources/technical'],
      keywords: ['AI roofing tools', 'automation', 'smart roofing']
    },
    {
      url: `${baseUrl}/chatbot-demo`,
      lastModified: new Date().toISOString(),
      changeFreq: 'weekly',
      priority: 0.5,
      category: 'technology',
      semanticType: 'WebApplication',
      relatedPages: ['/ai-tools/intelligent-roofing-automations', '/contact'],
      keywords: ['roofing chatbot', 'AI assistant', 'instant quotes']
    },

    // Portfolio and Process
    {
      url: `${baseUrl}/portfolio`,
      lastModified: new Date().toISOString(),
      changeFreq: 'weekly',
      priority: 0.8,
      category: 'showcase',
      semanticType: 'CollectionPage',
      relatedPages: ['/services', '/services/premium', '/locations/aspen'],
      keywords: ['roofing portfolio', 'completed projects', 'before after', 'case studies']
    },
    {
      url: `${baseUrl}/process`,
      lastModified: new Date().toISOString(),
      changeFreq: 'monthly',
      priority: 0.7,
      category: 'core',
      semanticType: 'WebPage',
      relatedPages: ['/about', '/contact', '/estimator'],
      keywords: ['roofing process', 'project timeline', 'installation steps']
    },

    // Blog
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date().toISOString(),
      changeFreq: 'daily',
      priority: 0.7,
      category: 'content',
      semanticType: 'Blog',
      relatedPages: ['/guides/mountain-roofing-colorado', '/weather-impacts', '/faq'],
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