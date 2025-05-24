
import { Helmet } from "react-helmet";

const TicketSellPage = () => (
  <>
    <Helmet>
      <title>Sell Tickets Now | Aayojana</title>
      <meta name="description" content="Start selling tickets for your event with Aayojana." />
    </Helmet>
    <div className="container mx-auto px-4 py-20 text-center">
      <h1 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">Sell Tickets Now</h1>
      <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
        Ready to sell tickets? Get started with Aayojana’s digital ticketing platform in minutes.
      </p>
      <div className="rounded-lg border px-8 py-20 bg-background text-muted-foreground">
        Ticket-selling dashboard coming soon. For early access, contact our team!
      </div>
    </div>
  </>
);

export default TicketSellPage;
