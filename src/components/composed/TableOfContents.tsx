"use client";

import { useEffect, useState } from "react";
import { Eyebrow } from "@/components/primitives/Typography";
import type { TocItem } from "@/lib/toc";

interface TableOfContentsProps {
  items: TocItem[];
}

const TableOfContents = ({ items }: TableOfContentsProps) => {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    if (items.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (visible.length > 0) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-96px 0px -70% 0px", threshold: 0 },
    );

    const elements = items
      .map(({ id }) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [items]);

  if (items.length === 0) return null;

  return (
    <nav aria-label="Tabla de contenidos" className="flex flex-col gap-3">
      <Eyebrow>Tabla de contenidos</Eyebrow>

      <ol className="flex flex-col gap-2.5 border-l border-soft">
        {items.map((item, index) => (
          <li key={item.id} className={item.level === 3 ? "pl-8" : "pl-4"}>
            <a
              href={`#${item.id}`}
              className={`flex items-baseline gap-2.5 font-sans text-3xl leading-snug transition-colors ${
                activeId === item.id
                  ? "text-text-primary"
                  : "text-text-secondary hover:text-interactive"
              }`}
            >
              <span className="shrink-0 font-mono text-3xl text-main">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="text-pretty">{item.text}</span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default TableOfContents;
