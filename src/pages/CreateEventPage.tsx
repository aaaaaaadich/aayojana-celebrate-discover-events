
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, MapPin, Image, Tags, Clock } from "lucide-react";

const CreateEventPage = () => {
  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-6">Create Your Event</h1>
          <p className="text-muted-foreground mb-8">
            Fill in the details below to create your event. All fields marked with * are required.
          </p>

          <form className="space-y-8">
            {/* Basic Information */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Basic Information</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Event Name *
                  </label>
                  <Input placeholder="Enter event name" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Event Category *
                  </label>
                  <Input placeholder="Select category" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Event Description *
                </label>
                <Textarea 
                  placeholder="Describe your event" 
                  className="min-h-[150px]"
                />
              </div>
            </div>

            {/* Date and Time */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Date and Time</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Start Date & Time *
                  </label>
                  <div className="flex">
                    <Clock className="w-5 h-5 mr-2 text-muted-foreground" />
                    <Input type="datetime-local" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    End Date & Time *
                  </label>
                  <div className="flex">
                    <Calendar className="w-5 h-5 mr-2 text-muted-foreground" />
                    <Input type="datetime-local" />
                  </div>
                </div>
              </div>
            </div>

            {/* Location */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Location</h2>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Venue Address *
                </label>
                <div className="flex">
                  <MapPin className="w-5 h-5 mr-2 text-muted-foreground" />
                  <Input placeholder="Enter venue address" />
                </div>
              </div>
              {/* Map placeholder */}
              <div className="h-48 bg-muted rounded-lg flex items-center justify-center">
                Google Maps will be integrated here
              </div>
            </div>

            {/* Tickets */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Ticket Information</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Ticket Price (NPR) *
                  </label>
                  <Input type="number" placeholder="Enter price" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Available Tickets *
                  </label>
                  <Input type="number" placeholder="Enter quantity" />
                </div>
              </div>
            </div>

            {/* Submit */}
            <div className="flex justify-end space-x-4">
              <Button variant="outline">Save as Draft</Button>
              <Button className="bg-saffron-500 hover:bg-saffron-600">
                Publish Event
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateEventPage;
