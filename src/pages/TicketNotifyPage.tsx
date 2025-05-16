
import { Helmet } from "react-helmet";

const TicketNotifyPage = () => (
  <>
    <Helmet>
      <title>Get Notified | Ticketing | Aayojana</title>
      <meta name="description" content="Sign up to get notified about new ticketing features on Aayojana." />
    </Helmet>
    <div className="container mx-auto px-4 py-20 text-center">
      <h1 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">Get Notified</h1>
      <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
        Enter your email below to receive updates about new and advanced features for our ticketing platform!
      </p>
      <div className="rounded-lg border px-8 py-20 bg-background text-muted-foreground">
        Notification signup feature coming soon.
      </div>
    </div>
  </>
);

export default TicketNotifyPage;
