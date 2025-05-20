
import { Helmet } from "react-helmet";
import NewsletterForm from "@/components/NewsletterForm";

const TicketNotifyPage = () => (
  <>
    <Helmet>
      <title>Get Notified | Ticketing | Aayojana</title>
      <meta name="description" content="Sign up to get notified about new ticketing features on Aayojana." />
    </Helmet>
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="w-full max-w-xl px-4 py-10">
        <div className="rounded-2xl border border-muted bg-background shadow-lg px-8 py-12 mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
            Get Notified
          </h1>
          <p className="text-lg text-muted-foreground mb-6 max-w-lg mx-auto">
            Enter your email to receive updates about new and advanced features for our ticketing platform!
          </p>
          <div className="border-t border-muted my-6" />
          <h2 className="text-xl font-semibold mb-4 text-foreground">Stay in the loop</h2>
          <p className="mb-8 text-base text-muted-foreground">
            Be the first to know about major improvements, new features, and get early access to ticketing tools!
          </p>
          <div className="max-w-md mx-auto">
            <NewsletterForm />
          </div>
        </div>
      </div>
    </div>
  </>
);

export default TicketNotifyPage;

