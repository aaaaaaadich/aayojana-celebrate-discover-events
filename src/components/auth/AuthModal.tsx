import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { Eye, EyeOff, Mail, Lock, User, Sparkles, Zap } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal = ({ isOpen, onClose }: AuthModalProps) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { toast } = useToast();
  const { signUp, signIn, signInWithGoogle } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isSignUp) {
        if (formData.password !== formData.confirmPassword) {
          toast({
            title: "Error",
            description: "Passwords do not match",
            variant: "destructive",
          });
          return;
        }

        if (formData.password.length < 6) {
          toast({
            title: "Error",
            description: "Password must be at least 6 characters long",
            variant: "destructive",
          });
          return;
        }

        const { error } = await signUp(formData.email, formData.password, formData.name);
        if (error) {
          toast({
            title: "Sign Up Failed",
            description: error.message,
            variant: "destructive",
          });
        } else {
          toast({
            title: "Success",
            description: "Please check your email to verify your account",
          });
          onClose();
        }
      } else {
        const { error } = await signIn(formData.email, formData.password);
        if (error) {
          toast({
            title: "Sign In Failed",
            description: error.message,
            variant: "destructive",
          });
        } else {
          toast({
            title: "Welcome back!",
            description: "You have successfully signed in",
          });
          onClose();
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      const { error } = await signInWithGoogle();
      if (error) {
        toast({
          title: "Google Sign In Failed",
          description: error.message,
          variant: "destructive",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({ name: "", email: "", password: "", confirmPassword: "" });
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  const toggleMode = () => {
    setIsSignUp(!isSignUp);
    resetForm();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-white dark:bg-nepali-700 border-0 shadow-2xl animate-bounce-in overflow-hidden">
        {/* Floating Particles */}
        <div className="absolute top-4 left-4 w-2 h-2 bg-blue-500/30 rounded-full animate-float"></div>
        <div className="absolute top-8 right-6 w-1 h-1 bg-saffron-500/40 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-6 left-8 w-1.5 h-1.5 bg-blue-600/20 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
        
        <DialogHeader className="relative z-10">
          <DialogTitle className="text-center text-2xl font-bold animate-fade-in">
            <div className="flex items-center justify-center gap-2">
              <Sparkles className="w-6 h-6 text-saffron-500 animate-pulse" />
              <span>{isSignUp ? "Create Account" : "Welcome Back"}</span>
              <Zap className="w-6 h-6 text-blue-500 animate-bounce-in" style={{ animationDelay: '0.3s' }} />
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 relative z-10">
          {/* OAuth Buttons */}
          <div className="space-y-3 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <Button
              variant="outline"
              className="w-full h-12 border-2 border-transparent bg-white dark:bg-nepali-600 hover:bg-blue-50 dark:hover:bg-nepali-500 transition-all duration-500 animate-hover-lift animate-morph group btn-premium"
              onClick={handleGoogleSignIn}
              disabled={isLoading}
            >
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 animate-magnetic transition-transform duration-300" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC04"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                <span className="font-medium">Continue with Google</span>
              </div>
            </Button>
          </div>

          <div className="relative animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <Separator className="animate-liquid" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="bg-background px-3 text-muted-foreground text-sm font-medium animate-pulse-slow">or</span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp && (
              <div className="space-y-2 animate-slide-up" style={{ animationDelay: "0.3s" }}>
                <Label htmlFor="name" className="text-sm font-medium animate-fade-in">Full Name</Label>
                <div className="relative group animate-3d-hover">
                  <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground group-hover:text-saffron-500 transition-all duration-300 animate-magnetic" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                    className="pl-10 h-12 border-2 focus:border-saffron-500 transition-all duration-500 hover:border-blue-400 animate-morph"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required={isSignUp}
                  />
                </div>
              </div>
            )}

            <div className="space-y-2 animate-slide-up" style={{ animationDelay: isSignUp ? "0.4s" : "0.3s" }}>
              <Label htmlFor="email" className="text-sm font-medium animate-fade-in">Email</Label>
              <div className="relative group animate-3d-hover">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground group-hover:text-saffron-500 transition-all duration-300 animate-magnetic" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  className="pl-10 h-12 border-2 focus:border-saffron-500 transition-all duration-500 hover:border-blue-400 animate-morph"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="space-y-2 animate-slide-up" style={{ animationDelay: isSignUp ? "0.5s" : "0.4s" }}>
              <Label htmlFor="password" className="text-sm font-medium animate-fade-in">Password</Label>
              <div className="relative group animate-3d-hover">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground group-hover:text-saffron-500 transition-all duration-300 animate-magnetic" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="pl-10 pr-10 h-12 border-2 focus:border-saffron-500 transition-all duration-500 hover:border-blue-400 animate-morph"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent transition-transform duration-300"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-muted-foreground hover:text-saffron-500 transition-colors duration-300 animate-bounce-in" />
                  ) : (
                    <Eye className="h-4 w-4 text-muted-foreground hover:text-saffron-500 transition-colors duration-300 animate-bounce-in" />
                  )}
                </Button>
              </div>
            </div>

            {isSignUp && (
              <div className="space-y-2 animate-slide-up" style={{ animationDelay: "0.6s" }}>
                <Label htmlFor="confirmPassword" className="text-sm font-medium animate-fade-in">Confirm Password</Label>
                <div className="relative group animate-3d-hover">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground group-hover:text-saffron-500 transition-all duration-300 animate-magnetic" />
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    className="pl-10 pr-10 h-12 border-2 focus:border-saffron-500 transition-all duration-500 hover:border-blue-400 animate-morph"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    required={isSignUp}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent transition-transform duration-300"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground hover:text-saffron-500 transition-colors duration-300 animate-bounce-in" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground hover:text-saffron-500 transition-colors duration-300 animate-bounce-in" />
                    )}
                  </Button>
                </div>
              </div>
            )}

            <Button 
              type="submit" 
              className="w-full h-12 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium transition-all duration-500 animate-hover-lift animate-slide-up btn-premium" 
              disabled={isLoading}
              style={{ animationDelay: isSignUp ? "0.7s" : "0.5s" }}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span className="loading-dots">Loading</span>
                </div>
              ) : (
                <span>{isSignUp ? "Create Account" : "Sign In"}</span>
              )}
            </Button>
          </form>

          <div className="text-center text-sm animate-fade-in" style={{ animationDelay: isSignUp ? "0.8s" : "0.6s" }}>
            <span className="text-muted-foreground">
              {isSignUp ? "Already have an account?" : "Don't have an account?"}
            </span>
            <Button 
              variant="link" 
              onClick={toggleMode} 
              className="p-0 ml-1 h-auto text-blue-600 hover:text-saffron-500 font-medium transition-all duration-300"
            >
              {isSignUp ? "Sign In" : "Sign Up"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
