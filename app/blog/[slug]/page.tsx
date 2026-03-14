import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Calendar, Clock, Tag } from "lucide-react";
import { createClient } from "@supabase/supabase-js";
import ReactMarkdown from "react-markdown";

function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const wordCount = content.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
}

interface BlogPost {
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
  published_at?: string;
  status: string;
}

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  return createClient(url, key);
}

async function getPost(slug: string): Promise<BlogPost | null> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return null;
  }

  const { data, error } = await getSupabase()
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .single();

  if (error || !data) return null;
  return data as BlogPost;
}

async function getRelatedPosts(currentId: string, focusKeyword?: string): Promise<BlogPost[]> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return [];
  }

  let query = getSupabase()
    .from("blog_posts")
    .select("id, title, slug, featured_image_url, published_at, focus_keyword")
    .eq("status", "published")
    .neq("id", currentId)
    .order("published_at", { ascending: false })
    .limit(3);

  if (focusKeyword) {
    query = query.eq("focus_keyword", focusKeyword);
  }

  const { data } = await query;
  return (data as BlogPost[]) || [];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    return { title: "Article Not Found | Alpine Peak Roofing" };
  }

  return {
    title: post.seo_title || `${post.title} | Alpine Peak Roofing Blog`,
    description: post.meta_description || undefined,
    openGraph: {
      title: post.seo_title || post.title,
      description: post.meta_description || undefined,
      images: post.featured_image_url ? [{ url: post.featured_image_url }] : undefined,
    },
  };
}

export default async function BlogDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = await getRelatedPosts(post.id, post.focus_keyword);
  const category = post.focus_keyword || (post.keywords && post.keywords[0]) || "General";
  const readingTime = calculateReadingTime(post.content);

  const baseUrl = "https://alpinepeakroofing.com";
  const postUrl = `${baseUrl}/blog/${post.slug}`;
  const encodedUrl = encodeURIComponent(postUrl);
  const encodedTitle = encodeURIComponent(post.title);
  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
  };
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.meta_description || undefined,
    "image": post.featured_image_url || undefined,
    "datePublished": post.published_at || undefined,
    "dateModified": post.published_at || undefined,
    "author": {
      "@type": "Organization",
      "name": "Alpine Peak Roofing",
      "url": baseUrl,
    },
    "publisher": {
      "@type": "Organization",
      "name": "Alpine Peak Roofing",
      "url": baseUrl,
      "logo": {
        "@type": "ImageObject",
        "url": `${baseUrl}/logo.png`,
      },
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${baseUrl}/blog/${post.slug}`,
    },
    "keywords": post.keywords?.join(", ") || undefined,
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": baseUrl,
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Blog",
        "item": `${baseUrl}/blog`,
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": post.title,
        "item": postUrl,
      },
    ],
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px]">
        <div className="absolute inset-0">
          {post.featured_image_url ? (
            <Image
              src={post.featured_image_url}
              alt={post.alt_text || post.title}
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-navy-dark to-gold/20" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-navy-dark via-navy-dark/50 to-transparent" />
        </div>

        {/* Back Button */}
        <div className="absolute top-6 left-6 z-10">
          <Link href="/blog">
            <span className="inline-flex items-center gap-2 bg-navy-dark/80 hover:bg-navy-dark text-gold px-4 py-2 text-sm font-semibold transition-all" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
              <ArrowLeft size={16} />
              Back to Blog
            </span>
          </Link>
        </div>

        {/* Content Overlay */}
        <div className="absolute inset-0 flex items-end">
          <div className="container pb-12">
            <div className="mb-4">
              <span className="inline-block px-3 py-1 bg-gold/20 text-gold text-xs font-semibold uppercase tracking-wider" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
                {category}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-6 text-white/70" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
              {post.published_at && (
                <div className="flex items-center gap-2">
                  <Calendar size={16} />
                  {new Date(post.published_at).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </div>
              )}
              <div className="flex items-center gap-2">
                <Clock size={16} />
                {readingTime} min read
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-16 md:py-24">
        <div className="container max-w-3xl">
          <article style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
            <ReactMarkdown
              components={{
                h1: ({ children }) => (
                  <h1 className="text-3xl font-bold text-white mb-6 mt-8" style={{ fontFamily: "'Playfair Display', serif" }}>{children}</h1>
                ),
                h2: ({ children }) => (
                  <h2 className="text-2xl font-bold text-white mb-4 mt-8" style={{ fontFamily: "'Playfair Display', serif" }}>{children}</h2>
                ),
                h3: ({ children }) => (
                  <h3 className="text-xl font-bold text-white mb-3 mt-6" style={{ fontFamily: "'Playfair Display', serif" }}>{children}</h3>
                ),
                p: ({ children }) => (
                  <p className="text-white/80 leading-relaxed mb-4">{children}</p>
                ),
                ul: ({ children }) => (
                  <ul className="list-disc list-inside text-white/80 mb-4 space-y-1">{children}</ul>
                ),
                ol: ({ children }) => (
                  <ol className="list-decimal list-inside text-white/80 mb-4 space-y-1">{children}</ol>
                ),
                li: ({ children }) => (
                  <li className="text-white/80">{children}</li>
                ),
                strong: ({ children }) => (
                  <strong className="text-white font-semibold">{children}</strong>
                ),
                em: ({ children }) => (
                  <em className="text-white/90 italic">{children}</em>
                ),
                blockquote: ({ children }) => (
                  <blockquote className="border-l-4 border-gold pl-4 my-6 text-white/70 italic">{children}</blockquote>
                ),
                a: ({ href, children }) => (
                  <a href={href} className="text-gold hover:text-gold-light underline transition-colors">{children}</a>
                ),
                code: ({ children }) => (
                  <code className="bg-white/10 text-gold px-1.5 py-0.5 rounded text-sm">{children}</code>
                ),
                hr: () => <hr className="border-white/10 my-8" />,
              }}
            >
              {post.content}
            </ReactMarkdown>
          </article>

          {/* Tags */}
          {post.keywords && post.keywords.length > 0 && (
            <div className="mt-12 pt-8 border-t border-white/10">
              <div className="flex flex-wrap gap-3">
                {post.keywords.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-gold text-xs font-semibold uppercase tracking-wider transition-all"
                    style={{ fontFamily: "'Source Sans 3', sans-serif" }}
                  >
                    <Tag size={14} />
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Social Share */}
          <div className="mt-10 pt-8 border-t border-white/10">
            <p className="text-white/50 text-xs font-semibold uppercase tracking-widest mb-4" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
              Share This Article
            </p>
            <div className="flex flex-wrap gap-3">
              {/* Twitter / X */}
              <a
                href={shareLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-[#1DA1F2]/20 hover:border-[#1DA1F2]/40 border border-white/10 text-white/70 hover:text-[#1DA1F2] text-xs font-semibold transition-all"
                style={{ fontFamily: "'Source Sans 3', sans-serif" }}
                aria-label="Share on X / Twitter"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L2.25 2.25h6.908l4.255 5.629L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
                </svg>
                Share on X
              </a>

              {/* LinkedIn */}
              <a
                href={shareLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-[#0A66C2]/20 hover:border-[#0A66C2]/40 border border-white/10 text-white/70 hover:text-[#0A66C2] text-xs font-semibold transition-all"
                style={{ fontFamily: "'Source Sans 3', sans-serif" }}
                aria-label="Share on LinkedIn"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                Share on LinkedIn
              </a>

              {/* Facebook */}
              <a
                href={shareLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-[#1877F2]/20 hover:border-[#1877F2]/40 border border-white/10 text-white/70 hover:text-[#1877F2] text-xs font-semibold transition-all"
                style={{ fontFamily: "'Source Sans 3', sans-serif" }}
                aria-label="Share on Facebook"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                Share on Facebook
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Related Articles */}
      {relatedPosts.length > 0 && (
        <section className="py-20 border-t border-white/10">
          <div className="container">
            <h2 className="text-3xl font-bold text-white mb-12" style={{ fontFamily: "'Playfair Display', serif" }}>
              Related Articles
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedPosts.map((relatedPost) => (
                <article
                  key={relatedPost.id}
                  className="group flex flex-col bg-white/5 hover:bg-white/10 transition-all duration-300 overflow-hidden"
                >
                  <div className="relative h-40 overflow-hidden">
                    {relatedPost.featured_image_url ? (
                      <Image
                        src={relatedPost.featured_image_url}
                        alt={relatedPost.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-navy-dark to-gold/20" />
                    )}
                  </div>

                  <div className="flex-1 p-4 flex flex-col">
                    <h3 className="text-base font-bold text-white mb-2 group-hover:text-gold transition-colors line-clamp-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                      {relatedPost.title}
                    </h3>

                    {relatedPost.published_at && (
                      <p className="text-xs text-white/40 mb-3" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
                        {new Date(relatedPost.published_at).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })}
                      </p>
                    )}

                    <Link href={`/blog/${relatedPost.slug}`} className="mt-auto">
                      <span className="inline-flex items-center gap-1 text-gold hover:text-gold-light transition-colors text-xs font-semibold" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
                        Read More
                        <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                      </span>
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 bg-white/5 border-t border-white/10">
        <div className="container text-center">
          <h2 className="text-3xl font-bold text-white mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            Ready to Protect Your Roof?
          </h2>
          <p className="text-white/60 mb-8 max-w-2xl mx-auto" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
            Schedule a free professional inspection and get expert recommendations tailored to your Colorado home.
          </p>
          <Link href="/contact">
            <span className="inline-flex items-center justify-center gap-2 bg-gold hover:bg-gold-light text-navy-dark px-8 py-4 text-sm font-semibold tracking-wide transition-all hover:shadow-lg hover:shadow-gold/20" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
              Get Free Estimate
              <ArrowRight size={16} />
            </span>
          </Link>
        </div>
      </section>
    </div>
  );
}
