/**
 * Author directory for Alpine Peak Roofing blog content.
 *
 * Authors are the visible expertise signal for EEAT — every published
 * article should be attributed to a specific person with real-world
 * roofing credentials, not just the Organization.
 *
 * TODO(images): Replace placeholder `avatar` paths with real CDN photos.
 * TODO(sameAs): Populate `sameAs` with verified LinkedIn / GAF
 *   Contractor / industry association profile URLs when available.
 *   Do NOT fabricate — leave the array empty until real URLs exist.
 */

export interface Author {
  /** URL slug — stable identifier used in /authors/[slug] and as lookup key. */
  slug: string;
  /** Display name, e.g. "Mike Alpine". */
  name: string;
  /** Job title / role, e.g. "Senior Roofing Consultant". */
  title: string;
  /** 1–2 paragraph bio rendered in AuthorBio and on /authors/[slug]. */
  bio: string;
  /**
   * Avatar image. Can be a `/public` path or a full CDN URL.
   * Optional — AuthorBio will fall back to initials when absent.
   */
  avatar?: string;
  /** Certifications and credentials (e.g. "GAF Master Elite Certified"). */
  credentials: string[];
  /**
   * External profile URLs (LinkedIn, industry directories, etc.) used in
   * schema.org `sameAs`. Leave empty unless the URL has been verified.
   */
  sameAs: string[];
  /** Topic / specialty areas this author covers. */
  expertise: string[];
}

export const authors: Record<string, Author> = {
  "mike-alpine": {
    slug: "mike-alpine",
    name: "Mike Alpine",
    title: "Founder & Master Roofer",
    bio:
      "Mike Alpine founded Alpine Peak Roofing in 1989 after more than a decade climbing roofs across Colorado's Front Range and high country. Over 35+ years in the industry he has personally inspected, installed, or overseen more than 4,000 residential and commercial roof systems from Denver neighborhoods to 10,000-foot mountain homes in Aspen, Vail, and Telluride. " +
      "A third-generation Coloradan, Mike specializes in high-altitude metal systems, hail-resilient shingle assemblies, and insurance-claim advocacy for homeowners hit by Front Range hailstorms. He trains every Alpine Peak crew lead personally and still meets insurance adjusters on-site for complex claims.",
    // TODO(images): Replace with real headshot URL when available.
    avatar: undefined,
    credentials: [
      "GAF Master Elite Certified",
      "Haag Certified Inspector (Residential & Commercial)",
      "Licensed Colorado Roofing Contractor",
      "35+ Years Colorado Roofing Experience",
    ],
    // TODO(sameAs): Populate with verified LinkedIn / GAF Contractor profile URLs.
    sameAs: [],
    expertise: [
      "Hail Damage & Insurance Claims",
      "Residential Roof Replacement",
      "High-Altitude & Mountain Roofing",
      "Impact-Resistant (Class 4) Systems",
    ],
  },
  "sarah-chen": {
    slug: "sarah-chen",
    name: "Sarah Chen",
    title: "Lead Roofing Consultant",
    bio:
      "Sarah Chen leads Alpine Peak's residential consulting team, guiding homeowners through material selection, insurance claim strategy, and project planning from first inspection to final walkthrough. With 15+ years in Colorado roofing and a background in building science, she is the person most Alpine Peak customers talk to when they are deciding between asphalt, metal, or synthetic slate. " +
      "Sarah is a Haag Certified Inspector and a CertainTeed ShingleMaster, and she specializes in translating storm damage documentation and Xactimate line items into plain English for homeowners. She has personally guided more than 600 hail-claim rebuilds across the Denver metro.",
    // TODO(images): Replace with real headshot URL when available.
    avatar: undefined,
    credentials: [
      "Haag Certified Inspector (Residential)",
      "CertainTeed ShingleMaster",
      "Xactimate Certified Estimator",
      "15+ Years Colorado Roofing Experience",
    ],
    // TODO(sameAs): Populate with verified LinkedIn / industry profile URLs.
    sameAs: [],
    expertise: [
      "Insurance Claim Documentation",
      "Shingle & Material Selection",
      "Homeowner Education",
      "Storm Damage Assessment",
    ],
  },
  "david-torres": {
    slug: "david-torres",
    name: "David Torres",
    title: "Commercial Projects Director",
    bio:
      "David Torres directs Alpine Peak's commercial division, overseeing TPO, EPDM, modified bitumen, and standing-seam metal installations for property managers, HOAs, and facilities teams across the Denver metro and Western Slope. He brings 20+ years of low-slope and industrial roofing experience, including warehouse re-roofs, multi-family portfolios, and LEED-certified commercial builds. " +
      "David is a Registered Roof Observer (RRO) through RCI (now IIBEC) and leads Alpine Peak's preventive maintenance program, which keeps more than 2.3 million square feet of Colorado commercial roof area under active inspection contracts.",
    // TODO(images): Replace with real headshot URL when available.
    avatar: undefined,
    credentials: [
      "IIBEC Registered Roof Observer (RRO)",
      "GAF Certified Commercial Contractor",
      "Carlisle SynTec Authorized Installer",
      "20+ Years Commercial Roofing Experience",
    ],
    // TODO(sameAs): Populate with verified LinkedIn / IIBEC profile URLs.
    sameAs: [],
    expertise: [
      "Commercial Low-Slope Roofing",
      "TPO & EPDM Membrane Systems",
      "Preventive Maintenance Programs",
      "Multi-Family & HOA Projects",
    ],
  },
};

/** Stable list of authors in directory order, useful for iteration. */
export const authorList: Author[] = Object.values(authors);

/** Look up an author by slug. Returns null when no match. */
export function getAuthor(slug: string): Author | null {
  return authors[slug] ?? null;
}

/**
 * Default author used when a blog post has no `author` field yet.
 * Falls back to the first entry in the directory.
 *
 * TODO(blog-data): Once `blog_posts` carries an `author_slug` column,
 * prefer that over this default.
 */
export function getDefaultAuthor(): Author {
  return authorList[0];
}
