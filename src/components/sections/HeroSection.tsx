
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Infinity3D from "@/components/Infinity3D";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center bg-gradient-to-b from-saffron-100 via-blue-50 to-white dark:from-nepali-800 dark:via-blue-900/20 dark:to-nepali-900 py-36 md:py-44 overflow-hidden">
      {/* Background Glow/Mandala */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {/* Glowing Mandala radial illustration */}
        <div
          className="absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] max-w-2xl max-h-2xl rounded-full opacity-25 blur-3xl"
          style={{
            background:
              "radial-gradient(ellipse at center, #F4A26190 0%, #4e7dd199 80%, #fff0 100%)",
          }}
        ></div>
        {/* Decorative border pattern on top (REMOVED) */}
        {/* Two arrow-like background elements (REMOVED) */}
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 z-10 relative">
        <div className="grid md:grid-cols-2 gap-y-20 gap-x-24 items-center">
          {/* Left: Content */}
          <div className="text-center md:text-left max-w-2xl md:max-w-xl mx-auto md:mx-0">
            <div className="inline-block mb-6 px-6 py-2 bg-saffron-500/10 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 rounded-full text-base md:text-lg font-semibold backdrop-blur">
              Nepal's First Digital Event Platform
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-8 tracking-tight text-gray-900 dark:text-white text-gradient-animate transition-all duration-300">
              <span className="bg-gradient-to-r from-blue-700 via-blue-500 to-saffron-500 dark:from-blue-300 dark:via-saffron-500 dark:to-white bg-clip-text text-transparent shadow-sm">
                Organize, Discover
              </span>
              <br />
              <span className="text-saffron-600 dark:text-saffron-400 drop-shadow">
                & Celebrate Events
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-blue-900 dark:text-blue-100 mb-12 md:mb-12 font-medium max-w-xl">
              The future of events in Nepal: organize, browse, and celebrate with stunning, smart and secure digital experiences.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center md:justify-start mb-12">
              <Button
                asChild
                className="bg-saffron-500 hover:bg-saffron-600 dark:bg-blue-500 dark:hover:bg-blue-600 text-white text-xl py-7 px-10 shadow-lg shadow-saffron-500/30 font-bold rounded-full animate-hover-lift"
              >
                <Link to="/create-event">Create Event</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-saffron-500 text-saffron-500 hover:bg-saffron-500 hover:text-white dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-500 text-xl py-7 px-10 rounded-full animate-hover-lift"
              >
                <Link to="/explore">Explore Events</Link>
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="mt-14 flex flex-wrap items-center justify-center md:justify-start gap-8">
              <div className="flex items-center space-x-2 text-gray-500 dark:text-gray-300 text-lg">
                <svg className="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <span>
                  Trusted by <b className="text-blue-800 dark:text-blue-200">500+</b> organizers
                </span>
              </div>
              <div className="flex items-center space-x-2 text-gray-500 dark:text-gray-300 text-lg">
                <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <span>Secure payments</span>
              </div>
            </div>
          </div>
          {/* Right: 3D Infinity Illustration (Infinity3D replaces Penguin) */}
          <div className="flex justify-center md:justify-end relative mt-10 md:mt-0">
            <div className="relative z-10 w-64 h-64 md:w-96 md:h-96 flex items-center justify-center drop-shadow-xl transition-all duration-500 animate-float group">
              <Infinity3D />
              {/* Optional: Glowy circle behind Infinity */}
              <div className="absolute -z-10 left-1/2 -translate-x-1/2 bottom-2 w-72 h-36 bg-saffron-500/50 rounded-full blur-2xl opacity-40 shadow-2xl pointer-events-none"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

