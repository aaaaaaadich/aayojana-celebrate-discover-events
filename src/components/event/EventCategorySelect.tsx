
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const EVENT_CATEGORIES = [
  "Conference",
  "Workshop",
  "Seminar",
  "Networking",
  "Concert",
  "Festival",
  "Exhibition",
  "Sports",
  "Cultural",
  "Educational",
  "Business",
  "Technology",
  "Health & Wellness",
  "Food & Drink",
  "Art & Design",
  "Fashion",
  "Community",
  "Charity",
  "Religious",
  "Other"
];

interface EventCategorySelectProps {
  value?: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
}

const EventCategorySelect = ({ 
  value, 
  onValueChange, 
  placeholder = "Select event category" 
}: EventCategorySelectProps) => {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {EVENT_CATEGORIES.map((category) => (
          <SelectItem key={category} value={category.toLowerCase()}>
            {category}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default EventCategorySelect;
