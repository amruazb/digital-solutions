
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  User, 
  FileText, 
  Clock, 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  Phone,
  Mail,
  LogOut,
  Upload,
  Download,
  Calendar
} from 'lucide-react';
import { mockCustomers, mockCustomerDocuments, mockCustomerServices } from '@/data/mockCustomerData';
import { useToast } from "@/hooks/use-toast";

const CustomerDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [customer, setCustomer] = useState(mockCustomers[0]);
  const [documents, setDocuments] = useState(mockCustomerDocuments);
  const [services, setServices] = useState(mockCustomerServices);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('customerLoggedIn');
    if (!isLoggedIn) {
      navigate('/customer/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('customerLoggedIn');
    localStorage.removeItem('customerId');
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account.",
    });
    navigate('/');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'expired': return 'bg-red-100 text-red-800';
      case 'expiring_soon': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in_progress': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      case 'in_progress': return <Clock className="w-4 h-4" />;
      case 'expired': case 'expiring_soon': return <AlertTriangle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const expiringDocuments = documents.filter(doc => doc.status === 'expiring_soon' || doc.status === 'expired');
  const activeServices = services.filter(service => service.status === 'pending' || service.status === 'in_progress');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-blue-600 text-white p-2 rounded-lg">
                <User className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Welcome, {customer.name}</h1>
                <p className="text-sm text-gray-600">Customer Dashboard</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm" onClick={() => navigate('/')}>
                Back to Home
              </Button>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Dashboard Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-blue-600">{documents.length}</p>
                  <p className="text-sm text-gray-600">Total Documents</p>
                </div>
                <FileText className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-yellow-600">{expiringDocuments.length}</p>
                  <p className="text-sm text-gray-600">Expiring Soon</p>
                </div>
                <AlertTriangle className="w-8 h-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-green-600">{activeServices.length}</p>
                  <p className="text-sm text-gray-600">Active Services</p>
                </div>
                <Clock className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-purple-600">100%</p>
                  <p className="text-sm text-gray-600">Data Security</p>
                </div>
                <Shield className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="documents" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="documents">My Documents</TabsTrigger>
            <TabsTrigger value="services">My Services</TabsTrigger>
            <TabsTrigger value="reminders">Reminders</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          <TabsContent value="documents">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>My Documents</CardTitle>
                    <CardDescription>Manage and track your important documents</CardDescription>
                  </div>
                  <Button>
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Document
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {documents.map((doc) => (
                    <div key={doc.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <FileText className="w-8 h-8 text-blue-600" />
                        <div>
                          <h3 className="font-semibold">{doc.title}</h3>
                          <p className="text-sm text-gray-600">
                            Document #: {doc.documentNumber}
                          </p>
                          {doc.expiryDate && (
                            <p className="text-sm text-gray-600">
                              Expires: {new Date(doc.expiryDate).toLocaleDateString()}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Badge className={getStatusColor(doc.status)}>
                          {doc.status.replace('_', ' ')}
                        </Badge>
                        <Button variant="outline" size="sm">
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="services">
            <Card>
              <CardHeader>
                <CardTitle>My Services</CardTitle>
                <CardDescription>Track the status of your submitted services</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {services.map((service) => (
                    <div key={service.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        {getStatusIcon(service.status)}
                        <div>
                          <h3 className="font-semibold">{service.title}</h3>
                          <p className="text-sm text-gray-600">
                            Tracking: {service.trackingNumber}
                          </p>
                          <p className="text-sm text-gray-600">
                            Submitted: {new Date(service.submittedAt).toLocaleDateString()}
                          </p>
                          {service.estimatedCompletion && (
                            <p className="text-sm text-gray-600">
                              Expected: {new Date(service.estimatedCompletion).toLocaleDateString()}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Badge className={getStatusColor(service.status)}>
                          {service.status.replace('_', ' ')}
                        </Badge>
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reminders">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Document Reminders
                </CardTitle>
                <CardDescription>Stay updated on document expiry dates</CardDescription>
              </CardHeader>
              <CardContent>
                {expiringDocuments.length > 0 ? (
                  <div className="space-y-4">
                    {expiringDocuments.map((doc) => (
                      <div key={doc.id} className="flex items-center justify-between p-4 border rounded-lg bg-yellow-50 border-yellow-200">
                        <div className="flex items-center space-x-4">
                          <AlertTriangle className="w-6 h-6 text-yellow-600" />
                          <div>
                            <h3 className="font-semibold text-yellow-800">{doc.title}</h3>
                            <p className="text-sm text-yellow-700">
                              Expires on: {new Date(doc.expiryDate!).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <Button size="sm" className="bg-yellow-600 hover:bg-yellow-700">
                          Renew Now
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">All Documents Up to Date</h3>
                    <p className="text-gray-600">No documents are expiring soon</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Manage your account details and preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Full Name</label>
                    <p className="mt-1 text-sm text-gray-900">{customer.name}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Email</label>
                    <p className="mt-1 text-sm text-gray-900">{customer.email}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Phone</label>
                    <p className="mt-1 text-sm text-gray-900">{customer.phone}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Emirates ID</label>
                    <p className="mt-1 text-sm text-gray-900">{customer.emiratesId || 'Not provided'}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">WhatsApp</label>
                    <p className="mt-1 text-sm text-gray-900">{customer.whatsapp || 'Not provided'}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Member Since</label>
                    <p className="mt-1 text-sm text-gray-900">
                      {new Date(customer.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="pt-6 border-t">
                  <Button className="mr-4">Edit Profile</Button>
                  <Button variant="outline">Change Password</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CustomerDashboard;
