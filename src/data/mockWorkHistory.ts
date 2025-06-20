
import { WorkHistoryItem } from '@/types/workHistory';

export const mockWorkHistory: WorkHistoryItem[] = [
  {
    id: '1',
    clientName: 'Ahmed Ali',
    category: 'visa',
    subcategory: 'family-visa',
    description: 'Family visa application for spouse',
    assignedTo: 'Sarah Johnson',
    employeeId: 'emp001',
    status: 'completed',
    startDate: '2024-01-15',
    completedDate: '2024-01-20',
    amount: 850,
    duration: '5 days'
  },
  {
    id: '2',
    clientName: 'Mohammed Hassan',
    category: 'driving-licence',
    subcategory: 'car',
    description: 'Car driving license application',
    assignedTo: 'John Smith',
    employeeId: 'emp002',
    status: 'completed',
    startDate: '2024-01-18',
    completedDate: '2024-01-25',
    amount: 500,
    duration: '7 days'
  },
  {
    id: '3',
    clientName: 'Fatima Ahmed',
    category: 'trade-licence',
    subcategory: 'new-licence',
    description: 'New trade license for restaurant business',
    assignedTo: 'Emily Davis',
    employeeId: 'emp003',
    status: 'in-progress',
    startDate: '2024-01-20',
    completedDate: null,
    amount: 1200,
    duration: 'Ongoing'
  },
  {
    id: '4',
    clientName: 'Omar Ibrahim',
    category: 'visa',
    subcategory: 'employment',
    description: 'Employment visa renewal',
    assignedTo: 'Sarah Johnson',
    employeeId: 'emp001',
    status: 'completed',
    startDate: '2024-01-22',
    completedDate: '2024-01-28',
    amount: 650,
    duration: '6 days'
  },
  {
    id: '5',
    clientName: 'Aisha Mohamed',
    category: 'driving-licence',
    subcategory: 'golden',
    description: 'Golden chance driving license',
    assignedTo: 'John Smith',
    employeeId: 'emp002',
    status: 'pending',
    startDate: '2024-01-25',
    completedDate: null,
    amount: 750,
    duration: 'Not started'
  }
];
