
import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { User, LogIn } from "lucide-react";

const ExplorePage = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (!loading && !user) {
      toast({
        title: "Login Required",
        description: "Please login to access the Explore Events feature.",
        variant: "destructive",
      });
    }
  }, [user, loading, toast]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-300 rounded w-1/3 mx-auto mb-4"></div>
          <div className="h-4 bg-gray-300 rounded w-1/2 mx-auto"></div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <>
        <Helmet>
          <title>Login Required | Aayojana</title>
          <meta name="description" content="Please login to access the Explore Events feature." />
        </Helmet>
        <div className="container mx-auto px-4 py-20 text-center">
          <div className="max-w-md mx-auto">
            <User className="w-24 h-24 mx-auto text-blue-500 mb-6" />
            <h1 className="text-3xl font-bold mb-4">Login Required</h1>
            <p className="text-lg text-muted-foreground mb-8">
              You can only access the Explore Events feature if you login. Don't have an account? Sign up to get started!
            </p>
            <div className="space-y-4">
              <Button asChild className="w-full bg-blue-600 hover:bg-blue-700" size="lg">
                <Link to="/auth">
                  <LogIn className="w-5 h-5 mr-2" />
                  Login / Sign Up
                </Link>
              </Button>
              <Button variant="outline" onClick={() => navigate(-1)} className="w-full">
                Go Back
              </Button>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Explore Events | Aayojana</title>
        <meta name="description" content="Browse all events happening across Nepal on Aayojana." />
      </Helmet>
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">Explore Events</h1>
        <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
          Discover a variety of events happening around Nepal! Use filters to find events that interest you, or explore the latest from our community.
        </p>
        <div className="rounded-lg border px-6 py-20 bg-background text-muted-foreground">
          Explore events feature coming soon.
        </div>
      </div>
    </>
  );
};

export default ExplorePage;
