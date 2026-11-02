import Image from 'next/image'

export const ProjectImage = ({ name, src }: { name: string; src?: string }) => (
  <div className="relative -mx-6 -mt-8 aspect-video w-[calc(100%+3rem)] min-h-56 self-start overflow-hidden bg-background sm:mx-0 sm:-mt-10 sm:mr-[-2rem] sm:w-[calc(100%+2rem)] sm:min-h-64">
    {src ? (
      <Image
        src={src}
        alt={`Captura de ${name}`}
        fill
        sizes="(min-width: 1280px) 45vw, (min-width: 640px) 50vw, 100vw"
        className="object-cover object-top"
      />
    ) : (
      <div
        aria-hidden
        className="flex size-full items-center justify-center bg-soft font-mono text-xs uppercase tracking-[0.15em] text-text-secondary"
      >
        {name.slice(0, 2)}
      </div>
    )}
  </div>
)
