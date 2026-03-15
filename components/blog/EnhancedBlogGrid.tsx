'use client'

import { useState, useMemo, useCallback } from 'react'
import { motion, AnimatePresence, type Variants } from 'framer-motion'
import { Clock, ArrowRight, Search, X, ChevronDown } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { categories, sortedBlogPostsForGrid } from '@/lib/blog/blogData'
import type { BlogPost } from '@/lib/blog/blogData'

const POSTS_PER_PAGE = 9

interface EnhancedBlogGridProps {
  posts?: BlogPost[]
  selectedCategory?: string
  onCategoryChange?: (category: string) => void
}

export default function EnhancedBlogGrid({
  posts = sortedBlogPostsForGrid,
  selectedCategory = 'All Posts',
  onCategoryChange,
}: EnhancedBlogGridProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [localSelectedCategory, setLocalSelectedCategory] = useState(selectedCategory)
  const [visibleCount, setVisibleCount] = useState(POSTS_PER_PAGE)

  const currentCategory = onCategoryChange ? selectedCategory : localSelectedCategory

  const handleCategoryChange = useCallback(
    (category: string) => {
      if (onCategoryChange) {
        onCategoryChange(category)
      } else {
        setLocalSelectedCategory(category)
      }
      setVisibleCount(POSTS_PER_PAGE) // reset pagination on filter change
    },
    [onCategoryChange],
  )

  const handleSearchChange = (value: string) => {
    setSearchTerm(value)
    setVisibleCount(POSTS_PER_PAGE) // reset on new search
  }

  // All posts matching current filters (no slice yet)
  const filteredPosts = useMemo(
    () =>
      posts
        .filter(
          (post) => currentCategory === 'All Posts' || post.category === currentCategory,
        )
        .filter((post) => {
          if (!searchTerm) return true
          const q = searchTerm.toLowerCase()
          return (
            post.title.toLowerCase().includes(q) ||
            post.excerpt.toLowerCase().includes(q) ||
            post.tags.some((tag) => tag.toLowerCase().includes(q))
          )
        }),
    [posts, currentCategory, searchTerm],
  )

  const visiblePosts = filteredPosts.slice(0, visibleCount)
  const hasMore = visibleCount < filteredPosts.length
  const remaining = filteredPosts.length - visibleCount

  // Build category list — only show categories that exist in the current posts
  const activeCategorySet = useMemo(() => {
    const set = new Set(posts.map((p) => p.category))
    return set
  }, [posts])

  const visibleCategories = categories.filter(
    (c) => c === 'All Posts' || activeCategorySet.has(c),
  )

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.07 } },
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
  }

  return (
    <section id="blog" className="py-20 bg-white">
      <div className="container mx-auto px-4">

        {/* ── Search + Filter bar ───────────────────────────── */}
        <div className="mb-10 space-y-6">

          {/* Search */}
          <div className="relative max-w-lg mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
            <Input
              type="search"
              placeholder="Search articles, topics, or tags…"
              value={searchTerm}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="pl-11 pr-10 py-3 rounded-full border-slate-200 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {searchTerm && (
              <button
                onClick={() => handleSearchChange('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                aria-label="Clear search"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap gap-2 justify-center">
            {visibleCategories.map((cat) => {
              const isActive = currentCategory === cat
              return (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 border ${
                    isActive
                      ? 'bg-blue-600 text-white border-blue-600 shadow-md scale-105'
                      : 'bg-white text-slate-600 border-slate-200 hover:border-blue-400 hover:text-blue-600'
                  }`}
                >
                  {cat}
                </button>
              )
            })}
          </div>

          {/* Result count */}
          <p className="text-center text-sm text-slate-400">
            {filteredPosts.length === 0
              ? 'No articles found'
              : `Showing ${Math.min(visibleCount, filteredPosts.length)} of ${filteredPosts.length} article${filteredPosts.length !== 1 ? 's' : ''}`}
          </p>
        </div>

        {/* ── Posts Grid ───────────────────────────────────── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {visiblePosts.map((post) => (
              <motion.article
                key={post.id}
                variants={itemVariants}
                layout
                exit={{ opacity: 0, y: -10 }}
                className="group cursor-pointer"
                whileHover={{ y: -5 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                <Link href={`/blog/${post.slug}`} className="block h-full">
                  <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden h-full flex flex-col">
                    <div className="relative overflow-hidden">
                      <Image
                        src={post.image}
                        alt={post.title}
                        width={400}
                        height={200}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute top-4 left-4 flex gap-2">
                        <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                          {post.category}
                        </span>
                        {post.id >= 1000 && (
                          <span className="bg-emerald-500 text-white px-2 py-1 rounded-full text-xs font-semibold tracking-wide">
                            NEW
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="p-6 flex flex-col flex-1">
                      <div className="flex items-center space-x-4 text-sm text-slate-500 mb-3">
                        <span>
                          {new Date(post.publishDate).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </span>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>{post.readTime}</span>
                        </div>
                      </div>

                      <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                        {post.title}
                      </h3>

                      <p className="text-slate-600 mb-4 line-clamp-3 flex-1">{post.excerpt}</p>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.slice(0, 2).map((tag) => (
                          <span
                            key={tag}
                            className="bg-slate-100 text-slate-600 px-2 py-1 rounded-md text-xs font-medium"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold group/btn mt-auto">
                        Read Article
                        <ArrowRight className="h-4 w-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* ── No Results ───────────────────────────────────── */}
        {filteredPosts.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <Search className="h-16 w-16 mx-auto mb-4 text-slate-300" />
            <h3 className="text-2xl font-bold text-slate-600 mb-2">No articles found</h3>
            <p className="text-slate-500 mb-6">
              Try adjusting your search terms or selecting a different category.
            </p>
            <Button
              onClick={() => {
                setSearchTerm('')
                handleCategoryChange('All Posts')
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-6 py-3"
            >
              Clear Filters
            </Button>
          </motion.div>
        )}

        {/* ── Load More ────────────────────────────────────── */}
        {hasMore && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center gap-2 mt-12"
          >
            <Button
              variant="outline"
              onClick={() => setVisibleCount((n) => n + POSTS_PER_PAGE)}
              className="px-10 py-3 rounded-full border-slate-300 text-slate-700 hover:border-blue-500 hover:text-blue-600 transition-all shadow-sm group"
            >
              <ChevronDown className="h-4 w-4 mr-2 group-hover:translate-y-0.5 transition-transform" />
              Load {Math.min(POSTS_PER_PAGE, remaining)} more article{remaining !== 1 ? 's' : ''}
            </Button>
            <span className="text-xs text-slate-400">{remaining} remaining</span>
          </motion.div>
        )}
      </div>
    </section>
  )
}
