import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Calendar, Tag } from "lucide-react";
import { createClient } from "@supabase/supabase-js";
import ReactMarkdown from "react-markdown";

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

  return (
    <div>
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
            {post.published_at && (
              <div className="flex flex-wrap items-center gap-6 text-white/70" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
                <div className="flex items-center gap-2">
                  <Calendar size={16} />
                  {new Date(post.published_at).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </div>
              </div>
            )}
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
