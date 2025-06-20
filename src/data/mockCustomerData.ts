
import { Customer, CustomerDocument, CustomerService } from '@/types/customer';

export const mockCustomers: Customer[] = [
  {
    id: 'cust-1',
    name: 'Ahmed Al Mansouri',
    email: 'ahmed@example.com',
    phone: '+971501234567',
    whatsapp: '+971501234567',
    emiratesId: '784-1990-1234567-1',
    createdAt: '2024-01-15T10:30:00Z',
    lastLogin: '2024-06-16T14:20:00Z'
  },
  {
    id: 'cust-2',
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    phone: '+971507654321',
    emiratesId: '784-1985-7654321-2',
    createdAt: '2024-02-20T09:15:00Z',
    lastLogin: '2024-06-15T16:45:00Z'
  }
];

export const mockCustomerDocuments: CustomerDocument[] = [
  {
    id: 'doc-1',
    customerId: 'cust-1',
    title: 'UAE Driving License',
    type: 'license',
    expiryDate: '2025-03-15',
    issueDate: '2023-03-15',
    documentNumber: 'DL-12345678',
    status: 'active',
    uploadedAt: '2024-03-16T10:00:00Z'
  },
  {
    id: 'doc-2',
    customerId: 'cust-1',
    title: 'Emirates ID',
    type: 'emirates_id',
    expiryDate: '2024-12-20',
    issueDate: '2021-12-20',
    documentNumber: '784-1990-1234567-1',
    status: 'expiring_soon',
    uploadedAt: '2024-01-20T14:30:00Z'
  },
  {
    id: 'doc-3',
    customerId: 'cust-1',
    title: 'Trade License',
    type: 'certificate',
    expiryDate: '2024-08-30',
    issueDate: '2023-08-30',
    documentNumber: 'TL-987654321',
    status: 'expiring_soon',
    uploadedAt: '2024-02-10T11:15:00Z'
  }
];

export const mockCustomerServices: CustomerService[] = [
  {
    id: 'service-1',
    customerId: 'cust-1',
    serviceType: 'emirates_id_renewal',
    title: 'Emirates ID Renewal',
    status: 'in_progress',
    submittedAt: '2024-06-10T09:00:00Z',
    estimatedCompletion: '2024-06-20T17:00:00Z',
    trackingNumber: 'TRK-2024-001',
    notes: 'Documents submitted to GDRFA'
  },
  {
    id: 'service-2',
    customerId: 'cust-1',
    serviceType: 'trade_license_renewal',
    title: 'Trade License Renewal',
    status: 'pending',
    submittedAt: '2024-06-15T14:30:00Z',
    estimatedCompletion: '2024-06-25T17:00:00Z',
    trackingNumber: 'TRK-2024-002',
    notes: 'Waiting for initial review'
  },
  {
    id: 'service-3',
    customerId: 'cust-1',
    serviceType: 'family_visa',
    title: 'Family Visa Application',
    status: 'completed',
    submittedAt: '2024-05-20T10:00:00Z',
    completedAt: '2024-06-05T16:30:00Z',
    trackingNumber: 'TRK-2024-003',
    notes: 'Visa approved and collected'
  }
];
