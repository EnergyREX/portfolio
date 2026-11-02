import { readFileSync } from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import ArticleLayout from "@/components/layout/ArticleLayout";
import { Display, Eyebrow } from "@/components/primitives/Typography";
import { EXPERIENCE_SLUGS, getJob, isExperienceSlug } from "@/lib/experience";
import { extractHeadings } from "@/lib/toc";

interface ExperienceMetadata {
  title: string;
  summary: string;
}

export function generateStaticParams() {
  return EXPERIENCE_SLUGS.map((slug) => ({ slug }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  if (!isExperienceSlug(slug)) return {};

  const job = getJob(slug);
  const { metadata }: { metadata: ExperienceMetadata } = await import(
    `@/content/experience/${slug}.mdx`
  );

  return {
    title: `${job.company} — ${job.role}`,
    description: metadata.summary,
    alternates: { canonical: `/experience/${slug}` },
  };
}

export default async function ExperiencePage({ params }: PageProps) {
  const { slug } = await params;
  if (!isExperienceSlug(slug)) notFound();

  const job = getJob(slug);
  const { default: Story, metadata }: { default: React.ComponentType; metadata: ExperienceMetadata } =
    await import(`@/content/experience/${slug}.mdx`);

  const source = readFileSync(
    path.join(process.cwd(), "src/content/experience", `${slug}.mdx`),
    "utf8",
  );
  const headings = extractHeadings(source);

  return (
    <ArticleLayout
      eyebrow={job.period}
      title={
        <div className="flex flex-row items-center gap-4 pt-2 sm:gap-5">
          {job.logo && (
            <Image
              src={job.logo}
              alt=""
              width={150}
              height={150}
              aria-hidden
              className="size-14 shrink-0 border border-soft object-cover sm:size-16"
            />
          )}
          <Display>{job.company}</Display>
        </div>
      }
      lead={metadata.summary}
      backHref="/#experience"
      backLabel="Volver a experiencia"
      heroAside={
        <div className="flex flex-col gap-2">
          <Eyebrow>Puesto</Eyebrow>
          <p className="font-sans text-lg leading-snug text-text-primary">{job.role}</p>
        </div>
      }
      headings={headings}
    >
      <Story />
    </ArticleLayout>
  );
}
