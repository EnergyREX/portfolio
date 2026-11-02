import React, { ReactNode } from 'react'

interface EyebrowProps extends React.ComponentPropsWithoutRef<'p'> {
  children: ReactNode
}

export const Eyebrow = ({ children, className, ...props }: EyebrowProps) => (
  <p
    className={`font-mono text-xs uppercase tracking-[0.25em] text-main ${className ?? ''}`}
    {...props}
  >
    {children}
  </p>
)

interface DisplayProps extends React.ComponentPropsWithoutRef<'h1'> {
  children: ReactNode
}

export const Display = ({ children, className, ...props }: DisplayProps) => (
  <h1
    className={`font-display text-5xl sm:text-7xl lg:text-[10rem] font-bold leading-[1.02] tracking-[-0.02em] text-balance text-text-primary ${className ?? ''}`}
    {...props}
  >
    {children}
  </h1>
)

export const DisplayH2 = ({ children, className, ...props }: DisplayProps) => (
  <h1
    className={`font-display text-3xl sm:text-5xl lg:text-[5rem] font-bold leading-[1.02] tracking-[-0.02em] text-balance text-text-primary ${className ?? ''}`}
    {...props}
  >
    {children}
  </h1>
)

interface DisplayBodyProps extends React.ComponentPropsWithoutRef<'p'> {
  children: ReactNode
}

/* Párrafo de entrada: es texto corrido, no display. Interlínea holgada,
   medida acotada y peso normal; el contraste con el titular lo da el
   tamaño, no la tipografía. */
export const DisplayBody = ({ children, className, ...props }: DisplayBodyProps) => (
  <p
    className={`font-sans max-w-2xl text-lg sm:text-xl lg:text-2xl leading-[1.35] text-text-secondary text-pretty ${className ?? ''}`}
    {...props}
  >
    {children}
  </p>
)

interface HeadingProps extends React.ComponentPropsWithoutRef<'h2'> {
  children: ReactNode
}

export const Heading = ({ children, className, ...props }: HeadingProps) => (
  <h2
    className={`font-display text-xl sm:text-2xl leading-tight tracking-[-0.01em] text-text-primary ${className ?? ''}`}
    {...props}
  >
    {children}
  </h2>
)

interface LeadProps extends React.ComponentPropsWithoutRef<'p'> {
  children: ReactNode
}

export const Lead = ({ children, className, ...props }: LeadProps) => (
  <p
    className={`font-sans text-lg leading-relaxed text-text-secondary text-pretty ${className ?? ''}`}
    {...props}
  >
    {children}
  </p>
)

interface BodyProps extends React.ComponentPropsWithoutRef<'p'> {
  children: ReactNode
}

export const Body = ({ children, className, ...props }: BodyProps) => (
  <p
    className={`font-sans text-base text-text-secondary leading-7 text-pretty ${className ?? ''}`}
    {...props}
  >
    {children}
  </p>
)

interface ProseProps extends React.ComponentPropsWithoutRef<'p'> {
  children: ReactNode
}

/* Texto corrido de lectura larga (posts, páginas de experiencia). Es más
   grande y más contrastado que `Body`, que sigue siendo el de las tarjetas:
   en un artículo el párrafo es el contenido principal, no texto de apoyo. */
export const Prose = ({ children, className, ...props }: ProseProps) => (
  <p
    className={`font-sans text-lg leading-8 text-text-primary text-pretty ${className ?? ''}`}
    {...props}
  >
    {children}
  </p>
)

interface CodeProps extends React.ComponentPropsWithoutRef<'code'> {
  children: ReactNode
}

export const CodeSM = ({ children, className, ...props }: CodeProps) => (
  <code
    className={`font-mono text-xs bg-surface-overlay text-text-primary px-1.5 py-0.5 rounded ${className ?? ''}`}
    {...props}
  >
    {children}
  </code>
)