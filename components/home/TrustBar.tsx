/*
 * TrustBar — homepage credential strip
 * Renders a horizontal row of trust signals directly below the hero.
 * Server component (no client interactivity needed).
 *
 * Badges are rendered as a semantic <ul>/<li> list for accessibility,
 * and wrap gracefully on mobile via flex-wrap.
 */
import { Shield, Award, Star, CheckCircle, BadgeCheck } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type TrustBadge = {
  icon: LucideIcon;
  label: string;
  sublabel: string;
  ariaLabel: string;
};

// TODO: Replace "CO Lic. #XXXXXX" with actual Colorado contractor license number once verified.
// TODO: Replace "4.9 stars (250+ reviews)" with live aggregate rating from Google / BBB once connected.
const badges: TrustBadge[] = [
  {
    icon: Shield,
    label: "Licensed",
    sublabel: "CO Lic. #XXXXXX",
    ariaLabel: "Licensed Colorado roofing contractor, license number pending verification",
  },
  {
    icon: Award,
    label: "BBB A+",
    sublabel: "Accredited Business",
    ariaLabel: "Better Business Bureau A+ accredited business",
  },
  {
    icon: BadgeCheck,
    label: "GAF Master Elite",
    sublabel: "Certified Installer",
    ariaLabel: "GAF Master Elite certified roofing contractor",
  },
  {
    icon: Star,
    label: "4.9 Stars",
    sublabel: "250+ Reviews",
    ariaLabel: "4.9 out of 5 stars based on 250 or more customer reviews",
  },
  {
    icon: CheckCircle,
    label: "Fully Insured",
    sublabel: "Liability & Workers' Comp",
    ariaLabel: "Fully insured with general liability and workers compensation coverage",
  },
];

export default function TrustBar() {
  return (
    <section
      className="bg-navy-dark border-y border-white/10 py-5 md:py-6 relative z-10"
      aria-label="Credentials and certifications"
    >
      <div className="container">
        <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-5 md:gap-x-10 lg:gap-x-14">
          {badges.map((badge) => {
            const Icon = badge.icon;
            return (
              <li
                key={badge.label}
                className="flex items-center gap-3"
                aria-label={badge.ariaLabel}
              >
                <span
                  className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-gold/10 border border-gold/30"
                  aria-hidden="true"
                >
                  <Icon size={18} className="text-gold" strokeWidth={2} />
                </span>
                <span className="flex flex-col leading-tight">
                  <span
                    className="text-sm font-semibold text-white"
                    style={{ fontFamily: "var(--font-source-sans), system-ui, sans-serif" }}
                  >
                    {badge.label}
                  </span>
                  <span
                    className="text-[11px] uppercase tracking-[0.12em] text-white/50"
                    style={{ fontFamily: "var(--font-source-sans), system-ui, sans-serif" }}
                  >
                    {badge.sublabel}
                  </span>
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
