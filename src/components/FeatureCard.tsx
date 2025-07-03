
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
      <Card className="bg-card transition-all duration-700 h-full glassmorphism">
        <CardContent className="p-6 flex flex-col items-center text-center relative z-10">
          <div className="h-14 w-14 rounded-full bg-saffron-100 dark:bg-saffron-900/30 flex items-center justify-center mb-4 transition-all duration-700">
            <Icon 
              size={28} 
              color={iconColor} 
              className="transition-all duration-700 relative z-10" 
            />
          </div>
          
          <h3 className="text-xl font-bold mb-2 transition-all duration-700">
            {title}
          </h3>
          
          <p className="text-muted-foreground transition-all duration-700">
            {description}
          </p>
        </CardContent>
      </Card>
    </ScrollReveal>
  );
};

export default FeatureCard;
