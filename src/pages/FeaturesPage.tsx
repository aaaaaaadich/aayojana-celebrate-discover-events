
import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { Check } from "lucide-react";

const FeaturesPage = () => {
  useEffect(() => {
    // Scroll to top when page loads
    window.scrollTo(0, 0);
  }, []);

  const featuresList = [
    "Smart event recommendations based on preferences",
    "Digital ticketing with QR code validation",
    "Real-time analytics for event organizers",
    "Integrated payment solutions for tickets",
    "Event check-in management tools",
    "Automated email notifications",
    "Custom event pages and branding",
    "Attendee engagement tools",
    "Social media integration",
    "Mobile-responsive design",
  ];

  return (
    <>
      <Helmet>
        <title>Features | Aayojana</title>
      </Helmet>
      
      <div className="container mx-auto px-4 py-16 mt-12">
        <div className="max-w-4xl mx-auto animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-8">
            <span className="bg-gradient-to-r from-saffron-500 to-nepali-500 bg-clip-text text-transparent">
              Platform Features
            </span>
          </h1>
          
          <p className="text-lg text-center text-muted-foreground mb-12">
            Discover what makes Aayojana the premier event platform in Nepal.
          </p>
          
          <div className="grid gap-8 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <div className="border rounded-lg p-8 bg-card">
              <h2 className="text-2xl font-semibold mb-6">Key Features</h2>
              
              <ul className="space-y-4">
                {featuresList.map((feature, index) => (
                  <li 
                    key={index} 
                    className="flex items-start gap-3 animate-fade-in" 
                    style={{ animationDelay: `${0.3 + index * 0.1}s` }}
                  >
                    <div className="rounded-full bg-saffron-500/20 p-1 mt-0.5">
                      <Check className="h-4 w-4 text-saffron-500" />
                    </div>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="p-12 border rounded-lg text-center bg-muted/50 animate-fade-in" style={{ animationDelay: "0.6s" }}>
              <h2 className="text-2xl font-semibold mb-4">More Features Coming Soon</h2>
              <p className="text-muted-foreground">
                We're continuously improving our platform with new features!
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FeaturesPage;
