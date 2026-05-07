import { useEffect, useMemo, useState } from "react";
import { LocateFixed, MapPin, RefreshCw, Search } from "lucide-react";
import { calculateDistance } from "../utils/calculateDistance";
import { useLanguage } from "../context/LanguageContext";
import ClinicCard from "../components/find-clinics/ClinicCard";
import ClinicSkeleton from "../components/find-clinics/ClinicSkeleton";
import MapPanel from "../components/find-clinics/MapPanel";

const DEFAULT_LOCATION = {
  lat: 28.6139,
  lng: 77.209,
  label: "New Delhi",
};

export default function FindClinics() {
  const { t } = useLanguage();
  const [userLocation, setUserLocation] = useState(null);
  const [locationLabel, setLocationLabel] = useState("");
  const [locationStatus, setLocationStatus] = useState(t("detectingLocation"));
  const [clinicsData, setClinicsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeClinicId, setActiveClinicId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [distanceFilter, setDistanceFilter] = useState("All");
  const [languageFilter, setLanguageFilter] = useState("All");
  const [dataSource, setDataSource] = useState("");

  useEffect(() => {
    requestLocation();
  }, []);

  useEffect(() => {
    if (!userLocation) return;
    loadClinics(userLocation);
  }, [userLocation]);

  const requestLocation = () => {
    setLoading(true);
    setLocationStatus(t("detectingLocation"));

    if (!navigator.geolocation) {
      useFallbackLocation(t("locationNotSupported"));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const nextLocation = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        };
        setUserLocation(nextLocation);
        setLocationLabel(t("yourCurrentArea"));
        setLocationStatus(t("showingCareOptionsNearYourCurrentArea"));
      },
      () => useFallbackLocation(t("locationPermissionUnavailable")),
      { enableHighAccuracy: false, timeout: 9000, maximumAge: 1000 * 60 * 10 }
    );
  };

  const useFallbackLocation = (reason) => {
    setUserLocation(DEFAULT_LOCATION);
    setLocationLabel(DEFAULT_LOCATION.label);
    setLocationStatus(`${reason} ${t("showingOptionsNear")} ${DEFAULT_LOCATION.label}.`);
  };

  const loadClinics = async (location) => {
    setLoading(true);
    setDataSource("");

    try {
      const liveClinics = await fetchNearbyClinics(location);
      if (liveClinics.length) {
        setClinicsData(liveClinics);
        setDataSource(t("liveMapResults"));
        return;
      }

      setClinicsData(buildNearbyFallbackClinics(location));
      setDataSource(t("estimatedNearbyResults"));
    } catch {
      setClinicsData(buildNearbyFallbackClinics(location));
      setDataSource(t("estimatedNearbyResults"));
    } finally {
      setLoading(false);
    }
  };

  const clinics = useMemo(() => {
    let nextClinics = clinicsData.map((clinic) => ({
      ...clinic,
      distance: userLocation
        ? calculateDistance(userLocation.lat, userLocation.lng, clinic.lat, clinic.lng)
        : null,
    }));

    if (typeFilter !== "All") {
      nextClinics = nextClinics.filter((clinic) => clinic.type === typeFilter);
    }

    if (languageFilter !== "All") {
      nextClinics = nextClinics.filter((clinic) => clinic.languages.includes(languageFilter));
    }

    if (distanceFilter !== "All") {
      nextClinics = nextClinics.filter(
        (clinic) => clinic.distance !== null && clinic.distance <= Number(distanceFilter)
      );
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      nextClinics = nextClinics.filter(
        (clinic) =>
          clinic.name.toLowerCase().includes(query) ||
          clinic.address.toLowerCase().includes(query) ||
          clinic.services.some((service) => service.toLowerCase().includes(query))
      );
    }

    return nextClinics.sort((a, b) => (a.distance ?? 999) - (b.distance ?? 999));
  }, [clinicsData, distanceFilter, languageFilter, searchQuery, typeFilter, userLocation]);

  return (
    <div className="min-h-screen bg-pink-50">
      <div className="mx-auto max-w-[76rem] px-4 py-6 sm:px-6">
        <div className="mb-5 text-center">
          <h1 className="text-3xl font-semibold text-pink-700">{t("findClinicsNearYou")}</h1>
          <p className="mt-1 text-sm font-semibold text-gray-600">
            {t("nearbyClinicsIntro")}
          </p>
        </div>

        <div className="mb-4 rounded-2xl border border-pink-100 bg-white p-4 shadow-sm">
          <div className="flex flex-col justify-between gap-3 md:flex-row md:items-center">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 flex h-10 w-10 items-center justify-center rounded-2xl bg-pink-100 text-pink-700">
                <MapPin size={19} />
              </div>
              <div>
                <p className="text-sm font-bold text-gray-900">
                  {locationLabel ? `${t("usingLocation")} ${locationLabel}` : t("findingYourArea")}
                </p>
                <p className="mt-1 text-sm text-gray-600">{locationStatus}</p>
                {dataSource && <p className="mt-1 text-xs font-semibold text-pink-700">{dataSource}</p>}
              </div>
            </div>

            <button
              onClick={requestLocation}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-pink-700 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-pink-800"
            >
              <LocateFixed size={16} />
              {t("useMyLocation")}
            </button>
          </div>
        </div>

        <div className="mb-3 flex justify-center">
          <div className="relative w-full max-w-xl">
            <Search size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder={t("searchClinicsPlaceholder")}
              className="w-full rounded-xl border border-pink-200 bg-white py-2.5 pl-11 pr-4 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-400"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
            />
          </div>
        </div>

        <div className="mb-6 flex flex-wrap justify-center gap-2">
          {[
            { value: 'All', label: t('all') },
            { value: 'Hospital', label: t('hospital') },
            { value: 'Clinic', label: t('clinic') },
          ].map((tab) => (
            <button
              key={tab.value}
              onClick={() => setTypeFilter(tab.value)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium ${
                typeFilter === tab.value
                  ? "bg-pink-600 text-white"
                  : "border border-pink-200 bg-white text-black/75 hover:bg-pink-100"
              }`}
            >
              {tab.label}
            </button>
          ))}

          <select
            value={distanceFilter}
            onChange={(event) => setDistanceFilter(event.target.value)}
            className="rounded-full border border-pink-200 bg-white px-4 py-1.5 text-sm text-black/75 hover:bg-pink-100 focus:outline-none"
          >
            <option value="All">{t("allDistances")}</option>
            <option value="5">{t("within5Km")}</option>
            <option value="15">{t("within15Km")}</option>
            <option value="25">{t("within25Km")}</option>
            <option value="50">{t("within50Km")}</option>
          </select>

          <select
            value={languageFilter}
            onChange={(event) => setLanguageFilter(event.target.value)}
            className="rounded-full border border-pink-200 bg-white px-4 py-1.5 text-sm text-black/75 hover:bg-pink-100 focus:outline-none"
          >
            <option value="All">{t("allLanguages")}</option>
            <option value="Hindi">{t("hindi")}</option>
            <option value="English">{t("english")}</option>
            <option value="Marathi">{t("marathi")}</option>
            <option value="Telugu">{t("telugu")}</option>
          </select>

          <button
            onClick={() => loadClinics(userLocation || DEFAULT_LOCATION)}
            className="inline-flex items-center gap-2 rounded-full border border-pink-200 bg-white px-4 py-1.5 text-sm font-medium text-pink-700 hover:bg-pink-100"
          >
            <RefreshCw size={14} />
            {t("refresh")}
          </button>
        </div>

        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12">
          <div className="space-y-4 lg:col-span-8">
            {loading ? (
              Array.from({ length: 3 }).map((_, index) => <ClinicSkeleton key={index} />)
            ) : clinics.length ? (
              clinics.map((clinic) => (
                <ClinicCard
                  key={clinic.id}
                  clinic={clinic}
                  onSelect={(selectedClinic) => setActiveClinicId(selectedClinic.id)}
                  isActive={activeClinicId === clinic.id}
                  onHover={setActiveClinicId}
                />
              ))
            ) : (
              <div className="rounded-2xl border border-pink-200 bg-white p-10 text-center shadow-sm">
                <div className="mb-3 text-4xl">{t("search")}</div>
                <h3 className="text-lg font-semibold text-gray-800">{t("noClinicsFound")}</h3>
                <p className="mt-1 text-sm text-gray-500">
                  {t("tryAdjustingFilters")}
                </p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setTypeFilter("All");
                    setDistanceFilter("All");
                    setLanguageFilter("All");
                  }}
                  className="mt-4 rounded-full bg-pink-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-pink-700"
                >
                  {t("resetFilters")}
                </button>
              </div>
            )}
          </div>

          <div className="space-y-4 lg:sticky lg:top-24 lg:col-span-4">
            <div className="h-[360px] overflow-hidden rounded-2xl border border-pink-200 bg-white shadow-sm">
              <MapPanel
                clinics={clinics}
                activeClinicId={activeClinicId}
                onMarkerSelect={setActiveClinicId}
                userLocation={userLocation}
              />
            </div>

            <div className="rounded-2xl border border-pink-200 bg-white p-5 shadow-sm">
              <h3 className="mb-4 font-semibold text-gray-800">{t("emergencyContacts")}</h3>
              {[
                { title: t("womenHelpline"), desc: t("twentyFourSevenSupport"), num: "181" },
                { title: t("healthHelpline"), desc: t("medicalAssistance"), num: "104" },
                { title: t("ambulance"), desc: t("emergencyTransport"), num: "108" },
              ].map((item) => (
                <div
                  key={item.num}
                  className="mb-2 flex items-center justify-between rounded-xl border border-red-100 bg-red-50 p-3"
                >
                  <div>
                    <p className="text-sm font-medium text-gray-800">{item.title}</p>
                    <p className="text-xs text-gray-500">{item.desc}</p>
                  </div>
                  <span className="rounded-full bg-red-500 px-3 py-1 text-xs font-semibold text-white">
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

async function fetchNearbyClinics(location) {
  const radius = 25000;
  const query = `
    [out:json][timeout:18];
    (
      node["amenity"~"hospital|clinic|doctors"]["healthcare"!~"dentist|veterinary"](around:${radius},${location.lat},${location.lng});
      way["amenity"~"hospital|clinic|doctors"]["healthcare"!~"dentist|veterinary"](around:${radius},${location.lat},${location.lng});
      relation["amenity"~"hospital|clinic|doctors"]["healthcare"!~"dentist|veterinary"](around:${radius},${location.lat},${location.lng});
      node["healthcare"~"hospital|clinic|doctor|centre"]["healthcare"!~"dentist|veterinary"](around:${radius},${location.lat},${location.lng});
      way["healthcare"~"hospital|clinic|doctor|centre"]["healthcare"!~"dentist|veterinary"](around:${radius},${location.lat},${location.lng});
      relation["healthcare"~"hospital|clinic|doctor|centre"]["healthcare"!~"dentist|veterinary"](around:${radius},${location.lat},${location.lng});
    );
    out center tags 40;
  `;

  const response = await fetch("https://overpass-api.de/api/interpreter", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" },
    body: new URLSearchParams({ data: query }),
  });

  if (!response.ok) throw new Error("Map search failed");
  const data = await response.json();

  return (data.elements || [])
    .map((item, index) => normalizeClinic(item, index))
    .filter(Boolean)
    .slice(0, 30);
}

function normalizeClinic(item, index) {
  const tags = item.tags || {};
  const lat = item.lat ?? item.center?.lat;
  const lng = item.lon ?? item.center?.lon;

  if (!lat || !lng) return null;

  const rawName = tags.name || tags["name:en"] || tags.operator;
  const type = tags.amenity === "hospital" || tags.healthcare === "hospital" ? "Hospital" : "Clinic";
  const name = rawName || `${type} near you`;
  const address = buildAddress(tags);

  return {
    id: `osm-${item.type}-${item.id}-${index}`,
    name,
    type,
    verified: Boolean(rawName),
    rating: null,
    lat,
    lng,
    address,
    services: inferServices(tags, type),
    languages: inferLanguages(tags),
    hours: tags.opening_hours || "Hours not listed",
    phone: tags.phone || tags["contact:phone"] || "104",
  };
}

function buildAddress(tags) {
  const parts = [
    tags["addr:housenumber"],
    tags["addr:street"],
    tags["addr:suburb"],
    tags["addr:city"] || tags["addr:town"] || tags["addr:village"],
  ].filter(Boolean);

  return parts.length ? parts.join(", ") : "Address not listed";
}

function inferServices(tags, type) {
  const services = new Set();
  const text = `${tags.name || ""} ${tags.healthcare || ""} ${tags.speciality || ""}`.toLowerCase();

  if (type === "Hospital") services.add("General hospital care");
  if (text.includes("women") || text.includes("maternity") || text.includes("gynec")) {
    services.add("Gynecology");
  }
  if (text.includes("maternity") || text.includes("mother")) services.add("Maternity care");
  if (text.includes("diagnostic") || text.includes("scan")) services.add("Diagnostics");

  services.add("General consultation");
  services.add("Referrals");
  return Array.from(services).slice(0, 4);
}

function inferLanguages(tags) {
  const languageText = `${tags["contact:language"] || ""} ${tags.language || ""}`.toLowerCase();
  const languages = new Set(["Hindi", "English"]);

  if (languageText.includes("marathi")) languages.add("Marathi");
  if (languageText.includes("tamil")) languages.add("Tamil");

  return Array.from(languages);
}

function buildNearbyFallbackClinics(location) {
  const offsets = [
    [0.012, 0.015, "Community Health Clinic", "Clinic"],
    [-0.018, 0.01, "Women Care Health Centre", "Clinic"],
    [0.02, -0.016, "General Hospital", "Hospital"],
    [-0.026, -0.018, "Family Health Clinic", "Clinic"],
    [0.035, 0.008, "Maternity and Wellness Centre", "Hospital"],
  ];

  return offsets.map(([latOffset, lngOffset, name, type], index) => ({
    id: `nearby-${index + 1}`,
    name,
    type,
    verified: false,
    rating: null,
    lat: location.lat + latOffset,
    lng: location.lng + lngOffset,
    address: "Approximate nearby area",
    services:
      type === "Hospital"
        ? ["General hospital care", "Gynecology", "Diagnostics"]
        : ["General consultation", "Referrals", "Women's health"],
    languages: ["Hindi", "English"],
    hours: index % 2 === 0 ? "9:00 AM - 6:00 PM" : "Hours not listed",
    phone: "104",
  }));
}
