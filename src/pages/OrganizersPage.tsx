
import { useEffect } from "react";
import { Helmet } from "react-helmet";

const OrganizersPage = () => {
  useEffect(() => {
    // Scroll to top when page loads
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>For Organizers | Aayojana</title>
      </Helmet>
      
      <div className="container mx-auto px-4 py-16 mt-12">
        <div className="max-w-4xl mx-auto animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-8">
            <span className="bg-gradient-to-r from-saffron-500 to-nepali-500 bg-clip-text text-transparent">
              For Event Organizers
            </span>
          </h1>
          
          <p className="text-lg text-center text-muted-foreground mb-12">
            Tools and resources to help you organize successful events.
          </p>
          
          <div className="grid gap-8 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            {/* Content will be added here in future implementation */}
            <div className="p-12 border rounded-lg text-center bg-muted/50">
              <h2 className="text-2xl font-semibold mb-4">Coming Soon</h2>
              <p className="text-muted-foreground">
                We're currently building this page. Check back soon for organizer tools and resources!
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrganizersPage;
