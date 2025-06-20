'use client'

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Filter, 
  FileText, 
  Phone, 
  Mail, 
  MapPin, 
  Star, 
  CheckCircle, 
  ArrowRight,
  HelpCircle,
  Heart,
  Clock,
  Shield,
  Users,
  TrendingUp,
  Calendar,
  AlertTriangle,
  Eye,
  Edit,
  Trash2
} from 'lucide-react';
import Link from 'next/link';

export default function AdminEnquiriesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Mock enquiries data
  const enquiries = [
    {
      id: 1,
      clientName: 'Ahmed Hassan',
      email: 'ahmed.hassan@email.com',
      phone: '+971 50 123 4567',
      service: 'Trade License & Company Setup',
      status: 'In Progress',
      priority: 'High',
      assignedTo: 'Sarah Johnson',
      createdAt: '2024-01-15',
      updatedAt: '2024-01-16'
    },
    {
      id: 2,
      clientName: 'Sarah Johnson',
      email: 'sarah.johnson@email.com',
      phone: '+971 55 987 6543',
      service: 'Family & Visa Services',
      status: 'Completed',
      priority: 'Medium',
      assignedTo: 'Ahmed Hassan',
      createdAt: '2024-01-14',
      updatedAt: '2024-01-15'
    },
    {
      id: 3,
      clientName: 'Raj Patel',
      email: 'raj.patel@email.com',
      phone: '+971 52 456 7890',
      service: 'Driving License - Golden Chance',
      status: 'Pending',
      priority: 'Low',
      assignedTo: 'Maria Santos',
      createdAt: '2024-01-14',
      updatedAt: '2024-01-14'
    },
    {
      id: 4,
      clientName: 'Maria Santos',
      email: 'maria.santos@email.com',
      phone: '+971 54 321 0987',
      service: 'Certificate Attestation Services',
      status: 'In Progress',
      priority: 'High',
      assignedTo: 'Omar Khalil',
      createdAt: '2024-01-13',
      updatedAt: '2024-01-15'
    },
    {
      id: 5,
      clientName: 'Omar Khalil',
      email: 'omar.khalil@email.com',
      phone: '+971 56 789 0123',
      service: 'Health Insurance (Daman)',
      status: 'Completed',
      priority: 'Medium',
      assignedTo: 'Sarah Johnson',
      createdAt: '2024-01-13',
      updatedAt: '2024-01-14'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'In Progress':
        return 'bg-blue-100 text-blue-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High':
        return 'bg-red-100 text-red-800';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'Low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredEnquiries = enquiries.filter(enquiry => {
    const matchesSearch = 
      enquiry.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      enquiry.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      enquiry.service.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || enquiry.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

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
              <div className="flex items-center space-x-3 p-3 bg-blue-50 text-blue-700 rounded-lg">
                <FileText className="w-5 h-5" />
                <span className="font-medium">Enquiries</span>
              </div>
            </Link>
            <Link href="/admin/assignments">
              <div className="flex items-center space-x-3 p-3 text-gray-700 hover:bg-gray-50 rounded-lg">
                <Users className="w-5 h-5" />
                <span>Assignments</span>
              </div>
            </Link>
            <Link href="/admin/staff">
              <div className="flex items-center space-x-3 p-3 text-gray-700 hover:bg-gray-50 rounded-lg">
                <Users className="w-5 h-5" />
                <span>Staff</span>
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
                <h1 className="text-2xl font-bold text-gray-900">Enquiries Management</h1>
                <p className="text-sm text-gray-600">Manage and track all customer enquiries</p>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Calendar className="h-4 w-4" />
                {new Date().toLocaleDateString('en-GB', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
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
                      <p className="text-sm font-medium text-gray-600">Total Enquiries</p>
                      <p className="text-2xl font-bold text-gray-900">{enquiries.length}</p>
                    </div>
                    <FileText className="h-8 w-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">In Progress</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {enquiries.filter(e => e.status === 'In Progress').length}
                      </p>
                    </div>
                    <Clock className="h-8 w-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Completed</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {enquiries.filter(e => e.status === 'Completed').length}
                      </p>
                    </div>
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Pending</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {enquiries.filter(e => e.status === 'Pending').length}
                      </p>
                    </div>
                    <AlertTriangle className="h-8 w-8 text-yellow-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Search and Filter */}
            <Card>
              <CardHeader>
                <CardTitle>Search & Filter Enquiries</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Search by name, email, or service..."
                        className="pl-10"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="md:w-48">
                    <select
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                    >
                      <option value="all">All Status</option>
                      <option value="Pending">Pending</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </div>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <Filter className="w-4 h-4 mr-2" />
                    Filter
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Enquiries Table */}
            <Card>
              <CardHeader>
                <CardTitle>All Enquiries</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 font-semibold text-gray-900">Client</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-900">Service</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-900">Status</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-900">Priority</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-900">Assigned To</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-900">Created</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-900">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredEnquiries.map((enquiry) => (
                        <tr key={enquiry.id} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-4 px-4">
                            <div>
                              <p className="font-medium text-gray-900">{enquiry.clientName}</p>
                              <p className="text-sm text-gray-600">{enquiry.email}</p>
                              <p className="text-sm text-gray-600">{enquiry.phone}</p>
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <p className="text-gray-900">{enquiry.service}</p>
                          </td>
                          <td className="py-4 px-4">
                            <Badge className={getStatusColor(enquiry.status)}>
                              {enquiry.status}
                            </Badge>
                          </td>
                          <td className="py-4 px-4">
                            <Badge className={getPriorityColor(enquiry.priority)}>
                              {enquiry.priority}
                            </Badge>
                          </td>
                          <td className="py-4 px-4">
                            <p className="text-gray-900">{enquiry.assignedTo}</p>
                          </td>
                          <td className="py-4 px-4">
                            <p className="text-sm text-gray-600">{enquiry.createdAt}</p>
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex space-x-2">
                              <Button size="sm" variant="outline">
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button size="sm" variant="outline">
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                {filteredEnquiries.length === 0 && (
                  <div className="text-center py-8">
                    <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">No enquiries found matching your criteria.</p>
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