import { MapContainer, TileLayer, Marker } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "../../utils/fixLeafletIcon";

const defaultIcon = new L.DivIcon({
  className: "clinic-marker",
});

const activeIcon = new L.DivIcon({
  className: "clinic-marker active",
});

export default function MapPanel({ clinics, activeClinicId, onMarkerSelect }) {
  return (
    <MapContainer
      center={[19.076, 72.8777]}
      zoom={12}
      className="h-full w-full rounded-2xl"
    >
      <TileLayer
        attribution="&copy; OpenStreetMap"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

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
