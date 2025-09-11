// Blog service for interacting with Supabase backend
import { getSupabaseClient } from '@/lib/supabase/client';
import { BlogPost, BlogListResponse, BlogFilters, DEFAULT_PAGE_SIZE, BlogContentCalendar, BlogPerformance } from './types';

export class BlogService {
  
  /**
   * Fetch published blog posts for public display
   */
  static async getPublishedPosts(filters: BlogFilters = {}): Promise<BlogListResponse> {
    const {
      season,
      search,
      page = 1,
      limit = DEFAULT_PAGE_SIZE
    } = filters;

    let query = getSupabaseClient()
      .from('blog_posts')
      .select('*', { count: 'exact' })
      .eq('status', 'published')
      .order('published_at', { ascending: false });

    // Apply filters
    if (season) {
      query = query.eq('season', season);
    }

    if (search) {
      query = query.or(`title.ilike.%${search}%,content.ilike.%${search}%,meta_description.ilike.%${search}%`);
    }

    // Apply pagination
    const from = (page - 1) * limit;
    const to = from + limit - 1;
    query = query.range(from, to);

    const { data: posts, error, count } = await query;

    if (error) {
      throw new Error(`Error fetching blog posts: ${error.message}`);
    }

    const total = count || 0;
    const hasMore = from + limit < total;

    return {
      posts: posts || [],
      total,
      page,
      limit,
      hasMore
    };
  }

  /**
   * Get a single blog post by slug
   */
  static async getPostBySlug(slug: string): Promise<BlogPost | null> {
    const { data: post, error } = await getSupabaseClient()
      .from('blog_posts')
      .select('*')
      .eq('slug', slug)
      .eq('status', 'published')
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        // Not found
        return null;
      }
      throw new Error(`Error fetching blog post: ${error.message}`);
    }

    return post;
  }

  /**
   * Get all blog posts (admin access)
   */
  static async getAllPosts(filters: BlogFilters = {}): Promise<BlogListResponse> {
    const {
      status,
      season,
      search,
      page = 1,
      limit = DEFAULT_PAGE_SIZE
    } = filters;

    let query = getSupabaseClient()
      .from('blog_posts')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false });

    // Apply filters
    if (status) {
      query = query.eq('status', status);
    }

    if (season) {
      query = query.eq('season', season);
    }

    if (search) {
      query = query.or(`title.ilike.%${search}%,content.ilike.%${search}%,meta_description.ilike.%${search}%`);
    }

    // Apply pagination
    const from = (page - 1) * limit;
    const to = from + limit - 1;
    query = query.range(from, to);

    const { data: posts, error, count } = await query;

    if (error) {
      throw new Error(`Error fetching blog posts: ${error.message}`);
    }

    const total = count || 0;
    const hasMore = from + limit < total;

    return {
      posts: posts || [],
      total,
      page,
      limit,
      hasMore
    };
  }

  /**
   * Get recent blog posts for homepage
   */
  static async getRecentPosts(limit: number = 3): Promise<BlogPost[]> {
    const { data: posts, error } = await getSupabaseClient()
      .from('blog_posts')
      .select('id, title, slug, meta_description, featured_image_url, alt_text, published_at, season')
      .eq('status', 'published')
      .order('published_at', { ascending: false })
      .limit(limit);

    if (error) {
      throw new Error(`Error fetching recent blog posts: ${error.message}`);
    }

    return posts || [];
  }

  /**
   * Get related blog posts based on season or keywords
   */
  static async getRelatedPosts(currentPostId: string, season?: string, limit: number = 3): Promise<BlogPost[]> {
    let query = getSupabaseClient()
      .from('blog_posts')
      .select('id, title, slug, meta_description, featured_image_url, alt_text, published_at, season')
      .eq('status', 'published')
      .neq('id', currentPostId)
      .limit(limit);

    if (season) {
      query = query.eq('season', season);
    }

    query = query.order('published_at', { ascending: false });

    const { data: posts, error } = await query;

    if (error) {
      throw new Error(`Error fetching related blog posts: ${error.message}`);
    }

    return posts || [];
  }

  /**
   * Search blog posts by keyword
   */
  static async searchPosts(searchTerm: string, limit: number = 10): Promise<BlogPost[]> {
    const { data: posts, error } = await getSupabaseClient()
      .from('blog_posts')
      .select('id, title, slug, meta_description, featured_image_url, alt_text, published_at, season')
      .eq('status', 'published')
      .or(`title.ilike.%${searchTerm}%,content.ilike.%${searchTerm}%,meta_description.ilike.%${searchTerm}%`)
      .order('published_at', { ascending: false })
      .limit(limit);

    if (error) {
      throw new Error(`Error searching blog posts: ${error.message}`);
    }

    return posts || [];
  }

  /**
   * Get content calendar (admin)
   */
  static async getContentCalendar(): Promise<BlogContentCalendar[]> {
    const { data: calendar, error } = await getSupabaseClient()
      .from('blog_content_calendar')
      .select('*')
      .order('planned_date', { ascending: true });

    if (error) {
      throw new Error(`Error fetching content calendar: ${error.message}`);
    }

    return calendar || [];
  }

  /**
   * Get blog performance metrics (admin)
   */
  static async getBlogPerformance(blogPostId: string): Promise<BlogPerformance[]> {
    const { data: performance, error } = await getSupabaseClient()
      .from('blog_performance')
      .select('*')
      .eq('blog_post_id', blogPostId)
      .order('date', { ascending: false });

    if (error) {
      throw new Error(`Error fetching blog performance: ${error.message}`);
    }

    return performance || [];
  }

  /**
   * Create a blog post (used by n8n workflow)
   */
  static async createBlogPost(postData: Partial<BlogPost>): Promise<BlogPost> {
    const { data: post, error } = await getSupabaseClient()
      .from('blog_posts')
      .insert([postData])
      .select()
      .single();

    if (error) {
      throw new Error(`Error creating blog post: ${error.message}`);
    }

    return post;
  }

  /**
   * Update blog post status
   */
  static async updateBlogPost(id: string, updates: Partial<BlogPost>): Promise<BlogPost> {
    const { data: post, error } = await getSupabaseClient()
      .from('blog_posts')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      throw new Error(`Error updating blog post: ${error.message}`);
    }

    return post;
  }

  /**
   * Delete a blog post
   */
  static async deleteBlogPost(id: string): Promise<void> {
    const { error } = await getSupabaseClient()
      .from('blog_posts')
      .delete()
      .eq('id', id);

    if (error) {
      throw new Error(`Error deleting blog post: ${error.message}`);
    }
  }

  /**
   * Track blog post view (for analytics)
   */
  static async trackView(blogPostId: string): Promise<void> {
    // This would typically be handled by analytics service
    // For now, just log the view
    console.log(`View tracked for blog post: ${blogPostId}`);
  }

  /**
   * Get seasonal blog posts
   */
  static async getSeasonalPosts(season: string, limit: number = 6): Promise<BlogPost[]> {
    const { data: posts, error } = await getSupabaseClient()
      .from('blog_posts')
      .select('id, title, slug, meta_description, featured_image_url, alt_text, published_at, season')
      .eq('status', 'published')
      .eq('season', season)
      .order('published_at', { ascending: false })
      .limit(limit);

    if (error) {
      throw new Error(`Error fetching seasonal blog posts: ${error.message}`);
    }

    return posts || [];
  }

  /**
   * Get blog posts by keyword/tag
   */
  static async getPostsByKeyword(keyword: string, limit: number = 6): Promise<BlogPost[]> {
    const { data: posts, error } = await getSupabaseClient()
      .from('blog_posts')
      .select('id, title, slug, meta_description, featured_image_url, alt_text, published_at, season, keywords')
      .eq('status', 'published')
      .contains('keywords', [keyword])
      .order('published_at', { ascending: false })
      .limit(limit);

    if (error) {
      throw new Error(`Error fetching posts by keyword: ${error.message}`);
    }

    return posts || [];
  }
}