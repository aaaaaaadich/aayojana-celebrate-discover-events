
import { Link } from "react-router-dom";
import { LucideIcon } from "lucide-react";

interface MenuItemProps {
  title: string;
  description?: string;
  icon?: LucideIcon;
  href: string;
  delay?: number;
}

export const MenuItem = ({ title, description, icon: Icon, href, delay = 0 }: MenuItemProps) => {
  return (
    <Link
      to={href}
      className="flex flex-col space-y-1 rounded-md p-4 hover:glassmorphism-strong transition-all duration-300 animate-fade-in scroll-hover-lift group animate-shimmer relative overflow-hidden"
      style={{ 
        animationDelay: `${delay}ms`,
      }}
    >
      {/* Gradient background on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-gradient-flow"></div>
      
      <div className="flex items-center space-x-2 relative z-10">
        {Icon && <Icon className="w-5 h-5 text-saffron-500 group-hover:scale-110 transition-transform duration-300 icon-hover" />}
        <span className="text-sm font-medium leading-none group-hover:text-saffron-500 transition-colors duration-300">
          {title}
        </span>
      </div>
      {description && (
        <p className="text-sm text-muted-foreground group-hover:text-muted-foreground/80 transition-colors duration-300 relative z-10">
          {description}
        </p>
      )}
      
      {/* Bottom decoration with pulse effect */}
      <div className="mt-2 w-8 h-0.5 bg-gradient-to-r from-blue-500 to-saffron-500 opacity-0 group-hover:opacity-100 transition-all duration-500 animate-pulse-glow"></div>
    </Link>
  );
};
