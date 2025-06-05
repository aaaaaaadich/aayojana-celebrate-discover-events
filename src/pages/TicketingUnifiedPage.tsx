
import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { 
  Ticket, 
  TrendingUp, 
  BookOpen, 
  Bell, 
  Play, 
  Check, 
  Star,
  Users,
  CreditCard,
  Shield,
  BarChart
} from "lucide-react";

const TicketingUnifiedPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const features = [
    {
      icon: Ticket,
      title: "Easy Ticket Sales",
      description: "Create and sell tickets for your events with our user-friendly platform",
      color: "bg-blue-100 dark:bg-blue-900/30",
      iconColor: "text-blue-500"
    },
    {
      icon: CreditCard,
      title: "Secure Payments",
      description: "Accept payments securely with multiple payment options",
      color: "bg-green-100 dark:bg-green-900/30",
      iconColor: "text-green-500"
    },
    {
      icon: BarChart,
      title: "Real-time Analytics",
      description: "Track sales, attendance, and revenue with detailed analytics",
      color: "bg-purple-100 dark:bg-purple-900/30",
      iconColor: "text-purple-500"
    },
    {
      icon: Users,
      title: "Attendee Management",
      description: "Manage your attendees with check-in systems and communication tools",
      color: "bg-orange-100 dark:bg-orange-900/30",
      iconColor: "text-orange-500"
    },
    {
      icon: Shield,
      title: "Fraud Protection",
      description: "Advanced security measures to protect against fraudulent activities",
      color: "bg-red-100 dark:bg-red-900/30",
      iconColor: "text-red-500"
    },
    {
      icon: Bell,
      title: "Event Notifications",
      description: "Keep attendees informed with automated notifications and updates",
      color: "bg-teal-100 dark:bg-teal-900/30",
      iconColor: "text-teal-500"
    }
  ];

  const pricingPlans = [
    {
      name: "Free",
      price: "0",
      description: "Perfect for small events",
      features: [
        "Up to 100 tickets",
        "Basic analytics",
        "Email support",
        "Standard checkout"
      ],
      popular: false
    },
    {
      name: "Pro",
      price: "2.5%",
      description: "Great for growing events",
      features: [
        "Unlimited tickets",
        "Advanced analytics",
        "Priority support",
        "Custom branding",
        "Multiple payment methods",
        "Attendee management"
      ],
      popular: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "For large scale events",
      features: [
        "Everything in Pro",
        "Dedicated support",
        "Custom integrations",
        "White-label solution",
        "Advanced reporting",
        "API access"
      ],
      popular: false
    }
  ];

  return (
    <>
      <Helmet>
        <title>Ticketing Solutions | Aayojana</title>
        <meta name="description" content="Complete ticketing solution for events in Nepal - sell tickets, manage attendees, and grow your events" />
      </Helmet>
      
      <div className="container mx-auto px-4 py-16 mt-12">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16 animate-fade-in">
            <div className="inline-block mb-6 px-5 py-1.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-base font-medium">
              Complete Ticketing Solution
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight text-gray-900 dark:text-white">
              <span className="bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-400 dark:to-blue-600 bg-clip-text text-transparent">
                Sell Tickets,
              </span>
              <br />
              <span className="text-gray-800 dark:text-gray-100">
                Grow Your Events
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto">
              From small gatherings to large festivals, our ticketing platform helps you sell tickets, 
              manage attendees, and create unforgettable experiences.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button
                asChild
                className="bg-blue-600 hover:bg-blue-700 text-white text-lg py-6 px-8 shadow-lg"
              >
                <Link to="/create-event">Start Selling Tickets</Link>
              </Button>
              <Button
                variant="outline"
                className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white text-lg py-6 px-8"
              >
                <Play className="mr-2 h-5 w-5" />
                Watch Demo
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap items-center justify-center gap-8 text-gray-500 dark:text-gray-400">
              <div className="flex items-center space-x-2">
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <span>1000+ Events Powered</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-green-500" />
                <span>50,000+ Tickets Sold</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-blue-500" />
                <span>100% Secure Payments</span>
              </div>
            </div>
          </div>

          {/* Features Section */}
          <section className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Everything You Need to Succeed</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Our comprehensive ticketing platform provides all the tools you need to create, 
                promote, and manage successful events.
              </p>
            </div>
            
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {features.map((feature, index) => (
                <Card key={index} className="hover:shadow-lg transition-all duration-300 animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <CardHeader>
                    <div className={`w-12 h-12 rounded-lg ${feature.color} flex items-center justify-center mb-4`}>
                      <feature.icon className={`h-6 w-6 ${feature.iconColor}`} />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Pricing Section */}
          <section className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Simple, Transparent Pricing</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Choose the plan that works best for your events. No hidden fees, no surprises.
              </p>
            </div>
            
            <div className="grid gap-8 md:grid-cols-3">
              {pricingPlans.map((plan, index) => (
                <Card key={index} className={`relative hover:shadow-lg transition-all duration-300 ${plan.popular ? 'ring-2 ring-blue-500 scale-105' : ''}`}>
                  {plan.popular && (
                    <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white">
                      Most Popular
                    </Badge>
                  )}
                  <CardHeader className="text-center">
                    <CardTitle className="text-2xl">{plan.name}</CardTitle>
                    <div className="text-4xl font-bold text-blue-600">
                      {plan.price === "Custom" ? plan.price : plan.price === "0" ? "Free" : `${plan.price} + fees`}
                    </div>
                    <p className="text-muted-foreground">{plan.description}</p>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-green-500" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button 
                      className={`w-full mt-6 ${plan.popular ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'variant-outline'}`}
                      variant={plan.popular ? "default" : "outline"}
                    >
                      {plan.price === "Custom" ? "Contact Sales" : "Get Started"}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Learning Resources */}
          <section className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Learn & Grow</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Access our comprehensive resources to maximize your event success.
              </p>
            </div>
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <Card className="hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <BookOpen className="h-8 w-8 text-blue-600 mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Event Planning Guide</h3>
                  <p className="text-sm text-muted-foreground mb-4">Complete guide to planning successful events</p>
                  <Button variant="ghost" size="sm">Learn More</Button>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <TrendingUp className="h-8 w-8 text-green-600 mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Marketing Tips</h3>
                  <p className="text-sm text-muted-foreground mb-4">Strategies to promote and sell more tickets</p>
                  <Button variant="ghost" size="sm">Read Articles</Button>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <Play className="h-8 w-8 text-purple-600 mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Video Tutorials</h3>
                  <p className="text-sm text-muted-foreground mb-4">Step-by-step video guides</p>
                  <Button variant="ghost" size="sm">Watch Now</Button>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <Bell className="h-8 w-8 text-orange-600 mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Get Notified</h3>
                  <p className="text-sm text-muted-foreground mb-4">Stay updated with new features</p>
                  <Button variant="ghost" size="sm">Subscribe</Button>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* CTA Section */}
          <section className="text-center bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-12">
            <h2 className="text-3xl font-bold mb-4">Ready to Start Selling Tickets?</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of event organizers who trust Aayojana to power their events.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                className="bg-blue-600 hover:bg-blue-700 text-white text-lg py-6 px-8"
              >
                <Link to="/create-event">Create Your First Event</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="text-lg py-6 px-8"
              >
                <Link to="/contact">Talk to Sales</Link>
              </Button>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default TicketingUnifiedPage;
