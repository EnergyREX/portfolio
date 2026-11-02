import Link from "next/link";
import { BookOpen, ExternalLink, Link2, Star } from "lucide-react";
import Card from "@/components/composed/Card";
import Badge from "@/components/primitives/Badge";
import { Body, Display, DisplayBody, Eyebrow, Heading } from "@/components/primitives/Typography";
import { getGithubRepos, getRepoTags } from "@/lib/github";
import { ProjectImage } from "@/components/primitives/ProjectImage";
import { FREELANCE_PROJECTS } from "@/constants/FREELANCE_PROJECTS";
import { PROJECT_IMAGES } from "@/constants/PROJECT_IMAGES";
import { getAllPosts, type Post } from "@/lib/posts";
import { getAllProjectContent, type ProjectContent } from "@/lib/projects";
import { RichText } from "@/components/primitives/RichText";
import { slugify } from "@/lib/slugify";
import type { GithubRepo } from "@/lib/github";

const projectLinkClass =
  "flex items-center gap-2 px-6 py-4 text-text-secondary transition-colors hover:bg-main hover:text-on-main sm:px-8";

function projectKey(project: Pick<GithubRepo, "name" | "slug">): string {
  return slugify(project.slug ?? project.name);
}

function findProjectStory(project: Pick<GithubRepo, "name" | "slug">, posts: Post[]): Post | undefined {
  const key = projectKey(project);
  return posts.find((post) => post.slug === key);
}

function historyHref(story: Post | undefined, content: ProjectContent | undefined): string | undefined {
  if (content?.history) return `/projects/${content.slug}`;
  if (story) return `/blog/${story.slug}`;
  return undefined;
}

function findProjectContent(
  project: Pick<GithubRepo, "name" | "slug">,
  content: ProjectContent[],
): ProjectContent | undefined {
  const key = projectKey(project);
  return content.find((entry) => entry.slug === key);
}

export default async function ProjectsPage() {
  const [repos, posts, projectContent] = await Promise.all([
    getGithubRepos(),
    getAllPosts(),
    getAllProjectContent(),
  ]);
  const totalStars = repos.reduce((sum, repo) => sum + repo.stars, 0);

  return (
    <div className="flex w-full flex-col divide-y divide-soft">
      <section id="projects-hero" className="w-full grid grid-cols-6 gap-px bg-soft">
        <div className="col-span-6 lg:col-span-4 bg-background p-6 sm:p-10">
          <Display>Proyectos.</Display>

          <DisplayBody className="py-5">
            Proyectos de código abierto y privados, obtenidos de GitHub y añadidos a mano
          </DisplayBody>
        </div>

        <div className="hidden lg:flex lg:col-span-2 flex-col justify-end gap-6 bg-background p-6 sm:p-10">
          <div className="flex flex-col gap-2">
            <Eyebrow>Repositorios</Eyebrow>
            <p className="font-display text-6xl font-bold leading-none tracking-[-0.02em] text-text-primary">
              {String(repos.length).padStart(2, "0")}
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <Eyebrow>Estrellas</Eyebrow>
            <p className="font-display text-6xl font-bold leading-none tracking-[-0.02em] text-text-primary">
              {String(totalStars).padStart(2, "0")}
            </p>
          </div>
        </div>
      </section>

      <section id="repos" className="grid grid-cols-12 gap-px bg-soft">
        <div className="w-full h-full content-center col-span-12 lg:col-span-3 bg-background p-6 sm:p-10">
          <Eyebrow>Todos mis proyectos personales</Eyebrow>
        </div>

        <div className="w-full h-full col-span-12 lg:col-span-9 grid grid-cols-1 gap-px bg-soft xl:grid-cols-2">
          {repos.map((repo) => {
            const content = findProjectContent(repo, projectContent);
            const history = historyHref(findProjectStory(repo, posts), content);

            return (
              <Card key={repo.name} className="flex flex-col">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
                  <div className="flex flex-col">
                    <Heading className="font-bold">{content?.title ?? repo.name}</Heading>

                    <Body className="pt-2">
                      {content ? <RichText text={content.summary} /> : repo.description}
                    </Body>

                    {getRepoTags(repo).length > 0 && (
                      <div className="flex flex-row flex-wrap gap-2 sm:gap-3 pt-4">
                        {getRepoTags(repo).map((tag) => (
                          <Badge key={tag}>{tag}</Badge>
                        ))}
                      </div>
                    )}
                  </div>

                  <ProjectImage name={repo.name} src={PROJECT_IMAGES[repo.name]} />
                </div>

                <div className="-mx-6 -mb-8 mt-auto flex divide-x divide-soft border-t border-soft bg-background font-mono text-xs uppercase tracking-[0.25em] sm:-mx-8 sm:-mb-10">
                  <div className="flex flex-1 items-center gap-2 px-6 py-4 text-text-secondary sm:px-8">
                    {repo.stars > 0 && (
                      <>
                        <Star className="size-3.5" /> {repo.stars}
                      </>
                    )}
                  </div>

                  {history && (
                    <Link href={history} className={projectLinkClass}>
                      <BookOpen className="size-3.5" /> Historia
                    </Link>
                  )}

                  {repo.homepage && (
                    <a href={repo.homepage} target="_blank" rel="noreferrer" className={projectLinkClass}>
                      <ExternalLink className="size-3.5" /> Web
                    </a>
                  )}

                  {!repo.closedSource && (
                    <a href={repo.url} target="_blank" rel="noreferrer" className={projectLinkClass}>
                      <Link2 className="size-3.5" /> Código
                    </a>
                  )}
                </div>
              </Card>
            );
          })}

          {repos.length % 2 !== 0 && <div className="hidden bg-background xl:block" />}
        </div>
      </section>

      <section id="freelance" className="grid grid-cols-12 gap-px bg-soft border-b border-soft">
        <div className="w-full h-full content-center col-span-12 lg:col-span-3 bg-background p-6 sm:p-10">
          <Eyebrow>Trabajo Freelance</Eyebrow>
        </div>

        <div className="w-full h-full col-span-12 lg:col-span-9 grid grid-cols-1 gap-px bg-soft xl:grid-cols-2">
          {FREELANCE_PROJECTS.map((f) => {
            const content = findProjectContent(f, projectContent);
            const history = historyHref(findProjectStory(f, posts), content);

            return (
              <Card key={f.name} className="flex flex-col">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
                  <div className="flex flex-col">
                    <Heading className="font-bold">{content?.title ?? f.name}</Heading>

                    <Body className="pt-2">
                      {content ? <RichText text={content.summary} /> : f.description}
                    </Body>

                    {getRepoTags(f).length > 0 && (
                      <div className="flex flex-row flex-wrap gap-2 sm:gap-3 pt-4">
                        {getRepoTags(f).map((tag) => (
                          <Badge key={tag}>{tag}</Badge>
                        ))}
                      </div>
                    )}
                  </div>

                  <ProjectImage name={f.name} src={PROJECT_IMAGES[f.name]} />
                </div>

                <div className="-mx-6 -mb-8 mt-auto flex divide-x divide-soft border-t border-soft bg-background font-mono text-xs uppercase tracking-[0.25em] sm:-mx-8 sm:-mb-10">
                  <div className="flex-1" />

                  {history && (
                    <Link href={history} className={projectLinkClass}>
                      <BookOpen className="size-3.5" /> Historia
                    </Link>
                  )}

                  {f.homepage && (
                    <a href={f.homepage} target="_blank" rel="noreferrer" className={projectLinkClass}>
                      <ExternalLink className="size-3.5" /> Web
                    </a>
                  )}

                  {!f.closedSource && (
                    <a href={f.url} target="_blank" rel="noreferrer" className={projectLinkClass}>
                      <Link2 className="size-3.5" /> Código
                    </a>
                  )}
                </div>
              </Card>
            );
          })}

          {FREELANCE_PROJECTS.length % 2 !== 0 && <div className="hidden bg-background xl:block" />}
        </div>
      </section>
    </div>
  );
}
