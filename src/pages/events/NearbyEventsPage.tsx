
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, Search } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

const NearbyEventsPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [location, setLocation] = useState("Kathmandu");
  
  useEffect(() => {
    window.scrollTo(0, 0);
    // Simulate loading state
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Helmet>
        <title>Nearby Events | Aayojana</title>
        <meta name="description" content="Discover events happening close to your location in Nepal" />
      </Helmet>
      
      <div className="container mx-auto px-4 py-16 mt-12">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-400 dark:to-blue-600 bg-clip-text text-transparent">
                Events Near You
              </span>
            </h1>
            
            <p className="text-lg text-muted-foreground mb-8 max-w-3xl mx-auto">
              Discover exciting events happening around you. Never miss out on local gatherings, festivals, and community events.
            </p>
          </div>
          
          {/* Location selector */}
          <div className="mb-12 max-w-md mx-auto">
            <div className="flex items-center gap-3 p-4 rounded-lg border bg-background shadow-sm">
              <MapPin className="h-5 w-5 text-blue-600 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-sm font-medium">Your Location</p>
                <div className="flex items-center gap-2 mt-1">
                  <Input 
                    value={location} 
                    onChange={(e) => setLocation(e.target.value)}
                    className="h-9 focus:border-blue-500"
                  />
                  <Button size="sm" className="h-9 bg-blue-600 hover:bg-blue-700 text-white">
                    Update
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
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
            <div>
              <div className="grid gap-8 mb-12">
                <div className="p-12 border rounded-lg text-center bg-background shadow-sm">
                  <div className="flex justify-center mb-6">
                    <MapPin className="h-16 w-16 text-blue-600 opacity-70" />
                  </div>
                  <h2 className="text-2xl font-semibold mb-4">Location-Based Event Discovery</h2>
                  <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                    We're currently setting up our location-based event discovery system. Soon you'll be able to find events happening right around you, with distances and directions.
                  </p>
                  
                  {/* Google Maps Embed with glowing effect and navy border */}
                  <div className="mb-8 max-w-4xl mx-auto">
                    <div className="mapouter border-4 border-blue-900 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.6)] hover:border-blue-700">
                      <div className="gmap_canvas">
                        <iframe 
                          className="gmap_iframe rounded-lg shadow-lg" 
                          width="100%" 
                          frameBorder={0}
                          scrolling="no" 
                          marginHeight={0}
                          marginWidth={0}
                          src="https://maps.google.com/maps?width=600&amp;height=400&amp;hl=en&amp;q=dhulikhel, nepal&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                          title="Map showing Dhulikhel, Nepal"
                        />
                      </div>
                      <style>{`
                        .mapouter {
                          position: relative;
                          text-align: right;
                          width: 100%;
                          height: 400px;
                        }
                        .gmap_canvas {
                          overflow: hidden;
                          background: none !important;
                          width: 100%;
                          height: 400px;
                        }
                        .gmap_iframe {
                          height: 400px !important;
                        }
                      `}</style>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap justify-center gap-4">
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                      Get Notified When Ready
                    </Button>
                    <Button variant="outline">
                      Browse All Events
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="mb-12">
                <h2 className="text-xl font-semibold mb-6">Popular Locations</h2>
                <div className="grid gap-4 md:grid-cols-3">
                  {["Kathmandu", "Pokhara", "Chitwan"].map((city) => (
                    <Card key={city} className="hover:shadow-md transition-all duration-300">
                      <CardHeader className="pb-2">
                        <h3 className="font-semibold text-lg">{city}</h3>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <p className="text-sm text-muted-foreground">Coming soon</p>
                      </CardContent>
                      <CardFooter>
                        <Button variant="ghost" className="w-full justify-start">View Events</Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default NearbyEventsPage;
