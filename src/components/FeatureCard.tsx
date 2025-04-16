
import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  iconColor?: string;
}

const FeatureCard = ({ title, description, icon: Icon, iconColor = "#F4A261" }: FeatureCardProps) => {
  return (
    <Card className="bg-card transition-all duration-300 hover:shadow-lg h-full">
      <CardContent className="p-6 flex flex-col items-center text-center">
        <div className="h-14 w-14 rounded-full bg-saffron-100 dark:bg-saffron-900/30 flex items-center justify-center mb-4">
          <Icon size={28} color={iconColor} />
        </div>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
};

export default FeatureCard;
