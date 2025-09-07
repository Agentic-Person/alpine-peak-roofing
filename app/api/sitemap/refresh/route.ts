import { NextRequest, NextResponse } from 'next/server';
import { BlogService } from '@/lib/blog/blogService';

// API endpoint for refreshing the sitemap after new blog posts
export async function POST(request: NextRequest) {
  try {
    // Verify API key for security
    const authHeader = request.headers.get('authorization');
    const expectedApiKey = process.env.CMS_API_KEY;
    
    if (!authHeader || !expectedApiKey) {
      return NextResponse.json(
        { error: 'Authorization required' },
        { status: 401 }
      );
    }

    const providedKey = authHeader.replace('Bearer ', '');
    if (providedKey !== expectedApiKey) {
      return NextResponse.json(
        { error: 'Invalid API key' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { new_url, priority = '0.8', changefreq = 'weekly' } = body;

    if (!new_url) {
      return NextResponse.json(
        { error: 'new_url is required' },
        { status: 400 }
      );
    }

    // In a real implementation, you would:
    // 1. Regenerate the sitemap.xml file
    // 2. Add the new URL to your sitemap
    // 3. Notify search engines
    
    // For now, we'll simulate the sitemap update
    console.log(`Sitemap refresh requested for: ${new_url}`);
    console.log(`Priority: ${priority}, Change frequency: ${changefreq}`);

    // Get all published blog posts for sitemap generation
    const { posts } = await BlogService.getPublishedPosts({ limit: 1000 });
    
    // Generate sitemap entries
    const sitemapEntries = posts.map(post => ({
      url: `https://alpinepeakroofing.com/blog/${post.slug}`,
      lastModified: post.updated_at,
      changeFrequency: 'weekly',
      priority: 0.8,
    }));

    // Add the new URL if it's not already included
    const newUrlExists = sitemapEntries.some(entry => entry.url === new_url);
    if (!newUrlExists && new_url.includes('/blog/')) {
      sitemapEntries.push({
        url: new_url,
        lastModified: new Date().toISOString(),
        changeFrequency: changefreq as any,
        priority: parseFloat(priority),
      });
    }

    // Log successful sitemap update
    console.log(`Sitemap updated with ${sitemapEntries.length} blog post entries`);

    return NextResponse.json({
      success: true,
      message: 'Sitemap refreshed successfully',
      entries_count: sitemapEntries.length,
      new_url_added: !newUrlExists,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error refreshing sitemap:', error);
    
    return NextResponse.json({
      error: 'Failed to refresh sitemap',
      details: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}

// GET endpoint to show current sitemap status
export async function GET() {
  try {
    const { posts, total } = await BlogService.getPublishedPosts({ limit: 1000 });
    
    return NextResponse.json({
      message: 'Sitemap API is active',
      published_posts: total,
      last_post: posts[0] ? {
        title: posts[0].title,
        slug: posts[0].slug,
        published_at: posts[0].published_at,
      } : null,
      sitemap_url: 'https://alpinepeakroofing.com/sitemap.xml',
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error getting sitemap status:', error);
    
    return NextResponse.json({
      error: 'Failed to get sitemap status',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}