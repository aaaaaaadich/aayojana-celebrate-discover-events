import { CalendarPlus, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import PennyPenguin from "../PennyPenguin";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden mandala-bg">
      {/* Real Mandala SVG as blue accent background */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(circle at 50% 40%, #2490DF22 0%, #1D3557 90%, #1D3557 100%)"
        }}
      >
        {/* Mandala SVG overlay for Nepali theme */}
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 800 800"
          className="absolute inset-0 w-full h-full"
          style={{ opacity: 0.13, zIndex: 1 }}
          aria-hidden="true"
        >
          <g>
            <circle cx="400" cy="400" r="270" fill="none" stroke="#1EAEDB" strokeWidth="14"/>
            <circle cx="400" cy="400" r="213" fill="none" stroke="#0FA0CE" strokeWidth="11"/>
            <circle cx="400" cy="400" r="170" fill="none" stroke="#D3E4FD" strokeWidth="8"/>
            <circle cx="400" cy="400" r="120" fill="none" stroke="#6E59A5" strokeDasharray="10,10" strokeWidth="6"/>
            <circle cx="400" cy="400" r="86" fill="none" stroke="#fff" strokeWidth="4"/>
            {/* Star patterns for "mandala" spokes */}
            {Array.from({length: 32}).map((_,i)=>(
              <line
                key={i}
                x1={400}
                y1={400}
                x2={400+270*Math.cos((Math.PI*2/32)*i)}
                y2={400+270*Math.sin((Math.PI*2/32)*i)}
                stroke="#2490DF"
                strokeWidth={i%4===0?7:3}
                opacity={i%2===0?0.6:0.17}
              />
            ))}
          </g>
        </svg>
      </div>
      
      {/* Decorative elements - Prayer flags */}
      <div className="absolute top-20 left-0 right-0 z-10 hidden md:flex justify-center">
        <div className="flex space-x-1">
          {["#E76F51", "#F4A261", "#E9C46A", "#2A9D8F", "#264653"].map((color, i) => (
            <div 
              key={i} 
              className="h-14 w-10 md:h-20 md:w-16 rounded-b-lg transform animate-float" 
              style={{ backgroundColor: color, animationDelay: `${i * 0.2}s` }}
            >
              <div className="h-1 w-full bg-white/20"></div>
              <div className="flex justify-center items-center h-full">
                <div className="w-6 h-6 border-2 border-white/30 rounded-full"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Decorative corners with Nepali design */}
      <div className="absolute top-0 left-0 w-40 h-40 border-t-8 border-l-8 border-saffron-500/40 rounded-tl-3xl"></div>
      <div className="absolute top-0 right-0 w-40 h-40 border-t-8 border-r-8 border-saffron-500/40 rounded-tr-3xl"></div>
      <div className="absolute bottom-0 left-0 w-40 h-40 border-b-8 border-l-8 border-saffron-500/40 rounded-bl-3xl"></div>
      <div className="absolute bottom-0 right-0 w-40 h-40 border-b-8 border-r-8 border-saffron-500/40 rounded-br-3xl"></div>

      {/* Content container */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left md:w-2/3">
              {/* Nepali decorative element */}
              <div className="mb-6 hidden md:block">
                <div className="h-1 w-20 bg-saffron-500 rounded"></div>
                <div className="h-1 w-12 bg-saffron-500 mt-1 rounded"></div>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in relative">
                <span className="bg-gradient-to-r from-saffron-500 to-nepali-500 bg-clip-text text-transparent">
                  Organize, Discover & Celebrate
                </span>
                <br /> 
                All in One Place
                {/* Decorative swirl */}
                <svg className="absolute -right-16 top-0 w-16 h-16 text-saffron-500/40 hidden lg:block" viewBox="0 0 100 100" fill="currentColor">
                  <path d="M50,10 C25,10 10,25 10,50 C10,75 25,90 50,90 C75,90 90,75 90,50" stroke="currentColor" strokeWidth="3" fill="none"/>
                  <path d="M80,45 L90,50 L85,60" stroke="currentColor" strokeWidth="3" fill="none"/>
                </svg>
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground mb-8 animate-fade-in" style={{ animationDelay: "0.2s" }}>
                Nepal's first smart digital event platform connecting organizers with attendees through innovative features tailored for the local experience.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start animate-fade-in" style={{ animationDelay: "0.4s" }}>
                <Button 
                  asChild
                  className="bg-saffron-500 hover:bg-saffron-600 text-white text-lg py-6 px-8 animate-hover-lift relative overflow-hidden group"
                >
                  <Link to="/create-event">
                    <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-saffron-400 to-saffron-600 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    <span className="absolute -inset-x-1 bottom-0 h-1 bg-nepali-500 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform"></span>
                    <span className="relative flex items-center">
                      <CalendarPlus className="mr-2 h-5 w-5" />
                      Create Event
                    </span>
                  </Link>
                </Button>
                <Button 
                  asChild
                  variant="outline" 
                  className="border-nepali-500 text-nepali-500 hover:bg-nepali-500 hover:text-white text-lg py-6 px-8 animate-hover-lift relative overflow-hidden group"
                >
                  <Link to="/explore">
                    <span className="absolute -inset-x-1 bottom-0 h-1 bg-saffron-500 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform"></span>
                    <span className="relative flex items-center">
                      <Search className="mr-2 h-5 w-5" />
                      Explore Nearby
                    </span>
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
          className="animate-bounce w-12 h-12 bg-saffron-500 text-white rounded-full flex items-center justify-center shadow-lg relative overflow-hidden group"
          aria-label="Scroll down"
        >
          <span className="absolute inset-0 bg-gradient-to-r from-saffron-400 to-saffron-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6 relative">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
