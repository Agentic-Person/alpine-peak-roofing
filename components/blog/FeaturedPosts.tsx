'use client'

import { motion } from 'framer-motion'
import { Clock, ArrowRight, Star } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { featuredPosts } from '@/lib/blog/blogData'

export default function FeaturedPosts() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  return (
    <section id="featured" className="pt-20 pb-20 bg-gradient-to-b from-white to-slate-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
            Essential Reading for Colorado Homeowners
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Our most popular and comprehensive guides to protecting your mountain home's roof
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-10 gap-8">
          {/* Left Column - 70% width (7 out of 10 columns) */}
          <div className="lg:col-span-7 space-y-8">
            {featuredPosts.slice(0, 2).map((post, index) => (
              <motion.article
                key={post.id}
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="group cursor-pointer"
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <Link href={`/blog/${post.slug}`} className="block">
                  <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden h-full min-h-[280px] lg:min-h-[320px]">
                    <div className="flex flex-col lg:flex-row h-full">
                      {/* Image Section */}
                      <div className="relative overflow-hidden lg:w-1/2">
                        <Image
                          src={post.image}
                          alt={post.title}
                          width={600}
                          height={400}
                          className="w-full h-48 lg:h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          priority={index === 0}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="absolute top-4 left-4">
                          <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                            {post.category}
                          </span>
                        </div>
                      </div>

                      {/* Content Section */}
                      <div className="p-6 lg:w-1/2 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center space-x-4 text-sm text-slate-500 mb-3">
                            <span>{new Date(post.publishDate).toLocaleDateString('en-US', { 
                              month: 'long', 
                              day: 'numeric', 
                              year: 'numeric' 
                            })}</span>
                            <div className="flex items-center space-x-1">
                              <Clock className="h-4 w-4" />
                              <span>{post.readTime}</span>
                            </div>
                          </div>

                          <h3 className="text-xl lg:text-2xl font-bold text-slate-800 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                            {post.title}
                          </h3>

                          <p className="text-slate-600 mb-4 line-clamp-3">
                            {post.excerpt}
                          </p>

                          <div className="flex flex-wrap gap-2 mb-4">
                            {post.tags.slice(0, 3).map((tag) => (
                              <span
                                key={tag}
                                className="bg-slate-100 text-slate-600 px-2 py-1 rounded-md text-xs font-medium"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold group/btn">
                          Read Full Article
                          <ArrowRight className="h-4 w-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>

          {/* Right Column - 30% width (3 out of 10 columns) */}
          <div className="lg:col-span-3 space-y-8">
            {featuredPosts.slice(2, 5).map((post, index) => (
              <motion.article
                key={post.id}
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
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
                        className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-500"
                        priority={false}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="absolute top-4 left-4">
                        <span className="bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                          {post.category}
                        </span>
                      </div>
                    </div>

                    <div className="p-4">
                      <div className="flex items-center space-x-3 text-xs text-slate-500 mb-2">
                        <span>{new Date(post.publishDate).toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric' 
                        })}</span>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-3 w-3" />
                          <span>{post.readTime}</span>
                        </div>
                      </div>

                      <h3 className="text-sm font-bold text-slate-800 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                        {post.title}
                      </h3>

                      <p className="text-xs text-slate-600 mb-3 line-clamp-2">
                        {post.excerpt}
                      </p>

                      <div className="flex flex-wrap gap-1 mb-3">
                        {post.tags.slice(0, 2).map((tag) => (
                          <span
                            key={tag}
                            className="bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded text-xs font-medium"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold text-xs group/btn">
                        Read Article
                        <ArrowRight className="h-3 w-3 ml-1 group-hover/btn:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <Button
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full text-lg font-semibold"
            onClick={() => document.getElementById('blog')?.scrollIntoView({ behavior: 'smooth' })}
          >
            View All Articles
            <ArrowRight className="h-5 w-5 ml-2" />
          </Button>
        </motion.div>
      </div>
    </section>
  )
}