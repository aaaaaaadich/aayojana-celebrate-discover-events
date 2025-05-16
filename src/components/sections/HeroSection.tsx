import { Pocket } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import PennyPenguin from "../PennyPenguin";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center bg-gradient-to-b from-blue-50 to-white dark:from-nepali-800 dark:to-nepali-900">
      {/* Abstract background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-blue-100 dark:bg-blue-900/20 rounded-full blur-3xl opacity-60 -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-blue-100/80 dark:bg-blue-900/30 rounded-full blur-3xl opacity-60 translate-y-1/4 -translate-x-1/4"></div>
        
        {/* Floating pockets - fewer and more subtle */}
        {[...Array(3)].map((_, i) => (
          <Pocket
            key={i}
            className={`absolute text-blue-500/10 dark:text-blue-400/10
              ${i % 2 === 0 ? 'animate-float' : 'animate-float-reverse'}`}
            size={getRandomSize()}
            style={{
              top: `${20 + Math.random() * 60}%`,
              left: `${Math.random() * 90}%`,
              animationDelay: `${i * 1.5}s`,
              animationDuration: `${5 + Math.random() * 5}s`,
              transform: `rotate(${Math.random() * 360}deg)`
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left: Content */}
          <div className="text-center md:text-left">
            <div className="inline-block mb-4 px-4 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium">
              Nepal's First Digital Event Platform
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 tracking-tight text-gray-900 dark:text-white">
              <span className="bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-400 dark:to-blue-600 bg-clip-text text-transparent">
                Organize, Discover
              </span>
              <br />
              <span className="text-gray-800 dark:text-gray-100">
                & Celebrate Events
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-xl">
              Nepal's first smart digital event platform connecting organizers with attendees through innovative features and a locally inspired experience.
            </p>
            
            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Button
                asChild
                className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white text-lg py-6 px-8 shadow-lg shadow-blue-500/20"
              >
                <Link to="/create-event">Create Event</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-500 text-lg py-6 px-8"
              >
                <Link to="/explore">Explore Events</Link>
              </Button>
            </div>
            
            {/* Trust indicators */}
            <div className="mt-10 flex flex-wrap items-center justify-center md:justify-start gap-6">
              <div className="flex items-center space-x-1 text-gray-500 dark:text-gray-400 text-sm">
                <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <span>Trusted by 500+ organizers</span>
              </div>
              <div className="flex items-center space-x-1 text-gray-500 dark:text-gray-400 text-sm">
                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <span>Secure payment processing</span>
              </div>
            </div>
          </div>
          
          {/* Right: Image/Illustration */}
          <div className="flex justify-center md:justify-end relative">
            <div className="relative z-10 w-80 h-80 md:w-96 md:h-96 perspective-800">
              <div className="absolute inset-0 rounded-full bg-blue-500/10 dark:bg-blue-400/10 blur-2xl"></div>
              <div className="relative animate-3d-float">
                <PennyPenguin />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Utility function for pocket sizes
const getRandomSize = () => {
  const sizes = [48, 64, 80];
  return sizes[Math.floor(Math.random() * sizes.length)];
};

export default HeroSection;
