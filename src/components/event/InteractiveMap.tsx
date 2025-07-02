
import { useState, useRef, useEffect } from "react";
import { MapPin, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";

interface InteractiveMapProps {
  onLocationSelect: (address: string, coordinates: { lat: number; lng: number }) => void;
  initialCoordinates?: { lat: number; lng: number };
  initialAddress?: string;
}

const InteractiveMap = ({ 
  onLocationSelect, 
  initialCoordinates = { lat: 27.7172, lng: 85.3240 }, 
  initialAddress = "" 
}: InteractiveMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [selectedLocation, setSelectedLocation] = useState<{ lat: number; lng: number } | null>(
    initialCoordinates
  );
  const [address, setAddress] = useState(initialAddress);

  const handleMapClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    // Convert pixel coordinates to approximate lat/lng (this is a simplified conversion)
    const lat = 27.7172 + (rect.height / 2 - y) * 0.001;
    const lng = 85.3240 + (x - rect.width / 2) * 0.001;
    
    const newLocation = { lat, lng };
    setSelectedLocation(newLocation);
    
    // Generate a mock address based on coordinates
    const mockAddress = `Lat: ${lat.toFixed(4)}, Lng: ${lng.toFixed(4)}, Kathmandu, Nepal`;
    setAddress(mockAddress);
    onLocationSelect(mockAddress, newLocation);
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const newLocation = { lat: latitude, lng: longitude };
          setSelectedLocation(newLocation);
          
          const mockAddress = `Lat: ${latitude.toFixed(4)}, Lng: ${longitude.toFixed(4)}, Current Location`;
          setAddress(mockAddress);
          onLocationSelect(mockAddress, newLocation);
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium">Click on the map to select location</h3>
        <Button 
          type="button"
          variant="outline" 
          size="sm" 
          onClick={getCurrentLocation}
          className="flex items-center gap-2"
        >
          <Navigation className="w-4 h-4" />
          Use Current Location
        </Button>
      </div>
      
      <div 
        ref={mapRef}
        className="h-64 bg-gradient-to-br from-blue-100 to-green-100 rounded-lg border-2 border-dashed border-gray-300 relative cursor-crosshair overflow-hidden"
        onClick={handleMapClick}
        style={{
          backgroundImage: `
            radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(34, 197, 94, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 40% 60%, rgba(168, 85, 247, 0.1) 0%, transparent 50%)
          `
        }}
      >
        {/* Grid pattern for map-like appearance */}
        <div className="absolute inset-0 opacity-20">
          <div className="h-full w-full" 
               style={{
                 backgroundImage: `
                   linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
                   linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)
                 `,
                 backgroundSize: '20px 20px'
               }}
          />
        </div>
        
        {/* Map labels */}
        <div className="absolute top-4 left-4 bg-white/80 px-2 py-1 rounded text-xs font-medium">
          Kathmandu Valley
        </div>
        <div className="absolute bottom-4 right-4 bg-white/80 px-2 py-1 rounded text-xs font-medium">
          Nepal
        </div>
        
        {/* Selected location marker */}
        {selectedLocation && (
          <div 
            className="absolute transform -translate-x-1/2 -translate-y-1/2 z-10"
            style={{
              left: `${50 + (selectedLocation.lng - 85.3240) * 1000}%`,
              top: `${50 - (selectedLocation.lat - 27.7172) * 1000}%`
            }}
          >
            <div className="relative">
              <MapPin className="w-8 h-8 text-red-500 drop-shadow-lg" fill="currentColor" />
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-black/80 text-white px-2 py-1 rounded text-xs whitespace-nowrap">
                Selected Location
              </div>
            </div>
          </div>
        )}
        
        {/* Instructions */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="bg-white/90 p-4 rounded-lg shadow-lg max-w-xs text-center">
            <MapPin className="w-6 h-6 mx-auto mb-2 text-gray-600" />
            <p className="text-sm text-gray-600">
              Click anywhere on the map to select your event location
            </p>
          </div>
        </div>
      </div>
      
      {address && (
        <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-sm font-medium text-blue-900">Selected Location:</p>
          <p className="text-sm text-blue-700">{address}</p>
        </div>
      )}
    </div>
  );
};

export default InteractiveMap;
