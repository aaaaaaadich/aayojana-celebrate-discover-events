
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Phone } from "lucide-react";

const ContactPage = () => {
  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-6">Contact Us</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Have questions about Aayojana? We're here to help! Reach out to our team 
            through any of the channels below.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Information */}
          <div className="space-y-8">
            <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
            
            <div className="flex items-start space-x-4">
              <MapPin className="h-6 w-6 text-saffron-500 mt-1" />
              <div>
                <h3 className="font-bold mb-1">Visit Us</h3>
                <p className="text-muted-foreground">
                  Thamel, Kathmandu<br />
                  Nepal, 44600
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <Mail className="h-6 w-6 text-saffron-500 mt-1" />
              <div>
                <h3 className="font-bold mb-1">Email Us</h3>
                <p className="text-muted-foreground">
                  info@aayojana.com<br />
                  support@aayojana.com
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <Phone className="h-6 w-6 text-saffron-500 mt-1" />
              <div>
                <h3 className="font-bold mb-1">Call Us</h3>
                <p className="text-muted-foreground">
                  +977 1-4444444<br />
                  +977 1-5555555
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-card p-8 rounded-lg">
            <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
            <form className="space-y-6">
              <div>
                <Input placeholder="Your Name" />
              </div>
              <div>
                <Input type="email" placeholder="Your Email" />
              </div>
              <div>
                <Input placeholder="Subject" />
              </div>
              <div>
                <Textarea 
                  placeholder="Your Message" 
                  className="min-h-[150px]"
                />
              </div>
              <Button type="submit" className="w-full bg-saffron-500 hover:bg-saffron-600">
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
