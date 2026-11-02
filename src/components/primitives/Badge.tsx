import { ReactNode } from 'react'
import { Eyebrow } from './Typography';

interface props {
    children: ReactNode;
}

const Badge = ({ children }: props) => {
  return (
    <div className='border-2 border-soft p-1 px-4'><Eyebrow>{children}</Eyebrow></div>
  )
}

export default Badge