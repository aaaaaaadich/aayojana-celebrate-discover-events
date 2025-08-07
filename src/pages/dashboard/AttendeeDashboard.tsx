
import { useAuth } from "@/contexts/AuthContext";
import { useUserRoles } from "@/hooks/useUserRoles";
import { useEventAttendance } from "@/hooks/useEventAttendance";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Ticket, Heart, Clock, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const AttendeeDashboard = () => {
  const { user } = useAuth();
  const { hasRole, loading } = useUserRoles();
  const { attendances, loading: attendanceLoading, getAttendanceStats } = useEventAttendance();

  if (loading || attendanceLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (!hasRole('attendee')) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Card>
          <CardHeader>
            <CardTitle>Access Denied</CardTitle>
            <CardDescription>You don't have attendee permissions.</CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          My Events Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Discover amazing events and manage your bookings.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Events</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{getAttendanceStats().upcomingEvents}</div>
            <p className="text-xs text-muted-foreground">
              Events you're registered for
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Events</CardTitle>
            <Ticket className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{getAttendanceStats().totalEvents}</div>
            <p className="text-xs text-muted-foreground">
              Events you've registered for
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Attended Events</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{getAttendanceStats().attendedEvents}</div>
            <p className="text-xs text-muted-foreground">
              Events you've attended
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Favorites</CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">
              Events you've favorited
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Discover Events</CardTitle>
            <CardDescription>Find events that match your interests</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button asChild className="w-full justify-start">
              <Link to="/events/all">
                <Calendar className="mr-2 h-4 w-4" />
                Browse All Events
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full justify-start">
              <Link to="/events/nearby">
                <MapPin className="mr-2 h-4 w-4" />
                Events Near Me
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Your Event History</CardTitle>
            <CardDescription>Events you've registered for</CardDescription>
          </CardHeader>
          <CardContent>
            {attendances.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">
                No events found. Start by browsing events!
              </p>
            ) : (
              <div className="space-y-4">
                {attendances.slice(0, 5).map((attendance) => (
                  <div key={attendance.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-medium">{attendance.event?.title}</h4>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {attendance.event?.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {attendance.event?.time}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {attendance.event?.location}
                        </span>
                      </div>
                    </div>
                    <Badge 
                      variant={attendance.attendance_status === 'attended' ? 'default' : 'secondary'}
                      className="ml-2"
                    >
                      {attendance.attendance_status}
                    </Badge>
                  </div>
                ))}
                {attendances.length > 5 && (
                  <Button variant="outline" className="w-full">
                    View All ({attendances.length} total)
                  </Button>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AttendeeDashboard;
