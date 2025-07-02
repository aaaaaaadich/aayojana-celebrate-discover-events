
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Search, Music, Coffee, Briefcase, Globe, Cpu, HeartPulse, Brush, GraduationCap, Star } from "lucide-react";
import EventCard from "@/components/EventCard";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

// Category data
const categories = [
  { 
    name: "Music & Concerts", 
    value: "music",
    icon: Music, 
    color: "bg-purple-100 dark:bg-purple-900/30",
    iconColor: "text-purple-500"
  },
  { 
    name: "Food & Drinks", 
    value: "food",
    icon: Coffee, 
    color: "bg-orange-100 dark:bg-orange-900/30",
    iconColor: "text-orange-500"
  },
  { 
    name: "Business & Professional", 
    value: "business",
    icon: Briefcase, 
    color: "bg-blue-100 dark:bg-blue-900/30",
    iconColor: "text-blue-500"
  },
  { 
    name: "Cultural", 
    value: "cultural",
    icon: Globe, 
    color: "bg-red-100 dark:bg-red-900/30",
    iconColor: "text-red-500"
  },
  { 
    name: "Technology", 
    value: "technology",
    icon: Cpu, 
    color: "bg-teal-100 dark:bg-teal-900/30",
    iconColor: "text-teal-500"
  },
  { 
    name: "Health & Wellness", 
    value: "health",
    icon: HeartPulse, 
    color: "bg-green-100 dark:bg-green-900/30",
    iconColor: "text-green-500"
  },
  { 
    name: "Arts", 
    value: "arts",
    icon: Brush, 
    color: "bg-pink-100 dark:bg-pink-900/30",
    iconColor: "text-pink-500"
  },
  { 
    name: "Education", 
    value: "education",
    icon: GraduationCap, 
    color: "bg-amber-100 dark:bg-amber-900/30",
    iconColor: "text-amber-500"
  },
];

interface Event {
  id: string;
  title: string;
  description?: string;
  date: string;
  time: string;
  location: string;
  image: string;
  category: string;
  price?: number;
  featured?: boolean;
}

const AllEventsPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [allEvents, setAllEvents] = useState<Event[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      console.log('Fetching all events from Supabase...');
      
      const { data, error } = await supabase
        .from('events')
        .select('id, title, description, date, time, location, image, category, price')
        .order('created_at', { ascending: false });

      console.log('Supabase response:', { data, error });

      if (error) {
        console.error('Error fetching events:', error);
        toast({
          title: "Error",
          description: "Failed to load events. Please try again.",
          variant: "destructive",
        });
        throw error;
      }
      
      // Add some mock featured events for demonstration
      const eventsWithFeatured = (data || []).map((event, index) => ({
        ...event,
        featured: index < 3 // Mark first 3 events as featured
      }));
      
      console.log(`Successfully fetched ${eventsWithFeatured.length} events`);
      setAllEvents(eventsWithFeatured);
    } catch (error) {
      console.error('Error in fetchEvents:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Filtering events by selected category, filter type, and search term
  const filteredEvents = allEvents.filter((event) => {
    const matchesCategory = selectedCategory === "all" || event.category === selectedCategory;
    const matchesFilter = selectedFilter === "all" || 
                         (selectedFilter === "featured" && event.featured) ||
                         (selectedFilter === "regular" && !event.featured);
    const matchesSearch = event.title.toLowerCase().includes(search.toLowerCase()) ||
                         event.location.toLowerCase().includes(search.toLowerCase()) ||
                         (event.description && event.description.toLowerCase().includes(search.toLowerCase()));
    
    return matchesCategory && matchesFilter && matchesSearch;
  });

  const featuredEvents = allEvents.filter(event => event.featured);

  return (
    <>
      <Helmet>
        <title>All Events | Aayojana</title>
        <meta name="description" content="Discover all events happening in Nepal - featured, regular, and upcoming events" />
      </Helmet>
      
      <div className="container mx-auto px-4 py-16 mt-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-400 dark:to-blue-600 bg-clip-text text-transparent">
                All Events
              </span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-3xl mx-auto">
              Discover all events happening in Nepal. Browse featured events, explore by category, or find exactly what you're looking for.
            </p>
            
            {/* Search and filters */}
            <div className="flex flex-col md:flex-row gap-3 mb-12 max-w-4xl mx-auto">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input 
                  placeholder="Search events by title, location, or description..." 
                  className="pl-10 h-12 bg-background border-input focus:border-blue-500"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                {/* Event type filter */}
                <Select value={selectedFilter} onValueChange={setSelectedFilter}>
                  <SelectTrigger className="w-[150px] h-12">
                    <SelectValue placeholder="Filter" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Events</SelectItem>
                    <SelectItem value="featured">Featured Only</SelectItem>
                    <SelectItem value="regular">Regular Events</SelectItem>
                  </SelectContent>
                </Select>
                
                {/* Category filter */}
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-[180px] h-12">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map(cat => (
                      <SelectItem key={cat.value} value={cat.value}>{cat.name}</SelectItem>
                    ))}
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
          
          {/* Featured Events Section (only show when not filtering) */}
          {selectedFilter === "all" && featuredEvents.length > 0 && !search && (
            <section className="mb-16 animate-fade-in">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4 flex items-center justify-center gap-2">
                  <Star className="h-8 w-8 text-blue-600 fill-current" />
                  Featured Events
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Handpicked premium events you won't want to miss. These events are curated for their exceptional quality and experience.
                </p>
              </div>
              
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-8">
                {featuredEvents.slice(0, 6).map((event) => (
                  <EventCard
                    key={event.id}
                    id={event.id}
                    title={event.title}
                    date={event.date}
                    time={event.time}
                    location={event.location}
                    image={event.image}
                    category={categories.find(cat => cat.value === event.category)?.name || event.category}
                    isPremium={true}
                  />
                ))}
              </div>
            </section>
          )}
          
          {/* All Events Section */}
          <section className="animate-fade-in">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-2">
                  {selectedFilter === "featured" ? "Featured Events" : 
                   selectedFilter === "regular" ? "Regular Events" : 
                   search ? `Search Results for "${search}"` : "All Events"}
                </h2>
                <p className="text-muted-foreground">
                  {filteredEvents.length} event{filteredEvents.length !== 1 ? 's' : ''} found
                  {selectedCategory !== "all" && ` in ${categories.find(cat => cat.value === selectedCategory)?.name}`}
                </p>
              </div>
              
              {search && (
                <Badge variant="outline" className="text-sm">
                  Search: "{search}"
                </Badge>
              )}
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
              filteredEvents.length > 0 ? (
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                  {filteredEvents.map((event) => (
                    <EventCard
                      key={event.id}
                      id={event.id}
                      title={event.title}
                      date={event.date}
                      time={event.time}
                      location={event.location}
                      image={event.image}
                      category={categories.find(cat => cat.value === event.category)?.name || event.category}
                      isPremium={event.featured}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center text-muted-foreground py-16">
                  <Calendar className="h-16 w-16 mx-auto mb-4 opacity-50" />
                  <h3 className="text-xl font-semibold mb-2">No events found</h3>
                  <p className="mb-4">Try adjusting your search or filter criteria</p>
                  {(search || selectedCategory !== "all" || selectedFilter !== "all") && (
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        setSearch("");
                        setSelectedCategory("all");
                        setSelectedFilter("all");
                      }}
                    >
                      Clear all filters
                    </Button>
                  )}
                </div>
              )
            )}
          </section>
        </div>
      </div>
    </>
  );
};

export default AllEventsPage;
