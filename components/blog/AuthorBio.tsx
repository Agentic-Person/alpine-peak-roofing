import Link from 'next/link';
import Image from 'next/image';
import type { Author } from '@/lib/authors';

interface AuthorBioProps {
  author: Author;
  /** Optional heading above the card. Set to `null` to suppress. */
  heading?: string | null;
  /** Extra classes applied to the outer wrapper. */
  className?: string;
}

/** Pull up to two initials from a display name ("Mike Alpine" -> "MA"). */
function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '?';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

/**
 * Visible author card for blog posts. Shows avatar (or initials fallback),
 * name, title, bio, and credentials as badges.
 *
 * Accessibility:
 *   - Semantic <aside> with a scoped <h2>/<h3>
 *   - Avatar has alt text describing the person
 *   - Credentials rendered as a <ul> of badges
 */
export default function AuthorBio({
  author,
  heading = 'About the Author',
  className = '',
}: AuthorBioProps) {
  const initials = getInitials(author.name);

  return (
    <aside
      className={`border-t border-white/10 mt-12 pt-8 ${className}`}
      aria-labelledby={`author-bio-${author.slug}-heading`}
    >
      {heading !== null && (
        <p
          id={`author-bio-${author.slug}-heading`}
          className="text-white/50 text-xs font-semibold uppercase tracking-widest mb-4"
          style={{ fontFamily: "var(--font-source-sans), system-ui, sans-serif" }}
        >
          {heading}
        </p>
      )}

      <div className="flex flex-col sm:flex-row gap-6 bg-white/5 border border-white/10 p-6 md:p-8">
        {/* Avatar */}
        <div className="flex-shrink-0">
          {author.avatar ? (
            <div className="relative w-20 h-20 md:w-24 md:h-24 overflow-hidden rounded-full border-2 border-gold/40">
              <Image
                src={author.avatar}
                alt={`Portrait of ${author.name}, ${author.title} at Alpine Peak Roofing`}
                fill
                sizes="96px"
                className="object-cover"
              />
            </div>
          ) : (
            <div
              className="w-20 h-20 md:w-24 md:h-24 flex items-center justify-center rounded-full border-2 border-gold/40 bg-navy-dark text-gold text-xl md:text-2xl font-bold"
              aria-hidden="true"
              style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
            >
              {initials}
            </div>
          )}
        </div>

        {/* Text content */}
        <div className="flex-1 min-w-0">
          <h3
            className="text-xl md:text-2xl font-bold text-white mb-1"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
          >
            <Link
              href={`/authors/${author.slug}`}
              className="hover:text-gold transition-colors"
            >
              {author.name}
            </Link>
          </h3>

          <p
            className="text-gold text-sm font-semibold uppercase tracking-wider mb-4"
            style={{ fontFamily: "var(--font-source-sans), system-ui, sans-serif" }}
          >
            {author.title}
          </p>

          <p
            className="text-white/70 leading-relaxed mb-4"
            style={{ fontFamily: "var(--font-source-sans), system-ui, sans-serif" }}
          >
            {author.bio}
          </p>

          {author.credentials.length > 0 && (
            <ul className="flex flex-wrap gap-2">
              {author.credentials.map((credential) => (
                <li
                  key={credential}
                  className="inline-flex items-center px-3 py-1 bg-gold/10 border border-gold/30 text-gold text-xs font-semibold"
                  style={{ fontFamily: "var(--font-source-sans), system-ui, sans-serif" }}
                >
                  {credential}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </aside>
  );
}
