import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import ForgotPasswordModal from "./ForgotPasswordModal";
import TwoFactorModal from "./TwoFactorModal";
import { useAnalyticsContext } from "@/components/analytics/AnalyticsProvider";

interface OrganizerAuthModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const OrganizerAuthModal = ({ open, onOpenChange }: OrganizerAuthModalProps) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { signUp, signIn } = useAuth();
  const { toast } = useToast();
  const { trackOrganizerLogin } = useAnalyticsContext();

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      // Store the intended role in localStorage before redirect
      localStorage.setItem('pendingUserRole', 'organizer');
      
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth`
        }
      });
      
      if (error) {
        console.error('Google sign in error:', error);
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
        localStorage.removeItem('pendingUserRole');
      }
    } catch (error) {
      console.error('Unexpected error:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
      localStorage.removeItem('pendingUserRole');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isSignUp && !validateForm()) return;
    
    setIsLoading(true);
    
    try {
      localStorage.setItem('pendingUserRole', 'organizer');
      
      let result;
      if (isSignUp) {
        result = await signUp(formData.email, formData.password, formData.name);
      } else {
        result = await signIn(formData.email, formData.password);
      }

      if (result.error) {
        if (result.error.message.includes('Email not confirmed')) {
          toast({
            title: "Email Confirmation Required",
            description: "Please check your email and click the confirmation link before signing in.",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Authentication Failed",
            description: result.error.message,
            variant: "destructive",
          });
        }
      } else {
        // Track successful organizer login
        if (!isSignUp) {
          trackOrganizerLogin();
        }

        toast({
          title: isSignUp ? "Account Created!" : "Welcome Back!",
          description: isSignUp 
            ? "Please check your email to confirm your account." 
            : "You have successfully signed in.",
        });
        
        // For demonstration purposes, show 2FA modal after successful login
        if (!isSignUp) {
          setShowTwoFactor(true);
        } else {
          onOpenChange(false);
        }
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleTwoFactorVerified = () => {
    onOpenChange(false);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
    setShowPassword(false);
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      toast({
        title: "Name Required",
        description: "Please enter your name",
        variant: "destructive",
      });
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Passwords Don't Match",
        description: "Please ensure both passwords are identical",
        variant: "destructive",
      });
      return false;
    }

    if (formData.password.length < 6) {
      toast({
        title: "Password Too Short",
        description: "Password must be at least 6 characters",
        variant: "destructive",
      });
      return false;
    }

    return true;
  };

  useEffect(() => {
    if (!open) {
      resetForm();
      setIsSignUp(false);
    }
  }, [open]);

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {!isSignUp ? "Welcome Back, Organizer!" : "Join as Event Organizer"}
            </DialogTitle>
            <DialogDescription>
              {!isSignUp 
                ? "Sign in to your organizer account to manage your events" 
                : "Create your organizer account to Start organizing amazing events"
              }
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp && (
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  required
                />
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>

            {isSignUp && (
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                  required
                />
              </div>
            )}

            {!isSignUp && (
              <div className="flex justify-end">
                <Button
                  type="button"
                  variant="link"
                  className="p-0 h-auto text-sm"
                  onClick={() => setShowForgotPassword(true)}
                >
                  Forgot password?
                </Button>
              </div>
            )}
            
            <Button type="submit" className="w-full bg-saffron-500 hover:bg-saffron-600" disabled={isLoading}>
              {isLoading 
                ? "Processing..." 
                : (isSignUp ? "Create Organizer Account" : "Sign In")
              }
            </Button>
          </form>
          
          <Separator />
          
          <div className="text-center text-sm">
            {!isSignUp ? "New to organizing events?" : "Already have an account?"}
            <Button
              type="button"
              variant="link"
              className="p-0 ml-1 h-auto font-semibold"
              onClick={() => setIsSignUp(!isSignUp)}
            >
              {!isSignUp ? "Create organizer account" : "Sign in instead"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <ForgotPasswordModal
        open={showForgotPassword}
        onOpenChange={setShowForgotPassword}
      />

      <TwoFactorModal
        open={showTwoFactor}
        onOpenChange={setShowTwoFactor}
        onVerified={handleTwoFactorVerified}
      />
    </>
  );
};

export default OrganizerAuthModal;
