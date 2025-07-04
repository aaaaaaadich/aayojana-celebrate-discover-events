
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { CheckCircle, XCircle, ExternalLink } from "lucide-react";
import { useState } from "react";
import { TermsConditionsModal } from "./TermsConditionsModal";

interface TermsAcceptanceModalProps {
  isOpen: boolean;
  onAccept: () => void;
  onCancel: () => void;
}

export const TermsAcceptanceModal = ({ isOpen, onAccept, onCancel }: TermsAcceptanceModalProps) => {
  const [showTermsModal, setShowTermsModal] = useState(false);

  const handleViewTerms = () => {
    setShowTermsModal(true);
  };

  const handleAccept = () => {
    onAccept();
    // Allow the form to be shown after accepting terms
  };

  return (
    <>
      <AlertDialog open={isOpen} onOpenChange={(open) => !open && onCancel()}>
        <AlertDialogContent className="max-w-md">
          <AlertDialogHeader>
            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-red-100 dark:bg-red-900/20 rounded-full">
              <span className="text-2xl">🛑</span>
            </div>
            <AlertDialogTitle className="text-center text-xl font-bold">
              Before You Continue
            </AlertDialogTitle>
            <AlertDialogDescription className="space-y-4 text-sm">
              <p className="text-center">
                You're creating this event as an <strong>Organizer</strong>.
                Please confirm that you have read and accepted the{" "}
                <strong>Terms & Conditions for Responsible Event Creation.</strong>
              </p>
              
              <div className="space-y-2">
                <div className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Your event must follow safety, honesty, and legal guidelines.</span>
                </div>
                <div className="flex items-start space-x-2">
                  <XCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                  <span>Fake or harmful events will result in removal.</span>
                </div>
              </div>

              <div className="flex items-center justify-center">
                <button 
                  onClick={handleViewTerms}
                  className="flex items-center space-x-1 text-blue-600 hover:text-blue-800 text-sm underline"
                >
                  <ExternalLink className="w-3 h-3" />
                  <span>View Terms & Conditions</span>
                </button>
              </div>

              <p className="text-center text-sm font-medium">
                ➤ Click <strong>Accept</strong> to proceed.
              </p>
            </AlertDialogDescription>
          </AlertDialogHeader>
          
          <AlertDialogFooter className="flex justify-center space-x-3">
            <AlertDialogCancel 
              onClick={onCancel}
              className="min-w-[80px]"
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleAccept}
              className="min-w-[80px] bg-green-600 hover:bg-green-700"
            >
              Accept
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <TermsConditionsModal 
        isOpen={showTermsModal} 
        onClose={() => setShowTermsModal(false)} 
      />
    </>
  );
};
