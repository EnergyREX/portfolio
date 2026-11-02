import React, { ReactNode } from 'react'
import TopBar from './TopBar'

interface props {
  children: ReactNode
}

const AppShell = ({ children }: props) => {
  return (
    <>
      <div className='pointer-events-none fixed inset-0 z-20 flex flex-col border border-neutral-800' />
      <div className='fixed inset-0 z-10 flex flex-col bg-slate-950'>
        <TopBar />
        {children}
      </div>
    </>
  )
}

export default AppShell