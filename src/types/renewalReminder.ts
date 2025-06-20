
export interface RenewalDocument {
  id: string;
  clientId: string;
  clientName: string;
  clientPhone: string;
  documentType: DocumentType;
  documentNumber: string;
  issueDate: Date;
  expiryDate: Date;
  status: RenewalStatus;
  daysToExpiry: number;
  reminderSent: boolean;
  lastReminderDate?: Date;
  notes?: string;
}

export type DocumentType = 
  | 'labour-card'
  | 'trade-licence'
  | 'driving-licence'
  | 'establishment-card'
  | 'echannel'
  | 'visa'
  | 'emirates-id'
  | 'passport'
  | 'health-insurance'
  | 'vehicle-registration';

export type RenewalStatus = 'active' | 'expiring-soon' | 'expired' | 'renewed';

export interface RenewalFilters {
  documentType: DocumentType | 'all';
  status: RenewalStatus | 'all';
  daysToExpiry: number | 'all';
  searchTerm: string;
}
