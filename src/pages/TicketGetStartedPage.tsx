
import { Helmet } from "react-helmet";

const TicketGetStartedPage = () => (
  <>
    <Helmet>
      <title>Get Started | Ticketing | Aayojana</title>
      <meta name="description" content="Start using Aayojana's ticket management system." />
    </Helmet>
    <div className="container mx-auto px-4 py-20 text-center">
      <h1 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">Get Started</h1>
      <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
        Join other organizers and simplify your event ticketing process with Aayojana!
      </p>
      <div className="rounded-lg border px-8 py-20 bg-background text-muted-foreground">
        Getting started guide coming soon.
      </div>
    </div>
  </>
);

export default TicketGetStartedPage;
