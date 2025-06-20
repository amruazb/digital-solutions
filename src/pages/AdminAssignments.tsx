
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  UserPlus, 
  Search, 
  Filter, 
  Users, 
  Clock, 
  CheckCircle,
  AlertCircle,
  Calendar
} from 'lucide-react';

// Mock data for enquiries
const mockEnquiries = [
  {
    id: '1',
    service: 'Driving License - Golden Chance',
    customerName: 'Ahmed Al Mansouri',
    email: 'ahmed@email.com',
    phone: '+971501234567',
    submissionDate: '2024-06-14',
    status: 'new',
    assignedTo: null,
    priority: 'high'
  },
  {
    id: '2',
    service: 'Emirates ID Renewal',
    customerName: 'Fatima Al Zahra',
    email: 'fatima@email.com',
    phone: '+971552345678',
    submissionDate: '2024-06-13',
    status: 'in-progress',
    assignedTo: 'Ahmed Hassan',
    priority: 'medium'
  },
  {
    id: '3',
    service: 'Visa Application',
    customerName: 'Mohammed Ali',
    email: 'mohammed@email.com',
    phone: '+971509876543',
    submissionDate: '2024-06-12',
    status: 'new',
    assignedTo: null,
    priority: 'low'
  }
];

// Mock staff data
const mockStaff = [
  {
    id: '1',
    name: 'Ahmed Hassan',
    role: 'Senior Typist',
    department: 'Immigration',
    status: 'active',
    currentTasks: 3
  },
  {
    id: '2',
    name: 'Fatima Al Zahra',
    role: 'Document Specialist',
    department: 'Business',
    status: 'active',
    currentTasks: 2
  },
  {
    id: '3',
    name: 'Mohammed Ali',
    role: 'Junior Typist',
    department: 'Transportation',
    status: 'active',
    currentTasks: 1
  }
];

const AdminAssignments = () => {
  const navigate = useNavigate();
  const [enquiries, setEnquiries] = useState(mockEnquiries);
  const [staff, setStaff] = useState(mockStaff);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);

  useEffect(() => {
    const adminSession = localStorage.getItem('adminSession');
    if (!adminSession) {
      navigate('/admin/login');
    }
  }, [navigate]);

  const getStatusBadge = (status) => {
    const statusConfig = {
      new: { label: 'New', className: 'bg-blue-100 text-blue-800' },
      'in-progress': { label: 'In Progress', className: 'bg-yellow-100 text-yellow-800' },
      completed: { label: 'Completed', className: 'bg-green-100 text-green-800' },
    };

    const config = statusConfig[status] || statusConfig.new;
    return (
      <Badge className={config.className}>
        {config.label}
      </Badge>
    );
  };

  const getPriorityBadge = (priority) => {
    const priorityConfig = {
      high: { label: 'High', className: 'bg-red-100 text-red-800' },
      medium: { label: 'Medium', className: 'bg-orange-100 text-orange-800' },
      low: { label: 'Low', className: 'bg-gray-100 text-gray-800' },
    };

    const config = priorityConfig[priority] || priorityConfig.medium;
    return (
      <Badge variant="outline" className={config.className}>
        {config.label}
      </Badge>
    );
  };

  const filteredEnquiries = enquiries.filter(enquiry => {
    const matchesSearch = 
      enquiry.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      enquiry.service.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || enquiry.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleAssignWork = (staffId) => {
    if (selectedEnquiry) {
      const staffMember = staff.find(s => s.id === staffId);
      
      // Update enquiry assignment
      setEnquiries(prev => 
        prev.map(enquiry => 
          enquiry.id === selectedEnquiry.id 
            ? { ...enquiry, assignedTo: staffMember.name, status: 'in-progress' }
            : enquiry
        )
      );

      // Update staff task count
      setStaff(prev => 
        prev.map(member => 
          member.id === staffId 
            ? { ...member, currentTasks: member.currentTasks + 1 }
            : member
        )
      );

      setIsAssignModalOpen(false);
      setSelectedEnquiry(null);
    }
  };

  const unassignedCount = enquiries.filter(e => !e.assignedTo).length;
  const inProgressCount = enquiries.filter(e => e.status === 'in-progress').length;
  const highPriorityCount = enquiries.filter(e => e.priority === 'high').length;

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <AdminSidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Work Assignments</h1>
              <p className="text-gray-600 mt-1">Assign enquiries to staff members and manage workload distribution.</p>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Unassigned</CardTitle>
                  <AlertCircle className="h-4 w-4 text-orange-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-orange-600">{unassignedCount}</div>
                  <p className="text-xs text-muted-foreground">Awaiting assignment</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">In Progress</CardTitle>
                  <Clock className="h-4 w-4 text-blue-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-600">{inProgressCount}</div>
                  <p className="text-xs text-muted-foreground">Currently assigned</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">High Priority</CardTitle>
                  <AlertCircle className="h-4 w-4 text-red-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-red-600">{highPriorityCount}</div>
                  <p className="text-xs text-muted-foreground">Urgent tasks</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Staff</CardTitle>
                  <Users className="h-4 w-4 text-green-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">{staff.filter(s => s.status === 'active').length}</div>
                  <p className="text-xs text-muted-foreground">Available for work</p>
                </CardContent>
              </Card>
            </div>

            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search by customer name or service..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-auto">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Enquiries Table */}
            <Card>
              <CardHeader>
                <CardTitle>Enquiries & Assignments</CardTitle>
                <CardDescription>
                  Manage work assignments and track progress of enquiries.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Customer & Service</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead>Priority</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Assigned To</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredEnquiries.map((enquiry) => (
                      <TableRow key={enquiry.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{enquiry.customerName}</div>
                            <div className="text-sm text-gray-500">{enquiry.service}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <div>{enquiry.email}</div>
                            <div className="text-gray-500">{enquiry.phone}</div>
                          </div>
                        </TableCell>
                        <TableCell>{getPriorityBadge(enquiry.priority)}</TableCell>
                        <TableCell>{getStatusBadge(enquiry.status)}</TableCell>
                        <TableCell>
                          {enquiry.assignedTo ? (
                            <Badge variant="outline" className="bg-green-50 text-green-700">
                              {enquiry.assignedTo}
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="bg-gray-50 text-gray-500">
                              Unassigned
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center text-sm">
                            <Calendar className="h-3 w-3 mr-1" />
                            {enquiry.submissionDate}
                          </div>
                        </TableCell>
                        <TableCell>
                          {!enquiry.assignedTo && (
                            <Button
                              size="sm"
                              onClick={() => {
                                setSelectedEnquiry(enquiry);
                                setIsAssignModalOpen(true);
                              }}
                            >
                              <UserPlus className="h-4 w-4 mr-1" />
                              Assign
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Assignment Modal */}
            <Dialog open={isAssignModalOpen} onOpenChange={setIsAssignModalOpen}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Assign Work</DialogTitle>
                  <DialogDescription>
                    Choose a staff member to assign this enquiry to.
                  </DialogDescription>
                </DialogHeader>
                
                {selectedEnquiry && (
                  <div className="space-y-4 py-4">
                    <div className="border rounded-lg p-4 bg-gray-50">
                      <h4 className="font-medium">{selectedEnquiry.customerName}</h4>
                      <p className="text-sm text-gray-600">{selectedEnquiry.service}</p>
                      <div className="flex gap-2 mt-2">
                        {getStatusBadge(selectedEnquiry.status)}
                        {getPriorityBadge(selectedEnquiry.priority)}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-medium">Available Staff Members:</h4>
                      {staff.filter(s => s.status === 'active').map((member) => (
                        <div key={member.id} className="flex items-center justify-between p-3 border rounded-lg">
                          <div>
                            <div className="font-medium">{member.name}</div>
                            <div className="text-sm text-gray-500">{member.role} • {member.department}</div>
                            <div className="text-xs text-gray-400">Current tasks: {member.currentTasks}</div>
                          </div>
                          <Button 
                            onClick={() => handleAssignWork(member.id)}
                            size="sm"
                            className="bg-blue-600 hover:bg-blue-700"
                          >
                            Assign
                          </Button>
                        </div>
                      ))}
                    </div>

                    <div className="flex gap-2 pt-4">
                      <Button 
                        onClick={() => setIsAssignModalOpen(false)} 
                        variant="outline" 
                        className="flex-1"
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                )}
              </DialogContent>
            </Dialog>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminAssignments;
