import { useEffect, useState } from "react";
import clinicsData from "../data/clinics";
import { calculateDistance } from "../utils/calculateDistance";
import ClinicCard from "../components/find-clinics/ClinicCard";
import ClinicSkeleton from "../components/find-clinics/ClinicSkeleton";
import MapPanel from "../components/find-clinics/MapPanel";

export default function FindClinics() {
  const [userLocation, setUserLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeClinicId, setActiveClinicId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [distanceFilter, setDistanceFilter] = useState("All");
  const [languageFilter, setLanguageFilter] = useState("All");

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
        setLoading(false);
      },
      () => setLoading(false)
    );
  }, []);

  let clinics = clinicsData.map((c) => ({
    ...c,
    distance: userLocation
      ? calculateDistance(userLocation.lat, userLocation.lng, c.lat, c.lng)
      : null,
  }));

  /* ---------------- FILTER LOGIC ---------------- */
  if (typeFilter !== "All") {
    clinics = clinics.filter((c) => c.type === typeFilter);
  }

  if (languageFilter !== "All") {
    clinics = clinics.filter((c) => c.languages.includes(languageFilter));
  }

  if (distanceFilter !== "All") {
    clinics = clinics.filter(
      (c) => c.distance !== null && c.distance <= Number(distanceFilter)
    );
  }

  if (searchQuery.trim()) {
    const q = searchQuery.toLowerCase();
    clinics = clinics.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.address.toLowerCase().includes(q) ||
        c.services.some((s) => s.toLowerCase().includes(q))
    );
  }

  clinics.sort((a, b) => {
    // 1️⃣ Higher rating first
    if (a.rating && b.rating && a.rating !== b.rating) {
      return b.rating - a.rating;
    }

    // 2️⃣ If rating missing or equal, sort by distance
    return (a.distance ?? 999) - (b.distance ?? 999);
  });

  return (
    <div className="min-h-screen bg-pink-50">
      <div className="max-w-[76rem] mx-auto px-6 py-6">
        {/* ================= HEADER ================= */}
        <div className="text-center mb-5">
          <h1 className="text-3xl font-semibold text-pink-700">
            Find Clinics Near You
          </h1>
          <p className="text-sm font-semibold text-gray-600 mt-1">
            Verified hospitals, clinics, and ASHA workers for women’s healthcare
          </p>
        </div>

        {/* ================= SEARCH ================= */}
        <div className="mb-3 flex justify-center">
          <div className="relative w-full max-w-xl">
            <input
              type="text"
              placeholder="Search clinics, services, or area"
              className="w-full pl-4 pr-4 py-2.5 rounded-xl border border-pink-200 bg-white
                text-sm text-gray-700 placeholder-gray-400
                focus:outline-none focus:ring-2 focus:ring-pink-400"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* ================= FILTER ROW ================= */}
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {["All", "Hospital", "Clinic", "ASHA"].map((tab) => (
            <button
              key={tab}
              onClick={() => setTypeFilter(tab)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium ${
                typeFilter === tab
                  ? "bg-pink-600/80 text-white"
                  : "bg-white border border-pink-200 text-black/75 hover:bg-pink-200"
              }`}
            >
              {tab}
            </button>
          ))}

          <select
            value={distanceFilter}
            onChange={(e) => setDistanceFilter(e.target.value)}
            className="px-4 py-1.5 rounded-full text-sm bg-white border border-pink-200
                text-black/75 hover:bg-pink-200 focus:outline-none"
          >
            <option value="All">All Distances</option>
            <option value="5">Within 5 km</option>
            <option value="15">Within 15 km</option>
            <option value="25">Within 25 km</option>
          </select>

          <select
            value={languageFilter}
            onChange={(e) => setLanguageFilter(e.target.value)}
            className="px-4 py-1.5 rounded-full text-sm bg-white border border-pink-200
                text-black/75 hover:bg-pink-200 focus:outline-none"
          >
            <option value="All">All Languages</option>
            <option>Hindi</option>
            <option>English</option>
            <option>Marathi</option>
            <option>Tamil</option>
          </select>
        </div>

        {/* ================= LAYOUT ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* ===== LEFT: CLINICS ===== */}
          <div className="lg:col-span-8 space-y-4">
            {loading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <ClinicSkeleton key={i} />
              ))
            ) : clinics.length ? (
              clinics.map((c) => (
                <ClinicCard
                  key={c.id}
                  clinic={c}
                  onSelect={() => {}}
                  isActive={activeClinicId === c.id}
                  onHover={setActiveClinicId}
                />
              ))
            ) : (
              <div className="bg-white rounded-2xl border border-pink-200 shadow-sm p-10 text-center">
                <div className="text-4xl mb-3">🔍</div>
                <h3 className="text-lg font-semibold text-gray-800">
                  No clinics found
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  Try adjusting filters or expanding distance range.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setTypeFilter("All");
                    setDistanceFilter("All");
                    setLanguageFilter("All");
                  }}
                  className="mt-4 px-5 py-2 rounded-full bg-pink-600/80 text-white text-sm font-medium hover:bg-pink-600 transition"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>

          {/* ===== RIGHT: MAP + HELPLINES ===== */}
          <div className="lg:col-span-4 space-y-4 sticky top-24">
            <div className="bg-white rounded-2xl border border-pink-200 shadow-sm h-[340px] overflow-hidden">
              <MapPanel
                clinics={clinics}
                activeClinicId={activeClinicId}
                onMarkerSelect={setActiveClinicId}
              />
            </div>

            <div className="bg-white rounded-2xl p-5 shadow-sm border border-pink-200">
              <h3 className="font-semibold text-gray-800 mb-4">
                Emergency Contacts
              </h3>

              {[
                { title: "Women Helpline", desc: "24/7 support", num: "181" },
                {
                  title: "Health Helpline",
                  desc: "Medical assistance",
                  num: "104",
                },
                { title: "Ambulance", desc: "Emergency transport", num: "108" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center p-3 rounded-xl bg-red-50 border border-red-100 mb-2"
                >
                  <div>
                    <p className="text-sm font-medium text-gray-800">
                      {item.title}
                    </p>
                    <p className="text-xs text-gray-500">{item.desc}</p>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-red-500 text-white text-xs font-semibold">
                    {item.num}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
