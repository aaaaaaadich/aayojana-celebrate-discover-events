
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

interface Feedback {
  id: string;
  feedback: string;
  user_id: string;
  created_at: string;
}

interface EventFeedbackProps {
  eventId: string;
  feedbacks: Feedback[];
  onFeedbackUpdate: () => void;
}

export const EventFeedback = ({ eventId, feedbacks, onFeedbackUpdate }: EventFeedbackProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [userFeedback, setUserFeedback] = useState<string>("");
  const [isSubmittingFeedback, setIsSubmittingFeedback] = useState(false);

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
          event_id: eventId,
          user_id: user.id,
          feedback: userFeedback.trim()
        });

      if (error) throw error;
      
      setUserFeedback("");
      onFeedbackUpdate();
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

  return (
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
  );
};
