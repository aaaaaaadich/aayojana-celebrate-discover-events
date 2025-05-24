
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, MapPin, Search, Music, Coffee, Briefcase, Globe, Cpu, HeartPulse, Brush, GraduationCap } from "lucide-react";
import EventsCarousel from "@/components/EventsCarousel";
import { Link } from "react-router-dom";

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

// Example events, categorized
const allEvents = [
  {
    id: "1",
    title: "Rocking Kathmandu Night",
    date: "June 22, 2025",
    time: "7:00 PM",
    location: "Kathmandu Durbar Square",
    image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=600&q=80",
    category: "music",
  },
  {
    id: "2",
    title: "Tech Future Expo",
    date: "July 2, 2025",
    time: "10:00 AM",
    location: "AITM College, Lalitpur",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=600&q=80",
    category: "technology",
  },
  {
    id: "3",
    title: "Newari Cuisine Feast",
    date: "July 6, 2025",
    time: "1:00 PM",
    location: "Bhaktapur",
    image: "https://images.unsplash.com/photo-1505935428862-770b6f24f629?auto=format&fit=crop&w=600&q=80",
    category: "food",
  },
  {
    id: "4",
    title: "Corporate Networking Gala",
    date: "September 12, 2025",
    time: "5:30 PM",
    location: "Soaltee Hotel",
    image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=600&q=80",
    category: "business",
  },
  {
    id: "5",
    title: "Tharu Dance Festival",
    date: "August 30, 2025",
    time: "6:00 PM",
    location: "Bardiya Community Hall",
    image: "https://images.unsplash.com/photo-1605629921711-2f6b00c6bbf4?auto=format&fit=crop&w=600&q=80",
    category: "cultural",
  },
  {
    id: "6",
    title: "Yoga for Life",
    date: "July 15, 2025",
    time: "7:00 AM",
    location: "Pokhara Lakeside",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
    category: "health",
  },
  {
    id: "7",
    title: "Gallery Art Show",
    date: "September 9, 2025",
    time: "2:00 PM",
    location: "Imago Dei Gallery",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80",
    category: "arts",
  },
  {
    id: "8",
    title: "EdTech Innovations Seminar",
    date: "August 11, 2025",
    time: "10:30 AM",
    location: "Pulchowk Campus",
    image: "https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?auto=format&fit=crop&w=600&q=80",
    category: "education",
  },
];

// Import EventCard for event list
import EventCard from "@/components/EventCard";

const EventsPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [search, setSearch] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
    // Simulate loading state for better UX
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  // Filtering events by selected category and search term
  const filteredEvents = allEvents.filter(
    (event) =>
      (selectedCategory === "all" || event.category === selectedCategory) &&
      event.title.toLowerCase().includes(search.toLowerCase())
  );

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
          
          {/* --- Featured Events Section --- */}
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
          
          {/* --- Events by Category Section --- */}
          <section className="mb-16 animate-fade-in">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-2">Events By Category</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Select a category to see events tailored to your interests.
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
                      category={categories.find(cat => cat.value === event.category)?.name || ""}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center text-muted-foreground py-16">
                  No events found for this category.
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

