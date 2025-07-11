
import { LucideIcon } from 'lucide-react';

export interface ServiceStep {
  id: number;
  title: string;
  type: 'text' | 'select' | 'file' | 'email' | 'tel';
  label: string;
  placeholder?: string;
  required: boolean;
  options?: string[];
  accept?: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  price: string;
  duration: string;
  popular: boolean;
  color: string;
  icon: LucideIcon;
  category: string;
  features: string[];
  documentRequirements?: string[];
  eyeTestInfo?: {
    required: boolean;
    helpAvailable: boolean;
    note: string;
  };
  steps: ServiceStep[];
}

export interface ServiceCategory {
  name: string;
  description: string;
  icon: LucideIcon;
}
