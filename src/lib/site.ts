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
   * thisisraiarts.com is Kira's domain, not yet pointed at the deploy. Everything
   * canonical — sitemap, OG tags, JSON-LD — reads from here.
   */
  url: "https://thisisraiarts.com",
  email: "info@thisisraiarts.com",
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
        label: "Our Story",
        href: "/about",
        blurb: "Why Rai Arts exists, and what it believes.",
      },
    ],
  },
  {
    label: "Services",
    href: "/services",
    children: [
      {
        label: "Literacy Series",
        href: "/services/literacy-series",
        blurb: "Low-cost online workshops for dancers.",
      },
      {
        label: "Consulting",
        href: "/services/consulting",
        blurb: "Programming for schools, studios, companies, and universities.",
      },
    ],
  },
  { label: "Framework", href: "/framework" },
  { label: "Learn", href: "/learn" },
  { label: "Contact", href: "/contact" },
];
