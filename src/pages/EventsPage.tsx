
import { useEffect } from "react";
import { Helmet } from "react-helmet";

const EventsPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Discover Events | Aayojana</title>
      </Helmet>
      
      <div className="container mx-auto px-4 py-16 mt-12">
        <div className="max-w-4xl mx-auto animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-8">
            <span className="bg-gradient-to-r from-saffron-500 to-nepali-500 bg-clip-text text-transparent">
              Discover Events
            </span>
          </h1>
          
          <p className="text-lg text-center text-muted-foreground mb-12">
            Find and attend exciting events happening all around Nepal.
          </p>
          
          <div className="grid gap-8 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <div className="p-12 border rounded-lg text-center bg-muted/50 hover:bg-muted/70 transition-colors duration-300">
              <h2 className="text-2xl font-semibold mb-4">Coming Soon</h2>
              <p className="text-muted-foreground">
                We're currently building this page. Check back soon for a complete listing of events!
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EventsPage;
