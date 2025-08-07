
import { useState } from "react";
import { Link } from "react-router-dom";
import { X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { navigationConfig } from "@/config/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { useUserRoles } from "@/hooks/useUserRoles";
import { LoginPromptModal } from "@/components/auth/LoginPromptModal";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileNav = ({ isOpen, onClose }: MobileNavProps) => {
  const { user } = useAuth();
  const { hasRole } = useUserRoles();
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [currentFeature, setCurrentFeature] = useState("");
  const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({});

  const handleProtectedRouteClick = (feature: string) => {
    if (!user) {
      setCurrentFeature(feature);
      setShowLoginPrompt(true);
    }
  };

  const toggleMenu = (menuKey: string) => {
    setOpenMenus(prev => ({
      ...prev,
      [menuKey]: !prev[menuKey]
    }));
  };

  return (
    <>
      <div className={`fixed inset-0 z-40 md:hidden transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="glassmorphism-dark backdrop-blur-xl h-full w-full">
          <div className="flex flex-col h-full p-6">
            <div className="flex justify-between items-center mb-8">
              <span className="text-2xl font-bold text-white">Menu</span>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="text-white hover:bg-white/20"
              >
                <X size={24} />
              </Button>
            </div>

            <nav className="flex-1 space-y-4">
              <Link 
                to="/" 
                onClick={onClose}
                className="block py-3 px-4 text-white hover:bg-white/20 rounded-lg transition-colors"
              >
                Home
              </Link>

              {/* Discover Events - Protected */}
              <Collapsible open={openMenus.discover}>
                <CollapsibleTrigger 
                  className="flex items-center justify-between w-full py-3 px-4 text-white hover:bg-white/20 rounded-lg transition-colors"
                  onClick={() => {
                    if (user) {
                      toggleMenu('discover');
                    } else {
                      handleProtectedRouteClick("Discover Events");
                    }
                  }}
                >
                  {navigationConfig.discoverEvents.title}
                  {user && <ChevronDown className={`h-4 w-4 transition-transform ${openMenus.discover ? 'rotate-180' : ''}`} />}
                </CollapsibleTrigger>
                {user && (
                  <CollapsibleContent className="pl-4 space-y-2">
                    {navigationConfig.discoverEvents.items.map((item) => (
                      <Link
                        key={item.href}
                        to={item.href}
                        onClick={onClose}
                        className="block py-2 px-4 text-white/80 hover:text-white hover:bg-white/10 rounded transition-colors"
                      >
                        {item.title}
                      </Link>
                    ))}
                  </CollapsibleContent>
                )}
              </Collapsible>

              {/* For Organizers - Only show if user is organizer */}
              {user && hasRole('organizer') && (
                <Collapsible open={openMenus.organizers}>
                  <CollapsibleTrigger 
                    className="flex items-center justify-between w-full py-3 px-4 text-white hover:bg-white/20 rounded-lg transition-colors"
                    onClick={() => toggleMenu('organizers')}
                  >
                    {navigationConfig.forOrganizers.title}
                    <ChevronDown className={`h-4 w-4 transition-transform ${openMenus.organizers ? 'rotate-180' : ''}`} />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="pl-4 space-y-2">
                    {navigationConfig.forOrganizers.items.map((item) => (
                      <Link
                        key={item.href}
                        to={item.href}
                        onClick={onClose}
                        className="block py-2 px-4 text-white/80 hover:text-white hover:bg-white/10 rounded transition-colors"
                      >
                        {item.title}
                      </Link>
                    ))}
                  </CollapsibleContent>
                </Collapsible>
              )}


              {/* Always visible links */}
              <Link 
                to="/features" 
                onClick={onClose}
                className="block py-3 px-4 text-white hover:bg-white/20 rounded-lg transition-colors"
              >
                Features
              </Link>
              
              <Link 
                to="/about" 
                onClick={onClose}
                className="block py-3 px-4 text-white hover:bg-white/20 rounded-lg transition-colors"
              >
                About
              </Link>
              
              <Link 
                to="/contact" 
                onClick={onClose}
                className="block py-3 px-4 text-white hover:bg-white/20 rounded-lg transition-colors"
              >
                Contact
              </Link>
            </nav>
          </div>
        </div>
      </div>

      <LoginPromptModal 
        isOpen={showLoginPrompt}
        onClose={() => setShowLoginPrompt(false)}
        feature={currentFeature}
      />
    </>
  );
};
