
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, Search, Calendar, Clock } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  category: string;
  description: string | null;
}

const NearbyEventsPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [location, setLocation] = useState("Kathmandu");
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const { toast } = useToast();
  
  useEffect(() => {
    window.scrollTo(0, 0);
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const { data, error } = await supabase
        .from('events')
        .select('id, title, date, time, location, category, description')
        .order('date', { ascending: true });

      if (error) {
        console.error('Error fetching events:', error);
        toast({
          title: "Error",
          description: "Failed to load events. Please try again.",
          variant: "destructive",
        });
      } else {
        setEvents(data || []);
      }
    } catch (error) {
      console.error('Error in fetchEvents:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleMapClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    // Find the nearest event marker based on click position
    const clickedEventIndex = Math.floor((x / rect.width) * events.length);
    if (events[clickedEventIndex]) {
      setSelectedEvent(events[clickedEventIndex]);
    }
  };

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
              Discover exciting events happening around you. Click on the map markers to see event details.
            </p>
          </div>
          
          {/* Location selector */}
          <div className="mb-8 max-w-md mx-auto">
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
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <div className="grid gap-8 lg:grid-cols-2">
              {/* Interactive Map */}
              <div className="order-2 lg:order-1">
                <h2 className="text-xl font-semibold mb-4">Events Map</h2>
                <div 
                  className="h-96 bg-gradient-to-br from-blue-100 to-green-100 rounded-lg border relative cursor-pointer overflow-hidden"
                  onClick={handleMapClick}
                  style={{
                    backgroundImage: `
                      radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
                      radial-gradient(circle at 80% 80%, rgba(34, 197, 94, 0.1) 0%, transparent 50%)
                    `
                  }}
                >
                  {/* Grid pattern */}
                  <div className="absolute inset-0 opacity-20">
                    <div className="h-full w-full" 
                         style={{
                           backgroundImage: `
                             linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)
                           `,
                           backgroundSize: '20px 20px'
                         }}
                    />
                  </div>
                  
                  {/* Location labels */}
                  <div className="absolute top-4 left-4 bg-white/80 px-2 py-1 rounded text-xs font-medium">
                    {location}
                  </div>
                  
                  {/* Event markers */}
                  {events.map((event, index) => (
                    <div 
                      key={event.id}
                      className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer hover:scale-110 transition-transform"
                      style={{
                        left: `${20 + (index * 60 / events.length)}%`,
                        top: `${30 + (index % 3) * 20}%`
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedEvent(event);
                      }}
                    >
                      <div className="relative">
                        <MapPin 
                          className={`w-6 h-6 drop-shadow-lg ${
                            selectedEvent?.id === event.id 
                              ? 'text-red-600' 
                              : 'text-blue-600'
                          }`} 
                          fill="currentColor" 
                        />
                        <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-black/80 text-white px-2 py-1 rounded text-xs whitespace-nowrap opacity-0 hover:opacity-100 transition-opacity">
                          {event.title}
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {events.length === 0 && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-white/90 p-4 rounded-lg shadow-lg text-center">
                        <MapPin className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                        <p className="text-sm text-gray-600">No events to display on map</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Event Details */}
              <div className="order-1 lg:order-2">
                <h2 className="text-xl font-semibold mb-4">Event Details</h2>
                {selectedEvent ? (
                  <Card className="h-fit">
                    <CardHeader>
                      <h3 className="text-lg font-semibold">{selectedEvent.title}</h3>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {selectedEvent.date}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {selectedEvent.time}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-start gap-2">
                          <MapPin className="w-4 h-4 mt-1 text-muted-foreground flex-shrink-0" />
                          <span className="text-sm">{selectedEvent.location}</span>
                        </div>
                        {selectedEvent.description && (
                          <p className="text-sm text-muted-foreground">
                            {selectedEvent.description}
                          </p>
                        )}
                        <div className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                          {selectedEvent.category}
                        </div>
                      </div>  
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full">View Event Details</Button>
                    </CardFooter>
                  </Card>
                ) : (
                  <Card className="h-fit">
                    <CardContent className="p-8 text-center">
                      <MapPin className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                      <p className="text-muted-foreground">
                        Click on a map marker to view event details
                      </p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          )}
          
          {/* Events List */}
          {events.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-semibold mb-6">All Nearby Events</h2>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {events.map((event) => (
                  <Card key={event.id} className="hover:shadow-md transition-shadow cursor-pointer">
                    <CardHeader className="pb-2">
                      <h3 className="font-semibold">{event.title}</h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        {event.date} at {event.time}
                      </div>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="flex items-center gap-2 mb-2">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">{event.location}</span>
                      </div>
                      <div className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                        {event.category}
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="ghost" className="w-full justify-start">
                        View Details
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default NearbyEventsPage;
