
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

interface Rating {
  id: string;
  rating: number;
  user_id: string;
}

interface EventRatingProps {
  eventId: string;
  ratings: Rating[];
  userRating: number;
  setUserRating: (rating: number) => void;
  onRatingUpdate: () => void;
}

export const EventRating = ({ 
  eventId, 
  ratings, 
  userRating, 
  setUserRating, 
  onRatingUpdate 
}: EventRatingProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isSubmittingRating, setIsSubmittingRating] = useState(false);

  const calculateAverageRating = (): string => {
    if (ratings.length === 0) return "0.0";
    const sum = ratings.reduce((acc, rating) => acc + rating.rating, 0);
    return (sum / ratings.length).toFixed(1);
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

    // Guard: Ensure eventId is a string
    if (!eventId || typeof eventId !== "string") {
      toast({
        title: "Error",
        description: "Invalid event. Please try again.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmittingRating(true);
    try {
      const { error } = await supabase
        .from('event_ratings')
        .upsert({
          event_id: eventId,
          user_id: user.id,
          rating: rating
        });

      if (error) throw error;
      
      setUserRating(rating);
      onRatingUpdate();
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

  const averageRating = calculateAverageRating();

  return (
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
            <span className="text-2xl font-bold">{averageRating}</span>
            <div className="flex items-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-5 w-5 ${
                    star <= parseFloat(averageRating)
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
  );
};
