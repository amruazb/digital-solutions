
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { 
  ArrowLeft, 
  Download, 
  FileText, 
  Image, 
  User, 
  Mail, 
  Phone, 
  Calendar,
  MessageSquare
} from 'lucide-react';

// Mock data - replace with actual API call
const mockEnquiry = {
  id: '1',
  service: 'Driving License - Golden Chance',
  customerName: 'Ahmed Al Mansouri',
  email: 'ahmed@email.com',
  phone: '+971501234567',
  submissionDate: '2024-06-14',
  status: 'new' as const,
  uploadedFiles: [
    { name: 'visa_copy.pdf', type: 'pdf', size: '2.4 MB', url: '/uploads/visa_copy.pdf' },
    { name: 'emirates_id.jpg', type: 'image', size: '1.8 MB', url: '/uploads/emirates_id.jpg' },
    { name: 'existing_license.pdf', type: 'pdf', size: '1.2 MB', url: '/uploads/existing_license.pdf' }
  ],
  formData: {
    'Upload Visa Copy': 'visa_copy.pdf',
    'Upload Emirates ID': 'emirates_id.jpg',
    'Upload Existing Driving License': 'existing_license.pdf',
    'Email ID': 'ahmed@email.com',
    'Phone Number': '+971501234567',
    'Select Type': 'Automatic',
    'Eye Test Done': 'Yes'
  },
  notes: []
};

const EnquiryDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [enquiry, setEnquiry] = useState(mockEnquiry);
  const [newNote, setNewNote] = useState('');

  useEffect(() => {
    const adminSession = localStorage.getItem('adminSession');
    if (!adminSession) {
      navigate('/admin/login');
      return;
    }

    // TODO: Fetch enquiry data from API
    console.log('Loading enquiry with ID:', id);
  }, [id, navigate]);

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      new: { label: 'New', className: 'bg-blue-100 text-blue-800' },
      'in-progress': { label: 'In Progress', className: 'bg-yellow-100 text-yellow-800' },
      completed: { label: 'Completed', className: 'bg-green-100 text-green-800' },
      rejected: { label: 'Rejected', className: 'bg-red-100 text-red-800' },
    };

    const config = statusConfig[status as keyof typeof statusConfig];
    return (
      <Badge className={config.className}>
        {config.label}
      </Badge>
    );
  };

  const getFileIcon = (type: string) => {
    return type === 'pdf' ? <FileText className="h-5 w-5" /> : <Image className="h-5 w-5" />;
  };

  const handleDownloadFile = (file: any) => {
    // TODO: Implement actual file download
    console.log('Downloading file:', file.name);
    alert(`Downloading ${file.name} - Feature to be implemented with backend`);
  };

  const handleAddNote = () => {
    if (newNote.trim()) {
      // TODO: Save note to backend
      console.log('Adding note:', newNote);
      setNewNote('');
      alert('Note added successfully!');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <AdminSidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                onClick={() => navigate('/admin/dashboard')}
                className="flex items-center space-x-2"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back to Dashboard</span>
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Enquiry Details</h1>
                <p className="text-gray-600">#{enquiry.id}</p>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Customer & Service Info */}
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center space-x-2">
                        <User className="h-5 w-5" />
                        <span>Customer Information</span>
                      </CardTitle>
                      {getStatusBadge(enquiry.status)}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label className="text-sm font-medium text-gray-500">Customer Name</Label>
                        <p className="text-lg font-semibold">{enquiry.customerName}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-gray-500">Service</Label>
                        <p className="text-lg font-semibold">{enquiry.service}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Mail className="h-4 w-4 text-gray-400" />
                        <span>{enquiry.email}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Phone className="h-4 w-4 text-gray-400" />
                        <span>{enquiry.phone}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        <span>Submitted on {enquiry.submissionDate}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Form Data */}
                <Card>
                  <CardHeader>
                    <CardTitle>Form Responses</CardTitle>
                    <CardDescription>Customer provided information</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {Object.entries(enquiry.formData).map(([question, answer]) => (
                        <div key={question}>
                          <Label className="text-sm font-medium text-gray-500">{question}</Label>
                          <p className="text-sm mt-1">{answer}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Notes Section */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <MessageSquare className="h-5 w-5" />
                      <span>Notes</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="note">Add a note</Label>
                      <Textarea
                        id="note"
                        placeholder="Add notes about this enquiry..."
                        value={newNote}
                        onChange={(e) => setNewNote(e.target.value)}
                        rows={3}
                      />
                      <Button 
                        onClick={handleAddNote}
                        className="mt-2"
                        disabled={!newNote.trim()}
                      >
                        Add Note
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Uploaded Files */}
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Uploaded Documents</CardTitle>
                    <CardDescription>
                      {enquiry.uploadedFiles.length} files uploaded
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {enquiry.uploadedFiles.map((file, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center space-x-3">
                            {getFileIcon(file.type)}
                            <div>
                              <p className="font-medium text-sm">{file.name}</p>
                              <p className="text-xs text-gray-500">{file.size}</p>
                            </div>
                          </div>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDownloadFile(file)}
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default EnquiryDetail;
