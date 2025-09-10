import React, { Suspense } from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { BlogService } from '@/lib/blog/blogService';
import { BlogFilters } from '@/components/blog/BlogFilters';
import { BlogCard, BlogCardSkeleton } from '@/components/blog/BlogCard';
import { BlogPagination } from '@/components/blog/BlogPagination';
import { BlogSearchParams } from '@/lib/blog/types';

interface BlogPageProps {
  searchParams: BlogSearchParams;
}

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
        url: '/images/blog-hero.jpg',
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
    images: ['/images/blog-hero.jpg'],
  },
};

async function BlogContent({ searchParams }: { searchParams: BlogSearchParams }) {
  const page = parseInt(searchParams.page || '1', 10);
  const season = searchParams.season || undefined;
  const search = searchParams.q || undefined;

  try {
    const blogResponse = await BlogService.getPublishedPosts({
      season: season as any,
      search,
      page,
      limit: 12,
    });

    const { posts, total, hasMore } = blogResponse;
    const totalPages = Math.ceil(total / 12);

    return (
      <>
        {/* Filters Section */}
        <div className="bg-gray-50 p-6 rounded-lg mb-8">
          <BlogFilters totalPosts={total} />
        </div>

        {/* Blog Posts Grid */}
        <div id="blog-content">
          {posts.length === 0 ? (
            <div className="text-center py-12">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                No blog posts found
              </h2>
              <p className="text-gray-600 mb-6">
                {search || season
                  ? 'Try adjusting your filters or search terms.'
                  : 'Check back soon for new content from our automated blog system!'}
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {posts.map((post, index) => (
                  <BlogCard 
                    key={post.id} 
                    post={post} 
                    priority={index < 3} // First 3 posts get priority loading
                  />
                ))}
              </div>

              {/* Pagination */}
              <BlogPagination
                currentPage={page}
                totalPages={totalPages}
                hasMore={hasMore}
                className="mt-8"
              />
            </>
          )}
        </div>
      </>
    );
  } catch (error) {
    console.error('Error loading blog posts:', error);
    
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          Unable to load blog posts
        </h2>
        <p className="text-gray-600 mb-6">
          We're experiencing some technical difficulties. Please try again later.
        </p>
        <details className="text-left max-w-md mx-auto text-sm text-gray-500">
          <summary className="cursor-pointer">Error details</summary>
          <pre className="mt-2 p-2 bg-gray-100 rounded text-xs overflow-auto">
            {error instanceof Error ? error.message : 'Unknown error'}
          </pre>
        </details>
      </div>
    );
  }
}

function BlogLoadingSkeleton() {
  return (
    <>
      {/* Filters Loading */}
      <div className="bg-gray-50 p-6 rounded-lg mb-8">
        <div className="space-y-4">
          <div className="h-10 bg-gray-200 rounded animate-pulse" />
          <div className="flex gap-2">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-8 w-20 bg-gray-200 rounded animate-pulse" />
            ))}
          </div>
        </div>
      </div>

      {/* Blog Grid Loading */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <BlogCardSkeleton key={i} />
        ))}
      </div>
    </>
  );
}

export default function BlogPage({ searchParams }: BlogPageProps) {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Expert Roofing Insights
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              Discover professional roofing tips, seasonal maintenance guides, and industry insights 
              generated by our advanced automation system. Stay ahead of roofing challenges in Denver.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-blue-200">
              <span>✓ AI-Powered Content</span>
              <span>✓ Cost-Optimized Generation</span>
              <span>✓ Biweekly Updates</span>
              <span>✓ SEO Optimized</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <Suspense fallback={<BlogLoadingSkeleton />}>
          <BlogContent searchParams={searchParams} />
        </Suspense>
      </div>

      {/* CTA Section */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready for Professional Roofing Services?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Our blog showcases our expertise through automated, high-quality content. 
            Experience the same attention to detail in our roofing services.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
              Get Free Inspection
            </button>
            <button className="border border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-3 rounded-lg font-semibold transition-colors">
              Call (555) 123-4567
            </button>
          </div>
          
          {/* Automation Showcase */}
          <div className="mt-12 p-6 bg-white rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Powered by Cost-Effective Automation
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600 mb-2">&lt;$15</div>
                <div className="text-gray-600">Cost per blog post</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600 mb-2">26</div>
                <div className="text-gray-600">Posts per year</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600 mb-2">95%</div>
                <div className="text-gray-600">Automation rate</div>
              </div>
            </div>
          </div>
        </div>
      </div>

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