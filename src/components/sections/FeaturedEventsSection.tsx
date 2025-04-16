
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import EventsCarousel from "../EventsCarousel";

const FeaturedEventsSection = () => {
  return (
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
          <Button 
            asChild 
            variant="outline" 
            className="border-saffron-500 text-saffron-500 hover:bg-saffron-500 hover:text-white"
          >
            <Link to="/events">View All Events</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedEventsSection;
