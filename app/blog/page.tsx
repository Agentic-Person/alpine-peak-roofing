import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import FeaturedPosts from '@/components/blog/FeaturedPosts';
import EnhancedBlogGrid from '@/components/blog/EnhancedBlogGrid';
import { BlogService } from '@/lib/blog/blogService';
import { isSupabaseConfigured } from '@/lib/supabase/client';
import { sortedBlogPostsForGrid } from '@/lib/blog/blogData';
import { mergeWithStaticPosts } from '@/lib/blog/supabaseAdapter';

// Re-generate the blog listing every 5 minutes so new AI-generated posts appear
// without a manual redeploy (Next.js ISR).
export const revalidate = 300;

export const metadata: Metadata = {
  title: 'Roofing Blog | Alpine Peak Roofing - Expert Tips & Advice',
  description: 'Expert roofing tips, seasonal maintenance guides, and industry insights for Denver homeowners. Learn from Alpine Peak Roofing\'s automated content system.',
  keywords: ['roofing blog', 'roof maintenance', 'Denver roofing', 'roofing tips', 'home maintenance', 'roof repair'],
  openGraph: {
    title: 'Roofing Blog | Alpine Peak Roofing',
    description: 'Expert roofing tips and advice for Denver homeowners',
    type: 'website',
    images: [
      {
        url: '/images/blog/blog_1_diy_vs_professional.jpg',
        width: 1200,
        height: 630,
        alt: 'Alpine Peak Roofing Blog',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Roofing Blog | Alpine Peak Roofing',
    description: 'Expert roofing tips and advice for Denver homeowners',
    images: ['/images/blog/blog_1_diy_vs_professional.jpg'],
  },
};

/**
 * Fetch AI-generated posts from Supabase (up to 50) and merge with static posts.
 * Gracefully returns static-only if Supabase isn't configured or the fetch fails.
 */
async function getMergedBlogPosts() {
  if (!isSupabaseConfigured()) {
    return sortedBlogPostsForGrid;
  }

  try {
    const { posts: supabasePosts } = await BlogService.getPublishedPosts({ limit: 50, page: 1 });
    if (!supabasePosts.length) return sortedBlogPostsForGrid;
    return mergeWithStaticPosts(supabasePosts, sortedBlogPostsForGrid);
  } catch (err) {
    console.error('[blog/page] Failed to fetch Supabase posts — falling back to static:', err);
    return sortedBlogPostsForGrid;
  }
}

export default async function BlogPage() {
  const allPosts = await getMergedBlogPosts();

  return (
    <div className="min-h-screen bg-white">
      {/* Featured Posts Section — still uses static featured posts */}
      <FeaturedPosts />

      {/* All Posts Grid — now includes AI-generated posts from Supabase */}
      <EnhancedBlogGrid posts={allPosts} />

      {/* Admin Login Link - Subtle placement */}
      <div className="text-center py-4">
        <Link 
          href="/blog/admin" 
          className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
        >
          Admin
        </Link>
      </div>
    </div>
  );
}
