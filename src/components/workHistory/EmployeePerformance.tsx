
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { EmployeeStats } from '@/types/workHistory';
import { User, TrendingUp, DollarSign } from 'lucide-react';

interface EmployeePerformanceProps {
  employeeStats: EmployeeStats[];
  monthlyEmployeeStats?: EmployeeStats[];
  periodLabel?: string;
}

const EmployeePerformance: React.FC<EmployeePerformanceProps> = ({ 
  employeeStats, 
  monthlyEmployeeStats, 
  periodLabel 
}) => {
  return (
    <>
      {/* Monthly Employee Performance for Incentives */}
      {monthlyEmployeeStats && monthlyEmployeeStats.length > 0 && periodLabel && (
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <User className="h-5 w-5" />
            Employee Performance - {periodLabel} (For Incentive Calculation)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {monthlyEmployeeStats.map((emp) => (
              <Card key={emp.name} className="border-purple-200 bg-purple-50">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{emp.name}</CardTitle>
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <span className="text-xs font-medium text-purple-600">
                      {emp.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-purple-600">{emp.completed}</div>
                  <div className="text-xs text-muted-foreground space-y-1">
                    <p>{emp.total} total works</p>
                    <p className="text-green-600 font-medium">AED {emp.revenue.toLocaleString()}</p>
                    <p className="text-blue-600">Avg: AED {emp.averageRevenue?.toLocaleString()}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* All Time Employee Performance */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {employeeStats.map((emp) => (
          <Card key={emp.name}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{emp.name}</CardTitle>
              <User className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{emp.total}</div>
              <div className="text-xs text-muted-foreground space-y-1">
                <p>{emp.completed} completed</p>
                <p className="text-green-600 font-medium">AED {emp.revenue.toLocaleString()}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
};

export default EmployeePerformance;
