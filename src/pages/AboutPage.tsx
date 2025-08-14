
import { Button } from "@/components/ui/button";
import { Clock, Globe, Users } from "lucide-react";

const AboutPage = () => {
  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-6">About Aayojana</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Nepal's first smart digital event platform, revolutionizing how events are organized 
            and experienced across the country.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Our Mission</h2>
            <p className="text-muted-foreground">
              To empower event organizers and attendees with smart digital tools, making event 
              management and participation seamless and enjoyable for everyone in Nepal.
            </p>
          </div>
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Our Vision</h2>
            <p className="text-muted-foreground">
              To become the leading digital event platform in Nepal, connecting people through 
              meaningful experiences and celebrations.
            </p>
          </div>
        </div>

        {/* Key Features */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="text-center p-6 rounded-lg bg-card">
            <Clock className="mx-auto mb-4 h-10 w-10 text-saffron-500" />
            <h3 className="text-xl font-bold mb-2">Real-time Management</h3>
            <p className="text-muted-foreground">
              Instant updates and notifications for seamless event coordination
            </p>
          </div>
          <div className="text-center p-6 rounded-lg bg-card">
            <Globe className="mx-auto mb-4 h-10 w-10 text-saffron-500" />
            <h3 className="text-xl font-bold mb-2">Nationwide Coverage</h3>
            <p className="text-muted-foreground">
              Connecting events and attendees across Nepal
            </p>
          </div>
          <div className="text-center p-6 rounded-lg bg-card">
            <Users className="mx-auto mb-4 h-10 w-10 text-saffron-500" />
            <h3 className="text-xl font-bold mb-2">Community Focused</h3>
            <p className="text-muted-foreground">
              Building stronger connections through local events
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AboutPage;
