import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Clock, ArrowLeft, Calendar, Tag } from 'lucide-react'
import { blogPosts } from '@/lib/blog/blogData'
import { BlogService } from '@/lib/blog/blogService'
import { Button } from '@/components/ui/button'
import type { BlogPost as SupabaseBlogPost } from '@/lib/blog/types'

interface BlogPostPageProps {
  params: Promise<{ slug: string }>
}

// ── Data fetching ───────────────────────────────────────────────────────────────

/** Try static data first, then Supabase fallback */
async function getPost(slug: string): Promise<{
  source: 'static' | 'supabase'
  post: any
} | null> {
  // 1. Static data (legacy posts)
  const staticPost = blogPosts.find(p => p.slug === slug)
  if (staticPost) return { source: 'static', post: staticPost }

  // 2. Supabase (AI-generated posts)
  try {
    const dbPost = await BlogService.getPostBySlug(slug)
    if (dbPost) return { source: 'supabase', post: dbPost }
  } catch (_) {
    // Supabase unavailable — fall through to 404
  }

  return null
}

async function getRelatedPostsForStatic(currentPost: any, limit = 3) {
  return blogPosts
    .filter(
      p =>
        p.id !== currentPost.id &&
        (p.category === currentPost.category ||
          p.tags.some((t: string) => currentPost.tags.includes(t)))
    )
    .slice(0, limit)
}

async function getRelatedPostsForSupabase(post: SupabaseBlogPost, limit = 3) {
  try {
    return await BlogService.getRelatedPosts(post.id, post.season || undefined, limit)
  } catch (_) {
    return []
  }
}

// ── Metadata ────────────────────────────────────────────────────────────────────

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  const result = await getPost(slug)

  if (!result) {
    return {
      title: 'Blog Post Not Found | Alpine Peak Roofing',
      description: 'The requested blog post could not be found.',
    }
  }

  if (result.source === 'static') {
    const post = result.post
    return {
      title: `${post.title} | Alpine Peak Roofing Blog`,
      description: post.excerpt,
      keywords: [...post.tags, 'roofing', 'Denver', 'Colorado'],
      openGraph: {
        title: post.title,
        description: post.excerpt,
        type: 'article',
        images: [{ url: post.image, width: 1200, height: 630, alt: post.title }],
        publishedTime: post.publishDate,
        tags: post.tags,
      },
    }
  }

  // Supabase post
  const post = result.post as SupabaseBlogPost
  return {
    title: `${post.seo_title || post.title} | Alpine Peak Roofing Blog`,
    description: post.meta_description || '',
    keywords: post.keywords || [],
    openGraph: {
      title: post.title,
      description: post.meta_description || '',
      type: 'article',
      images: post.featured_image_url
        ? [{ url: post.featured_image_url, width: 1200, height: 630, alt: post.alt_text || post.title }]
        : [],
      publishedTime: post.published_at || post.created_at,
      tags: post.keywords || [],
    },
  }
}

export async function generateStaticParams() {
  return blogPosts.map(post => ({ slug: post.slug }))
}

// ── Render helpers ──────────────────────────────────────────────────────────────

function MarkdownContent({ content }: { content: string }) {
  // Simple markdown→HTML for blog content (h2, h3, bold, bullets, paragraphs)
  const lines = content.split('\n')
  const elements: React.ReactNode[] = []
  let key = 0

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]

    if (line.startsWith('## ')) {
      elements.push(
        <h2 key={key++} className="text-2xl font-bold text-gray-900 mt-8 mb-4">
          {line.replace('## ', '')}
        </h2>
      )
    } else if (line.startsWith('### ')) {
      elements.push(
        <h3 key={key++} className="text-xl font-semibold text-gray-900 mt-6 mb-3">
          {line.replace('### ', '')}
        </h3>
      )
    } else if (line.startsWith('- ') || line.startsWith('* ')) {
      // Collect consecutive list items
      const items: string[] = []
      while (i < lines.length && (lines[i].startsWith('- ') || lines[i].startsWith('* '))) {
        items.push(lines[i].replace(/^[-*] /, ''))
        i++
      }
      i-- // back up one since loop will increment
      elements.push(
        <ul key={key++} className="list-disc pl-6 space-y-2 mb-4 text-gray-700">
          {items.map((item, j) => (
            <li key={j} dangerouslySetInnerHTML={{ __html: inlineMd(item) }} />
          ))}
        </ul>
      )
    } else if (line.trim() === '') {
      // skip blank lines (handled by margin on elements)
    } else {
      elements.push(
        <p
          key={key++}
          className="text-gray-700 leading-relaxed mb-4"
          dangerouslySetInnerHTML={{ __html: inlineMd(line) }}
        />
      )
    }
  }

  return <div className="prose prose-lg max-w-none">{elements}</div>
}

/** Handles **bold** and *italic* inline markdown */
function inlineMd(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
}

// ── Page ────────────────────────────────────────────────────────────────────────

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const result = await getPost(slug)

  if (!result) notFound()

  // ── Static post (legacy) ────────────────────────────────────────────────────
  if (result.source === 'static') {
    const post = result.post
    const relatedPosts = await getRelatedPostsForStatic(post)

    return <StaticPostLayout post={post} relatedPosts={relatedPosts} />
  }

  // ── Supabase post (AI-generated) ────────────────────────────────────────────
  const post = result.post as SupabaseBlogPost
  const relatedPosts = await getRelatedPostsForSupabase(post)

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-gray-50 py-4">
        <div className="container mx-auto px-4 max-w-4xl">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-blue-600 transition-colors">Blog</Link>
            <span>/</span>
            <span className="text-gray-900 font-medium truncate">{post.title}</span>
          </nav>
        </div>
      </div>

      <article className="py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <Link
            href="/blog"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-8 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to All Articles
          </Link>

          {/* Header */}
          <header className="mb-8">
            <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
              {post.season && (
                <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-medium capitalize">
                  {post.season}
                </span>
              )}
              <div className="flex items-center space-x-1">
                <Calendar className="h-4 w-4" />
                <span>
                  {new Date(post.published_at || post.created_at).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="h-4 w-4" />
                <span>{Math.ceil(post.content.split(/\s+/).length / 200)} min read</span>
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
              {post.title}
            </h1>

            {post.meta_description && (
              <p className="text-xl text-gray-600 leading-relaxed">{post.meta_description}</p>
            )}
          </header>

          {/* Featured Image */}
          {post.featured_image_url && (
            <div className="mb-8 rounded-2xl overflow-hidden shadow-lg">
              <Image
                src={post.featured_image_url}
                alt={post.alt_text || post.title}
                width={1200}
                height={600}
                className="w-full h-96 object-cover"
                priority
              />
            </div>
          )}

          {/* Colorado Climate callout */}
          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-8 rounded-r-lg">
            <p className="text-blue-900 font-medium mb-1">🏔️ Colorado Mountain Climate Focus</p>
            <p className="text-blue-800 text-sm">
              This article is tailored for Colorado's unique mountain climate — high altitude, hail seasons,
              temperature swings, and heavy snow. Alpine Peak Roofing has served Denver metro homeowners since 1998.
            </p>
          </div>

          {/* Article Content */}
          <MarkdownContent content={post.content} />

          {/* Keywords */}
          {post.keywords && post.keywords.length > 0 && (
            <div className="flex flex-wrap gap-2 my-8">
              {post.keywords.map(tag => (
                <span
                  key={tag}
                  className="inline-flex items-center bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                >
                  <Tag className="h-3 w-3 mr-1" />
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* CTA */}
          <div className="bg-blue-50 rounded-2xl p-8 mb-12 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Need Professional Roofing Services?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Ready to protect your Colorado home? Get a free inspection and estimate from Alpine Peak
              Roofing today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
                Get Free Inspection
              </Button>
              <Button size="lg" variant="outline">
                Call (303) 555-0199
              </Button>
            </div>
          </div>
        </div>
      </article>

      {/* Related Posts (Supabase) */}
      {relatedPosts.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedPosts.map(related => (
                <Link key={related.id} href={`/blog/${related.slug}`} className="group">
                  <article className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden h-full">
                    <div className="p-6">
                      <h3 className="font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                        {related.title}
                      </h3>
                      {related.meta_description && (
                        <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                          {related.meta_description}
                        </p>
                      )}
                      <div className="flex items-center text-xs text-gray-500">
                        <Clock className="h-3 w-3 mr-1" />
                        {Math.ceil((related.content?.split(/\s+/).length || 900) / 200)} min read
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}

// ── Legacy static post renderer (unchanged behavior) ───────────────────────────

function StaticPostLayout({ post, relatedPosts }: { post: any; relatedPosts: any[] }) {
  return (
    <div className="min-h-screen bg-white">
      <div className="bg-gray-50 py-4">
        <div className="container mx-auto px-4 max-w-4xl">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-blue-600 transition-colors">Blog</Link>
            <span>/</span>
            <span className="text-gray-900 font-medium truncate">{post.title}</span>
          </nav>
        </div>
      </div>

      <article className="py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <Link href="/blog" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-8 transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to All Articles
          </Link>

          <header className="mb-8">
            <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
              <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                {post.category}
              </span>
              <div className="flex items-center space-x-1">
                <Calendar className="h-4 w-4" />
                <span>{new Date(post.publishDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="h-4 w-4" />
                <span>{post.readTime}</span>
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">{post.title}</h1>
            <p className="text-xl text-gray-600 leading-relaxed">{post.excerpt}</p>
          </header>

          <div className="mb-8 rounded-2xl overflow-hidden shadow-lg">
            <Image src={post.image} alt={post.title} width={1200} height={600} className="w-full h-96 object-cover" priority />
          </div>

          <div className="prose prose-lg max-w-none mb-12">
            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-8 rounded-r-lg">
              <p className="text-blue-900 font-medium mb-2">🏔️ Colorado Mountain Climate Focus</p>
              <p className="text-blue-800">
                This article is specifically tailored for Colorado's unique mountain climate,
                altitude considerations, and seasonal weather patterns.
              </p>
            </div>
            <div className="space-y-6 text-gray-700 leading-relaxed">
              <p>{post.excerpt} In this comprehensive guide, we'll explore the unique challenges and solutions specific to Colorado's mountain climate.</p>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Understanding Colorado's Climate Impact</h2>
              <p>Colorado's high altitude and dramatic weather changes create unique roofing challenges that require specialized knowledge and materials.</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Altitude effects on material performance and installation</li>
                <li>UV exposure at high elevation</li>
                <li>Temperature fluctuations and thermal cycling</li>
                <li>Snow load requirements and ice dam prevention</li>
                <li>Wind resistance for mountain locations</li>
              </ul>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Professional Recommendations</h2>
              <p>Alpine Peak Roofing has been serving the Denver metro area for over 25 years, providing solutions specifically designed for Colorado's mountain climate.</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-8">
            {post.tags.map((tag: string) => (
              <span key={tag} className="inline-flex items-center bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                <Tag className="h-3 w-3 mr-1" />{tag}
              </span>
            ))}
          </div>

          <div className="bg-blue-50 rounded-2xl p-8 mb-12 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Need Professional Roofing Services?</h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Ready to protect your Colorado home? Get a free inspection from Alpine Peak Roofing today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">Get Free Inspection</Button>
              <Button size="lg" variant="outline">Call (303) 555-0199</Button>
            </div>
          </div>
        </div>
      </article>

      {relatedPosts.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedPosts.map(rel => (
                <Link key={rel.id} href={`/blog/${rel.slug}`} className="group">
                  <article className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                    <div className="relative overflow-hidden">
                      <Image src={rel.image} alt={rel.title} width={400} height={200} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
                    </div>
                    <div className="p-6">
                      <h3 className="font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">{rel.title}</h3>
                      <p className="text-gray-600 text-sm line-clamp-3 mb-4">{rel.excerpt}</p>
                      <div className="flex items-center text-xs text-gray-500">
                        <Clock className="h-3 w-3 mr-1" />{rel.readTime}
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
