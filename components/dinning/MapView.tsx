'use client'

import React, { useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents, CircleMarker } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { Location, MapViewProps } from './localfavorite'


delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
})

const createPinIcon = (active: boolean) =>
  L.divIcon({
    className: '',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -34],
    html: `
      <div style="
        width:${active ? 36 : 28}px;
        height:${active ? 36 : 28}px;
        border-radius:50% 50% 50% 0;
        transform:rotate(-45deg);
        background:${active ? '#1a1818' : '#f97316'};
        border:3px solid white;
        box-shadow:0 2px 8px rgba(0,0,0,0.35);
        transition:all 0.2s ease;
        margin-left:${active ? -4 : 0}px;
        margin-top:${active ? -4 : 0}px;
      "></div>
    `,
  })


const hotelIcon = L.divIcon({
  className: '',
  iconSize: [20, 20],
  iconAnchor: [10, 10],
  popupAnchor: [0, -14],
  html: `
    <div style="
      width:18px; height:18px;
      border-radius:50%;
      background:#3b82f6;
      border:3px solid white;
      box-shadow:0 0 0 4px rgba(59,130,246,0.3), 0 2px 8px rgba(0,0,0,0.3);
    "></div>
  `,
})


const FitBounds = ({ locations, hotel }: { locations: Location[]; hotel: { lat: number; lng: number } }) => {
  const map = useMap()
  useEffect(() => {
    if (locations.length === 0) {
      map.setView([hotel.lat, hotel.lng], 13)
      return
    }
    const allPoints: [number, number][] = [
      [hotel.lat, hotel.lng],
      ...locations.map(l => [l.latitude, l.longitude] as [number, number]),
    ]
    const bounds = L.latLngBounds(allPoints)
    map.fitBounds(bounds, { padding: [60, 60], maxZoom: 15 })
  }, [locations, hotel, map])
  return null
}

const CloseOnMapClick = () => {
  const map = useMapEvents({
    click() {
      map.closePopup()
    },
  })
  return null
}


/** Inner component — mounts only after MapContainer is fully initialized, avoiding TileLayer race condition */
const MapContent = ({ locations, activeId, hotel, onMarkerClick }: MapViewProps) => {
  useMap() // guarantees the map instance is ready

  return (
    <>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <CloseOnMapClick />
      <FitBounds locations={locations} hotel={hotel} />

      <Marker position={[hotel.lat, hotel.lng]} icon={hotelIcon}>
        <Popup>
          <div className="font-bold text-xs uppercase tracking-widest text-blue-800">The Cairn Hotel</div>
        </Popup>
      </Marker>

      <CircleMarker
        center={[hotel.lat, hotel.lng]}
        radius={18}
        pathOptions={{ color: '#3b82f6', fillColor: '#3b82f6', fillOpacity: 0.1, weight: 1.5, opacity: 0.5 }}
      />

      {locations.map((loc) => {
        const isActive = loc.id === activeId
        return (
          <Marker
            key={loc.id}
            position={[loc.latitude, loc.longitude]}
            icon={createPinIcon(isActive)}
            eventHandlers={{ click: () => onMarkerClick(loc.id) }}
          >
            <Popup>
              <div style={{ minWidth: 180 }}>
                <img
                  src={loc.image}
                  alt={loc.name}
                  style={{ width: '100%', height: 100, objectFit: 'cover', borderRadius: 8, marginBottom: 8 }}
                />
                <p style={{ fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.15em', color: '#9ca3af', marginBottom: 4 }}>
                  {loc.category}
                </p>
                <p style={{ fontSize: 13, fontWeight: 700, color: '#1a1a1a', marginBottom: 4 }}>{loc.name}</p>
                <p style={{ fontSize: 11, color: '#6b7280', marginBottom: 6 }}>{loc.address}</p>
                <p style={{ fontSize: 11, color: '#f97316', fontWeight: 600 }}>{loc.distance.toFixed(2)} miles away</p>
                <a
                  href={loc.google_maps_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-block', marginTop: 8, padding: '5px 14px',
                    background: '#1a1818', color: 'white', fontSize: 10,
                    fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em',
                    borderRadius: 999, textDecoration: 'none',
                  }}
                >
                  Directions ↗
                </a>
              </div>
            </Popup>
          </Marker>
        )
      })}
    </>
  )
}

const MapView = ({ locations, activeId, hotel, onMarkerClick }: MapViewProps) => {
  return (
    <MapContainer
      center={[hotel.lat, hotel.lng]}
      zoom={13}
      style={{ width: '100%', height: '100%' }}
      scrollWheelZoom={true}
      className="z-0"
    >
      <MapContent
        locations={locations}
        activeId={activeId}
        hotel={hotel}
        onMarkerClick={onMarkerClick}
      />
    </MapContainer>
  )
}

export default MapView
