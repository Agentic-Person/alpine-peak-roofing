import Script from 'next/script';

export interface ImageObjectSchemaProps {
  /** Canonical URL of the image (CDN or local). */
  url: string;
  /** Descriptive, keyword-rich caption — reused as both `caption` and `description`. */
  caption: string;
  /** Short human-readable title/name for the image. If omitted, caption is used. */
  name?: string;
  /** Geographic content location (e.g., "Denver, Colorado" or "Aspen, Colorado"). */
  contentLocation?: string;
  /** Image width in pixels, if known. */
  width?: number;
  /** Image height in pixels, if known. */
  height?: number;
  /** Optional stable id suffix — helps when rendering multiple schemas on a page. */
  idSuffix?: string;
  /** Optional creator/author name — defaults to Alpine Peak Roofing organization. */
  creator?: string;
  /** Optional license URL. */
  license?: string;
  /** Optional ISO-8601 date the image was uploaded/published. */
  uploadDate?: string;
}

/**
 * Reusable JSON-LD ImageObject schema.
 *
 * Emits a schema.org ImageObject structured-data block for a single image,
 * used to surface rich results in Google Images and to reinforce image SEO
 * alongside the `image-sitemap.xml` feed.
 *
 * See: https://schema.org/ImageObject
 */
export default function ImageObjectSchema({
  url,
  caption,
  name,
  contentLocation,
  width,
  height,
  idSuffix,
  creator,
  license,
  uploadDate,
}: ImageObjectSchemaProps) {
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'ImageObject',
    contentUrl: url,
    url,
    name: name ?? caption,
    caption,
    description: caption,
  };

  if (width) schema.width = width;
  if (height) schema.height = height;
  if (uploadDate) schema.uploadDate = uploadDate;

  if (contentLocation) {
    const [locality, region] = contentLocation.split(',').map((s) => s.trim());
    schema.contentLocation = {
      '@type': 'Place',
      name: contentLocation,
      ...(locality && region
        ? {
            address: {
              '@type': 'PostalAddress',
              addressLocality: locality,
              addressRegion: region,
              addressCountry: 'US',
            },
          }
        : {}),
    };
  }

  schema.creator = {
    '@type': 'Organization',
    '@id': 'https://alpinepeakroofing.com/#organization',
    name: creator ?? 'Alpine Peak Roofing',
    url: 'https://alpinepeakroofing.com',
  };

  schema.copyrightHolder = {
    '@id': 'https://alpinepeakroofing.com/#organization',
  };

  if (license) {
    schema.license = license;
    schema.acquireLicensePage = license;
  }

  // Deterministic script id so React/Next can dedupe across renders.
  const safeSuffix = idSuffix ?? url.replace(/[^a-z0-9]+/gi, '-').slice(-48);
  const scriptId = `image-object-schema-${safeSuffix}`;

  return (
    <Script
      id={scriptId}
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
