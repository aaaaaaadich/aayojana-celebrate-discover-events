
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Star } from "lucide-react";

const FeaturedEventsPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    window.scrollTo(0, 0);
    // Simulate loading state
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  // Placeholder for featured events
  const featuredEvents = [
    {
      id: 1,
      title: "Nepal Tech Summit 2025",
      description: "The biggest technology conference in Nepal featuring industry leaders and innovators.",
      date: "May 15-16, 2025",
      location: "Kathmandu Marriott Hotel",
      image: "https://placehold.co/600x400/e6f2ff/0066cc?text=Tech+Summit",
      category: "Technology",
      featured: true
    },
    {
      id: 2,
      title: "Himalayan Music Festival",
      description: "A celebration of traditional and modern Nepalese music with renowned artists.",
      date: "June 5-7, 2025",
      location: "Pokhara Lakeside",
      image: "https://placehold.co/600x400/fff5e6/ff9900?text=Music+Festival",
      category: "Music",
      featured: true
    },
    {
      id: 3,
      title: "Nepal Business Expo 2025",
      description: "Connect with business leaders and explore new opportunities for growth and investment.",
      date: "July 22-24, 2025",
      location: "Bhrikuti Mandap, Kathmandu",
      image: "https://placehold.co/600x400/e6fffa/00a3a3?text=Business+Expo",
      category: "Business",
      featured: true
    }
  ];

  return (
    <>
      <Helmet>
        <title>Featured Events | Aayojana</title>
        <meta name="description" content="Discover premium and handpicked events in Nepal" />
      </Helmet>
      
      <div className="container mx-auto px-4 py-16 mt-12">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-400 dark:to-blue-600 bg-clip-text text-transparent">
                Featured Events
              </span>
            </h1>
            
            <p className="text-lg text-muted-foreground mb-8 max-w-3xl mx-auto">
              Handpicked premium events you won't want to miss. These events are curated by our team for their exceptional quality and experience.
            </p>
          </div>
          
          {isLoading ? (
            // Loading skeleton
            <div className="grid gap-8">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="rounded-lg overflow-hidden border flex flex-col md:flex-row animate-pulse">
                  <div className="bg-muted h-64 md:h-auto md:w-1/3"></div>
                  <div className="p-6 md:w-2/3 space-y-4">
                    <div className="h-6 bg-muted rounded w-3/4"></div>
                    <div className="h-4 bg-muted rounded w-1/4"></div>
                    <div className="h-4 bg-muted rounded w-full"></div>
                    <div className="h-4 bg-muted rounded w-3/4"></div>
                    <div className="h-10 bg-muted rounded w-1/3 mt-4"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid gap-8 animate-fade-in">
              {featuredEvents.length > 0 ? (
                featuredEvents.map((event) => (
                  <div key={event.id} className="rounded-lg overflow-hidden border shadow-sm hover:shadow-md transition-all duration-300 flex flex-col md:flex-row bg-background">
                    <div className="md:w-1/3 h-64 md:h-auto relative">
                      <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                      <Badge className="absolute top-4 left-4 bg-blue-600 hover:bg-blue-700">
                        <Star className="h-3 w-3 mr-1 fill-current" /> Featured
                      </Badge>
                    </div>
                    <div className="p-6 md:w-2/3 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline">{event.category}</Badge>
                        </div>
                        <h2 className="text-2xl font-bold mb-2">{event.title}</h2>
                        <p className="text-muted-foreground mb-4">{event.description}</p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            <span>{event.date}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            <span>{event.location}</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-12 border rounded-lg text-center bg-background shadow-sm">
                  <h2 className="text-2xl font-semibold mb-4">Coming Soon</h2>
                  <p className="text-muted-foreground mb-8">
                    We're currently curating featured events. Check back soon for our premium selections!
                  </p>
                  <Button variant="outline">Get Notified</Button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default FeaturedEventsPage;
