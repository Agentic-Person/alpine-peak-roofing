import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { createClient } from "@supabase/supabase-js";
import BlogClient, { SupabaseBlogPost } from "./BlogClient";

async function getPosts(): Promise<SupabaseBlogPost[]> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return [];
  }

  const supabase = createClient(supabaseUrl, supabaseKey);
  const { data, error } = await supabase
    .from("blog_posts")
    .select("id, title, slug, meta_description, published_at, featured_image_url, keywords, focus_keyword")
    .eq("status", "published")
    .order("published_at", { ascending: false });

  if (error) {
    console.error("Failed to fetch blog posts:", error.message);
    return [];
  }

  return data || [];
}

export default async function Blog() {
  const posts = await getPosts();

  return (
    <div>
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 bg-gradient-to-b from-navy-dark to-navy-dark/80">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto">
            <div className="gold-line mx-auto mb-4" />
            <span className="text-xs uppercase tracking-[0.2em] text-gold font-semibold block mb-3" style={{ fontFamily: "var(--font-source-sans), system-ui, sans-serif" }}>
              Expert Insights
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
              Roofing Blog
            </h1>
            <p className="text-lg text-white/60" style={{ fontFamily: "var(--font-source-sans), system-ui, sans-serif" }}>
              Expert tips, maintenance guides, and insights for protecting your Colorado mountain home
            </p>
          </div>
        </div>
      </section>

      {/* Category filter + posts grid (client component for interactivity) */}
      <BlogClient posts={posts} />

      {/* CTA Section */}
      <section className="py-16 bg-white/5 border-t border-white/10">
        <div className="container text-center">
          <h2 className="text-3xl font-bold text-white mb-4" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
            Ready to Protect Your Roof?
          </h2>
          <p className="text-white/60 mb-8 max-w-2xl mx-auto" style={{ fontFamily: "var(--font-source-sans), system-ui, sans-serif" }}>
            Schedule a free professional inspection and get expert recommendations tailored to your Colorado home.
          </p>
          <Link href="/contact">
            <span className="inline-flex items-center justify-center gap-2 bg-gold hover:bg-gold-light text-navy-dark px-8 py-4 text-sm font-semibold tracking-wide transition-all hover:shadow-lg hover:shadow-gold/20" style={{ fontFamily: "var(--font-source-sans), system-ui, sans-serif" }}>
              Get Free Estimate
              <ArrowRight size={16} />
            </span>
          </Link>
        </div>
      </section>
    </div>
  );
}
