import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="border-t border-white/5 bg-[#050509]">
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between text-sm text-zinc-500">

        {/* Left: Brand */}
        <div className="flex items-center gap-2 text-zinc-300">
          <div className="w-4 h-4 bg-white rounded-sm flex items-center justify-center">
            <div className="w-2 h-2 bg-black rounded-[1px]" />
          </div>
          <span className="font-medium">webWhisper</span>
        </div>

        {/* Center: Links */}
        <div className="flex items-center gap-6">
          <Link href="/privacy" className="hover:text-white transition">
            Privacy
          </Link>
          <Link href="/terms" className="hover:text-white transition">
            Terms
          </Link>
        </div>

        {/* Right: Copyright */}
        <div className="text-zinc-600">
          © {new Date().getFullYear()}. All rights reserved.
        </div>

      </div>
    </footer>
  );
};

export default Footer;
