
import { Helmet } from "react-helmet";

const OrganizersAnalyticsPage = () => (
  <>
    <Helmet>
      <title>Analytics | For Organizers | Aayojana</title>
      <meta name="description" content="Insights, data and analytics dashboard for Aayojana event organizers." />
    </Helmet>
    <div className="container mx-auto px-4 py-20">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">Event Analytics</h1>
        <p className="mb-8 text-muted-foreground text-lg">
          Track ticket sales, attendee registrations, engagement, revenue, and more for your events.
        </p>
        <div className="rounded-lg border px-8 py-10 bg-background text-base text-left text-muted-foreground">
          <ul className="list-disc pl-6 space-y-3">
            <li>📈 Ticket sales and trends (Coming soon!)</li>
            <li>👥 Attendee demographics</li>
            <li>💵 Revenue analytics</li>
            <li>🎉 Event performance metrics</li>
            <li>📅 Real-time and historical reports</li>
          </ul>
          <div className="mt-6 font-medium text-center text-blue-500">More analytics dashboards coming soon.</div>
        </div>
      </div>
    </div>
  </>
);

export default OrganizersAnalyticsPage;
