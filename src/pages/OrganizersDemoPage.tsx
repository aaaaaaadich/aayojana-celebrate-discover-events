
import { Helmet } from "react-helmet";

const OrganizersDemoPage = () => (
  <>
    <Helmet>
      <title>Organizer Demo | Aayojana</title>
      <meta name="description" content="Demo for event organizers in Nepal" />
    </Helmet>
    <div className="container mx-auto px-4 py-20">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">Organizer Platform Demo</h1>
        <p className="text-lg text-muted-foreground mb-8">Explore how to organize, manage, and grow your events on Aayojana. Coming soon: interactive demo and video walkthrough!</p>
        <div className="rounded-lg border px-6 py-20 bg-background text-muted-foreground">
          Demo experience coming soon. Stay tuned!
        </div>
      </div>
    </div>
  </>
);

export default OrganizersDemoPage;
