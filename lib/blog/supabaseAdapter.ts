/**
 * supabaseAdapter.ts
 * Converts Supabase blog posts (types.ts shape) to the static BlogPost shape
 * used by EnhancedBlogGrid and the rest of the front-end grid components.
 */
import type { BlogPost as SupabasePost } from './types';
import type { BlogPost as StaticPost } from './blogData';

// Map season → display category
const SEASON_TO_CATEGORY: Record<string, string> = {
  spring: 'Maintenance',
  summer: 'Materials',
  fall:   'Safety & Maintenance',
  winter: 'Winter Protection',
};

/** Estimate read time from raw markdown/text content. */
function estimateReadTime(content: string): string {
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} min read`;
}

/**
 * Strip minimal markdown (headings, bullets, bold) to produce a clean excerpt
 * when meta_description is absent.
 */
function contentToExcerpt(content: string, maxLen = 200): string {
  const stripped = content
    .replace(/^#{1,6}\s+/gm, '')   // strip headings
    .replace(/\*\*/g, '')           // strip bold
    .replace(/\*/g, '')             // strip italic
    .replace(/^[-*]\s+/gm, '')     // strip bullets
    .replace(/\n+/g, ' ')          // collapse newlines
    .trim();
  if (stripped.length <= maxLen) return stripped;
  return stripped.slice(0, maxLen).replace(/\s+\S+$/, '') + '…';
}

/**
 * Convert a single Supabase blog post to the static BlogPost shape.
 * @param post  — Supabase BlogPost record
 * @param index — 0-based position in the fetched list (used to generate a unique numeric id)
 */
export function supabasePostToStaticPost(post: SupabasePost, index: number): StaticPost {
  const readTime = post.content ? estimateReadTime(post.content) : '5 min read';
  const excerpt  = post.meta_description
    ? post.meta_description
    : contentToExcerpt(post.content ?? '');

  return {
    // IDs 1000+ are reserved for AI-generated posts so they never clash with static ids (1–18).
    id:          1000 + index,
    title:       post.title,
    slug:        post.slug,
    excerpt,
    image:       post.featured_image_url || '/images/blog/blog_1_diy_vs_professional.webp',
    category:    (post.season && SEASON_TO_CATEGORY[post.season]) ?? 'Maintenance',
    readTime,
    publishDate: post.published_at ?? post.created_at,
    featured:    false,
    tags:        (post.keywords ?? []).slice(0, 4),
  };
}

/**
 * Convert an array of Supabase posts and prepend them (newest first) before
 * the static posts in the grid.
 */
export function mergeWithStaticPosts(
  supabasePosts: SupabasePost[],
  staticPosts:   StaticPost[],
): StaticPost[] {
  const converted = supabasePosts.map((p, i) => supabasePostToStaticPost(p, i));
  // Prepend AI posts so they appear first (they're always newer)
  return [...converted, ...staticPosts];
}
