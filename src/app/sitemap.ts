import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://english.aptipass.com",
      lastModified: new Date(),
    },
  ];
}
