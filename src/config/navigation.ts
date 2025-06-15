
import { NavConfig } from "@/types/navigation";

export const navigationConfig: NavConfig = {
  discoverEvents: {
    title: "Discover Events",
    items: [
      {
        title: "All Events",
        href: "/events/all",
        description: "Browse all events including featured and regular",
      },
      {
        title: "Nearby Events",
        href: "/events/nearby",
        description: "Events happening close to you",
      },
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
        title: "Complete Solution",
        href: "/ticketing",
        description: "All-in-one ticketing platform with management, scanning, and digital tickets",
      },
    ],
  },
};
