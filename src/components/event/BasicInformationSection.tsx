
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import EventCategorySelect from "./EventCategorySelect";
import { EventFormData } from "./EventFormData";

interface BasicInformationSectionProps {
  formData: EventFormData;
  onInputChange: (field: keyof EventFormData, value: string) => void;
}

const BasicInformationSection = ({ formData, onInputChange }: BasicInformationSectionProps) => {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Basic Information</h2>
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">
            Event Name *
          </label>
          <Input 
            placeholder="Enter event name" 
            value={formData.title}
            onChange={(e) => onInputChange('title', e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">
            Event Category *
          </label>
          <EventCategorySelect
            value={formData.category}
            onValueChange={(value) => onInputChange('category', value)}
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">
          Event Description *
        </label>
        <Textarea 
          placeholder="Describe your event" 
          className="min-h-[150px]"
          value={formData.description}
          onChange={(e) => onInputChange('description', e.target.value)}
        />
      </div>
    </div>
  );
};

export default BasicInformationSection;
