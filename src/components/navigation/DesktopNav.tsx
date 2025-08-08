
import { Link } from "react-router-dom";
import { useState } from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { NavigationLinks } from "./NavigationLinks";
import { MenuItem } from "./MenuItem";
import { navigationConfig } from "@/config/navigation";
import { useUserRoles } from "@/hooks/useUserRoles";
import { useAuth } from "@/contexts/AuthContext";
import { LoginPromptModal } from "@/components/auth/LoginPromptModal";

export const DesktopNav = () => {
  const { user } = useAuth();
  const { hasRole } = useUserRoles();
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [currentFeature, setCurrentFeature] = useState("");

  const handleProtectedRouteClick = (e: React.MouseEvent, feature: string) => {
    if (!user) {
      e.preventDefault();
      setCurrentFeature(feature);
      setShowLoginPrompt(true);
    }
  };

  return (
    <>
      <div className="hidden md:block">
        <NavigationMenu>
          <NavigationMenuList className="gap-2">
            <NavigationMenuItem>
              <Link 
                to="/" 
                className={navigationMenuTriggerStyle() + " animate-hover-lift glassmorphism hover:glassmorphism-strong transition-all duration-300 transform hover:scale-105 font-medium"}
              >
                Home
              </Link>
            </NavigationMenuItem>
            
            {user && hasRole('attendee') && (
              <NavigationMenuItem>
                <Link 
                  to="/calendar" 
                  className={navigationMenuTriggerStyle() + " animate-hover-lift glassmorphism hover:glassmorphism-strong transition-all duration-300 transform hover:scale-105 font-medium"}
                >
                  Calendar
                </Link>
              </NavigationMenuItem>
            )}
            
            {/* Show Discover Events only for logged-in users */}
            <NavigationMenuItem>
              <NavigationMenuTrigger 
                className="animate-hover-lift glassmorphism hover:glassmorphism-strong transition-all duration-300 font-medium data-[state=open]:glassmorphism-strong"
                onClick={(e) => handleProtectedRouteClick(e, "Discover Events")}
              >
                {navigationConfig.discoverEvents.title}
              </NavigationMenuTrigger>
              {user && (
                <NavigationMenuContent>
                  <div className="grid gap-3 p-6 w-[400px] md:w-[500px] lg:w-[600px] glassmorphism-strong shadow-2xl rounded-lg animate-scale-in border-0 animate-pulse-glow">
                    <div className="absolute inset-0 animate-gradient-flow opacity-10 rounded-lg pointer-events-none"></div>
                    
                    <div className="grid grid-cols-2 gap-4 relative">
                      {navigationConfig.discoverEvents.items.map((item, index) => (
                        <div key={item.href} className="stagger-animation animate">
                          <MenuItem
                            title={item.title}
                            description={item.description}
                            href={item.href}
                            delay={index * 100}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </NavigationMenuContent>
              )}
            </NavigationMenuItem>

            {/* Show organizer menu only for logged-in organizers */}
            {user && hasRole('organizer') && (
              <NavigationMenuItem>
                <NavigationMenuTrigger className="animate-hover-lift glassmorphism hover:glassmorphism-strong transition-all duration-300 font-medium data-[state=open]:glassmorphism-strong">
                  {navigationConfig.forOrganizers.title}
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid gap-3 p-6 w-[400px] glassmorphism-strong shadow-2xl rounded-lg animate-scale-in border-0 animate-pulse-glow">
                    <div className="absolute inset-0 animate-gradient-flow opacity-10 rounded-lg pointer-events-none"></div>
                    
                    <div className="relative">
                      {navigationConfig.forOrganizers.items.map((item, index) => (
                        <div key={item.href} className="stagger-animation animate">
                          <MenuItem
                            title={item.title}
                            description={item.description}
                            href={item.href}
                            delay={index * 100}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            )}


            <NavigationLinks />
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      <LoginPromptModal 
        isOpen={showLoginPrompt}
        onClose={() => setShowLoginPrompt(false)}
        feature={currentFeature}
      />
    </>
  );
};
