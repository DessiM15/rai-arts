/**
 * All site copy lives here so Kira can edit words without touching layout.
 *
 * Anything marked DRAFT is written in the brand voice as a stand-in and is
 * waiting on her real copy — search "DRAFT" to find every one of them.
 */

/* ─────────────────────────────────────────────────────────────
   The framework
   ───────────────────────────────────────────────────────────── */

export type Pillar = {
  n: string;
  title: string;
  /** The guiding question, as it appears on the framework graphic. */
  question: string;
  /** One-line opener. */
  lead: string;
  /** The rest of the pillar, in order. */
  body: string[];
  /** The closing thought, set apart from the body. */
  close: string;
  areas: string[];
};

export const PILLARS: Pillar[] = [
  {
    n: "01",
    title: "Career Foundations",
    question: "Am I ready to enter the field with a clear plan?",
    lead: "Career Foundations is about building a sense of direction as you transition from training into professional life.",
    body: [
      "This pillar explores career planning, professional identity, goal-setting, positioning, and navigating the transition from student to working artist.",
    ],
    close:
      "Dancers begin to consider what they want their career to look like, what they bring to the field, and how to communicate that clearly.",
    areas: [
      "Career planning",
      "Professional identity",
      "Goal-setting",
      "Career positioning",
      "Post-graduate transition",
    ],
  },
  {
    n: "02",
    title: "Business Readiness",
    question: "Am I ready to create opportunities for myself?",
    lead: "Business Readiness focuses on the systems and knowledge behind the work.",
    body: [
      "This pillar introduces dancers to entrepreneurship, income generation, contracts, negotiation, and the business structures that shape an artistic career.",
    ],
    close:
      "The goal is to help dancers understand that they can participate in creating opportunities, not simply wait for them.",
    areas: [
      "Entrepreneurship",
      "Income generation",
      "Contracts",
      "Negotiation",
      "Business structures",
      "Opportunity creation",
    ],
  },
  {
    n: "03",
    title: "Financial Readiness",
    question: "Am I ready to manage money as a working artist?",
    lead: "Financial Readiness addresses the realities of earning an income in the arts.",
    body: [
      "This pillar focuses on budgeting, taxes, compensation, financial decision-making, and managing the realities of freelance and variable income.",
    ],
    close:
      "Dancers learn to approach money as an essential part of their professional lives, not something separate from their artistry.",
    areas: [
      "Budgeting",
      "Taxes",
      "Compensation",
      "Negotiation",
      "Freelance income",
      "Financial decision-making",
    ],
  },
  {
    n: "04",
    title: "Professional Readiness",
    question: "Am I ready to be someone people want to hire?",
    lead: "Professional Readiness focuses on how dancers navigate relationships, expectations, and difficult moments in professional environments.",
    body: [
      "This pillar explores communication, boundaries, conflict, self-advocacy, workplace dynamics, and professional decision-making.",
    ],
    close:
      "Because being a valuable professional isn't only about what you can do. It's also about how you communicate, collaborate, and navigate the people and environments around you.",
    areas: [
      "Communication",
      "Conflict navigation",
      "Boundaries",
      "Self-advocacy",
      "Workplace dynamics",
      "Professional relationships",
    ],
  },
  {
    n: "05",
    title: "Longevity Readiness",
    question: "Am I ready to sustain this for the long haul?",
    lead: "Longevity Readiness looks at what happens after you've entered the field.",
    body: [
      "This pillar explores burnout, resilience, evolving definitions of success, career transitions, identity beyond performance, and building a professional life that can adapt over time.",
    ],
    close:
      "The goal isn't to stay exactly the same throughout your career. It's to develop the awareness and flexibility to grow with it.",
    areas: [
      "Burnout prevention",
      "Resilience",
      "Career evolution",
      "Redefining success",
      "Identity",
      "Legacy",
      "Careers beyond performance",
    ],
  },
];

export const FRAMEWORK = {
  intro:
    "The Rai Arts Career Readiness Framework™ is made up of five pillars centered around a guiding question, which is explored and answered through a dedicated workshop. Rather than defining readiness by one outcome, the framework looks at the different pieces that allow an artist to enter the field, create opportunities, navigate professional life, and keep going.",
  education: {
    heading: "From Framework to Education",
    lead: "The framework is the foundation of Rai Arts.",
    paragraphs: [
      "The Literacy Series makes individual areas of the framework accessible to dancers through low-cost online workshops.",
      "Rai Arts Consulting allows schools, studios, companies, and institutions to select the pillars and topics most relevant to their communities and build customized programming around them.",
    ],
  },
};

/* ─────────────────────────────────────────────────────────────
   Our story (About)
   ───────────────────────────────────────────────────────────── */

export type StoryBlock =
  | { kind: "p"; text: string }
  | { kind: "questions"; items: string[] }
  | { kind: "pull"; text: string };

export type StoryChapter = {
  n: string;
  title: string;
  blocks: StoryBlock[];
};

export const STORY = {
  intro:
    "Rai Arts was founded by Kira Rai Daniel, a dancer, arts administrator, and entrepreneur who saw a gap in the way dancers were being prepared for professional life.",
  chapters: [
    {
      n: "01",
      title: "The Problem",
      blocks: [
        {
          kind: "p",
          text: "Dance education does an incredible job of preparing dancers for the craft, but what happens when the performance ends?",
        },
        {
          kind: "questions",
          items: [
            "Who teaches dancers how to understand a contract?",
            "How to manage freelance income?",
            "How to navigate professional relationships?",
            "How to create opportunities?",
            "How to advocate for themselves?",
            "How to build a career that can evolve as their lives do?",
          ],
        },
        { kind: "p", text: "For many dancers, that education is limited." },
        {
          kind: "p",
          text: "Unless they pursue a graduate degree, invest in expensive professional development, or learn through experience, dancers are often left to figure out the business and professional realities of an arts career on their own.",
        },
        { kind: "pull", text: "Rai Arts believes that shouldn't be the standard." },
      ],
    },
    {
      n: "02",
      title: "A different approach to career preparation",
      blocks: [
        {
          kind: "p",
          text: "Rai Arts believes that being career-ready means more than being artistically prepared.",
        },
        {
          kind: "p",
          text: "The Rai Arts Career Readiness Framework™ was created to provide the foundation for our educational work, bringing together the practical knowledge, professional skills, and career strategies that dancers need beyond their artistic training.",
        },
        {
          kind: "p",
          text: "Our approach recognizes that a dance career doesn't exist in isolation. It intersects with money, work, relationships, business, communication, decision-making, and the life you are building outside of the studio.",
        },
        {
          kind: "p",
          text: "That's why our work isn't about teaching dancers to become something other than dancers. It's about giving dancers the tools to navigate the world as professionals.",
        },
        {
          kind: "p",
          text: "We believe dancers should have access to practical education that helps them make informed decisions, advocate for themselves, and create careers that are aligned with the lives they want to live.",
        },
        {
          kind: "pull",
          text: "Because supporting the artist means supporting the person behind the artistry.",
        },
      ],
    },
    {
      n: "03",
      title: "Why Rai Arts?",
      blocks: [
        {
          kind: "p",
          text: "We don't believe dancers should have to choose between being artists and building sustainable lives.",
        },
        {
          kind: "p",
          text: "A successful dance career can look many different ways. It can include performing, teaching, choreographing, entrepreneurship, arts administration, creative work, or several paths at once.",
        },
        {
          kind: "pull",
          text: "What matters is that dancers have the knowledge to make informed decisions about their careers and the freedom to define success for themselves.",
        },
      ],
    },
  ] satisfies StoryChapter[],
};

/* ─────────────────────────────────────────────────────────────
   Services
   ───────────────────────────────────────────────────────────── */

export const LITERACY = {
  intro:
    "For many dancers, formal education ends when they graduate. They leave school with years of artistic training, but often little education on the knowledge and skills required to navigate the career that comes after it. The Literacy Series was created to change that.",
  paragraphs: [
    "Drawing from the Rai Arts Career Readiness Framework™, The Literacy Series provides accessible, low-cost online education designed to help dancers develop the knowledge they need to navigate their careers, and their lives, beyond the studio.",
    "These workshops aren't about teaching dancers to become better artists. They're about teaching dancers how to support the artist beyond artistic readiness.",
  ],
  /** "It means…" — the eight skills, in order. */
  skills: [
    "Knowing how to manage your money.",
    "Understanding a contract before you sign it.",
    "Knowing how to advocate for yourself.",
    "Building professional relationships.",
    "Understanding how to communicate your value.",
    "Knowing what opportunities are actually right for you.",
    "Understanding the business behind your work.",
    "Building skills that allow you to create stability, flexibility, and longevity.",
  ],
  close: [
    "The goal isn't to take dancers away from dance.",
    "It's to give them more tools to stay in it.",
  ],
};

export const CONSULTING = {
  intro:
    "Rai Arts partners with individuals, companies, schools, studios, and universities to provide education on the practical skills and knowledge needed to build a career in the arts.",
  paragraphs: [
    "Our programming is built from the Rai Arts Career Readiness Framework™ and can be adapted to the needs of your dancers, students, artists, or community.",
  ],
  flexible: {
    heading: "Flexible by design.",
    body: "There is no one-size-fits-all approach to career preparation.",
  },
  formats: [
    {
      title: "A single workshop",
      body: "One focused session on a specific career-readiness topic.",
    },
    {
      title: "A multi-session program",
      body: "Several workshops delivered over multiple sessions or weeks.",
    },
    {
      title: "A multi-day intensive",
      body: "An immersive program covering multiple areas of career readiness.",
    },
    {
      title: "An ongoing workshop series",
      body: "Monthly or recurring programming designed to support professional development over time.",
    },
    {
      title: "Custom programming",
      body: "Have a specific need or topic in mind? Workshops can be developed or adapted upon request.",
    },
  ],
  build: {
    heading: "Build your program.",
    body: "Select the areas of the Rai Arts Career Readiness Framework™ that are most relevant to your community.",
    topics: [
      "Financial Literacy",
      "Networking",
      "Understanding Contracts",
      "Career Planning",
      "Starting Your Own Dance Company",
      "Identity Outside of Dance",
      "Workplace Readiness",
      "Self-Advocacy",
      "Income & Career Sustainability",
    ],
    more: "And more",
  },
  close:
    "Tell us what you're looking for, who you're serving, and what you want your dancers or artists to walk away knowing. We'll work with you to determine the right format, topics, and scope for your program.",
};

/* ─────────────────────────────────────────────────────────────
   Learn
   ───────────────────────────────────────────────────────────── */

export const LEARN = {
  ebook: {
    title: "Building a Sustainable Career in Dance",
    body: "The ebook sits alongside the workshops: the frameworks, worksheets, and plain-language explanations dancers ask for most, in one place you can keep and work through at your own pace.",
    cta: "Get the ebook",
    href: "https://shop.beacons.ai/thisisraiarts/b1977b1b-f277-463d-b5a1-79d9ee47f407",
  },
  newsletter: {
    title: "The newsletter",
    body: "Writing on the business of a dance career, straight to your inbox. Practical, specific, and short enough to actually read.",
    cta: "Subscribe",
    /**
     * MailerLite embedded form.
     *
     * Paste the form's POST URL here (MailerLite → Forms → Embedded → the
     * form's Embed tab → look for the `action="https://assets.mailerlite.com/jsonp/…/subscribe"`
     * line). Until it's filled in, sign-ups are collected by the site's own
     * Netlify form named "newsletter" instead, so nothing is lost.
     */
    action: "" as string,
  },
  substack: {
    title: "Substack",
    body: "Longer, more personal writing from Kira on dance, money, identity, and the career around the art.",
    cta: "Read on Substack",
    href: "https://kiraraidaniel.substack.com",
    /**
     * Excerpts and dates were taken from each post on 2026-09-03. Edit freely.
     */
    articles: [
      {
        n: "01",
        title: "Why Does “Supplementing Income” Mean You’re a Struggling Artist?",
        excerpt:
          "Whether you’re an artist or not, you’ve probably heard some version of this: art isn’t a real career. Or, if you have to supplement your income, that means you’re not making enough.",
        date: "August 9, 2026",
        href: "https://substack.com/@thisisraiarts/note/p-210474269?r=8rd1x1&utm_source=notes-share-action&utm_medium=web",
      },
      {
        n: "02",
        title: "Does Anyone Else Have a Fear of Being Seen?",
        excerpt:
          "For the past two years, I’ve been less and less active on my main Instagram account. Purposely burying myself in a rabbit hole, because when someone liked my story or commented on my post, I felt exposed.",
        date: "August 10, 2026",
        href: "https://substack.com/@thisisraiarts/note/p-210487327?r=8rd1x1&utm_source=notes-share-action&utm_medium=web",
      },
      {
        n: "03",
        title: "I gave up a $100,000 scholarship because of dance",
        excerpt:
          "I know what you’re thinking: “This has got to be clickbait, right? There’s no way she gave up $100,000 for something as silly as dance.” As much as I wish I could tell you the title was just a hook, that’s not the case.",
        date: "August 22, 2026",
        href: "https://substack.com/@thisisraiarts/note/p-212235148?r=8rd1x1&utm_source=notes-share-action&utm_medium=web",
      },
    ],
  },
  /** Coming later. Shown as a quiet note, not a section. */
  toolkit: {
    label: "Eventually",
    text: "A free resource tool kit. Join the newsletter and you'll hear when it lands.",
  },
};
