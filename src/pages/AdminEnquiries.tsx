
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminSidebar from '@/components/admin/AdminSidebar';
import EnquiryTable from '@/components/admin/EnquiryTable';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Search, Filter } from 'lucide-react';

// Mock data - same as dashboard
const mockEnquiries = [
  {
    id: '1',
    service: 'Driving License - Golden Chance',
    customerName: 'Ahmed Al Mansouri',
    email: 'ahmed@email.com',
    phone: '+971501234567',
    submissionDate: '2024-06-14',
    status: 'new' as const,
    uploadedFiles: [
      { name: 'visa_copy.pdf', type: 'pdf', size: '2.4 MB' },
      { name: 'emirates_id.jpg', type: 'image', size: '1.8 MB' }
    ],
    formData: {
      'Upload Visa Copy': 'visa_copy.pdf',
      'Upload Emirates ID': 'emirates_id.jpg',
      'Email ID': 'ahmed@email.com',
      'Phone Number': '+971501234567',
      'Select Type': 'Automatic',
      'Eye Test Done': 'Yes'
    }
  },
  {
    id: '2',
    service: 'Family Visa Typing',
    customerName: 'Sarah Johnson',
    email: 'sarah@email.com',
    phone: '+971552345678',
    submissionDate: '2024-06-13',
    status: 'in-progress' as const,
    uploadedFiles: [
      { name: 'passport.pdf', type: 'pdf', size: '3.1 MB' },
      { name: 'salary_certificate.pdf', type: 'pdf', size: '1.2 MB' }
    ],
    formData: {
      'Passport Copy': 'passport.pdf',
      'Salary Certificate': 'salary_certificate.pdf',
      'Email': 'sarah@email.com',
      'Phone': '+971552345678'
    }
  },
  {
    id: '3',
    service: 'Trade License Assistance',
    customerName: 'Mohammed Rahman',
    email: 'mohammed@email.com',
    phone: '+971509876543',
    submissionDate: '2024-06-12',
    status: 'completed' as const,
    uploadedFiles: [
      { name: 'business_plan.pdf', type: 'pdf', size: '5.2 MB' }
    ],
    formData: {
      'Business Plan': 'business_plan.pdf',
      'Email': 'mohammed@email.com',
      'Phone': '+971509876543'
    }
  }
];

const AdminEnquiries = () => {
  const navigate = useNavigate();
  const [enquiries, setEnquiries] = useState(mockEnquiries);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Check admin authentication
  React.useEffect(() => {
    const adminSession = localStorage.getItem('adminSession');
    if (!adminSession) {
      navigate('/admin/login');
    }
  }, [navigate]);

  // Filter enquiries based on search and status
  const filteredEnquiries = enquiries.filter(enquiry => {
    const matchesSearch = enquiry.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         enquiry.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         enquiry.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || enquiry.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusCount = (status: string) => {
    if (status === 'all') return enquiries.length;
    return enquiries.filter(e => e.status === status).length;
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <AdminSidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
            <h1 className="text-2xl font-bold text-gray-900">Enquiries Management</h1>
            <p className="text-gray-600 mt-1">Manage all customer enquiries and track their progress.</p>
          </div>
        </header>

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            
            {/* Status Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setStatusFilter('all')}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Enquiries</p>
                      <p className="text-2xl font-bold text-gray-900">{getStatusCount('all')}</p>
                    </div>
                    <Badge variant="secondary">All</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setStatusFilter('new')}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">New</p>
                      <p className="text-2xl font-bold text-blue-600">{getStatusCount('new')}</p>
                    </div>
                    <Badge className="bg-blue-100 text-blue-800">New</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setStatusFilter('in-progress')}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">In Progress</p>
                      <p className="text-2xl font-bold text-yellow-600">{getStatusCount('in-progress')}</p>
                    </div>
                    <Badge className="bg-yellow-100 text-yellow-800">Progress</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setStatusFilter('completed')}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Completed</p>
                      <p className="text-2xl font-bold text-green-600">{getStatusCount('completed')}</p>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Done</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Search and Filter Bar */}
            <Card className="mb-6">
              <CardContent className="p-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Search by customer name, service, or email..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4 text-gray-400" />
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger className="w-40">
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
                </div>
              </CardContent>
            </Card>

            {/* Enquiries Table */}
            <Card>
              <CardHeader>
                <CardTitle>All Enquiries ({filteredEnquiries.length})</CardTitle>
                <CardDescription>
                  {statusFilter === 'all' 
                    ? 'All customer enquiries across all services'
                    : `Showing ${statusFilter.replace('-', ' ')} enquiries`
                  }
                </CardDescription>
              </CardHeader>
              <CardContent>
                <EnquiryTable enquiries={filteredEnquiries} setEnquiries={setEnquiries} />
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminEnquiries;
