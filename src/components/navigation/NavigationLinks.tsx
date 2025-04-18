
import { Link } from "react-router-dom";
import { NavigationMenuItem } from "@/components/ui/navigation-menu";
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";

export const NavigationLinks = () => {
  return (
    <>
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
    </>
  );
};
