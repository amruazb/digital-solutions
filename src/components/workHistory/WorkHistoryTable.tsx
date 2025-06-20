
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { WorkHistoryItem, CategoryKey } from '@/types/workHistory';
import { categories } from '@/constants/workHistoryConstants';
import { CheckCircle, Clock, AlertCircle, Calendar, User } from 'lucide-react';

interface WorkHistoryTableProps {
  workHistory: WorkHistoryItem[];
}

const WorkHistoryTable: React.FC<WorkHistoryTableProps> = ({ workHistory }) => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-100 text-green-800"><CheckCircle className="h-3 w-3 mr-1" />Completed</Badge>;
      case 'in-progress':
        return <Badge className="bg-blue-100 text-blue-800"><Clock className="h-3 w-3 mr-1" />In Progress</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800"><AlertCircle className="h-3 w-3 mr-1" />Pending</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Client</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Subcategory</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Employee</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Start Date</TableHead>
          <TableHead>Completed</TableHead>
          <TableHead>Duration</TableHead>
          <TableHead>Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {workHistory.map((work) => (
          <TableRow key={work.id}>
            <TableCell>
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-gray-400" />
                <span className="font-medium">{work.clientName}</span>
              </div>
            </TableCell>
            <TableCell>
              <Badge variant="outline">
                {categories[work.category]?.name || work.category}
              </Badge>
            </TableCell>
            <TableCell>
              <span className="text-sm text-gray-600">
                {categories[work.category]?.subcategories[work.subcategory] || work.subcategory}
              </span>
            </TableCell>
            <TableCell>
              <span className="text-sm">{work.description}</span>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-xs font-medium text-blue-600">
                    {work.assignedTo.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <span className="text-sm font-medium">{work.assignedTo}</span>
              </div>
            </TableCell>
            <TableCell>{getStatusBadge(work.status)}</TableCell>
            <TableCell>
              <div className="flex items-center gap-1 text-sm text-gray-600">
                <Calendar className="h-3 w-3" />
                {new Date(work.startDate).toLocaleDateString()}
              </div>
            </TableCell>
            <TableCell>
              {work.completedDate ? (
                <div className="flex items-center gap-1 text-sm text-gray-600">
                  <Calendar className="h-3 w-3" />
                  {new Date(work.completedDate).toLocaleDateString()}
                </div>
              ) : (
                <span className="text-sm text-gray-400">-</span>
              )}
            </TableCell>
            <TableCell>
              <Badge variant="outline" className="text-xs">
                {work.duration}
              </Badge>
            </TableCell>
            <TableCell>
              <span className="font-medium text-green-600">AED {work.amount}</span>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default WorkHistoryTable;
