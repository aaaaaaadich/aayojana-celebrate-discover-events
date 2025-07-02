
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Clock, Users, Trash2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  image: string;
  category: string;
  price: number;
  organizer_id?: string;
}

interface EventInfoSidebarProps {
  event: Event;
}

export const EventInfoSidebar = ({ event }: EventInfoSidebarProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isDeleting, setIsDeleting] = useState(false);

  const isOrganizer = user && user.id === event.organizer_id;

  const handleDeleteEvent = async () => {
    if (!isOrganizer) return;

    const confirmed = window.confirm("Are you sure you want to delete this event? This action cannot be undone.");
    if (!confirmed) return;

    setIsDeleting(true);
    try {
      const { error } = await supabase
        .from('events')
        .delete()
        .eq('id', event.id);

      if (error) throw error;

      toast({
        title: "Event Deleted",
        description: "Your event has been successfully deleted.",
      });

      navigate('/dashboard/organizer');
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to delete event",
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  const handleStartSelling = () => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to start selling tickets.",
        variant: "destructive",
      });
      return;
    }

    // Navigate to ticketing page with event context
    navigate('/ticketing', { state: { eventId: event.id, eventTitle: event.title } });
  };

  const handleBuyTickets = () => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to buy tickets.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Coming Soon",
      description: "Ticket purchasing functionality will be available soon!",
    });
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Calendar className="h-5 w-5 text-blue-600" />
            <div>
              <p className="font-medium">Date</p>
              <p className="text-sm text-muted-foreground">{event.date}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Clock className="h-5 w-5 text-blue-600" />
            <div>
              <p className="font-medium">Time</p>
              <p className="text-sm text-muted-foreground">{event.time}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <MapPin className="h-5 w-5 text-blue-600" />
            <div>
              <p className="font-medium">Location</p>
              <p className="text-sm text-muted-foreground">{event.location}</p>
            </div>
          </div>
          {event.price > 0 && (
            <div className="flex items-center gap-3">
              <Users className="h-5 w-5 text-blue-600" />
              <div>
                <p className="font-medium">Price</p>
                <p className="text-sm text-muted-foreground">NPR {event.price}</p>
              </div>
            </div>
          )}
        </div>
        
        <div className="mt-6 space-y-3">
          {isOrganizer ? (
            <>
              <Button 
                className="w-full bg-green-600 hover:bg-green-700"
                onClick={handleStartSelling}
              >
                Start Selling Tickets
              </Button>
              <Button 
                variant="destructive" 
                className="w-full"
                onClick={handleDeleteEvent}
                disabled={isDeleting}
              >
                <Trash2 className="w-4 h-4 mr-2" />
                {isDeleting ? "Deleting..." : "Delete Event"}
              </Button>
            </>
          ) : (
            <Button 
              className="w-full bg-blue-600 hover:bg-blue-700"
              onClick={handleBuyTickets}
            >
              {event.price > 0 ? `Buy Tickets - NPR ${event.price}` : 'Register for Free'}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
