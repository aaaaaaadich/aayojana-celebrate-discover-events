
import { Helmet } from "react-helmet";

const TicketLearnPage = () => (
  <>
    <Helmet>
      <title>Learn More | Ticketing | Aayojana</title>
      <meta name="description" content="Learn more about digital ticketing with Aayojana." />
    </Helmet>
    <div className="container mx-auto px-4 py-20 text-center">
      <h1 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">Learn More</h1>
      <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
        Want to know how Aayojana transforms event ticketing? Explore features, FAQs and guides here.
      </p>
      <div className="rounded-lg border px-8 py-20 bg-background text-muted-foreground">
        More information and resources about our ticketing platform coming soon.
      </div>
    </div>
  </>
);

export default TicketLearnPage;
