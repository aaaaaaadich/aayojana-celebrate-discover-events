
import { Input } from "@/components/ui/input";
import { EventFormData } from "./EventFormData";

interface BasicPricingSectionProps {
  formData: EventFormData;
  onInputChange: (field: keyof EventFormData, value: string) => void;
  showSection: boolean;
}

const BasicPricingSection = ({ formData, onInputChange, showSection }: BasicPricingSectionProps) => {
  if (!showSection) return null;

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Basic Pricing</h2>
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">
            Ticket Price (NPR) *
          </label>
          <Input 
            type="number" 
            placeholder="Enter price" 
            value={formData.price}
            onChange={(e) => onInputChange('price', e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">
            Available Tickets *
          </label>
          <Input 
            type="number" 
            placeholder="Enter quantity" 
            value={formData.availableTickets}
            onChange={(e) => onInputChange('availableTickets', e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default BasicPricingSection;
