import type { ReactNode } from "react";
import { isValidElement } from "react";
import type { MDXComponents } from "mdx/types";
import { DisplayH2, Prose } from "@/components/primitives/Typography";
import { slugify } from "@/lib/toc";

function headingText(children: ReactNode): string {
  if (children == null || typeof children === "boolean") return "";
  if (typeof children === "string" || typeof children === "number") return String(children);
  if (Array.isArray(children)) return children.map(headingText).join("");
  if (isValidElement<{ children?: ReactNode }>(children)) return headingText(children.props.children);
  return "";
}

const components: MDXComponents = {
  h1: ({ children }) => <DisplayH2 className="pt-8 pb-2">{children}</DisplayH2>,
  h2: ({ children }) => (
    <h2
      id={slugify(headingText(children))}
      className="font-display text-3xl sm:text-4xl leading-tight tracking-[-0.01em] text-text-primary pt-10 pb-2"
    >
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3
      id={slugify(headingText(children))}
      className="font-display text-xl sm:text-2xl leading-tight text-text-primary pt-7 pb-1"
    >
      {children}
    </h3>
  ),
  h4: ({ children }) => (
    <h4 className="font-mono text-xs uppercase tracking-[0.25em] text-main pt-6 pb-1">
      {children}
    </h4>
  ),
  p: ({ children }) => <Prose className="py-2">{children}</Prose>,
  img: ({ src, alt }) => (
    <img
      src={typeof src === "string" ? src : undefined}
      alt={alt ?? ""}
      className="my-4 w-full max-w-full h-auto border border-soft"
    />
  ),
  a: ({ children, href }) => (
    <a
      href={href}
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel={href?.startsWith("http") ? "noreferrer" : undefined}
      className="text-interactive underline underline-offset-4 decoration-strong hover:decoration-interactive"
    >
      {children}
    </a>
  ),
  ul: ({ children }) => (
    <ul className="flex flex-col gap-2 py-3 pl-5 list-disc marker:text-main">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="flex flex-col gap-2 py-3 pl-5 list-decimal marker:text-main">{children}</ol>
  ),
  li: ({ children }) => (
    <li className="font-sans text-lg leading-8 text-text-primary text-pretty">{children}</li>
  ),
  strong: ({ children }) => <strong className="font-bold text-text-primary">{children}</strong>,
  blockquote: ({ children }) => (
    <blockquote className="border-l-2 border-main pl-5 my-5 text-lg leading-8 text-text-secondary italic">
      {children}
    </blockquote>
  ),

  pre: ({ children }) => (
    <pre className="my-5 overflow-x-auto bg-surface-overlay border border-soft p-4 font-mono text-sm leading-6 text-text-primary [&_code]:bg-transparent [&_code]:p-0">
      {children}
    </pre>
  ),
  code: ({ children }) => (
    <code className="font-mono text-sm bg-surface-overlay text-text-primary px-1.5 py-0.5">
      {children}
    </code>
  ),
  hr: () => <hr className="my-8 border-soft" />,
  table: ({ children }) => (
    <div className="my-4 overflow-x-auto">
      <table className="w-full border-collapse text-left text-base">{children}</table>
    </div>
  ),
  th: ({ children }) => (
    <th className="border border-soft p-2 font-mono text-xs uppercase tracking-[0.15em] text-main">
      {children}
    </th>
  ),
  td: ({ children }) => <td className="border border-soft p-2 text-text-secondary">{children}</td>,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
