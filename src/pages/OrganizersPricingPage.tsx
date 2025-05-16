
import { Helmet } from "react-helmet";

const OrganizersPricingPage = () => (
  <>
    <Helmet>
      <title>Pricing | For Organizers | Aayojana</title>
      <meta name="description" content="Transparent and flexible pricing plans for event organizers on Aayojana." />
    </Helmet>
    <div className="container mx-auto px-4 py-20">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">Organizer Pricing Plans</h1>
        <p className="mb-8 text-muted-foreground text-lg">
          Simple and flexible pricing. Choose the plan that fits your needs!
        </p>
        <div className="flex flex-col md:flex-row justify-center gap-8">
          <div className="border rounded-lg p-8 flex-1 bg-background">
            <div className="text-xl font-bold mb-3">Starter</div>
            <div className="text-3xl font-extrabold mb-2">Free</div>
            <ul className="mb-4 text-muted-foreground space-y-2 list-disc pl-5 text-left">
              <li>Up to 1 event per month</li>
              <li>Email support</li>
              <li>Access to basic ticketing</li>
            </ul>
          </div>
          <div className="border-2 border-blue-600 rounded-lg p-8 flex-1 bg-background shadow-xl">
            <div className="text-xl font-bold mb-3 text-blue-700">Professional</div>
            <div className="text-3xl font-extrabold mb-2 text-blue-700">NPR 1,000/mo</div>
            <ul className="mb-4 text-muted-foreground space-y-2 list-disc pl-5 text-left">
              <li>Unlimited events</li>
              <li>Advanced analytics</li>
              <li>Priority customer support</li>
              <li>Team collaboration tools</li>
            </ul>
          </div>
        </div>
        <div className="pt-6 font-medium text-blue-500">Custom plans available on request. <br />Contact sales for more info!</div>
      </div>
    </div>
  </>
);

export default OrganizersPricingPage;
