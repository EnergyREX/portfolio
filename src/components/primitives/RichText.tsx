import type { ReactNode } from "react";

// Minimal markdown-bold renderer for short authored strings (e.g. project
// summaries): "***A**plicant" highlights the "A" the way `**A**` would, it's
// just written with stray leading asterisks in the source content.
function parseBoldSegments(text: string): ReactNode[] {
  const segments: ReactNode[] = [];
  const pattern = /\*+([^*]+?)\*+/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) segments.push(text.slice(lastIndex, match.index));
    segments.push(<strong key={key++}>{match[1]}</strong>);
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) segments.push(text.slice(lastIndex));

  return segments;
}

export const RichText = ({ text }: { text: string }) => <>{parseBoldSegments(text)}</>;
