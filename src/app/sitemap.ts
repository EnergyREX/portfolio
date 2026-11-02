import type { MetadataRoute } from "next";
import { SITE_URL } from "@/constants/SITE";
import { EXPERIENCE_SLUGS } from "@/lib/experience";
import { getAllPosts } from "@/lib/posts";
import { getProjectHistorySlugs } from "@/lib/projects";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [posts, projectSlugs] = await Promise.all([getAllPosts(), getProjectHistorySlugs()]);

  return [
    { url: SITE_URL },
    { url: `${SITE_URL}/blog` },
    { url: `${SITE_URL}/projects` },
    ...posts.map((post) => ({ url: `${SITE_URL}/blog/${post.slug}`, lastModified: post.date })),
    ...projectSlugs.map((slug) => ({ url: `${SITE_URL}/projects/${slug}` })),
    ...EXPERIENCE_SLUGS.map((slug) => ({ url: `${SITE_URL}/experience/${slug}` })),
  ];
}
