import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { BlogService } from '@/lib/blog/blogService';
import { BlogCard } from '@/components/blog/BlogCard';
import { Button } from '@/components/ui/button';

interface BlogPostPageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  try {
    const post = await BlogService.getPostBySlug(params.slug);
    
    if (!post) {
      return {
        title: 'Blog Post Not Found | Alpine Peak Roofing',
        description: 'The requested blog post could not be found.',
      };
    }

    return {
      title: post.seo_title || `${post.title} | Alpine Peak Roofing`,
      description: post.meta_description || post.content?.substring(0, 160) + '...',
      keywords: post.keywords || [],
      authors: [{ name: 'Alpine Peak Roofing' }],
      openGraph: {
        title: post.seo_title || post.title,
        description: post.meta_description || post.content?.substring(0, 160) + '...',
        type: 'article',
        publishedTime: post.published_at || undefined,
        modifiedTime: post.updated_at,
        authors: ['Alpine Peak Roofing'],
        images: post.featured_image_url ? [
          {
            url: post.featured_image_url,
            width: 1200,
            height: 630,
            alt: post.alt_text || post.title,
          },
        ] : [],
        siteName: 'Alpine Peak Roofing',
      },
      twitter: {
        card: 'summary_large_image',
        title: post.seo_title || post.title,
        description: post.meta_description || post.content?.substring(0, 160) + '...',
        images: post.featured_image_url ? [post.featured_image_url] : [],
      },
      alternates: {
        canonical: `https://alpinepeakroofing.com/blog/${post.slug}`,
      },
    };
  } catch (error) {
    return {
      title: 'Blog Post | Alpine Peak Roofing',
      description: 'Read expert roofing insights from Alpine Peak Roofing.',
    };
  }
}

// Generate static paths for published blog posts (optional - for better performance)
export async function generateStaticParams() {
  try {
    // Get first 50 published posts for static generation
    const { posts } = await BlogService.getPublishedPosts({ limit: 50 });
    return posts.map((post) => ({
      slug: post.slug,
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

const seasonColors = {
  spring: 'bg-green-100 text-green-800 border-green-200',
  summer: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  fall: 'bg-orange-100 text-orange-800 border-orange-200',
  winter: 'bg-blue-100 text-blue-800 border-blue-200',
};

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  try {
    const post = await BlogService.getPostBySlug(params.slug);
    
    if (!post) {
      notFound();
    }

    // Track the view (this would typically be handled client-side for better UX)
    BlogService.trackView(post.id);

    // Get related posts
    const relatedPosts = await BlogService.getRelatedPosts(post.id, post.season, 3);

    const publishedDate = post.published_at
      ? new Date(post.published_at).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })
      : null;

    const updatedDate = post.updated_at
      ? new Date(post.updated_at).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })
      : null;

    // Generate structured data for SEO
    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: post.title,
      description: post.meta_description,
      image: post.featured_image_url ? [post.featured_image_url] : [],
      datePublished: post.published_at,
      dateModified: post.updated_at,
      author: {
        '@type': 'Organization',
        name: 'Alpine Peak Roofing',
        url: 'https://alpinepeakroofing.com',
      },
      publisher: {
        '@type': 'Organization',
        name: 'Alpine Peak Roofing',
        logo: {
          '@type': 'ImageObject',
          url: 'https://alpinepeakroofing.com/logo.png',
        },
      },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': `https://alpinepeakroofing.com/blog/${post.slug}`,
      },
      keywords: post.keywords?.join(', '),
      articleSection: 'Roofing',
      inLanguage: 'en-US',
    };

    return (
      <>
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        <article className="min-h-screen bg-white">
          {/* Breadcrumbs */}
          <div className="bg-gray-50 py-4">
            <div className="container mx-auto px-4 max-w-4xl">
              <nav className="flex items-center space-x-2 text-sm text-gray-600">
                <Link href="/" className="hover:text-blue-600">
                  Home
                </Link>
                <span>/</span>
                <Link href="/blog" className="hover:text-blue-600">
                  Blog
                </Link>
                <span>/</span>
                <span className="text-gray-900 truncate">{post.title}</span>
              </nav>
            </div>
          </div>

          {/* Article Header */}
          <header className="py-12">
            <div className="container mx-auto px-4 max-w-4xl">
              <div className="text-center max-w-3xl mx-auto">
                {/* Season Badge */}
                {post.season && (
                  <div className="mb-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${seasonColors[post.season]}`}>
                      {post.season.charAt(0).toUpperCase() + post.season.slice(1)} Guide
                    </span>
                  </div>
                )}

                {/* Title */}
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                  {post.title}
                </h1>

                {/* Meta Description */}
                {post.meta_description && (
                  <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                    {post.meta_description}
                  </p>
                )}

                {/* Article Meta */}
                <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500 mb-8">
                  <div className="flex items-center gap-2">
                    <span>📅</span>
                    <time dateTime={post.published_at || post.created_at}>
                      Published {publishedDate}
                    </time>
                  </div>
                  
                  {updatedDate && updatedDate !== publishedDate && (
                    <div className="flex items-center gap-2">
                      <span>🔄</span>
                      <time dateTime={post.updated_at}>
                        Updated {updatedDate}
                      </time>
                    </div>
                  )}
                  
                  <div className="flex items-center gap-2">
                    <span>🏢</span>
                    <span>Alpine Peak Roofing</span>
                  </div>

                  {post.estimated_cost && (
                    <div className="flex items-center gap-2 text-green-600">
                      <span>💰</span>
                      <span>Generated for ${post.estimated_cost}</span>
                    </div>
                  )}
                </div>

                {/* Keywords */}
                {post.keywords && post.keywords.length > 0 && (
                  <div className="flex flex-wrap justify-center gap-2 mb-8">
                    {post.keywords.map((keyword, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded-full border border-blue-200"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </header>

          {/* Featured Image */}
          {post.featured_image_url && (
            <div className="mb-12">
              <div className="container mx-auto px-4 max-w-4xl">
                <div className="relative w-full h-64 md:h-96 rounded-lg overflow-hidden shadow-lg">
                  <Image
                    src={post.featured_image_url}
                    alt={post.alt_text || post.title}
                    fill
                    priority
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Article Content */}
          <div className="pb-12">
            <div className="container mx-auto px-4 max-w-4xl">
              <div className="prose prose-lg prose-gray max-w-none">
                {/* Content would be parsed from markdown or HTML */}
                <div 
                  className="prose-headings:font-bold prose-headings:text-gray-900 prose-h2:text-2xl prose-h3:text-xl prose-p:text-gray-700 prose-p:leading-relaxed prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900 prose-ul:text-gray-700 prose-ol:text-gray-700"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="bg-blue-600 text-white py-12 mb-12">
            <div className="container mx-auto px-4 max-w-4xl text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Need Professional Roofing Services?
              </h2>
              <p className="text-xl text-blue-100 mb-8">
                Our expert team is ready to help with all your roofing needs in Denver and surrounding areas.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                  Get Free Inspection
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                  Call (555) 123-4567
                </Button>
              </div>
            </div>
          </div>

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <div className="bg-gray-50 py-12">
              <div className="container mx-auto px-4 max-w-6xl">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-8">
                  Related Articles
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {relatedPosts.map((relatedPost) => (
                    <BlogCard key={relatedPost.id} post={relatedPost} />
                  ))}
                </div>
                <div className="text-center mt-8">
                  <Link href="/blog">
                    <Button variant="outline">
                      View All Blog Posts →
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </article>
      </>
    );
  } catch (error) {
    console.error('Error loading blog post:', error);
    notFound();
  }
}