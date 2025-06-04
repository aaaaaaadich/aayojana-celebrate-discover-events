
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FeatureCard from "../FeatureCard";
import { 
  CalendarPlus, MapPin, QrCode, Users, Calendar, 
  CreditCard, MapIcon, BarChart, Search 
} from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const FeaturesSection = () => {
  const { elementRef: headerRef, isVisible: headerVisible } = useScrollAnimation({
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });
  
  const { elementRef: tabsRef, isVisible: tabsVisible } = useScrollAnimation({
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
  });

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div 
          ref={headerRef}
          className={`text-center mb-12 transition-all duration-1000 ease-out ${
            headerVisible ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'
          }`}
        >
          <h2 className="text-3xl font-bold mb-4">Why Choose Aayojana?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our platform offers powerful tools for both event organizers and attendees, 
            making the entire event experience seamless from start to finish.
          </p>
        </div>
        
        <div 
          ref={tabsRef}
          className={`w-full transition-all duration-1000 ease-out delay-200 ${
            tabsVisible ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'
          }`}
        >
          <Tabs defaultValue="organizers" className="w-full">
            <div className="flex justify-center mb-8">
              <TabsList>
                <TabsTrigger value="organizers" className="text-base px-6 py-3">For Organizers</TabsTrigger>
                <TabsTrigger value="attendees" className="text-base px-6 py-3">For Attendees</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="organizers">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <FeatureCard
                  title="Easy Event Creation"
                  description="Create and manage events with our intuitive drag-and-drop interface. Set up ticketing, promotions, and communications in minutes."
                  icon={CalendarPlus}
                />
                <FeatureCard
                  title="Google Maps Venue Picker"
                  description="Easily select and mark your venue on Google Maps, helping attendees find your event location with precision."
                  icon={MapPin}
                />
                <FeatureCard
                  title="QR Code Check-in"
                  description="Streamline entry with digital QR code tickets. Scan and validate attendees quickly with our mobile check-in app."
                  icon={QrCode}
                />
                <FeatureCard
                  title="Influencer Marketing Tools"
                  description="Connect with local influencers to promote your event, track referrals, and offer special affiliate codes."
                  icon={Users}
                />
                <FeatureCard
                  title="Task Management"
                  description="Keep your team organized with built-in task management, delegation, and progress tracking for all event preparations."
                  icon={Calendar}
                />
                <FeatureCard
                  title="Budget Tracking"
                  description="Track expenses, revenue, and ROI in real-time. Generate financial reports for your events with a single click."
                  icon={BarChart}
                />
              </div>
            </TabsContent>
            
            <TabsContent value="attendees">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <FeatureCard
                  title="GPS Event Discovery"
                  description="Find events happening near you with our location-based discovery. Filter by distance, category, or date."
                  icon={MapIcon}
                />
                <FeatureCard
                  title="Simple RSVP"
                  description="Quickly respond to event invitations and manage your event calendar from a single dashboard."
                  icon={Calendar}
                />
                <FeatureCard
                  title="Secure Payment Options"
                  description="Pay for tickets securely using eSewa, Khalti, or other local payment methods with instant confirmation."
                  icon={CreditCard}
                />
                <FeatureCard
                  title="QR Code Entry"
                  description="Skip the lines with digital tickets and QR code entry. No more printed tickets to lose or forget."
                  icon={QrCode}
                />
                <FeatureCard
                  title="Event Recommendations"
                  description="Discover new events based on your preferences, past attendance, and friend activity."
                  icon={Search}
                />
                <FeatureCard
                  title="Local Transportation"
                  description="Find the best routes to events with integrated transportation suggestions and ride-sharing options."
                  icon={MapPin}
                />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
