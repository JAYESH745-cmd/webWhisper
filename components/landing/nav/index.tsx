"use client"
import React from 'react'
import Link from "next/link";


const Navbar = () => {
  return (
   
     <nav className="fixed top-0 inset-x-0 z-50 backdrop-blur-sm border-b border-white/5 bg-[#050509]">
  <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
    
    <button
    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    className="flex items-center gap-2 cursor-pointer"
  >
    <div className="w-5 h-5 bg-white rounded-sm flex items-center justify-center">
      <div className="w-2.5 h-2.5 bg-black rounded-[1px]" />
    </div>
    <span className="text-base font-bold tracking-tight text-white/90">
      webWhisper
    </span>
</button>


    <div className="hidden md:flex items-center gap-8 text-sm font-light text-zinc-400">
      <a href="#features"  className="hover:text-white transition-colors">
        Features
      </a>
      <a href="#how-it-works" className="hover:text-white transition-colors">
        Integration
      </a>
      <a href="#pricing" className="hover:text-white transition-colors">
        Pricing
      </a>
    </div>

    <div className="flex items-center gap-4">
      <Link
        href="/api/auth"
        className="text-xs font-medium text-zinc-400 hover:text-white"
      >
        Sign in
      </Link>

      <Link
        href="/api/auth"
        className="text-xs font-medium bg-white text-black px-4 py-2 rounded-md hover:bg-zinc-200"
      >
        Get started
      </Link>
    </div>

  </div>
</nav>

 
  )
}

export default Navbar
