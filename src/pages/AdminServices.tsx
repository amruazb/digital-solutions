
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Edit, Trash2, FileText, Eye } from 'lucide-react';

// Mock services data
const mockServices = [
  {
    id: '1',
    name: 'Driving License - Golden Chance',
    description: 'Complete driving license assistance with golden chance booking',
    category: 'Transportation',
    isActive: true,
    enquiriesCount: 15,
    steps: ['Upload Visa Copy', 'Upload Emirates ID', 'Email ID', 'Phone Number', 'Select Type', 'Eye Test Done']
  },
  {
    id: '2',
    name: 'Family Visa Typing',
    description: 'Professional family visa typing and documentation services',
    category: 'Immigration',
    isActive: true,
    enquiriesCount: 8,
    steps: ['Passport Copy', 'Salary Certificate', 'Email', 'Phone']
  },
  {
    id: '3',
    name: 'Trade License Assistance',
    description: 'Complete trade license registration and renewal services',
    category: 'Business',
    isActive: true,
    enquiriesCount: 5,
    steps: ['Business Plan', 'Email', 'Phone']
  },
  {
    id: '4',
    name: 'Certificate Attestation',
    description: 'Document attestation services for various certificates',
    category: 'Documentation',
    isActive: false,
    enquiriesCount: 2,
    steps: ['Certificate Upload', 'Attestation Type', 'Contact Info']
  }
];

const AdminServices = () => {
  const navigate = useNavigate();
  const [services, setServices] = useState(mockServices);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [newService, setNewService] = useState({
    name: '',
    description: '',
    category: '',
    steps: []
  });

  React.useEffect(() => {
    const adminSession = localStorage.getItem('adminSession');
    if (!adminSession) {
      navigate('/admin/login');
    }
  }, [navigate]);

  const handleToggleStatus = (serviceId: string) => {
    setServices(services.map(service => 
      service.id === serviceId 
        ? { ...service, isActive: !service.isActive }
        : service
    ));
  };

  const handleDeleteService = (serviceId: string) => {
    setServices(services.filter(service => service.id !== serviceId));
  };

  const stats = {
    total: services.length,
    active: services.filter(s => s.isActive).length,
    inactive: services.filter(s => !s.isActive).length,
    totalEnquiries: services.reduce((sum, service) => sum + service.enquiriesCount, 0)
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <AdminSidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Services Management</h1>
                <p className="text-gray-600 mt-1">Manage your typing center services and enquiry forms.</p>
              </div>
              <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <Plus className="h-4 w-4 mr-2" />
                    Add New Service
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Add New Service</DialogTitle>
                    <DialogDescription>
                      Create a new service with custom enquiry form steps.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Service Name</label>
                      <Input 
                        placeholder="e.g., Visa Application Typing"
                        value={newService.name}
                        onChange={(e) => setNewService({...newService, name: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Description</label>
                      <Textarea 
                        placeholder="Brief description of the service..."
                        value={newService.description}
                        onChange={(e) => setNewService({...newService, description: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Category</label>
                      <Input 
                        placeholder="e.g., Immigration, Business, Transportation"
                        value={newService.category}
                        onChange={(e) => setNewService({...newService, category: e.target.value})}
                      />
                    </div>
                    <div className="flex gap-2 pt-4">
                      <Button onClick={() => setIsAddModalOpen(false)} variant="outline" className="flex-1">
                        Cancel
                      </Button>
                      <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
                        Create Service
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
                  <CardTitle className="text-sm font-medium">Total Services</CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.total}</div>
                  <p className="text-xs text-muted-foreground">Available services</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Services</CardTitle>
                  <Badge className="bg-green-100 text-green-800">Live</Badge>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">{stats.active}</div>
                  <p className="text-xs text-muted-foreground">Currently offered</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Inactive Services</CardTitle>
                  <Badge variant="secondary">Paused</Badge>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-600">{stats.inactive}</div>
                  <p className="text-xs text-muted-foreground">Temporarily disabled</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Enquiries</CardTitle>
                  <Eye className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-600">{stats.totalEnquiries}</div>
                  <p className="text-xs text-muted-foreground">Across all services</p>
                </CardContent>
              </Card>
            </div>

            {/* Services Table */}
            <Card>
              <CardHeader>
                <CardTitle>All Services</CardTitle>
                <CardDescription>
                  Manage your typing center services and their enquiry forms.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Service Name</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Enquiries</TableHead>
                      <TableHead>Steps</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {services.map((service) => (
                      <TableRow key={service.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{service.name}</div>
                            <div className="text-sm text-gray-500">{service.description}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{service.category}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge 
                            className={service.isActive 
                              ? "bg-green-100 text-green-800" 
                              : "bg-gray-100 text-gray-800"
                            }
                          >
                            {service.isActive ? 'Active' : 'Inactive'}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <span className="font-medium">{service.enquiriesCount}</span>
                        </TableCell>
                        <TableCell>
                          <span className="text-sm text-gray-600">{service.steps.length} steps</span>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleToggleStatus(service.id)}
                            >
                              {service.isActive ? 'Disable' : 'Enable'}
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="text-red-600 hover:text-red-700"
                              onClick={() => handleDeleteService(service.id)}
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

export default AdminServices;
