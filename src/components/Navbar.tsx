
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Sun, Moon, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu";

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
          className="flex items-center space-x-2 group"
        >
          <span className="text-2xl font-bold bg-gradient-to-r from-saffron-500 to-nepali-500 bg-clip-text text-transparent transition-all duration-300 transform group-hover:scale-105">
            Aayojana
          </span>
        </Link>

        {/* Desktop Menu - Enhanced with NavigationMenu */}
        <div className="hidden md:block">
          <NavigationMenu>
            <NavigationMenuList className="gap-1">
              <NavigationMenuItem>
                <Link to="/" className={navigationMenuTriggerStyle() + " animate-hover-lift"}>
                  Home
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="animate-hover-lift">Discover Events</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid gap-3 p-4 w-[400px] md:w-[500px] lg:w-[600px]">
                    <div className="grid grid-cols-2 gap-3">
                      <Link to="/events" className="flex flex-col space-y-1 rounded-md p-3 hover:bg-accent animate-hover-lift glow-on-hover">
                        <div className="text-sm font-medium leading-none text-saffron-500">All Events</div>
                        <div className="text-sm text-muted-foreground">Explore all upcoming events</div>
                      </Link>
                      <Link to="/events/featured" className="flex flex-col space-y-1 rounded-md p-3 hover:bg-accent animate-hover-lift glow-on-hover">
                        <div className="text-sm font-medium leading-none text-saffron-500">Featured Events</div>
                        <div className="text-sm text-muted-foreground">Handpicked premium events</div>
                      </Link>
                      <Link to="/events/nearby" className="flex flex-col space-y-1 rounded-md p-3 hover:bg-accent animate-hover-lift glow-on-hover">
                        <div className="text-sm font-medium leading-none text-saffron-500">Nearby Events</div>
                        <div className="text-sm text-muted-foreground">Events happening close to you</div>
                      </Link>
                      <Link to="/events/categories" className="flex flex-col space-y-1 rounded-md p-3 hover:bg-accent animate-hover-lift glow-on-hover">
                        <div className="text-sm font-medium leading-none text-saffron-500">Categories</div>
                        <div className="text-sm text-muted-foreground">Browse events by category</div>
                      </Link>
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="animate-hover-lift">For Organizers</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid gap-3 p-4 w-[400px]">
                    <Link to="/organizers" className="flex flex-col space-y-1 rounded-md p-3 hover:bg-accent animate-hover-lift glow-on-hover">
                      <div className="text-sm font-medium leading-none text-saffron-500">Event Management</div>
                      <div className="text-sm text-muted-foreground">Tools for organizing events</div>
                    </Link>
                    <Link to="/organizers/analytics" className="flex flex-col space-y-1 rounded-md p-3 hover:bg-accent animate-hover-lift glow-on-hover">
                      <div className="text-sm font-medium leading-none text-saffron-500">Analytics</div>
                      <div className="text-sm text-muted-foreground">Track event performance</div>
                    </Link>
                    <Link to="/organizers/pricing" className="flex flex-col space-y-1 rounded-md p-3 hover:bg-accent animate-hover-lift glow-on-hover">
                      <div className="text-sm font-medium leading-none text-saffron-500">Pricing</div>
                      <div className="text-sm text-muted-foreground">Choose the right plan for you</div>
                    </Link>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="animate-hover-lift">Ticketing</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid gap-3 p-4 w-[400px]">
                    <Link to="/ticketing" className="flex flex-col space-y-1 rounded-md p-3 hover:bg-accent animate-hover-lift glow-on-hover">
                      <div className="text-sm font-medium leading-none text-saffron-500">Ticket Management</div>
                      <div className="text-sm text-muted-foreground">Sell and manage tickets efficiently</div>
                    </Link>
                    <Link to="/ticketing/digital" className="flex flex-col space-y-1 rounded-md p-3 hover:bg-accent animate-hover-lift glow-on-hover">
                      <div className="text-sm font-medium leading-none text-saffron-500">Digital Tickets</div>
                      <div className="text-sm text-muted-foreground">Paperless ticket solutions</div>
                    </Link>
                    <Link to="/ticketing/scanning" className="flex flex-col space-y-1 rounded-md p-3 hover:bg-accent animate-hover-lift glow-on-hover">
                      <div className="text-sm font-medium leading-none text-saffron-500">Scanning Tools</div>
                      <div className="text-sm text-muted-foreground">Quick entry validation</div>
                    </Link>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/features" className={navigationMenuTriggerStyle() + " animate-hover-lift"}>
                  Features
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/about" className={navigationMenuTriggerStyle() + " animate-hover-lift"}>
                  About
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/contact" className={navigationMenuTriggerStyle() + " animate-hover-lift"}>
                  Contact
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

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
          <Button className="bg-saffron-500 hover:bg-saffron-600 text-white animate-hover-lift">
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

      {/* Mobile Menu - Enhanced with animations */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-md shadow-lg animate-fade-in">
          <nav className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <Link 
              to="/" 
              className="text-foreground hover:text-saffron-500 transition-colors py-2 animate-fade-in"
              onClick={() => setIsMobileMenuOpen(false)}
              style={{ animationDelay: "0.1s" }}
            >
              Home
            </Link>
            <Link 
              to="/events" 
              className="text-foreground hover:text-saffron-500 transition-colors py-2 animate-fade-in"
              onClick={() => setIsMobileMenuOpen(false)}
              style={{ animationDelay: "0.2s" }}
            >
              Discover Events
            </Link>
            <Link 
              to="/organizers" 
              className="text-foreground hover:text-saffron-500 transition-colors py-2 animate-fade-in"
              onClick={() => setIsMobileMenuOpen(false)}
              style={{ animationDelay: "0.3s" }}
            >
              For Organizers
            </Link>
            <Link 
              to="/ticketing" 
              className="text-foreground hover:text-saffron-500 transition-colors py-2 animate-fade-in"
              onClick={() => setIsMobileMenuOpen(false)}
              style={{ animationDelay: "0.4s" }}
            >
              Ticketing
            </Link>
            <Link 
              to="/features" 
              className="text-foreground hover:text-saffron-500 transition-colors py-2 animate-fade-in"
              onClick={() => setIsMobileMenuOpen(false)}
              style={{ animationDelay: "0.5s" }}
            >
              Features
            </Link>
            <Link 
              to="/about" 
              className="text-foreground hover:text-saffron-500 transition-colors py-2 animate-fade-in"
              onClick={() => setIsMobileMenuOpen(false)}
              style={{ animationDelay: "0.6s" }}
            >
              About
            </Link>
            <Link 
              to="/contact" 
              className="text-foreground hover:text-saffron-500 transition-colors py-2 animate-fade-in"
              onClick={() => setIsMobileMenuOpen(false)}
              style={{ animationDelay: "0.7s" }}
            >
              Contact
            </Link>
            <Button 
              className="bg-saffron-500 hover:bg-saffron-600 text-white w-full animate-fade-in"
              style={{ animationDelay: "0.8s" }}
            >
              Sign In
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
