
import { NavConfig } from "@/types/navigation";

export const navigationConfig: NavConfig = {
  discoverEvents: {
    title: "Discover Events",
    items: [
      {
        title: "All Events",
        href: "/events",
        description: "Explore all upcoming events",
      },
      {
        title: "Featured Events",
        href: "/events/featured",
        description: "Handpicked premium events",
      },
      {
        title: "Nearby Events",
        href: "/events/nearby",
        description: "Events happening close to you",
      },
      // The Categories item is removed as requested
    ],
  },
  forOrganizers: {
    title: "For Organizers",
    items: [
      {
        title: "Event Management",
        href: "/organizers",
        description: "Tools for organizing events",
      },
      {
        title: "Analytics",
        href: "/organizers/analytics",
        description: "Track event performance",
      },
      {
        title: "Pricing",
        href: "/organizers/pricing",
        description: "Choose the right plan for you",
      },
    ],
  },
  ticketing: {
    title: "Ticketing",
    items: [
      {
        title: "Ticket Management",
        href: "/ticketing",
        description: "Sell and manage tickets efficiently",
      },
      {
        title: "Digital Tickets",
        href: "/ticketing/digital",
        description: "Paperless ticket solutions",
      },
      {
        title: "Scanning Tools",
        href: "/ticketing/scanning",
        description: "Quick entry validation",
      },
    ],
  },
};

