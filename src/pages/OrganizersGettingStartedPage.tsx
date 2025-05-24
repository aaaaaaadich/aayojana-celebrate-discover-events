
import { Helmet } from "react-helmet";

const OrganizersGettingStartedPage = () => (
  <>
    <Helmet>
      <title>Getting Started | Organizers | Aayojana</title>
      <meta name="description" content="Get started with paid plans for event organizers on Aayojana" />
    </Helmet>
    <div className="container mx-auto px-4 py-20">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">Getting Started</h1>
        <p className="mb-8 text-muted-foreground text-lg">
          Thank you for choosing a paid plan! Our team will guide you to payment and onboarding. For now, please contact sales for a custom plan or proceed with a free trial.
        </p>
        <div className="rounded-lg border px-8 py-10 bg-background text-base text-left">
          <strong>What happens next?</strong>
          <ul className="list-disc pl-5 mt-3 space-y-2">
            <li>We'll soon connect you to secure payment (integration coming soon!).</li>
            <li>You'll unlock access to advanced organizer features.</li>
            <li>Need help? <a href="/contact" className="text-blue-700 underline">Contact Sales</a></li>
          </ul>
        </div>
      </div>
    </div>
  </>
);

export default OrganizersGettingStartedPage;
