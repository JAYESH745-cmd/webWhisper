import Hero from '@/components/landing/hero'
import Navbar from '@/components/landing/nav'
import React from 'react'
import Feature from '@/components/landing/feature'
import Integration from '@/components/landing/integration'
import Pricing from '@/components/landing/pricing'
import Footer from '@/components/landing/footer'

const Page = () => {
  return (
    <div>
      <main className='w-full flex flex-col relative '>
        <Navbar/>
        <Hero/>
        <Feature/>
        <Integration/>
        <Pricing/>
        <Footer/>
      </main>
    </div>
  )
}

export default Page
