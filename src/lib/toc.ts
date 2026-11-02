export interface TocItem {
  id: string;
  text: string;
  level: 2 | 3;
}

export function slugify(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function stripInlineMarkdown(text: string): string {
  return text
    .replace(/`([^`]*)`/g, "$1")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/(\*\*|__|\*|_)/g, "");
}

export function extractHeadings(source: string): TocItem[] {
  const items: TocItem[] = [];
  let inCodeBlock = false;

  for (const rawLine of source.split("\n")) {
    const line = rawLine.trim();

    if (line.startsWith("```")) {
      inCodeBlock = !inCodeBlock;
      continue;
    }
    if (inCodeBlock) continue;

    const match = /^(#{2,3})\s+(.*)$/.exec(line);
    if (!match) continue;

    const text = stripInlineMarkdown(match[2].trim());
    if (!text) continue;

    items.push({ id: slugify(text), text, level: match[1].length as 2 | 3 });
  }

  return items;
}
