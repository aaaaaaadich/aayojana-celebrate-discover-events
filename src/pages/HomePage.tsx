
import HeroSection from "@/components/sections/HeroSection";
import FeaturedEventsSection from "@/components/sections/FeaturedEventsSection";
import FeaturesSection from "@/components/sections/FeaturesSection";
import StatsSection from "@/components/sections/StatsSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import NewsletterSection from "@/components/sections/NewsletterSection";
import CallToActionSection from "@/components/sections/CallToActionSection";
import { Helmet } from "react-helmet";

const HomePage = () => {
  return (
    <>
      <Helmet>
        <title>Aayojana - Nepal's Smart Digital Event Platform</title>
        <meta name="description" content="Organize, Discover & Celebrate events in Nepal - All in One Place with Aayojana, Nepal's first smart digital event platform" />
      </Helmet>
      
      <HeroSection />
      <FeaturedEventsSection />
      <FeaturesSection />
      <StatsSection />
      <TestimonialsSection />
      <NewsletterSection />
      <CallToActionSection />
    </>
  );
};

export default HomePage;
