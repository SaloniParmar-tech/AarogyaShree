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

      {/* -------- Hero (background image) -------- */}
      <main className="relative flex-1 overflow-hidden">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover  bg-no-repeat"
          style={{
            backgroundImage: `url(${BG_URL})`,
            filter: "contrast(0.96) saturate(0.9)",
            transformOrigin: "center",
            backgroundSize: "100%",
          }}
          aria-hidden="true"
        />

        {/* Soft pink overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-pink-100/80 via-pink-100/80 to-100/80" />

        {/* Content container */}
        <div className="relative max-w-6xl mx-auto px-6 md:px-8 lg:px-12 pt-14 pb-16 scale-[0.9] origin-top">

          {/* Headline */}
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-2xl md:text-3xl lg:text-5xl font-extrabold text-gray-900 leading-tight drop-shadow-sm ">
              Your trusted companion for <span className="text-pink-600">women&apos;s health</span>
            </h1>

            <p className="mt-7 text-gray-700 font-semibold text-md md:text-lg leading-relaxed drop-shadow-sm">
              Get personalized health assessments, find nearby clinics, and access trusted medical
              guidance — all in your preferred language.
            </p>

            <div className="mt-5 flex items-center justify-center gap-0 text-gray-800">
              <span className="text-2xl">👩🏽‍⚕️</span>
              <div className="font-semibold text-xl">Meet your Sakhi</div>
            </div>
          </div>

          {/* Sakhi Cards */}
          <div className="mt-7">
            <div className="flex flex-wrap justify-center gap-6">
              {/* Card 1 */}
              <div className="w-52 bg-white/90 backdrop-blur-sm rounded-xl shadow p-4 text-center">
                <div className="text-3xl">🧕</div>
                <div className="mt-3 font-semibold text-gray-800">Priya</div>
                <div className="mt-1 text-sm text-gray-600">Gentle and caring, speaks softly</div>
              </div>

              {/* Card 2 */}
              <div className="w-52 bg-white/90 backdrop-blur-sm rounded-xl shadow p-4 text-center">
                <div className="text-3xl">👩🏽‍⚕️</div>
                <div className="mt-3 font-semibold text-gray-800">Meera</div>
                <div className="mt-1 text-sm text-gray-600">Experienced and knowledgeable</div>
              </div>

              {/* Card 3 */}
              <div className="w-52 bg-white/90 backdrop-blur-sm rounded-xl shadow p-4 text-center">
                <div className="text-3xl">👩🏽‍🤝‍👩🏽</div>
                <div className="mt-3 font-semibold text-gray-800">Kavya</div>
                <div className="mt-1 text-sm text-gray-600">Friendly and encouraging</div>
              </div>

              {/* Card 4 */}
              <div className="w-52 bg-white/90 backdrop-blur-sm rounded-xl shadow p-4 text-center">
                <div className="text-3xl">👩🏾‍🦱</div>
                <div className="mt-3 font-semibold text-gray-800">Asha</div>
                <div className="mt-1 text-sm text-gray-600">Supportive and understanding</div>
              </div>
            </div>
          </div>

          {/* CTA pill (centered) */}
          <div className="mt-12 flex justify-center">
            <button
              onClick={() => navigate("/assessment")}
              className="inline-flex items-center gap-3 px-8 md:px-10 py-4 rounded-full bg-gradient-to-r from-pink-500 to-pink-600 text-white font-semibold shadow-2xl hover:scale-[1.01] transition-transform"
            >
              <span className="text-lg">❤</span>
              <span className="text-lg">Start My Health Assessment</span>
              <span className="ml-2 text-xl">→</span>
            </button>
          </div>

          {/* bottom spacing */}
        </div>
      </main>
      {/* -------- How can we help you -------- */}
<section className="bg-white py-16">
  <div className="max-w-6xl mx-auto px-6 md:px-8 lg:px-12">
    <h2 className="text-center text-2xl md:text-3xl font-semibold text-gray-800 mb-10">
      How can we help you today?
    </h2>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Card 1 */}
      <div className="rounded-xl bg-pink-100/60 p-5 shadow-sm hover:shadow-md transition">
        <div className="text-2xl mb-3">🔍</div>
        <h3 className="font-semibold text-gray-800">Start Health Assessment</h3>
        <p className="text-sm text-gray-600 mt-1">
          Answer questions about your health
        </p>
        <button className="mt-3 text-pink-600 text-sm font-medium">
          Get Started →
        </button>
      </div>

      {/* Card 2 */}
      <div className="rounded-xl bg-pink-100/60 p-5 shadow-sm hover:shadow-md transition">
        <div className="text-2xl mb-3">📊</div>
        <h3 className="font-semibold text-gray-800">View My Reports</h3>
        <p className="text-sm text-gray-600 mt-1">
          Check your previous assessments
        </p>
        <button className="mt-3 text-pink-600 text-sm font-medium">
          Get Started →
        </button>
      </div>

      {/* Card 3 */}
      <div className="rounded-xl bg-blue-100/60 p-5 shadow-sm hover:shadow-md transition">
        <div className="text-2xl mb-3">📍</div>
        <h3 className="font-semibold text-gray-800">Find Nearby Clinics</h3>
        <p className="text-sm text-gray-600 mt-1">
          Locate health centers near you
        </p>
        <button className="mt-3 text-pink-600 text-sm font-medium">
          Get Started →
        </button>
      </div>

      {/* Card 4 */}
      <div className="rounded-xl bg-green-100/60 p-5 shadow-sm hover:shadow-md transition">
        <div className="text-2xl mb-3">📘</div>
        <h3 className="font-semibold text-gray-800">Health Resources</h3>
        <p className="text-sm text-gray-600 mt-1">
          Learn about women’s health
        </p>
        <button className="mt-3 text-pink-600 text-sm font-medium">
          Get Started →
        </button>
      </div>
    </div>
  </div>
</section>


{/* -------- Why Choose Aarogya Sakhi -------- */}
<section className="bg-pink-50 py-20">
  <div className="max-w-6xl mx-auto px-6 md:px-8 lg:px-12 grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
    
    {/* Left content */}
    <div>
      <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-6">
        Why choose Aarogya Sakhi?
      </h2>

      <ul className="space-y-6">
  {/* Item 1 */}
  <li className="grid grid-cols-[48px_1fr] gap-4 items-center">
    <div className="w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center text-xl">
      🔒
    </div>
    <div>
      <div className="font-semibold text-gray-800">
        Complete Privacy
      </div>
      <div className="text-sm text-gray-600">
        Your health information stays confidential and secure
      </div>
    </div>
  </li>

  {/* Item 2 */}
  <li className="grid grid-cols-[48px_1fr] gap-4 items-center">
    <div className="w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center text-xl">
      🌐
    </div>
    <div>
      <div className="font-semibold text-gray-800">
        Local Language Support
      </div>
      <div className="text-sm text-gray-600">
        Available in Hindi, Marathi, Tamil, Telugu, and more
      </div>
    </div>
  </li>

  {/* Item 3 */}
  <li className="grid grid-cols-[48px_1fr] gap-4 items-center">
    <div className="w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center text-xl">
      🤖
    </div>
    <div>
      <div className="font-semibold text-gray-800">
        AI-Powered Insights
      </div>
      <div className="text-sm text-gray-600">
        Get personalized health recommendations based on your responses
      </div>
    </div>
  </li>

  {/* Item 4 */}
  <li className="grid grid-cols-[48px_1fr] gap-4 items-center">
    <div className="w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center text-xl">
      📩
    </div>
    <div>
      <div className="font-semibold text-gray-800">
        SMS Reminders
      </div>
      <div className="text-sm text-gray-600">
        Never miss important health checkups with gentle reminders
      </div>
    </div>
  </li>
</ul>

    </div>

    {/* Right image */}
    <div className="flex justify-center">
      <img
        src="https://i.postimg.cc/cHbW2jBM/25e52ee0dfb14f111ffdf2d15d0518d8.jpg"
        alt="Woman using phone"
        className="rounded-2xl shadow-md w-90 object-cover"
      />
    </div>
  </div>
</section>



{/* -------- Stats -------- */}
<section className="bg-white py-12">
  <div className="max-w-6xl mx-auto px-6 md:px-8 lg:px-12 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
    
    <div>
      <div className="text-xl font-bold text-pink-600">50,000+</div>
      <div className="text-sm text-gray-600">Women Helped</div>
    </div>

    <div>
      <div className="text-xl font-bold text-pink-600">95%</div>
      <div className="text-sm text-gray-600">Satisfaction Rate</div>
    </div>

    <div>
      <div className="text-xl font-bold text-pink-600">24/7</div>
      <div className="text-sm text-gray-600">Support Available</div>
    </div>

    <div>
      <div className="text-xl font-bold text-pink-600">6</div>
      <div className="text-sm text-gray-600">Languages Supported</div>
    </div>

  </div>
</section>

{/* -------- Footer -------- */}
<footer className="bg-gray-900 border-t border-pink-100">
  <div className="max-w-6xl mx-auto px-6 md:px-8 lg:px-12 py-12">
    
    {/* Top part */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
      
      {/* Brand */}
      <div>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-full bg-pink-600 flex items-center justify-center text-white shadow">
            🌸
          </div>
          <div className="text-xl font-semibold text-gray-100 hover:text-pink-600 [font-family:'Satisfy',cursive]">
            Aarogya Shree
          </div>
        </div>
        <p className="text-sm text-gray-300 leading-relaxed hover:text-pink-600">
          Your trusted companion for women’s health — providing personalized
          guidance, local support, and care in your preferred language.
        </p>
      </div>

      {/* Quick Links */}
      <div>
        <h4 className="text-sm font-semibold text-gray-300 mb-4">
          Quick Links
        </h4>
        <ul className="space-y-2 text-sm text-gray-300">
          <li className="hover:text-pink-600 cursor-pointer">Health Assessment</li>
          <li className="hover:text-pink-600 cursor-pointer">Find Clinics</li>
          <li className="hover:text-pink-600 cursor-pointer">Talk to Sakhi</li>
          <li className="hover:text-pink-600 cursor-pointer">Resources</li>
        </ul>
      </div>

      {/* Support */}
      <div>
        <h4 className="text-sm font-semibold text-gray-300 mb-4">
          Support
        </h4>
        <ul className="space-y-2 text-sm text-gray-300">
          <li className="hover:text-pink-600 cursor-pointer">Privacy Policy</li>
          <li className="hover:text-pink-600 cursor-pointer">Terms of Service</li>
          <li className="hover:text-pink-600 cursor-pointer">Contact Us</li>
          <li className="hover:text-pink-600 cursor-pointer">FAQs</li>
        </ul>
      </div>
    </div>

    {/* Divider */}
    <div className="mt-10 border-t border-pink-100 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
      
      <p className="text-xs text-gray-200 hover:text-pink-600">
        © {new Date().getFullYear()} Aarogya Shree. All rights reserved.
      </p>
    </div>
  </div>
</footer>

    </div>
  );
}
