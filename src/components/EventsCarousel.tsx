
import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import EventCard from "./EventCard";
import { cn } from "@/lib/utils";

const featuredEvents = [
  {
    id: "1",
    title: "Nepal International Music Festival 2025",
    date: "May 15, 2025",
    time: "4:00 PM",
    location: "Bhrikutimandap, Kathmandu",
    image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    category: "Music",
    isPremium: true
  },
  {
    id: "2",
    title: "Himalayan Tech Summit",
    date: "June 10, 2025",
    time: "9:00 AM",
    location: "Hyatt Regency, Kathmandu",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    category: "Technology",
    isPremium: true
  },
  {
    id: "3",
    title: "Annual Food Festival of Nepal",
    date: "July 5, 2025",
    time: "11:00 AM",
    location: "Boudhanath Area, Kathmandu",
    image: "https://images.unsplash.com/photo-1505935428862-770b6f24f629?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1167&q=80",
    category: "Food & Drinks",
    isPremium: false
  },
  {
    id: "4",
    title: "Kathmandu International Art Exhibition",
    date: "August 21, 2025",
    time: "3:00 PM",
    location: "Nepal Art Council, Babarmahal",
    image: "https://images.unsplash.com/photo-1605629921711-2f6b00c6bbf4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80",
    category: "Arts & Culture",
    isPremium: false
  },
  {
    id: "5",
    title: "Nepal Mountain Biking Championship",
    date: "September 15, 2025",
    time: "7:00 AM",
    location: "Shivapuri National Park",
    image: "https://images.unsplash.com/photo-1605008585816-03ab23ce80af?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    category: "Sports",
    isPremium: true
  },
  {
    id: "6",
    title: "Traditional Newari Wedding Experience",
    date: "October 7, 2025",
    time: "9:00 AM",
    location: "Patan Durbar Square",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    category: "Cultural",
    isPremium: false
  }
];

const EventsCarousel = () => {
  const [current, setCurrent] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const autoplayTimeoutRef = useRef<number | null>(null);
  
  const totalEvents = featuredEvents.length;
  const visibleEvents = 1;
  
  const nextSlide = () => {
    setCurrent((current) => (current + 1) % totalEvents);
  };
  
  const prevSlide = () => {
    setCurrent((current) => (current === 0 ? totalEvents - 1 : current - 1));
  };

  const resetAutoplay = () => {
    if (autoplayTimeoutRef.current) {
      window.clearTimeout(autoplayTimeoutRef.current);
    }
    
    if (autoplay) {
      autoplayTimeoutRef.current = window.setTimeout(() => {
        nextSlide();
      }, 5000);
    }
  };

  useEffect(() => {
    resetAutoplay();
    
    return () => {
      if (autoplayTimeoutRef.current) {
        window.clearTimeout(autoplayTimeoutRef.current);
      }
    };
  }, [current, autoplay]);

  // Function to calculate visible slides based on screen size
  const getVisibleSlides = () => {
    if (typeof window !== "undefined") {
      const width = window.innerWidth;
      if (width >= 1280) return 4;  // xl
      if (width >= 1024) return 3;  // lg
      if (width >= 768) return 2;   // md
      return 1;                     // sm and below
    }
    return 1;
  };

  const [visibleSlides, setVisibleSlides] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      setVisibleSlides(getVisibleSlides());
    };

    // Set initial value
    handleResize();
    
    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Carousel pagination indicators
  const renderDots = () => {
    return [...Array(totalEvents)].map((_, i) => (
      <button
        key={i}
        onClick={() => setCurrent(i)}
        className={cn(
          "h-2 rounded-full transition-all duration-300",
          i === current ? "w-6 bg-saffron-500" : "w-2 bg-gray-300"
        )}
        aria-label={`Go to slide ${i + 1}`}
      />
    ));
  };
  
  return (
    <div className="relative">
      <div className="overflow-hidden">
        <div 
          className="flex transition-transform duration-500 ease-out"
          style={{ 
            transform: `translateX(-${current * (100 / visibleSlides)}%)`,
            width: `${(totalEvents / visibleSlides) * 100}%`
          }}
        >
          {featuredEvents.map((event) => (
            <div 
              key={event.id} 
              className="p-4"
              style={{ width: `${100 / totalEvents}%` }}
            >
              <EventCard {...event} />
            </div>
          ))}
        </div>
      </div>
      
      <div className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10">
        <Button
          variant="outline"
          size="icon"
          className="rounded-full bg-background/80 backdrop-blur-sm border-none shadow-lg hover:bg-background"
          onClick={() => {
            prevSlide();
            setAutoplay(false);
          }}
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>
      </div>
      
      <div className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10">
        <Button
          variant="outline"
          size="icon"
          className="rounded-full bg-background/80 backdrop-blur-sm border-none shadow-lg hover:bg-background"
          onClick={() => {
            nextSlide();
            setAutoplay(false);
          }}
          aria-label="Next slide"
        >
          <ChevronRight className="h-6 w-6" />
        </Button>
      </div>

      <div className="flex justify-center mt-4 space-x-2">
        {renderDots()}
      </div>
    </div>
  );
};

export default EventsCarousel;
