import type { Metadata } from "next";
import "./globals.css";
import NavPopover from "@/components/composed/NavPopover";
import { JBMono, bebasNeue, titillium } from "@/lib/fonts";
import { ScrollArea } from "@base-ui/react/scroll-area";
import Colophon from "@/components/layout/Colophon";
import { GITHUB_PROFILE_URL } from "@/lib/github";
import { OPEN_GRAPH_DEFAULTS, SITE_AUTHOR, SITE_DESCRIPTION, SITE_NAME, SITE_TITLE, SITE_URL } from "@/constants/SITE";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: SITE_TITLE, template: `%s — ${SITE_NAME}` },
  description: SITE_DESCRIPTION,
  authors: [{ name: SITE_AUTHOR, url: SITE_URL }],
  openGraph: { ...OPEN_GRAPH_DEFAULTS, type: "website" },
  twitter: { card: "summary_large_image", creator: "@energyrexdev" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${bebasNeue.variable} ${titillium.variable} ${JBMono.variable} h-full w-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem("theme");if(t==="light")document.documentElement.setAttribute("data-theme","light")}catch(e){}`,
          }}
        />
      </head>
      <body className="flex h-dvh flex-col overflow-hidden p-3 pt-0 bg-frame border-main text-foreground font-sans">
        <header className="flex shrink-0 items-center justify-between gap-4">
          <NavPopover githubUrl={GITHUB_PROFILE_URL} />

          <Colophon />
        </header>

        <ScrollArea.Root className="relative flex min-h-0 flex-1 overflow-hidden border border-main bg-background">
          <ScrollArea.Viewport className="h-full w-full overscroll-contain focus:outline-none">
            <ScrollArea.Content className="min-h-full">
              {children}
            </ScrollArea.Content>
          </ScrollArea.Viewport>

          <ScrollArea.Scrollbar className="m-px flex w-2.5 justify-center rounded-full bg-white/5 opacity-0 transition-opacity pointer-events-none data-hovering:opacity-100 data-hovering:pointer-events-auto data-scrolling:opacity-100 data-scrolling:duration-0 data-scrolling:pointer-events-auto">
            <ScrollArea.Thumb className="w-full rounded-full bg-strong" />
          </ScrollArea.Scrollbar>
        </ScrollArea.Root>
      </body>
    </html>
  );
}
