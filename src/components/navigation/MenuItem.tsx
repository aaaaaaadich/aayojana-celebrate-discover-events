
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
      className="flex flex-col space-y-1 rounded-md p-3 hover:bg-accent animate-hover-lift glow-on-hover group"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-center space-x-2">
        {Icon && <Icon className="w-5 h-5 text-saffron-500 group-hover:scale-110 transition-transform" />}
        <span className="text-sm font-medium leading-none text-saffron-500 group-hover:text-saffron-600 transition-colors">
          {title}
        </span>
      </div>
      {description && (
        <p className="text-sm text-muted-foreground group-hover:text-muted-foreground/80 transition-colors">
          {description}
        </p>
      )}
    </Link>
  );
};
