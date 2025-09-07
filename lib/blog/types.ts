// Blog system types for Alpine Peak Roofing automation

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  seo_title?: string;
  meta_description?: string;
  focus_keyword?: string;
  keywords?: string[];
  featured_image_url?: string;
  alt_text?: string;
  status: 'draft' | 'published' | 'archived';
  season?: 'spring' | 'summer' | 'fall' | 'winter';
  social_media?: SocialMediaContent;
  estimated_cost?: number;
  cms_id?: string;
  social_media_scheduled?: boolean;
  created_at: string;
  publish_date?: string;
  published_at?: string;
  updated_at: string;
}

export interface SocialMediaContent {
  facebook: string;
  linkedin: string;
  instagram: string;
}

export interface BlogContentCalendar {
  id: string;
  topic: string;
  planned_date: string;
  season: 'spring' | 'summer' | 'fall' | 'winter';
  status: 'planned' | 'content_generated' | 'published' | 'cancelled';
  estimated_cost: number;
  actual_cost?: number;
  blog_post_id?: string;
  created_at: string;
  completed_at?: string;
  published_at?: string;
  performance_tracking_enabled?: boolean;
  final_cost?: number;
}

export interface BlogPerformance {
  id: string;
  blog_post_id: string;
  date: string;
  page_views?: number;
  unique_visitors?: number;
  bounce_rate?: number;
  avg_time_on_page?: number;
  social_shares?: number;
  leads_generated?: number;
  phone_calls?: number;
  quote_requests?: number;
  email_signups?: number;
  search_impressions?: number;
  search_clicks?: number;
  avg_position?: number;
  created_at: string;
}

export interface BlogPostWithPerformance extends BlogPost {
  performance?: {
    total_views: number;
    total_leads: number;
    avg_bounce_rate: number;
    total_social_shares: number;
    best_position: number;
  };
}

export interface BlogFilters {
  status?: BlogPost['status'];
  season?: BlogPost['season'];
  search?: string;
  page?: number;
  limit?: number;
}

export interface BlogListResponse {
  posts: BlogPost[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

// Content generation related types
export interface ContentTopicData {
  title: string;
  keywords: string[];
  userIntent: string;
  urgency: string;
  season: BlogPost['season'];
}

export interface ContentGenerationCosts {
  content_outline: number;
  content_draft: number;
  content_polish: number;
  seo_elements: number;
  featured_image: number;
  social_media: number;
  total: number;
}

// SEO related types
export interface SEOKeyword {
  id: string;
  keyword: string;
  blog_post_id?: string;
  target_position?: number;
  current_position?: number;
  search_volume?: number;
  competition_level?: 'low' | 'medium' | 'high';
  last_checked: string;
  created_at: string;
}

// Newsletter integration
export interface NewsletterQueueItem {
  id: string;
  blog_post_id: string;
  title: string;
  excerpt?: string;
  url: string;
  featured_image?: string;
  status: 'queued' | 'included' | 'sent';
  newsletter_date?: string;
  created_at: string;
  sent_at?: string;
}

// Cost tracking
export interface ContentCost {
  id: string;
  blog_post_id?: string;
  workflow_name: string;
  service_name: string;
  cost_amount: number;
  tokens_used?: number;
  api_call_timestamp: string;
  created_at: string;
}

// Blog post card props for components
export interface BlogCardProps {
  post: BlogPost;
  showPerformance?: boolean;
  className?: string;
}

// Search and filtering
export interface BlogSearchParams {
  q?: string;
  season?: string;
  status?: string;
  page?: string;
}

export const SEASONS = ['spring', 'summer', 'fall', 'winter'] as const;
export const BLOG_STATUS_OPTIONS = ['draft', 'published', 'archived'] as const;

// Default pagination
export const DEFAULT_PAGE_SIZE = 12;
export const MAX_PAGE_SIZE = 50;