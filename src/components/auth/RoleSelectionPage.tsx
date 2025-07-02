
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import OrganizerAuthModal from "./OrganizerAuthModal";
import { AttendeeAuthModal } from "./AttendeeAuthModal";
import { Users, Briefcase, ArrowRight } from "lucide-react";

export const RoleSelectionPage = () => {
  const [isOrganizerModalOpen, setIsOrganizerModalOpen] = useState(false);
  const [isAttendeeModalOpen, setIsAttendeeModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Welcome to Aayojana
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Choose how you'd like to join our event platform
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <Card className="cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105 border-2 hover:border-blue-500">
            <CardHeader className="text-center pb-4">
              <div className="flex justify-center mb-4">
                <div className="p-6 rounded-full bg-blue-100 dark:bg-blue-900/30">
                  <Briefcase className="h-12 w-12 text-blue-600" />
                </div>
              </div>
              <CardTitle className="text-2xl text-blue-700 dark:text-blue-400">
                Event Organizer
              </CardTitle>
              <CardDescription className="text-base">
                Create and manage events, track analytics, and grow your audience
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-3 text-sm">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  Create unlimited events
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  Advanced analytics dashboard
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  Ticket management & sales
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  Attendee management tools
                </li>
              </ul>
              <Button 
                onClick={() => setIsOrganizerModalOpen(true)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white group"
              >
                Get Started as Organizer
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </CardContent>
          </Card>

          <Card className="cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105 border-2 hover:border-green-500">
            <CardHeader className="text-center pb-4">
              <div className="flex justify-center mb-4">
                <div className="p-6 rounded-full bg-green-100 dark:bg-green-900/30">
                  <Users className="h-12 w-12 text-green-600" />
                </div>
              </div>
              <CardTitle className="text-2xl text-green-700 dark:text-green-400">
                Event Attendee
              </CardTitle>
              <CardDescription className="text-base">
                Discover amazing events, book tickets, and create memories
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-3 text-sm">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  Browse thousands of events
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  Easy ticket booking
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  Personal event history
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  Reviews & recommendations
                </li>
              </ul>
              <Button 
                onClick={() => setIsAttendeeModalOpen(true)}
                className="w-full bg-green-600 hover:bg-green-700 text-white group"
              >
                Get Started as Attendee
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-8">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            You can always switch or add roles later in your account settings
          </p>
        </div>
      </div>

      <OrganizerAuthModal 
        open={isOrganizerModalOpen} 
        onOpenChange={setIsOrganizerModalOpen} 
      />
      
      <AttendeeAuthModal 
        isOpen={isAttendeeModalOpen} 
        onClose={() => setIsAttendeeModalOpen(false)} 
      />
    </div>
  );
};
