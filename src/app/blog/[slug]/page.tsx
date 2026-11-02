import { readFileSync } from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ArticleLayout from "@/components/layout/ArticleLayout";
import Badge from "@/components/primitives/Badge";
import { JsonLd } from "@/components/primitives/JsonLd";
import { Display } from "@/components/primitives/Typography";
import { OPEN_GRAPH_DEFAULTS, SITE_AUTHOR, SITE_URL } from "@/constants/SITE";
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

  return {
    title: metadata.title,
    description: metadata.excerpt,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      ...OPEN_GRAPH_DEFAULTS,
      // Al declarar `openGraph` aquí, la imagen de `app/opengraph-image` no se hereda.
      images: "/opengraph-image",
      type: "article",
      publishedTime: metadata.date,
      authors: [SITE_AUTHOR],
      tags: metadata.tags,
    },
  };
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
    <>
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: metadata.title,
        description: metadata.excerpt,
        datePublished: metadata.date,
        inLanguage: "es",
        url: `${SITE_URL}/blog/${slug}`,
        author: { "@type": "Person", name: SITE_AUTHOR, url: SITE_URL },
        keywords: metadata.tags,
      }}
    />
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
    </>
  );
}
