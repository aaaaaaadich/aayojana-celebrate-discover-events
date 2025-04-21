import { CalendarPlus, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import AnimatedRobot from "@/components/AnimatedRobot";
import PennyPenguin from "../PennyPenguin";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center">
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-15"
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1603228254119-e6a4d095dc59?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80')"
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left md:w-2/3">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in">
                <span className="bg-gradient-to-r from-saffron-500 to-nepali-500 bg-clip-text text-transparent">
                  Organize, Discover & Celebrate
                </span>
                <br /> 
                All in One Place
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8 animate-fade-in" style={{ animationDelay: "0.2s" }}>
                Nepal's first smart digital event platform connecting organizers with attendees through innovative features tailored for the local experience.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start animate-fade-in" style={{ animationDelay: "0.4s" }}>
                <Button 
                  asChild
                  className="bg-saffron-500 hover:bg-saffron-600 text-white text-lg py-6 px-8 animate-hover-lift"
                >
                  <Link to="/create-event">
                    <CalendarPlus className="mr-2 h-5 w-5" />
                    Create Event
                  </Link>
                </Button>
                <Button 
                  asChild
                  variant="outline" 
                  className="border-nepali-500 text-nepali-500 hover:bg-nepali-500 hover:text-white text-lg py-6 px-8 animate-hover-lift"
                >
                  <Link to="/explore">
                    <Search className="mr-2 h-5 w-5" />
                    Explore Nearby
                  </Link>
                </Button>
              </div>
            </div>
            <div className="md:w-1/3 flex justify-center">
              <PennyPenguin />
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-10 left-0 right-0 flex justify-center">
        <a 
          href="#featured" 
          className="animate-bounce w-10 h-10 bg-saffron-500 text-white rounded-full flex items-center justify-center"
          aria-label="Scroll down"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
