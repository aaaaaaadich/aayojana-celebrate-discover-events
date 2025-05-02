
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
        <NavigationMenuList className="gap-1">
          <NavigationMenuItem>
            <Link to="/" className={navigationMenuTriggerStyle() + " animate-hover-lift"}>
              Home
            </Link>
          </NavigationMenuItem>
          
          <NavigationMenuItem>
            <NavigationMenuTrigger className="animate-hover-lift bg-gradient-to-r from-blue-500/5 to-blue-700/5 hover:from-blue-500/10 hover:to-blue-700/10 transition-all duration-300">
              {navigationConfig.discoverEvents.title}
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="grid gap-3 p-6 w-[400px] md:w-[500px] lg:w-[600px] bg-background/98 backdrop-blur-sm shadow-lg rounded-md animate-fade-in">
                <div className="grid grid-cols-2 gap-4">
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
            <NavigationMenuTrigger className="animate-hover-lift">
              {navigationConfig.forOrganizers.title}
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="grid gap-3 p-6 w-[400px] bg-background/98 backdrop-blur-sm shadow-lg rounded-md animate-fade-in">
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
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuTrigger className="animate-hover-lift">
              {navigationConfig.ticketing.title}
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="grid gap-3 p-6 w-[400px] bg-background/98 backdrop-blur-sm shadow-lg rounded-md animate-fade-in">
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
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationLinks />
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};
