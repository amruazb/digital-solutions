
import { FileText, Car, Users, Building, Shield, Globe, Briefcase, Home, Plane, Heart } from 'lucide-react';
import { ServiceCategory } from '@/types/service';

export const serviceCategories: Record<string, ServiceCategory> = {
  'document-typing': {
    name: 'Document Typing',
    description: 'Professional letter and document typing services',
    icon: FileText
  },
  'business-setup': {
    name: 'Business Setup & PRO',
    description: 'Complete business registration and PRO services',
    icon: Briefcase
  },
  'visa-services': {
    name: 'Visa Services',
    description: 'Family visa, renewals, and sponsorship services',
    icon: Users
  },
  'driving-license': {
    name: 'Driving License',
    description: 'Driving license applications and golden chance services',
    icon: Car
  },
  'attestation': {
    name: 'Attestation Services',
    description: 'Certificate attestation and MOFA services',
    icon: Shield
  },
  'health-insurance': {
    name: 'Health Insurance',
    description: 'Daman applications and medical insurance services',
    icon: Heart
  },
  'translation': {
    name: 'Translation Services',
    description: 'Legal and certified document translation',
    icon: Globe
  },
  'rental-services': {
    name: 'Rental & Real Estate',
    description: 'Tenancy contracts and rental agreements',
    icon: Home
  },
  'travel-immigration': {
    name: 'Travel & Immigration',
    description: 'Tourist visa and immigration document services',
    icon: Plane
  }
};
