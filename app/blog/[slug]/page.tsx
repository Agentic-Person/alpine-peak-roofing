import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Clock, ArrowLeft, ArrowRight, Calendar, Tag } from 'lucide-react'
import { blogPosts } from '@/lib/blog/blogData'
import { Button } from '@/components/ui/button'

interface BlogPostPageProps {
  params: { slug: string }
}

function getBlogPost(slug: string) {
  return blogPosts.find(post => post.slug === slug)
}

function getRelatedPosts(currentPost: any, limit = 3) {
  return blogPosts
    .filter(post => 
      post.id !== currentPost.id && 
      (post.category === currentPost.category || 
       post.tags.some(tag => currentPost.tags.includes(tag)))
    )
    .slice(0, limit)
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = getBlogPost(params.slug)
  
  if (!post) {
    return {
      title: 'Blog Post Not Found | Alpine Peak Roofing',
      description: 'The requested blog post could not be found.'
    }
  }

  return {
    title: `${post.title} | Alpine Peak Roofing Blog`,
    description: post.excerpt,
    keywords: [...post.tags, 'roofing', 'Denver', 'Colorado'],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      images: [
        {
          url: post.image,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      publishedTime: post.publishDate,
      tags: post.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [post.image],
    },
  }
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }))
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = getBlogPost(params.slug)
  
  if (!post) {
    notFound()
  }

  const relatedPosts = getRelatedPosts(post)

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb Navigation */}
      <div className="bg-gray-50 py-4">
        <div className="container mx-auto px-4 max-w-4xl">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-blue-600 transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-blue-600 transition-colors">
              Blog
            </Link>
            <span>/</span>
            <span className="text-gray-900 font-medium truncate">
              {post.title}
            </span>
          </nav>
        </div>
      </div>

      <article className="py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Back to Blog */}
          <Link 
            href="/blog"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-8 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to All Articles
          </Link>

          {/* Article Header */}
          <header className="mb-8">
            <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
              <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                {post.category}
              </span>
              <div className="flex items-center space-x-1">
                <Calendar className="h-4 w-4" />
                <span>
                  {new Date(post.publishDate).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="h-4 w-4" />
                <span>{post.readTime}</span>
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
              {post.title}
            </h1>

            <p className="text-xl text-gray-600 leading-relaxed">
              {post.excerpt}
            </p>
          </header>

          {/* Featured Image */}
          <div className="mb-8 rounded-2xl overflow-hidden shadow-lg">
            <Image
              src={post.image}
              alt={post.title}
              width={1200}
              height={600}
              className="w-full h-96 object-cover"
              priority
            />
          </div>

          {/* Article Content */}
          <div className="prose prose-lg max-w-none mb-12">
            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-8 rounded-r-lg">
              <p className="text-blue-900 font-medium mb-2">
                🏔️ Colorado Mountain Climate Focus
              </p>
              <p className="text-blue-800">
                This article is specifically tailored for Colorado's unique mountain climate, 
                altitude considerations, and seasonal weather patterns. Our expertise comes 
                from over 25 years serving Denver metro and surrounding mountain communities.
              </p>
            </div>

            {/* Placeholder content - in a real implementation, this would come from the post.content field */}
            <div className="space-y-6 text-gray-700 leading-relaxed">
              <p>
                {post.excerpt} In this comprehensive guide, we'll explore the unique challenges 
                and solutions specific to Colorado's mountain climate.
              </p>
              
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                Understanding Colorado's Climate Impact
              </h2>
              
              <p>
                Colorado's high altitude and dramatic weather changes create unique roofing challenges 
                that require specialized knowledge and materials. From sudden hailstorms to heavy snow 
                loads, your roof faces conditions that demand professional-grade solutions.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                Key Factors to Consider
              </h3>

              <ul className="list-disc pl-6 space-y-2">
                <li>Altitude effects on material performance and installation</li>
                <li>UV exposure at high elevation</li>
                <li>Temperature fluctuations and thermal cycling</li>
                <li>Snow load requirements and ice dam prevention</li>
                <li>Wind resistance for mountain locations</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                Professional Recommendations
              </h2>

              <p>
                Based on our extensive experience in the Colorado market, we recommend working 
                with local professionals who understand these unique challenges. Alpine Peak Roofing 
                has been serving the Denver metro area for over 25 years, providing solutions 
                specifically designed for Colorado's mountain climate.
              </p>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 my-8">
                <h4 className="font-bold text-yellow-800 mb-2">⚠️ Important Safety Note</h4>
                <p className="text-yellow-700">
                  Working on roofs at high altitude presents additional safety risks. Always 
                  consult with licensed professionals for any roofing work, especially in 
                  mountain communities where weather can change rapidly.
                </p>
              </div>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
              >
                <Tag className="h-3 w-3 mr-1" />
                {tag}
              </span>
            ))}
          </div>

          {/* CTA Section */}
          <div className="bg-blue-50 rounded-2xl p-8 mb-12 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Need Professional Roofing Services?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Ready to protect your Colorado home with expert roofing solutions? 
              Get a free inspection and estimate from Alpine Peak Roofing today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
                Get Free Inspection
              </Button>
              <Button size="lg" variant="outline">
                Call (555) 123-4567
              </Button>
            </div>
          </div>
        </div>
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Related Articles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedPosts.map((relatedPost) => (
                <Link 
                  key={relatedPost.id}
                  href={`/blog/${relatedPost.slug}`}
                  className="group"
                >
                  <article className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                    <div className="relative overflow-hidden">
                      <Image
                        src={relatedPost.image}
                        alt={relatedPost.title}
                        width={400}
                        height={200}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                          {relatedPost.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                        {relatedPost.title}
                      </h3>
                      <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                        {relatedPost.excerpt}
                      </p>
                      <div className="flex items-center text-xs text-gray-500">
                        <Clock className="h-3 w-3 mr-1" />
                        {relatedPost.readTime}
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