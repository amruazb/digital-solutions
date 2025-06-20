
export type WorkStatus = 'completed' | 'in-progress' | 'pending';
export type CategoryKey = 'visa' | 'driving-licence' | 'trade-licence';

export interface WorkHistoryItem {
  id: string;
  clientName: string;
  category: CategoryKey;
  subcategory: string;
  description: string;
  assignedTo: string;
  employeeId: string;
  status: WorkStatus;
  startDate: string;
  completedDate: string | null;
  amount: number;
  duration: string;
}

export interface CategoryInfo {
  name: string;
  subcategories: Record<string, string>;
}

export interface WorkHistoryStats {
  total: number;
  completed: number;
  inProgress: number;
  pending: number;
  totalRevenue: number;
}

export interface EmployeeStats {
  name: string;
  total: number;
  completed: number;
  revenue: number;
  averageRevenue?: number;
}

export interface CategoryStats {
  key: CategoryKey;
  name: string;
  count: number;
  completed: number;
}
