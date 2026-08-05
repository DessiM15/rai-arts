/**
 * All site copy lives here so Kira can edit words without touching layout.
 *
 * Anything marked DRAFT is written in the brand voice as a stand-in and is
 * waiting on her real copy — search "DRAFT" to find every one of them.
 */

export type Pillar = {
  n: string;
  title: string;
  question: string;
  body: string;
  covers: string[];
};

export const PILLARS: Pillar[] = [
  {
    n: "01",
    title: "Career Foundations",
    question: "Am I ready to enter the field with a clear plan?",
    body: "Career mapping, networking, and professional identity.",
    covers: [
      "Mapping a realistic first year after graduation",
      "Building a portfolio that reflects range, not just repertoire",
      "Networking without treating it as a performance",
      "Defining a professional identity beyond a résumé line",
    ],
  },
  {
    n: "02",
    title: "Business Readiness",
    question: "Am I ready to create opportunities for myself?",
    body: "Entrepreneurship, starting a company, contracts, and diversifying income.",
    covers: [
      "Structuring a company, a collective, or a freelance practice",
      "Branding that reads as professional to presenters and schools",
      "Building more than one income stream on purpose",
      "Pricing and packaging your own work",
    ],
  },
  {
    n: "03",
    title: "Financial Readiness",
    question: "Am I ready to manage money as a working artist?",
    body: "Budgeting, freelance finances, taxes, and negotiating pay.",
    covers: [
      "Budgeting against irregular, seasonal income",
      "Taxes and deductions for 1099 performers",
      "Reading a contract before signing it",
      "Negotiating pay without apologising for it",
    ],
  },
  {
    n: "04",
    title: "Professional Readiness",
    question: "Am I ready to be someone people want to hire and work with?",
    body: "Communication, time management, etiquette, and collaboration.",
    covers: [
      "Studio and rehearsal etiquette that gets you re-hired",
      "Communicating with directors, agents, and collaborators",
      "Managing time across overlapping contracts",
      "Handling feedback, conflict, and repair",
    ],
  },
  {
    n: "05",
    title: "Longevity Readiness",
    question: "Am I ready to sustain this for the long haul?",
    body: "Preventing burnout, resilience, redefining success, and legacy.",
    covers: [
      "Recognising burnout early enough to act on it",
      "Planning around injury instead of pretending it won't happen",
      "Redefining success as the career changes shape",
      "Thinking about legacy, teaching, and what comes next",
    ],
  },
];

export type Workshop = {
  slug: string;
  flag: string;
  title: string;
  subtitle: string;
  summary: string;
  outcomes: string[];
  agenda: string[];
  length: string;
  audience: string;
  format: string;
};

export const FLAGSHIP: Workshop = {
  slug: "more-than-a-dancer",
  flag: "Flagship workshop",
  title: "More Than a Dancer",
  subtitle: "Careers and Income Streams in the Arts",
  summary:
    "A look at arts administration and the supplemental income paths that let dancers stay in the arts, build financial stability, and diversify what a career can look like. This session reframes “dance career” from a single job title into a portfolio of skills that can be combined and recombined, on stage and off.",
  outcomes: [
    "Name at least four categories of income streams open to trained dancers, beyond performance",
    "Map two or three of their own transferable skills to specific roles and opportunities",
    "Leave with one concrete next step to explore an income stream that interests them",
  ],
  agenda: [
    "The one-job myth: why most students picture the same few roles",
    "Four income buckets: performance, teaching, arts administration, and adjacent creative work",
    "Income Stream Map: students map their own skills to real roles",
    "Share out and next steps: one concrete move each",
  ],
  length: "60–90 min",
  audience: "College / university dance students",
  format: "Guest lecture or class visit, 10–30+",
};

/** DRAFT — placeholder until Kira confirms the online offering. */
export const ONLINE_DRAFT = {
  heading: "Rai Arts, online.",
  body: "The Career Readiness Framework is being built into self-paced modules and live online sessions, so dancers can work through it whether or not their program brings Rai Arts in. Join the list and you'll hear first when enrolment opens.",
  bullets: [
    "Self-paced modules following the five pillars",
    "Live sessions with space for questions",
    "Worksheets and templates you keep",
  ],
};

export const LEARN = {
  podcast: {
    title: "The Rai Arts podcast",
    body: "Conversations on building a life in dance: what the work actually pays, what nobody explains in training, and how working artists put a career together.",
    cta: "Watch on YouTube",
    /** TODO: real channel URL from Kira. */
    href: "https://www.youtube.com/",
  },
  newsletter: {
    title: "The newsletter",
    body: "Writing on the business of a dance career, delivered free on Substack. Practical, specific, and short enough to actually read.",
    cta: "Read on Substack",
    /** TODO: real Substack URL from Kira. */
    href: "https://substack.com/",
  },
};

export const GUIDE = {
  title: "Building a Sustainable Career in Dance",
  price: "$18",
  format: "PDF guide, instant download",
  body: "The career guide that sits alongside the workshops: the frameworks, worksheets, and plain-language explanations dancers ask for most, in one place you can keep and work through at your own pace.",
  includes: [
    "The five pillars of the Career Readiness Framework, explained",
    "An income stream map you can fill in for yourself",
    "Budgeting worksheets built for irregular freelance income",
    "Contract red flags and questions to ask before signing",
    "A first-year-after-graduation planning template",
  ],
  /**
   * Paste the Stripe Payment Link here and the buy button goes live —
   * no API keys, no backend, no code change beyond this string.
   * Create it at dashboard.stripe.com → Payment Links.
   */
  stripeLink: "" as string,
};
