
import { Briefcase } from 'lucide-react';
import { Service } from '@/types/service';

export const businessSetupServices: Service[] = [
  {
    id: 'trade-license',
    title: 'Trade License & Company Setup',
    description: 'Complete business setup services including trade license, MOA drafting, and renewals',
    price: 'AED 499',
    duration: '3-5 days',
    popular: true,
    color: 'bg-purple-600',
    icon: Briefcase,
    category: 'business-setup',
    features: [
      'Trade Name Reservation',
      'New License Application',
      'MOA Drafting & Renewal',
      'Add/Remove Partners',
      'Company Liquidation',
      'License Renewal Reminders'
    ],
    documentRequirements: [
      '3-5 proposed trade names (in order of preference)',
      'Emirates ID or Visa copy',
      'Passport copy',
      'Home address proof',
      'Business activity details'
    ],
    steps: [
      {
        id: 1,
        title: 'Trade Names',
        type: 'text',
        label: 'Provide 3-5 trade names in order of preference',
        placeholder: 'Enter trade names separated by commas',
        required: true
      },
      {
        id: 2,
        title: 'Emirates ID/Visa',
        type: 'file',
        label: 'Upload Emirates ID or Visa copy',
        required: true,
        accept: '.pdf,.jpg,.png'
      },
      {
        id: 3,
        title: 'Passport Copy',
        type: 'file',
        label: 'Upload passport copy',
        required: true,
        accept: '.pdf,.jpg,.png'
      },
      {
        id: 4,
        title: 'Home Address',
        type: 'text',
        label: 'Provide complete home address',
        placeholder: 'Enter your residential address',
        required: true
      }
    ]
  }
];
