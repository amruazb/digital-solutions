
import { Service } from '@/types/service';
import { serviceCategories } from './serviceCategories';
import { documentTypingServices } from './services/documentTyping';
import { businessSetupServices } from './services/businessSetup';
import { visaServices } from './services/visaServices';
import { drivingLicenseServices } from './services/drivingLicense';
import { otherServices } from './services/otherServices';

// Combine all services
export const services: Service[] = [
  ...documentTypingServices,
  ...businessSetupServices,
  ...visaServices,
  ...drivingLicenseServices,
  ...otherServices
];

// Export service categories
export { serviceCategories };

// Popular services for homepage display
export const popularServices = services.filter(service => service.popular);

// All services grouped by category
export const servicesByCategory = Object.keys(serviceCategories).reduce((acc, category) => {
  acc[category] = services.filter(service => service.category === category);
  return acc;
}, {} as Record<string, Service[]>);
