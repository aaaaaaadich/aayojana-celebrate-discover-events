
export interface NavLink {
  title: string;
  href: string;
  description?: string;
}

export interface NavGroup {
  title: string;
  items: NavLink[];
}

export interface NavConfig {
  discoverEvents: NavGroup;
  forOrganizers: NavGroup;
  ticketing: NavGroup;
}
