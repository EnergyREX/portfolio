import { cacheLife } from "next/cache";

/* El año sale del reloj del servidor, así que con Cache Components no puede
   leerse durante el prerender del layout. Aislado en su propio componente
   cacheado, se resuelve en build y se revalida a diario: el marco sigue
   siendo estático y el año no se queda obsoleto en enero. */
export default async function Colophon() {
  "use cache";
  cacheLife("days");

  return (
    <p className="pr-1 font-mono text-xs tracking-[0.15em] uppercase text-text-secondary">
      Francisco Javier Martín © {new Date().getFullYear()}
    </p>
  );
}
