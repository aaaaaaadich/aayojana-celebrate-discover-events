
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Clock, Users } from "lucide-react";

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  image: string;
  category: string;
  price: number;
}

interface EventInfoSidebarProps {
  event: Event;
}

export const EventInfoSidebar = ({ event }: EventInfoSidebarProps) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Calendar className="h-5 w-5 text-blue-600" />
            <div>
              <p className="font-medium">Date</p>
              <p className="text-sm text-muted-foreground">{event.date}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Clock className="h-5 w-5 text-blue-600" />
            <div>
              <p className="font-medium">Time</p>
              <p className="text-sm text-muted-foreground">{event.time}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <MapPin className="h-5 w-5 text-blue-600" />
            <div>
              <p className="font-medium">Location</p>
              <p className="text-sm text-muted-foreground">{event.location}</p>
            </div>
          </div>
          {event.price > 0 && (
            <div className="flex items-center gap-3">
              <Users className="h-5 w-5 text-blue-600" />
              <div>
                <p className="font-medium">Price</p>
                <p className="text-sm text-muted-foreground">NPR {event.price}</p>
              </div>
            </div>
          )}
        </div>
        <Button className="w-full mt-6 bg-blue-600 hover:bg-blue-700">
          {event.price > 0 ? `Buy Tickets - NPR ${event.price}` : 'Register for Free'}
        </Button>
      </CardContent>
    </Card>
  );
};
