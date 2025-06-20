
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Edit, Trash2, Users, UserCheck, Clock, Mail, Phone } from 'lucide-react';

// Mock staff data
const mockStaff = [
  {
    id: '1',
    name: 'Ahmed Hassan',
    email: 'ahmed@interacttyping.ae',
    phone: '+971501234567',
    role: 'Senior Typist',
    department: 'Immigration',
    status: 'active',
    assignedTasks: 12,
    completedTasks: 45,
    joinDate: '2023-01-15'
  },
  {
    id: '2',
    name: 'Fatima Al Zahra',
    email: 'fatima@interacttyping.ae',
    phone: '+971552345678',
    role: 'Document Specialist',
    department: 'Business',
    status: 'active',
    assignedTasks: 8,
    completedTasks: 32,
    joinDate: '2023-03-20'
  },
  {
    id: '3',
    name: 'Mohammed Ali',
    email: 'mohammed@interacttyping.ae',
    phone: '+971509876543',
    role: 'Junior Typist',
    department: 'Transportation',
    status: 'active',
    assignedTasks: 6,
    completedTasks: 18,
    joinDate: '2023-08-10'
  },
  {
    id: '4',
    name: 'Sarah Johnson',
    email: 'sarah@interacttyping.ae',
    phone: '+971567890123',
    role: 'Translation Specialist',
    department: 'Documentation',
    status: 'on-leave',
    assignedTasks: 0,
    completedTasks: 28,
    joinDate: '2023-02-28'
  }
];

const AdminStaff = () => {
  const navigate = useNavigate();
  const [staff, setStaff] = useState(mockStaff);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newStaff, setNewStaff] = useState({
    name: '',
    email: '',
    phone: '',
    role: '',
    department: ''
  });

  React.useEffect(() => {
    const adminSession = localStorage.getItem('adminSession');
    if (!adminSession) {
      navigate('/admin/login');
    }
  }, [navigate]);

  const handleAddStaff = () => {
    // TODO: Add staff to backend
    const staffMember = {
      id: Date.now().toString(),
      ...newStaff,
      status: 'active',
      assignedTasks: 0,
      completedTasks: 0,
      joinDate: new Date().toISOString().split('T')[0]
    };
    setStaff([...staff, staffMember]);
    setNewStaff({ name: '', email: '', phone: '', role: '', department: '' });
    setIsAddModalOpen(false);
  };

  const handleStatusChange = (staffId: string, newStatus: string) => {
    setStaff(staff.map(member => 
      member.id === staffId 
        ? { ...member, status: newStatus }
        : member
    ));
  };

  const handleDeleteStaff = (staffId: string) => {
    setStaff(staff.filter(member => member.id !== staffId));
  };

  const stats = {
    total: staff.length,
    active: staff.filter(s => s.status === 'active').length,
    onLeave: staff.filter(s => s.status === 'on-leave').length,
    totalTasks: staff.reduce((sum, member) => sum + member.assignedTasks, 0)
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <AdminSidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Staff Management</h1>
                <p className="text-gray-600 mt-1">Manage your typing center staff and their assignments.</p>
              </div>
              <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <Plus className="h-4 w-4 mr-2" />
                    Add New Staff
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Staff Member</DialogTitle>
                    <DialogDescription>
                      Add a new team member to your typing center.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Full Name</label>
                      <Input 
                        placeholder="Enter full name"
                        value={newStaff.name}
                        onChange={(e) => setNewStaff({...newStaff, name: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Email</label>
                      <Input 
                        type="email"
                        placeholder="staff@interacttyping.ae"
                        value={newStaff.email}
                        onChange={(e) => setNewStaff({...newStaff, email: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Phone</label>
                      <Input 
                        placeholder="+971xxxxxxxxx"
                        value={newStaff.phone}
                        onChange={(e) => setNewStaff({...newStaff, phone: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Role</label>
                      <Select value={newStaff.role} onValueChange={(value) => setNewStaff({...newStaff, role: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Senior Typist">Senior Typist</SelectItem>
                          <SelectItem value="Junior Typist">Junior Typist</SelectItem>
                          <SelectItem value="Document Specialist">Document Specialist</SelectItem>
                          <SelectItem value="Translation Specialist">Translation Specialist</SelectItem>
                          <SelectItem value="Customer Service">Customer Service</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Department</label>
                      <Select value={newStaff.department} onValueChange={(value) => setNewStaff({...newStaff, department: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select department" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Immigration">Immigration</SelectItem>
                          <SelectItem value="Business">Business</SelectItem>
                          <SelectItem value="Transportation">Transportation</SelectItem>
                          <SelectItem value="Documentation">Documentation</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex gap-2 pt-4">
                      <Button onClick={() => setIsAddModalOpen(false)} variant="outline" className="flex-1">
                        Cancel
                      </Button>
                      <Button onClick={handleAddStaff} className="flex-1 bg-blue-600 hover:bg-blue-700">
                        Add Staff Member
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Staff</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.total}</div>
                  <p className="text-xs text-muted-foreground">Team members</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Staff</CardTitle>
                  <UserCheck className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">{stats.active}</div>
                  <p className="text-xs text-muted-foreground">Currently working</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">On Leave</CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-yellow-600">{stats.onLeave}</div>
                  <p className="text-xs text-muted-foreground">Temporarily away</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Tasks</CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-600">{stats.totalTasks}</div>
                  <p className="text-xs text-muted-foreground">Currently assigned</p>
                </CardContent>
              </Card>
            </div>

            {/* Staff Table */}
            <Card>
              <CardHeader>
                <CardTitle>Staff Members</CardTitle>
                <CardDescription>
                  Manage your typing center team members and their assignments.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Staff Member</TableHead>
                      <TableHead>Role & Department</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Tasks</TableHead>
                      <TableHead>Performance</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {staff.map((member) => (
                      <TableRow key={member.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{member.name}</div>
                            <div className="text-sm text-gray-500">Joined {member.joinDate}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">{member.role}</div>
                            <Badge variant="outline" className="mt-1">{member.department}</Badge>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="flex items-center text-sm">
                              <Mail className="h-3 w-3 mr-2" />
                              {member.email}
                            </div>
                            <div className="flex items-center text-sm">
                              <Phone className="h-3 w-3 mr-2" />
                              {member.phone}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Select 
                            value={member.status} 
                            onValueChange={(value) => handleStatusChange(member.id, value)}
                          >
                            <SelectTrigger className="w-32">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="active">Active</SelectItem>
                              <SelectItem value="on-leave">On Leave</SelectItem>
                              <SelectItem value="inactive">Inactive</SelectItem>
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell>
                          <div className="text-center">
                            <div className="font-medium text-blue-600">{member.assignedTasks}</div>
                            <div className="text-xs text-gray-500">assigned</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-center">
                            <div className="font-medium text-green-600">{member.completedTasks}</div>
                            <div className="text-xs text-gray-500">completed</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="text-red-600 hover:text-red-700"
                              onClick={() => handleDeleteStaff(member.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminStaff;
