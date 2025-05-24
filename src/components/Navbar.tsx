
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Sun, Moon, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DesktopNav } from "./navigation/DesktopNav";
import { MobileNav } from "./navigation/MobileNav";

// Assuming your logo is uploaded as /logo.png in the public folder

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
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

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
        ? "bg-white/95 dark:bg-nepali-700/95 backdrop-blur-lg shadow-lg py-2"
        : "bg-transparent dark:bg-transparent py-5"
    }`} // Make sure there is NO 'nepali-border-pattern', 'border-b', or similar line-creating classes here
    style={{
      boxShadow: (isScrolled || isMobileMenuOpen) ? "0 4px 24px 0 rgba(80,170,210,0.05)" : undefined,
      borderBottom: "none",
      backgroundImage: "none"
    }}
    >
      <div className="container mx-auto px-4 flex items-center justify-between relative">
        {/* Logo + Brand with bg logo */}
        <Link to="/" className="flex items-center group relative h-16">
          {/* Layered Logo behind brand text */}
          <span className="absolute left-0 top-1/2 -translate-y-1/2 z-0 pointer-events-none">
            <img
              src="/logo.png"
              alt="Aayojana Logo"
              className="w-14 h-14 opacity-30 group-hover:opacity-60 transition-all duration-300 filter blur-[1px] drop-shadow-[0_2px_15px_rgba(29,53,87,0.23)]"
              style={{
                left: '-8px',
                top: '50%',
                transform: 'translateY(-50%)',
                position: 'absolute',
                zIndex: 0,
                pointerEvents: "none"
              }}
            />
          </span>
          <span className="relative z-10 select-none text-4xl font-extrabold bg-gradient-to-r from-saffron-500 via-blue-600 to-nepali-500 bg-clip-text text-transparent transition-all duration-300 tracking-wide drop-shadow-[0_2px_10px_rgba(29,53,87,0.06)]"
            style={{
              letterSpacing: "0.045em"
            }}
          >
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
            className="bg-blue-700 hover:bg-blue-800 dark:bg-blue-500 dark:hover:bg-blue-600 text-white shadow-lg shadow-blue-700/10"
          >
            <Link to="/sign-in">Sign In</Link>
          </Button>
        </div>

        <div className="flex items-center space-x-2 md:hidden">
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
