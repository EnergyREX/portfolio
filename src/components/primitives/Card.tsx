import React, { ComponentPropsWithoutRef, ReactNode } from 'react'

interface CardProps extends ComponentPropsWithoutRef<'div'> {
  children?: ReactNode
}

const Card = ({ children, className }: CardProps) => {
  return (
    <div className={`${className} bg-neutral-900/30 border-border border rounded-lg shadow shadow-black dark:shadow-neutral-300 dark:border-neutral-600 p-3`}>
        {children}
    </div>
  )
}

export default Card