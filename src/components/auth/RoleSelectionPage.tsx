
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { GoogleAuthButton } from "./GoogleAuthButton";
import { Users, Calendar, Eye, EyeOff } from "lucide-react";

type UserRole = 'organizer' | 'attendee';

export const RoleSelectionPage = () => {
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [activeTab, setActiveTab] = useState<'signin' | 'signup'>('signup');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { signUp, signIn } = useAuth();
  const { toast } = useToast();

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    // Store the selected role for Google OAuth
    localStorage.setItem('pendingUserRole', role);
  };

  const assignRole = async (userId: string, role: UserRole) => {
    try {
      const { error } = await supabase
        .from('user_roles')
        .insert({ user_id: userId, role });
      
      if (error) throw error;
    } catch (error: any) {
      console.error('Error assigning role:', error);
      throw error;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRole) {
      toast({
        title: "Role Required",
        description: "Please select your role first.",
        variant: "destructive",
      });
      return;
    }

    if (!formData.email || !formData.password) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      let result;
      
      if (activeTab === 'signup') {
        if (!formData.name) {
          toast({
            title: "Name Required",
            description: "Please enter your name.",
            variant: "destructive",
          });
          return;
        }
        result = await signUp(formData.email, formData.password, formData.name);
      } else {
        result = await signIn(formData.email, formData.password);
      }

      if (result.error) {
        throw result.error;
      }

      // For sign up, the role will be assigned via the auth state change handler
      // For sign in, check if user has roles, if not assign the selected role
      if (activeTab === 'signin') {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          const { data: roles } = await supabase
            .from('user_roles')
            .select('role')
            .eq('user_id', user.id);
          
          if (!roles || roles.length === 0) {
            await assignRole(user.id, selectedRole);
          }
        }
      }

      toast({
        title: activeTab === 'signup' ? "Account Created" : "Welcome Back",
        description: activeTab === 'signup' 
          ? "Please check your email to verify your account." 
          : "You have been signed in successfully.",
      });

    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || `Failed to ${activeTab === 'signup' ? 'create account' : 'sign in'}`,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const roleCards = [
    {
      role: 'organizer' as const,
      title: 'Event Organizer',
      description: 'Create and manage events',
      icon: Calendar,
      benefits: ['Create unlimited events', 'Manage attendees', 'Analytics dashboard', 'Payment processing']
    },
    {
      role: 'attendee' as const,
      title: 'Event Attendee',
      description: 'Discover and attend events',
      icon: Users,
      benefits: ['Browse all events', 'Book tickets', 'Rate events', 'Personal dashboard']
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Welcome to Aayojana
          </h1>
          <p className="text-lg text-muted-foreground">
            Choose your role to get started with Nepal's premier event platform
          </p>
        </div>

        {!selectedRole ? (
          <div className="grid md:grid-cols-2 gap-6">
            {roleCards.map(({ role, title, description, icon: Icon, benefits }) => (
              <Card 
                key={role}
                className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105 border-2 hover:border-blue-500"
                onClick={() => handleRoleSelect(role)}
              >
                <CardHeader className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-xl">{title}</CardTitle>
                  <CardDescription className="text-base">{description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {benefits.map((benefit, index) => (
                      <li key={index} className="flex items-center text-sm">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="max-w-md mx-auto">
            <CardHeader className="text-center">
              <CardTitle>Join as {selectedRole === 'organizer' ? 'Event Organizer' : 'Event Attendee'}</CardTitle>
              <CardDescription>
                {activeTab === 'signup' ? 'Create your account' : 'Sign in to your account'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'signin' | 'signup')}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="signup">Sign Up</TabsTrigger>
                  <TabsTrigger value="signin">Sign In</TabsTrigger>
                </TabsList>
                
                <TabsContent value="signup" className="space-y-4">
                  <GoogleAuthButton mode="signup" />
                  
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <Separator />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-background px-2 text-muted-foreground">or</span>
                    </div>
                  </div>
                  
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <Input
                      type="text"
                      placeholder="Full Name"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      required
                    />
                    <Input
                      type="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      required
                    />
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        value={formData.password}
                        onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                    <Button type="submit" className="w-full" disabled={loading}>
                      {loading ? "Creating Account..." : "Create Account"}
                    </Button>
                  </form>
                </TabsContent>
                
                <TabsContent value="signin" className="space-y-4">
                  <GoogleAuthButton mode="signin" />
                  
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <Separator />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-background px-2 text-muted-foreground">or</span>
                    </div>
                  </div>
                  
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <Input
                      type="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      required
                    />
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        value={formData.password}
                        onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                    <Button type="submit" className="w-full" disabled={loading}>
                      {loading ? "Signing In..." : "Sign In"}
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
              
              <div className="mt-4 text-center">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedRole(null)}
                >
                  ← Choose Different Role
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};
