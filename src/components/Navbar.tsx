
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Sun, Moon, Menu, X, Sparkles, Zap } from "lucide-react";
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
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        isScrolled || isMobileMenuOpen
          ? "glassmorphism shadow-2xl py-3 border-b border-white/20 dark:border-nepali-600/30"
          : "bg-transparent py-5"
      } animate-slide-up`}>
        
        {/* Floating Particles */}
        <div className="absolute top-2 left-4 w-1 h-1 bg-blue-500/30 rounded-full animate-float"></div>
        <div className="absolute top-4 right-8 w-1.5 h-1.5 bg-saffron-500/20 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-2 left-1/3 w-1 h-1 bg-blue-600/15 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
        
        <div className="container mx-auto px-4 flex items-center justify-between relative z-10">
          <Link 
            to="/" 
            className="flex items-center space-x-2 group animate-3d-hover"
          >
            <div className="relative animate-magnetic">
              {/* Logo Text with Gradient Animation */}
              <span className="text-2xl font-bold animate-gradient-flow bg-clip-text text-transparent transition-all duration-700 transform group-hover:scale-110 relative z-10">
                Aayojana
              </span>
              
              {/* Decorative Elements */}
              <Sparkles className="absolute -top-1 -right-1 w-3 h-3 text-saffron-500/70 opacity-0 group-hover:opacity-100 animate-bounce-in icon-hover" style={{ animationDelay: '0.1s' }} />
              <Zap className="absolute -bottom-1 -left-1 w-2 h-2 text-blue-500/60 opacity-0 group-hover:opacity-100 animate-bounce-in icon-hover" style={{ animationDelay: '0.2s' }} />
            </div>
          </Link>

          <DesktopNav />

          <div className="hidden md:flex items-center space-x-4">
            <Button 
              variant="outline" 
              size="icon" 
              onClick={toggleDarkMode} 
              className="rounded-full border-2 border-transparent hover:border-saffron-500/50 hover:bg-saffron-50 dark:hover:bg-saffron-900/20 transition-all duration-500 animate-hover-lift animate-3d-hover group overflow-hidden animate-pulse-glow"
              aria-label="Toggle dark mode"
            >
              <div className="relative animate-magnetic">
                {isDarkMode ? (
                  <Sun size={18} className="group-hover:rotate-180 transition-transform duration-700 animate-bounce-in icon-hover" />
                ) : (
                  <Moon size={18} className="group-hover:rotate-12 transition-transform duration-700 animate-bounce-in icon-hover" />
                )}
              </div>
            </Button>
            
            {loading ? (
              <div className="w-10 h-10 rounded-full animate-gradient-flow animate-pulse"></div>
            ) : user ? (
              <div>
                <UserMenu />
              </div>
            ) : (
              <Button 
                onClick={() => setIsAuthModalOpen(true)}
                className="btn-premium text-white transition-all duration-500 animate-hover-lift font-medium px-6 animate-morph group overflow-hidden"
              >
                <span>Sign In</span>
                <Sparkles className="ml-2 w-4 h-4 opacity-0 group-hover:opacity-100 animate-bounce-in icon-hover" style={{ animationDelay: '0.1s' }} />
              </Button>
            )}
          </div>

          <div className="flex items-center space-x-4 md:hidden">
            <Button 
              variant="outline" 
              size="icon" 
              onClick={toggleDarkMode} 
              className="rounded-full border-2 border-transparent hover:border-saffron-500/50 transition-all duration-500 animate-3d-hover animate-pulse-glow"
              aria-label="Toggle dark mode"
            >
              <div className="animate-magnetic">
                {isDarkMode ? <Sun size={18} className="animate-bounce-in icon-hover" /> : <Moon size={18} className="animate-bounce-in icon-hover" />}
              </div>
            </Button>
            
            {!loading && !user && (
              <Button 
                onClick={() => setIsAuthModalOpen(true)}
                size="sm"
                className="btn-premium text-white transition-all duration-500 animate-hover-lift"
              >
                <span>Sign In</span>
              </Button>
            )}
            
            {!loading && user && (
              <div>
                <UserMenu />
              </div>
            )}
            
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
              className="relative hover:bg-blue-50 dark:hover:bg-nepali-600 transition-all duration-500 animate-hover-lift animate-3d-hover group overflow-hidden"
            >
              {/* Menu Icon Animation */}
              <div className={`transition-all duration-500 ${isMobileMenuOpen ? "opacity-0 rotate-90 scale-75" : "opacity-100 rotate-0 scale-100"} animate-magnetic`}>
                <Menu size={24} />
              </div>
              <div className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${isMobileMenuOpen ? "opacity-100 rotate-0 scale-100" : "opacity-0 rotate-90 scale-75"} animate-magnetic`}>
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
