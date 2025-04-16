
import { useState } from "react";
import { Link } from "react-router-dom";
import { CalendarPlus, Search, MapPin, QrCode, Users, Calendar, CreditCard, MapIcon, BarChart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EventsCarousel from "@/components/EventsCarousel";
import FeatureCard from "@/components/FeatureCard";
import StatsCard from "@/components/StatsCard";
import NewsletterForm from "@/components/NewsletterForm";

const HomePage = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center">
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-15"
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1603228254119-e6a4d095dc59?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80')"
          }}
        />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in">
              <span className="bg-gradient-to-r from-saffron-500 to-nepali-500 bg-clip-text text-transparent">
                Organize, Discover & Celebrate
              </span>
              <br /> 
              All in One Place
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 animate-fade-in" style={{ animationDelay: "0.2s" }}>
              Nepal's first smart digital event platform connecting organizers with attendees through innovative features tailored for the local experience.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: "0.4s" }}>
              <Button className="bg-saffron-500 hover:bg-saffron-600 text-white text-lg py-6 px-8">
                <CalendarPlus className="mr-2 h-5 w-5" />
                Create Event
              </Button>
              <Button variant="outline" className="border-nepali-500 text-nepali-500 hover:bg-nepali-500 hover:text-white text-lg py-6 px-8">
                <Search className="mr-2 h-5 w-5" />
                Explore Nearby
              </Button>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-10 left-0 right-0 flex justify-center">
          <a 
            href="#featured" 
            className="animate-bounce w-10 h-10 bg-saffron-500 text-white rounded-full flex items-center justify-center"
            aria-label="Scroll down"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </a>
        </div>
      </section>
      
      {/* Featured Events */}
      <section id="featured" className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Featured Events</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover and join exciting events happening across Nepal. From music festivals to tech conferences, 
              find experiences that match your interests.
            </p>
          </div>
          
          <EventsCarousel />
          
          <div className="mt-10 text-center">
            <Button asChild variant="outline" className="border-saffron-500 text-saffron-500 hover:bg-saffron-500 hover:text-white">
              <Link to="/events">
                View All Events
              </Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose Aayojana?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our platform offers powerful tools for both event organizers and attendees, 
              making the entire event experience seamless from start to finish.
            </p>
          </div>
          
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
      </section>
      
      {/* Stats Section */}
      <section className="py-16 bg-nepali-500 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Connecting Nepal's Event Community</h2>
            <p className="max-w-2xl mx-auto opacity-90">
              Since our launch, we've been bringing together event organizers and attendees across Nepal,
              creating memorable experiences and successful events.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <StatsCard value={1500} label="Events Hosted" suffix="+" />
            <StatsCard value={250} label="Organizers" suffix="+" />
            <StatsCard value={50000} label="Attendees" suffix="+" />
            <StatsCard value={12} label="Cities" />
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">What Our Users Say</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Hear from event organizers and attendees who have experienced the Aayojana platform.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-background p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-saffron-100 flex items-center justify-center mr-4">
                  <span className="text-saffron-500 font-bold text-xl">S</span>
                </div>
                <div>
                  <h4 className="font-bold">Sunil Sharma</h4>
                  <p className="text-sm text-muted-foreground">Event Organizer</p>
                </div>
              </div>
              <p className="italic">
                "Aayojana transformed how we manage our yearly cultural festival. The ticket scanning feature saved us hours 
                at the entrance, and the analytics helped us understand our audience better."
              </p>
            </div>
            
            <div className="bg-background p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-saffron-100 flex items-center justify-center mr-4">
                  <span className="text-saffron-500 font-bold text-xl">A</span>
                </div>
                <div>
                  <h4 className="font-bold">Anita Gurung</h4>
                  <p className="text-sm text-muted-foreground">Regular Attendee</p>
                </div>
              </div>
              <p className="italic">
                "I love how easy it is to find interesting events in Kathmandu with Aayojana. The location-based discovery 
                has introduced me to amazing local experiences I wouldn't have found otherwise."
              </p>
            </div>
            
            <div className="bg-background p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-saffron-100 flex items-center justify-center mr-4">
                  <span className="text-saffron-500 font-bold text-xl">R</span>
                </div>
                <div>
                  <h4 className="font-bold">Rajesh Thapa</h4>
                  <p className="text-sm text-muted-foreground">Tech Conference Organizer</p>
                </div>
              </div>
              <p className="italic">
                "The budget tracking and task management tools have made organizing our annual developer conference so much 
                more efficient. We've saved time and reduced stress using Aayojana."
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Newsletter Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
            <p className="text-muted-foreground mb-8">
              Subscribe to our newsletter to receive updates about upcoming events, 
              platform features, and special promotions.
            </p>
            <NewsletterForm />
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-saffron-500 to-nepali-500 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Events?</h2>
            <p className="mb-8 text-white/90">
              Whether you're organizing your first event or your fiftieth, Aayojana provides
              all the tools you need to create successful, memorable experiences.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-white text-saffron-500 hover:bg-gray-100 text-lg py-6 px-8">
                Create Your Event
              </Button>
              <Button variant="outline" className="border-white text-white hover:bg-white/20 text-lg py-6 px-8">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
