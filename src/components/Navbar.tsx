
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Sun, Moon, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DesktopNav } from "./navigation/DesktopNav";
import { MobileNav } from "./navigation/MobileNav";

interface NavbarProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const Navbar = ({ isDarkMode, toggleDarkMode }: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setIsScrolled(offset > 50);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  // Add body class when mobile menu is open to prevent scrolling
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [isMobileMenuOpen]);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled || isMobileMenuOpen
        ? "bg-white/95 dark:bg-nepali-700/95 backdrop-blur-md shadow-md py-3"
        : "bg-white/0 dark:bg-transparent py-5"
    }`}>
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo with Aayojana text */}
        <Link 
          to="/" 
          className="flex items-center space-x-2 group relative"
          style={{ minWidth: 130 }}
        >
          {/* Decorative logo behind text */}
          <span
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none"
            aria-hidden="true"
            style={{
              width: 58,
              height: 58,
              opacity: 0.15,
              zIndex: 0,
            }}
          >
            <img
              src="/lovable-uploads/11b101da-3409-4529-a4d3-2ffe5f547639.png"
              alt=""
              className="w-full h-full object-contain"
              draggable={false}
            />
          </span>
          {/* Text sits above logo */}
          <span className="relative z-10 text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-400 dark:to-blue-600 bg-clip-text text-transparent transition-all duration-300 transform group-hover:scale-105">
            Aayojana
          </span>
        </Link>

        <DesktopNav />

        <div className="hidden md:flex items-center space-x-4">
          <Button 
            variant="outline" 
            size="icon" 
            onClick={toggleDarkMode} 
            className="rounded-full"
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
          </Button>
          <Button 
            asChild
            className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white transition-all duration-300"
          >
            <Link to="/sign-in">Sign In</Link>
          </Button>
        </div>

        <div className="flex items-center space-x-4 md:hidden">
          <Button 
            variant="outline" 
            size="icon" 
            onClick={toggleDarkMode} 
            className="rounded-full"
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
            className="relative"
          >
            <div className={`transition-all duration-300 ${isMobileMenuOpen ? "opacity-0" : "opacity-100"}`}>
              <Menu size={24} />
            </div>
            <div className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${isMobileMenuOpen ? "opacity-100 transform rotate-0" : "opacity-0 transform rotate-90"}`}>
              <X size={24} />
            </div>
          </Button>
        </div>
      </div>

      <MobileNav isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
    </header>
  );
};

export default Navbar;

