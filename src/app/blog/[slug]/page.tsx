import { readFileSync } from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ArticleLayout from "@/components/layout/ArticleLayout";
import Badge from "@/components/primitives/Badge";
import { Display } from "@/components/primitives/Typography";
import { formatPostDate, type PostMetadata } from "@/lib/posts";
import { extractHeadings } from "@/lib/toc";
import readEntries from "@/lib/readEntries";

export async function generateStaticParams() {
  const slugs = await readEntries('blog');
  return slugs.map((slug) => ({ slug }))
}

async function isBlogSlug(slug: string): Promise<boolean> {
  return (await readEntries("blog")).includes(slug);
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  if (!(await isBlogSlug(slug))) return {};

  const { metadata }: { metadata: PostMetadata } = await import(`@/content/blog/${slug}.mdx`);

  return { title: metadata.title, description: metadata.excerpt };
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;
  if (!(await isBlogSlug(slug))) notFound();

  const { default: Post, metadata }: { default: React.ComponentType; metadata: PostMetadata } =
    await import(`@/content/blog/${slug}.mdx`);

  const source = readFileSync(
    path.join(process.cwd(), "src/content/blog", `${slug}.mdx`),
    "utf8",
  );
  const headings = extractHeadings(source);

  return (
    <ArticleLayout
      eyebrow={<time dateTime={metadata.date}>{formatPostDate(metadata.date)}</time>}
      title={<Display>{metadata.title}</Display>}
      lead={metadata.excerpt}
      backHref="/blog"
      backLabel="Volver al blog"
      headings={headings}
      sidebarExtra={
        metadata.tags && metadata.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {metadata.tags.map((tag) => (
              <Badge key={tag}>{tag}</Badge>
            ))}
          </div>
        )
      }
    >
      <Post />
    </ArticleLayout>
  );
}
