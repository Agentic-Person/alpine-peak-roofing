import { NextRequest, NextResponse } from 'next/server';
import { BlogService } from '@/lib/blog/blogService';
import { isSupabaseConfigured } from '@/lib/supabase/client';

/**
 * GET /api/blog/list
 * Returns published Supabase blog posts for use in the blog grid.
 * 
 * Query params:
 *   page    - page number (default: 1)
 *   limit   - posts per page (default: 12, max: 50)
 *   season  - filter by season
 *   search  - full-text search
 */
export async function GET(request: NextRequest) {
  if (!isSupabaseConfigured()) {
    return NextResponse.json(
      { posts: [], total: 0, page: 1, limit: 12, hasMore: false },
      { status: 200 }
    );
  }

  const { searchParams } = new URL(request.url);
  const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10));
  const limit = Math.min(50, Math.max(1, parseInt(searchParams.get('limit') || '12', 10)));
  const seasonParam = searchParams.get('season');
  const season = (seasonParam && ['spring', 'summer', 'fall', 'winter'].includes(seasonParam)
    ? seasonParam as 'spring' | 'summer' | 'fall' | 'winter'
    : undefined);
  const search = searchParams.get('search') || undefined;

  try {
    const result = await BlogService.getPublishedPosts({ season, search, page, limit });

    return NextResponse.json(result, {
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=60',
      },
    });
  } catch (error) {
    console.error('Blog list error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch posts', posts: [], total: 0, page, limit, hasMore: false },
      { status: 500 }
    );
  }
}
