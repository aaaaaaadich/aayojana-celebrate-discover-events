
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Sun, Moon, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DesktopNav } from "./navigation/DesktopNav";
import { MobileNav } from "./navigation/MobileNav";
import { AuthModal } from "./auth/AuthModal";
import { UserMenu } from "./auth/UserMenu";
import { useAuth } from "@/contexts/AuthContext";

interface NavbarProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const Navbar = ({ isDarkMode, toggleDarkMode }: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const location = useLocation();
  const { user, loading } = useAuth();

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
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled || isMobileMenuOpen
          ? "bg-white/90 dark:bg-nepali-700/90 backdrop-blur-xl shadow-xl py-3 border-b border-white/20"
          : "bg-transparent py-5"
      }`}>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-transparent to-saffron-500/5 pointer-events-none"></div>
        
        <div className="container mx-auto px-4 flex items-center justify-between relative">
          <Link 
            to="/" 
            className="flex items-center space-x-2 group animate-fade-in"
          >
            <div className="relative">
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 dark:from-blue-400 dark:via-blue-500 dark:to-blue-600 bg-clip-text text-transparent transition-all duration-500 transform group-hover:scale-110 animate-gradient-flow bg-[length:200%_auto]">
                Aayojana
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-800 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500 pointer-events-none"></div>
            </div>
          </Link>

          <DesktopNav />

          <div className="hidden md:flex items-center space-x-4">
            <Button 
              variant="outline" 
              size="icon" 
              onClick={toggleDarkMode} 
              className="rounded-full border-2 border-transparent hover:border-saffron-500/50 hover:bg-saffron-50 dark:hover:bg-saffron-900/20 transition-all duration-300 transform hover:scale-110 animate-hover-lift group"
              aria-label="Toggle dark mode"
            >
              <div className="relative">
                {isDarkMode ? (
                  <Sun size={18} className="group-hover:rotate-180 transition-transform duration-500" />
                ) : (
                  <Moon size={18} className="group-hover:rotate-12 transition-transform duration-500" />
                )}
              </div>
            </Button>
            
            {loading ? (
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-200 to-saffron-200 dark:from-blue-700 dark:to-saffron-700 animate-pulse"></div>
            ) : user ? (
              <div className="animate-fade-in">
                <UserMenu />
              </div>
            ) : (
              <Button 
                onClick={() => setIsAuthModalOpen(true)}
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white transition-all duration-300 transform hover:scale-105 hover:shadow-lg animate-fade-in glow-on-hover font-medium px-6"
              >
                Sign In
              </Button>
            )}
          </div>

          <div className="flex items-center space-x-4 md:hidden">
            <Button 
              variant="outline" 
              size="icon" 
              onClick={toggleDarkMode} 
              className="rounded-full border-2 border-transparent hover:border-saffron-500/50 transition-all duration-300 transform hover:scale-110"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
            </Button>
            
            {!loading && !user && (
              <Button 
                onClick={() => setIsAuthModalOpen(true)}
                size="sm"
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white transition-all duration-300 transform hover:scale-105"
              >
                Sign In
              </Button>
            )}
            
            {!loading && user && (
              <div className="animate-fade-in">
                <UserMenu />
              </div>
            )}
            
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
              className="relative hover:bg-blue-50 dark:hover:bg-nepali-600 transition-all duration-300 transform hover:scale-110"
            >
              <div className={`transition-all duration-300 ${isMobileMenuOpen ? "opacity-0 rotate-90" : "opacity-100 rotate-0"}`}>
                <Menu size={24} />
              </div>
              <div className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${isMobileMenuOpen ? "opacity-100 rotate-0" : "opacity-0 rotate-90"}`}>
                <X size={24} />
              </div>
            </Button>
          </div>
        </div>

        <MobileNav isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
      </header>

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
      />
    </>
  );
};

export default Navbar;
