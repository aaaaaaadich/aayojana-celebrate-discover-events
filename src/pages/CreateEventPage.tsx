import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import EventCategorySelect from "@/components/event/EventCategorySelect";
import VenueMapSelector from "@/components/event/VenueMapSelector";
import { useAnalyticsContext } from "@/components/analytics/AnalyticsProvider";

interface EventFormData {
  title: string;
  category: string;
  description: string;
  startDateTime: string;
  endDateTime: string;
  location: string;
  coordinates?: { lat: number; lng: number };
  price: string;
  availableTickets: string;
}

const CreateEventPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { trackEventCreation, trackEventDraft, trackPageView } = useAnalyticsContext();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<EventFormData>({
    title: "",
    category: "",
    description: "",
    startDateTime: "",
    endDateTime: "",
    location: "",
    price: "",
    availableTickets: "",
  });

  // Track page view when component mounts
  useState(() => {
    trackPageView('Create Event Page');
  });

  const handleInputChange = (field: keyof EventFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleLocationSelect = (address: string, coordinates?: { lat: number; lng: number }) => {
    setFormData(prev => ({ 
      ...prev, 
      location: address,
      coordinates 
    }));
  };

  const handleSubmit = async (e: React.FormEvent, isDraft: boolean = false) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to create an event.",
        variant: "destructive",
      });
      return;
    }

    if (!isDraft && (!formData.title || !formData.category || !formData.startDateTime || !formData.location)) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const eventData = {
        organizer_id: user.id,
        title: formData.title,
        category: formData.category,
        description: formData.description,
        date: formData.startDateTime.split('T')[0],
        time: formData.startDateTime.split('T')[1] || '00:00',
        location: formData.location,
        price: parseFloat(formData.price) || 0,
        // Store coordinates in description for now (you might want to add a coordinates column)
        ...(formData.coordinates && {
          description: `${formData.description}\n\nCoordinates: ${formData.coordinates.lat}, ${formData.coordinates.lng}`
        })
      };

      const { data, error } = await supabase
        .from('events')
        .insert([eventData])
        .select()
        .single();

      if (error) {
        throw error;
      }

      // Track analytics
      if (isDraft) {
        trackEventDraft(formData);
      } else {
        trackEventCreation(formData);
      }

      toast({
        title: isDraft ? "Draft Saved" : "Event Published",
        description: isDraft 
          ? "Your event has been saved as a draft." 
          : "Your event has been published successfully!",
      });

      navigate('/dashboard/organizer');
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to create event",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-6">Create Your Event</h1>
          <p className="text-muted-foreground mb-8">
            Fill in the details below to create your event. All fields marked with * are required.
          </p>

          <form className="space-y-8">
            {/* Basic Information */}
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
                    onChange={(e) => handleInputChange('title', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Event Category *
                  </label>
                  <EventCategorySelect
                    value={formData.category}
                    onValueChange={(value) => handleInputChange('category', value)}
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
                  onChange={(e) => handleInputChange('description', e.target.value)}
                />
              </div>
            </div>

            {/* Date and Time */}
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
                      onChange={(e) => handleInputChange('startDateTime', e.target.value)}
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
                      onChange={(e) => handleInputChange('endDateTime', e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Location */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Location</h2>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Venue Address *
                </label>
                <VenueMapSelector
                  onLocationSelect={handleLocationSelect}
                  initialAddress={formData.location}
                />
              </div>
            </div>

            {/* Tickets */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Ticket Information</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Ticket Price (NPR) *
                  </label>
                  <Input 
                    type="number" 
                    placeholder="Enter price" 
                    value={formData.price}
                    onChange={(e) => handleInputChange('price', e.target.value)}
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
                    onChange={(e) => handleInputChange('availableTickets', e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Submit */}
            <div className="flex justify-end space-x-4">
              <Button 
                type="button"
                variant="outline"
                onClick={(e) => handleSubmit(e, true)}
                disabled={isLoading}
              >
                {isLoading ? "Saving..." : "Save as Draft"}
              </Button>
              <Button 
                type="button"
                className="bg-saffron-500 hover:bg-saffron-600"
                onClick={(e) => handleSubmit(e, false)}
                disabled={isLoading}
              >
                {isLoading ? "Publishing..." : "Publish Event"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateEventPage;
