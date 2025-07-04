
import { Button } from "@/components/ui/button";

interface EventFormActionsProps {
  isLoading: boolean;
  onSaveDraft: (e: React.FormEvent) => void;
  onPublish: (e: React.FormEvent) => void;
}

const EventFormActions = ({ isLoading, onSaveDraft, onPublish }: EventFormActionsProps) => {
  return (
    <div className="flex justify-end space-x-4">
      <Button 
        type="button"
        variant="outline"
        onClick={onSaveDraft}
        disabled={isLoading}
      >
        {isLoading ? "Saving..." : "Save as Draft"}
      </Button>
      <Button 
        type="button"
        className="bg-saffron-500 hover:bg-saffron-600"
        onClick={onPublish}
        disabled={isLoading}
      >
        {isLoading ? "Publishing..." : "Publish Event"}
      </Button>
    </div>
  );
};

export default EventFormActions;
