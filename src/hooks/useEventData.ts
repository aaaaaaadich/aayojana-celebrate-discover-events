
import { useState, useEffect } from "react";
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

export const useEventData = (eventId: string | undefined) => {
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [event, setEvent] = useState<Event | null>(null);
  const [ratings, setRatings] = useState<Rating[]>([]);
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [userRating, setUserRating] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);

  const fetchEventDetails = async () => {
    if (!eventId) return;
    
    try {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('id', eventId)
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
    if (!eventId) return;
    
    try {
      const { data, error } = await supabase
        .from('event_ratings')
        .select('*')
        .eq('event_id', eventId);

      if (error) throw error;
      setRatings(data || []);
      
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
    if (!eventId) return;
    
    try {
      const { data, error } = await supabase
        .from('event_feedback')
        .select('*')
        .eq('event_id', eventId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setFeedbacks(data || []);
    } catch (error) {
      console.error('Error fetching feedback:', error);
    }
  };

  useEffect(() => {
    if (eventId) {
      fetchEventDetails();
      fetchRatings();
      fetchFeedbacks();
    }
  }, [eventId]);

  return {
    event,
    ratings,
    feedbacks,
    userRating,
    isLoading,
    setUserRating,
    fetchRatings,
    fetchFeedbacks
  };
};
