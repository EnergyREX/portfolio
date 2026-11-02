import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ArticleLayout from "@/components/layout/ArticleLayout";
import { Display } from "@/components/primitives/Typography";
import { RichText } from "@/components/primitives/RichText";
import { getProjectHistorySlugs, type ProjectContentMetadata } from "@/lib/projects";

export async function generateStaticParams() {
  const slugs = await getProjectHistorySlugs();
  return slugs.map((slug) => ({ slug }));
}

async function isHistorySlug(slug: string): Promise<boolean> {
  return (await getProjectHistorySlugs()).includes(slug);
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  if (!(await isHistorySlug(slug))) return {};

  const { metadata }: { metadata: ProjectContentMetadata } = await import(`@/content/projects/${slug}.mdx`);

  return { title: metadata.title, description: metadata.summary.replace(/\*/g, "") };
}

export default async function ProjectHistoryPage({ params }: PageProps) {
  const { slug } = await params;
  if (!(await isHistorySlug(slug))) notFound();

  const { default: History, metadata }: { default: React.ComponentType; metadata: ProjectContentMetadata } =
    await import(`@/content/projects/${slug}.mdx`);

  return (
    <ArticleLayout
      eyebrow="Proyecto"
      title={<Display>{metadata.title}</Display>}
      lead={<RichText text={metadata.summary} />}
      backHref="/projects"
      backLabel="Volver a proyectos"
    >
      <History />
    </ArticleLayout>
  );
}
