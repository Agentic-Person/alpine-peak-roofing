import { jsonLdHtml } from './jsonLd';

export interface BreadcrumbSchemaItem {
  name: string;
  /** Absolute URL for the breadcrumb entry (e.g. "https://alpinepeakroofing.com/blog"). */
  url: string;
}

interface BreadcrumbSchemaProps {
  items: BreadcrumbSchemaItem[];
  /** Optional unique id for the injected <script>. Defaults to "breadcrumb-schema". */
  id?: string;
}

/**
 * Emits a schema.org BreadcrumbList JSON-LD block for the current page.
 *
 * Every `item.url` MUST be an absolute URL so Google can resolve the breadcrumb
 * trail when the page is surfaced from the SERP.
 */
export default function BreadcrumbSchema({ items, id = 'breadcrumb-schema' }: BreadcrumbSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      id={id}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: jsonLdHtml(schema) }}
    />
  );
}
