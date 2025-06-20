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
  Mail
} from 'lucide-react';
import Link from 'next/link';

export default function AdminAssignmentsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);

  // Mock data for enquiries
  const enquiries = [
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
    },
    {
      id: '4',
      service: 'Trade License Setup',
      customerName: 'Sarah Johnson',
      email: 'sarah@email.com',
      phone: '+971554321098',
      submissionDate: '2024-06-11',
      status: 'completed',
      assignedTo: 'Fatima Al Zahra',
      priority: 'high'
    },
    {
      id: '5',
      service: 'Document Translation',
      customerName: 'Raj Patel',
      email: 'raj@email.com',
      phone: '+971556789012',
      submissionDate: '2024-06-10',
      status: 'in-progress',
      assignedTo: 'Mohammed Ali',
      priority: 'medium'
    }
  ];

  // Mock staff data
  const staff = [
    {
      id: '1',
      name: 'Ahmed Hassan',
      role: 'Senior Typist',
      department: 'Immigration',
      status: 'active',
      currentTasks: 3,
      email: 'ahmed.hassan@interacttyping.ae',
      phone: '+971501234567'
    },
    {
      id: '2',
      name: 'Fatima Al Zahra',
      role: 'Document Specialist',
      department: 'Business',
      status: 'active',
      currentTasks: 2,
      email: 'fatima.alzahra@interacttyping.ae',
      phone: '+971552345678'
    },
    {
      id: '3',
      name: 'Mohammed Ali',
      role: 'Junior Typist',
      department: 'Transportation',
      status: 'active',
      currentTasks: 1,
      email: 'mohammed.ali@interacttyping.ae',
      phone: '+971509876543'
    }
  ];

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      new: { label: 'New', className: 'bg-blue-100 text-blue-800' },
      'in-progress': { label: 'In Progress', className: 'bg-yellow-100 text-yellow-800' },
      completed: { label: 'Completed', className: 'bg-green-100 text-green-800' },
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.new;
    return (
      <Badge className={config.className}>
        {config.label}
      </Badge>
    );
  };

  const getPriorityBadge = (priority: string) => {
    const priorityConfig = {
      high: { label: 'High', className: 'bg-red-100 text-red-800' },
      medium: { label: 'Medium', className: 'bg-orange-100 text-orange-800' },
      low: { label: 'Low', className: 'bg-gray-100 text-gray-800' },
    };

    const config = priorityConfig[priority as keyof typeof priorityConfig] || priorityConfig.medium;
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

  const handleAssignWork = (staffId: string) => {
    if (selectedEnquiry) {
      const staffMember = staff.find(s => s.id === staffId);
      
      // In a real app, this would update the database
      console.log(`Assigning enquiry ${selectedEnquiry.id} to ${staffMember?.name}`);
      
      setIsAssignModalOpen(false);
      setSelectedEnquiry(null);
    }
  };

  const unassignedCount = enquiries.filter(e => !e.assignedTo).length;
  const inProgressCount = enquiries.filter(e => e.status === 'in-progress').length;
  const highPriorityCount = enquiries.filter(e => e.priority === 'high').length;
  const completedCount = enquiries.filter(e => e.status === 'completed').length;

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 shadow-sm">
        <div className="p-6">
          <div className="flex items-center space-x-3 mb-8">
            <div className="bg-blue-100 text-blue-600 p-2 rounded-lg">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">Admin Panel</h2>
              <p className="text-sm text-gray-500">Interact Typing</p>
            </div>
          </div>
          <nav className="space-y-2">
            <Link href="/admin/dashboard">
              <div className="flex items-center space-x-3 p-3 hover:bg-blue-50 rounded-lg text-gray-700 transition-all">
                <TrendingUp className="w-5 h-5" />
                <span>Dashboard</span>
              </div>
            </Link>
            <Link href="/admin/enquiries">
              <div className="flex items-center space-x-3 p-3 hover:bg-blue-50 rounded-lg text-gray-700 transition-all">
                <FileText className="w-5 h-5" />
                <span>Enquiries</span>
              </div>
            </Link>
            <Link href="/admin/assignments">
              <div className="flex items-center space-x-3 p-3 bg-blue-50 text-blue-700 rounded-lg font-semibold">
                <Users className="w-5 h-5" />
                <span>Assignments</span>
              </div>
            </Link>
            <Link href="/admin/staff">
              <div className="flex items-center space-x-3 p-3 hover:bg-blue-50 rounded-lg text-gray-700 transition-all">
                <Users className="w-5 h-5" />
                <span>Staff</span>
              </div>
            </Link>
            <Link href="/admin/services">
              <div className="flex items-center space-x-3 p-3 hover:bg-blue-50 rounded-lg text-gray-700 transition-all">
                <FileText className="w-5 h-5" />
                <span>Services</span>
              </div>
            </Link>
            <Link href="/admin/settings">
              <div className="flex items-center space-x-3 p-3 hover:bg-blue-50 rounded-lg text-gray-700 transition-all">
                <Clock className="w-5 h-5" />
                <span>Settings</span>
              </div>
            </Link>
          </nav>
        </div>
      </div>
      <main className="flex-1 p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Assignments</h1>
        <p className="text-gray-600 mb-6">Assign enquiries to staff members and manage workload distribution.</p>
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-4 flex flex-col items-center border border-gray-100">
            <span className="text-xs text-gray-500 mb-1">Unassigned</span>
            <span className="text-2xl font-bold text-orange-600">{unassignedCount}</span>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4 flex flex-col items-center border border-gray-100">
            <span className="text-xs text-gray-500 mb-1">In Progress</span>
            <span className="text-2xl font-bold text-blue-600">{inProgressCount}</span>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4 flex flex-col items-center border border-gray-100">
            <span className="text-xs text-gray-500 mb-1">High Priority</span>
            <span className="text-2xl font-bold text-red-600">{highPriorityCount}</span>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4 flex flex-col items-center border border-gray-100">
            <span className="text-xs text-gray-500 mb-1">Completed</span>
            <span className="text-2xl font-bold text-green-600">{completedCount}</span>
          </div>
        </div>
        {/* Search & Filter */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8 border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Search & Filter Assignments</h2>
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <Input placeholder="Search by customer name or service..." className="flex-1" />
            <Select>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">Filter</Button>
          </div>
        </div>
        {/* Assignments Table */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">All Assignments</h2>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead>Service</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Assigned To</TableHead>
                  <TableHead>Submission Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEnquiries.map((enquiry) => (
                  <TableRow key={enquiry.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium text-gray-900">{enquiry.customerName}</p>
                        <p className="text-sm text-gray-600">{enquiry.email}</p>
                        <p className="text-sm text-gray-600">{enquiry.phone}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <p className="text-gray-900">{enquiry.service}</p>
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(enquiry.status)}
                    </TableCell>
                    <TableCell>
                      {getPriorityBadge(enquiry.priority)}
                    </TableCell>
                    <TableCell>
                      <p className="text-gray-900">{enquiry.assignedTo || 'Unassigned'}</p>
                    </TableCell>
                    <TableCell>
                      <p className="text-sm text-gray-600">{enquiry.submissionDate}</p>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        {!enquiry.assignedTo && (
                          <Dialog open={isAssignModalOpen && selectedEnquiry?.id === enquiry.id} onOpenChange={setIsAssignModalOpen}>
                            <DialogTrigger asChild>
                              <Button 
                                size="sm" 
                                onClick={() => setSelectedEnquiry(enquiry)}
                                className="bg-blue-600 hover:bg-blue-700"
                              >
                                <UserPlus className="w-4 h-4 mr-1" />
                                Assign
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Assign Work</DialogTitle>
                                <DialogDescription>
                                  Assign this enquiry to a staff member
                                </DialogDescription>
                              </DialogHeader>
                              <div className="space-y-4">
                                <div>
                                  <p className="font-medium">Customer: {selectedEnquiry?.customerName}</p>
                                  <p className="text-sm text-gray-600">Service: {selectedEnquiry?.service}</p>
                                </div>
                                <div className="space-y-2">
                                  <p className="font-medium">Select Staff Member:</p>
                                  {staff.map((member) => (
                                    <div 
                                      key={member.id}
                                      className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
                                      onClick={() => handleAssignWork(member.id)}
                                    >
                                      <div>
                                        <p className="font-medium">{member.name}</p>
                                        <p className="text-sm text-gray-600">{member.role} • {member.currentTasks} tasks</p>
                                      </div>
                                      <Button size="sm" variant="outline">
                                        Assign
                                      </Button>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                        )}
                        <Button size="sm" variant="outline">
                          <FileText className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          {filteredEnquiries.length === 0 && (
            <div className="text-center py-8">
              <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No assignments found matching your criteria.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
} 