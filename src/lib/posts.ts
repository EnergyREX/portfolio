import readEntries from "@/lib/readEntries";

export interface PostMetadata {
  title: string;
  date: string;
  excerpt: string;
  tags?: string[];
}

export interface Post extends PostMetadata {
  slug: string;
}

export async function getAllPosts(): Promise<Post[]> {
  const slugs = await readEntries("blog");
  const posts = await Promise.all(
    slugs.map(async (slug) => {
      const { metadata }: { metadata: PostMetadata } = await import(`@/content/blog/${slug}.mdx`);
      return { slug, ...metadata };
    }),
  );
  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function formatPostDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("es-ES", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}
