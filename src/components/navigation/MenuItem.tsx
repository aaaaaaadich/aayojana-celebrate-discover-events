
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
      className="flex flex-col space-y-1 rounded-md p-4 hover:bg-accent/50 transition-all duration-300 animate-fade-in glow-on-hover group"
      style={{ 
        animationDelay: `${delay}ms`,
        background: 'linear-gradient(to right, var(--background) 0%, var(--background) 100%)',
        backgroundSize: '200% 100%',
      }}
    >
      <div className="flex items-center space-x-2">
        {Icon && <Icon className="w-5 h-5 text-saffron-500 group-hover:scale-110 transition-transform duration-300" />}
        <span className="text-sm font-medium leading-none group-hover:text-saffron-500 transition-colors duration-300">
          {title}
        </span>
      </div>
      {description && (
        <p className="text-sm text-muted-foreground group-hover:text-muted-foreground/80 transition-colors duration-300">
          {description}
        </p>
      )}
    </Link>
  );
};
