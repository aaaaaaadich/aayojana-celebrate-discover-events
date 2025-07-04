
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useUserRoles } from "@/hooks/useUserRoles";
import { TermsAcceptanceModal } from "@/components/event/TermsAcceptanceModal";
import CreateEventForm from "@/components/event/CreateEventForm";

const CreateEventPage = () => {
  const { user } = useAuth();
  const { hasRole, loading } = useUserRoles();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [hasAcceptedTerms, setHasAcceptedTerms] = useState(false);

  // Check if user is authorized to create events
  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }
    
    // Wait for roles to load before checking
    if (!loading && !hasRole('organizer')) {
      console.log('User does not have organizer role, redirecting');
      toast({
        title: "Access Denied",
        description: "You need to be an organizer to create events.",
        variant: "destructive",
      });
      navigate('/');
      return;
    }

    // Show terms modal only if user is an organizer and hasn't accepted terms yet
    if (!loading && hasRole('organizer') && !hasAcceptedTerms) {
      setShowTermsModal(true);
    }
  }, [user, hasRole, loading, navigate, toast, hasAcceptedTerms]);

  const handleTermsAccept = () => {
    setHasAcceptedTerms(true);
    setShowTermsModal(false);
  };

  const handleTermsCancel = () => {
    navigate('/');
  };

  // Show loading state while checking roles
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-saffron-500 mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  // Show access denied if not an organizer
  if (!hasRole('organizer')) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
          <p className="text-muted-foreground mb-4">You need to be an organizer to create events.</p>
          <Button onClick={() => navigate('/')}>Go Home</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-6">Create Your Event</h1>
          <p className="text-muted-foreground mb-8">
            Fill in the details below to create your event. All fields marked with * are required.
          </p>

          {/* Show the form only after terms are accepted */}
          {hasAcceptedTerms && <CreateEventForm />}
        </div>
      </div>

      {/* Terms Acceptance Modal */}
      <TermsAcceptanceModal
        isOpen={showTermsModal}
        onAccept={handleTermsAccept}
        onCancel={handleTermsCancel}
      />
    </div>
  );
};

export default CreateEventPage;
