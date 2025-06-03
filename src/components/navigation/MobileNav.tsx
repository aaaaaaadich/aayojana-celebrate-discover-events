
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
    <div className="md:hidden glassmorphism-strong shadow-lg animate-fade-in fixed inset-x-0 top-[4.5rem] max-h-[calc(100vh-4.5rem)] overflow-y-auto z-50">
      <div className="absolute inset-0 animate-gradient-flow opacity-5 pointer-events-none"></div>
      
      <nav className="container mx-auto px-4 py-6 flex flex-col space-y-6 relative">
        <Link 
          to="/" 
          className="text-foreground hover:text-blue-500 transition-colors py-2 animate-fade-in font-medium group scroll-hover-lift"
          onClick={onClose}
          style={{ animationDelay: "0.1s" }}
        >
          <span className="animate-gradient-flow bg-clip-text text-transparent group-hover:text-blue-500">Home</span>
        </Link>

        {Object.values(navigationConfig).map((group, index) => (
          <div key={group.title} className="space-y-4 stagger-animation animate" style={{ animationDelay: `${0.1 + index * 0.1}s` }}>
            <div className="font-medium text-lg animate-gradient-flow bg-clip-text text-transparent">{group.title}</div>
            <div className="space-y-1 pl-4 border-l-2 border-blue-500/20">
              {group.items.map((item, itemIndex) => (
                <Link 
                  key={item.href}
                  to={item.href} 
                  className="flex items-center justify-between text-foreground hover:text-blue-500 transition-colors py-2 animate-fade-in group scroll-hover-lift"
                  onClick={onClose}
                  style={{ animationDelay: `${0.2 + (index * 0.1) + (itemIndex * 0.05)}s` }}
                >
                  <div>
                    <div className="group-hover:text-blue-500">{item.title}</div>
                    <div className="text-xs text-muted-foreground group-hover:text-blue-400">{item.description}</div>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-blue-500 transition-colors icon-hover" />
                </Link>
              ))}
            </div>
          </div>
        ))}

        <div className="space-y-4 pt-2 stagger-animation animate" style={{ animationDelay: "0.5s" }}>
          <div className="font-medium text-lg animate-gradient-flow bg-clip-text text-transparent">Pages</div>
          <div className="space-y-1 pl-4 border-l-2 border-blue-500/20">
            <Link 
              to="/features" 
              className="flex items-center justify-between text-foreground hover:text-blue-500 transition-colors py-2 animate-fade-in group scroll-hover-lift"
              onClick={onClose}
              style={{ animationDelay: "0.6s" }}
            >
              Features
              <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-blue-500 icon-hover" />
            </Link>
            <Link 
              to="/about" 
              className="flex items-center justify-between text-foreground hover:text-blue-500 transition-colors py-2 animate-fade-in group scroll-hover-lift"
              onClick={onClose}
              style={{ animationDelay: "0.7s" }}
            >
              About
              <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-blue-500 icon-hover" />
            </Link>
            <Link 
              to="/contact" 
              className="flex items-center justify-between text-foreground hover:text-blue-500 transition-colors py-2 animate-fade-in group scroll-hover-lift"
              onClick={onClose}
              style={{ animationDelay: "0.8s" }}
            >
              Contact
              <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-blue-500 icon-hover" />
            </Link>
          </div>
        </div>
        
        <div className="pt-4 animate-fade-in stagger-animation animate" style={{ animationDelay: "0.9s" }}>
          <Button 
            asChild
            className="w-full btn-premium text-white transition-all duration-300"
          >
            <Link to="/sign-in" onClick={onClose}>
              Sign In
            </Link>
          </Button>
        </div>
        
        <div className="animate-fade-in stagger-animation animate" style={{ animationDelay: "1s" }}>
          <Button 
            asChild
            variant="outline" 
            className="w-full border-blue-500 text-blue-600 hover:glassmorphism-strong hover:text-white transition-all duration-300"
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
