
import { Calendar, MapPin, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import ScrollReveal from "@/components/ScrollReveal";

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
    <ScrollReveal direction="up" className="h-full">
      <Link to={`/events/${id}`} className="block h-full">
        <Card className="overflow-hidden h-full transition-all duration-500 animate-hover-lift bg-card group animate-3d-hover animate-morph scroll-hover-lift cursor-pointer">
          <div className="relative h-48 overflow-hidden animate-morph">
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            
            {/* Image Overlay Effects */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            {isPremium && (
              <div className="absolute top-0 right-0 m-2 animate-fade-in" style={{ animationDelay: "0.3s" }}>
                <Badge 
                  variant="secondary" 
                  className="bg-saffron-500 text-white relative overflow-hidden animate-bounce-in"
                >
                  <span className="animate-pulse animate-magnetic">Featured</span>
                  <div className="absolute inset-0 bg-white/20 animate-liquid"></div>
                </Badge>
              </div>
            )}
            
            <div className="absolute bottom-0 left-0 m-2 animate-fade-in" style={{ animationDelay: "0.5s" }}>
              <Badge 
                variant="outline" 
                className="bg-background/80 backdrop-blur-sm text-foreground border-none transition-all duration-500 hover:bg-background/95 animate-morph"
              >
                {category}
              </Badge>
            </div>
            
            {/* Floating Particles */}
            <div className="absolute top-4 left-4 w-1 h-1 bg-white/30 rounded-full opacity-0 group-hover:opacity-100 animate-float transition-opacity duration-500"></div>
            <div className="absolute top-8 right-8 w-1.5 h-1.5 bg-saffron-500/40 rounded-full opacity-0 group-hover:opacity-100 animate-float transition-opacity duration-500" style={{ animationDelay: '0.5s' }}></div>
          </div>
          
          <CardContent className="p-4 relative overflow-hidden">
            {/* Content Background Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-saffron-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse-slow"></div>
            
            <h3 className="font-bold text-lg line-clamp-2 mb-3 transition-all duration-500 group-hover:text-saffron-500 relative z-10">
              {title}
            </h3>
            
            <div className="flex flex-col space-y-2 text-sm text-muted-foreground relative z-10">
              <div className="flex items-center gap-2 transition-all duration-500 group-hover:translate-x-2 animate-fade-in" style={{ animationDelay: "0.1s" }}>
                <Calendar size={16} className="text-saffron-500 transition-all duration-500 group-hover:scale-110 animate-magnetic" />
                <span>{date}</span>
              </div>
              <div className="flex items-center gap-2 transition-all duration-500 group-hover:translate-x-2 animate-fade-in" style={{ animationDelay: "0.2s" }}>
                <Clock size={16} className="text-saffron-500 transition-all duration-500 group-hover:scale-110 animate-magnetic" />
                <span>{time}</span>
              </div>
              <div className="flex items-center gap-2 transition-all duration-500 group-hover:translate-x-2 animate-fade-in" style={{ animationDelay: "0.3s" }}>
                <MapPin size={16} className="text-saffron-500 transition-all duration-500 group-hover:scale-110 animate-magnetic" />
                <span className="truncate">{location}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>
    </ScrollReveal>
  );
};

export default EventCard;
