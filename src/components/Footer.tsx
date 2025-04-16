
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-nepali-500 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-saffron-500">Aayojana</h3>
            <p className="mb-4 text-gray-300">
              Nepal's first smart digital event platform that brings together organizers 
              and attendees in one seamless experience.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-saffron-500 transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-saffron-500 transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-saffron-500 transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-saffron-500 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-saffron-500">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-saffron-500 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/events" className="hover:text-saffron-500 transition-colors">
                  Discover Events
                </Link>
              </li>
              <li>
                <Link to="/organizers" className="hover:text-saffron-500 transition-colors">
                  For Organizers
                </Link>
              </li>
              <li>
                <Link to="/ticketing" className="hover:text-saffron-500 transition-colors">
                  Ticketing Solutions
                </Link>
              </li>
              <li>
                <Link to="/features" className="hover:text-saffron-500 transition-colors">
                  Features
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Resources */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-saffron-500">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/blog" className="hover:text-saffron-500 transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/help" className="hover:text-saffron-500 transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-saffron-500 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-saffron-500 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-saffron-500 transition-colors">
                  About Us
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-saffron-500">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <MapPin size={18} className="text-saffron-500" />
                <span>Thamel, Kathmandu, Nepal</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={18} className="text-saffron-500" />
                <a href="mailto:info@aayojana.com" className="hover:text-saffron-500 transition-colors">
                  info@aayojana.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={18} className="text-saffron-500" />
                <a href="tel:+9771234567" className="hover:text-saffron-500 transition-colors">
                  +977 1234567
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; {currentYear} Aayojana. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
