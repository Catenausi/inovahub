import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { STARTUPS, Startup } from '../lib/data';
import { cn } from '../lib/utils';

// Pixi or custom glowing points would be cool, but Leaflet DivIcons with CSS is effective
const createBrightIcon = (category: string, isSelected: boolean) => {
  const colors: Record<string, string> = {
    'Fintech': '#00ffcc', // bright teal
    'Agtech': '#ccff00',  // lime
    'Edtech': '#0066ff',  // royal blue
    'Healthtech': '#ff0033', // blood red
    'Retail': '#ff00ff',  // magenta
    'Deeptech': '#ff9900', // vibrant orange
  };
  const color = colors[category] || '#ffffff';

  return L.divIcon({
    className: 'custom-div-icon',
    html: `
      <div class="relative flex items-center justify-center">
        <div class="absolute w-8 h-8 rounded-full animate-pulse opacity-40 blur-[4px]" style="background-color: ${color}"></div>
        <div class="absolute w-12 h-12 rounded-full animate-ping opacity-10" style="background-color: ${color}"></div>
        <div class="w-4 h-4 rounded-full border-2 border-white shadow-[0_0_15px_${color}] brightness-125" 
             style="background-color: ${color}; transform: ${isSelected ? 'scale(1.8)' : 'scale(1)'}; transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);">
        </div>
      </div>
    `,
    iconSize: [32, 32],
    iconAnchor: [16, 16]
  });
};

interface DiviMapProps {
  selectedId: string | null;
  onSelect: (id: string | null) => void;
}

export const DiviMap = ({ selectedId, onSelect }: DiviMapProps) => {
  const center: [number, number] = [-20.144, -44.890];

  return (
    <div className="w-full h-full bg-[#050508] relative group overflow-hidden">
      <style>{`
        .leaflet-container {
          background: #050508 !important;
          width: 100%;
          height: 100%;
        }
        .leaflet-tile-pane {
          filter: invert(100%) hue-rotate(180deg) brightness(0.6) contrast(1.2);
        }
        .leaflet-control-zoom {
          border: none !important;
          margin: 20px !important;
        }
        .leaflet-control-zoom a {
          background: rgba(15, 15, 25, 0.7) !important;
          backdrop-filter: blur(16px);
          color: #64748b !important;
          border: 1px solid rgba(255, 255, 255, 0.1) !important;
          border-radius: 12px !important;
          margin-bottom: 5px !important;
        }
        .leaflet-popup-content-wrapper {
          background: rgba(15, 15, 25, 0.9) !important;
          backdrop-filter: blur(16px);
          color: white !important;
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px !important;
        }
        .leaflet-popup-tip {
          background: rgba(15, 15, 25, 0.9) !important;
        }
      `}</style>
      
      <MapContainer 
        center={center} 
        zoom={14} 
        scrollWheelZoom={true} 
        zoomControl={true}
        attributionControl={false}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Startups */}
        {STARTUPS.map(startup => (
          <Marker
            key={startup.id}
            position={[startup.lat, startup.lng]}
            icon={createBrightIcon(startup.category, selectedId === startup.id)}
            eventHandlers={{
              click: () => onSelect(startup.id === selectedId ? null : startup.id)
            }}
          />
        ))}

        {/* Connections */}
        {STARTUPS.flatMap(s => 
          s.connections.map(targetId => {
            const target = STARTUPS.find(t => t.id === targetId);
            if (target && s.id < targetId) { // Only one way
              return (
                <Polyline
                  key={`${s.id}-${targetId}`}
                  positions={[
                    [s.lat, s.lng],
                    [target.lat, target.lng]
                  ]}
                  pathOptions={{
                    color: '#3b82f6',
                    weight: 1,
                    opacity: 0.2,
                    dashArray: '5, 10'
                  }}
                />
              );
            }
            return null;
          })
        )}
      </MapContainer>

      {/* Map Overlay for extra glow */}
      <div className="absolute inset-0 pointer-events-none bg-radial-gradient from-transparent to-[#050508] opacity-40 z-[1000]" />
    </div>
  );
};
