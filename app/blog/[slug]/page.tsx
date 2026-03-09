"use client";

import { useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Clock, Tag, Share2, ArrowRight } from "lucide-react";
import { blogPosts } from "@/lib/blogPosts";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as unknown as [number, number, number, number] } },
};

export default function BlogDetail({ params }: { params: { slug: string } }) {
  const post = blogPosts.find((p) => p.slug === params.slug);

  useEffect(() => {
    window.scrollTo(0, 0);

    if (post) {
      document.title = `${post.title} | Alpine Peak Roofing Blog`;

      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', post.excerpt);
      }

      const ogTitle = document.querySelector('meta[property="og:title"]');
      if (ogTitle) ogTitle.setAttribute('content', post.title);

      const ogDescription = document.querySelector('meta[property="og:description"]');
      if (ogDescription) ogDescription.setAttribute('content', post.excerpt);

      const ogImage = document.querySelector('meta[property="og:image"]');
      if (ogImage) ogImage.setAttribute('content', post.image);
    }
  }, [params.slug, post]);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-playfair text-4xl text-white mb-4">Article Not Found</h1>
          <Link href="/blog">
            <span className="text-gold hover:underline">Back to Blog</span>
          </Link>
        </div>
      </div>
    );
  }

  const relatedPosts = blogPosts
    .filter((p) => p.category === post.category && p.id !== post.id)
    .slice(0, 3);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px]">
        <div className="absolute inset-0">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
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
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="mb-4">
                <span className="inline-block px-3 py-1 bg-gold/20 text-gold text-xs font-semibold uppercase tracking-wider" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
                  {post.category}
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                {post.title}
              </h1>
              <div className="flex flex-wrap items-center gap-6 text-white/70" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
                <div className="flex items-center gap-2">
                  <Calendar size={16} />
                  {new Date(post.date).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={16} />
                  {post.readTime} min read
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-16 md:py-24">
        <div className="container max-w-3xl">
          <motion.article
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="prose prose-invert max-w-none"
            style={{ fontFamily: "'Source Sans 3', sans-serif" }}
          >
            <div className="text-white/80 leading-relaxed whitespace-pre-wrap">
              {post.content}
            </div>
          </motion.article>

          {/* Tags */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-12 pt-8 border-t border-white/10"
          >
            <div className="flex flex-wrap gap-3">
              {post.tags.map((tag) => (
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
          </motion.div>

          {/* Share Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8 pt-8 border-t border-white/10"
          >
            <p className="text-white/60 text-sm font-semibold mb-4" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
              Share this article
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`, "_blank")}
                className="w-10 h-10 bg-white/5 hover:bg-gold/20 flex items-center justify-center transition-all"
                aria-label="Share on Facebook"
              >
                <Share2 size={16} className="text-gold" />
              </button>
              <button
                onClick={() => window.open(`https://twitter.com/intent/tweet?url=${window.location.href}&text=${post.title}`, "_blank")}
                className="w-10 h-10 bg-white/5 hover:bg-gold/20 flex items-center justify-center transition-all"
                aria-label="Share on Twitter"
              >
                <Share2 size={16} className="text-gold" />
              </button>
              <button
                onClick={() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${window.location.href}`, "_blank")}
                className="w-10 h-10 bg-white/5 hover:bg-gold/20 flex items-center justify-center transition-all"
                aria-label="Share on LinkedIn"
              >
                <Share2 size={16} className="text-gold" />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Related Articles */}
      {relatedPosts.length > 0 && (
        <section className="py-20 border-t border-white/10">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6 }}
              className="mb-12"
            >
              <h2 className="text-3xl font-bold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
                Related Articles
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedPosts.map((relatedPost, i) => (
                <motion.article
                  key={relatedPost.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="group flex flex-col bg-white/5 hover:bg-white/10 transition-all duration-300 overflow-hidden"
                >
                  {/* Image */}
                  <div className="relative h-40 overflow-hidden">
                    <img
                      src={relatedPost.image}
                      alt={relatedPost.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1 p-4 flex flex-col">
                    <h3 className="text-base font-bold text-white mb-2 group-hover:text-gold transition-colors line-clamp-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                      {relatedPost.title}
                    </h3>

                    <p className="text-xs text-white/40 mb-3" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
                      {new Date(relatedPost.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </p>

                    <Link href={`/blog/${relatedPost.slug}`} className="mt-auto">
                      <span className="inline-flex items-center gap-1 text-gold hover:text-gold-light transition-colors text-xs font-semibold" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
                        Read More
                        <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                      </span>
                    </Link>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 bg-white/5 border-t border-white/10">
        <div className="container text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
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
