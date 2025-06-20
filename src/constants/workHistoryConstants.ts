
import { CategoryKey, CategoryInfo } from '@/types/workHistory';

export const categories: Record<CategoryKey, CategoryInfo> = {
  'visa': {
    name: 'Visa Works',
    subcategories: {
      'family-visa': 'Family Visa',
      'employment': 'Employment Visa',
      'tourist': 'Tourist Visa',
      'student': 'Student Visa',
      'investor': 'Investor Visa'
    }
  },
  'driving-licence': {
    name: 'Driving License',
    subcategories: {
      'car': 'Car License',
      'bike': 'Bike License',
      'golden': 'Golden Chance',
      'heavy': 'Heavy Vehicle',
      'renewal': 'License Renewal'
    }
  },
  'trade-licence': {
    name: 'Trade License',
    subcategories: {
      'new-licence': 'New License',
      'renewal': 'Renewal',
      'activity-amendment': 'Activity Amendment',
      'poa': 'Power of Attorney',
      'moa': 'Memorandum of Association'
    }
  }
};

export const months = [
  { value: '01', label: 'January' },
  { value: '02', label: 'February' },
  { value: '03', label: 'March' },
  { value: '04', label: 'April' },
  { value: '05', label: 'May' },
  { value: '06', label: 'June' },
  { value: '07', label: 'July' },
  { value: '08', label: 'August' },
  { value: '09', label: 'September' },
  { value: '10', label: 'October' },
  { value: '11', label: 'November' },
  { value: '12', label: 'December' }
];

export const years = Array.from({ length: 5 }, (_, i) => {
  const year = new Date().getFullYear() - i;
  return { value: year.toString(), label: year.toString() };
});
