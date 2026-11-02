import readEntries from "@/lib/readEntries";

export interface ProjectContentMetadata {
  title: string;
  summary: string;
  history?: boolean;
}

export interface ProjectContent extends ProjectContentMetadata {
  slug: string;
}

export async function getAllProjectContent(): Promise<ProjectContent[]> {
  const slugs = await readEntries("projects");
  return Promise.all(
    slugs.map(async (slug) => {
      const { metadata }: { metadata: ProjectContentMetadata } = await import(`@/content/projects/${slug}.mdx`);
      return { slug, ...metadata };
    }),
  );
}

export async function getProjectHistorySlugs(): Promise<string[]> {
  const projects = await getAllProjectContent();
  return projects.filter((project) => project.history).map((project) => project.slug);
}
