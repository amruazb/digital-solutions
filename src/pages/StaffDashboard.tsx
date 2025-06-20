
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { 
  CheckCircle, 
  Clock, 
  FileText, 
  User, 
  LogOut, 
  Calendar,
  AlertCircle,
  Eye,
  MessageSquare
} from 'lucide-react';

// Mock data for staff assignments
const mockAssignments = [
  {
    id: '1',
    clientName: 'Ahmed Al Mansouri',
    service: 'Driving License - Golden Chance',
    priority: 'high',
    status: 'assigned',
    assignedDate: '2024-06-15',
    dueDate: '2024-06-20',
    description: 'Process driving license application with golden chance scheme',
    estimatedTime: '3-4 hours'
  },
  {
    id: '2',
    clientName: 'Fatima Hassan',
    service: 'Family Visa Typing',
    priority: 'medium',
    status: 'in-progress',
    assignedDate: '2024-06-14',
    dueDate: '2024-06-18',
    description: 'Complete family visa documentation and typing',
    estimatedTime: '2-3 hours'
  },
  {
    id: '3',
    clientName: 'Mohammed Rahman',
    service: 'Emirates ID Renewal',
    priority: 'low',
    status: 'completed',
    assignedDate: '2024-06-12',
    dueDate: '2024-06-16',
    completedDate: '2024-06-15',
    description: 'Emirates ID renewal process completed',
    estimatedTime: '1-2 hours'
  }
];

// Mock enquiries that staff can accept
const mockAvailableEnquiries = [
  {
    id: '4',
    clientName: 'Sarah Johnson',
    service: 'Trade License Assistance',
    submissionDate: '2024-06-16',
    urgency: 'medium',
    description: 'New trade license application for consulting business'
  },
  {
    id: '5',
    clientName: 'Omar Ali',
    service: 'Visa Status Check',
    submissionDate: '2024-06-16',
    urgency: 'high',
    description: 'Urgent visa status verification required'
  }
];

const StaffDashboard = () => {
  const navigate = useNavigate();
  const [staffData, setStaffData] = useState<any>(null);
  const [assignments, setAssignments] = useState(mockAssignments);
  const [availableEnquiries, setAvailableEnquiries] = useState(mockAvailableEnquiries);

  useEffect(() => {
    const session = localStorage.getItem('staffSession');
    if (!session) {
      navigate('/staff/login');
    } else {
      setStaffData(JSON.parse(session));
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('staffSession');
    toast.success('Logged out successfully');
    navigate('/');
  };

  const handleStatusUpdate = (assignmentId: string, newStatus: string) => {
    setAssignments(assignments.map(assignment => 
      assignment.id === assignmentId 
        ? { ...assignment, status: newStatus, ...(newStatus === 'completed' && { completedDate: new Date().toISOString().split('T')[0] }) }
        : assignment
    ));
    toast.success(`Assignment status updated to ${newStatus}`);
  };

  const handleAcceptEnquiry = (enquiryId: string) => {
    const enquiry = availableEnquiries.find(e => e.id === enquiryId);
    if (enquiry) {
      const newAssignment = {
        id: enquiryId,
        clientName: enquiry.clientName,
        service: enquiry.service,
        priority: enquiry.urgency,
        status: 'assigned',
        assignedDate: new Date().toISOString().split('T')[0],
        dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        description: enquiry.description,
        estimatedTime: '2-3 hours'
      };
      setAssignments([...assignments, newAssignment]);
      setAvailableEnquiries(availableEnquiries.filter(e => e.id !== enquiryId));
      toast.success('Enquiry accepted and added to your assignments');
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      'assigned': 'bg-blue-100 text-blue-800',
      'in-progress': 'bg-yellow-100 text-yellow-800',
      'completed': 'bg-green-100 text-green-800'
    };
    return variants[status as keyof typeof variants] || 'bg-gray-100 text-gray-800';
  };

  const getPriorityBadge = (priority: string) => {
    const variants = {
      'high': 'bg-red-100 text-red-800',
      'medium': 'bg-yellow-100 text-yellow-800',
      'low': 'bg-green-100 text-green-800'
    };
    return variants[priority as keyof typeof variants] || 'bg-gray-100 text-gray-800';
  };

  const stats = {
    total: assignments.length,
    assigned: assignments.filter(a => a.status === 'assigned').length,
    inProgress: assignments.filter(a => a.status === 'in-progress').length,
    completed: assignments.filter(a => a.status === 'completed').length
  };

  if (!staffData) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <User className="h-8 w-8 text-blue-600 mr-3" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">Staff Dashboard</h1>
                <p className="text-sm text-gray-600">Welcome, {staffData.name}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="px-3 py-1">
                {staffData.role} - {staffData.department}
              </Badge>
              <Button variant="ghost" onClick={handleLogout} className="text-red-600 hover:text-red-700">
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Tasks</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
              <p className="text-xs text-muted-foreground">All assignments</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Assigned</CardTitle>
              <AlertCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{stats.assigned}</div>
              <p className="text-xs text-muted-foreground">Pending start</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">In Progress</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{stats.inProgress}</div>
              <p className="text-xs text-muted-foreground">Currently working</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
              <p className="text-xs text-muted-foreground">Finished tasks</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="assignments" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="assignments">My Assignments</TabsTrigger>
            <TabsTrigger value="available">Available Enquiries</TabsTrigger>
          </TabsList>

          <TabsContent value="assignments">
            <Card>
              <CardHeader>
                <CardTitle>My Assignments</CardTitle>
                <CardDescription>
                  Manage your assigned tasks and update their status
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Client & Service</TableHead>
                      <TableHead>Priority</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Due Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {assignments.map((assignment) => (
                      <TableRow key={assignment.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{assignment.clientName}</div>
                            <div className="text-sm text-gray-500">{assignment.service}</div>
                            <div className="text-xs text-gray-400 mt-1">{assignment.description}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getPriorityBadge(assignment.priority)}>
                            {assignment.priority}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusBadge(assignment.status)}>
                            {assignment.status.replace('-', ' ')}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <div>{assignment.dueDate}</div>
                            {assignment.completedDate && (
                              <div className="text-green-600 text-xs">
                                Completed: {assignment.completedDate}
                              </div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Select
                              value={assignment.status}
                              onValueChange={(value) => handleStatusUpdate(assignment.id, value)}
                            >
                              <SelectTrigger className="w-32">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="assigned">Assigned</SelectItem>
                                <SelectItem value="in-progress">In Progress</SelectItem>
                                <SelectItem value="completed">Completed</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="available">
            <Card>
              <CardHeader>
                <CardTitle>Available Enquiries</CardTitle>
                <CardDescription>
                  New enquiries that you can accept and work on
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {availableEnquiries.map((enquiry) => (
                    <div key={enquiry.id} className="border rounded-lg p-4 hover:shadow-sm transition-shadow">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-medium">{enquiry.clientName}</h3>
                            <Badge className={getPriorityBadge(enquiry.urgency)}>
                              {enquiry.urgency} priority
                            </Badge>
                          </div>
                          <p className="text-sm font-medium text-blue-600 mb-1">{enquiry.service}</p>
                          <p className="text-sm text-gray-600 mb-2">{enquiry.description}</p>
                          <div className="flex items-center text-xs text-gray-500">
                            <Calendar className="h-3 w-3 mr-1" />
                            Submitted: {enquiry.submissionDate}
                          </div>
                        </div>
                        <div className="flex gap-2 ml-4">
                          <Button variant="outline" size="sm">
                            <MessageSquare className="h-4 w-4 mr-1" />
                            Details
                          </Button>
                          <Button 
                            size="sm"
                            onClick={() => handleAcceptEnquiry(enquiry.id)}
                            className="bg-blue-600 hover:bg-blue-700"
                          >
                            Accept Task
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default StaffDashboard;
