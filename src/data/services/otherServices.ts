
import { Shield, Heart, Globe, Home, Plane } from 'lucide-react';
import { Service } from '@/types/service';

export const otherServices: Service[] = [
  {
    id: 'attestation',
    title: 'Certificate Attestation Services',
    description: 'Document attestation services for UAE and international use including MOFA and embassy',
    price: 'AED 250',
    duration: '2-3 days',
    popular: false,
    color: 'bg-indigo-600',
    icon: Shield,
    category: 'attestation',
    features: [
      'Birth Certificate Attestation',
      'Degree Certificate Attestation',
      'Marriage Certificate Attestation',
      'MOFA Assistance',
      'Embassy Attestations',
      'Police Clearance Certificate'
    ],
    steps: [
      {
        id: 1,
        title: 'Certificate Type',
        type: 'select',
        label: 'Select certificate type',
        required: true,
        options: ['Birth Certificate', 'Degree Certificate', 'Marriage Certificate', 'Police Clearance', 'Other']
      },
      {
        id: 2,
        title: 'Upload Certificate',
        type: 'file',
        label: 'Upload certificate for attestation',
        required: true,
        accept: '.pdf,.jpg,.png'
      },
      {
        id: 3,
        title: 'Attestation Level',
        type: 'select',
        label: 'Select attestation level',
        required: true,
        options: ['UAE Ministry Only', 'Embassy Only', 'Both MOFA & Embassy']
      }
    ]
  },
  {
    id: 'health-insurance',
    title: 'Health Insurance & Daman Services',
    description: 'Complete health insurance applications including Daman typing and medical applications',
    price: 'AED 150',
    duration: '1-2 days',
    popular: false,
    color: 'bg-red-600',
    icon: Heart,
    category: 'health-insurance',
    features: [
      'New Daman Applications',
      'Insurance Renewals',
      'DHA/HAAD Portal Assistance',
      'Visa-linked Medical Apps',
      'Investor Insurance',
      'Family Medical Coverage'
    ],
    steps: [
      {
        id: 1,
        title: 'Insurance Type',
        type: 'select',
        label: 'Select insurance service',
        required: true,
        options: ['New Daman Application', 'Insurance Renewal', 'DHA Registration', 'Investor Insurance', 'Family Coverage']
      },
      {
        id: 2,
        title: 'Personal Documents',
        type: 'file',
        label: 'Upload Emirates ID and visa',
        required: true,
        accept: '.pdf,.jpg,.png'
      },
      {
        id: 3,
        title: 'Medical Records',
        type: 'file',
        label: 'Upload any existing medical records (optional)',
        required: false,
        accept: '.pdf,.jpg,.png'
      }
    ]
  },
  {
    id: 'legal-translation',
    title: 'Legal Translation Services',
    description: 'Certified translation services for legal documents, certificates, and official papers',
    price: 'AED 120',
    duration: '24 hours',
    popular: false,
    color: 'bg-teal-600',
    icon: Globe,
    category: 'translation',
    features: [
      'Legal Document Translation',
      'Certificate Translation',
      'Medical Report Translation',
      'Court Document Translation',
      'Arabic ↔ English',
      'Certified & Notarized'
    ],
    steps: [
      {
        id: 1,
        title: 'Document Type',
        type: 'select',
        label: 'Select document type',
        required: true,
        options: ['Legal Documents', 'Certificates', 'Medical Reports', 'Court Documents', 'Other']
      },
      {
        id: 2,
        title: 'Upload Document',
        type: 'file',
        label: 'Upload document for translation',
        required: true,
        accept: '.pdf,.jpg,.png'
      },
      {
        id: 3,
        title: 'Translation Direction',
        type: 'select',
        label: 'Translation direction',
        required: true,
        options: ['Arabic to English', 'English to Arabic']
      }
    ]
  },
  {
    id: 'tenancy-contract',
    title: 'Tenancy & Rental Contracts',
    description: 'Professional tenancy contract drafting, Ejari assistance, and rental agreements',
    price: 'AED 125',
    duration: '1 day',
    popular: false,
    color: 'bg-yellow-600',
    icon: Home,
    category: 'rental-services',
    features: [
      'Tenancy Contract Drafting',
      'Room Rental Agreements',
      'Ejari/Tawtheeq Guidance',
      'Notice to Vacate Letters',
      'Rental Dispute Letters',
      'Lease Renewal Contracts'
    ],
    steps: [
      {
        id: 1,
        title: 'Contract Type',
        type: 'select',
        label: 'Select contract type',
        required: true,
        options: ['New Tenancy Contract', 'Room Rental Agreement', 'Contract Renewal', 'Notice to Vacate', 'Ejari Registration']
      },
      {
        id: 2,
        title: 'Property Details',
        type: 'text',
        label: 'Property address and details',
        placeholder: 'Enter complete property address',
        required: true
      },
      {
        id: 3,
        title: 'Parties Documents',
        type: 'file',
        label: 'Upload landlord and tenant documents',
        required: true,
        accept: '.pdf,.jpg,.png'
      }
    ]
  },
  {
    id: 'travel-immigration',
    title: 'Travel & Immigration Services',
    description: 'Tourist visa assistance, exit permits, and immigration-related document typing',
    price: 'AED 180',
    duration: '1-3 days',
    popular: false,
    color: 'bg-cyan-600',
    icon: Plane,
    category: 'travel-immigration',
    features: [
      'Tourist Visa Assistance',
      'Exit/Entry Permit Typing',
      'Overstay Fine Inquiry',
      'Immigration Approval Letters',
      'Travel Document Typing',
      'Visa Extension Applications'
    ],
    steps: [
      {
        id: 1,
        title: 'Service Type',
        type: 'select',
        label: 'Select travel/immigration service',
        required: true,
        options: ['Tourist Visa', 'Exit Permit', 'Entry Permit', 'Visa Extension', 'Immigration Letter', 'Overstay Inquiry']
      },
      {
        id: 2,
        title: 'Travel Documents',
        type: 'file',
        label: 'Upload passport and relevant documents',
        required: true,
        accept: '.pdf,.jpg,.png'
      },
      {
        id: 3,
        title: 'Travel Details',
        type: 'text',
        label: 'Destination and travel purpose',
        placeholder: 'Enter travel destination and purpose',
        required: true
      }
    ]
  }
];
