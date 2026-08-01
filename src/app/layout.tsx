import type { Metadata } from "next";
import "./globals.css";
import { SITE } from "@/lib/site";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Opening from "@/components/Opening";
import SmoothScroll from "@/components/SmoothScroll";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — Career readiness for dancers`,
    template: `%s — ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  keywords: [
    "career readiness for dancers",
    "dance career workshop",
    "business of dance curriculum",
    "college dance program workshop",
    "dance career guest lecture",
    "income streams for dancers",
    "arts administration careers",
    "dance entrepreneurship",
  ],
  authors: [{ name: SITE.founder }],
  creator: SITE.founder,
  publisher: SITE.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: SITE.name,
    locale: SITE.locale,
    url: SITE.url,
    title: `${SITE.name} — Career readiness for dancers`,
    description: SITE.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} — Career readiness for dancers`,
    description: SITE.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  category: "education",
};

const ORG_JSONLD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE.name,
  url: SITE.url,
  email: SITE.email,
  slogan: SITE.tagline,
  description: SITE.description,
  founder: { "@type": "Person", name: SITE.founder },
  areaServed: "US",
  knowsAbout: [
    "Dance career development",
    "Arts administration",
    "Freelance finances for artists",
    "Arts entrepreneurship",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <head>
        {/* Marks the document as scripted before first paint. Every reveal's
            hidden state is gated on this class, so the server HTML stays fully
            legible if JavaScript never runs — and there is no flash of visible
            content for everyone else. */}
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js')",
          }}
        />
        {/* Used above the fold on every route — worth the early fetch. */}
        <link
          rel="preload"
          href="/fonts/fraunces.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/switzer-400.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <meta name="theme-color" content="#2e4425" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ORG_JSONLD) }}
        />
      </head>
      <body className="flex min-h-full flex-col antialiased">
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <SmoothScroll />
        <Opening />
        <Nav />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
