
import { CalendarPlus, Search, Flower2, Star, Cloud, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import PennyPenguin from "../PennyPenguin";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-b from-[#D3E4FD] via-[#f8fafc] to-white">
      {/* LAYERED SOFT BLURS - premium soft geometry */}
      <div
        className="absolute z-0 inset-0 pointer-events-none"
        aria-hidden="true"
      >
        {/* Soft blue background blobs */}
        <div className="absolute top-0 left-1/3 w-[540px] h-[340px] bg-blue-100 blur-3xl rounded-full opacity-70 animate-float"
          style={{animationDuration: "7s"}} />
        <div className="absolute bottom-0 right-0 w-[340px] h-[240px] bg-[#B8CDFB] blur-2xl rounded-full opacity-60 animate-float"
          style={{animationDuration: "9s", animationDelay: "0.8s"}} />
        <div className="absolute top-1/4 left-[-100px] w-[200px] h-[160px] bg-[#C0FAF8] blur-3xl rounded-3xl opacity-40 animate-float"
          style={{animationDuration: "8s", animationDelay: "0.7s"}} />
        {/* Pastel gradient overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(111.4deg,_rgba(223,234,247,0.57)_1%,_rgba(244,248,252,0.7)_58%)] opacity-80" />
      </div>
      {/* Animated small motifs (Cloud, Flower, Star) */}
      <Cloud className="absolute left-8 top-24 w-9 h-9 text-blue-200 opacity-60 animate-float" style={{animationDuration: "10s"}} />
      <Cloud className="absolute right-16 top-32 w-10 h-10 text-blue-100 opacity-40 animate-float" style={{animationDuration: "12s", animationDelay: "1.8s"}} />
      <Flower2 className="absolute right-[30%] top-16 w-8 h-8 text-[#F4A261] opacity-30 animate-spin-slow" />
      <Star className="absolute left-1/4 bottom-20 w-6 h-6 text-[#E9C46A] opacity-70 animate-pulse-slow" />
      <Sparkles className="absolute right-24 bottom-48 w-7 h-7 text-[#FFD700]/40 animate-pulse-slow" />
      
      {/* Decorative, modern "prayer-flag" ribbon - subtle, not too bold */}
      <div className="absolute top-12 left-0 right-0 z-10 flex justify-center pointer-events-none">
        <div className="flex gap-2">
          {["#1EAEDB", "#F4A261", "#E9C46A", "#2A9D8F", "#264653"].map((color, i) => (
            <div
              key={i}
              className="w-7 h-9 md:w-12 md:h-14 rounded-full opacity-70"
              style={{
                background: `radial-gradient(circle at 70% 30%, #fff 20%, ${color} 100%)`,
                animation: "float 4s ease-in-out infinite",
                animationDelay: `${i * 0.9}s`
              }}
            />
          ))}
        </div>
      </div>

      {/* Decorative corners (thin, premium) with fading border-gradient lines */}
      <div className="absolute top-0 left-0 w-28 h-28">
        <div className="w-full h-[3px] bg-gradient-to-r from-[#2490DF40] to-transparent rounded-full" />
        <div className="h-full w-[3px] bg-gradient-to-b from-[#2490DF4a] to-transparent rounded-full" />
      </div>
      <div className="absolute top-0 right-0 w-28 h-28 flex flex-col items-end">
        <div className="w-full h-[3px] bg-gradient-to-l from-[#2490DF33] to-transparent rounded-full" />
        <div className="h-full w-[3px] bg-gradient-to-b from-[#2490DF26] to-transparent rounded-full" />
      </div>
      <div className="absolute bottom-0 left-0 w-28 h-28 flex flex-col">
        <div className="w-full h-[3px] bg-gradient-to-r from-[#2490DF26] to-transparent rounded-full" />
        <div className="h-full w-[3px] bg-gradient-to-t from-[#2490DF33] to-transparent rounded-full" />
      </div>
      <div className="absolute bottom-0 right-0 w-28 h-28 flex flex-col items-end">
        <div className="w-full h-[3px] bg-gradient-to-l from-[#2490DF40] to-transparent rounded-full" />
        <div className="h-full w-[3px] bg-gradient-to-t from-[#2490DF1a] to-transparent rounded-full" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto py-12">
          <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-6 md:gap-12">
            {/* Left: Headline, description, buttons, smaller details */}
            <div className="text-center md:text-left md:w-2/3">
              {/* Decorative lines */}
              <div className="mb-4 hidden md:flex gap-1 items-center">
                <span className="block w-14 h-1 bg-gradient-to-r from-saffron-400 to-saffron-600 rounded-full animate-shimmer" />
                <span className="block w-8 h-1 bg-gradient-to-r from-nepali-500 to-nepali-300 rounded-full animate-shimmer" />
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in leading-tight tracking-tight text-shadow-lg">
                <span className="bg-gradient-to-r from-saffron-500 to-nepali-500 bg-clip-text text-transparent">
                  Organize, Discover & Celebrate
                </span>
                <br />
                <span className="text-nepali-500">Your Events in Nepal</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl mx-auto animate-fade-in" style={{ animationDelay: "0.18s" }}>
                Nepal's first smart digital event platform connecting organizers with attendees through innovative features and a locally inspired, beautiful aesthetic experience.
              </p>
              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start animate-fade-in" style={{ animationDelay: "0.3s" }}>
                <Button
                  asChild
                  className="bg-saffron-500 hover:bg-saffron-600 text-white text-lg py-5 px-8 animate-hover-lift shadow-lg shadow-saffron-200/20"
                >
                  <Link to="/create-event">
                    <span className="relative flex items-center">
                      <CalendarPlus className="mr-2 h-5 w-5" />
                      Create Event
                    </span>
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="border-nepali-500 text-nepali-500 hover:bg-nepali-500 hover:text-white text-lg py-5 px-8 animate-hover-lift"
                >
                  <Link to="/explore">
                    <span className="relative flex items-center">
                      <Search className="mr-2 h-5 w-5" />
                      Explore Nearby
                    </span>
                  </Link>
                </Button>
              </div>
            </div>
            {/* Right: Penguin */}
            <div className="md:w-1/3 flex justify-center">
              <PennyPenguin />
            </div>
          </div>
        </div>
      </div>
      {/* Down arrow */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center pointer-events-none">
        <a
          href="#featured"
          className="w-12 h-12 bg-saffron-500 text-white rounded-full flex items-center justify-center shadow-lg transition-transform duration-300 animate-bounce border-2 border-white/20 hover:scale-105"
          aria-label="Scroll down"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
            stroke="currentColor" className="h-7 w-7"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </a>
      </div>
    </section>
  );
};

export default HeroSection;

