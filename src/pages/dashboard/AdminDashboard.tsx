import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useUserRoles } from "@/hooks/useUserRoles";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Shield, 
  AlertTriangle, 
  Users, 
  Calendar, 
  Search, 
  Filter,
  Eye,
  Ban,
  CheckCircle,
  XCircle,
  UserX,
  MessageSquare,
  Flag,
  MoreHorizontal
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const AdminDashboard = () => {
  const { user } = useAuth();
  const { hasRole, loading } = useUserRoles();
  const [reportedEvents, setReportedEvents] = useState([]);
  const [reportedUsers, setReportedUsers] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  useEffect(() => {
    if (user && hasRole('admin')) {
      fetchAdminData();
    }
  }, [user, hasRole]);

  const fetchAdminData = async () => {
    try {
      // Fetch all events for moderation
      const { data: eventsData } = await supabase
        .from('events')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (eventsData) {
        // Mock reported events for demo
        const mockReportedEvents = eventsData.slice(0, 3).map((event, index) => ({
          ...event,
          reportReason: ['Inappropriate content', 'Spam', 'Misleading information'][index % 3],
          reportedBy: `user${index + 1}@example.com`,
          reportCount: Math.floor(Math.random() * 5) + 1,
        }));
        setReportedEvents(mockReportedEvents);
      }

      // Mock reported users for demo
      const mockReportedUsers = [
        {
          id: '1',
          email: 'user1@example.com',
          name: 'John Doe',
          reportCount: 3,
          reportReason: 'Spam events',
          status: 'active'
        },
        {
          id: '2',
          email: 'user2@example.com',
          name: 'Jane Smith',
          reportCount: 2,
          reportReason: 'Inappropriate behavior',
          status: 'warned'
        }
      ];
      setReportedUsers(mockReportedUsers);

      // Mock all users for user management
      const mockAllUsers = [
        {
          id: '1',
          email: 'admin@aayojana.com',
          name: 'Admin User',
          role: 'admin',
          status: 'active',
          lastLogin: '2024-01-15'
        },
        {
          id: '2',
          email: 'organizer1@example.com',
          name: 'Event Organizer',
          role: 'organizer',
          status: 'active',
          lastLogin: '2024-01-14'
        },
        {
          id: '3',
          email: 'user1@example.com',
          name: 'Regular User',
          role: 'attendee',
          status: 'suspended',
          lastLogin: '2024-01-10'
        }
      ];
      setAllUsers(mockAllUsers);
    } catch (error) {
      console.error('Error fetching admin data:', error);
    }
  };

  const handleEventAction = async (eventId: string, action: 'approve' | 'unpublish') => {
    try {
      // Update event status
      const { error } = await supabase
        .from('events')
        .update({ 
          payment_status: action === 'approve' ? 'paid' : 'rejected' 
        })
        .eq('id', eventId);

      if (!error) {
        // Remove from reported events list
        setReportedEvents(prev => prev.filter(event => event.id !== eventId));
      }
    } catch (error) {
      console.error('Error updating event:', error);
    }
  };

  const handleUserAction = (userId: string, action: 'warn' | 'suspend' | 'ban') => {
    setReportedUsers(prev => 
      prev.map(user => 
        user.id === userId 
          ? { ...user, status: action === 'warn' ? 'warned' : action }
          : user
      )
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'default';
      case 'warned': return 'secondary';
      case 'suspended': return 'destructive';
      case 'banned': return 'destructive';
      default: return 'outline';
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (!hasRole('admin')) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Card>
          <CardHeader>
            <CardTitle>Access Denied</CardTitle>
            <CardDescription>You don't have admin permissions.</CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-destructive to-primary bg-clip-text text-transparent">
            Admin Moderation Panel
          </h1>
          <p className="text-muted-foreground mt-2">
            Monitor and manage platform content and users
          </p>
        </div>
        <div className="flex items-center gap-2 mt-4 lg:mt-0">
          <Badge variant="outline" className="text-destructive border-destructive">
            <AlertTriangle className="mr-1 h-3 w-3" />
            {reportedEvents.length + reportedUsers.length} Reports Pending
          </Badge>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="hover:shadow-lg transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Reported Events</CardTitle>
            <Flag className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">{reportedEvents.length}</div>
            <p className="text-xs text-muted-foreground">Require review</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Reported Users</CardTitle>
            <UserX className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">{reportedUsers.length}</div>
            <p className="text-xs text-muted-foreground">Need attention</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{allUsers.length}</div>
            <p className="text-xs text-muted-foreground">Platform users</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Events</CardTitle>
            <Calendar className="h-4 w-4 text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">Currently live</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="reported-events" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="reported-events">Reported Events</TabsTrigger>
          <TabsTrigger value="reported-users">Reported Users</TabsTrigger>
          <TabsTrigger value="user-management">User Management</TabsTrigger>
        </TabsList>

        <TabsContent value="reported-events" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Flag className="h-5 w-5" />
                Reported Events
              </CardTitle>
              <CardDescription>Review and moderate reported events</CardDescription>
            </CardHeader>
            <CardContent>
              {reportedEvents.length === 0 ? (
                <div className="text-center py-8">
                  <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                  <p className="text-muted-foreground">No reported events pending review</p>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Event</TableHead>
                      <TableHead>Report Reason</TableHead>
                      <TableHead>Reported By</TableHead>
                      <TableHead>Reports</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {reportedEvents.map((event) => (
                      <TableRow key={event.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium">{event.title}</p>
                            <p className="text-sm text-muted-foreground">{event.location}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="destructive">{event.reportReason}</Badge>
                        </TableCell>
                        <TableCell>{event.reportedBy}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{event.reportCount}</Badge>
                        </TableCell>
                        <TableCell>{event.date}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleEventAction(event.id, 'approve')}
                            >
                              <CheckCircle className="h-4 w-4 mr-1" />
                              Approve
                            </Button>
                            <Button 
                              size="sm" 
                              variant="destructive"
                              onClick={() => handleEventAction(event.id, 'unpublish')}
                            >
                              <XCircle className="h-4 w-4 mr-1" />
                              Unpublish
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reported-users" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserX className="h-5 w-5" />
                Reported Users
              </CardTitle>
              <CardDescription>Review and moderate reported users</CardDescription>
            </CardHeader>
            <CardContent>
              {reportedUsers.length === 0 ? (
                <div className="text-center py-8">
                  <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                  <p className="text-muted-foreground">No reported users pending review</p>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Reports</TableHead>
                      <TableHead>Reason</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {reportedUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium">{user.name}</p>
                            <p className="text-sm text-muted-foreground">{user.email}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="destructive">{user.reportCount}</Badge>
                        </TableCell>
                        <TableCell>{user.reportReason}</TableCell>
                        <TableCell>
                          <Badge variant={getStatusColor(user.status)}>
                            {user.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleUserAction(user.id, 'warn')}
                            >
                              <AlertTriangle className="h-4 w-4 mr-1" />
                              Warn
                            </Button>
                            <Button 
                              size="sm" 
                              variant="secondary"
                              onClick={() => handleUserAction(user.id, 'suspend')}
                            >
                              <Ban className="h-4 w-4 mr-1" />
                              Suspend
                            </Button>
                            <Button 
                              size="sm" 
                              variant="destructive"
                              onClick={() => handleUserAction(user.id, 'ban')}
                            >
                              <UserX className="h-4 w-4 mr-1" />
                              Ban
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="user-management" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex flex-col lg:flex-row lg:items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    User Management
                  </CardTitle>
                  <CardDescription>Manage user roles and permissions</CardDescription>
                </div>
                <div className="flex gap-2 mt-4 lg:mt-0">
                  <div className="relative">
                    <Search className="h-4 w-4 absolute left-3 top-3 text-muted-foreground" />
                    <Input
                      placeholder="Search users..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-9"
                    />
                  </div>
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="warned">Warned</SelectItem>
                      <SelectItem value="suspended">Suspended</SelectItem>
                      <SelectItem value="banned">Banned</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Login</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {allUsers
                    .filter(user => 
                      filterStatus === 'all' || user.status === filterStatus
                    )
                    .filter(user =>
                      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      user.email.toLowerCase().includes(searchTerm.toLowerCase())
                    )
                    .map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium">{user.name}</p>
                            <p className="text-sm text-muted-foreground">{user.email}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{user.role}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={getStatusColor(user.status)}>
                            {user.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{user.lastLogin}</TableCell>
                        <TableCell>
                          <Button size="sm" variant="outline">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;