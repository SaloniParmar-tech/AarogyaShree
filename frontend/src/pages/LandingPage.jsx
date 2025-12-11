import React from "react";
import { useNavigate } from "react-router-dom";

/**
 * LandingPage.jsx
 * - Uses background image URL (full-width hero)
 * - Tailwind only (no external CSS files)
 * - Drop into src/pages/LandingPage.jsx (Vite + React + Tailwind)
 */

const BG_URL =
  "https://readdy.ai/api/search-image?query=Warm%20illustration%20of%20diverse%20Indian%20women%20in%20traditional%20clothing%20standing%20together%20in%20a%20rural%20setting%20with%20flowers%20and%20soft%20lighting%2C%20peaceful%20village%20background%20with%20traditional%20huts%20and%20green%20fields%2C%20soft%20pastel%20colors%2C%20gentle%20and%20welcoming%20atmosphere%2C%20digital%20art%20style%2C%20inspiring%20and%20empowering%20mood&width=1200&height=600&seq=hero-women-unity&orientation=landscape";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      {/* -------- Header -------- */}
      <header className="w-full bg-white/80 backdrop-blur-sm border-b border-pink-100">
        <div className="max-w-6xl mx-auto px-6 md:px-8 lg:px-12">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-3 ">
              <div className="w-10 h-10 rounded-full bg-pink-500 flex items-center justify-center text-white font-bold shadow">
                🌸
              </div>
              <div className="text-2xl font-semibold text-gray-800">Aarogya Sakhi</div>
            </div>

            {/* Nav Links */}
            <nav className="hidden md:flex gap-8 text-gray-600">
              <a className="hover:text-pink-600 transition" href="#">Assessment</a>
              <a className="hover:text-pink-600 transition" href="#">Dashboard</a>
              <a className="hover:text-pink-600 transition" href="#">Talk to Sakhi</a>
              <a className="hover:text-pink-600 transition" href="#">Find Clinics</a>
              <a className="hover:text-pink-600 transition" href="#">Resources</a>
              <a className="hover:text-pink-600 transition" href="#">Community</a>
            </nav>

            {/* Language / small CTA */}
            <div className="flex items-center gap-4">
              <button className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 bg-white text-sm">
                English <span className="ml-1 text-gray-400">▾</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* -------- Hero (background image) -------- */}
      <main className="relative flex-1">
        {/* Background image */}
        <div
          className="bg-cover bg-center absolute inset-0 bg-gradient-to-r from-pink-100/50 to-rose-100/50"
          style={{
            backgroundImage: `url(${BG_URL})`,
            filter: "contrast(0.96) saturate(0.9)",
          }}
          aria-hidden="true"
        />

        {/* Soft pink overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-pink-50/70 via-pink-50/60 to-transparent" />

        {/* Content container */}
        <div className="relative max-w-6xl mx-auto px-6 md:px-8 lg:px-12 pt-20 pb-24">
          {/* Headline */}
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight drop-shadow-sm">
              Your trusted companion for <span className="text-pink-600">women&apos;s health</span>
            </h1>

            <p className="mt-6 text-gray-700 text-base md:text-lg">
              Get personalized health assessments, find nearby clinics, and access trusted medical
              guidance — all in your preferred language.
            </p>

            <div className="mt-6 flex items-center justify-center gap-3 text-gray-800">
              <span className="text-2xl">👩🏽‍⚕️</span>
              <div className="font-semibold">Meet your Sakhi</div>
            </div>
          </div>

          {/* Sakhi Cards */}
          <div className="mt-10">
            <div className="flex flex-wrap justify-center gap-6">
              {/* Card 1 */}
              <div className="w-52 bg-white/90 backdrop-blur-sm rounded-xl shadow p-4 text-center">
                <div className="text-3xl">🧕</div>
                <div className="mt-3 font-semibold text-gray-800">Priya</div>
                <div className="mt-1 text-sm text-gray-500">Gentle and caring, speaks softly</div>
              </div>

              {/* Card 2 */}
              <div className="w-52 bg-white/90 backdrop-blur-sm rounded-xl shadow p-4 text-center">
                <div className="text-3xl">👩🏽‍⚕️</div>
                <div className="mt-3 font-semibold text-gray-800">Meera</div>
                <div className="mt-1 text-sm text-gray-500">Experienced and knowledgeable</div>
              </div>

              {/* Card 3 */}
              <div className="w-52 bg-white/90 backdrop-blur-sm rounded-xl shadow p-4 text-center">
                <div className="text-3xl">👩🏽‍🤝‍👩🏽</div>
                <div className="mt-3 font-semibold text-gray-800">Kavya</div>
                <div className="mt-1 text-sm text-gray-500">Friendly and encouraging</div>
              </div>

              {/* Card 4 */}
              <div className="w-52 bg-white/90 backdrop-blur-sm rounded-xl shadow p-4 text-center">
                <div className="text-3xl">👩🏾‍🦱</div>
                <div className="mt-3 font-semibold text-gray-800">Asha</div>
                <div className="mt-1 text-sm text-gray-500">Supportive and understanding</div>
              </div>
            </div>
          </div>

          {/* CTA pill (centered) */}
          <div className="mt-12 flex justify-center">
            <button
              onClick={() => navigate("/assessment/age")}
              className="inline-flex items-center gap-3 px-8 md:px-10 py-4 rounded-full bg-gradient-to-r from-pink-500 to-pink-600 text-white font-semibold shadow-2xl hover:scale-[1.01] transition-transform"
            >
              <span className="text-lg">❤</span>
              <span className="text-lg">Start My Health Assessment</span>
              <span className="ml-2 text-xl">→</span>
            </button>
          </div>

          {/* bottom spacing */}
          <div className="h-12" />
        </div>
      </main>
    </div>
  );
}
