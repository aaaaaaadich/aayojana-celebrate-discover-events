
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
import { useUserRoles } from "@/hooks/useUserRoles";
import { useToast } from "@/hooks/use-toast";
import { LogOut, User, Settings, Crown, Zap, Star, Loader2, LayoutDashboard, Shield, Users, Calendar } from "lucide-react";
import { Link } from "react-router-dom";

export const UserMenu = () => {
  const { user, signOut } = useAuth();
  const { hasRole, loading: rolesLoading } = useUserRoles();
  const { toast } = useToast();
  const [isSigningOut, setIsSigningOut] = useState(false);

  const handleSignOut = async () => {
    if (isSigningOut) return; // Prevent multiple sign out attempts
    
    setIsSigningOut(true);
    console.log('Sign out button clicked');
    
    try {
      const { error } = await signOut();
      
      if (error) {
        console.error('Sign out failed:', error);
        toast({
          title: "Error",
          description: "Failed to sign out. Please try again.",
          variant: "destructive",
        });
        setIsSigningOut(false); // Reset loading state on error
      } else {
        console.log('Sign out successful, redirecting...');
        toast({
          title: "Signed out",
          description: "You have been successfully signed out",
        });
        // Don't reset loading state here as we're redirecting
      }
    } catch (error) {
      console.error('Unexpected error during sign out:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
      setIsSigningOut(false);
    }
  };

  if (!user) return null;

  const displayName = user.user_metadata?.name || user.email?.split('@')[0] || 'User';
  const avatarUrl = user.user_metadata?.avatar_url;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full animate-hover-lift animate-3d-hover group overflow-hidden">
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
      
      <DropdownMenuContent className="w-64 bg-white dark:bg-nepali-700 shadow-2xl animate-bounce-in overflow-hidden border border-gray-200 dark:border-gray-600" align="end" forceMount>
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
              <p className="font-semibold text-sm text-blue-600 dark:text-blue-400">
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
        
        <DropdownMenuSeparator className="bg-gray-200 dark:bg-gray-600 animate-liquid" />
        
        {/* Dashboard Links */}
        {!rolesLoading && (
          <>
            {hasRole('admin') && (
              <DropdownMenuItem asChild className="cursor-pointer hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-500 group animate-hover-lift">
                <Link to="/dashboard/admin">
                  <Shield className="mr-3 h-4 w-4 text-red-500 animate-magnetic transition-transform duration-300" />
                  <span className="group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors duration-300">Admin Dashboard</span>
                  <Zap className="ml-auto w-3 h-3 text-red-500/50 opacity-0 group-hover:opacity-100 animate-bounce-in" />
                </Link>
              </DropdownMenuItem>
            )}
            
            {hasRole('organizer') && (
              <DropdownMenuItem asChild className="cursor-pointer hover:bg-green-50 dark:hover:bg-green-900/20 transition-all duration-500 group animate-hover-lift">
                <Link to="/dashboard/organizer">
                  <Calendar className="mr-3 h-4 w-4 text-green-500 animate-magnetic transition-transform duration-300" />
                  <span className="group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors duration-300">Organizer Dashboard</span>
                  <Zap className="ml-auto w-3 h-3 text-green-500/50 opacity-0 group-hover:opacity-100 animate-bounce-in" />
                </Link>
              </DropdownMenuItem>
            )}
            
            {hasRole('attendee') && (
              <DropdownMenuItem asChild className="cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-500 group animate-hover-lift">
                <Link to="/dashboard/attendee">
                  <Users className="mr-3 h-4 w-4 text-blue-500 animate-magnetic transition-transform duration-300" />
                  <span className="group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">Attendee Dashboard</span>
                  <Zap className="ml-auto w-3 h-3 text-blue-500/50 opacity-0 group-hover:opacity-100 animate-bounce-in" />
                </Link>
              </DropdownMenuItem>
            )}
            
            {/* If user has no specific role, show general dashboard */}
            {!hasRole('admin') && !hasRole('organizer') && !hasRole('attendee') && (
              <DropdownMenuItem asChild className="cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-500 group animate-hover-lift">
                <Link to="/dashboard/attendee">
                  <LayoutDashboard className="mr-3 h-4 w-4 text-blue-500 animate-magnetic transition-transform duration-300" />
                  <span className="group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">Dashboard</span>
                  <Zap className="ml-auto w-3 h-3 text-blue-500/50 opacity-0 group-hover:opacity-100 animate-bounce-in" />
                </Link>
              </DropdownMenuItem>
            )}
            
            <DropdownMenuSeparator className="bg-gray-200 dark:bg-gray-600 animate-liquid" />
          </>
        )}
        
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
        
        <DropdownMenuSeparator className="bg-gray-200 dark:bg-gray-600 animate-liquid" />
        
        <DropdownMenuItem 
          onClick={handleSignOut} 
          disabled={isSigningOut}
          className="cursor-pointer hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-500 group animate-hover-lift disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSigningOut ? (
            <Loader2 className="mr-3 h-4 w-4 text-red-500 animate-spin" />
          ) : (
            <LogOut className="mr-3 h-4 w-4 text-red-500 animate-magnetic transition-transform duration-300" />
          )}
          <span className="group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors duration-300">
            {isSigningOut ? "Signing out..." : "Sign out"}
          </span>
          {!isSigningOut && <Zap className="ml-auto w-3 h-3 text-red-500/50 opacity-0 group-hover:opacity-100 animate-bounce-in" />}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
