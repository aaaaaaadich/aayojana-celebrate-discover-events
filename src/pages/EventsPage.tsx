
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Filter, MapPin, Search } from "lucide-react";
import EventsCarousel from "@/components/EventsCarousel";
import { Link } from "react-router-dom";

const EventsPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    window.scrollTo(0, 0);
    // Simulate loading state for better UX
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Helmet>
        <title>Discover Events | Aayojana</title>
        <meta name="description" content="Find and attend exciting events happening all around Nepal" />
      </Helmet>
      
      <div className="container mx-auto px-4 py-16 mt-12">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-400 dark:to-blue-600 bg-clip-text text-transparent">
                Discover Events
              </span>
            </h1>
            
            <p className="text-lg text-muted-foreground mb-8 max-w-3xl mx-auto">
              Find and attend exciting events happening all around Nepal. Browse by category, location, or date.
            </p>
            
            {/* Search and filters */}
            <div className="flex flex-col md:flex-row gap-3 mb-12 max-w-4xl mx-auto">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input 
                  placeholder="Search events..." 
                  className="pl-10 h-12 bg-background border-input focus:border-blue-500"
                />
              </div>
              <div className="flex gap-2">
                <Select defaultValue="all">
                  <SelectTrigger className="w-[180px] h-12">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="music">Music</SelectItem>
                    <SelectItem value="tech">Technology</SelectItem>
                    <SelectItem value="business">Business</SelectItem>
                    <SelectItem value="cultural">Cultural</SelectItem>
                  </SelectContent>
                </Select>
                
                <Button variant="outline" size="icon" className="h-12 w-12">
                  <Calendar className="h-5 w-5" />
                </Button>
                
                <Button variant="outline" size="icon" className="h-12 w-12">
                  <MapPin className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>

          {/* Featured Events Section */}
          <section className="mb-16 animate-fade-in">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Featured Events</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Discover and join exciting events happening across Nepal. From music festivals to tech conferences, 
                find experiences that match your interests.
              </p>
            </div>
            
            <EventsCarousel />
            
            <div className="mt-10 text-center">
              <Button 
                asChild 
                variant="outline" 
                className="border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white"
              >
                <Link to="/events/featured">View All Featured Events</Link>
              </Button>
            </div>
          </section>
          
          {isLoading ? (
            // Loading skeleton
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="rounded-lg overflow-hidden border animate-pulse">
                  <div className="bg-muted h-48 w-full"></div>
                  <div className="p-5 space-y-3">
                    <div className="h-5 bg-muted rounded w-3/4"></div>
                    <div className="h-4 bg-muted rounded w-1/2"></div>
                    <div className="h-4 bg-muted rounded w-full"></div>
                    <div className="h-10 bg-muted rounded w-1/3 mt-4"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            // Coming soon message (will be replaced with actual events later)
            <div className="grid gap-8 animate-fade-in">
              <div className="p-16 border rounded-lg text-center bg-background shadow-sm hover:shadow-md transition-all duration-300">
                <h2 className="text-2xl font-semibold mb-4 text-foreground">More Events Coming Soon</h2>
                <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
                  We're currently curating a list of amazing events across Nepal. Check back soon or sign up to be notified when new events are added.
                </p>
                <div className="flex justify-center gap-4 flex-wrap">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                    Get Notified
                  </Button>
                  <Button variant="outline">
                    Create an Event
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default EventsPage;
