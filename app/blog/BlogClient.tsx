"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, Tag } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as unknown as [number, number, number, number] } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

export interface SupabaseBlogPost {
  id: string;
  title: string;
  slug: string;
  meta_description?: string;
  published_at?: string;
  featured_image_url?: string;
  keywords?: string[];
  focus_keyword?: string;
}

interface BlogClientProps {
  posts: SupabaseBlogPost[];
}

export default function BlogClient({ posts }: BlogClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Derive category from focus_keyword or first keyword entry
  const getCategory = (post: SupabaseBlogPost) =>
    post.focus_keyword || (post.keywords && post.keywords[0]) || "General";

  const categories = Array.from(new Set(posts.map(getCategory)));

  const filteredPosts = selectedCategory
    ? posts.filter((post) => getCategory(post) === selectedCategory)
    : posts;

  return (
    <>
      {/* Category Filter */}
      <section className="py-12 border-b border-white/10">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={stagger}
            className="flex flex-wrap gap-3 justify-center"
          >
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all ${
                selectedCategory === null
                  ? "bg-gold text-navy-dark"
                  : "bg-white/5 text-gold hover:bg-white/10"
              }`}
              style={{ fontFamily: "'Source Sans 3', sans-serif" }}
            >
              All Articles
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all ${
                  selectedCategory === category
                    ? "bg-gold text-navy-dark"
                    : "bg-white/5 text-gold hover:bg-white/10"
                }`}
                style={{ fontFamily: "'Source Sans 3', sans-serif" }}
              >
                {category}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-20">
        <div className="container">
          {filteredPosts.length === 0 ? (
            <p className="text-center text-white/40" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
              No articles found.
            </p>
          ) : (
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={stagger}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredPosts.map((post, i) => (
                <motion.article
                  key={post.id}
                  variants={fadeUp}
                  custom={i}
                  className="group flex flex-col bg-white/5 hover:bg-white/10 transition-all duration-300 overflow-hidden"
                >
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    {post.featured_image_url ? (
                      <Image
                        src={post.featured_image_url}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-navy-dark to-gold/20" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-dark via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4">
                      <span className="inline-block px-3 py-1 bg-gold/20 text-gold text-xs font-semibold uppercase tracking-wider" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
                        {getCategory(post)}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 p-6 flex flex-col">
                    {/* Title */}
                    <h3 className="text-lg font-bold text-white mb-3 group-hover:text-gold transition-colors line-clamp-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                      {post.title}
                    </h3>

                    {/* Excerpt */}
                    {post.meta_description && (
                      <p className="text-sm text-white/60 mb-4 line-clamp-2" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
                        {post.meta_description}
                      </p>
                    )}

                    {/* Meta */}
                    {post.published_at && (
                      <div className="flex items-center gap-4 text-xs text-white/40 mb-4" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
                        <div className="flex items-center gap-1">
                          <Calendar size={14} />
                          {new Date(post.published_at).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </div>
                      </div>
                    )}

                    {/* Tags */}
                    {post.keywords && post.keywords.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.keywords.slice(0, 2).map((tag) => (
                          <span
                            key={tag}
                            className="inline-flex items-center gap-1 text-xs text-gold/60 hover:text-gold transition-colors"
                            style={{ fontFamily: "'Source Sans 3', sans-serif" }}
                          >
                            <Tag size={12} />
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Read More Link */}
                    <Link href={`/blog/${post.slug}`} className="mt-auto">
                      <span className="inline-flex items-center gap-2 text-gold hover:text-gold-light transition-colors text-sm font-semibold" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
                        Read Article
                        <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                      </span>
                    </Link>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          )}
        </div>
      </section>
    </>
  );
}
