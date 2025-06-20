
export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  whatsapp?: string;
  emiratesId?: string;
  createdAt: string;
  lastLogin?: string;
}

export interface CustomerDocument {
  id: string;
  customerId: string;
  title: string;
  type: 'passport' | 'emirates_id' | 'visa' | 'license' | 'certificate' | 'other';
  expiryDate?: string;
  issueDate?: string;
  documentNumber?: string;
  status: 'active' | 'expired' | 'expiring_soon';
  fileUrl?: string;
  uploadedAt: string;
}

export interface CustomerService {
  id: string;
  customerId: string;
  serviceType: string;
  title: string;
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  submittedAt: string;
  completedAt?: string;
  estimatedCompletion?: string;
  notes?: string;
  trackingNumber: string;
}
