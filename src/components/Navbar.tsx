
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Sun, Moon, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

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
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/90 backdrop-blur-md shadow-md py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link 
          to="/" 
          className="flex items-center space-x-2"
        >
          <span className="text-2xl font-bold bg-gradient-to-r from-saffron-500 to-nepali-500 bg-clip-text text-transparent">
            Aayojana
          </span>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link 
            to="/" 
            className="text-foreground hover:text-saffron-500 transition-colors"
          >
            Home
          </Link>
          <Link 
            to="/events" 
            className="text-foreground hover:text-saffron-500 transition-colors"
          >
            Discover Events
          </Link>
          <Link 
            to="/organizers" 
            className="text-foreground hover:text-saffron-500 transition-colors"
          >
            For Organizers
          </Link>
          <Link 
            to="/ticketing" 
            className="text-foreground hover:text-saffron-500 transition-colors"
          >
            Ticketing
          </Link>
          <Link 
            to="/features" 
            className="text-foreground hover:text-saffron-500 transition-colors"
          >
            Features
          </Link>
          <Link 
            to="/about" 
            className="text-foreground hover:text-saffron-500 transition-colors"
          >
            About
          </Link>
          <Link 
            to="/contact" 
            className="text-foreground hover:text-saffron-500 transition-colors"
          >
            Contact
          </Link>
        </nav>

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
          <Button className="bg-saffron-500 hover:bg-saffron-600 text-white">
            Sign In
          </Button>
        </div>

        {/* Mobile Menu Button */}
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
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-md shadow-lg">
          <nav className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <Link 
              to="/" 
              className="text-foreground hover:text-saffron-500 transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/events" 
              className="text-foreground hover:text-saffron-500 transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Discover Events
            </Link>
            <Link 
              to="/organizers" 
              className="text-foreground hover:text-saffron-500 transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              For Organizers
            </Link>
            <Link 
              to="/ticketing" 
              className="text-foreground hover:text-saffron-500 transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Ticketing
            </Link>
            <Link 
              to="/features" 
              className="text-foreground hover:text-saffron-500 transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Features
            </Link>
            <Link 
              to="/about" 
              className="text-foreground hover:text-saffron-500 transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link 
              to="/contact" 
              className="text-foreground hover:text-saffron-500 transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact
            </Link>
            <Button className="bg-saffron-500 hover:bg-saffron-600 text-white w-full">
              Sign In
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
