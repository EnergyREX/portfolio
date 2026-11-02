import type { ReactNode } from "react";

const ICONS: Record<string, ReactNode> = {
  "hello-world": (
    <>
      <rect x="20" y="20" width="24" height="24" fill="var(--main)" />
      <rect x="28" y="4" width="8" height="12" fill="var(--text-primary)" />
      <rect x="28" y="48" width="8" height="12" fill="var(--text-primary)" />
      <rect x="4" y="28" width="12" height="8" fill="var(--text-primary)" />
      <rect x="48" y="28" width="12" height="8" fill="var(--text-primary)" />
    </>
  ),
  "developers-shouldnot-call-themselves-vibecoders": (
    <>
      <polygon points="8,32 26,16 26,48" fill="var(--main)" />
      <polygon points="56,32 38,16 38,48" fill="var(--text-primary)" />
      <rect x="6" y="30" width="52" height="4" fill="var(--background)" transform="rotate(45 32 32)" />
    </>
  ),
  "roles-are-transforming-in-reality": (
    <>
      <rect x="6" y="40" width="16" height="16" fill="var(--text-primary)" />
      <rect x="24" y="24" width="16" height="16" fill="var(--main)" />
      <rect x="42" y="8" width="16" height="16" fill="var(--text-primary)" />
    </>
  ),
};

const FALLBACK = (
  <>
    <rect x="4" y="4" width="24" height="24" fill="var(--main)" />
    <rect x="36" y="4" width="24" height="24" fill="var(--text-primary)" />
    <rect x="4" y="36" width="24" height="24" fill="var(--text-primary)" />
    <rect x="36" y="36" width="24" height="24" fill="var(--main)" />
  </>
);

export const PostImage = ({ slug }: { slug: string }) => (
  <svg aria-hidden viewBox="0 0 64 64" className="h-auto w-16" xmlns="http://www.w3.org/2000/svg">
    {ICONS[slug] ?? FALLBACK}
  </svg>
)
