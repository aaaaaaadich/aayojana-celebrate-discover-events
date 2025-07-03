
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
    <ScrollReveal direction="left" className="h-full">
      <Card className="bg-card transition-all duration-700 h-full glassmorphism group relative overflow-hidden animate-pulse-glow hover:animate-gradient-flow">
        {/* Floating particles effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
          <div className="absolute top-4 left-4 w-2 h-2 bg-saffron-500 rounded-full animate-float"></div>
          <div className="absolute top-8 right-6 w-1 h-1 bg-saffron-400 rounded-full animate-float-reverse"></div>
          <div className="absolute bottom-6 left-8 w-1.5 h-1.5 bg-saffron-600 rounded-full animate-3d-float"></div>
          <div className="absolute bottom-4 right-4 w-1 h-1 bg-saffron-300 rounded-full animate-float"></div>
          <div className="absolute top-12 left-1/2 w-1 h-1 bg-saffron-500 rounded-full animate-float-reverse"></div>
        </div>
        
        {/* Gradient flow background */}
        <div className="absolute inset-0 bg-gradient-to-br from-saffron-500/10 via-transparent to-nepali-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-gradient-flow"></div>
        
        <CardContent className="p-6 flex flex-col items-center text-center relative z-10">
          <div className="h-14 w-14 rounded-full bg-saffron-100 dark:bg-saffron-900/30 flex items-center justify-center mb-4 transition-all duration-700 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-saffron-500/30">
            <Icon 
              size={28} 
              color={iconColor} 
              className="transition-all duration-700 relative z-10 group-hover:animate-pulse-slow" 
            />
          </div>
          
          <h3 className="text-xl font-bold mb-2 transition-all duration-700 group-hover:text-saffron-600">
            {title}
          </h3>
          
          <p className="text-muted-foreground transition-all duration-700 group-hover:text-foreground/80">
            {description}
          </p>
        </CardContent>
      </Card>
    </ScrollReveal>
  );
};

export default FeatureCard;
