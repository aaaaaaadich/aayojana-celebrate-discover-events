
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { User, LogIn } from "lucide-react";

interface LoginPromptModalProps {
  isOpen: boolean;
  onClose: () => void;
  feature: string;
}

export const LoginPromptModal = ({ isOpen, onClose, feature }: LoginPromptModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">Login Required</DialogTitle>
        </DialogHeader>
        
        <div className="text-center py-6">
          <div className="mb-4">
            <User className="w-16 h-16 mx-auto text-blue-500 mb-4" />
          </div>
          
          <h3 className="text-lg font-semibold mb-2">Access {feature}</h3>
          <p className="text-muted-foreground mb-6">
            You can only access this feature if you login. Don't have an account? Sign up to get started!
          </p>
          
          <div className="space-y-3">
            <Button asChild className="w-full bg-blue-600 hover:bg-blue-700">
              <Link to="/auth" onClick={onClose}>
                <LogIn className="w-4 h-4 mr-2" />
                Login / Sign Up
              </Link>
            </Button>
            
            <Button variant="outline" onClick={onClose} className="w-full">
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
