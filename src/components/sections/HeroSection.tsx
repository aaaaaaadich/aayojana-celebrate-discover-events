
import { CalendarPlus, Search, Flower2, Star, Cloud, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import PennyPenguin from "../PennyPenguin";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-b from-[#0A2647] via-[#034078] to-[#04293A]">
      {/* LAYERED SOFT BLURS - premium soft geometry in blue */}
      <div
        className="absolute z-0 inset-0 pointer-events-none"
        aria-hidden="true"
      >
        {/* Large blue blurred blobs */}
        <div
          className="absolute top-10 left-1/4 w-[520px] h-[360px] bg-[#1B4965] blur-[120px] rounded-[120px] opacity-60 animate-slow-float"
          style={{ animationDuration: "12s" }}
        />
        <div
          className="absolute bottom-12 right-8 w-[360px] h-[220px] bg-[#14406E] blur-[100px] rounded-[96px] opacity-50 animate-slow-float"
          style={{ animationDuration: "16s", animationDelay: "1.2s" }}
        />
        {/* Soft polygons layered */}
        <div
          className="absolute top-2/5 left-[-80px] w-[200px] h-[180px] bg-[#1E6091] blur-[80px] rounded-[80px] opacity-30 animate-slow-float"
          style={{ animationDuration: "14s", animationDelay: "0.9s" }}
        />
        {/* Gradient overlay for smooth dark blend */}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,38,71,0.8)_0%,rgba(4,41,58,0.9)_100%)] opacity-90" />
      </div>

      {/* Animated medium subtle motifs (Clouds, Flower, Star) with slow gentle motion */}
      <Cloud
        className="absolute left-14 top-24 w-11 h-11 text-blue-300 opacity-50 animate-slow-float"
        style={{ animationDuration: "18s" }}
      />
      <Cloud
        className="absolute right-20 top-32 w-12 h-12 text-blue-200 opacity-35 animate-slow-float"
        style={{ animationDuration: "22s", animationDelay: "2.2s" }}
      />
      <Flower2
        className="absolute right-[38%] top-16 w-10 h-10 text-[#90CAF9] opacity-25 animate-rotate-slow-smooth"
      />
      <Star
        className="absolute left-1/4 bottom-20 w-7 h-7 text-[#FFC107] opacity-50 animate-pulse-slow"
      />
      <Sparkles
        className="absolute right-24 bottom-48 w-8 h-8 text-[#FFF176]/30 animate-pulse-slow"
      />

      {/* Decorative "prayer-flag" ribbon - subtle blue toned */}
      <div className="absolute top-14 left-0 right-0 z-10 flex justify-center pointer-events-none">
        <div className="flex gap-2">
          {["#1B4965", "#90CAF9", "#FFC107", "#256D85", "#14406E"].map((color, i) => (
            <div
              key={i}
              className="w-9 h-12 rounded-full opacity-60"
              style={{
                background: `radial-gradient(circle at 70% 30%, #fff 25%, ${color} 100%)`,
                animation: "slow-float 5s ease-in-out infinite",
                animationDelay: `${i * 1}s`
              }}
            />
          ))}
        </div>
      </div>

      {/* Decorative corners - thin fading blue gradient lines */}
      <div className="absolute top-0 left-0 w-28 h-28">
        <div className="w-full h-[3px] bg-gradient-to-r from-[#0794f2]/40 to-transparent rounded-full" />
        <div className="h-full w-[3px] bg-gradient-to-b from-[#0794f2]/40 to-transparent rounded-full" />
      </div>
      <div className="absolute top-0 right-0 w-28 h-28 flex flex-col items-end">
        <div className="w-full h-[3px] bg-gradient-to-l from-[#0794f2]/30 to-transparent rounded-full" />
        <div className="h-full w-[3px] bg-gradient-to-b from-[#0794f2]/2 to-transparent rounded-full" />
      </div>
      <div className="absolute bottom-0 left-0 w-28 h-28 flex flex-col">
        <div className="w-full h-[3px] bg-gradient-to-r from-[#0794f2]/2 to-transparent rounded-full" />
        <div className="h-full w-[3px] bg-gradient-to-t from-[#0794f2]/30 to-transparent rounded-full" />
      </div>
      <div className="absolute bottom-0 right-0 w-28 h-28 flex flex-col items-end">
        <div className="w-full h-[3px] bg-gradient-to-l from-[#0794f2]/40 to-transparent rounded-full" />
        <div className="h-full w-[3px] bg-gradient-to-t from-[#0794f2]/10 to-transparent rounded-full" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto py-12">
          <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-6 md:gap-12">
            {/* Left: Headline, description, buttons, smaller details */}
            <div className="text-center md:text-left md:w-2/3 text-white">
              {/* Decorative lines */}
              <div className="mb-4 hidden md:flex gap-1 items-center">
                <span className="block w-14 h-1 bg-gradient-to-r from-[#3ea0f2] to-[#0a52a8] rounded-full animate-shimmer" />
                <span className="block w-8 h-1 bg-gradient-to-r from-[#012a51] to-[#3ea0f2] rounded-full animate-shimmer" />
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 animate-fade-in leading-tight tracking-tight drop-shadow-lg">
                <span className="bg-gradient-to-r from-[#3ea0f2] to-[#0a52a8] bg-clip-text text-transparent">
                  Organize, Discover & Celebrate
                </span>
                <br />
                <span className="text-[#90CAF9]">Your Events in Nepal</span>
              </h1>
              <p
                className="text-lg md:text-xl text-blue-200 mb-8 max-w-xl mx-auto animate-fade-in"
                style={{ animationDelay: "0.18s" }}
              >
                Nepal's first smart digital event platform connecting organizers with attendees through innovative features and a locally inspired, beautiful aesthetic experience.
              </p>
              {/* Buttons */}
              <div
                className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start animate-fade-in"
                style={{ animationDelay: "0.3s" }}
              >
                <Button
                  asChild
                  className="bg-[#3ea0f2] hover:bg-[#0a52a8] text-white text-lg py-5 px-8 animate-hover-lift shadow-lg shadow-[#3ea0f2]/30"
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
                  className="border-[#0a52a8] text-[#0a52a8] hover:bg-[#0a52a8] hover:text-white text-lg py-5 px-8 animate-hover-lift"
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
            {/* Right: Penguin with subtle blur oval frame */}
            <div className="md:w-1/3 flex justify-center relative">
              <div
                aria-hidden="true"
                className="absolute inset-0 rounded-full bg-[#3ea0f2]/20 blur-[36px] -translate-y-2 scale-110 pointer-events-none"
              />
              <PennyPenguin />
            </div>
          </div>
        </div>
      </div>
      {/* Down arrow */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center pointer-events-none">
        <a
          href="#featured"
          className="w-12 h-12 bg-[#3ea0f2] text-white rounded-full flex items-center justify-center shadow-lg transition-transform duration-300 animate-bounce border-2 border-white/20 hover:scale-105"
          aria-label="Scroll down"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="h-7 w-7"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </a>
      </div>

      <style>{`
        @keyframes slow-float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-8px);
          }
        }
        .animate-slow-float {
          animation: slow-float 10s ease-in-out infinite;
        }
        @keyframes rotate-slow-smooth {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
        .animate-rotate-slow-smooth {
          animation: rotate-slow-smooth 40s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
