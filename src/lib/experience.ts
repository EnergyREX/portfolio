export const EXPERIENCE_SLUGS = ["retelia", "globomatik"] as const;

export type ExperienceSlug = (typeof EXPERIENCE_SLUGS)[number];

export interface Job {
  slug: string;
  company: string;
  color: string;
  logo?: string;
  role: string;
  period: string;
  bullets: string[];
}

export const JOBS: Job[] = [
  {
    slug: "retelia",
    company: "RETELIA",
    color: "#95c123",
    logo: "/retelia.jpg",
    role: "Desarrollador & Arquitecto de Software",
    period: "Septiembre 2025 - Presente",
    bullets: [
      "Desarrollador principal de un PIM que gestiona 22,000+ SKUs, con arquitectura hexagonal/DDD.",
      'Refactor completo del frontend: -10.3% líneas de código, -40% "god files", -84% líneas por archivo de API, triplicando los endpoints soportados.',
      'Introdujo validación de esquemas en runtime con Zod (0 a 436 usos) y React Query (53 hooks), reduciendo type-guards manuales en 56% y "any" inseguros en 36%.',
      "Diseñé pipelines de procesamiento asíncrono con BullMQ para integrar ShoppingFeed, PrestaShop y Odoo; construyó un módulo de repricing con PcComponentes y Mediamarkt",
      "Autor de más de 2,100 commits — aproximadamente el 81% del total del codebase.",
    ],
  },
  {
    slug: "globomatik",
    company: "GLOBOMATIK",
    color: "#fcc22f",
    logo: "/gmatik.jpg",
    role: "Desarrollador en prácticas",
    period: "Marzo 2025 - Junio 2025",
    bullets: [
      "Prácticas profesionales de CFGS de DAW.",
      "Consistieron principalmente en aplicar mejoras de diseño para el frontend del e-commerce de Retelia.",
    ],
  },
];

export function isExperienceSlug(slug: string): slug is ExperienceSlug {
  return (EXPERIENCE_SLUGS as readonly string[]).includes(slug);
}

export function getJob(slug: ExperienceSlug): Job {
  const job = JOBS.find((candidate) => candidate.slug === slug);
  if (!job) throw new Error(`Falta la entrada de experiencia "${slug}" en JOBS`);
  return job;
}
