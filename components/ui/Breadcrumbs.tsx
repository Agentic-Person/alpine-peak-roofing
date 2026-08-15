import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export interface BreadcrumbItem {
  name: string;
  /** Relative href for Next.js Link (e.g. "/blog"). Omit on the current page. */
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  /** Optional extra classes applied to the outer <nav>. */
  className?: string;
}

/**
 * Visible breadcrumb UI — pairs with `BreadcrumbSchema` for AEO/SEO.
 *
 * - Accessible: `<nav aria-label="Breadcrumb">` wrapping an `<ol>`
 * - Design tokens: navy/gold palette matching existing page headers
 * - Separator: ChevronRight from lucide-react
 * - The final item is rendered as plain text with `aria-current="page"`
 */
export default function Breadcrumbs({ items, className = '' }: BreadcrumbsProps) {
  if (items.length === 0) return null;

  return (
    <nav
      aria-label="Breadcrumb"
      className={`text-sm ${className}`}
      style={{ fontFamily: "var(--font-source-sans), system-ui, sans-serif" }}
    >
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={`${item.name}-${index}`} className="flex items-center gap-2">
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="text-[#C9A84C] hover:text-[#d4b65c] transition-colors uppercase tracking-wider font-semibold"
                >
                  {item.name}
                </Link>
              ) : (
                <span
                  aria-current={isLast ? 'page' : undefined}
                  className="text-white/60 uppercase tracking-wider font-semibold line-clamp-1"
                >
                  {item.name}
                </span>
              )}
              {!isLast && (
                <ChevronRight
                  size={14}
                  aria-hidden="true"
                  className="text-white/30 flex-shrink-0"
                />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
