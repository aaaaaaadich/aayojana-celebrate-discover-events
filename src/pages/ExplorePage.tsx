
import { Helmet } from "react-helmet";

const ExplorePage = () => (
  <>
    <Helmet>
      <title>Explore Events | Aayojana</title>
      <meta name="description" content="Browse all events happening across Nepal on Aayojana." />
    </Helmet>
    <div className="container mx-auto px-4 py-20 text-center">
      <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">Explore Events</h1>
      <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
        Discover a variety of events happening around Nepal! Use filters to find events that interest you, or explore the latest from our community.
      </p>
      <div className="rounded-lg border px-6 py-20 bg-background text-muted-foreground">
        Explore events feature coming soon.
      </div>
    </div>
  </>
);

export default ExplorePage;
