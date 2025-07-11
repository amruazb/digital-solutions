
import { FileText } from 'lucide-react';
import { Service } from '@/types/service';

export const documentTypingServices: Service[] = [
  {
    id: 'consent-letters',
    title: 'Consent & Authorization Letters',
    description: 'Professional typing for consent letters, authorization letters, and custom documentation',
    price: 'AED 50',
    duration: '2 hours',
    popular: false,
    color: 'bg-blue-600',
    icon: FileText,
    category: 'document-typing',
    features: [
      'Consent Letter Typing',
      'Authorization Letters',
      'Termination Letters',
      'Employment Offer Letters',
      'Resignation Letters',
      'Custom Immigration Letters'
    ],
    documentRequirements: [
      'Personal details and contact information',
      'Specific purpose of the letter',
      'Relevant supporting documents'
    ],
    steps: [
      {
        id: 1,
        title: 'Letter Type',
        type: 'select',
        label: 'Select the type of letter needed',
        required: true,
        options: ['Consent Letter', 'Authorization Letter', 'Termination Letter', 'Employment Offer', 'Resignation Letter', 'Custom Letter']
      },
      {
        id: 2,
        title: 'Letter Details',
        type: 'text',
        label: 'Provide specific details for the letter',
        placeholder: 'Enter the purpose and specific requirements',
        required: true
      },
      {
        id: 3,
        title: 'Contact Information',
        type: 'tel',
        label: 'Your phone number',
        placeholder: '+971 XX XXX XXXX',
        required: true
      }
    ]
  }
];
