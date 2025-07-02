
import { useState, useRef, useEffect } from "react";
import { MapPin, Navigation, Locate } from "lucide-react";
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
    
    // Convert pixel coordinates to approximate lat/lng
    const lat = 27.7172 + (rect.height / 2 - y) * 0.0015;
    const lng = 85.3240 + (x - rect.width / 2) * 0.0015;
    
    const newLocation = { lat, lng };
    setSelectedLocation(newLocation);
    
    // Generate address based on coordinates
    const mockAddress = `Lat: ${lat.toFixed(4)}, Lng: ${lng.toFixed(4)}, Current Location`;
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
          <Locate className="w-4 h-4" />
          Use Current Location
        </Button>
      </div>
      
      <div 
        ref={mapRef}
        className="h-80 bg-slate-100 rounded-lg border relative cursor-crosshair overflow-hidden"
        onClick={handleMapClick}
        style={{
          backgroundImage: `
            linear-gradient(45deg, #f1f5f9 25%, transparent 25%), 
            linear-gradient(-45deg, #f1f5f9 25%, transparent 25%), 
            linear-gradient(45deg, transparent 75%, #f1f5f9 75%), 
            linear-gradient(-45deg, transparent 75%, #f1f5f9 75%)
          `,
          backgroundSize: '20px 20px',
          backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px'
        }}
      >
        {/* Map region labels */}
        <div className="absolute top-4 left-4 bg-white/90 px-3 py-1 rounded-full text-sm font-medium shadow-sm">
          Kathmandu Valley
        </div>
        <div className="absolute bottom-4 right-4 bg-white/90 px-3 py-1 rounded-full text-sm font-medium shadow-sm">
          Nepal
        </div>
        
        {/* Grid overlay for better visual */}
        <div className="absolute inset-0 opacity-10">
          <div className="h-full w-full" 
               style={{
                 backgroundImage: `
                   linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px),
                   linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px)
                 `,
                 backgroundSize: '40px 40px'
               }}
          />
        </div>
        
        {/* Selected location marker */}
        {selectedLocation && (
          <div 
            className="absolute transform -translate-x-1/2 -translate-y-1/2 z-10 animate-bounce"
            style={{
              left: `${50 + (selectedLocation.lng - 85.3240) * 666}%`,
              top: `${50 - (selectedLocation.lat - 27.7172) * 666}%`
            }}
          >
            <div className="relative">
              <MapPin className="w-8 h-8 text-red-500 drop-shadow-lg" fill="currentColor" />
              <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-3 py-1 rounded-md text-xs whitespace-nowrap shadow-lg">
                Selected Location
              </div>
            </div>
          </div>
        )}
        
        {/* Center instruction */}
        {!selectedLocation && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="bg-white/95 p-6 rounded-xl shadow-lg max-w-xs text-center border">
              <MapPin className="w-8 h-8 mx-auto mb-3 text-blue-600" />
              <p className="text-sm text-gray-700 font-medium">
                Click anywhere on the map to select your event location
              </p>
            </div>
          </div>
        )}
      </div>
      
      {address && (
        <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-sm font-medium text-blue-900 mb-1">Selected Location:</p>
          <p className="text-sm text-blue-700">{address}</p>
          <div className="flex items-center gap-2 mt-2 text-xs text-blue-600">
            <MapPin className="w-3 h-3" />
            <span>Lat: {selectedLocation?.lat.toFixed(4)}, Lng: {selectedLocation?.lng.toFixed(4)}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default InteractiveMap;
