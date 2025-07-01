
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useAuth } from "@/contexts/AuthContext";
import { useUserRoles } from "@/hooks/useUserRoles";

const CallToActionSection = () => {
  const { elementRef: sectionRef, isVisible: sectionVisible } = useScrollAnimation({
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  const { user } = useAuth();
  const { hasRole } = useUserRoles();

  // Don't show the CTA if user is logged in as organizer
  if (user && hasRole('organizer')) {
    return null;
  }

  return (
    <section className="py-16 bg-gradient-to-r from-saffron-500 to-nepali-500 text-white">
      <div className="container mx-auto px-4">
        <div 
          ref={sectionRef}
          className={`max-w-3xl mx-auto text-center transition-all duration-1000 ease-out ${
            sectionVisible ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'
          }`}
        >
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Events?</h2>
          <p className="mb-8 text-white/90">
            Whether you're organizing your first event or your fiftieth, Aayojana provides
            all the tools you need to create successful, memorable experiences.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              asChild
              className="bg-white text-saffron-500 hover:bg-gray-100 text-lg py-6 px-8"
            >
              <Link to="/create-event">Create Your Event</Link>
            </Button>
            <Button 
              asChild
              variant="outline" 
              className="border-white text-white hover:bg-white/20 text-lg py-6 px-8"
            >
              <Link to="/features">Learn More</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToActionSection;
