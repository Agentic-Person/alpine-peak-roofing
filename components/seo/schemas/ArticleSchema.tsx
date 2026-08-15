import { jsonLdHtml } from './jsonLd';
import type { Author } from '@/lib/authors';

export interface ArticleSchemaProps {
  /** Article headline (same as <h1> on the page). */
  headline: string;
  /** Meta-description-style short summary. Optional but recommended. */
  description?: string;
  /** ISO-8601 publication date (e.g. "2026-04-18" or full timestamp). */
  datePublished: string;
  /** ISO-8601 last-modified date. Falls back to `datePublished` when omitted. */
  dateModified?: string;
  /** Author persona. Rendered as nested Person with credentials + sameAs. */
  author: Author;
  /** Absolute URL for the featured image. */
  image: string;
  /** Canonical absolute URL for the article. */
  url: string;
  /** High-level topic / category (e.g. "Hail Damage"). */
  articleSection?: string;
  /** Unique DOM id for the injected <script>. Defaults to "article-schema". */
  id?: string;
}

/**
 * Emits a schema.org Article JSON-LD block for blog posts and guides.
 *
 * EEAT signals wired in here:
 *   - nested `Person` author with `jobTitle`, `knowsAbout`, and `sameAs`
 *   - `Organization` publisher pointing at the canonical Alpine Peak ID
 *   - `mainEntityOfPage` anchors the article to a concrete URL
 *
 * Pair with `BreadcrumbSchema` and the existing `BlogPosting` JSON-LD
 * already rendered inline on blog detail pages.
 */
export default function ArticleSchema({
  headline,
  description,
  datePublished,
  dateModified,
  author,
  image,
  url,
  articleSection,
  id = 'article-schema',
}: ArticleSchemaProps) {
  const baseUrl = 'https://alpinepeakroofing.com';

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline,
    ...(description ? { description } : {}),
    image,
    datePublished,
    dateModified: dateModified || datePublished,
    ...(articleSection ? { articleSection } : {}),
    author: {
      '@type': 'Person',
      name: author.name,
      jobTitle: author.title,
      description: author.bio,
      url: `${baseUrl}/authors/${author.slug}`,
      knowsAbout: author.expertise,
      ...(author.credentials.length > 0 ? { hasCredential: author.credentials } : {}),
      ...(author.sameAs.length > 0 ? { sameAs: author.sameAs } : {}),
    },
    publisher: {
      '@type': 'Organization',
      '@id': `${baseUrl}/#organization`,
      name: 'Alpine Peak Roofing',
      url: baseUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
  };

  return (
    <script
      id={id}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: jsonLdHtml(schema) }}
    />
  );
}
