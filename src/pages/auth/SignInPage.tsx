
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const SignInPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Coming Soon",
      description: "Authentication will be implemented soon!",
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-saffron-50 to-nepali-50 dark:from-saffron-900/20 dark:to-nepali-900/20">
      <div className="w-full max-w-md px-4 py-8 animate-fade-in">
        <Card className="p-6 space-y-6 backdrop-blur-xl bg-white/80 dark:bg-black/50 hover:shadow-xl transition-all duration-300 border-t border-white/20">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold tracking-tighter bg-gradient-to-r from-saffron-500 to-nepali-500 bg-clip-text text-transparent">
              Welcome Back
            </h1>
            <p className="text-muted-foreground">
              Enter your credentials to sign in
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                className="animate-fade-in [animation-delay:200ms]"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                className="animate-fade-in [animation-delay:400ms]"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-saffron-500 to-nepali-500 hover:from-saffron-600 hover:to-nepali-600 text-white animate-fade-in [animation-delay:600ms] transition-all duration-300 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
            >
              Sign In
            </Button>
          </form>

          <div className="text-center text-sm text-muted-foreground animate-fade-in [animation-delay:800ms]">
            <span>Don't have an account? </span>
            <Button variant="link" onClick={() => navigate("/sign-up")}>
              Sign up
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default SignInPage;
