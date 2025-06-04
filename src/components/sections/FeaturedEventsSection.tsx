
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import EventsCarousel from "../EventsCarousel";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const FeaturedEventsSection = () => {
  const { elementRef: headerRef, isVisible: headerVisible } = useScrollAnimation({
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });
  
  const { elementRef: carouselRef, isVisible: carouselVisible } = useScrollAnimation({
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
  });
  
  const { elementRef: buttonRef, isVisible: buttonVisible } = useScrollAnimation({
    threshold: 0.1,
    rootMargin: '0px 0px -80px 0px'
  });

  return (
    <section id="featured" className="py-16 bg-muted/50">
      <div className="container mx-auto px-4">
        <div 
          ref={headerRef}
          className={`text-center mb-12 transition-all duration-1000 ease-out ${
            headerVisible ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'
          }`}
        >
          <h2 className="text-3xl font-bold mb-4">Featured Events</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover and join exciting events happening across Nepal. From music festivals to tech conferences, 
            find experiences that match your interests.
          </p>
        </div>
        
        <div 
          ref={carouselRef}
          className={`transition-all duration-1000 ease-out delay-200 ${
            carouselVisible ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'
          }`}
        >
          <EventsCarousel />
        </div>
        
        <div 
          ref={buttonRef}
          className={`mt-10 text-center transition-all duration-1000 ease-out delay-400 ${
            buttonVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
          }`}
        >
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
