
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { Calendar, Music, Coffee, Briefcase, Globe, Cpu, HeartPulse, Brush, GraduationCap } from "lucide-react";

const categories = [
  { 
    name: "Music & Concerts", 
    icon: Music, 
    href: "/events/categories/music",
    color: "bg-purple-100 dark:bg-purple-900/30",
    iconColor: "text-purple-500"
  },
  { 
    name: "Food & Drinks", 
    icon: Coffee, 
    href: "/events/categories/food",
    color: "bg-orange-100 dark:bg-orange-900/30",
    iconColor: "text-orange-500"
  },
  { 
    name: "Business & Professional", 
    icon: Briefcase, 
    href: "/events/categories/business",
    color: "bg-blue-100 dark:bg-blue-900/30",
    iconColor: "text-blue-500"
  },
  { 
    name: "Cultural", 
    icon: Globe, 
    href: "/events/categories/cultural",
    color: "bg-red-100 dark:bg-red-900/30",
    iconColor: "text-red-500"
  },
  { 
    name: "Technology", 
    icon: Cpu, 
    href: "/events/categories/technology",
    color: "bg-teal-100 dark:bg-teal-900/30",
    iconColor: "text-teal-500"
  },
  { 
    name: "Health & Wellness", 
    icon: HeartPulse, 
    href: "/events/categories/health",
    color: "bg-green-100 dark:bg-green-900/30",
    iconColor: "text-green-500"
  },
  { 
    name: "Arts", 
    icon: Brush, 
    href: "/events/categories/arts",
    color: "bg-pink-100 dark:bg-pink-900/30",
    iconColor: "text-pink-500"
  },
  { 
    name: "Education", 
    icon: GraduationCap, 
    href: "/events/categories/education",
    color: "bg-amber-100 dark:bg-amber-900/30",
    iconColor: "text-amber-500"
  },
];

const CategoriesPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    window.scrollTo(0, 0);
    // Simulate loading state
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Helmet>
        <title>Event Categories | Aayojana</title>
        <meta name="description" content="Browse events by category and find exactly what you're looking for" />
      </Helmet>
      
      <div className="container mx-auto px-4 py-16 mt-12">
        <div className="max-w-5xl mx-auto animate-fade-in">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-400 dark:to-blue-600 bg-clip-text text-transparent">
                Event Categories
              </span>
            </h1>
            
            <p className="text-lg text-muted-foreground mb-8 max-w-3xl mx-auto">
              Browse events by category and find exactly what you're looking for. We've organized events into easy-to-navigate categories.
            </p>
          </div>
          
          {isLoading ? (
            // Loading skeleton
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="aspect-square rounded-lg animate-pulse bg-muted"></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {categories.map((category) => (
                <Link 
                  key={category.name} 
                  to={category.href}
                  className="flex flex-col items-center justify-center p-8 rounded-lg border hover:shadow-md transition-all duration-300 bg-background group"
                >
                  <div className={`p-4 rounded-full mb-4 ${category.color} group-hover:scale-110 transition-transform duration-300`}>
                    <category.icon className={`h-8 w-8 ${category.iconColor}`} />
                  </div>
                  <h2 className="font-medium text-center">{category.name}</h2>
                  <p className="text-sm text-muted-foreground text-center mt-2">Coming soon</p>
                </Link>
              ))}
            </div>
          )}
          
          <div className="mt-20 p-8 border rounded-lg bg-background shadow-sm">
            <h2 className="text-2xl font-semibold mb-4 text-center">More Categories Coming Soon</h2>
            <p className="text-center text-muted-foreground">
              We're continuously adding new categories to make your event discovery experience even better.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoriesPage;
