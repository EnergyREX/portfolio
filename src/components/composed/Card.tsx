import React, { ReactNode } from 'react'

interface props {
    children: ReactNode
    className?: string
}

const Card = ({ children, className }: props) => {
  return (
    <article className={`w-full h-full bg-background px-6 py-8 sm:px-8 sm:py-10 ${className ?? ""}`}>
        {children}
    </article>
  )
}

export default Card