import { useEffect } from "react";
import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "../../utils/fixLeafletIcon";

const defaultIcon = new L.DivIcon({
  className: "clinic-marker",
});

const activeIcon = new L.DivIcon({
  className: "clinic-marker active",
});

const userIcon = new L.DivIcon({
  className: "user-location-marker",
});

export default function MapPanel({
  clinics,
  activeClinicId,
  onMarkerSelect,
  userLocation,
}) {
  const center = userLocation
    ? [userLocation.lat, userLocation.lng]
    : clinics[0]
    ? [clinics[0].lat, clinics[0].lng]
    : [22.9734, 78.6569];

  return (
    <MapContainer
      center={center}
      zoom={userLocation ? 13 : 5}
      className="h-full w-full rounded-2xl"
    >
      <MapUpdater clinics={clinics} center={center} userLocation={userLocation} />

      <TileLayer
        attribution="&copy; OpenStreetMap"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {userLocation && (
        <Marker position={[userLocation.lat, userLocation.lng]} icon={userIcon} />
      )}

      {clinics.map((c) => (
        <Marker
          key={c.id}
          position={[c.lat, c.lng]}
          icon={activeClinicId === c.id ? activeIcon : defaultIcon}
          eventHandlers={{
            mouseover: () => onMarkerSelect(c.id),
            mouseout: () => onMarkerSelect(null),
            click: () => onMarkerSelect(c.id),
          }}
        />
      ))}
    </MapContainer>
  );
}

function MapUpdater({ clinics, center, userLocation }) {
  const map = useMap();

  useEffect(() => {
    const points = clinics
      .slice(0, 12)
      .map((clinic) => [clinic.lat, clinic.lng]);

    if (userLocation) points.push([userLocation.lat, userLocation.lng]);

    if (points.length >= 2) {
      map.fitBounds(points, { padding: [28, 28], maxZoom: 14 });
      return;
    }

    map.setView(center, userLocation ? 13 : 5);
  }, [clinics, center, map, userLocation]);

  return null;
}
