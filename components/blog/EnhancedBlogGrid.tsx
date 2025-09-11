'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Clock, ArrowRight, Filter, Search } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { blogPosts, categories, sortedBlogPostsForGrid } from '@/lib/blog/blogData'
import type { BlogPost } from '@/lib/blog/blogData'

interface EnhancedBlogGridProps {
  posts?: BlogPost[]
  selectedCategory?: string
  onCategoryChange?: (category: string) => void
}

export default function EnhancedBlogGrid({ 
  posts = sortedBlogPostsForGrid, 
  selectedCategory = 'All Posts',
  onCategoryChange 
}: EnhancedBlogGridProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [localSelectedCategory, setLocalSelectedCategory] = useState(selectedCategory)

  const handleCategoryChange = (category: string) => {
    if (onCategoryChange) {
      onCategoryChange(category)
    } else {
      setLocalSelectedCategory(category)
    }
  }

  const currentCategory = onCategoryChange ? selectedCategory : localSelectedCategory

  const filteredPosts = posts
    .filter(post => currentCategory === 'All Posts' || post.category === currentCategory)
    .filter(post =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    )

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  }

  return (
    <section id="blog" className="py-20 bg-white">
      <div className="container mx-auto px-4">

        {/* Blog Posts Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="wait">
            {filteredPosts.map((post) => (
              <motion.article
                key={post.id}
                variants={itemVariants}
                layout
                className="group cursor-pointer"
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <Link href={`/blog/${post.slug}`} className="block">
                  <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden h-full">
                    <div className="relative overflow-hidden">
                      <Image
                        src={post.image}
                        alt={post.title}
                        width={400}
                        height={200}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="absolute top-4 left-4">
                        <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                          {post.category}
                        </span>
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="flex items-center space-x-4 text-sm text-slate-500 mb-3">
                        <span>{new Date(post.publishDate).toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric', 
                          year: 'numeric' 
                        })}</span>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>{post.readTime}</span>
                        </div>
                      </div>

                      <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                        {post.title}
                      </h3>

                      <p className="text-slate-600 mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>

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

                      <div className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold group/btn">
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

        {/* No Results Message */}
        {filteredPosts.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <div className="text-slate-400 mb-4">
              <Search className="h-16 w-16 mx-auto mb-4" />
            </div>
            <h3 className="text-2xl font-bold text-slate-600 mb-2">No articles found</h3>
            <p className="text-slate-500 mb-6">
              Try adjusting your search terms or filters to find what you're looking for.
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
      </div>
    </section>
  )
}