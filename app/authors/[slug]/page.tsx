/*
 * /authors/[slug] — Alpine Peak Roofing
 * Server Component — per-author archive page (EEAT signal).
 *
 * Renders the author bio plus a list of blog posts attributed to them.
 * Until `blog_posts.author_slug` exists, we show a "Posts coming soon"
 * placeholder rather than fabricate attributions.
 */
import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowRight, Calendar } from "lucide-react";
import { createClient } from "@supabase/supabase-js";
import { authors, authorList, getAuthor } from "@/lib/authors";
import AuthorBio from "@/components/blog/AuthorBio";
import BreadcrumbSchema from "@/components/seo/schemas/BreadcrumbSchema";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

const BASE_URL = "https://alpinepeakroofing.com";

// ─── Static Params ───────────────────────────────────────────────────────────
export function generateStaticParams() {
  return Object.keys(authors).map((slug) => ({ slug }));
}

// ─── Metadata ────────────────────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const author = getAuthor(slug);
  if (!author) {
    return { title: "Author Not Found | Alpine Peak Roofing" };
  }

  const title = `${author.name} — ${author.title} | Alpine Peak Roofing`;
  // First ~160 chars of the bio keeps us within common meta-description limits.
  const description = author.bio.slice(0, 160).replace(/\s+\S*$/, "") + "…";

  return {
    title,
    description,
    alternates: {
      canonical: `${BASE_URL}/authors/${slug}`,
    },
    openGraph: {
      title,
      description,
      url: `${BASE_URL}/authors/${slug}`,
      type: "profile",
      ...(author.avatar ? { images: [{ url: author.avatar }] } : {}),
    },
  };
}

// ─── Data ────────────────────────────────────────────────────────────────────
interface AuthoredPost {
  id: string;
  title: string;
  slug: string;
  meta_description?: string;
  featured_image_url?: string;
  published_at?: string;
}

async function getPostsByAuthor(authorSlug: string): Promise<AuthoredPost[]> {
  // TODO(blog-data): Once `blog_posts.author_slug` exists in Supabase,
  // query `.eq("author_slug", authorSlug)` here instead of returning [].
  void authorSlug;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return [];

  // Intentionally returns [] until the author_slug column is live,
  // so the archive renders the "Posts coming soon" placeholder.
  return [];
}

// ─── Page ────────────────────────────────────────────────────────────────────
export default async function AuthorPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const author = getAuthor(slug);
  if (!author) notFound();

  const posts = await getPostsByAuthor(slug);

  const breadcrumbItems = [
    { name: "Home", url: BASE_URL },
    { name: "Authors", url: `${BASE_URL}/authors` },
    { name: author.name, url: `${BASE_URL}/authors/${slug}` },
  ];

  // Person-level JSON-LD anchors the author as an entity Google can reason about.
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: author.name,
    jobTitle: author.title,
    description: author.bio,
    url: `${BASE_URL}/authors/${slug}`,
    knowsAbout: author.expertise,
    ...(author.credentials.length > 0 ? { hasCredential: author.credentials } : {}),
    ...(author.sameAs.length > 0 ? { sameAs: author.sameAs } : {}),
    worksFor: {
      "@type": "Organization",
      "@id": `${BASE_URL}/#organization`,
      name: "Alpine Peak Roofing",
      url: BASE_URL,
    },
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <BreadcrumbSchema id="author-breadcrumb-schema" items={breadcrumbItems} />

      {/* Hero */}
      <section className="relative py-20 md:py-28 bg-gradient-to-b from-navy-dark to-navy-dark/80">
        <div className="container">
          <Breadcrumbs
            className="mb-6"
            items={[
              { name: "Home", href: "/" },
              { name: "Blog", href: "/blog" },
              { name: author.name },
            ]}
          />
          <div className="max-w-3xl">
            <div className="gold-line mb-4" />
            <span
              className="text-xs uppercase tracking-[0.2em] text-gold font-semibold block mb-3"
              style={{ fontFamily: "'Source Sans 3', sans-serif" }}
            >
              Author
            </span>
            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {author.name}
            </h1>
            <p
              className="text-lg md:text-xl text-gold font-semibold"
              style={{ fontFamily: "'Source Sans 3', sans-serif" }}
            >
              {author.title}
            </p>
          </div>
        </div>
      </section>

      {/* Bio card */}
      <section className="py-12 md:py-16">
        <div className="container max-w-3xl">
          <AuthorBio author={author} heading={null} />

          {/* Expertise */}
          {author.expertise.length > 0 && (
            <div className="mt-12">
              <h2
                className="text-2xl font-bold text-white mb-6"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Areas of Expertise
              </h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {author.expertise.map((topic) => (
                  <li
                    key={topic}
                    className="flex items-start gap-2 text-white/80"
                    style={{ fontFamily: "'Source Sans 3', sans-serif" }}
                  >
                    <ArrowRight size={16} className="text-gold mt-1 flex-shrink-0" />
                    <span>{topic}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>

      {/* Posts */}
      <section className="py-16 border-t border-white/10">
        <div className="container max-w-5xl">
          <h2
            className="text-3xl font-bold text-white mb-8"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Articles by {author.name}
          </h2>

          {posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <article
                  key={post.id}
                  className="group flex flex-col bg-white/5 hover:bg-white/10 transition-all duration-300 overflow-hidden"
                >
                  <div className="relative h-40 overflow-hidden">
                    {post.featured_image_url ? (
                      <Image
                        src={post.featured_image_url}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-navy-dark to-gold/20" />
                    )}
                  </div>
                  <div className="flex-1 p-5 flex flex-col">
                    <h3
                      className="text-lg font-bold text-white mb-2 group-hover:text-gold transition-colors line-clamp-2"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      {post.title}
                    </h3>
                    {post.published_at && (
                      <p
                        className="flex items-center gap-1 text-xs text-white/40 mb-3"
                        style={{ fontFamily: "'Source Sans 3', sans-serif" }}
                      >
                        <Calendar size={12} />
                        {new Date(post.published_at).toLocaleDateString("en-US", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </p>
                    )}
                    <Link href={`/blog/${post.slug}`} className="mt-auto">
                      <span
                        className="inline-flex items-center gap-1 text-gold hover:text-gold-light transition-colors text-xs font-semibold"
                        style={{ fontFamily: "'Source Sans 3', sans-serif" }}
                      >
                        Read Article
                        <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                      </span>
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div
              className="bg-white/5 border border-white/10 p-8 md:p-12 text-center"
              style={{ fontFamily: "'Source Sans 3', sans-serif" }}
            >
              <p className="text-white/70 text-lg mb-2">
                Posts by {author.name} coming soon.
              </p>
              <p className="text-white/50 text-sm">
                In the meantime, browse the full{" "}
                <Link href="/blog" className="text-gold hover:text-gold-light underline transition-colors">
                  Alpine Peak Roofing blog
                </Link>
                .
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Other authors strip */}
      {authorList.length > 1 && (
        <section className="py-16 bg-white/5 border-t border-white/10">
          <div className="container max-w-5xl">
            <h2
              className="text-2xl font-bold text-white mb-8"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Meet the Rest of the Team
            </h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {authorList
                .filter((a) => a.slug !== author.slug)
                .map((a) => (
                  <li key={a.slug}>
                    <Link
                      href={`/authors/${a.slug}`}
                      className="block p-5 bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
                    >
                      <p
                        className="text-gold text-xs font-semibold uppercase tracking-wider mb-1"
                        style={{ fontFamily: "'Source Sans 3', sans-serif" }}
                      >
                        {a.title}
                      </p>
                      <p
                        className="text-white font-bold text-lg"
                        style={{ fontFamily: "'Playfair Display', serif" }}
                      >
                        {a.name}
                      </p>
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
        </section>
      )}
    </div>
  );
}
