import { MapPin, Phone, Navigation, Clock } from "lucide-react";

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
          <span
            className="text-xs px-3 py-1 rounded-full
            bg-green-100 text-green-700 font-medium"
          >
            ✔ Verified
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

      {/* ================= ACCESSIBILITY ================= */}
      <div className="flex justify-between items-center mt-4 text-xs text-gray-500">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1">
            <Clock size={14} />
            {clinic.hours}
          </span>

          {clinic.languages && <span>🌐 {clinic.languages.join(", ")}</span>}
        </div>

        {/* Phone number aligned with time */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            navigator.clipboard.writeText(clinic.phone);
          }}
          className="flex items-center gap-1
            hover:text-pink-600 transition"
          title="Copy phone number"
        >
          <Phone size={14} />
          {clinic.phone}
        </button>
      </div>

      {/* ================= ACTIONS ================= */}
      <div className="flex justify-end gap-3 mt-4">
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
  );
}
