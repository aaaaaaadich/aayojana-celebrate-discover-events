
import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  iconColor?: string;
}

const FeatureCard = ({ title, description, icon: Icon, iconColor = "#F4A261" }: FeatureCardProps) => {
  return (
    <ScrollReveal direction="scale" className="h-full">
      <Card className="bg-card transition-all duration-500 animate-hover-lift h-full animate-3d-hover group overflow-hidden animate-morph scroll-hover-lift">
        {/* Card Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-saffron-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        {/* Floating Particles */}
        <div className="absolute top-4 right-4 w-1 h-1 bg-blue-500/30 rounded-full opacity-0 group-hover:opacity-100 animate-float transition-opacity duration-500"></div>
        <div className="absolute bottom-6 left-6 w-1.5 h-1.5 bg-saffron-500/20 rounded-full opacity-0 group-hover:opacity-100 animate-float transition-opacity duration-500" style={{ animationDelay: '0.5s' }}></div>
        
        <CardContent className="p-6 flex flex-col items-center text-center relative z-10">
          <div className="h-14 w-14 rounded-full bg-saffron-100 dark:bg-saffron-900/30 flex items-center justify-center mb-4 transition-all duration-500 group-hover:scale-110 animate-3d-hover animate-magnetic">
            {/* Icon Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-saffron-500/30 to-blue-500/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-md"></div>
            
            <Icon 
              size={28} 
              color={iconColor} 
              className="transition-all duration-500 group-hover:rotate-12 relative z-10" 
            />
          </div>
          
          <h3 className="text-xl font-bold mb-2 transition-all duration-500 group-hover:text-saffron-500">
            {title}
          </h3>
          
          <p className="text-muted-foreground transition-all duration-500 group-hover:text-foreground/80 animate-fade-in">
            {description}
          </p>
          
          {/* Bottom Decoration */}
          <div className="mt-4 w-8 h-0.5 bg-gradient-to-r from-blue-500 to-saffron-500 opacity-0 group-hover:opacity-100 transition-all duration-500 animate-liquid"></div>
        </CardContent>
      </Card>
    </ScrollReveal>
  );
};

export default FeatureCard;
