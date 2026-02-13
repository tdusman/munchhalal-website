"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Restaurant } from "@/types";
import Link from "next/link";

// Fix default icon issue with webpack
const defaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const featuredIcon = L.icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

interface RestaurantMapProps {
  restaurants: Restaurant[];
  center?: [number, number];
  zoom?: number;
  className?: string;
}

export default function RestaurantMap({
  restaurants,
  center = [43.6532, -79.3832],
  zoom = 11,
  className = "h-[400px] w-full rounded-xl",
}: RestaurantMapProps) {
  return (
    <MapContainer
      center={center}
      zoom={zoom}
      className={className}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
      />
      {restaurants.map((r) => (
        <Marker
          key={r.id}
          position={[r.lat, r.lng]}
          icon={r.isFeatured ? featuredIcon : defaultIcon}
        >
          <Popup>
            <div className="min-w-[180px]">
              <h3 className="font-semibold text-sm mb-1">{r.name}</h3>
              <p className="text-xs text-muted mb-1">
                {r.cuisineType} • ⭐ {r.avgRating.toFixed(1)}
              </p>
              <Link
                href={`/restaurants/${r.slug}`}
                className="text-xs font-semibold text-primary hover:underline"
              >
                View Profile →
              </Link>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
