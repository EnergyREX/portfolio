'use client';

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FolderGit2, ExternalLink, X, Clock, MapPin, Compass } from "lucide-react";
import { Popover, PopoverTrigger, PopoverContent, PopoverClose } from "@/components/primitives/Popover";
import { NAV_LINKS } from "@/constants/NAV_LINKS";
import ThemeToggle from "@/components/composed/home/ThemeToggle";

interface MadridClock {
  time: string;
  offset: string;
}

function useMadridClock(): MadridClock | null {
  const [clock, setClock] = useState<MadridClock | null>(null);

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const time = new Intl.DateTimeFormat("es-ES", {
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "Europe/Madrid",
      }).format(now);

      const offset = new Intl.DateTimeFormat("en", {
        timeZone: "Europe/Madrid",
        timeZoneName: "shortOffset",
      })
        .formatToParts(now)
        .find((part) => part.type === "timeZoneName")?.value ?? "";

      setClock({ time, offset });
    };

    update();
    const interval = setInterval(update, 30_000);
    return () => clearInterval(interval);
  }, []);

  return clock;
}

interface NavPopoverProps {
  githubUrl: string;
}

export default function NavPopover({ githubUrl }: NavPopoverProps) {
  const pathname = usePathname();
  const clock = useMadridClock();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger className="flex items-center gap-2 my-2 px-2 py-1.5 font-mono text-xs uppercase tracking-[0.15em] text-text-secondary transition hover:bg-surface-overlay hover:text-text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-main">
        <Compass className="size-4" />
        Navegación
      </PopoverTrigger>

      <PopoverContent reveal="drop" open={open} className="w-[calc(100vw-1.5rem)] sm:w-72 sm:pr-3 sm:pb-3 z-19" sideOffset={8}>
        <div className="flex flex-col gap-2 border-t border-l border-r border-soft sm:border-r-0">
          <div className="flex flex-col">
            <div className="flex items-center justify-between gap-3 p-3">
              <div className="flex items-center gap-3">
                <div className="flex size-9 shrink-0 items-center justify-center bg-main font-mono text-sm font-semibold text-on-main">
                  FJ
                </div>
                <div>
                  <p className="text-sm font-medium text-text-primary">Francisco Javier</p>
                  <p className="text-xs text-text-secondary">Desarrollador fullstack</p>
                </div>
              </div>
              <div className="flex shrink-0 items-center gap-1">
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex size-8 items-center justify-center text-text-secondary transition hover:bg-surface-overlay hover:text-text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-main"
                  aria-label="Perfil de GitHub (abre en una pestaña nueva)"
                >
                  <ExternalLink className="size-4" />
                </a>
                <PopoverClose
                  className="flex size-8 items-center justify-center text-text-secondary transition hover:bg-surface-overlay hover:text-text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-main"
                  aria-label="Cerrar navegación"
                >
                  <X className="size-4" />
                </PopoverClose>
              </div>
            </div>

            <ThemeToggle />

            <nav className="flex flex-col gap-px" aria-label="Principal">
              {NAV_LINKS.map(({ href, label, icon: Icon }) => {
                const active = pathname === href;
                return (
                  <Link
                    key={href}
                    href={href}
                    aria-current={active ? "page" : undefined}
                    className={`flex flex-row items-center gap-2 px-3 py-2 text-sm transition focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-main ${
                      active
                        ? "bg-main text-on-main"
                        : "text-text-secondary hover:bg-surface-overlay hover:text-text-primary"
                    }`}
                  >
                    {Icon && <Icon className="size-4" />}
                    {label}
                  </Link>
                );
              })}
            </nav>

            <div className="flex items-center gap-3 border-t border-soft px-3 pt-3">
              <MapPin className="size-4 shrink-0 text-main" />
              <div className="flex-1">
                <p className="text-sm font-medium text-text-primary">
                  Almería, España{clock ? ` (${clock.offset})` : ""}
                </p>
                <p className="text-xs text-text-secondary">Hora local</p>
              </div>
              <p className="flex items-center gap-1.5 font-mono text-lg tabular-nums text-text-primary">
                <Clock className="size-4 text-text-secondary" />
                {clock?.time ?? "--:--"}
              </p>
            </div>
          </div>

          <Link
            href="https://openats.energyrex.dev"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-3 border border-soft p-3 transition hover:border-main focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-main"
          >
            <div className="flex size-10 shrink-0 items-center justify-center bg-main text-on-main">
              <FolderGit2 className="size-5" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-text-primary">OpenATS</p>
              <p className="truncate text-xs text-text-secondary">Proyecto destacado</p>
            </div>
            <ExternalLink className="size-4 shrink-0 text-text-secondary" />
          </Link>
        </div>
      </PopoverContent>
    </Popover>
  );
}
