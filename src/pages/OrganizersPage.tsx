
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, ChevronRight, Users, Calendar, BarChart, CreditCard, Clock } from "lucide-react";

const OrganizersPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

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
      icon: Calendar,
      title: "Event Management",
      description: "Create and manage events with our intuitive tools. Set up ticketing, manage registrations, and customize event pages."
    },
    {
      icon: Users,
      title: "Attendee Management",
      description: "Manage your guest lists, send invitations, and track RSVPs. Get insights into your attendee demographics."
    },
    {
      icon: BarChart,
      title: "Analytics & Insights",
      description: "Track ticket sales, attendance, and engagement. Make data-driven decisions to improve future events."
    },
    {
      icon: CreditCard,
      title: "Payment Processing",
      description: "Securely collect payments for tickets and manage refunds with our integrated payment processing system."
    },
    {
      icon: Clock,
      title: "On-site Check-in",
      description: "Streamline the check-in process with QR code scanning and real-time attendance tracking."
    }
  ];

  const plans = [
    {
      name: "Basic",
      price: "Free",
      description: "Perfect for occasional events and small gatherings",
      features: [
        "Up to 3 events per year",
        "Basic event page",
        "Up to 50 attendees per event",
        "Email support"
      ]
    },
    {
      name: "Professional",
      price: "Rs 2,999/mo",
      description: "For regular event organizers and small businesses",
      features: [
        "Unlimited events",
        "Custom event pages",
        "Up to 500 attendees per event",
        "Analytics dashboard",
        "Priority support"
      ],
      popular: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "For large organizations and frequent event hosts",
      features: [
        "Unlimited everything",
        "Advanced analytics",
        "Custom integrations",
        "Dedicated account manager",
        "On-site support available"
      ]
    }
  ];

  // New handler functions for buttons
  const handleStartOrganizing = () => {
    navigate("/create-event");
  };

  const handleViewDemo = () => {
    navigate("/organizers/demo");
  };

  // Go to "Getting Started" for all "Get Started" buttons in Pricing
  const handlePricingRedirect = () => {
    navigate("/organizers/getting-started");
  };

  return (
    <>
      <Helmet>
        <title>For Organizers | Aayojana</title>
        <meta name="description" content="Tools and resources to help you organize successful events in Nepal" />
      </Helmet>
      
      <div className="container mx-auto px-4 py-16 mt-12">
        <div className="max-w-5xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-400 dark:to-blue-600 bg-clip-text text-transparent">
                For Event Organizers
              </span>
            </h1>
            
            <p className="text-lg text-muted-foreground mb-8 max-w-3xl mx-auto">
              Powerful tools and resources to help you organize successful events that stand out. From planning to execution, we've got you covered.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white" onClick={handleStartOrganizing}>
                Start Organizing
              </Button>
              <Button size="lg" variant="outline" onClick={handleViewDemo}>
                View Demo
              </Button>
            </div>
          </div>
          
          {/* Features */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold mb-12 text-center">Everything You Need to Succeed</h2>
            
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
                  <div key={feature.title} className="p-6 border rounded-lg bg-background hover:shadow-md transition-all duration-300">
                    <div className="h-12 w-12 flex items-center justify-center rounded-full bg-blue-100 dark:bg-blue-800/30 text-blue-600 dark:text-blue-400 mb-4">
                      <feature.icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* Pricing */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-4 text-center">Pricing Plans</h2>
            <p className="text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
              Choose the plan that works best for your events. All plans include our core features to help you create successful events.
            </p>
            
            {isLoading ? (
              <div className="grid gap-8 md:grid-cols-3">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="border rounded-lg animate-pulse">
                    <div className="p-6 border-b">
                      <div className="h-6 bg-muted rounded w-1/2 mb-3"></div>
                      <div className="h-10 bg-muted rounded w-1/3 mb-3"></div>
                      <div className="h-4 bg-muted rounded w-3/4"></div>
                    </div>
                    <div className="p-6">
                      <div className="h-4 bg-muted rounded w/full mb-3"></div>
                      <div className="h-4 bg-muted rounded w-full mb-3"></div>
                      <div className="h-4 bg-muted rounded w-full mb-3"></div>
                      <div className="h-4 bg-muted rounded w-3/4 mb-6"></div>
                      <div className="h-10 bg-muted rounded w-full"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid gap-8 md:grid-cols-3">
                {plans.map((plan) => (
                  <Card key={plan.name} className={`overflow-hidden ${plan.popular ? 'border-blue-500 shadow-md' : ''}`}>
                    {plan.popular && (
                      <div className="bg-blue-600 text-white text-center py-1 text-sm font-medium">
                        Most Popular
                      </div>
                    )}
                    <CardHeader>
                      <CardTitle>{plan.name}</CardTitle>
                      <div className="mt-2">
                        <span className="text-3xl font-bold">{plan.price}</span>
                        {plan.price !== "Free" && plan.price !== "Custom" && (
                          <span className="text-muted-foreground ml-1">/month</span>
                        )}
                      </div>
                      <CardDescription>{plan.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {plan.features.map((feature) => (
                          <li key={feature} className="flex items-start">
                            <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Button 
                        className={`w-full ${plan.popular ? 'bg-blue-600 hover:bg-blue-700 text-white' : ''}`}
                        variant={plan.popular ? 'default' : 'outline'}
                        onClick={handlePricingRedirect}
                      >
                        {plan.price === "Custom" ? "Contact Sales" : "Get Started"}
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </div>
          
          {/* CTA Section */}
          <div className="rounded-lg p-10 bg-gradient-to-r from-blue-600 to-blue-800 text-white text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to host your next event?</h2>
            <p className="mb-8 max-w-2xl mx-auto">
              Join thousands of event organizers who trust Aayojana to power their events. Our platform makes it easy to create, manage, and grow your events.
            </p>
            <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-blue-50" onClick={handleStartOrganizing}>
              Get Started <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrganizersPage;
