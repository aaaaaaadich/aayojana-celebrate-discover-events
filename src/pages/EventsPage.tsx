
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, MapPin, Search, Music, Coffee, Briefcase, Globe, Cpu, HeartPulse, Brush, GraduationCap } from "lucide-react";
import EventsCarousel from "@/components/EventsCarousel";
import { Link } from "react-router-dom";
import EventCard from "@/components/EventCard";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

// Category data, copied and kept in sync with CategoriesPage
const categories = [
  { 
    name: "Music & Concerts", 
    value: "music",
    icon: Music, 
    href: "/events/categories/music",
    color: "bg-purple-100 dark:bg-purple-900/30",
    iconColor: "text-purple-500"
  },
  { 
    name: "Food & Drinks", 
    value: "food",
    icon: Coffee, 
    href: "/events/categories/food",
    color: "bg-orange-100 dark:bg-orange-900/30",
    iconColor: "text-orange-500"
  },
  { 
    name: "Business & Professional", 
    value: "business",
    icon: Briefcase, 
    href: "/events/categories/business",
    color: "bg-blue-100 dark:bg-blue-900/30",
    iconColor: "text-blue-500"
  },
  { 
    name: "Cultural", 
    value: "cultural",
    icon: Globe, 
    href: "/events/categories/cultural",
    color: "bg-red-100 dark:bg-red-900/30",
    iconColor: "text-red-500"
  },
  { 
    name: "Technology", 
    value: "technology",
    icon: Cpu, 
    href: "/events/categories/technology",
    color: "bg-teal-100 dark:bg-teal-900/30",
    iconColor: "text-teal-500"
  },
  { 
    name: "Health & Wellness", 
    value: "health",
    icon: HeartPulse, 
    href: "/events/categories/health",
    color: "bg-green-100 dark:bg-green-900/30",
    iconColor: "text-green-500"
  },
  { 
    name: "Arts", 
    value: "arts",
    icon: Brush, 
    href: "/events/categories/arts",
    color: "bg-pink-100 dark:bg-pink-900/30",
    iconColor: "text-pink-500"
  },
  { 
    name: "Education", 
    value: "education",
    icon: GraduationCap, 
    href: "/events/categories/education",
    color: "bg-amber-100 dark:bg-amber-900/30",
    iconColor: "text-amber-500"
  },
];

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  image: string;
  category: string;
}

const EventsPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [allEvents, setAllEvents] = useState<Event[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      console.log('Fetching events from Supabase...');
      
      const { data, error, count } = await supabase
        .from('events')
        .select('id, title, date, time, location, image, category', { count: 'exact' })
        .order('created_at', { ascending: false });

      console.log('Supabase response:', { data, error, count });

      if (error) {
        console.error('Error fetching events:', error);
        toast({
          title: "Error",
          description: "Failed to load events. Please try again.",
          variant: "destructive",
        });
        throw error;
      }

      console.log(`Successfully fetched ${data?.length || 0} events`);
      setAllEvents(data || []);
      
      // If no events found, let's add some sample events for testing
      if (!data || data.length === 0) {
        console.log('No events found, adding sample events...');
        await addSampleEvents();
      }
    } catch (error) {
      console.error('Error in fetchEvents:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const addSampleEvents = async () => {
    const sampleEvents = [
      {
        title: "Tech Conference Nepal 2024",
        description: "Annual technology conference featuring the latest innovations",
        date: "2024-12-15",
        time: "09:00 AM",
        location: "Kathmandu Convention Center",
        image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800",
        category: "technology",
        price: 1500
      },
      {
        title: "Nepali Music Festival",
        description: "Celebrate traditional and modern Nepali music",
        date: "2024-12-20",
        time: "06:00 PM",
        location: "Tundikhel, Kathmandu",
        image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800",
        category: "music",
        price: 500
      },
      {
        title: "Food & Culture Fair",
        description: "Experience authentic Nepali cuisine and culture",
        date: "2024-12-25",
        time: "11:00 AM",
        location: "Bhrikutimandap, Kathmandu",
        image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800",
        category: "food",
        price: 0
      }
    ];

    try {
      const { data, error } = await supabase
        .from('events')
        .insert(sampleEvents)
        .select();

      if (error) {
        console.error('Error adding sample events:', error);
      } else {
        console.log('Sample events added successfully:', data);
        setAllEvents(data || []);
        toast({
          title: "Events Added",
          description: "Sample events have been added to get you started!",
        });
      }
    } catch (error) {
      console.error('Error in addSampleEvents:', error);
    }
  };

  // Filtering events by selected category and search term
  const filteredEvents = allEvents.filter((event) => {
    const matchesCategory = selectedCategory === "all" || event.category === selectedCategory;
    const matchesSearch = event.title.toLowerCase().includes(search.toLowerCase()) ||
                         event.location.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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
                  placeholder="Search events by title or location..." 
                  className="pl-10 h-12 bg-background border-input focus:border-blue-500"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
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
          
          {/* --- Events by Category Section --- */}
          <section className="mb-16 animate-fade-in">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-2">
                {search ? `Search Results for "${search}"` : selectedCategory === "all" ? "All Events" : `${categories.find(cat => cat.value === selectedCategory)?.name} Events`}
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {filteredEvents.length} event{filteredEvents.length !== 1 ? 's' : ''} found
              </p>
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
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center text-muted-foreground py-16">
                  <Calendar className="h-16 w-16 mx-auto mb-4 opacity-50" />
                  <h3 className="text-xl font-semibold mb-2">No events found</h3>
                  <p className="mb-4">
                    {search ? `No events match "${search}"` : selectedCategory !== "all" ? `No events in ${categories.find(cat => cat.value === selectedCategory)?.name}` : "No events available"}
                  </p>
                  {(search || selectedCategory !== "all") && (
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        setSearch("");
                        setSelectedCategory("all");
                      }}
                    >
                      Clear filters
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

export default EventsPage;
