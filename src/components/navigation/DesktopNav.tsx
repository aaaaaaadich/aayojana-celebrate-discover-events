
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
              className={navigationMenuTriggerStyle() + " animate-hover-lift hover:bg-gradient-to-r hover:from-blue-50 hover:to-blue-100 dark:hover:from-nepali-600 dark:hover:to-nepali-700 transition-all duration-300 transform hover:scale-105 font-medium"}
            >
              Home
            </Link>
          </NavigationMenuItem>
          
          <NavigationMenuItem>
            <NavigationMenuTrigger className="animate-hover-lift bg-gradient-to-r from-transparent to-transparent hover:from-blue-50 hover:to-blue-100 dark:hover:from-nepali-600 dark:hover:to-nepali-700 transition-all duration-300 font-medium data-[state=open]:bg-gradient-to-r data-[state=open]:from-blue-50 data-[state=open]:to-blue-100 dark:data-[state=open]:from-nepali-600 dark:data-[state=open]:to-nepali-700">
              {navigationConfig.discoverEvents.title}
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="grid gap-3 p-6 w-[400px] md:w-[500px] lg:w-[600px] bg-white/95 dark:bg-nepali-700/95 backdrop-blur-xl shadow-2xl rounded-lg animate-scale-in border-0">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-saffron-500/5 rounded-lg pointer-events-none"></div>
                <div className="absolute inset-0 mandala-pattern opacity-5 pointer-events-none"></div>
                
                <div className="grid grid-cols-2 gap-4 relative">
                  {navigationConfig.discoverEvents.items.map((item, index) => (
                    <MenuItem
                      key={item.href}
                      title={item.title}
                      description={item.description}
                      href={item.href}
                      delay={index * 100}
                    />
                  ))}
                </div>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuTrigger className="animate-hover-lift bg-gradient-to-r from-transparent to-transparent hover:from-blue-50 hover:to-blue-100 dark:hover:from-nepali-600 dark:hover:to-nepali-700 transition-all duration-300 font-medium data-[state=open]:bg-gradient-to-r data-[state=open]:from-blue-50 data-[state=open]:to-blue-100 dark:data-[state=open]:from-nepali-600 dark:data-[state=open]:to-nepali-700">
              {navigationConfig.forOrganizers.title}
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="grid gap-3 p-6 w-[400px] bg-white/95 dark:bg-nepali-700/95 backdrop-blur-xl shadow-2xl rounded-lg animate-scale-in border-0">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-saffron-500/5 rounded-lg pointer-events-none"></div>
                <div className="absolute inset-0 mandala-pattern opacity-5 pointer-events-none"></div>
                
                <div className="relative">
                  {navigationConfig.forOrganizers.items.map((item, index) => (
                    <MenuItem
                      key={item.href}
                      title={item.title}
                      description={item.description}
                      href={item.href}
                      delay={index * 100}
                    />
                  ))}
                </div>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuTrigger className="animate-hover-lift bg-gradient-to-r from-transparent to-transparent hover:from-blue-50 hover:to-blue-100 dark:hover:from-nepali-600 dark:hover:to-nepali-700 transition-all duration-300 font-medium data-[state=open]:bg-gradient-to-r data-[state=open]:from-blue-50 data-[state=open]:to-blue-100 dark:data-[state=open]:from-nepali-600 dark:data-[state=open]:to-nepali-700">
              {navigationConfig.ticketing.title}
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="grid gap-3 p-6 w-[400px] bg-white/95 dark:bg-nepali-700/95 backdrop-blur-xl shadow-2xl rounded-lg animate-scale-in border-0">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-saffron-500/5 rounded-lg pointer-events-none"></div>
                <div className="absolute inset-0 mandala-pattern opacity-5 pointer-events-none"></div>
                
                <div className="relative">
                  {navigationConfig.ticketing.items.map((item, index) => (
                    <MenuItem
                      key={item.href}
                      title={item.title}
                      description={item.description}
                      href={item.href}
                      delay={index * 100}
                    />
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
