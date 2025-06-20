
import React from 'react';
import { useNavigate } from 'react-router-dom';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TrendingUp, DollarSign, FileText, Car, Building2 } from 'lucide-react';

import { useWorkHistory } from '@/hooks/useWorkHistory';
import { mockWorkHistory } from '@/data/mockWorkHistory';
import { categories, months } from '@/constants/workHistoryConstants';
import { CategoryKey } from '@/types/workHistory';

import StatsCards from '@/components/workHistory/StatsCards';
import EmployeePerformance from '@/components/workHistory/EmployeePerformance';
import WorkHistoryFilters from '@/components/workHistory/WorkHistoryFilters';
import WorkHistoryTable from '@/components/workHistory/WorkHistoryTable';

const AdminWorkHistory = () => {
  const navigate = useNavigate();
  const {
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
  } = useWorkHistory(mockWorkHistory);

  React.useEffect(() => {
    const adminSession = localStorage.getItem('adminSession');
    if (!adminSession) {
      navigate('/admin/login');
    }
  }, [navigate]);

  const getMonthYearLabel = () => {
    if (selectedMonth === 'all' && selectedYear === 'all') return 'All Time';
    if (selectedMonth === 'all' && selectedYear !== 'all') return selectedYear;
    if (selectedMonth !== 'all' && selectedYear === 'all') {
      const month = months.find(m => m.value === selectedMonth);
      return month?.label || selectedMonth;
    }
    const month = months.find(m => m.value === selectedMonth);
    return `${month?.label || selectedMonth} ${selectedYear}`;
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'visa':
        return <FileText className="h-4 w-4 text-muted-foreground" />;
      case 'driving-licence':
        return <Car className="h-4 w-4 text-muted-foreground" />;
      case 'trade-licence':
        return <Building2 className="h-4 w-4 text-muted-foreground" />;
      default:
        return <FileText className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setSelectedSubcategory('all');
    setSelectedStatus('all');
    setSelectedEmployee('all');
    setSelectedMonth('all');
    setSelectedYear('all');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <AdminSidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Work History</h1>
                <p className="text-gray-600 mt-1">Track completed and ongoing work across all service categories with employee performance and monthly incentive calculations.</p>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            
            {/* Overall Stats Cards */}
            <StatsCards stats={stats} />

            {/* Monthly/Filtered Stats */}
            {(selectedMonth !== 'all' || selectedYear !== 'all') && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  {getMonthYearLabel()} Performance
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <Card className="border-blue-200 bg-blue-50">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Period Works</CardTitle>
                      <FileText className="h-4 w-4 text-blue-600" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-blue-600">{monthlyStats.total}</div>
                      <p className="text-xs text-muted-foreground">{getMonthYearLabel()}</p>
                    </CardContent>
                  </Card>

                  <Card className="border-green-200 bg-green-50">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Completed</CardTitle>
                      <Building2 className="h-4 w-4 text-green-600" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-green-600">{monthlyStats.completed}</div>
                      <p className="text-xs text-muted-foreground">Successfully finished</p>
                    </CardContent>
                  </Card>

                  <Card className="border-yellow-200 bg-yellow-50">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">In Progress</CardTitle>
                      <Car className="h-4 w-4 text-yellow-600" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-yellow-600">{monthlyStats.inProgress}</div>
                      <p className="text-xs text-muted-foreground">Currently working</p>
                    </CardContent>
                  </Card>

                  <Card className="border-emerald-200 bg-emerald-50">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Period Revenue</CardTitle>
                      <DollarSign className="h-4 w-4 text-emerald-600" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-emerald-600">AED {monthlyStats.totalRevenue.toLocaleString()}</div>
                      <p className="text-xs text-muted-foreground">From completed works</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}

            {/* Employee Performance */}
            <EmployeePerformance 
              employeeStats={employeeStats}
              monthlyEmployeeStats={(selectedMonth !== 'all' || selectedYear !== 'all') ? monthlyEmployeeStats : undefined}
              periodLabel={(selectedMonth !== 'all' || selectedYear !== 'all') ? getMonthYearLabel() : undefined}
            />

            {/* Category Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {categoryStats.map((cat) => (
                <Card key={cat.key}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{cat.name}</CardTitle>
                    {getCategoryIcon(cat.key)}
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{cat.count}</div>
                    <p className="text-xs text-muted-foreground">{cat.completed} completed</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Filters */}
            <WorkHistoryFilters
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              selectedSubcategory={selectedSubcategory}
              setSelectedSubcategory={setSelectedSubcategory}
              selectedStatus={selectedStatus}
              setSelectedStatus={setSelectedStatus}
              selectedEmployee={selectedEmployee}
              setSelectedEmployee={setSelectedEmployee}
              selectedMonth={selectedMonth}
              setSelectedMonth={setSelectedMonth}
              selectedYear={selectedYear}
              setSelectedYear={setSelectedYear}
              workHistory={mockWorkHistory}
              onClearFilters={handleClearFilters}
            />

            {/* Tabbed View */}
            <Card>
              <CardHeader>
                <CardTitle>Work History</CardTitle>
                <CardDescription>
                  View work history organized by categories and subcategories with employee performance tracking and monthly incentive calculations.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="all">All Works</TabsTrigger>
                    <TabsTrigger value="visa">Visa Works</TabsTrigger>
                    <TabsTrigger value="driving-licence">Driving License</TabsTrigger>
                    <TabsTrigger value="trade-licence">Trade License</TabsTrigger>
                  </TabsList>

                  <TabsContent value="all" className="mt-6">
                    <WorkHistoryTable workHistory={filteredHistory} />
                  </TabsContent>

                  {(Object.keys(categories) as CategoryKey[]).map((categoryKey) => (
                    <TabsContent key={categoryKey} value={categoryKey} className="mt-6">
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
                          {Object.entries(categories[categoryKey].subcategories).map(([subKey, subName]) => {
                            const count = mockWorkHistory.filter(w => w.category === categoryKey && w.subcategory === subKey).length;
                            const completed = mockWorkHistory.filter(w => w.category === categoryKey && w.subcategory === subKey && w.status === 'completed').length;
                            return (
                              <Card key={subKey} className="text-center">
                                <CardContent className="pt-4">
                                  <div className="text-2xl font-bold text-blue-600">{count}</div>
                                  <p className="text-xs text-muted-foreground">{subName}</p>
                                  <p className="text-xs text-green-600">{completed} completed</p>
                                </CardContent>
                              </Card>
                            );
                          })}
                        </div>
                        
                        <WorkHistoryTable workHistory={filteredHistory.filter(w => w.category === categoryKey)} />
                      </div>
                    </TabsContent>
                  ))}
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminWorkHistory;
