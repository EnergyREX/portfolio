import { cacheLife } from "next/cache";

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Falta la variable de entorno ${name} (ver .env.example)`);
  return value;
}

export const GITHUB_USERNAME = requireEnv("GITHUB_USERNAME");
export const GITHUB_PROFILE_URL = `https://github.com/${GITHUB_USERNAME}`;

export interface GithubRepo {
  name: string;
  description: string;
  url: string;
  homepage: string | null;
  language: string | null;
  stars: number;
  topics: string[];
  // Internal name used to match this project against its blog story
  // (src/content/blog) and curated content (src/content/projects) when it
  // differs from the display `name` — e.g. a freelance project's client-facing
  // name vs. the slug its files are keyed by. Falls back to `name` otherwise.
  slug?: string;
  // True for client work shipped without a public repo — hides the "Código" link.
  closedSource?: boolean;
}

// Max number of tech tags (language + topics) shown per project card.
export const MAX_REPO_TAGS = 6;

// The primary language first, then GitHub topics, deduped and capped.
export function getRepoTags(repo: Pick<GithubRepo, "language" | "topics">): string[] {
  const tags = [repo.language, ...repo.topics].filter((tag): tag is string => Boolean(tag));
  return [...new Set(tags)].slice(0, MAX_REPO_TAGS);
}

const EXCLUDED_REPOS = new Set(["dotfiles", "myclinic", "portfolio", "portfolio2025", GITHUB_USERNAME.toLowerCase()]);

const MANUAL_REPOS: GithubRepo[] = [

];

const DESCRIPTION_OVERRIDES: Record<string, string> = {
  openats:
    "Un sistema de seguimiento de candidatos de código abierto. TypeScript en todo el proyecto, Next.js en el frontend y Fastify en el backend.",
  "fastify-boilerplate": "Una plantilla base para proyectos con Fastify.",
};

interface GithubRepoResponse {
  name: string;
  description: string | null;
  fork: boolean;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  topics?: string[];
}

const MOCK_REPOS: GithubRepo[] = [
  {
    name: "openats",
    description: DESCRIPTION_OVERRIDES.openats,
    url: `${GITHUB_PROFILE_URL}/openats`,
    homepage: null,
    language: "TypeScript",
    stars: 2,
    topics: ["nextjs", "fastify"],
  },
  {
    name: "fastify-boilerplate",
    description: DESCRIPTION_OVERRIDES["fastify-boilerplate"],
    url: `${GITHUB_PROFILE_URL}/fastify-boilerplate`,
    homepage: null,
    language: "TypeScript",
    stars: 0,
    topics: ["fastify"],
  },
];

function withManualRepos(repos: GithubRepo[]): GithubRepo[] {
  const manualUrls = new Set(MANUAL_REPOS.map((repo) => repo.url));
  return [...MANUAL_REPOS, ...repos.filter((repo) => !manualUrls.has(repo.url))];
}

export async function getGithubRepos(): Promise<GithubRepo[]> {
  "use cache";
  cacheLife("hours");

  try {
    const response = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=20`,
      { headers: { Accept: "application/vnd.github+json", "User-Agent": `${GITHUB_USERNAME}-portfolio` } },
    );

    if (!response.ok) {
      console.warn(`GitHub repos: API responded with ${response.status}`);
      return withManualRepos(MOCK_REPOS);
    }

    const repos: GithubRepoResponse[] = await response.json();
    const projects = repos
      .filter((repo) => !repo.fork && !EXCLUDED_REPOS.has(repo.name.toLowerCase()))
      .map((repo) => ({
        name: repo.name,
        // Las descripciones de GitHub están en inglés: la traducción tiene prioridad.
        description: DESCRIPTION_OVERRIDES[repo.name] ?? repo.description ?? "Sin descripción todavía.",
        url: repo.html_url,
        homepage: repo.homepage || null,
        language: repo.language,
        stars: repo.stargazers_count,
        topics: repo.topics ?? [],
      }));

    return withManualRepos(projects.length > 0 ? projects : MOCK_REPOS);
  } catch (error) {
    console.warn("GitHub repos: fetch failed", error);
    return withManualRepos(MOCK_REPOS);
  }
}
