
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  QrCode, 
  Smartphone, 
  Settings, 
  BarChart3,
  Shield,
  Zap,
  Check,
  Star,
  Users,
  CreditCard,
  Ticket,
  ScanLine,
  Download,
  Mail,
  Clock,
  TrendingUp
} from "lucide-react";

const TicketingPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    window.scrollTo(0, 0);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 700);
    return () => clearTimeout(timer);
  }, []);

  const ticketingFeatures = [
    {
      icon: QrCode,
      title: "Digital Tickets",
      description: "Modern QR code tickets delivered instantly to attendees",
      color: "bg-blue-100 dark:bg-blue-900/30",
      iconColor: "text-blue-500"
    },
    {
      icon: ScanLine,
      title: "Scanning Tools",
      description: "Fast and reliable ticket scanning for entry management",
      color: "bg-green-100 dark:bg-green-900/30",
      iconColor: "text-green-500"
    },
    {
      icon: Settings,
      title: "Ticket Management",
      description: "Complete control over ticket types, pricing, and availability",
      color: "bg-purple-100 dark:bg-purple-900/30",
      iconColor: "text-purple-500"
    },
    {
      icon: BarChart3,
      title: "Sales Analytics",
      description: "Real-time insights into ticket sales and revenue",
      color: "bg-orange-100 dark:bg-orange-900/30",
      iconColor: "text-orange-500"
    },
    {
      icon: Shield,
      title: "Fraud Protection",
      description: "Advanced security to prevent ticket fraud and duplication",
      color: "bg-red-100 dark:bg-red-900/30",
      iconColor: "text-red-500"
    },
    {
      icon: CreditCard,
      title: "Payment Processing",
      description: "Secure payment handling with multiple payment options",
      color: "bg-teal-100 dark:bg-teal-900/30",
      iconColor: "text-teal-500"
    }
  ];

  const managementFeatures = [
    "Create multiple ticket types",
    "Set pricing and availability",
    "Manage promo codes and discounts",
    "Control sales periods",
    "Track inventory in real-time",
    "Generate detailed reports"
  ];

  const scanningFeatures = [
    "High-speed QR code scanning",
    "Offline scanning capability",
    "Real-time entry validation",
    "Duplicate ticket detection",
    "Multi-device support",
    "Entry analytics and reports"
  ];

  const digitalFeatures = [
    "Instant ticket delivery",
    "Mobile wallet integration",
    "QR code generation",
    "Email and SMS delivery",
    "Paperless eco-friendly solution",
    "Easy ticket transfers"
  ];

  return (
    <>
      <Helmet>
        <title>Complete Ticketing Solutions | Aayojana</title>
        <meta name="description" content="Comprehensive ticketing platform with digital tickets, scanning tools, and management features for events in Nepal" />
      </Helmet>
      
      <div className="container mx-auto px-4 py-16 mt-12">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16 animate-fade-in">
            <div className="inline-block mb-6 px-5 py-1.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-base font-medium">
              Complete Ticketing Platform
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight text-gray-900 dark:text-white">
              <span className="bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-400 dark:to-blue-600 bg-clip-text text-transparent">
                All-in-One
              </span>
              <br />
              <span className="text-gray-800 dark:text-gray-100">
                Ticketing Solution
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto">
              Manage, scan, and deliver digital tickets with our comprehensive platform. 
              Everything you need for seamless event ticketing in one place.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button
                className="bg-blue-600 hover:bg-blue-700 text-white text-lg py-6 px-8 shadow-lg"
              >
                <Ticket className="mr-2 h-5 w-5" />
                Start Selling Tickets
              </Button>
              <Button
                variant="outline"
                className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white text-lg py-6 px-8"
              >
                <Download className="mr-2 h-5 w-5" />
                Download Scanner App
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap items-center justify-center gap-8 text-gray-500 dark:text-gray-400">
              <div className="flex items-center space-x-2">
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <span>10,000+ Events</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-green-500" />
                <span>500K+ Tickets Sold</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-blue-500" />
                <span>99.9% Uptime</span>
              </div>
            </div>
          </div>

          {/* Features Overview */}
          <section className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Complete Ticketing Ecosystem</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Our integrated platform handles every aspect of event ticketing from creation to entry.
              </p>
            </div>
            
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {ticketingFeatures.map((feature, index) => (
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

          {/* Detailed Features Tabs */}
          <section className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Explore Our Features</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Deep dive into each component of our ticketing platform.
              </p>
            </div>
            
            <Tabs defaultValue="management" className="w-full">
              <TabsList className="grid grid-cols-3 mb-8 max-w-md mx-auto">
                <TabsTrigger value="management">Management</TabsTrigger>
                <TabsTrigger value="digital">Digital Tickets</TabsTrigger>
                <TabsTrigger value="scanning">Scanning</TabsTrigger>
              </TabsList>

              <TabsContent value="management" className="space-y-8">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <h3 className="text-2xl font-bold mb-4">Ticket Management</h3>
                    <p className="text-muted-foreground mb-6">
                      Take complete control of your ticket sales with our comprehensive management tools. 
                      Create multiple ticket types, set pricing strategies, and track sales in real-time.
                    </p>
                    <div className="space-y-3">
                      {managementFeatures.map((feature, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                    <Button className="mt-6 bg-purple-600 hover:bg-purple-700">
                      <Settings className="mr-2 h-4 w-4" />
                      Access Management Dashboard
                    </Button>
                  </div>
                  <div className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-lg p-8">
                    <div className="space-y-4">
                      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium">General Admission</span>
                          <Badge>150 sold</Badge>
                        </div>
                        <div className="text-sm text-muted-foreground">NPR 500 • 200 available</div>
                      </div>
                      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium">VIP Pass</span>
                          <Badge variant="secondary">25 sold</Badge>
                        </div>
                        <div className="text-sm text-muted-foreground">NPR 1,500 • 50 available</div>
                      </div>
                      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium">Early Bird</span>
                          <Badge variant="outline">Ended</Badge>
                        </div>
                        <div className="text-sm text-muted-foreground">NPR 400 • 100 sold</div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="digital" className="space-y-8">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div className="bg-gradient-to-br from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20 rounded-lg p-8">
                    <div className="text-center space-y-4">
                      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm max-w-xs mx-auto">
                        <QrCode className="h-24 w-24 mx-auto mb-4 text-gray-400" />
                        <div className="text-sm font-medium">Nepal Music Festival</div>
                        <div className="text-xs text-muted-foreground">Gate A • Seat 25</div>
                        <div className="text-xs text-muted-foreground mt-2">Valid: Dec 15, 2024</div>
                      </div>
                      <div className="flex justify-center gap-2">
                        <Button size="sm" variant="outline">
                          <Mail className="h-4 w-4 mr-1" />
                          Email
                        </Button>
                        <Button size="sm" variant="outline">
                          <Smartphone className="h-4 w-4 mr-1" />
                          Wallet
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-4">Digital Tickets</h3>
                    <p className="text-muted-foreground mb-6">
                      Go paperless with our digital ticket solution. Instant delivery, secure QR codes, 
                      and seamless integration with mobile wallets for the modern attendee experience.
                    </p>
                    <div className="space-y-3">
                      {digitalFeatures.map((feature, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                    <Button className="mt-6 bg-blue-600 hover:bg-blue-700">
                      <QrCode className="mr-2 h-4 w-4" />
                      Create Digital Tickets
                    </Button>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="scanning" className="space-y-8">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <h3 className="text-2xl font-bold mb-4">Scanning Tools</h3>
                    <p className="text-muted-foreground mb-6">
                      Streamline entry with our powerful scanning tools. Fast, reliable, and secure ticket 
                      validation that works online and offline to ensure smooth event operations.
                    </p>
                    <div className="space-y-3">
                      {scanningFeatures.map((feature, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-3 mt-6">
                      <Button className="bg-green-600 hover:bg-green-700">
                        <ScanLine className="mr-2 h-4 w-4" />
                        Download Scanner
                      </Button>
                      <Button variant="outline">
                        <Smartphone className="mr-2 h-4 w-4" />
                        Mobile App
                      </Button>
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 rounded-lg p-8">
                    <div className="text-center space-y-6">
                      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
                        <ScanLine className="h-16 w-16 mx-auto mb-4 text-green-500" />
                        <div className="text-lg font-semibold text-green-600">Ticket Validated</div>
                        <div className="text-sm text-muted-foreground">John Doe • VIP Pass</div>
                        <div className="text-xs text-muted-foreground mt-2">
                          <Clock className="inline h-3 w-3 mr-1" />
                          Scanned at 7:30 PM
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                          <div className="text-2xl font-bold text-green-600">1,247</div>
                          <div className="text-xs text-muted-foreground">Scanned</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-blue-600">523</div>
                          <div className="text-xs text-muted-foreground">Pending</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-red-600">12</div>
                          <div className="text-xs text-muted-foreground">Invalid</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </section>

          {/* Pricing Section */}
          <section className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Simple, Transparent Pricing</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Pay only for what you use. No hidden fees, no setup costs.
              </p>
            </div>
            
            <div className="grid gap-8 md:grid-cols-3">
              <Card className="hover:shadow-lg transition-all duration-300">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">Starter</CardTitle>
                  <div className="text-4xl font-bold text-blue-600">Free</div>
                  <p className="text-muted-foreground">For small events</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Up to 100 tickets</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Digital tickets</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Basic scanning</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Email support</span>
                    </li>
                  </ul>
                  <Button className="w-full mt-6" variant="outline">
                    Get Started
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-all duration-300 ring-2 ring-blue-500 scale-105">
                <CardHeader className="text-center">
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-600">
                    Most Popular
                  </Badge>
                  <CardTitle className="text-2xl">Professional</CardTitle>
                  <div className="text-4xl font-bold text-blue-600">2.5% + NPR 10</div>
                  <p className="text-muted-foreground">Per ticket sold</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Unlimited tickets</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Advanced management</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Multi-device scanning</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Analytics & reports</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Priority support</span>
                    </li>
                  </ul>
                  <Button className="w-full mt-6 bg-blue-600 hover:bg-blue-700">
                    Start Free Trial
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-all duration-300">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">Enterprise</CardTitle>
                  <div className="text-4xl font-bold text-blue-600">Custom</div>
                  <p className="text-muted-foreground">For large organizations</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Everything in Professional</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <span className="text-sm">White-label solution</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <span className="text-sm">API access</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Dedicated support</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Custom integrations</span>
                    </li>
                  </ul>
                  <Button className="w-full mt-6" variant="outline">
                    Contact Sales
                  </Button>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Statistics */}
          <section className="mb-20 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Trusted by Event Organizers</h2>
              <p className="text-muted-foreground">
                Join thousands of successful events powered by our platform
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-blue-600 mb-2">10K+</div>
                <div className="text-sm text-muted-foreground">Events Hosted</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-green-600 mb-2">500K+</div>
                <div className="text-sm text-muted-foreground">Tickets Sold</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-purple-600 mb-2">99.9%</div>
                <div className="text-sm text-muted-foreground">Uptime</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-orange-600 mb-2">50M+</div>
                <div className="text-sm text-muted-foreground">Revenue Processed</div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-white">
            <h2 className="text-3xl font-bold mb-4">Ready to Revolutionize Your Ticketing?</h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
              Join the future of event ticketing with our all-in-one platform. 
              Start selling, managing, and scanning tickets in minutes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-white text-blue-600 hover:bg-blue-50 text-lg py-6 px-8"
              >
                <Ticket className="mr-2 h-5 w-5" />
                Start Your Free Trial
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-blue-600 text-lg py-6 px-8"
              >
                <TrendingUp className="mr-2 h-5 w-5" />
                View Demo
              </Button>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default TicketingPage;
