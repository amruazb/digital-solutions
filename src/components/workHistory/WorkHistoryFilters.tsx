
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Filter, Search } from 'lucide-react';
import { WorkHistoryItem, CategoryKey } from '@/types/workHistory';
import { categories, months, years } from '@/constants/workHistoryConstants';

interface WorkHistoryFiltersProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  selectedCategory: string;
  setSelectedCategory: (value: string) => void;
  selectedSubcategory: string;
  setSelectedSubcategory: (value: string) => void;
  selectedStatus: string;
  setSelectedStatus: (value: string) => void;
  selectedEmployee: string;
  setSelectedEmployee: (value: string) => void;
  selectedMonth: string;
  setSelectedMonth: (value: string) => void;
  selectedYear: string;
  setSelectedYear: (value: string) => void;
  workHistory: WorkHistoryItem[];
  onClearFilters: () => void;
}

const WorkHistoryFilters: React.FC<WorkHistoryFiltersProps> = ({
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
  workHistory,
  onClearFilters
}) => {
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Filter className="h-4 w-4" />
          Filters & Search
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-8 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search client, employee, or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger>
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {(Object.keys(categories) as CategoryKey[]).map((key) => (
                <SelectItem key={key} value={key}>{categories[key].name}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedSubcategory} onValueChange={setSelectedSubcategory}>
            <SelectTrigger>
              <SelectValue placeholder="All Subcategories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Subcategories</SelectItem>
              {selectedCategory !== 'all' && selectedCategory in categories && 
                Object.entries(categories[selectedCategory as CategoryKey].subcategories).map(([key, name]) => (
                  <SelectItem key={key} value={key}>{name}</SelectItem>
                ))
              }
            </SelectContent>
          </Select>

          <Select value={selectedStatus} onValueChange={setSelectedStatus}>
            <SelectTrigger>
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedEmployee} onValueChange={setSelectedEmployee}>
            <SelectTrigger>
              <SelectValue placeholder="All Employees" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Employees</SelectItem>
              {Array.from(new Set(workHistory.map(w => w.assignedTo))).map((employee) => (
                <SelectItem key={employee} value={employee}>{employee}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedMonth} onValueChange={setSelectedMonth}>
            <SelectTrigger>
              <SelectValue placeholder="All Months" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Months</SelectItem>
              {months.map((month) => (
                <SelectItem key={month.value} value={month.value}>{month.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedYear} onValueChange={setSelectedYear}>
            <SelectTrigger>
              <SelectValue placeholder="All Years" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Years</SelectItem>
              {years.map((year) => (
                <SelectItem key={year.value} value={year.value}>{year.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button variant="outline" onClick={onClearFilters}>
            Clear Filters
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default WorkHistoryFilters;
