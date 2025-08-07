import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useUserRoles } from "@/hooks/useUserRoles";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, Crown, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AdminAssignPage = () => {
  const { user } = useAuth();
  const { hasRole, addRole } = useUserRoles();
  const { toast } = useToast();
  const [isAssigning, setIsAssigning] = useState(false);

  const handleAssignAdmin = async () => {
    if (!user) return;
    
    setIsAssigning(true);
    const { error } = await addRole('admin');
    
    if (error) {
      toast({
        title: "Error",
        description: "Failed to assign admin role. Please try again.",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success!",
        description: "Admin role assigned successfully!",
      });
    }
    setIsAssigning(false);
  };

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Access Denied</CardTitle>
            <CardDescription>Please sign in to access this page.</CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto">
        <Card>
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mb-4">
              <Shield className="h-6 w-6 text-red-500" />
            </div>
            <CardTitle className="text-2xl font-bold">Admin Role Assignment</CardTitle>
            <CardDescription>
              Assign yourself admin privileges for testing purposes
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {hasRole('admin') ? (
              <div className="text-center">
                <div className="mx-auto w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mb-4">
                  <Check className="h-8 w-8 text-green-500" />
                </div>
                <h3 className="text-lg font-semibold text-green-600 dark:text-green-400 mb-2">
                  Admin Role Active
                </h3>
                <p className="text-muted-foreground mb-4">
                  You already have admin privileges. You can access the admin dashboard from your user menu.
                </p>
                <Button asChild className="w-full">
                  <a href="/dashboard/admin">
                    <Crown className="mr-2 h-4 w-4" />
                    Go to Admin Dashboard
                  </a>
                </Button>
              </div>
            ) : (
              <div className="text-center">
                <p className="text-muted-foreground mb-4">
                  Click the button below to assign yourself admin role for testing the admin dashboard.
                </p>
                <Button 
                  onClick={handleAssignAdmin}
                  disabled={isAssigning}
                  className="w-full"
                  variant="destructive"
                >
                  <Shield className="mr-2 h-4 w-4" />
                  {isAssigning ? "Assigning..." : "Assign Admin Role"}
                </Button>
                <p className="text-xs text-muted-foreground mt-2">
                  This is for testing purposes only
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminAssignPage;