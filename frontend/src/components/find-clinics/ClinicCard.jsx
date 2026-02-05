import { MapPin, Phone, Navigation, Clock, ShieldCheck } from "lucide-react";

export default function ClinicCard({ clinic, onSelect, isActive, onHover }) {
  return (
    <div
      onClick={() => onSelect(clinic)}
      onMouseEnter={() => onHover?.(clinic.id)}
      onMouseLeave={() => onHover?.(null)}
      className={`bg-white rounded-2xl p-5 border border-pink-200
        cursor-pointer transition-all duration-300 ease-out
        ${
          isActive
            ? "shadow-xl scale-[1.015]"
            : "shadow-sm hover:shadow-lg hover:scale-[1.01]"
        }`}
    >
      {/* ================= IDENTITY ================= */}
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold text-gray-800">{clinic.name}</h3>
          <p className="text-sm text-gray-500">{clinic.address}</p>
        </div>

        {clinic.verified && (
          <span className="flex items-center gap-1 text-xs text-green-700">
            <ShieldCheck size={14} />
            Verified
          </span>
        )}
      </div>

      {/* ================= TRUST & PROXIMITY ================= */}
      <div className="flex items-center gap-4 mt-3 text-sm">
        {clinic.distance !== null && (
          <span className="flex items-center gap-1 text-pink-600 font-medium">
            <MapPin size={14} />
            {clinic.distance.toFixed(1)} km
          </span>
        )}
        {clinic.rating && (
          <span className="text-gray-500">⭐ {clinic.rating}</span>
        )}
      </div>

      {/* ================= SERVICES ================= */}
      <div className="flex flex-wrap gap-2 mt-4">
        {clinic.services.slice(0, 2).map((service) => (
          <span
            key={service}
            className="px-3 py-1 rounded-full
              bg-pink-50 text-xs text-pink-700"
          >
            {service}
          </span>
        ))}
        {clinic.services.length > 2 && (
          <span className="text-xs text-gray-500">+ more</span>
        )}
      </div>

      {/* ================= ACCESSIBILITY + ACTIONS ================= */}
      <div className="flex justify-between items-center mt-4">
        {/* Left: Time + Language */}
        <div className="flex items-center gap-4 text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <Clock size={14} />
            {clinic.hours}
          </span>

          {clinic.languages && <span>🌐 {clinic.languages.join(", ")}</span>}
        </div>

        {/* Right: Buttons */}
        <div className="flex gap-3">
          <a
            href={`https://www.google.com/maps/dir/?api=1&destination=${clinic.lat},${clinic.lng}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="px-5 py-2 rounded-full
        text-sm font-medium border border-pink-200
        text-pink-600 hover:bg-pink-100 transition
        flex items-center gap-2"
          >
            <Navigation size={16} />
            Get Directions
          </a>

          <a
            href={`tel:${clinic.phone}`}
            onClick={(e) => e.stopPropagation()}
            className="px-5 py-2 rounded-full
        bg-pink-600/80 text-white text-sm font-medium
        hover:bg-pink-600 transition"
          >
            Call Now
          </a>
        </div>
      </div>
    </div>
  );
}
