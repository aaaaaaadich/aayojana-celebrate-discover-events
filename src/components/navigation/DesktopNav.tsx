
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
            <NavigationMenuTrigger className="animate-hover-lift">
              {navigationConfig.discoverEvents.title}
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="grid gap-3 p-4 w-[400px] md:w-[500px] lg:w-[600px]">
                <div className="grid grid-cols-2 gap-3">
                  {navigationConfig.discoverEvents.items.map((item) => (
                    <MenuItem
                      key={item.href}
                      title={item.title}
                      description={item.description}
                      href={item.href}
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
              <div className="grid gap-3 p-4 w-[400px]">
                {navigationConfig.forOrganizers.items.map((item) => (
                  <MenuItem
                    key={item.href}
                    title={item.title}
                    description={item.description}
                    href={item.href}
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
              <div className="grid gap-3 p-4 w-[400px]">
                {navigationConfig.ticketing.items.map((item) => (
                  <MenuItem
                    key={item.href}
                    title={item.title}
                    description={item.description}
                    href={item.href}
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
