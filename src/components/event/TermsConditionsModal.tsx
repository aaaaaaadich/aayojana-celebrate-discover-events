
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CheckCircle } from "lucide-react";

interface TermsConditionsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TermsConditionsModal = ({ isOpen, onClose }: TermsConditionsModalProps) => {
  const termsPoints = [
    {
      title: "Provide Accurate Info",
      description: "All event details (name, time, location) must be correct and honest."
    },
    {
      title: "Follow Laws",
      description: "The event must follow local laws, rules, and venue policies."
    },
    {
      title: "No Harmful Content",
      description: "Do not create events that promote hate, violence, or illegal activities."
    },
    {
      title: "Handle Tickets Fairly",
      description: "Clearly state ticket prices and refund policies."
    },
    {
      title: "Ensure Safety",
      description: "Make proper arrangements for attendee safety and emergency situations."
    },
    {
      title: "Respect Privacy",
      description: "Do not misuse or share attendees' personal data."
    },
    {
      title: "Get Permissions",
      description: "Obtain necessary permits and licenses for your event."
    },
    {
      title: "No Fake Events",
      description: "Creating misleading or spam events is strictly prohibited."
    },
    {
      title: "Promote Respect",
      description: "Maintain a safe, respectful, and inclusive environment."
    },
    {
      title: "Take Responsibility",
      description: "You are fully responsible for managing and running your event."
    }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Terms & Conditions for Responsible Event Creation
          </DialogTitle>
          <DialogDescription>
            Please read and understand these terms before creating your event.
          </DialogDescription>
        </DialogHeader>
        
        <ScrollArea className="max-h-[60vh] pr-4">
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground mb-6">
              By creating an event on Aayojana, you agree to abide by the following terms and conditions:
            </p>
            
            {termsPoints.map((point, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-muted/50">
                <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mt-0.5">
                  <span className="text-green-600 dark:text-green-400 text-sm font-bold">
                    {index + 1}
                  </span>
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-sm mb-1">{point.title}</h4>
                  <p className="text-sm text-muted-foreground">{point.description}</p>
                </div>
              </div>
            ))}
            
            <div className="mt-6 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800">
              <div className="flex items-start space-x-2">
                <CheckCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-amber-800 dark:text-amber-200 mb-1">
                    Important Notice
                  </h4>
                  <p className="text-sm text-amber-700 dark:text-amber-300">
                    Violation of these terms may result in event removal, account suspension, 
                    or legal action. We reserve the right to review and remove any event that 
                    violates these guidelines.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
