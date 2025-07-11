
import { Users } from 'lucide-react';
import { Service } from '@/types/service';

export const visaServices: Service[] = [
  {
    id: 'visa-labour-works',
    title: 'Visa & Labour Works for Companies',
    description: 'Complete visa processing and labour department services for companies and employees',
    price: 'AED 499',
    duration: '3-7 days',
    popular: true,
    color: 'bg-emerald-600',
    icon: Users,
    category: 'visa-services',
    features: [
      'Employee Visa Processing',
      'Labour Card Applications',
      'Work Permit Processing',
      'Visa Renewals & Cancellations',
      'Labour Contract Typing',
      'Ministry of Labour Services'
    ],
    documentRequirements: [
      'Company trade license copy',
      'Employee passport copy',
      'Employee photo (white background)',
      'Educational certificates',
      'Medical fitness certificate',
      'Labour contract details'
    ],
    steps: [
      {
        id: 1,
        title: 'Service Type',
        type: 'select',
        label: 'Select visa/labour service',
        required: true,
        options: ['New Employee Visa', 'Labour Card', 'Work Permit', 'Visa Renewal', 'Visa Cancellation', 'Labour Contract']
      },
      {
        id: 2,
        title: 'Company Documents',
        type: 'file',
        label: 'Upload company trade license',
        required: true,
        accept: '.pdf,.jpg,.png'
      },
      {
        id: 3,
        title: 'Employee Passport',
        type: 'file',
        label: 'Upload employee passport copy',
        required: true,
        accept: '.pdf,.jpg,.png'
      },
      {
        id: 4,
        title: 'Employee Photo',
        type: 'file',
        label: 'Upload employee photo (white background)',
        required: true,
        accept: '.jpg,.png'
      }
    ]
  },
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
    documentRequirements: [
      'Sponsor passport and visa copy',
      'Family member passports',
      'Marriage certificate (attested)',
      'Birth certificates for children',
      'Salary certificate',
      'Bank statements'
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
  }
];
