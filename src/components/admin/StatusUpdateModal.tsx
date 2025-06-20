
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';

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

interface StatusUpdateModalProps {
  enquiry: Enquiry;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (enquiryId: string, newStatus: Enquiry['status']) => void;
}

const StatusUpdateModal: React.FC<StatusUpdateModalProps> = ({
  enquiry,
  isOpen,
  onClose,
  onUpdate,
}) => {
  const [selectedStatus, setSelectedStatus] = useState<Enquiry['status']>(enquiry.status);
  const [notes, setNotes] = useState('');

  const handleUpdate = () => {
    onUpdate(enquiry.id, selectedStatus);
    // TODO: Save notes to backend
    console.log('Status updated:', { enquiryId: enquiry.id, status: selectedStatus, notes });
    onClose();
  };

  const statusOptions = [
    { value: 'new', label: 'New', description: 'Just received, not yet processed' },
    { value: 'in-progress', label: 'In Progress', description: 'Currently being worked on' },
    { value: 'completed', label: 'Completed', description: 'Task finished successfully' },
    { value: 'rejected', label: 'Rejected', description: 'Unable to process this request' },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Update Status</DialogTitle>
          <DialogDescription>
            Update the status for {enquiry.customerName}'s {enquiry.service} enquiry.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label className="text-base font-medium">Status</Label>
            <RadioGroup value={selectedStatus} onValueChange={(value) => setSelectedStatus(value as Enquiry['status'])}>
              {statusOptions.map((option) => (
                <div key={option.value} className="flex items-start space-x-2">
                  <RadioGroupItem value={option.value} id={option.value} className="mt-1" />
                  <div className="grid gap-1.5 leading-none">
                    <Label htmlFor={option.value} className="font-medium">
                      {option.label}
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      {option.description}
                    </p>
                  </div>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div>
            <Label htmlFor="notes">Notes (optional)</Label>
            <Textarea
              id="notes"
              placeholder="Add any additional notes about this status update..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="mt-1"
              rows={3}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleUpdate}>
            Update Status
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default StatusUpdateModal;
