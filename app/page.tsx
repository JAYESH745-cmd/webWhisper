import Hero from '@/components/landing/hero'
import Navbar from '@/components/landing/nav'
import React from 'react'
import Feature from '@/components/feature'

const Page = () => {
  return (
    <div>
      <main className='w-full flex flex-col relative '>
        <Navbar/>
        <Hero/>
        <Feature/>
      </main>
    </div>
  )
}

export default Page
