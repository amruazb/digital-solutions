'use client'

import React, { useState } from 'react';
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
  Calendar,
  FileText,
  TrendingUp,
  Phone,
  Mail,
  Edit,
  Trash2,
  Plus,
  Star,
  Award
} from 'lucide-react';
import Link from 'next/link';

export default function AdminStaffPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isAddStaffModalOpen, setIsAddStaffModalOpen] = useState(false);

  // Mock staff data
  const staff = [
    {
      id: '1',
      name: 'Ahmed Hassan',
      email: 'ahmed.hassan@interacttyping.ae',
      phone: '+971501234567',
      role: 'Senior Typist',
      department: 'Immigration',
      status: 'active',
      joinDate: '2023-01-15',
      currentTasks: 3,
      completedTasks: 156,
      performance: 95,
      avatar: 'AH'
    },
    {
      id: '2',
      name: 'Fatima Al Zahra',
      email: 'fatima.alzahra@interacttyping.ae',
      phone: '+971552345678',
      role: 'Document Specialist',
      department: 'Business',
      status: 'active',
      joinDate: '2023-03-20',
      currentTasks: 2,
      completedTasks: 142,
      performance: 92,
      avatar: 'FA'
    },
    {
      id: '3',
      name: 'Mohammed Ali',
      email: 'mohammed.ali@interacttyping.ae',
      phone: '+971509876543',
      role: 'Junior Typist',
      department: 'Transportation',
      status: 'active',
      joinDate: '2023-06-10',
      currentTasks: 1,
      completedTasks: 89,
      performance: 88,
      avatar: 'MA'
    },
    {
      id: '4',
      name: 'Sarah Johnson',
      email: 'sarah.johnson@interacttyping.ae',
      phone: '+971554321098',
      role: 'Senior Typist',
      department: 'Immigration',
      status: 'active',
      joinDate: '2022-11-05',
      currentTasks: 4,
      completedTasks: 203,
      performance: 97,
      avatar: 'SJ'
    },
    {
      id: '5',
      name: 'Omar Khalil',
      email: 'omar.khalil@interacttyping.ae',
      phone: '+971556789012',
      role: 'Document Specialist',
      department: 'Business',
      status: 'inactive',
      joinDate: '2023-02-12',
      currentTasks: 0,
      completedTasks: 67,
      performance: 85,
      avatar: 'OK'
    }
  ];

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      active: { label: 'Active', className: 'bg-green-100 text-green-800' },
      inactive: { label: 'Inactive', className: 'bg-gray-100 text-gray-800' },
      onLeave: { label: 'On Leave', className: 'bg-yellow-100 text-yellow-800' },
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.inactive;
    return (
      <Badge className={config.className}>
        {config.label}
      </Badge>
    );
  };

  const getPerformanceBadge = (performance: number) => {
    if (performance >= 95) {
      return <Badge className="bg-green-100 text-green-800"><Star className="w-3 h-3 mr-1" />Excellent</Badge>;
    } else if (performance >= 90) {
      return <Badge className="bg-blue-100 text-blue-800"><Award className="w-3 h-3 mr-1" />Good</Badge>;
    } else if (performance >= 80) {
      return <Badge className="bg-yellow-100 text-yellow-800">Average</Badge>;
    } else {
      return <Badge className="bg-red-100 text-red-800">Needs Improvement</Badge>;
    }
  };

  const filteredStaff = staff.filter(member => {
    const matchesSearch = 
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.role.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDepartment = departmentFilter === 'all' || member.department === departmentFilter;
    const matchesStatus = statusFilter === 'all' || member.status === statusFilter;
    
    return matchesSearch && matchesDepartment && matchesStatus;
  });

  const activeStaffCount = staff.filter(s => s.status === 'active').length;
  const totalTasks = staff.reduce((sum, member) => sum + member.currentTasks, 0);
  const averagePerformance = Math.round(staff.reduce((sum, member) => sum + member.performance, 0) / staff.length);
  const totalCompletedTasks = staff.reduce((sum, member) => sum + member.completedTasks, 0);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="p-6">
          <div className="flex items-center space-x-3 mb-8">
            <div className="bg-blue-600 text-white p-2 rounded-lg">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">Admin Panel</h2>
              <p className="text-sm text-gray-600">Interact Typing</p>
            </div>
          </div>
          
          <nav className="space-y-2">
            <Link href="/admin/dashboard">
              <div className="flex items-center space-x-3 p-3 text-gray-700 hover:bg-gray-50 rounded-lg">
                <TrendingUp className="w-5 h-5" />
                <span>Dashboard</span>
              </div>
            </Link>
            <Link href="/admin/enquiries">
              <div className="flex items-center space-x-3 p-3 text-gray-700 hover:bg-gray-50 rounded-lg">
                <FileText className="w-5 h-5" />
                <span>Enquiries</span>
              </div>
            </Link>
            <Link href="/admin/assignments">
              <div className="flex items-center space-x-3 p-3 text-gray-700 hover:bg-gray-50 rounded-lg">
                <Users className="w-5 h-5" />
                <span>Assignments</span>
              </div>
            </Link>
            <Link href="/admin/staff">
              <div className="flex items-center space-x-3 p-3 bg-blue-50 text-blue-700 rounded-lg">
                <Users className="w-5 h-5" />
                <span className="font-medium">Staff</span>
              </div>
            </Link>
            <Link href="/admin/services">
              <div className="flex items-center space-x-3 p-3 text-gray-700 hover:bg-gray-50 rounded-lg">
                <FileText className="w-5 h-5" />
                <span>Services</span>
              </div>
            </Link>
            <Link href="/admin/settings">
              <div className="flex items-center space-x-3 p-3 text-gray-700 hover:bg-gray-50 rounded-lg">
                <Clock className="w-5 h-5" />
                <span>Settings</span>
              </div>
            </Link>
          </nav>
        </div>
      </div>
      
      <main className="flex-1 overflow-hidden">
        <div className="h-full overflow-y-auto">
          {/* Header */}
          <div className="bg-white border-b border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Staff Management</h1>
                <p className="text-sm text-gray-600">Manage your team members and their performance.</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Calendar className="h-4 w-4" />
                  {new Date().toLocaleDateString('en-GB', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </div>
                <Dialog open={isAddStaffModalOpen} onOpenChange={setIsAddStaffModalOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Staff
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add New Staff Member</DialogTitle>
                      <DialogDescription>
                        Add a new team member to your organization
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium">Name</label>
                          <Input placeholder="Full name" />
                        </div>
                        <div>
                          <label className="text-sm font-medium">Email</label>
                          <Input type="email" placeholder="email@example.com" />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium">Phone</label>
                          <Input placeholder="+971 XX XXX XXXX" />
                        </div>
                        <div>
                          <label className="text-sm font-medium">Role</label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select role" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="senior-typist">Senior Typist</SelectItem>
                              <SelectItem value="document-specialist">Document Specialist</SelectItem>
                              <SelectItem value="junior-typist">Junior Typist</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium">Department</label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select department" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="immigration">Immigration</SelectItem>
                            <SelectItem value="business">Business</SelectItem>
                            <SelectItem value="transportation">Transportation</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex justify-end space-x-2">
                        <Button variant="outline" onClick={() => setIsAddStaffModalOpen(false)}>
                          Cancel
                        </Button>
                        <Button className="bg-blue-600 hover:bg-blue-700">
                          Add Staff Member
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>

          <div className="p-6 space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Active Staff</p>
                      <p className="text-2xl font-bold text-green-600">{activeStaffCount}</p>
                    </div>
                    <Users className="h-8 w-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Current Tasks</p>
                      <p className="text-2xl font-bold text-blue-600">{totalTasks}</p>
                    </div>
                    <Clock className="h-8 w-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Avg Performance</p>
                      <p className="text-2xl font-bold text-purple-600">{averagePerformance}%</p>
                    </div>
                    <Star className="h-8 w-8 text-purple-600" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Completed Tasks</p>
                      <p className="text-2xl font-bold text-orange-600">{totalCompletedTasks}</p>
                    </div>
                    <CheckCircle className="h-8 w-8 text-orange-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Search and Filter */}
            <Card>
              <CardHeader>
                <CardTitle>Search & Filter Staff</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Search by name, email, or role..."
                        className="pl-10"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="md:w-48">
                    <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                      <SelectTrigger>
                        <Filter className="w-4 h-4 mr-2" />
                        <SelectValue placeholder="All Departments" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Departments</SelectItem>
                        <SelectItem value="Immigration">Immigration</SelectItem>
                        <SelectItem value="Business">Business</SelectItem>
                        <SelectItem value="Transportation">Transportation</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="md:w-48">
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger>
                        <Filter className="w-4 h-4 mr-2" />
                        <SelectValue placeholder="All Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                        <SelectItem value="onLeave">On Leave</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <Filter className="w-4 h-4 mr-2" />
                    Filter
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Staff Table */}
            <Card>
              <CardHeader>
                <CardTitle>All Staff Members</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Staff Member</TableHead>
                        <TableHead>Role & Department</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Performance</TableHead>
                        <TableHead>Current Tasks</TableHead>
                        <TableHead>Join Date</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredStaff.map((member) => (
                        <TableRow key={member.id}>
                          <TableCell>
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                <span className="text-sm font-medium text-blue-600">{member.avatar}</span>
                              </div>
                              <div>
                                <p className="font-medium text-gray-900">{member.name}</p>
                                <p className="text-sm text-gray-600">{member.email}</p>
                                <p className="text-sm text-gray-600">{member.phone}</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div>
                              <p className="font-medium text-gray-900">{member.role}</p>
                              <p className="text-sm text-gray-600">{member.department}</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            {getStatusBadge(member.status)}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              {getPerformanceBadge(member.performance)}
                              <span className="text-sm text-gray-600">({member.performance}%)</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="text-center">
                              <p className="font-medium text-gray-900">{member.currentTasks}</p>
                              <p className="text-sm text-gray-600">{member.completedTasks} completed</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <p className="text-sm text-gray-600">{member.joinDate}</p>
                          </TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button size="sm" variant="outline">
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                
                {filteredStaff.length === 0 && (
                  <div className="text-center py-8">
                    <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">No staff members found matching your criteria.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
} 