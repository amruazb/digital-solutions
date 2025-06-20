'use client'

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  Search, 
  Filter, 
  FileText, 
  Phone, 
  Mail, 
  MapPin, 
  Star, 
  CheckCircle, 
  ArrowRight,
  HelpCircle,
  Heart,
  Clock,
  Shield,
  Users,
  TrendingUp,
  Calendar,
  AlertTriangle,
  Eye,
  Edit,
  Trash2,
  Plus,
  Download,
  BarChart3,
  UserPlus,
  Settings,
  LogOut,
  Bell,
  MessageSquare,
  DollarSign,
  Award,
  Target,
  Activity,
  Zap,
  ChevronRight,
  TrendingDown,
  User,
  Home
} from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboardPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const [currentDate, setCurrentDate] = useState('');

  // Set date on client side only to avoid hydration mismatch
  React.useEffect(() => {
    const date = new Date();
    const formattedDate = date.toLocaleDateString('en-GB', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
    setCurrentDate(formattedDate);
  }, []);

  // Mock dashboard data
  const dashboardStats = [
    {
      title: 'Total Enquiries',
      value: '1,234',
      change: '+12%',
      changeType: 'positive',
      icon: FileText,
      color: 'bg-gradient-to-br from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600'
    },
    {
      title: 'Active Staff',
      value: '45',
      change: '+3',
      changeType: 'positive',
      icon: Users,
      color: 'bg-gradient-to-br from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600'
    },
    {
      title: 'Completed Today',
      value: '89',
      change: '+8%',
      changeType: 'positive',
      icon: CheckCircle,
      color: 'bg-gradient-to-br from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600'
    },
    {
      title: 'Revenue (AED)',
      value: '45,670',
      change: '+15%',
      changeType: 'positive',
      icon: DollarSign,
      color: 'bg-gradient-to-br from-orange-500 to-orange-600',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-600'
    }
  ];

  const recentEnquiries = [
    {
      id: 1,
      clientName: 'Ahmed Hassan',
      email: 'ahmed.hassan@email.com',
      phone: '+971 50 123 4567',
      service: 'Trade License & Company Setup',
      status: 'In Progress',
      priority: 'High',
      assignedTo: 'Sarah Johnson',
      createdAt: '2024-01-15',
      updatedAt: '2024-01-16'
    },
    {
      id: 2,
      clientName: 'Fatima Al Zahra',
      email: 'fatima.alzahra@email.com',
      phone: '+971 55 987 6543',
      service: 'Family & Visa Services',
      status: 'Completed',
      priority: 'Medium',
      assignedTo: 'Ahmed Hassan',
      createdAt: '2024-01-14',
      updatedAt: '2024-01-15'
    },
    {
      id: 3,
      clientName: 'Raj Patel',
      email: 'raj.patel@email.com',
      phone: '+971 52 456 7890',
      service: 'Driving License - Golden Chance',
      status: 'Pending',
      priority: 'Low',
      assignedTo: 'Maria Santos',
      createdAt: '2024-01-14',
      updatedAt: '2024-01-14'
    },
    {
      id: 4,
      clientName: 'Maria Santos',
      email: 'maria.santos@email.com',
      phone: '+971 54 321 0987',
      service: 'Certificate Attestation Services',
      status: 'In Progress',
      priority: 'High',
      assignedTo: 'Omar Khalil',
      createdAt: '2024-01-13',
      updatedAt: '2024-01-15'
    }
  ];

  const staffPerformance = [
    {
      id: '1',
      name: 'Ahmed Hassan',
      role: 'Senior Typist',
      department: 'Immigration',
      currentTasks: 3,
      completedToday: 5,
      performance: 95,
      avatar: 'AH',
      trend: 'up'
    },
    {
      id: '2',
      name: 'Fatima Al Zahra',
      role: 'Document Specialist',
      department: 'Business',
      currentTasks: 2,
      completedToday: 4,
      performance: 92,
      avatar: 'FA',
      trend: 'up'
    },
    {
      id: '3',
      name: 'Mohammed Ali',
      role: 'Junior Typist',
      department: 'Transportation',
      currentTasks: 1,
      completedToday: 3,
      performance: 88,
      avatar: 'MA',
      trend: 'down'
    }
  ];

  const quickActions = [
    { title: 'Add New Staff', icon: UserPlus, href: '/admin/staff', color: 'bg-gradient-to-r from-blue-500 to-blue-600', description: 'Hire new team members' },
    { title: 'Create Service', icon: Plus, href: '/admin/services', color: 'bg-gradient-to-r from-green-500 to-green-600', description: 'Add new service offerings' },
    { title: 'Assign Work', icon: Users, href: '/admin/assignments', color: 'bg-gradient-to-r from-purple-500 to-purple-600', description: 'Distribute tasks to staff' },
    { title: 'Generate Report', icon: Download, href: '#', color: 'bg-gradient-to-r from-orange-500 to-orange-600', description: 'Download analytics report' }
  ];

  const notifications = [
    {
      id: 1,
      title: 'New Enquiry Received',
      message: 'Ahmed Hassan submitted a new enquiry for Trade License setup',
      time: '2 minutes ago',
      type: 'enquiry',
      read: false,
      icon: FileText,
      color: 'text-blue-600'
    },
    {
      id: 2,
      title: 'Task Completed',
      message: 'Fatima Al Zahra completed Visa Application for Raj Patel',
      time: '15 minutes ago',
      type: 'task',
      read: false,
      icon: CheckCircle,
      color: 'text-green-600'
    },
    {
      id: 3,
      title: 'Staff Performance Alert',
      message: 'Mohammed Ali has exceeded daily task limit',
      time: '1 hour ago',
      type: 'alert',
      read: true,
      icon: AlertTriangle,
      color: 'text-orange-600'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'In Progress':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Low':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPerformanceColor = (performance: number) => {
    if (performance >= 95) return 'text-green-600 bg-green-50';
    if (performance >= 90) return 'text-blue-600 bg-blue-50';
    if (performance >= 80) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  const handleLogout = () => {
    // Add logout logic here
    console.log('Logging out...');
    setShowLogoutDialog(false);
    // Redirect to login page
    window.location.href = '/admin/login';
  };

  const filteredEnquiries = recentEnquiries.filter(enquiry => {
    const matchesSearch = 
      enquiry.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      enquiry.service.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || enquiry.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-xl border-r border-gray-200">
        <div className="p-6">
          <div className="flex items-center space-x-3 mb-8">
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white p-3 rounded-xl shadow-lg">
              <FileText className="w-7 h-7" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Admin Panel</h2>
              <p className="text-sm text-gray-600">Interact Typing</p>
            </div>
          </div>
          
          <nav className="space-y-2">
            <Link href="/admin/dashboard">
              <div className="flex items-center space-x-3 p-3 bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 rounded-xl border border-blue-200 shadow-sm">
                <TrendingUp className="w-5 h-5" />
                <span className="font-semibold">Dashboard</span>
              </div>
            </Link>
            <Link href="/admin/enquiries">
              <div className="flex items-center space-x-3 p-3 text-gray-700 hover:bg-gray-50 rounded-xl transition-all duration-200 hover:shadow-sm">
                <FileText className="w-5 h-5" />
                <span>Enquiries</span>
              </div>
            </Link>
            <Link href="/admin/assignments">
              <div className="flex items-center space-x-3 p-3 text-gray-700 hover:bg-gray-50 rounded-xl transition-all duration-200 hover:shadow-sm">
                <Users className="w-5 h-5" />
                <span>Assignments</span>
              </div>
            </Link>
            <Link href="/admin/staff">
              <div className="flex items-center space-x-3 p-3 text-gray-700 hover:bg-gray-50 rounded-xl transition-all duration-200 hover:shadow-sm">
                <Users className="w-5 h-5" />
                <span>Staff</span>
              </div>
            </Link>
            <Link href="/admin/services">
              <div className="flex items-center space-x-3 p-3 text-gray-700 hover:bg-gray-50 rounded-xl transition-all duration-200 hover:shadow-sm">
                <FileText className="w-5 h-5" />
                <span>Services</span>
              </div>
            </Link>
            <Link href="/admin/settings">
              <div className="flex items-center space-x-3 p-3 text-gray-700 hover:bg-gray-50 rounded-xl transition-all duration-200 hover:shadow-sm">
                <Settings className="w-5 h-5" />
                <span>Settings</span>
              </div>
            </Link>
          </nav>

          {/* Logout Section */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <Dialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
              <DialogTrigger asChild>
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 rounded-xl"
                >
                  <LogOut className="w-5 h-5 mr-3" />
                  Logout
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Confirm Logout</DialogTitle>
                  <DialogDescription>
                    Are you sure you want to logout? You will need to login again to access the admin panel.
                  </DialogDescription>
                </DialogHeader>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setShowLogoutDialog(false)}>
                    Cancel
                  </Button>
                  <Button variant="destructive" onClick={handleLogout}>
                    Logout
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
      
      <main className="flex-1 overflow-hidden">
        <div className="h-full overflow-y-auto">
          {/* Header */}
          <div className="bg-white border-b border-gray-200 px-6 py-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
                <p className="text-gray-600 mt-1">Welcome back! Here's what's happening today.</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-sm text-gray-500 bg-gray-50 px-3 py-2 rounded-lg">
                  <Calendar className="h-4 w-4" />
                  {currentDate || 'Loading...'}
                </div>
                <Button variant="ghost" size="sm" className="relative">
                  <Bell className="w-5 h-5" />
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
                </Button>
                <Button variant="ghost" size="sm">
                  <Settings className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>

          <div className="p-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {dashboardStats.map((stat, index) => (
                <Card key={index} className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                        <p className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</p>
                        <div className="flex items-center">
                          {stat.changeType === 'positive' ? (
                            <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
                          ) : (
                            <TrendingDown className="w-4 h-4 text-red-600 mr-1" />
                          )}
                          <p className={`text-sm font-medium ${stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'}`}>
                            {stat.change} from last month
                          </p>
                        </div>
                      </div>
                      <div className={`p-4 rounded-xl ${stat.color} text-white shadow-lg`}>
                        <stat.icon className="w-8 h-8" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Quick Actions */}
              <div className="lg:col-span-1">
                <Card className="border-0 shadow-lg">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-xl">Quick Actions</CardTitle>
                    <CardDescription>Common tasks and shortcuts</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {quickActions.map((action, index) => (
                      <Link key={index} href={action.href}>
                        <Button variant="outline" className="w-full justify-start h-auto p-4 hover:shadow-md transition-all duration-200 border-0 bg-white hover:bg-gray-50">
                          <div className={`p-3 rounded-lg ${action.color} text-white mr-4 shadow-md`}>
                            <action.icon className="w-5 h-5" />
                          </div>
                          <div className="text-left">
                            <div className="font-semibold text-gray-900">{action.title}</div>
                            <div className="text-sm text-gray-600">{action.description}</div>
                          </div>
                          <ChevronRight className="w-4 h-4 ml-auto text-gray-400" />
                        </Button>
                      </Link>
                    ))}
                  </CardContent>
                </Card>

                {/* Notifications */}
                <Card className="mt-6 border-0 shadow-lg">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-xl">Recent Notifications</CardTitle>
                    <CardDescription>Latest updates and alerts</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-4 rounded-xl border transition-all duration-200 hover:shadow-sm ${
                          notification.read
                            ? 'bg-gray-50 border-gray-200'
                            : 'bg-blue-50 border-blue-200'
                        }`}
                      >
                        <div className="flex items-start space-x-3">
                          <div className={`p-2 rounded-lg ${notification.color} bg-white`}>
                            <notification.icon className="w-4 h-4" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-semibold text-gray-900">
                              {notification.title}
                            </p>
                            <p className="text-xs text-gray-600 mt-1">
                              {notification.message}
                            </p>
                            <p className="text-xs text-gray-500 mt-2">
                              {notification.time}
                            </p>
                          </div>
                          {!notification.read && (
                            <div className="w-3 h-3 bg-blue-600 rounded-full flex-shrink-0"></div>
                          )}
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              {/* Main Content */}
              <div className="lg:col-span-2 space-y-6">
                {/* Recent Enquiries */}
                <Card className="border-0 shadow-lg">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-xl">Recent Enquiries</CardTitle>
                        <CardDescription>Latest customer enquiries and their status</CardDescription>
                      </div>
                      <Link href="/admin/enquiries">
                        <Button variant="outline" size="sm" className="hover:shadow-md transition-all duration-200">
                          View All
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </Link>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col sm:flex-row gap-4 mb-6">
                      <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <Input
                          placeholder="Search enquiries..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-10 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                        />
                      </div>
                      <Select value={statusFilter} onValueChange={setStatusFilter}>
                        <SelectTrigger className="w-full sm:w-48 border-gray-200">
                          <SelectValue placeholder="Filter by status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Status</SelectItem>
                          <SelectItem value="Pending">Pending</SelectItem>
                          <SelectItem value="In Progress">In Progress</SelectItem>
                          <SelectItem value="Completed">Completed</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-3">
                      {filteredEnquiries.map((enquiry) => (
                        <div key={enquiry.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:shadow-md transition-all duration-200 bg-white">
                          <div className="flex items-center space-x-4">
                            <div className="p-3 bg-blue-100 rounded-xl">
                              <FileText className="w-6 h-6 text-blue-600" />
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-900">{enquiry.clientName}</h4>
                              <p className="text-sm text-gray-600">{enquiry.service}</p>
                              <div className="flex items-center space-x-2 mt-2">
                                <Badge className={`${getStatusColor(enquiry.status)} border`}>
                                  {enquiry.status}
                                </Badge>
                                <Badge className={`${getPriorityColor(enquiry.priority)} border`}>
                                  {enquiry.priority}
                                </Badge>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button variant="ghost" size="sm" className="hover:bg-blue-50 hover:text-blue-600">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="hover:bg-green-50 hover:text-green-600">
                              <Edit className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Staff Performance */}
                <Card className="border-0 shadow-lg">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-xl">Staff Performance</CardTitle>
                        <CardDescription>Current workload and performance metrics</CardDescription>
                      </div>
                      <Link href="/admin/staff">
                        <Button variant="outline" size="sm" className="hover:shadow-md transition-all duration-200">
                          View All Staff
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </Link>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {staffPerformance.map((staff) => (
                        <div key={staff.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:shadow-md transition-all duration-200 bg-white">
                          <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-md">
                              <span className="text-sm font-bold text-white">{staff.avatar}</span>
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-900">{staff.name}</h4>
                              <p className="text-sm text-gray-600">{staff.role} • {staff.department}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-6">
                            <div className="text-center">
                              <p className="text-sm text-gray-600">Current Tasks</p>
                              <p className="font-bold text-gray-900">{staff.currentTasks}</p>
                            </div>
                            <div className="text-center">
                              <p className="text-sm text-gray-600">Completed Today</p>
                              <p className="font-bold text-green-600">{staff.completedToday}</p>
                            </div>
                            <div className="text-center">
                              <p className="text-sm text-gray-600">Performance</p>
                              <div className={`px-3 py-1 rounded-full text-sm font-bold ${getPerformanceColor(staff.performance)}`}>
                                {staff.performance}%
                              </div>
                            </div>
                            <Button variant="ghost" size="sm" className="hover:bg-blue-50 hover:text-blue-600">
                              <Eye className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 