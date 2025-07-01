
import { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { MapPin } from "lucide-react";

interface VenueMapSelectorProps {
  onLocationSelect: (address: string, coordinates?: { lat: number; lng: number }) => void;
  initialAddress?: string;
}

const VenueMapSelector = ({ onLocationSelect, initialAddress = "" }: VenueMapSelectorProps) => {
  const [address, setAddress] = useState(initialAddress);
  const [isMapReady, setIsMapReady] = useState(false);
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const markerRef = useRef<google.maps.Marker | null>(null);

  useEffect(() => {
    // Load Google Maps script
    if (!window.google) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_GOOGLE_MAPS_API_KEY&libraries=places`;
      script.onload = initializeMap;
      document.head.appendChild(script);
    } else {
      initializeMap();
    }
  }, []);

  const initializeMap = () => {
    if (!mapRef.current) return;

    // Default to Kathmandu, Nepal
    const defaultCenter = { lat: 27.7172, lng: 85.3240 };
    
    const map = new google.maps.Map(mapRef.current, {
      center: defaultCenter,
      zoom: 13,
      mapTypeControl: false,
      streetViewControl: false,
    });

    mapInstanceRef.current = map;

    // Add click listener to map
    map.addListener('click', (event: google.maps.MapMouseEvent) => {
      if (event.latLng) {
        const lat = event.latLng.lat();
        const lng = event.latLng.lng();
        
        // Update marker position
        if (markerRef.current) {
          markerRef.current.setPosition({ lat, lng });
        } else {
          markerRef.current = new google.maps.Marker({
            position: { lat, lng },
            map: map,
            draggable: true,
          });

          // Add drag listener to marker
          markerRef.current.addListener('dragend', (event: google.maps.MapMouseEvent) => {
            if (event.latLng) {
              const newLat = event.latLng.lat();
              const newLng = event.latLng.lng();
              reverseGeocode(newLat, newLng);
            }
          });
        }

        reverseGeocode(lat, lng);
      }
    });

    setIsMapReady(true);
  };

  const reverseGeocode = (lat: number, lng: number) => {
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ location: { lat, lng } }, (results, status) => {
      if (status === 'OK' && results && results[0]) {
        const formattedAddress = results[0].formatted_address;
        setAddress(formattedAddress);
        onLocationSelect(formattedAddress, { lat, lng });
      }
    });
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newAddress = e.target.value;
    setAddress(newAddress);
    onLocationSelect(newAddress);
  };

  const searchAddress = () => {
    if (!address || !window.google || !mapInstanceRef.current) return;

    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address }, (results, status) => {
      if (status === 'OK' && results && results[0]) {
        const location = results[0].geometry.location;
        const lat = location.lat();
        const lng = location.lng();

        mapInstanceRef.current?.setCenter({ lat, lng });
        
        if (markerRef.current) {
          markerRef.current.setPosition({ lat, lng });
        } else {
          markerRef.current = new google.maps.Marker({
            position: { lat, lng },
            map: mapInstanceRef.current,
            draggable: true,
          });
        }

        onLocationSelect(address, { lat, lng });
      }
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <div className="flex-1 relative">
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            value={address}
            onChange={handleAddressChange}
            onKeyPress={(e) => e.key === 'Enter' && searchAddress()}
            placeholder="Enter venue address"
            className="pl-10"
          />
        </div>
      </div>
      
      {/* Map Container */}
      <div className="h-64 bg-muted rounded-lg overflow-hidden border">
        {!isMapReady ? (
          <div className="h-full flex items-center justify-center text-muted-foreground">
            <div className="text-center">
              <MapPin className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p>Loading map...</p>
              <p className="text-sm mt-1">
                Note: Google Maps integration requires API key configuration
              </p>
            </div>
          </div>
        ) : (
          <div ref={mapRef} className="w-full h-full" />
        )}
      </div>
      
      <p className="text-sm text-muted-foreground">
        Click on the map to select a venue location, or type an address above
      </p>
    </div>
  );
};

export default VenueMapSelector;
