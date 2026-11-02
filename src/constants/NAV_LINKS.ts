import { type LucideIcon } from "lucide-react";

interface NavLink {
  href: string;
  label: string;
  icon?: LucideIcon;
}

export const NAV_LINKS: NavLink[] = [
  { href: "/", label: "Inicio" },
  { href: "/blog", label: "Blog" },
  { href: "/projects", label: "Proyectos" },
];
