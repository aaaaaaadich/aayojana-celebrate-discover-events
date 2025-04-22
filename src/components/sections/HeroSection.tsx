
import { Pocket } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import PennyPenguin from "../PennyPenguin";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-b from-background via-background/95 to-background/90">
      {/* Floating pockets background effect */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute w-full h-full">
          {[...Array(6)].map((_, i) => (
            <Pocket
              key={i}
              className={`absolute text-primary/5 dark:text-primary/10 
                ${i % 2 === 0 ? 'animate-float' : 'animate-float-reverse'}
                ${getRandomPosition()}`}
              size={getRandomSize()}
              style={{
                animationDelay: `${i * 0.5}s`,
                transform: `rotate(${Math.random() * 360}deg)`
              }}
            />
          ))}
        </div>
      </div>

      {/* Soft color overlay gradients - theme aware */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background pointer-events-none" />

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto py-12">
          <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-6 md:gap-12">
            {/* Left: Headline, description, buttons */}
            <div className="text-center md:text-left md:w-2/3">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 animate-fade-in leading-tight tracking-tight">
                <span className="bg-gradient-to-r from-blue-500 to-blue-700 dark:from-blue-400 dark:to-blue-600 bg-clip-text text-transparent">
                  Organize, Discover & Celebrate
                </span>
                <br />
                <span className="text-blue-700 dark:text-blue-300">
                  Your Events in Nepal
                </span>
              </h1>
              <p
                className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl mx-auto animate-fade-in"
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
                  className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white text-lg py-5 px-8 animate-hover-lift shadow-lg shadow-blue-500/20"
                >
                  <Link to="/create-event">Create Event</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-500 text-lg py-5 px-8 animate-hover-lift"
                >
                  <Link to="/explore">Explore Nearby</Link>
                </Button>
              </div>
            </div>
            {/* Right: Penguin with subtle blur oval frame */}
            <div className="md:w-1/3 flex justify-center relative">
              <div
                aria-hidden="true"
                className="absolute inset-0 rounded-full bg-blue-500/10 dark:bg-blue-400/10 blur-[36px] -translate-y-2 scale-110 pointer-events-none"
              />
              <PennyPenguin />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Utility functions for pocket positions and sizes
const getRandomPosition = () => {
  const positions = [
    'top-1/4 left-1/4',
    'top-1/3 right-1/4',
    'bottom-1/4 left-1/3',
    'bottom-1/3 right-1/3',
    'top-1/2 left-1/2',
    'bottom-1/2 right-1/2'
  ];
  return positions[Math.floor(Math.random() * positions.length)];
};

const getRandomSize = () => {
  const sizes = [48, 64, 80, 96];
  return sizes[Math.floor(Math.random() * sizes.length)];
};

export default HeroSection;
