
import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import EventsPage from "./pages/EventsPage";
import EventDetailsPage from "./pages/EventDetailsPage";
import OrganizersPage from "./pages/OrganizersPage";
import TicketingPage from "./pages/TicketingPage";
import FeaturesPage from "./pages/FeaturesPage";
import CreateEventPage from "./pages/CreateEventPage";
import NotFoundPage from "./pages/NotFoundPage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import FeaturedEventsPage from "./pages/events/FeaturedEventsPage";
import AllEventsPage from "./pages/events/AllEventsPage";
import NearbyEventsPage from "./pages/events/NearbyEventsPage";
import CategoriesPage from "./pages/events/CategoriesPage";
import SignInPage from "./pages/auth/SignInPage";
import AuthPage from "./pages/auth/AuthPage";
import OrganizerDashboard from "./pages/dashboard/OrganizerDashboard";
import AttendeeDashboard from "./pages/dashboard/AttendeeDashboard";
import AdminDashboard from "./pages/dashboard/AdminDashboard";
import OrganizersDemoPage from "./pages/OrganizersDemoPage";
import OrganizersGettingStartedPage from "./pages/OrganizersGettingStartedPage";
import ExplorePage from "./pages/ExplorePage";
import OrganizersAnalyticsPage from "./pages/OrganizersAnalyticsPage";
import OrganizersPricingPage from "./pages/OrganizersPricingPage";

const queryClient = new QueryClient();

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    
    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);
  
  const toggleDarkMode = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    
    if (newTheme) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };
  
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <div className="min-h-screen flex flex-col">
              <Navbar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
              <main className="flex-grow pt-16">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/auth" element={<AuthPage />} />
                  <Route path="/dashboard/organizer" element={<OrganizerDashboard />} />
                  <Route path="/dashboard/attendee" element={<AttendeeDashboard />} />
                  <Route path="/dashboard/admin" element={<AdminDashboard />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="/events" element={<EventsPage />} />
                  <Route path="/events/:id" element={<EventDetailsPage />} />
                  <Route path="/events/all" element={<AllEventsPage />} />
                  <Route path="/events/featured" element={<FeaturedEventsPage />} />
                  <Route path="/events/nearby" element={<NearbyEventsPage />} />
                  <Route path="/events/categories" element={<CategoriesPage />} />
                  <Route path="/organizers" element={<OrganizersPage />} />
                  <Route path="/organizers/demo" element={<OrganizersDemoPage />} />
                  <Route path="/organizers/getting-started" element={<OrganizersGettingStartedPage />} />
                  <Route path="/ticketing" element={<TicketingPage />} />
                  <Route path="/features" element={<FeaturesPage />} />
                  <Route path="/create-event" element={<CreateEventPage />} />
                  <Route path="/sign-in" element={<SignInPage />} />
                  <Route path="/explore" element={<ExplorePage />} />
                  <Route path="/organizers/analytics" element={<OrganizersAnalyticsPage />} />
                  <Route path="/organizers/pricing" element={<OrganizersPricingPage />} />
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
