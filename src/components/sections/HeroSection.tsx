import { Pocket } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

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
          
          {/* Right: Realistic Penguin SVG Illustration */}
          <div className="flex justify-center md:justify-end relative">
            <div className="relative z-10 w-80 h-80 md:w-96 md:h-96 flex items-end">
              {/* Realistic 3D SVG Penguin */}
              <svg
                viewBox="0 0 320 380"
                width="100%"
                height="100%"
                className="drop-shadow-xl object-cover rounded-3xl border-4 border-blue-100 dark:border-blue-900 bg-white"
                style={{ objectPosition: "center bottom" }}
                aria-label="Realistic 3D Penguin"
                role="img"
              >
                <defs>
                  <radialGradient id="bodyGray" cx="50%" cy="60%" r="80%">
                    <stop offset="0%" stopColor="#ececec"/>
                    <stop offset="55%" stopColor="#bbb"/>
                    <stop offset="100%" stopColor="#23252a"/>
                  </radialGradient>
                  <linearGradient id="chestWhite" x1="50%" y1="45%" x2="50%" y2="100%">
                    <stop offset="0%" stopColor="#fff"/>
                    <stop offset="55%" stopColor="#e0e0e0"/>
                    <stop offset="100%" stopColor="#bdbdbd"/>
                  </linearGradient>
                  <linearGradient id="beakGrad" x1="30%" y1="60%" x2="100%" y2="50%">
                    <stop offset="0%" stopColor="#fbbd4a"/>
                    <stop offset="100%" stopColor="#c97d03"/>
                  </linearGradient>
                  <radialGradient id="headBlack" cx="50%" cy="60%" r="75%">
                    <stop offset="0%" stopColor="#393f43"/>
                    <stop offset="90%" stopColor="#141617"/>
                  </radialGradient>
                  <linearGradient id="orangeGrad" x1="20%" y1="30%" x2="100%" y2="70%">
                    <stop offset="0%" stopColor="#ffdb84"/>
                    <stop offset="80%" stopColor="#f7ae1b"/>
                  </linearGradient>
                  <radialGradient id="shadow" cx="50%" cy="100%" r="60%">
                    <stop offset="60%" stopColor="#000" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#000" stopOpacity="0" />
                  </radialGradient>
                </defs>
                {/* Shadow */}
                <ellipse cx="160" cy="368" rx="88" ry="18" fill="url(#shadow)" />
                {/* Body */}
                <ellipse cx="160" cy="200" rx="92" ry="144" fill="url(#bodyGray)" />
                {/* Left Flipper */}
                <ellipse cx="54" cy="220" rx="24" ry="60" fill="#23252a" opacity="0.96" transform="rotate(-20 54 220)"/>
                {/* Right Flipper */}
                <ellipse cx="266" cy="220" rx="24" ry="63" fill="#1b1d24" opacity="0.96" transform="rotate(20 266 220)"/>
                {/* Chest */}
                <ellipse cx="160" cy="237" rx="68" ry="110" fill="url(#chestWhite)" />
                {/* Head */}
                <ellipse cx="160" cy="97" rx="65" ry="65" fill="url(#headBlack)" />
                {/* Chin highlight */}
                <ellipse cx="160" cy="133" rx="27" ry="11" fill="#fff" opacity="0.32"/>
                {/* Orange side patch (left, Emperor penguin style) */}
                <ellipse cx="104" cy="120" rx="18" ry="14" fill="url(#orangeGrad)" opacity="0.82" />
                {/* Orange side patch (right) */}
                <ellipse cx="216" cy="120" rx="17" ry="13" fill="url(#orangeGrad)" opacity="0.73" />
                {/* Eyes */}
                <ellipse cx="133" cy="96" rx="9" ry="13" fill="#fff" />
                <ellipse cx="187" cy="96" rx="9" ry="13" fill="#fff" />
                {/* Pupils */}
                <ellipse cx="133" cy="101" rx="4.8" ry="6" fill="#23252a" />
                <ellipse cx="187" cy="101" rx="4.8" ry="6" fill="#23252a" />
                {/* Small catchlight */}
                <ellipse cx="136" cy="98" rx="1.2" ry="2" fill="#fff" opacity="0.7" />
                <ellipse cx="190" cy="98" rx="1.2" ry="2" fill="#fff" opacity="0.7" />
                {/* Beak - upper */}
                <path d="M155 124 Q160 129 165 124 Q163 120 160 122 Q157 120 155 124 Z"
                  fill="#2C2213"/>
                {/* Beak - lower part */}
                <path d="M155 124 Q160 130 165 124 Q160 127 155 124 Z" fill="url(#beakGrad)" />
                {/* Beak - highlight */}
                <path d="M160 127 Q161 128 162 127 Q161 126 160 127 Z" fill="#fff" opacity="0.70"/>
                {/* Feet */}
                <ellipse cx="120" cy="352" rx="23" ry="14" fill="url(#beakGrad)" opacity="0.97"/>
                <ellipse cx="200" cy="352" rx="23" ry="14" fill="url(#beakGrad)" opacity="0.97"/>
                {/* Foot claws */}
                <ellipse cx="110" cy="356" rx="4" ry="3" fill="#825703"/>
                <ellipse cx="120" cy="361" rx="3" ry="2.5" fill="#825703"/>
                <ellipse cx="130" cy="357" rx="3" ry="2.5" fill="#825703"/>
                <ellipse cx="190" cy="355" rx="4" ry="3" fill="#825703"/>
                <ellipse cx="200" cy="360" rx="3" ry="2.5" fill="#825703"/>
                <ellipse cx="210" cy="356" rx="3" ry="2.5" fill="#825703"/>
                {/* Chest curve contour */}
                <ellipse cx="183" cy="230" rx="44" ry="69" fill="#fff" opacity="0.10"/>
              </svg>
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
