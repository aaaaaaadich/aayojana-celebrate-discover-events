
export interface EventFormData {
  title: string;
  category: string;
  description: string;
  startDateTime: string;
  endDateTime: string;
  location: string;
  coordinates?: { lat: number; lng: number };
  price: string;
  availableTickets: string;
  ticketTypes: TicketType[];
  qrCodeImageUrl?: string | null;
  posterImageUrl?: string | null;
  isFeatureSelected: boolean;
  planType: 'standard' | 'premium';
  paymentStatus: 'pending' | 'completed' | 'failed';
  paymentMethod?: 'esewa' | 'khalti' | null;
}

export interface TicketType {
  id: string;
  name: string;
  price: number;
  quantity: number;
  description?: string;
}
