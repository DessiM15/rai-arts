import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

const ROUTES: { path: string; priority: number; freq: "monthly" | "yearly" }[] = [
  { path: "/", priority: 1.0, freq: "monthly" },
  { path: "/framework", priority: 0.9, freq: "monthly" },
  { path: "/services", priority: 0.9, freq: "monthly" },
  { path: "/services/literacy-series", priority: 0.9, freq: "monthly" },
  { path: "/services/consulting", priority: 0.9, freq: "monthly" },
  { path: "/about", priority: 0.8, freq: "monthly" },
  { path: "/learn", priority: 0.7, freq: "monthly" },
  { path: "/contact", priority: 0.8, freq: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return ROUTES.map((r) => ({
    url: `${SITE.url}${r.path}`,
    lastModified: now,
    changeFrequency: r.freq,
    priority: r.priority,
  }));
}
