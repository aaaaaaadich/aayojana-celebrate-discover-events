
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
import { LogOut, User, Settings, Crown } from "lucide-react";

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
        <Button variant="ghost" className="relative h-10 w-10 rounded-full hover:scale-110 transition-all duration-300 animate-hover-lift group">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-saffron-500/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse-ring"></div>
          <Avatar className="h-10 w-10 ring-2 ring-transparent group-hover:ring-saffron-500/50 transition-all duration-300">
            <AvatarImage src={avatarUrl} alt={displayName} />
            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-blue-600 text-white font-semibold">
              {displayName.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64 bg-white/95 dark:bg-nepali-700/95 backdrop-blur-xl border-0 shadow-2xl animate-scale-in" align="end" forceMount>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-saffron-500/5 rounded-lg pointer-events-none"></div>
        
        <div className="flex items-center justify-start gap-2 p-3 animate-fade-in">
          <Avatar className="h-12 w-12 ring-2 ring-saffron-500/30">
            <AvatarImage src={avatarUrl} alt={displayName} />
            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-blue-600 text-white font-semibold">
              {displayName.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col space-y-1 leading-none">
            <div className="flex items-center gap-1">
              <p className="font-semibold text-sm bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-400 dark:to-blue-600 bg-clip-text text-transparent">
                {displayName}
              </p>
              <Crown className="w-3 h-3 text-saffron-500" />
            </div>
            <p className="w-[180px] truncate text-xs text-muted-foreground">
              {user.email}
            </p>
          </div>
        </div>
        
        <DropdownMenuSeparator className="bg-gradient-to-r from-transparent via-border to-transparent" />
        
        <DropdownMenuItem className="cursor-pointer hover:bg-blue-50 dark:hover:bg-nepali-600 transition-all duration-300 animate-fade-in group" style={{ animationDelay: "0.1s" }}>
          <User className="mr-3 h-4 w-4 text-blue-500 group-hover:scale-110 transition-transform duration-300" />
          <span className="group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">Profile</span>
        </DropdownMenuItem>
        
        <DropdownMenuItem className="cursor-pointer hover:bg-blue-50 dark:hover:bg-nepali-600 transition-all duration-300 animate-fade-in group" style={{ animationDelay: "0.2s" }}>
          <Settings className="mr-3 h-4 w-4 text-blue-500 group-hover:scale-110 transition-transform duration-300" />
          <span className="group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">Settings</span>
        </DropdownMenuItem>
        
        <DropdownMenuSeparator className="bg-gradient-to-r from-transparent via-border to-transparent" />
        
        <DropdownMenuItem 
          onClick={handleSignOut} 
          disabled={isLoading}
          className="cursor-pointer hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-300 animate-fade-in group"
          style={{ animationDelay: "0.3s" }}
        >
          <LogOut className="mr-3 h-4 w-4 text-red-500 group-hover:scale-110 transition-transform duration-300" />
          <span className="group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors duration-300">
            {isLoading ? "Signing out..." : "Sign out"}
          </span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
