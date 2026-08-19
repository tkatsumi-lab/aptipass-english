import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Internal, auth-gated admin tool — never meant to be crawled.
      // Defense in depth on top of Basic Auth + noindex meta + sitemap exclusion.
      disallow: ["/admin"],
    },
    sitemap: "https://english.aptipass.com/sitemap.xml",
  };
}
