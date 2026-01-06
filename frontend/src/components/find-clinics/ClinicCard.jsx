export default function ClinicCard({
  clinic,
  onSelect,
  onBook,
  isActive,
  onHover,
}) {
  return (
    <div
      onClick={() => onSelect(clinic)}
      onMouseEnter={() => onHover?.(clinic.id)}
      onMouseLeave={() => onHover?.(null)}
      className={`bg-white rounded-2xl p-5 shadow-sm border
    cursor-pointer transition
    ${
      isActive
        ? "border-pink-400 shadow-md ring-2 ring-pink-200"
        : "border-pink-200 hover:shadow-md"
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
          <span className="text-pink-600 font-medium">
            📍 {clinic.distance.toFixed(1)} km away
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
      <div className="flex flex-wrap gap-4 mt-4 text-xs text-gray-500">
        <span>🕒 {clinic.hours}</span>
        {clinic.languages && <span>🌐 {clinic.languages.join(", ")}</span>}
      </div>

      {/* ================= ACTIONS ================= */}
      <div className="flex justify-between items-center mt-5">
        <a
          href={`https://www.google.com/maps/dir/?api=1&destination=${clinic.lat},${clinic.lng}`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="py-1.5 text-sm font-semibold
          text-pink-600/80 hover:text-pink-300 transition"
        >
          Get Directions
        </a>

        <div className="flex gap-2">
          <a
            href={`tel:${clinic.phone}`}
            onClick={(e) => e.stopPropagation()}
            className="px-4 py-1.5 rounded-full
            text-sm text-pink-600/80 border border-pink-200 font-medium
            hover:bg-pink-300 transition"
          >
            Call Now
          </a>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onBook?.(clinic);
            }}
            className="px-4 py-1.5 rounded-full
  border bg-pink-600/80 text-white text-sm font-medium
  hover:bg-pink-700 transition"
          >
            Book Appointment
          </button>
        </div>
      </div>
    </div>
  );
}
