
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { navigationConfig } from "@/config/navigation";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileNav = ({ isOpen, onClose }: MobileNavProps) => {
  if (!isOpen) return null;

  return (
    <div className="md:hidden bg-background/95 backdrop-blur-md shadow-lg animate-fade-in">
      <nav className="container mx-auto px-4 py-4 flex flex-col space-y-4">
        <Link 
          to="/" 
          className="text-foreground hover:text-saffron-500 transition-colors py-2 animate-fade-in"
          onClick={onClose}
          style={{ animationDelay: "0.1s" }}
        >
          Home
        </Link>

        {Object.values(navigationConfig).map((group, index) => (
          <div key={group.title} className="space-y-2">
            <div className="font-medium text-muted-foreground">{group.title}</div>
            {group.items.map((item, itemIndex) => (
              <Link 
                key={item.href}
                to={item.href} 
                className="block text-foreground hover:text-saffron-500 transition-colors py-2 pl-4 animate-fade-in"
                onClick={onClose}
                style={{ animationDelay: `${0.2 + (index * 0.1) + (itemIndex * 0.05)}s` }}
              >
                {item.title}
              </Link>
            ))}
          </div>
        ))}

        <Link 
          to="/features" 
          className="text-foreground hover:text-saffron-500 transition-colors py-2 animate-fade-in"
          onClick={onClose}
          style={{ animationDelay: "0.6s" }}
        >
          Features
        </Link>
        <Link 
          to="/about" 
          className="text-foreground hover:text-saffron-500 transition-colors py-2 animate-fade-in"
          onClick={onClose}
          style={{ animationDelay: "0.7s" }}
        >
          About
        </Link>
        <Link 
          to="/contact" 
          className="text-foreground hover:text-saffron-500 transition-colors py-2 animate-fade-in"
          onClick={onClose}
          style={{ animationDelay: "0.8s" }}
        >
          Contact
        </Link>
        
        <Button 
          className="bg-saffron-500 hover:bg-saffron-600 text-white w-full animate-fade-in"
          style={{ animationDelay: "0.9s" }}
        >
          Sign In
        </Button>
      </nav>
    </div>
  );
};
