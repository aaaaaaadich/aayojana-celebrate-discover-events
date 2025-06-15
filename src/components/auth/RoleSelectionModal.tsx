
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { UserRole, useUserRoles } from "@/hooks/useUserRoles";
import { useToast } from "@/hooks/use-toast";
import { Users, Calendar, Briefcase, UserCheck } from "lucide-react";

interface RoleSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRoleSelected: () => void;
}

export const RoleSelectionModal = ({ isOpen, onClose, onRoleSelected }: RoleSelectionModalProps) => {
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { addRole } = useUserRoles();
  const { toast } = useToast();

  const handleRoleSelection = async () => {
    if (!selectedRole) return;

    setIsLoading(true);
    try {
      const { error } = await addRole(selectedRole);
      
      if (error) {
        toast({
          title: "Error",
          description: "Failed to set user role",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Success",
          description: `You're now registered as ${selectedRole === 'organizer' ? 'an organizer' : 'an attendee'}`,
        });
        onRoleSelected();
        onClose();
      }
    } finally {
      setIsLoading(false);
    }
  };

  const roles = [
    {
      value: 'organizer' as UserRole,
      title: 'Event Organizer',
      description: 'Create and manage events, track analytics, and sell tickets',
      icon: Briefcase,
      features: ['Create Events', 'Analytics Dashboard', 'Ticket Management', 'Attendee Management']
    },
    {
      value: 'attendee' as UserRole,
      title: 'Event Attendee',
      description: 'Discover events, buy tickets, and manage your event experiences',
      icon: Users,
      features: ['Browse Events', 'Buy Tickets', 'Event History', 'Reviews & Ratings']
    }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle className="text-2xl text-center">Choose Your Role</DialogTitle>
          <p className="text-muted-foreground text-center">
            Select how you'd like to use Aayojana. You can always add more roles later.
          </p>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-6 py-6">
          {roles.map((role) => {
            const Icon = role.icon;
            const isSelected = selectedRole === role.value;
            
            return (
              <Card 
                key={role.value}
                className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
                  isSelected ? 'ring-2 ring-blue-500 bg-blue-50 dark:bg-blue-900/20' : ''
                }`}
                onClick={() => setSelectedRole(role.value)}
              >
                <CardHeader className="text-center">
                  <div className="flex justify-center mb-4">
                    <div className={`p-4 rounded-full ${isSelected ? 'bg-blue-500 text-white' : 'bg-blue-100 dark:bg-blue-900/30 text-blue-500'}`}>
                      <Icon className="h-8 w-8" />
                    </div>
                  </div>
                  <CardTitle className="text-xl">{role.title}</CardTitle>
                  <CardDescription>{role.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {role.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm">
                        <UserCheck className="h-4 w-4 text-green-500" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="flex justify-center gap-4">
          <Button variant="outline" onClick={onClose}>
            Skip for now
          </Button>
          <Button 
            onClick={handleRoleSelection} 
            disabled={!selectedRole || isLoading}
            className="min-w-32"
          >
            {isLoading ? "Setting up..." : "Continue"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
