
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Eye, MoreHorizontal, Search, Filter } from 'lucide-react';
import StatusUpdateModal from './StatusUpdateModal';

interface Enquiry {
  id: string;
  service: string;
  customerName: string;
  email: string;
  phone: string;
  submissionDate: string;
  status: 'new' | 'in-progress' | 'completed' | 'rejected';
  uploadedFiles: Array<{ name: string; type: string; size: string }>;
  formData: Record<string, string>;
}

interface EnquiryTableProps {
  enquiries: Enquiry[];
  setEnquiries: React.Dispatch<React.SetStateAction<Enquiry[]>>;
}

const EnquiryTable: React.FC<EnquiryTableProps> = ({ enquiries, setEnquiries }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      new: { label: 'New', variant: 'default' as const, className: 'bg-blue-100 text-blue-800' },
      'in-progress': { label: 'In Progress', variant: 'secondary' as const, className: 'bg-yellow-100 text-yellow-800' },
      completed: { label: 'Completed', variant: 'default' as const, className: 'bg-green-100 text-green-800' },
      rejected: { label: 'Rejected', variant: 'destructive' as const, className: 'bg-red-100 text-red-800' },
    };

    const config = statusConfig[status as keyof typeof statusConfig];
    return (
      <Badge variant={config.variant} className={config.className}>
        {config.label}
      </Badge>
    );
  };

  const filteredEnquiries = enquiries.filter(enquiry => {
    const matchesSearch = 
      enquiry.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      enquiry.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      enquiry.service.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || enquiry.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleStatusUpdate = (enquiryId: string, newStatus: Enquiry['status']) => {
    setEnquiries(prev => 
      prev.map(enquiry => 
        enquiry.id === enquiryId 
          ? { ...enquiry, status: newStatus }
          : enquiry
      )
    );
    setIsStatusModalOpen(false);
    setSelectedEnquiry(null);
  };

  return (
    <div className="space-y-4">
      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search by name, email, or service..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-full sm:w-auto">
              <Filter className="mr-2 h-4 w-4" />
              Filter by Status
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setStatusFilter('all')}>All Status</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setStatusFilter('new')}>New</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setStatusFilter('in-progress')}>In Progress</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setStatusFilter('completed')}>Completed</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setStatusFilter('rejected')}>Rejected</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer</TableHead>
              <TableHead>Service</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Files</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredEnquiries.map((enquiry) => (
              <TableRow key={enquiry.id}>
                <TableCell className="font-medium">{enquiry.customerName}</TableCell>
                <TableCell>{enquiry.service}</TableCell>
                <TableCell>
                  <div className="text-sm">
                    <div>{enquiry.email}</div>
                    <div className="text-gray-500">{enquiry.phone}</div>
                  </div>
                </TableCell>
                <TableCell>{enquiry.submissionDate}</TableCell>
                <TableCell>{getStatusBadge(enquiry.status)}</TableCell>
                <TableCell>
                  <Badge variant="outline">
                    {enquiry.uploadedFiles.length} files
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => navigate(`/admin/enquiry/${enquiry.id}`)}>
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => {
                          setSelectedEnquiry(enquiry);
                          setIsStatusModalOpen(true);
                        }}
                      >
                        Update Status
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {filteredEnquiries.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No enquiries found matching your criteria.
        </div>
      )}

      {/* Status Update Modal */}
      {selectedEnquiry && (
        <StatusUpdateModal
          enquiry={selectedEnquiry}
          isOpen={isStatusModalOpen}
          onClose={() => {
            setIsStatusModalOpen(false);
            setSelectedEnquiry(null);
          }}
          onUpdate={handleStatusUpdate}
        />
      )}
    </div>
  );
};

export default EnquiryTable;
