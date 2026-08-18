import type { MetadataRoute } from "next";
import { comparePairs } from "@/data/comparePairs";
import { guides } from "@/data/guides";
import { services } from "@/data/services";
import { getIndexableCategories, getIndexableGoals } from "@/lib/content";
import { SITE_URL } from "@/lib/seo";

const LAST_MODIFIED = new Date("2026-08-18");

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = [
    "/",
    "/services",
    "/compare",
    "/guides",
    "/about",
    "/editorial-policy",
    "/advertising-policy",
    "/privacy",
    // /contact is intentionally excluded — thin "in preparation" content, marked noindex.
  ];

  const dynamicPaths = [
    ...services.map((s) => `/services/${s.slug}`),
    ...getIndexableCategories().map((c) => `/categories/${c.slug}`),
    ...getIndexableGoals().map((g) => `/goals/${g.slug}`),
    ...comparePairs.map((c) => `/compare/${c.slug}`),
    ...guides.map((g) => `/guides/${g.slug}`),
  ];

  return [...staticPaths, ...dynamicPaths].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: LAST_MODIFIED,
  }));
}
