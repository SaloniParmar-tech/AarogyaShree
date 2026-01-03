import React, { useState } from "react";
import { resources } from "../assets/resources_data";

export default function Resources() {
  const [selected, setSelected] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");


  return (
    <div className="min-h-screen bg-pink-50">
      <div className="max-w-[76rem] mx-auto px-6 py-6">

        {/* Header */}
        <div className="text-center mb-5">
          <h1 className="text-3xl font-semibold text-pink-700">
            Health Resources
          </h1>
          <p className="text-sm font-semibold text-gray-600 mt-1">
            Trusted health information, schemes, and support for women
          </p>
        </div>
        {/* Search Bar */}
        <div className="mb-3 flex justify-center">
            <div className="relative w-full max-w-xl">
                <input
                type="text"
                placeholder="Search videos, articles, or schemes (e.g. PCOS, cervical, maternity)"
                className="w-full pl-4 pr-4 py-2.5 rounded-xl border border-pink-200 bg-white
                 text-sm text-gray-700 placeholder-gray-400
                 focus:outline-none focus:ring-2 focus:ring-pink-400"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                />

                {/* 
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    🔍
                </span> */}
            </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-5">
          {["All Resources", "Articles", "Videos", "Govt. Schemes", "Helplines" , "FAQs"].map(
            (tab, i) => (
              <button
                key={i}
                className={`px-4 py-1.5 rounded-full text-sm  ${
                  i === 0
                    ? "bg-pink-600/80 text-white font-medium"
                    : "bg-white border border-pink-200 text-black/75 hover:bg-pink-200 font-medium"
                }`}
              >
                {tab}
              </button>
            )
          )}
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

          {/* ================= LEFT SIDEBAR ================= */}
            <div className="lg:col-span-3 space-y-6 sticky top-24 h-fit">

            {/* Emergency Contacts */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-pink-200">
                <h3 className="font-semibold text-gray-800 mb-4">
                Emergency Contacts
                </h3>

                <div className="space-y-3">
                {[
                    { title: "National Women's Helpline", desc: "24/7 support for women", num: "181" },
                    { title: "Health Helpline", desc: "Medical emergency assistance", num: "104" },
                    { title: "Ambulance", desc: "Emergency medical transport", num: "108" },
                    { title: "Child Helpline", desc: "Child protection services", num: "1098" },
                ].map((item, i) => (
                    <div
                    key={i}
                    className="flex justify-between items-center p-3 rounded-xl bg-red-50 border border-red-100"
                    >
                    <div>
                        <p className="text-sm font-medium text-gray-800">
                        {item.title}
                        </p>
                        <p className="text-xs text-gray-500">
                        {item.desc}
                        </p>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-red-500 text-white text-xs font-semibold">
                        {item.num}
                    </span>
                    </div>
                ))}
                </div>
            </div>

            {/* Quick Links */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-pink-200">
                <h3 className="font-semibold text-gray-800 mb-4">
                Quick Links
                </h3>

                <div className="space-y-3">
                <div className="p-3 rounded-xl bg-pink-50 flex items-center gap-3">
                    🏥
                    <div>
                    <p className="text-sm font-medium">Find Hospitals</p>
                    <p className="text-xs text-gray-500">
                        Locate nearby healthcare facilities
                    </p>
                    </div>
                </div>

                <div className="p-3 rounded-xl bg-blue-50 flex items-center gap-3">
                    💊
                    <div>
                    <p className="text-sm font-medium">Medicine Guide</p>
                    <p className="text-xs text-gray-500">
                        Information about common medicines
                    </p>
                    </div>
                </div>

                <div className="p-3 rounded-xl bg-green-50 flex items-center gap-3">
                    🩺
                    <div>
                    <p className="text-sm font-medium">Health Checkup</p>
                    <p className="text-xs text-gray-500">
                        Schedule regular health screenings
                    </p>
                    </div>
                </div>
                </div>
            </div>
            </div>

          {/* ================= RIGHT CONTENT ================= */}
          <div className="lg:col-span-9 grid sm:grid-cols-2 gap-6">

           {resources.map((item) => (
  <div
    key={item.id}
    onClick={() => setSelected(item)}
    className="bg-white rounded-2xl p-5 shadow-sm border border-pink-100 cursor-pointer hover:shadow-md transition"
  >
    {/* Thumbnail wrapper */}
    <div className="relative w-full aspect-video bg-gray-200 rounded-lg overflow-hidden">
      
      {/* Type badge (overlapping thumbnail) */}
      <span
        className={`absolute top-3 left-3 z-10 text-xs px-3 py-1 rounded-full font-medium backdrop-blur-sm ${
          item.type === "video"
            ? "bg-purple-100/90 text-purple-700"
            : item.type === "article"
            ? "bg-blue-100/90 text-blue-700"
            : "bg-green-100/90 text-green-700"
        }`}
      >
        {item.type.toUpperCase()}
      </span>

      <img
        src={item.thumbnail}
        alt={item.title}
        onError={(e) => {
        e.currentTarget.src = "/thumbnails/video-placeholder.png";
        }}
        className="w-full h-full object-cover"
      />
    </div>

    <h3 className="mt-3 font-semibold text-gray-800">
      {item.title}
    </h3>

    <p className="text-sm text-gray-600 mt-1">
      {item.description}
    </p>

    {item.duration && (
      <p className="text-xs text-gray-500 mt-2">
        ⏱ {item.duration} • 🌐 {item.language}
      </p>
    )}
  </div>
))}

          </div>
        </div>
      </div>

      {/* ================= MODAL ================= */}
      {selected && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 relative">

            <button
              onClick={() => setSelected(null)}
              className="absolute top-3 right-4 text-gray-500 text-xl"
            >
              ✕
            </button>

            <h2 className="text-xl font-semibold mb-3">
              {selected.title}
            </h2>

            <p className="text-sm text-gray-600 mb-4">
              {selected.description}
            </p>

            {/* Video */}
            {selected.type === "video" && (
              <iframe
                className="w-full h-72 rounded-xl"
                src={selected.videoUrl}
                title={selected.title}
                allowFullScreen
              />
            )}

            {/* Article / Scheme */}
            {selected.link && (
              <a
                href={selected.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-4 text-pink-600 font-medium hover:underline"
              >
                Read full on {selected.source} →
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
