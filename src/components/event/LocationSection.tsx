
import VenueMapSelector from "./VenueMapSelector";

interface LocationSectionProps {
  location: string;
  onLocationSelect: (address: string, coordinates?: { lat: number; lng: number }) => void;
}

const LocationSection = ({ location, onLocationSelect }: LocationSectionProps) => {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Location</h2>
      <div>
        <label className="block text-sm font-medium mb-2">
          Venue Address *
        </label>
        <VenueMapSelector
          onLocationSelect={onLocationSelect}
          initialAddress={location}
        />
      </div>
    </div>
  );
};

export default LocationSection;
