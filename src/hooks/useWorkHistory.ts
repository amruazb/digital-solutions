
import { useState, useMemo } from 'react';
import { WorkHistoryItem, WorkHistoryStats, EmployeeStats, CategoryStats, CategoryKey } from '@/types/workHistory';
import { categories } from '@/constants/workHistoryConstants';

export const useWorkHistory = (initialData: WorkHistoryItem[]) => {
  const [workHistory] = useState(initialData);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSubcategory, setSelectedSubcategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedEmployee, setSelectedEmployee] = useState('all');
  const [selectedMonth, setSelectedMonth] = useState('all');
  const [selectedYear, setSelectedYear] = useState('all');
  const [activeTab, setActiveTab] = useState('all');

  const filteredHistory = useMemo(() => {
    return workHistory.filter(item => {
      const matchesSearch = item.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.assignedTo.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      const matchesSubcategory = selectedSubcategory === 'all' || item.subcategory === selectedSubcategory;
      const matchesStatus = selectedStatus === 'all' || item.status === selectedStatus;
      const matchesEmployee = selectedEmployee === 'all' || item.assignedTo === selectedEmployee;
      const matchesTab = activeTab === 'all' || item.category === activeTab;

      let matchesMonth = true;
      let matchesYear = true;
      
      if (selectedMonth !== 'all' || selectedYear !== 'all') {
        const completedDate = item.completedDate || item.startDate;
        const date = new Date(completedDate);
        const itemMonth = (date.getMonth() + 1).toString().padStart(2, '0');
        const itemYear = date.getFullYear().toString();
        
        matchesMonth = selectedMonth === 'all' || itemMonth === selectedMonth;
        matchesYear = selectedYear === 'all' || itemYear === selectedYear;
      }

      return matchesSearch && matchesCategory && matchesSubcategory && matchesStatus && matchesEmployee && matchesTab && matchesMonth && matchesYear;
    });
  }, [workHistory, searchTerm, selectedCategory, selectedSubcategory, selectedStatus, selectedEmployee, selectedMonth, selectedYear, activeTab]);

  const stats: WorkHistoryStats = useMemo(() => ({
    total: workHistory.length,
    completed: workHistory.filter(w => w.status === 'completed').length,
    inProgress: workHistory.filter(w => w.status === 'in-progress').length,
    pending: workHistory.filter(w => w.status === 'pending').length,
    totalRevenue: workHistory.filter(w => w.status === 'completed').reduce((sum, w) => sum + w.amount, 0)
  }), [workHistory]);

  const monthlyStats: WorkHistoryStats = useMemo(() => ({
    total: filteredHistory.length,
    completed: filteredHistory.filter(w => w.status === 'completed').length,
    inProgress: filteredHistory.filter(w => w.status === 'in-progress').length,
    pending: filteredHistory.filter(w => w.status === 'pending').length,
    totalRevenue: filteredHistory.filter(w => w.status === 'completed').reduce((sum, w) => sum + w.amount, 0)
  }), [filteredHistory]);

  const employeeStats: EmployeeStats[] = useMemo(() => 
    Array.from(new Set(workHistory.map(w => w.assignedTo))).map(employee => ({
      name: employee,
      total: workHistory.filter(w => w.assignedTo === employee).length,
      completed: workHistory.filter(w => w.assignedTo === employee && w.status === 'completed').length,
      revenue: workHistory.filter(w => w.assignedTo === employee && w.status === 'completed').reduce((sum, w) => sum + w.amount, 0)
    })), [workHistory]);

  const monthlyEmployeeStats: EmployeeStats[] = useMemo(() => 
    Array.from(new Set(filteredHistory.map(w => w.assignedTo))).map(employee => {
      const employeeFilteredWork = filteredHistory.filter(w => w.assignedTo === employee);
      return {
        name: employee,
        total: employeeFilteredWork.length,
        completed: employeeFilteredWork.filter(w => w.status === 'completed').length,
        revenue: employeeFilteredWork.filter(w => w.status === 'completed').reduce((sum, w) => sum + w.amount, 0),
        averageRevenue: employeeFilteredWork.filter(w => w.status === 'completed').length > 0 
          ? Math.round(employeeFilteredWork.filter(w => w.status === 'completed').reduce((sum, w) => sum + w.amount, 0) / employeeFilteredWork.filter(w => w.status === 'completed').length)
          : 0
      };
    }).filter(emp => emp.total > 0), [filteredHistory]);

  const categoryStats: CategoryStats[] = useMemo(() => 
    (Object.keys(categories) as CategoryKey[]).map(categoryKey => ({
      key: categoryKey,
      name: categories[categoryKey].name,
      count: workHistory.filter(w => w.category === categoryKey).length,
      completed: workHistory.filter(w => w.category === categoryKey && w.status === 'completed').length
    })), [workHistory]);

  return {
    filteredHistory,
    stats,
    monthlyStats,
    employeeStats,
    monthlyEmployeeStats,
    categoryStats,
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    selectedSubcategory,
    setSelectedSubcategory,
    selectedStatus,
    setSelectedStatus,
    selectedEmployee,
    setSelectedEmployee,
    selectedMonth,
    setSelectedMonth,
    selectedYear,
    setSelectedYear,
    activeTab,
    setActiveTab
  };
};
