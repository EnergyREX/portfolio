import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Card from "@/components/composed/Card";
import TableOfContents from "@/components/composed/TableOfContents";
import { DisplayBody, Eyebrow } from "@/components/primitives/Typography";
import type { TocItem } from "@/lib/toc";

interface ArticleLayoutProps {
  eyebrow: ReactNode;
  // Va dentro del hero tal cual, para que cada página decida si acompaña el
  // título con logo u otros adornos.
  title: ReactNode;
  lead: ReactNode;
  backHref: string;
  backLabel: string;
  // Información extra encima del enlace de vuelta, en la columna derecha del hero.
  heroAside?: ReactNode;
  // Bloque bajo el índice en la barra lateral (etiquetas, etc.).
  sidebarExtra?: ReactNode;
  // Sin índice no hay barra lateral y el artículo ocupa todo el ancho.
  headings?: TocItem[];
  children: ReactNode;
}

const backLinkClass =
  "group flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-interactive focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-main";

// Plantilla compartida por los artículos MDX (blog y experiencia), para que
// todos se lean con la misma estructura y no diverjan copia a copia.
export default function ArticleLayout({
  eyebrow,
  title,
  lead,
  backHref,
  backLabel,
  heroAside,
  sidebarExtra,
  headings,
  children,
}: ArticleLayoutProps) {
  return (
    <div className="flex w-full flex-col divide-y divide-soft">
      <section id="article-hero" className="w-full grid grid-cols-6 gap-px bg-soft">
        <div className="col-span-6 lg:col-span-4 bg-background p-6 sm:p-10">
          <Eyebrow>{eyebrow}</Eyebrow>

          {title}

          <DisplayBody className="py-5">{lead}</DisplayBody>
        </div>

        <div className="hidden lg:flex lg:col-span-2 flex-col justify-end gap-6 bg-background p-6 sm:p-10">
          {heroAside}

          <Link href={backHref} className={backLinkClass}>
            <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-1" />
            {backLabel}
          </Link>
        </div>
      </section>

      <section id="article-body" className="grid grid-cols-12 gap-px bg-soft">
        {headings && (
          <div className="w-full h-full col-span-12 lg:col-span-3 bg-background p-6 sm:p-10">
            <div className="flex flex-col gap-8 lg:sticky lg:top-10">
              <TableOfContents items={headings} />

              {sidebarExtra}
            </div>
          </div>
        )}

        <article
          className={`w-full h-full col-span-12 bg-background ${headings ? "lg:col-span-9" : ""}`}
        >
          {headings ? (
            <Card>{children}</Card>
          ) : (
            // A todo el ancho las líneas se hacen ilegibles: se limita la medida
            // y en pantallas grandes la columna se desplaza dos de las doce
            // columnas de la rejilla, a medio camino entre el título y el centro.
            <div className="px-6 py-8 sm:p-10">
              <div className="max-w-[75ch] lg:ml-[calc(100%/6)]">{children}</div>
            </div>
          )}
        </article>
      </section>

      <section className="grid grid-cols-12 gap-px bg-soft lg:hidden">
        <div className="col-span-12 bg-background p-6 sm:p-10">
          <Link href={backHref} className={backLinkClass}>
            <ArrowLeft className="size-3.5" />
            {backLabel}
          </Link>
        </div>
      </section>
    </div>
  );
}
