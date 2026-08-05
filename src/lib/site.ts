export const SITE = {
  name: "Rai Arts",
  tagline: "Your Art. Your Business.",
  /** Shown on the page. Kira's words, kept exactly. */
  intro:
    "Rai Arts equips dancers with the essential business knowledge and skills to navigate a successful, sustainable career in dance.",
  /**
   * Never rendered — this is the search description. It keeps "workshops for
   * college and university dance programs", the phrase departments actually
   * search for, which the shorter on-page line above drops.
   */
  description:
    "Rai Arts equips dancers with the essential business knowledge and skills to navigate a successful, sustainable career in dance, delivered as workshops for college and university dance programs.",
  /**
   * Update this once raiarts.com is pointed at the deploy. Everything
   * canonical — sitemap, OG tags, JSON-LD — reads from here.
   */
  url: "https://raiarts.com",
  email: "hello@raiarts.com",
  founder: "Kira Rai Daniel",
  locale: "en_US",
} as const;

export type NavItem = {
  label: string;
  href: string;
  children?: { label: string; href: string; blurb: string }[];
};

export const NAV: NavItem[] = [
  {
    label: "About",
    href: "/about",
    children: [
      {
        label: "The company",
        href: "/about",
        blurb: "What Rai Arts does, and the gap it exists to close.",
      },
      {
        label: "Founders",
        href: "/founders",
        blurb: "Kira Rai Daniel, and why she built the framework.",
      },
    ],
  },
  {
    label: "Workshops",
    href: "/workshops",
    children: [
      {
        label: "College",
        href: "/workshops/college",
        blurb: "Guest lectures and class visits for degree programs.",
      },
      {
        label: "Online",
        href: "/workshops/online",
        blurb: "Self-paced and live sessions, opening soon.",
      },
    ],
  },
  { label: "Framework", href: "/framework" },
  { label: "Learn", href: "/learn" },
  { label: "Ebooks", href: "/shop" },
  { label: "Get in Touch", href: "/contact" },
];
