
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, QrCode, Smartphone, CreditCard, ShieldCheck, Zap, ChevronRight } from "lucide-react";

const TicketingPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    window.scrollTo(0, 0);
    // Simulate loading state
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 700);
    return () => clearTimeout(timer);
  }, []);

  const features = [
    {
      title: "Digital Tickets",
      description: "Paperless ticketing with QR codes for seamless entry. Reduce your environmental footprint and simplify the check-in process.",
      icon: QrCode
    },
    {
      title: "Mobile Scanning",
      description: "Use our mobile app to scan tickets at entry points. Works offline and syncs automatically when reconnected.",
      icon: Smartphone
    },
    {
      title: "Secure Payments",
      description: "Industry-standard security for all payment transactions with fraud detection and prevention.",
      icon: ShieldCheck
    },
    {
      title: "Instant Delivery",
      description: "Tickets delivered instantly via email and accessible in the Aayojana mobile app.",
      icon: Zap
    },
    {
      title: "Multiple Payment Options",
      description: "Accept payments via credit card, digital wallets, and mobile payment services.",
      icon: CreditCard
    }
  ];

  return (
    <>
      <Helmet>
        <title>Ticketing Solutions | Aayojana</title>
        <meta name="description" content="Seamless ticket management solutions for events of all sizes in Nepal" />
      </Helmet>
      
      <div className="container mx-auto px-4 py-16 mt-12">
        <div className="max-w-5xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-400 dark:to-blue-600 bg-clip-text text-transparent">
                Ticketing Solutions
              </span>
            </h1>
            
            <p className="text-lg text-muted-foreground mb-8 max-w-3xl mx-auto">
              Seamless ticketing management for events of all sizes. Our digital ticketing platform makes selling and managing tickets effortless.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
                Sell Tickets Now
              </Button>
              <Button size="lg" variant="outline">
                Learn More
              </Button>
            </div>
          </div>
          
          {/* Features */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold mb-12 text-center">Modern Ticketing Features</h2>
            
            {isLoading ? (
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="p-6 border rounded-lg animate-pulse">
                    <div className="h-10 w-10 bg-muted rounded-full mb-4"></div>
                    <div className="h-6 bg-muted rounded w-3/4 mb-3"></div>
                    <div className="h-4 bg-muted rounded w-full mb-2"></div>
                    <div className="h-4 bg-muted rounded w-full mb-2"></div>
                    <div className="h-4 bg-muted rounded w-3/4"></div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {features.map((feature) => (
                  <Card key={feature.title} className="hover:shadow-md transition-all duration-300 border">
                    <CardHeader>
                      <div className="h-12 w-12 flex items-center justify-center rounded-full bg-blue-100 dark:bg-blue-800/30 text-blue-600 dark:text-blue-400 mb-2">
                        <feature.icon className="h-6 w-6" />
                      </div>
                      <CardTitle>{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{feature.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
          
          {/* Solutions Tabs */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold mb-8 text-center">Ticketing Solutions For Every Need</h2>
            <p className="text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
              Our ticketing platform adapts to events of all types and sizes. Select your event type to see customized solutions.
            </p>
            
            {isLoading ? (
              <div className="animate-pulse">
                <div className="h-12 bg-muted rounded mx-auto w-2/3 mb-6"></div>
                <div className="h-64 bg-muted rounded w-full"></div>
              </div>
            ) : (
              <Tabs defaultValue="conferences" className="w-full">
                <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-8">
                  <TabsTrigger value="conferences">Conferences</TabsTrigger>
                  <TabsTrigger value="concerts">Concerts & Festivals</TabsTrigger>
                  <TabsTrigger value="workshops">Workshops</TabsTrigger>
                  <TabsTrigger value="cultural">Cultural Events</TabsTrigger>
                </TabsList>
                <TabsContent value="conferences" className="border rounded-lg p-6">
                  <h3 className="text-xl font-semibold mb-4">Conference Ticketing</h3>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <p className="text-muted-foreground mb-4">
                        Our conference ticketing solutions include sophisticated attendee management, multi-track session registration, and networking features.
                      </p>
                      <ul className="space-y-2">
                        {["Multi-tier ticket types", "Session bookings", "Attendee networking tools", "Conference schedule integration", "Speaker management"].map((item) => (
                          <li key={item} className="flex items-start">
                            <Check className="h-4 w-4 text-green-500 mr-2 mt-1" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                      <Button className="mt-6 bg-blue-600 hover:bg-blue-700 text-white">
                        Learn More <ChevronRight className="ml-1 h-4 w-4" />
                      </Button>
                    </div>
                    <div className="bg-muted h-64 rounded-lg flex items-center justify-center">
                      <p className="text-muted-foreground">Conference ticketing interface preview</p>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="concerts" className="border rounded-lg p-6">
                  <h3 className="text-xl font-semibold mb-4">Concert & Festival Ticketing</h3>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <p className="text-muted-foreground mb-4">
                        Handle large-volume ticket sales with ease. Our platform scales to meet demand for even the largest concerts and festivals.
                      </p>
                      <ul className="space-y-2">
                        {["High-volume ticket sales", "VIP packages", "Merchandise bundles", "Group discounts", "Anti-scalping measures"].map((item) => (
                          <li key={item} className="flex items-start">
                            <Check className="h-4 w-4 text-green-500 mr-2 mt-1" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                      <Button className="mt-6 bg-blue-600 hover:bg-blue-700 text-white">
                        Learn More <ChevronRight className="ml-1 h-4 w-4" />
                      </Button>
                    </div>
                    <div className="bg-muted h-64 rounded-lg flex items-center justify-center">
                      <p className="text-muted-foreground">Concert ticketing interface preview</p>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="workshops" className="border rounded-lg p-6">
                  <h3 className="text-xl font-semibold mb-4">Workshop Ticketing</h3>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <p className="text-muted-foreground mb-4">
                        Perfect for limited-capacity events with specialized registration needs and attendee questionnaires.
                      </p>
                      <ul className="space-y-2">
                        {["Capacity management", "Custom registration forms", "Material distribution", "Pre-event communication", "Attendance tracking"].map((item) => (
                          <li key={item} className="flex items-start">
                            <Check className="h-4 w-4 text-green-500 mr-2 mt-1" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                      <Button className="mt-6 bg-blue-600 hover:bg-blue-700 text-white">
                        Learn More <ChevronRight className="ml-1 h-4 w-4" />
                      </Button>
                    </div>
                    <div className="bg-muted h-64 rounded-lg flex items-center justify-center">
                      <p className="text-muted-foreground">Workshop ticketing interface preview</p>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="cultural" className="border rounded-lg p-6">
                  <h3 className="text-xl font-semibold mb-4">Cultural Event Ticketing</h3>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <p className="text-muted-foreground mb-4">
                        Support for traditional and cultural events with special features for community engagement and heritage preservation.
                      </p>
                      <ul className="space-y-2">
                        {["Family packages", "Community discounts", "Donation integration", "Cultural program scheduling", "Multilingual support"].map((item) => (
                          <li key={item} className="flex items-start">
                            <Check className="h-4 w-4 text-green-500 mr-2 mt-1" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                      <Button className="mt-6 bg-blue-600 hover:bg-blue-700 text-white">
                        Learn More <ChevronRight className="ml-1 h-4 w-4" />
                      </Button>
                    </div>
                    <div className="bg-muted h-64 rounded-lg flex items-center justify-center">
                      <p className="text-muted-foreground">Cultural event ticketing preview</p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            )}
          </div>
          
          {/* Coming Soon */}
          <div className="mb-16">
            <div className="p-12 border rounded-lg text-center bg-background shadow-sm">
              <h2 className="text-2xl font-semibold mb-4">Advanced Features Coming Soon</h2>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                We're working on enhancing our ticketing platform with more features including reserved seating, integrated marketing tools, and advanced analytics.
              </p>
              <Button variant="outline">Get Notified</Button>
            </div>
          </div>
          
          {/* CTA Section */}
          <div className="rounded-lg p-10 bg-gradient-to-r from-blue-600 to-blue-800 text-white text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to streamline your event ticketing?</h2>
            <p className="mb-8 max-w-2xl mx-auto">
              Join event organizers across Nepal who trust Aayojana for their ticketing needs. Get started today and make your next event a success.
            </p>
            <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-blue-50">
              Get Started <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default TicketingPage;
