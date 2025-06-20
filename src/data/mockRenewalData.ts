
import { RenewalDocument, DocumentType, RenewalStatus } from '@/types/renewalReminder';

const documentTypes: DocumentType[] = [
  'labour-card',
  'trade-licence', 
  'driving-licence',
  'establishment-card',
  'echannel',
  'visa',
  'emirates-id',
  'passport',
  'health-insurance',
  'vehicle-registration'
];

const clientNames = [
  'Ahmed Hassan',
  'Fatima Al-Zahra',
  'Muhammad Ali',
  'Sarah Johnson',
  'Raj Patel',
  'Maria Santos',
  'Omar Khalil',
  'Priya Sharma',
  'John Smith',
  'Aisha Abdullah'
];

// Generate mock renewal documents
export const mockRenewalDocuments: RenewalDocument[] = Array.from({ length: 50 }, (_, index) => {
  const issueDate = new Date();
  issueDate.setFullYear(issueDate.getFullYear() - Math.floor(Math.random() * 3) - 1);
  
  const expiryDate = new Date(issueDate);
  expiryDate.setFullYear(expiryDate.getFullYear() + Math.floor(Math.random() * 2) + 1);
  
  const today = new Date();
  const daysToExpiry = Math.ceil((expiryDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  
  let status: RenewalStatus = 'active';
  if (daysToExpiry < 0) status = 'expired';
  else if (daysToExpiry <= 30) status = 'expiring-soon';
  
  return {
    id: `renewal-${index + 1}`,
    clientId: `client-${index + 1}`,
    clientName: clientNames[index % clientNames.length],
    clientPhone: `+971 5${Math.floor(Math.random() * 9)} ${Math.floor(Math.random() * 999999).toString().padStart(6, '0')}`,
    documentType: documentTypes[index % documentTypes.length],
    documentNumber: `DOC${Math.floor(Math.random() * 999999).toString().padStart(6, '0')}`,
    issueDate,
    expiryDate,
    status,
    daysToExpiry,
    reminderSent: Math.random() > 0.7,
    lastReminderDate: Math.random() > 0.5 ? new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000) : undefined,
    notes: Math.random() > 0.7 ? 'Client contacted for renewal' : undefined
  };
});
