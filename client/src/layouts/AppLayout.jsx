import React from 'react'
import Navbar from '../components/Navbar'

export default function AppLayout({children}) {
  return (
    <>
    <Navbar/>
    <main className='mt-16'>
      {children}
    </main>
    </>
  )
}
