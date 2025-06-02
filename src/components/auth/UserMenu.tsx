
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { LogOut, User, Settings, Crown, Zap, Star } from "lucide-react";

export const UserMenu = () => {
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleSignOut = async () => {
    setIsLoading(true);
    try {
      const { error } = await signOut();
      if (error) {
        toast({
          title: "Error",
          description: "Failed to sign out",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Signed out",
          description: "You have been successfully signed out",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) return null;

  const displayName = user.user_metadata?.name || user.email?.split('@')[0] || 'User';
  const avatarUrl = user.user_metadata?.avatar_url;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full animate-hover-lift animate-3d-hover group overflow-hidden">
          {/* Animated Ring Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-saffron-500/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse-ring"></div>
          
          {/* Rotating Glow */}
          <div className="absolute inset-0 bg-gradient-conic from-blue-500 via-saffron-500 to-blue-500 rounded-full opacity-0 group-hover:opacity-30 transition-opacity duration-500 animate-rotate-slow blur-sm"></div>
          
          <Avatar className="h-10 w-10 ring-2 ring-transparent group-hover:ring-saffron-500/50 transition-all duration-500 animate-magnetic relative z-10">
            <AvatarImage src={avatarUrl} alt={displayName} className="animate-morph" />
            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-blue-600 text-white font-semibold">
              {displayName.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          
          {/* Floating Particles */}
          <div className="absolute -top-1 -right-1 w-2 h-2 bg-saffron-500 rounded-full opacity-0 group-hover:opacity-100 animate-bounce-in" style={{ animationDelay: '0.1s' }}></div>
          <div className="absolute -bottom-1 -left-1 w-1 h-1 bg-blue-500 rounded-full opacity-0 group-hover:opacity-100 animate-bounce-in" style={{ animationDelay: '0.2s' }}></div>
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent className="w-64 bg-white/95 dark:bg-nepali-700/95 backdrop-blur-xl border-0 shadow-2xl animate-bounce-in overflow-hidden" align="end" forceMount>
        {/* Animated Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-saffron-500/5 rounded-lg pointer-events-none animate-pulse-slow"></div>
        <div className="absolute inset-0 mandala-pattern opacity-5 pointer-events-none animate-rotate-slow"></div>
        
        {/* Floating Elements */}
        <div className="absolute top-2 right-2 w-1 h-1 bg-blue-500/30 rounded-full animate-float"></div>
        <div className="absolute bottom-4 left-4 w-1.5 h-1.5 bg-saffron-500/20 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
        
        <div className="flex items-center justify-start gap-2 p-3 relative z-10">
          <Avatar className="h-12 w-12 ring-2 ring-saffron-500/30 animate-3d-hover">
            <AvatarImage src={avatarUrl} alt={displayName} />
            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-blue-600 text-white font-semibold">
              {displayName.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col space-y-1 leading-none">
            <div className="flex items-center gap-1">
              <p className="font-semibold text-sm text-gradient-animate">
                {displayName}
              </p>
              <Crown className="w-3 h-3 text-saffron-500 animate-pulse animate-float" />
              <Star className="w-2 h-2 text-blue-500 animate-bounce-in" style={{ animationDelay: '0.3s' }} />
            </div>
            <p className="w-[180px] truncate text-xs text-muted-foreground animate-fade-in">
              {user.email}
            </p>
          </div>
        </div>
        
        <DropdownMenuSeparator className="bg-gradient-to-r from-transparent via-border to-transparent animate-liquid" />
        
        <DropdownMenuItem className="cursor-pointer hover:bg-blue-50 dark:hover:bg-nepali-600 transition-all duration-500 group animate-hover-lift">
          <User className="mr-3 h-4 w-4 text-blue-500 animate-magnetic transition-transform duration-300" />
          <span className="group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">Profile</span>
          <Zap className="ml-auto w-3 h-3 text-saffron-500/50 opacity-0 group-hover:opacity-100 animate-bounce-in" />
        </DropdownMenuItem>
        
        <DropdownMenuItem className="cursor-pointer hover:bg-blue-50 dark:hover:bg-nepali-600 transition-all duration-500 group animate-hover-lift">
          <Settings className="mr-3 h-4 w-4 text-blue-500 animate-magnetic transition-transform duration-300" />
          <span className="group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">Settings</span>
          <Zap className="ml-auto w-3 h-3 text-saffron-500/50 opacity-0 group-hover:opacity-100 animate-bounce-in" />
        </DropdownMenuItem>
        
        <DropdownMenuSeparator className="bg-gradient-to-r from-transparent via-border to-transparent animate-liquid" />
        
        <DropdownMenuItem 
          onClick={handleSignOut} 
          disabled={isLoading}
          className="cursor-pointer hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-500 group animate-hover-lift"
        >
          <LogOut className="mr-3 h-4 w-4 text-red-500 animate-magnetic transition-transform duration-300" />
          <span className="group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors duration-300">
            {isLoading ? (
              <span className="loading-dots">Signing out</span>
            ) : (
              "Sign out"
            )}
          </span>
          {!isLoading && <Zap className="ml-auto w-3 h-3 text-red-500/50 opacity-0 group-hover:opacity-100 animate-bounce-in" />}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
