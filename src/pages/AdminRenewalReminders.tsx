
import React, { useState, useMemo } from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  Bell, 
  Search, 
  Filter, 
  Calendar, 
  Phone, 
  FileText, 
  AlertTriangle, 
  Clock,
  CheckCircle,
  Plus,
  Download,
  Send
} from 'lucide-react';
import { mockRenewalDocuments } from '@/data/mockRenewalData';
import { RenewalDocument, DocumentType, RenewalStatus, RenewalFilters } from '@/types/renewalReminder';
import { format } from 'date-fns';

const AdminRenewalReminders = () => {
  const [filters, setFilters] = useState<RenewalFilters>({
    documentType: 'all',
    status: 'all',
    daysToExpiry: 'all',
    searchTerm: ''
  });

  // Filter documents based on current filters
  const filteredDocuments = useMemo(() => {
    return mockRenewalDocuments.filter(doc => {
      const matchesDocumentType = filters.documentType === 'all' || doc.documentType === filters.documentType;
      const matchesStatus = filters.status === 'all' || doc.status === filters.status;
      const matchesDaysToExpiry = filters.daysToExpiry === 'all' || 
        (filters.daysToExpiry === 30 && doc.daysToExpiry <= 30) ||
        (filters.daysToExpiry === 7 && doc.daysToExpiry <= 7);
      const matchesSearch = filters.searchTerm === '' || 
        doc.clientName.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        doc.documentNumber.toLowerCase().includes(filters.searchTerm.toLowerCase());

      return matchesDocumentType && matchesStatus && matchesDaysToExpiry && matchesSearch;
    });
  }, [filters]);

  // Calculate stats
  const stats = [
    {
      title: 'Total Documents',
      value: mockRenewalDocuments.length,
      icon: FileText,
      color: 'bg-blue-100 text-blue-800'
    },
    {
      title: 'Expiring Soon (≤30 days)',
      value: mockRenewalDocuments.filter(doc => doc.daysToExpiry <= 30 && doc.daysToExpiry > 0).length,
      icon: AlertTriangle,
      color: 'bg-yellow-100 text-yellow-800'
    },
    {
      title: 'Expired',
      value: mockRenewalDocuments.filter(doc => doc.daysToExpiry < 0).length,
      icon: Clock,
      color: 'bg-red-100 text-red-800'
    },
    {
      title: 'Active',
      value: mockRenewalDocuments.filter(doc => doc.daysToExpiry > 30).length,
      icon: CheckCircle,
      color: 'bg-green-100 text-green-800'
    }
  ];

  const getStatusBadge = (status: RenewalStatus, daysToExpiry: number) => {
    if (daysToExpiry < 0) {
      return <Badge variant="destructive">Expired</Badge>;
    } else if (daysToExpiry <= 7) {
      return <Badge className="bg-red-100 text-red-800">Critical</Badge>;
    } else if (daysToExpiry <= 30) {
      return <Badge className="bg-yellow-100 text-yellow-800">Expiring Soon</Badge>;
    } else {
      return <Badge className="bg-green-100 text-green-800">Active</Badge>;
    }
  };

  const handleSendReminder = (documentId: string) => {
    // TODO: Implement send reminder functionality
    console.log('Sending reminder for document:', documentId);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <AdminSidebar />
      
      <main className="flex-1 overflow-hidden">
        <div className="h-full overflow-y-auto">
          {/* Header */}
          <div className="bg-white border-b border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Bell className="h-6 w-6 text-blue-600" />
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Renewal Reminders</h1>
                  <p className="text-sm text-gray-600">Manage document expiry reminders and notifications</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Document
                </Button>
              </div>
            </div>
          </div>

          <div className="p-6 space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat) => (
                <Card key={stat.title}>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-lg ${stat.color}`}>
                        <stat.icon className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                        <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Filters */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Filter className="h-5 w-5" />
                  Filters
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Search</label>
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Search by name or document number..."
                        className="pl-10"
                        value={filters.searchTerm}
                        onChange={(e) => setFilters({...filters, searchTerm: e.target.value})}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Document Type</label>
                    <Select value={filters.documentType} onValueChange={(value) => setFilters({...filters, documentType: value as DocumentType | 'all'})}>
                      <SelectTrigger>
                        <SelectValue placeholder="All Types" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="labour-card">Labour Card</SelectItem>
                        <SelectItem value="trade-licence">Trade Licence</SelectItem>
                        <SelectItem value="driving-licence">Driving Licence</SelectItem>
                        <SelectItem value="establishment-card">Establishment Card</SelectItem>
                        <SelectItem value="echannel">E-Channel</SelectItem>
                        <SelectItem value="visa">Visa</SelectItem>
                        <SelectItem value="emirates-id">Emirates ID</SelectItem>
                        <SelectItem value="passport">Passport</SelectItem>
                        <SelectItem value="health-insurance">Health Insurance</SelectItem>
                        <SelectItem value="vehicle-registration">Vehicle Registration</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Status</label>
                    <Select value={filters.status} onValueChange={(value) => setFilters({...filters, status: value as RenewalStatus | 'all'})}>
                      <SelectTrigger>
                        <SelectValue placeholder="All Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="expiring-soon">Expiring Soon</SelectItem>
                        <SelectItem value="expired">Expired</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Days to Expiry</label>
                    <Select value={filters.daysToExpiry.toString()} onValueChange={(value) => setFilters({...filters, daysToExpiry: value === 'all' ? 'all' : parseInt(value)})}>
                      <SelectTrigger>
                        <SelectValue placeholder="All" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="7">≤ 7 days</SelectItem>
                        <SelectItem value="30">≤ 30 days</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Documents Table */}
            <Card>
              <CardHeader>
                <CardTitle>Documents ({filteredDocuments.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Client</TableHead>
                        <TableHead>Document Type</TableHead>
                        <TableHead>Document Number</TableHead>
                        <TableHead>Issue Date</TableHead>
                        <TableHead>Expiry Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Days to Expiry</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredDocuments.map((doc) => (
                        <TableRow key={doc.id}>
                          <TableCell>
                            <div>
                              <div className="font-medium">{doc.clientName}</div>
                              <div className="text-sm text-gray-500 flex items-center gap-1">
                                <Phone className="h-3 w-3" />
                                {doc.clientPhone}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="capitalize">
                            {doc.documentType.replace('-', ' ')}
                          </TableCell>
                          <TableCell className="font-mono text-sm">
                            {doc.documentNumber}
                          </TableCell>
                          <TableCell>
                            {format(doc.issueDate, 'dd/MM/yyyy')}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-gray-400" />
                              {format(doc.expiryDate, 'dd/MM/yyyy')}
                            </div>
                          </TableCell>
                          <TableCell>
                            {getStatusBadge(doc.status, doc.daysToExpiry)}
                          </TableCell>
                          <TableCell>
                            <span className={`font-medium ${
                              doc.daysToExpiry < 0 ? 'text-red-600' :
                              doc.daysToExpiry <= 7 ? 'text-red-500' :
                              doc.daysToExpiry <= 30 ? 'text-yellow-600' :
                              'text-green-600'
                            }`}>
                              {doc.daysToExpiry < 0 ? `Expired ${Math.abs(doc.daysToExpiry)} days ago` : `${doc.daysToExpiry} days`}
                            </span>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => handleSendReminder(doc.id)}
                                disabled={doc.reminderSent}
                              >
                                <Send className="h-3 w-3 mr-1" />
                                {doc.reminderSent ? 'Sent' : 'Remind'}
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminRenewalReminders;
