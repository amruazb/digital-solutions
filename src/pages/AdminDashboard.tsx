
import React from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import RenewalReminderCard from '@/components/admin/RenewalReminderCard';
import { 
  Users, 
  FileText, 
  DollarSign, 
  TrendingUp,
  Clock,
  CheckCircle,
  AlertTriangle,
  Calendar
} from 'lucide-react';

const AdminDashboard = () => {
  // Mock data for dashboard stats
  const stats = [
    {
      title: 'Total Enquiries',
      value: '1,234',
      change: '+12% from last month',
      icon: FileText,
      color: 'text-blue-600'
    },
    {
      title: 'Active Staff',
      value: '12',
      change: '+2 new this month',
      icon: Users,
      color: 'text-green-600'
    },
    {
      title: 'Monthly Revenue',
      value: 'AED 45,200',
      change: '+18% from last month',
      icon: DollarSign,
      color: 'text-purple-600'
    },
    {
      title: 'Completion Rate',
      value: '94%',
      change: '+2% from last month',
      icon: TrendingUp,
      color: 'text-orange-600'
    }
  ];

  const recentEnquiries = [
    { id: 1, client: 'Ahmed Hassan', service: 'Trade License', status: 'In Progress', date: '2024-01-15' },
    { id: 2, client: 'Sarah Johnson', service: 'Family Visa', status: 'Completed', date: '2024-01-14' },
    { id: 3, client: 'Raj Patel', service: 'Driving License', status: 'Pending', date: '2024-01-14' },
    { id: 4, client: 'Maria Santos', service: 'Document Translation', status: 'In Progress', date: '2024-01-13' },
    { id: 5, client: 'Omar Khalil', service: 'Health Insurance', status: 'Completed', date: '2024-01-13' }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Completed':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'In Progress':
        return <Clock className="h-4 w-4 text-blue-600" />;
      case 'Pending':
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      default:
        return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <AdminSidebar />
      
      <main className="flex-1 overflow-hidden">
        <div className="h-full overflow-y-auto">
          {/* Header */}
          <div className="bg-white border-b border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                <p className="text-sm text-gray-600">Welcome back! Here's what's happening today.</p>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Calendar className="h-4 w-4" />
                {new Date().toLocaleDateString('en-GB', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </div>
            </div>
          </div>

          <div className="p-6 space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat) => (
                <Card key={stat.title}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                        <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                        <p className="text-xs text-gray-500 mt-1">{stat.change}</p>
                      </div>
                      <stat.icon className={`h-8 w-8 ${stat.color}`} />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Recent Enquiries */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-blue-600" />
                      Recent Enquiries
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentEnquiries.map((enquiry) => (
                        <div key={enquiry.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center gap-3">
                            {getStatusIcon(enquiry.status)}
                            <div>
                              <p className="font-medium text-gray-900">{enquiry.client}</p>
                              <p className="text-sm text-gray-600">{enquiry.service}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium text-gray-900">{enquiry.status}</p>
                            <p className="text-xs text-gray-500">{enquiry.date}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Renewal Reminders Card */}
              <div>
                <RenewalReminderCard />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
