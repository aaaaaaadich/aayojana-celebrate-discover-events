
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { navigationConfig } from "@/config/navigation";
import { ChevronRight } from "lucide-react";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileNav = ({ isOpen, onClose }: MobileNavProps) => {
  if (!isOpen) return null;

  return (
    <div className="md:hidden bg-background/98 backdrop-blur-md shadow-lg animate-fade-in fixed inset-x-0 top-[4.5rem] max-h-[calc(100vh-4.5rem)] overflow-y-auto">
      <nav className="container mx-auto px-4 py-6 flex flex-col space-y-6">
        <Link 
          to="/" 
          className="text-foreground hover:text-blue-500 transition-colors py-2 animate-fade-in font-medium"
          onClick={onClose}
          style={{ animationDelay: "0.1s" }}
        >
          Home
        </Link>

        {Object.values(navigationConfig).map((group, index) => (
          <div key={group.title} className="space-y-4">
            <div className="font-medium text-lg">{group.title}</div>
            <div className="space-y-1 pl-4 border-l-2 border-muted">
              {group.items.map((item, itemIndex) => (
                <Link 
                  key={item.href}
                  to={item.href} 
                  className="flex items-center justify-between text-foreground hover:text-blue-500 transition-colors py-2 animate-fade-in group"
                  onClick={onClose}
                  style={{ animationDelay: `${0.2 + (index * 0.1) + (itemIndex * 0.05)}s` }}
                >
                  <div>
                    <div>{item.title}</div>
                    <div className="text-xs text-muted-foreground">{item.description}</div>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-blue-500 transition-colors" />
                </Link>
              ))}
            </div>
          </div>
        ))}

        <div className="space-y-4 pt-2">
          <div className="font-medium text-lg">Pages</div>
          <div className="space-y-1 pl-4 border-l-2 border-muted">
            <Link 
              to="/features" 
              className="flex items-center justify-between text-foreground hover:text-blue-500 transition-colors py-2 animate-fade-in"
              onClick={onClose}
              style={{ animationDelay: "0.6s" }}
            >
              Features
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </Link>
            <Link 
              to="/about" 
              className="flex items-center justify-between text-foreground hover:text-blue-500 transition-colors py-2 animate-fade-in"
              onClick={onClose}
              style={{ animationDelay: "0.7s" }}
            >
              About
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </Link>
            <Link 
              to="/contact" 
              className="flex items-center justify-between text-foreground hover:text-blue-500 transition-colors py-2 animate-fade-in"
              onClick={onClose}
              style={{ animationDelay: "0.8s" }}
            >
              Contact
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </Link>
          </div>
        </div>
        
        <div className="pt-4 animate-fade-in" style={{ animationDelay: "0.9s" }}>
          <Button 
            asChild
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
          >
            <Link to="/sign-in" onClick={onClose}>
              Sign In
            </Link>
          </Button>
        </div>
        
        <div className="animate-fade-in" style={{ animationDelay: "1s" }}>
          <Button 
            asChild
            variant="outline" 
            className="w-full"
          >
            <Link to="/create-event" onClick={onClose}>
              Create Event
            </Link>
          </Button>
        </div>
      </nav>
    </div>
  );
};
