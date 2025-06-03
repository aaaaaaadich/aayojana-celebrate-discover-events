
import { Link } from "react-router-dom";
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

export const DesktopNav = () => {
  return (
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
          
          <NavigationMenuItem>
            <NavigationMenuTrigger className="animate-hover-lift glassmorphism hover:glassmorphism-strong transition-all duration-300 font-medium data-[state=open]:glassmorphism-strong">
              {navigationConfig.discoverEvents.title}
            </NavigationMenuTrigger>
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
          </NavigationMenuItem>

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

          <NavigationMenuItem>
            <NavigationMenuTrigger className="animate-hover-lift glassmorphism hover:glassmorphism-strong transition-all duration-300 font-medium data-[state=open]:glassmorphism-strong">
              {navigationConfig.ticketing.title}
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="grid gap-3 p-6 w-[400px] glassmorphism-strong shadow-2xl rounded-lg animate-scale-in border-0 animate-pulse-glow">
                <div className="absolute inset-0 animate-gradient-flow opacity-10 rounded-lg pointer-events-none"></div>
                
                <div className="relative">
                  {navigationConfig.ticketing.items.map((item, index) => (
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

          <NavigationLinks />
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};
