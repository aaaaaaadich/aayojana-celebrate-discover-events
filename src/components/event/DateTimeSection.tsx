
import { Input } from "@/components/ui/input";
import { Calendar, Clock } from "lucide-react";
import { EventFormData } from "./EventFormData";

interface DateTimeSectionProps {
  formData: EventFormData;
  onInputChange: (field: keyof EventFormData, value: string) => void;
}

const DateTimeSection = ({ formData, onInputChange }: DateTimeSectionProps) => {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Date and Time</h2>
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">
            Start Date & Time *
          </label>
          <div className="flex items-center">
            <Clock className="w-5 h-5 mr-2 text-muted-foreground" />
            <Input 
              type="datetime-local" 
              value={formData.startDateTime}
              onChange={(e) => onInputChange('startDateTime', e.target.value)}
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">
            End Date & Time *
          </label>
          <div className="flex items-center">
            <Calendar className="w-5 h-5 mr-2 text-muted-foreground" />
            <Input 
              type="datetime-local" 
              value={formData.endDateTime}
              onChange={(e) => onInputChange('endDateTime', e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DateTimeSection;
