
import { Calendar, MapPin, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface EventCardProps {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  image: string;
  category: string;
  isPremium?: boolean;
}

const EventCard = ({ 
  id, 
  title, 
  date, 
  time, 
  location, 
  image, 
  category, 
  isPremium = false 
}: EventCardProps) => {
  return (
    <Card className="overflow-hidden h-full transition-transform duration-300 hover:shadow-lg hover:scale-[1.02] bg-card">
      <div className="relative h-48 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
        {isPremium && (
          <div className="absolute top-0 right-0 m-2">
            <Badge 
              variant="secondary" 
              className="bg-saffron-500 text-white animate-pulse relative overflow-hidden before:absolute before:inset-0 before:bg-white/20 before:animate-[shine_3s_ease-in-out_infinite]"
            >
              Featured
            </Badge>
          </div>
        )}
        <div className="absolute bottom-0 left-0 m-2">
          <Badge 
            variant="outline" 
            className="bg-background/80 backdrop-blur-sm text-foreground border-none"
          >
            {category}
          </Badge>
        </div>
      </div>
      <CardContent className="p-4">
        <h3 className="font-bold text-lg line-clamp-2 mb-3">{title}</h3>
        <div className="flex flex-col space-y-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Calendar size={16} className="text-saffron-500" />
            <span>{date}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock size={16} className="text-saffron-500" />
            <span>{time}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin size={16} className="text-saffron-500" />
            <span className="truncate">{location}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EventCard;
