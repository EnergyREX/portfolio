import { ComponentPropsWithoutRef, ReactNode } from 'react'
import { Button as ButtonPrimitive } from '@base-ui/react'
import Link from 'next/link'

type ButtonVariant = 'primary' | 'secondary'

interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
    children: ReactNode
    disabled?: boolean
    variant?: ButtonVariant
    // Renders the button as a link (internal or external) instead of a <button>.
    href?: string
    target?: string
    rel?: string
}

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary: 'border border-main bg-main text-on-main hover:opacity-90',
  secondary: 'border border-main bg-transparent text-main hover:bg-main hover:text-on-main',
}

const Button = ({ children, disabled, variant = 'primary', className, href, target, rel }: ButtonProps) => {
  const classes = `cta-btn inline-flex items-center justify-center px-7 py-3 font-mono text-xs uppercase tracking-[0.25em] transition-[color,background-color,border-color,opacity] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-main disabled:pointer-events-none disabled:opacity-50 ${VARIANT_CLASSES[variant]} ${className ?? ''}`

  if (href) {
    return (
      <ButtonPrimitive render={<Link href={href} target={target} rel={rel} />} className={classes}>
        {children}
      </ButtonPrimitive>
    )
  }

  return (
    <ButtonPrimitive disabled={disabled} className={classes}>
      {children}
    </ButtonPrimitive>
  )
}

export default Button