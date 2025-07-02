
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { MapPin, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import InteractiveMap from "./InteractiveMap";

interface VenueMapSelectorProps {
  onLocationSelect: (address: string, coordinates?: { lat: number; lng: number }) => void;
  initialAddress?: string;
}

const VenueMapSelector = ({ onLocationSelect, initialAddress = "" }: VenueMapSelectorProps) => {
  const [address, setAddress] = useState(initialAddress);
  const [showMap, setShowMap] = useState(false);

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newAddress = e.target.value;
    setAddress(newAddress);
    onLocationSelect(newAddress);
  };

  const handleMapLocationSelect = (mapAddress: string, coordinates: { lat: number; lng: number }) => {
    setAddress(mapAddress);
    onLocationSelect(mapAddress, coordinates);
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <div className="flex-1 relative">
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            value={address}
            onChange={handleAddressChange}
            placeholder="Enter venue address or use map below"
            className="pl-10"
          />
        </div>
        <Button 
          type="button"
          variant="outline"
          onClick={() => setShowMap(!showMap)}
          className="flex items-center gap-2"
        >
          <Search className="w-4 h-4" />
          {showMap ? 'Hide Map' : 'Show Map'}
        </Button>
      </div>
      
      {showMap && (
        <InteractiveMap
          onLocationSelect={handleMapLocationSelect}
          initialAddress={address}
        />
      )}
      
      <p className="text-sm text-muted-foreground">
        Enter an address above or click "Show Map" to select a location visually
      </p>
    </div>
  );
};

export default VenueMapSelector;
