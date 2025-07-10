
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { EventFormData } from "./EventFormData";
import BasicInformationSection from "./BasicInformationSection";
import DateTimeSection from "./DateTimeSection";
import LocationSection from "./LocationSection";
import TicketTypesSection, { TicketType } from "./TicketTypesSection";
import BasicPricingSection from "./BasicPricingSection";
import PaymentSection from "./PaymentSection";
import EventFormActions from "./EventFormActions";
import PosterUploadSection from "./PosterUploadSection";

const CreateEventForm = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
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
    ticketTypes: [],
    qrCodeImageUrl: null,
    posterImageUrl: null,
  });

  function handleInputChange(field: keyof EventFormData, value: string) {
    setFormData(prev => ({ ...prev, [field]: value }));
  }

  function handleLocationSelect(address: string, coordinates?: { lat: number; lng: number }) {
    setFormData(prev => ({ 
      ...prev, 
      location: address,
      coordinates 
    }));
  }

  function handleTicketTypesChange(ticketTypes: TicketType[]) {
    setFormData(prev => ({ ...prev, ticketTypes }));
  }

  function handleQRCodeUpload(url: string | null) {
    setFormData(prev => ({ ...prev, qrCodeImageUrl: url }));
  }

  function handlePosterUpload(url: string | null) {
    setFormData(prev => ({ ...prev, posterImageUrl: url }));
  }

  async function handleSubmit(e: React.FormEvent, isDraft: boolean = false) {
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
      // Calculate total price from ticket types or use basic price
      let totalPrice = parseFloat(formData.price) || 0;
      if (formData.ticketTypes.length > 0) {
        totalPrice = Math.min(...formData.ticketTypes.map(t => t.price));
      }

      const eventData = {
        organizer_id: user.id,
        title: formData.title,
        category: formData.category,
        description: formData.description,
        date: formData.startDateTime.split('T')[0],
        time: formData.startDateTime.split('T')[1] || '00:00',
        location: formData.location,
        price: totalPrice,
        image: formData.posterImageUrl,
        qr_code_image_url: formData.qrCodeImageUrl,
        // Store coordinates and ticket types in description for now
        ...(formData.coordinates && {
          description: `${formData.description}\n\nCoordinates: ${formData.coordinates.lat}, ${formData.coordinates.lng}`
        }),
        ...(formData.ticketTypes.length > 0 && {
          description: `${formData.description}\n\nTicket Types: ${JSON.stringify(formData.ticketTypes)}`
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
  }

  return (
    <form className="space-y-8">
      <BasicInformationSection 
        formData={formData}
        onInputChange={handleInputChange}
      />

      <PosterUploadSection
        posterImageUrl={formData.posterImageUrl}
        onPosterUpload={handlePosterUpload}
      />

      <DateTimeSection 
        formData={formData}
        onInputChange={handleInputChange}
      />

      <LocationSection
        location={formData.location}
        onLocationSelect={handleLocationSelect}
      />

      <TicketTypesSection
        ticketTypes={formData.ticketTypes}
        onTicketTypesChange={handleTicketTypesChange}
      />

      <BasicPricingSection
        formData={formData}
        onInputChange={handleInputChange}
        showSection={formData.ticketTypes.length === 0}
      />

      <PaymentSection
        qrCodeImageUrl={formData.qrCodeImageUrl}
        onQRCodeUpload={handleQRCodeUpload}
      />

      <EventFormActions
        isLoading={isLoading}
        onSaveDraft={(e) => handleSubmit(e, true)}
        onPublish={(e) => handleSubmit(e, false)}
      />
    </form>
  );
};

export default CreateEventForm;
