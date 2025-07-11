
import { Car } from 'lucide-react';
import { Service } from '@/types/service';

export const drivingLicenseServices: Service[] = [
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
    documentRequirements: [
      'Emirates ID copy',
      'Visa copy',
      'Photo with white background (passport size)',
      'Email ID',
      'Phone number',
      'Eye test certificate (if available)'
    ],
    eyeTestInfo: {
      required: true,
      helpAvailable: true,
      note: 'Eye test is mandatory. If you need help with the eye test, you can still upload documents and contact us for advice.'
    },
    steps: [
      {
        id: 1,
        title: 'License Type',
        type: 'select',
        label: 'Select license type',
        required: true,
        options: ['Automatic', 'Manual']
      },
      {
        id: 2,
        title: 'Emirates ID',
        type: 'file',
        label: 'Upload Emirates ID copy',
        required: true,
        accept: '.pdf,.jpg,.png'
      },
      {
        id: 3,
        title: 'Visa Copy',
        type: 'file',
        label: 'Upload visa copy',
        required: true,
        accept: '.pdf,.jpg,.png'
      },
      {
        id: 4,
        title: 'Photo',
        type: 'file',
        label: 'Upload photo with white background (passport size)',
        required: true,
        accept: '.jpg,.png'
      },
      {
        id: 5,
        title: 'Email',
        type: 'email',
        label: 'Your email address',
        placeholder: 'your.email@example.com',
        required: true
      },
      {
        id: 6,
        title: 'Phone',
        type: 'tel',
        label: 'Your phone number',
        placeholder: '+971 XX XXX XXXX',
        required: true
      },
      {
        id: 7,
        title: 'Eye Test',
        type: 'select',
        label: 'Eye test status',
        required: true,
        options: ['Need help with eye test', 'Will complete eye test myself', 'Already completed']
      }
    ]
  }
];
