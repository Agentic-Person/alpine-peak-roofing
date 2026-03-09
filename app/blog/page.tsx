"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, Clock, Tag } from "lucide-react";
import { blogPosts } from "@/lib/blogPosts";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as unknown as [number, number, number, number] } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = Array.from(new Set(blogPosts.map((post) => post.category)));
  const filteredPosts = selectedCategory
    ? blogPosts.filter((post) => post.category === selectedCategory)
    : blogPosts;

  return (
    <div>
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 bg-gradient-to-b from-navy-dark to-navy-dark/80">
        <div className="container">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="gold-line mx-auto mb-4" />
            <span className="text-xs uppercase tracking-[0.2em] text-gold font-semibold block mb-3" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
              Expert Insights
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
              Roofing Blog
            </h1>
            <p className="text-lg text-white/60" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
              Expert tips, maintenance guides, and insights for protecting your Colorado mountain home
            </p>
          </motion.div>
        </div>
      </section>

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
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-dark via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <span className="inline-block px-3 py-1 bg-gold/20 text-gold text-xs font-semibold uppercase tracking-wider" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
                      {post.category}
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
                  <p className="text-sm text-white/60 mb-4 line-clamp-2" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
                    {post.excerpt}
                  </p>

                  {/* Meta */}
                  <div className="flex items-center gap-4 text-xs text-white/40 mb-4" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
                    <div className="flex items-center gap-1">
                      <Calendar size={14} />
                      {new Date(post.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock size={14} />
                      {post.readTime} min
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.slice(0, 2).map((tag) => (
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
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white/5 border-t border-white/10">
        <div className="container text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeUp}
          >
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
          </motion.div>
        </div>
      </section>
    </div>
  );
}
