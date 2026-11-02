'use client';

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { ToggleGroup } from "@base-ui/react/toggle-group";
import { Toggle } from "@base-ui/react/toggle";

type Theme = "dark" | "light";

const STORAGE_KEY = "theme";

function applyTheme(theme: Theme) {
  document.documentElement.setAttribute("data-theme", theme);
  window.localStorage.setItem(STORAGE_KEY, theme);
}

function originFromEvent(event: Event | undefined): { x: number; y: number } | null {
  if (event && "clientX" in event) {
    const { clientX, clientY } = event as MouseEvent;
    if (clientX !== 0 || clientY !== 0) return { x: clientX, y: clientY };
  }

  const button = event?.target instanceof HTMLElement ? event.target.closest("button") : null;
  if (button) {
    const rect = button.getBoundingClientRect();
    return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
  }

  return null;
}

function applyThemeWithReveal(theme: Theme, origin: { x: number; y: number } | null) {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (typeof document.startViewTransition !== "function" || reducedMotion) {
    applyTheme(theme);
    return;
  }

  const x = origin?.x ?? window.innerWidth / 2;
  const y = origin?.y ?? window.innerHeight / 2;
  const endRadius = Math.hypot(
    Math.max(x, window.innerWidth - x),
    Math.max(y, window.innerHeight - y),
  );

  const transition = document.startViewTransition(() => applyTheme(theme));

  transition.ready.then(() => {
    document.documentElement.animate(
      { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${endRadius}px at ${x}px ${y}px)`] },
      { duration: 500, easing: "ease-in-out", pseudoElement: "::view-transition-new(root)" },
    );
  });
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    const current = document.documentElement.getAttribute("data-theme");
    setTheme(current === "light" ? "light" : "dark");
  }, []);

  if (theme === null) return null;

  return (
    <ToggleGroup
      value={[theme]}
      onValueChange={(value, eventDetails) => {
        const next = value[0] as Theme | undefined;
        if (!next) return;
        applyThemeWithReveal(next, originFromEvent(eventDetails.event));
        setTheme(next);
      }}
      className="flex items-center gap-px border-t border-b border-soft"
    >
      <Toggle
        value="light"
        aria-label="Activar modo claro"
        className="flex flex-1 items-center justify-center gap-2 border border-transparent py-2 text-xs font-medium text-text-secondary transition hover:bg-surface-overlay hover:text-text-primary focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-main data-[pressed]:border-main data-[pressed]:bg-main data-[pressed]:text-on-main"
      >
        <Sun className="size-4" />
        Claro
      </Toggle>

      <Toggle
        value="dark"
        aria-label="Activar modo oscuro"
        className="flex flex-1 items-center justify-center gap-2 border border-transparent py-2 text-xs font-medium text-text-secondary transition hover:bg-surface-overlay hover:text-text-primary focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-main data-[pressed]:border-main data-[pressed]:bg-main data-[pressed]:text-on-main"
      >
        <Moon className="size-4" />
        Oscuro
      </Toggle>
    </ToggleGroup>
  );
}
