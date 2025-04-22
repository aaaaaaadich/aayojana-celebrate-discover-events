
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled
        ? "bg-background/90 backdrop-blur-md shadow-md py-3"
        : "bg-transparent py-5"
    }`}>
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link 
          to="/" 
          className="flex items-center space-x-2 group"
        >
          <span className="text-2xl font-bold bg-gradient-to-r from-saffron-500 to-nepali-500 bg-clip-text text-transparent transition-all duration-300 transform group-hover:scale-105">
            Aayojana
          </span>
        </Link>

        <DesktopNav />

        <div className="hidden md:flex items-center space-x-4">
          <Button 
            variant="outline" 
            size="icon" 
            onClick={toggleDarkMode} 
            className="rounded-full animate-hover-lift"
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? <Sun size={18} className="animate-pulse-slow" /> : <Moon size={18} className="animate-pulse-slow" />}
          </Button>
          <Button 
            onClick={() => window.location.href = "/sign-in"}
            className="bg-gradient-to-r from-saffron-500 to-nepali-500 hover:from-saffron-600 hover:to-nepali-600 text-white animate-hover-lift transition-all duration-300"
          >
            Sign In
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
            {isDarkMode ? <Sun size={18} className="animate-pulse-slow" /> : <Moon size={18} className="animate-pulse-slow" />}
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
