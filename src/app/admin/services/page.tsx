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
  Search, 
  Filter, 
  FileText, 
  Clock, 
  CheckCircle,
  AlertCircle,
  Calendar,
  TrendingUp,
  Plus,
  Edit,
  Trash2,
  DollarSign,
  Users,
  Star
} from 'lucide-react';
import Link from 'next/link';

export default function AdminServicesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isAddServiceModalOpen, setIsAddServiceModalOpen] = useState(false);

  // Mock services data
  const services = [
    {
      id: '1',
      name: 'Driving License - Golden Chance',
      category: 'Transportation',
      description: 'Complete driving license application and processing service',
      price: 1500,
      duration: '5-7 days',
      status: 'active',
      popularity: 95,
      totalEnquiries: 156,
      completedServices: 142,
      requirements: ['Emirates ID', 'Eye Test', 'Passport Copy']
    },
    {
      id: '2',
      name: 'Emirates ID Renewal',
      category: 'Government',
      description: 'Fast and reliable Emirates ID renewal service',
      price: 800,
      duration: '3-5 days',
      status: 'active',
      popularity: 88,
      totalEnquiries: 203,
      completedServices: 189,
      requirements: ['Old Emirates ID', 'Passport Copy', 'Photo']
    },
    {
      id: '3',
      name: 'Visa Application',
      category: 'Immigration',
      description: 'Comprehensive visa application and processing',
      price: 2500,
      duration: '7-10 days',
      status: 'active',
      popularity: 92,
      totalEnquiries: 134,
      completedServices: 118,
      requirements: ['Passport', 'Photo', 'Employment Letter']
    },
    {
      id: '4',
      name: 'Trade License Setup',
      category: 'Business',
      description: 'Complete business setup and trade license processing',
      price: 3500,
      duration: '10-15 days',
      status: 'active',
      popularity: 85,
      totalEnquiries: 89,
      completedServices: 76,
      requirements: ['Business Plan', 'Partnership Agreement', 'Office Lease']
    },
    {
      id: '5',
      name: 'Document Translation',
      category: 'Documentation',
      description: 'Professional document translation services',
      price: 300,
      duration: '1-2 days',
      status: 'inactive',
      popularity: 78,
      totalEnquiries: 67,
      completedServices: 62,
      requirements: ['Original Document', 'Target Language']
    }
  ];

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      active: { label: 'Active', className: 'bg-green-100 text-green-800' },
      inactive: { label: 'Inactive', className: 'bg-gray-100 text-gray-800' },
      pending: { label: 'Pending', className: 'bg-yellow-100 text-yellow-800' },
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.inactive;
    return (
      <Badge className={config.className}>
        {config.label}
      </Badge>
    );
  };

  const getPopularityBadge = (popularity: number) => {
    if (popularity >= 90) {
      return <Badge className="bg-green-100 text-green-800"><Star className="w-3 h-3 mr-1" />Very Popular</Badge>;
    } else if (popularity >= 80) {
      return <Badge className="bg-blue-100 text-blue-800">Popular</Badge>;
    } else if (popularity >= 70) {
      return <Badge className="bg-yellow-100 text-yellow-800">Moderate</Badge>;
    } else {
      return <Badge className="bg-gray-100 text-gray-800">Low</Badge>;
    }
  };

  const filteredServices = services.filter(service => {
    const matchesSearch = 
      service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = categoryFilter === 'all' || service.category === categoryFilter;
    const matchesStatus = statusFilter === 'all' || service.status === statusFilter;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const activeServicesCount = services.filter(s => s.status === 'active').length;
  const totalEnquiries = services.reduce((sum, service) => sum + service.totalEnquiries, 0);
  const totalRevenue = services.reduce((sum, service) => sum + (service.price * service.completedServices), 0);
  const averagePopularity = Math.round(services.reduce((sum, service) => sum + service.popularity, 0) / services.length);

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
              <div className="flex items-center space-x-3 p-3 text-gray-700 hover:bg-gray-50 rounded-lg">
                <Users className="w-5 h-5" />
                <span>Staff</span>
              </div>
            </Link>
            <Link href="/admin/services">
              <div className="flex items-center space-x-3 p-3 bg-blue-50 text-blue-700 rounded-lg">
                <FileText className="w-5 h-5" />
                <span className="font-medium">Services</span>
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
                <h1 className="text-2xl font-bold text-gray-900">Services Management</h1>
                <p className="text-sm text-gray-600">Manage your service offerings and track their performance.</p>
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
                <Dialog open={isAddServiceModalOpen} onOpenChange={setIsAddServiceModalOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Service
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add New Service</DialogTitle>
                      <DialogDescription>
                        Add a new service to your offerings
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium">Service Name</label>
                        <Input placeholder="Enter service name" />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Category</label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="transportation">Transportation</SelectItem>
                            <SelectItem value="government">Government</SelectItem>
                            <SelectItem value="immigration">Immigration</SelectItem>
                            <SelectItem value="business">Business</SelectItem>
                            <SelectItem value="documentation">Documentation</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label className="text-sm font-medium">Description</label>
                        <Input placeholder="Enter service description" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium">Price (AED)</label>
                          <Input type="number" placeholder="0" />
                        </div>
                        <div>
                          <label className="text-sm font-medium">Duration</label>
                          <Input placeholder="e.g., 5-7 days" />
                        </div>
                      </div>
                      <div className="flex justify-end space-x-2">
                        <Button variant="outline" onClick={() => setIsAddServiceModalOpen(false)}>
                          Cancel
                        </Button>
                        <Button className="bg-blue-600 hover:bg-blue-700">
                          Add Service
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
                      <p className="text-sm font-medium text-gray-600">Active Services</p>
                      <p className="text-2xl font-bold text-green-600">{activeServicesCount}</p>
                    </div>
                    <FileText className="h-8 w-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Enquiries</p>
                      <p className="text-2xl font-bold text-blue-600">{totalEnquiries}</p>
                    </div>
                    <Users className="h-8 w-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                      <p className="text-2xl font-bold text-purple-600">AED {totalRevenue.toLocaleString()}</p>
                    </div>
                    <DollarSign className="h-8 w-8 text-purple-600" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Avg Popularity</p>
                      <p className="text-2xl font-bold text-orange-600">{averagePopularity}%</p>
                    </div>
                    <Star className="h-8 w-8 text-orange-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Search and Filter */}
            <Card>
              <CardHeader>
                <CardTitle>Search & Filter Services</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Search by service name or description..."
                        className="pl-10"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="md:w-48">
                    <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                      <SelectTrigger>
                        <Filter className="w-4 h-4 mr-2" />
                        <SelectValue placeholder="All Categories" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        <SelectItem value="Transportation">Transportation</SelectItem>
                        <SelectItem value="Government">Government</SelectItem>
                        <SelectItem value="Immigration">Immigration</SelectItem>
                        <SelectItem value="Business">Business</SelectItem>
                        <SelectItem value="Documentation">Documentation</SelectItem>
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
                        <SelectItem value="pending">Pending</SelectItem>
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

            {/* Services Table */}
            <Card>
              <CardHeader>
                <CardTitle>All Services</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Service</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Popularity</TableHead>
                        <TableHead>Performance</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredServices.map((service) => (
                        <TableRow key={service.id}>
                          <TableCell>
                            <div>
                              <p className="font-medium text-gray-900">{service.name}</p>
                              <p className="text-sm text-gray-600">{service.description}</p>
                              <p className="text-sm text-gray-500">Duration: {service.duration}</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">{service.category}</Badge>
                          </TableCell>
                          <TableCell>
                            <p className="font-medium text-gray-900">AED {service.price}</p>
                          </TableCell>
                          <TableCell>
                            {getStatusBadge(service.status)}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              {getPopularityBadge(service.popularity)}
                              <span className="text-sm text-gray-600">({service.popularity}%)</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="text-center">
                              <p className="font-medium text-gray-900">{service.completedServices}</p>
                              <p className="text-sm text-gray-600">of {service.totalEnquiries} enquiries</p>
                            </div>
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
                
                {filteredServices.length === 0 && (
                  <div className="text-center py-8">
                    <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">No services found matching your criteria.</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Service Requirements Overview */}
            <Card>
              <CardHeader>
                <CardTitle>Service Requirements Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {services.map((service) => (
                    <div key={service.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-semibold text-gray-900">{service.name}</h3>
                        <Badge variant="outline">{service.category}</Badge>
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm text-gray-600">{service.description}</p>
                        <div>
                          <p className="text-sm font-medium text-gray-700 mb-1">Requirements:</p>
                          <ul className="text-sm text-gray-600 space-y-1">
                            {service.requirements.map((req, index) => (
                              <li key={index} className="flex items-center">
                                <CheckCircle className="w-3 h-3 text-green-500 mr-2" />
                                {req}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Price: AED {service.price}</span>
                          <span>Duration: {service.duration}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
} 