
import { FileText, Car, Users, Building, Shield, Globe, Briefcase, Home, Scale, Clock, CreditCard, UserCheck, Heart, Plane, MapPin } from 'lucide-react';

export const services = [
  // Document Typing Services
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
  },
  
  // Company Setup & PRO Services
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
    steps: [
      {
        id: 1,
        title: 'Service Type',
        type: 'select',
        label: 'Select the service you need',
        required: true,
        options: ['New Trade License', 'License Renewal', 'MOA Services', 'Partner Changes', 'Company Liquidation']
      },
      {
        id: 2,
        title: 'Business Details',
        type: 'text',
        label: 'Business name and activity',
        placeholder: 'Enter proposed business name',
        required: true
      },
      {
        id: 3,
        title: 'Owner Documents',
        type: 'file',
        label: 'Upload owner passport and visa',
        required: true,
        accept: '.pdf,.jpg,.png'
      }
    ]
  },

  // Family & Visa Services
  {
    id: 'family-visa',
    title: 'Family & Visa Services',
    description: 'Complete family visa applications, renewals, and NOC typing services',
    price: 'AED 199',
    duration: '1-2 days',
    popular: true,
    color: 'bg-green-600',
    icon: Users,
    category: 'visa-services',
    features: [
      'Family Visa Applications',
      'Visa Renewal & Cancellation',
      'NOC Typing for Sponsoring',
      'Maid Visa Typing',
      'Change of Status Applications',
      'Travel Permits for Minors'
    ],
    steps: [
      {
        id: 1,
        title: 'Service Type',
        type: 'select',
        label: 'Select visa service type',
        required: true,
        options: ['New Family Visa', 'Visa Renewal', 'Visa Cancellation', 'Maid Visa', 'Change of Status', 'Travel Permit']
      },
      {
        id: 2,
        title: 'Sponsor Documents',
        type: 'file',
        label: 'Upload sponsor passport and visa',
        required: true,
        accept: '.pdf,.jpg,.png'
      },
      {
        id: 3,
        title: 'Family Documents',
        type: 'file',
        label: 'Upload family member documents',
        required: true,
        accept: '.pdf,.jpg,.png'
      }
    ]
  },

  // Driving License Services
  {
    id: 'driving-license',
    title: 'Driving License - Golden Chance',
    description: 'Complete driving license services with golden chance booking and documentation',
    price: 'AED 299',
    duration: '2-3 days',
    popular: true,
    color: 'bg-orange-600',
    icon: Car,
    category: 'driving-license',
    features: [
      'Golden Chance Booking',
      'New License File Opening',
      'Eye Test Booking Help',
      'Traffic File Transfer',
      'Driving Class Booking',
      'Foreign License Translation'
    ],
    steps: [
      {
        id: 1,
        title: 'Service Type',
        type: 'select',
        label: 'Select driving license service',
        required: true,
        options: ['Golden Chance', 'New License', 'File Transfer', 'Eye Test Booking', 'Foreign License Translation']
      },
      {
        id: 2,
        title: 'Upload Documents',
        type: 'file',
        label: 'Upload visa copy and Emirates ID',
        required: true,
        accept: '.pdf,.jpg,.png'
      },
      {
        id: 3,
        title: 'License Type',
        type: 'select',
        label: 'Select license type',
        required: true,
        options: ['Automatic', 'Manual']
      }
    ]
  },

  // Attestation Services
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

  // Health Insurance Services
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

  // Legal Translation
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

  // Tenancy Contracts
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

  // Travel & Immigration
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

// Group services by category for better organization
export const serviceCategories = {
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

// Popular services for homepage display
export const popularServices = services.filter(service => service.popular);

// All services grouped by category
export const servicesByCategory = Object.keys(serviceCategories).reduce((acc, category) => {
  acc[category] = services.filter(service => service.category === category);
  return acc;
}, {});
