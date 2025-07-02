
import { Helmet } from "react-helmet";
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

const OrganizersAnalyticsPage = () => {
  const { user } = useAuth();
  const [analyticsData, setAnalyticsData] = useState({
    totalEvents: 0,
    totalViews: 0,
    totalRegistrations: 0,
    monthlyEvents: [],
    categoryData: [],
    recentEvents: []
  });

  useEffect(() => {
    fetchAnalyticsData();
  }, [user]);

  const fetchAnalyticsData = async () => {
    if (!user) return;

    try {
      // Fetch events created by this organizer
      const { data: events, error } = await supabase
        .from('events')
        .select('*')
        .eq('organizer_id', user.id);

      if (error) throw error;

      // Process data for charts
      const categoryCount = events?.reduce((acc: any, event: any) => {
        acc[event.category] = (acc[event.category] || 0) + 1;
        return acc;
      }, {}) || {};

      const categoryData = Object.entries(categoryCount).map(([name, value]) => ({
        name,
        value
      }));

      // Mock monthly data (you can replace with actual analytics)
      const monthlyEvents = [
        { month: 'Jan', events: events?.filter((e: any) => new Date(e.created_at).getMonth() === 0).length || 0 },
        { month: 'Feb', events: events?.filter((e: any) => new Date(e.created_at).getMonth() === 1).length || 0 },
        { month: 'Mar', events: events?.filter((e: any) => new Date(e.created_at).getMonth() === 2).length || 0 },
        { month: 'Apr', events: events?.filter((e: any) => new Date(e.created_at).getMonth() === 3).length || 0 },
        { month: 'May', events: events?.filter((e: any) => new Date(e.created_at).getMonth() === 4).length || 0 },
        { month: 'Jun', events: events?.filter((e: any) => new Date(e.created_at).getMonth() === 5).length || 0 },
      ];

      setAnalyticsData({
        totalEvents: events?.length || 0,
        totalViews: Math.floor(Math.random() * 1000) + 100, // Mock data
        totalRegistrations: Math.floor(Math.random() * 500) + 50, // Mock data
        monthlyEvents,
        categoryData,
        recentEvents: events?.slice(0, 5) || []
      });
    } catch (error) {
      console.error('Error fetching analytics:', error);
    }
  };

  return (
    <>
      <Helmet>
        <title>Analytics | For Organizers | Aayojana</title>
        <meta name="description" content="Insights, data and analytics dashboard for Aayojana event organizers." />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
            Event Analytics Dashboard
          </h1>
          <p className="mb-8 text-muted-foreground text-lg">
            Track your event performance, audience engagement, and growth metrics.
          </p>

          {/* Key Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Events</CardTitle>
                <div className="h-4 w-4 text-muted-foreground">📅</div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{analyticsData.totalEvents}</div>
                <p className="text-xs text-muted-foreground">Events created</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Views</CardTitle>
                <div className="h-4 w-4 text-muted-foreground">👁️</div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{analyticsData.totalViews}</div>
                <p className="text-xs text-muted-foreground">Event page views</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Registrations</CardTitle>
                <div className="h-4 w-4 text-muted-foreground">✅</div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{analyticsData.totalRegistrations}</div>
                <p className="text-xs text-muted-foreground">Total registrations</p>
              </CardContent>
            </Card>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Events Created</CardTitle>
                <CardDescription>Track your event creation over time</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    events: {
                      label: "Events",
                      color: "hsl(var(--chart-1))",
                    },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={analyticsData.monthlyEvents}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Line type="monotone" dataKey="events" stroke="var(--color-events)" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Events by Category</CardTitle>
                <CardDescription>Distribution of your events across categories</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    value: {
                      label: "Events",
                      color: "hsl(var(--chart-1))",
                    },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={analyticsData.categoryData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {analyticsData.categoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <ChartTooltip content={<ChartTooltipContent />} />
                    </PieChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>

          {/* Recent Events Table */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Events</CardTitle>
              <CardDescription>Your latest created events</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analyticsData.recentEvents.length > 0 ? (
                  analyticsData.recentEvents.map((event: any) => (
                    <div key={event.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h3 className="font-semibold">{event.title}</h3>
                        <p className="text-sm text-muted-foreground">{event.category} • {event.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">NPR {event.price}</p>
                        <p className="text-sm text-muted-foreground">{event.location}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-muted-foreground py-8">
                    No events created yet. <a href="/create-event" className="text-blue-500 hover:underline">Create your first event</a>
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default OrganizersAnalyticsPage;
