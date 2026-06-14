"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, CircleMarker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix Leaflet's default icon path issues with webpack
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const defaultCenter: [number, number] = [12.9716, 77.5946]; // Bengaluru

export default function Map() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="w-full h-full bg-space/50 animate-pulse rounded-xl" />;

  return (
    <MapContainer 
      center={defaultCenter} 
      zoom={13} 
      className="w-full h-full rounded-xl z-0"
      zoomControl={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
      />
      {/* Sample Critical Nodes */}
      <CircleMarker center={[12.9716, 77.5946]} radius={8} pathOptions={{ color: '#ef4444', fillColor: '#ef4444', fillOpacity: 0.7 }}>
        <Popup>Critical Node: MG Road Intersection</Popup>
      </CircleMarker>
      <CircleMarker center={[12.9352, 77.6245]} radius={6} pathOptions={{ color: '#ff7a00', fillColor: '#ff7a00', fillOpacity: 0.7 }}>
        <Popup>High Risk: Koramangala Junction</Popup>
      </CircleMarker>
      <CircleMarker center={[12.9915, 77.5533]} radius={5} pathOptions={{ color: '#facc15', fillColor: '#facc15', fillOpacity: 0.7 }}>
        <Popup>Moderate Risk: Malleshwaram Axis</Popup>
      </CircleMarker>
    </MapContainer>
  );
}
