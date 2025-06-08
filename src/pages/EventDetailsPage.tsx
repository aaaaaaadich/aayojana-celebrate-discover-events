
import { useParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Share2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useEventData } from "@/hooks/useEventData";
import { EventRating } from "@/components/event/EventRating";
import { EventFeedback } from "@/components/event/EventFeedback";
import { EventInfoSidebar } from "@/components/event/EventInfoSidebar";

const EventDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const {
    event,
    ratings,
    feedbacks,
    userRating,
    isLoading,
    setUserRating,
    fetchRatings,
    fetchFeedbacks
  } = useEventData(id);

  const shareEvent = () => {
    if (navigator.share) {
      navigator.share({
        title: event?.title,
        text: `Check out this event: ${event?.title}`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link copied",
        description: "Event link copied to clipboard",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16 mt-12">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse">
            <div className="h-64 bg-muted rounded-lg mb-6"></div>
            <div className="h-8 bg-muted rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-muted rounded w-1/2 mb-2"></div>
            <div className="h-4 bg-muted rounded w-full mb-2"></div>
            <div className="h-4 bg-muted rounded w-2/3"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="container mx-auto px-4 py-16 mt-12">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-2xl font-bold mb-4">Event not found</h1>
          <Button onClick={() => navigate('/events')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Events
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{event.title} | Aayojana</title>
        <meta name="description" content={event.description || `Join ${event.title} at ${event.location}`} />
      </Helmet>
      
      <div className="container mx-auto px-4 py-16 mt-12">
        <div className="max-w-4xl mx-auto">
          {/* Back button */}
          <Button 
            variant="ghost" 
            onClick={() => navigate('/events')}
            className="mb-6"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Events
          </Button>

          {/* Event image */}
          <div className="relative h-64 md:h-96 rounded-lg overflow-hidden mb-8">
            <img
              src={event.image || 'https://placehold.co/800x400/e6f2ff/0066cc?text=Event+Image'}
              alt={event.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 right-4 flex gap-2">
              <Button size="sm" variant="secondary" onClick={shareEvent}>
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Event details */}
          <div className="grid gap-8 md:grid-cols-3">
            <div className="md:col-span-2">
              <div className="mb-6">
                <Badge variant="outline" className="mb-4">
                  {event.category}
                </Badge>
                <h1 className="text-3xl md:text-4xl font-bold mb-4">{event.title}</h1>
                {event.description && (
                  <p className="text-lg text-muted-foreground">{event.description}</p>
                )}
              </div>

              <EventRating
                eventId={id!}
                ratings={ratings}
                userRating={userRating}
                setUserRating={setUserRating}
                onRatingUpdate={fetchRatings}
              />

              <EventFeedback
                eventId={id!}
                feedbacks={feedbacks}
                onFeedbackUpdate={fetchFeedbacks}
              />
            </div>

            <div>
              <EventInfoSidebar event={event} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EventDetailsPage;
