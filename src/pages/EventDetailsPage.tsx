import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, MapPin, Clock, Star, ArrowLeft, Share2, Users } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

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
}

interface Rating {
  id: string;
  rating: number;
  user_id: string;
}

interface Feedback {
  id: string;
  feedback: string;
  user_id: string;
  created_at: string;
}

const EventDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [event, setEvent] = useState<Event | null>(null);
  const [ratings, setRatings] = useState<Rating[]>([]);
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [userRating, setUserRating] = useState<number>(0);
  const [userFeedback, setUserFeedback] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmittingRating, setIsSubmittingRating] = useState(false);
  const [isSubmittingFeedback, setIsSubmittingFeedback] = useState(false);

  useEffect(() => {
    if (id) {
      fetchEventDetails();
      fetchRatings();
      fetchFeedbacks();
    }
  }, [id]);

  const fetchEventDetails = async () => {
    try {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      setEvent(data);
    } catch (error) {
      console.error('Error fetching event:', error);
      toast({
        title: "Error",
        description: "Failed to load event details",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const fetchRatings = async () => {
    try {
      const { data, error } = await supabase
        .from('event_ratings')
        .select('*')
        .eq('event_id', id);

      if (error) throw error;
      setRatings(data || []);
      
      // Check if user has already rated
      if (user) {
        const userExistingRating = data?.find(r => r.user_id === user.id);
        if (userExistingRating) {
          setUserRating(userExistingRating.rating);
        }
      }
    } catch (error) {
      console.error('Error fetching ratings:', error);
    }
  };

  const fetchFeedbacks = async () => {
    try {
      const { data, error } = await supabase
        .from('event_feedback')
        .select('*')
        .eq('event_id', id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setFeedbacks(data || []);
    } catch (error) {
      console.error('Error fetching feedback:', error);
    }
  };

  const submitRating = async (rating: number) => {
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in to rate this event",
        variant: "destructive",
      });
      return;
    }

    setIsSubmittingRating(true);
    try {
      const { error } = await supabase
        .from('event_ratings')
        .upsert({
          event_id: id,
          user_id: user.id,
          rating: rating
        });

      if (error) throw error;
      
      setUserRating(rating);
      fetchRatings();
      toast({
        title: "Success",
        description: "Your rating has been submitted",
      });
    } catch (error) {
      console.error('Error submitting rating:', error);
      toast({
        title: "Error",
        description: "Failed to submit rating",
        variant: "destructive",
      });
    } finally {
      setIsSubmittingRating(false);
    }
  };

  const submitFeedback = async () => {
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in to share feedback",
        variant: "destructive",
      });
      return;
    }

    if (!userFeedback.trim()) {
      toast({
        title: "Error",
        description: "Please enter your feedback",
        variant: "destructive",
      });
      return;
    }

    setIsSubmittingFeedback(true);
    try {
      const { error } = await supabase
        .from('event_feedback')
        .insert({
          event_id: id,
          user_id: user.id,
          feedback: userFeedback.trim()
        });

      if (error) throw error;
      
      setUserFeedback("");
      fetchFeedbacks();
      toast({
        title: "Success",
        description: "Your feedback has been submitted",
      });
    } catch (error) {
      console.error('Error submitting feedback:', error);
      toast({
        title: "Error",
        description: "Failed to submit feedback",
        variant: "destructive",
      });
    } finally {
      setIsSubmittingFeedback(false);
    }
  };

  const calculateAverageRating = () => {
    if (ratings.length === 0) return 0;
    const sum = ratings.reduce((acc, rating) => acc + rating.rating, 0);
    return (sum / ratings.length).toFixed(1);
  };

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

              {/* Rating section */}
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="h-5 w-5 text-yellow-500" />
                    Rate this Event
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl font-bold">{calculateAverageRating()}</span>
                      <div className="flex items-center">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`h-5 w-5 ${
                              star <= parseFloat(calculateAverageRating())
                                ? 'text-yellow-500 fill-current'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-muted-foreground">
                        ({ratings.length} {ratings.length === 1 ? 'rating' : 'ratings'})
                      </span>
                    </div>
                  </div>
                  
                  {user && (
                    <div>
                      <p className="text-sm mb-2">Your rating:</p>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            onClick={() => submitRating(star)}
                            disabled={isSubmittingRating}
                            className="transition-colors hover:scale-110"
                          >
                            <Star
                              className={`h-6 w-6 ${
                                star <= userRating
                                  ? 'text-yellow-500 fill-current'
                                  : 'text-gray-300 hover:text-yellow-400'
                              }`}
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Feedback section */}
              <Card>
                <CardHeader>
                  <CardTitle>Share Your Feedback</CardTitle>
                </CardHeader>
                <CardContent>
                  {user ? (
                    <div className="space-y-4">
                      <Textarea
                        placeholder="Share your thoughts about this event..."
                        value={userFeedback}
                        onChange={(e) => setUserFeedback(e.target.value)}
                      />
                      <Button 
                        onClick={submitFeedback}
                        disabled={isSubmittingFeedback || !userFeedback.trim()}
                      >
                        {isSubmittingFeedback ? 'Submitting...' : 'Submit Feedback'}
                      </Button>
                    </div>
                  ) : (
                    <p className="text-muted-foreground">Please sign in to share your feedback.</p>
                  )}
                  
                  {feedbacks.length > 0 && (
                    <div className="mt-6">
                      <h4 className="font-semibold mb-4">Recent Feedback</h4>
                      <div className="space-y-4">
                        {feedbacks.slice(0, 5).map((feedback) => (
                          <div key={feedback.id} className="border-l-2 border-blue-500 pl-4">
                            <p className="text-sm">{feedback.feedback}</p>
                            <p className="text-xs text-muted-foreground mt-1">
                              {new Date(feedback.created_at).toLocaleDateString()}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Event info sidebar */}
            <div>
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
                          <p className="text-sm text-muted-foreground">NPR {String(event.price)}</p>
                        </div>
                      </div>
                    )}
                  </div>
                  <Button className="w-full mt-6 bg-blue-600 hover:bg-blue-700">
                    {event.price > 0 ? `Buy Tickets - NPR ${String(event.price)}` : 'Register for Free'}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EventDetailsPage;
