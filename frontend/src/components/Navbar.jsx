import React from "react";

export default function Navbar() {
  return (
   <header className="sticky bg-pink-100/50 top-0 z-50 w-full backdrop-blur-md backdrop-saturate-90 
  border-b border-white/30">
      <div className="max-w-6xl mx-auto px-6 md:px-8 lg:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-pink-600 flex items-center justify-center text-white font-bold shadow">
              🌸
            </div>
            <div className="text-3xl text-gray-900 font-bold [font-family:'Satisfy',cursive]">
  Aarogya Shree
</div>


          </div>

          {/* Nav Links */}
          <nav className="hidden md:flex gap-8 text-gray-700 text-sm font-medium">
            <a className="hover:text-pink-600 transition" href="#">
              Assessment
            </a>
            <a className="hover:text-pink-600 transition" href="#">
              Dashboard
            </a>
            <a className="hover:text-pink-600 transition" href="#">
              Talk to Sakhi
            </a>
            <a className="hover:text-pink-600 transition" href="#">
              Find Clinics
            </a>
            <a className="hover:text-pink-600 transition" href="#">
              Resources
            </a>
            <a className="hover:text-pink-600 transition" href="#">
              Community
            </a>
          </nav>

          {/* Language selector */}
          <div className="flex items-center gap-4">
            <button className="hidden md:inline-flex items-center gap-1 px-4 py-1 rounded-full border border-gray-200 bg-white text-sm">
              English
              <span className="ml-1 text-gray-400 text-sm font-medium">▾</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
