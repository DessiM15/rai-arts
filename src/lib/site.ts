export const SITE = {
  name: "Rai Arts",
  tagline: "Your Art. Your Business.",
  description:
    "Rai Arts equips aspiring dancers with the business knowledge and skills to navigate a successful, sustainable career in dance — delivered as workshops for college and university dance programs.",
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
  { label: "About", href: "/about" },
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
  { label: "Shop", href: "/shop" },
  { label: "Get in Touch", href: "/contact" },
];
