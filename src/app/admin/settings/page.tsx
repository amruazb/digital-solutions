'use client'

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Settings, 
  User, 
  Bell, 
  Shield, 
  Globe,
  Mail,
  Phone,
  MapPin,
  Clock,
  FileText,
  TrendingUp,
  Calendar,
  Save,
  RefreshCw
} from 'lucide-react';
import Link from 'next/link';

export default function AdminSettingsPage() {
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    dailyReports: true,
    weeklyReports: false
  });

  const [companyInfo, setCompanyInfo] = useState({
    name: 'Interact Typing Center',
    email: 'info@interacttyping.ae',
    phone: '+971 4 123 4567',
    address: 'Dubai, UAE',
    workingHours: '9:00 AM - 6:00 PM',
    timezone: 'Asia/Dubai'
  });

  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: true,
    sessionTimeout: '30',
    passwordExpiry: '90',
    loginAttempts: '5'
  });

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="p-6">
          <div className="flex items-center space-x-3 mb-8">
            <div className="bg-blue-600 text-white p-2 rounded-lg">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">Admin Panel</h2>
              <p className="text-sm text-gray-600">Interact Typing</p>
            </div>
          </div>
          
          <nav className="space-y-2">
            <Link href="/admin/dashboard">
              <div className="flex items-center space-x-3 p-3 text-gray-700 hover:bg-gray-50 rounded-lg">
                <TrendingUp className="w-5 h-5" />
                <span>Dashboard</span>
              </div>
            </Link>
            <Link href="/admin/enquiries">
              <div className="flex items-center space-x-3 p-3 text-gray-700 hover:bg-gray-50 rounded-lg">
                <FileText className="w-5 h-5" />
                <span>Enquiries</span>
              </div>
            </Link>
            <Link href="/admin/assignments">
              <div className="flex items-center space-x-3 p-3 text-gray-700 hover:bg-gray-50 rounded-lg">
                <User className="w-5 h-5" />
                <span>Assignments</span>
              </div>
            </Link>
            <Link href="/admin/staff">
              <div className="flex items-center space-x-3 p-3 text-gray-700 hover:bg-gray-50 rounded-lg">
                <User className="w-5 h-5" />
                <span>Staff</span>
              </div>
            </Link>
            <Link href="/admin/services">
              <div className="flex items-center space-x-3 p-3 text-gray-700 hover:bg-gray-50 rounded-lg">
                <FileText className="w-5 h-5" />
                <span>Services</span>
              </div>
            </Link>
            <Link href="/admin/settings">
              <div className="flex items-center space-x-3 p-3 bg-blue-50 text-blue-700 rounded-lg">
                <Settings className="w-5 h-5" />
                <span className="font-medium">Settings</span>
              </div>
            </Link>
          </nav>
        </div>
      </div>
      
      <main className="flex-1 overflow-hidden">
        <div className="h-full overflow-y-auto">
          {/* Header */}
          <div className="bg-white border-b border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
                <p className="text-sm text-gray-600">Manage your system preferences and configurations.</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Calendar className="h-4 w-4" />
                  {new Date().toLocaleDateString('en-GB', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </Button>
              </div>
            </div>
          </div>

          <div className="p-6">
            <Tabs defaultValue="company" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="company" className="flex items-center gap-2">
                  <Globe className="w-4 h-4" />
                  Company
                </TabsTrigger>
                <TabsTrigger value="notifications" className="flex items-center gap-2">
                  <Bell className="w-4 h-4" />
                  Notifications
                </TabsTrigger>
                <TabsTrigger value="security" className="flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  Security
                </TabsTrigger>
                <TabsTrigger value="system" className="flex items-center gap-2">
                  <Settings className="w-4 h-4" />
                  System
                </TabsTrigger>
              </TabsList>

              {/* Company Information */}
              <TabsContent value="company" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Company Information</CardTitle>
                    <CardDescription>
                      Update your company details and contact information
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="company-name">Company Name</Label>
                        <Input 
                          id="company-name" 
                          value={companyInfo.name}
                          onChange={(e) => setCompanyInfo({...companyInfo, name: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="company-email">Email Address</Label>
                        <Input 
                          id="company-email" 
                          type="email"
                          value={companyInfo.email}
                          onChange={(e) => setCompanyInfo({...companyInfo, email: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="company-phone">Phone Number</Label>
                        <Input 
                          id="company-phone" 
                          value={companyInfo.phone}
                          onChange={(e) => setCompanyInfo({...companyInfo, phone: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="company-address">Address</Label>
                        <Input 
                          id="company-address" 
                          value={companyInfo.address}
                          onChange={(e) => setCompanyInfo({...companyInfo, address: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="working-hours">Working Hours</Label>
                        <Input 
                          id="working-hours" 
                          value={companyInfo.workingHours}
                          onChange={(e) => setCompanyInfo({...companyInfo, workingHours: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="timezone">Timezone</Label>
                        <Select value={companyInfo.timezone} onValueChange={(value) => setCompanyInfo({...companyInfo, timezone: value})}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Asia/Dubai">Asia/Dubai (GMT+4)</SelectItem>
                            <SelectItem value="Asia/Abu_Dhabi">Asia/Abu Dhabi (GMT+4)</SelectItem>
                            <SelectItem value="Asia/Kolkata">Asia/Kolkata (GMT+5:30)</SelectItem>
                            <SelectItem value="Europe/London">Europe/London (GMT+0)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Business Hours</CardTitle>
                    <CardDescription>
                      Set your business operating hours
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h4 className="font-medium">Weekdays (Monday - Friday)</h4>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label>Start Time</Label>
                            <Input type="time" defaultValue="09:00" />
                          </div>
                          <div>
                            <Label>End Time</Label>
                            <Input type="time" defaultValue="18:00" />
                          </div>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <h4 className="font-medium">Weekend (Saturday)</h4>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label>Start Time</Label>
                            <Input type="time" defaultValue="09:00" />
                          </div>
                          <div>
                            <Label>End Time</Label>
                            <Input type="time" defaultValue="14:00" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Notifications */}
              <TabsContent value="notifications" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Notification Preferences</CardTitle>
                    <CardDescription>
                      Configure how you want to receive notifications
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Email Notifications</Label>
                          <p className="text-sm text-gray-600">Receive notifications via email</p>
                        </div>
                        <Switch 
                          checked={notifications.emailNotifications}
                          onCheckedChange={(checked) => setNotifications({...notifications, emailNotifications: checked})}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>SMS Notifications</Label>
                          <p className="text-sm text-gray-600">Receive notifications via SMS</p>
                        </div>
                        <Switch 
                          checked={notifications.smsNotifications}
                          onCheckedChange={(checked) => setNotifications({...notifications, smsNotifications: checked})}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Push Notifications</Label>
                          <p className="text-sm text-gray-600">Receive browser push notifications</p>
                        </div>
                        <Switch 
                          checked={notifications.pushNotifications}
                          onCheckedChange={(checked) => setNotifications({...notifications, pushNotifications: checked})}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Report Preferences</CardTitle>
                    <CardDescription>
                      Configure automatic report generation
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Daily Reports</Label>
                          <p className="text-sm text-gray-600">Receive daily summary reports</p>
                        </div>
                        <Switch 
                          checked={notifications.dailyReports}
                          onCheckedChange={(checked) => setNotifications({...notifications, dailyReports: checked})}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Weekly Reports</Label>
                          <p className="text-sm text-gray-600">Receive weekly summary reports</p>
                        </div>
                        <Switch 
                          checked={notifications.weeklyReports}
                          onCheckedChange={(checked) => setNotifications({...notifications, weeklyReports: checked})}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Security */}
              <TabsContent value="security" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Security Settings</CardTitle>
                    <CardDescription>
                      Configure security preferences for your account
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Two-Factor Authentication</Label>
                          <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
                        </div>
                        <Switch 
                          checked={securitySettings.twoFactorAuth}
                          onCheckedChange={(checked) => setSecuritySettings({...securitySettings, twoFactorAuth: checked})}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Session Management</CardTitle>
                    <CardDescription>
                      Configure session timeout and login settings
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
                        <Select value={securitySettings.sessionTimeout} onValueChange={(value) => setSecuritySettings({...securitySettings, sessionTimeout: value})}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="15">15 minutes</SelectItem>
                            <SelectItem value="30">30 minutes</SelectItem>
                            <SelectItem value="60">1 hour</SelectItem>
                            <SelectItem value="120">2 hours</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="password-expiry">Password Expiry (days)</Label>
                        <Select value={securitySettings.passwordExpiry} onValueChange={(value) => setSecuritySettings({...securitySettings, passwordExpiry: value})}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="30">30 days</SelectItem>
                            <SelectItem value="60">60 days</SelectItem>
                            <SelectItem value="90">90 days</SelectItem>
                            <SelectItem value="180">180 days</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="login-attempts">Max Login Attempts</Label>
                        <Select value={securitySettings.loginAttempts} onValueChange={(value) => setSecuritySettings({...securitySettings, loginAttempts: value})}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="3">3 attempts</SelectItem>
                            <SelectItem value="5">5 attempts</SelectItem>
                            <SelectItem value="10">10 attempts</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* System */}
              <TabsContent value="system" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>System Information</CardTitle>
                    <CardDescription>
                      View system details and performance metrics
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">System Version</span>
                          <span className="text-sm font-medium">v2.1.0</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Last Updated</span>
                          <span className="text-sm font-medium">2024-06-14</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Database Size</span>
                          <span className="text-sm font-medium">2.4 GB</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Active Users</span>
                          <span className="text-sm font-medium">15</span>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Server Status</span>
                          <Badge className="bg-green-100 text-green-800">Online</Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Response Time</span>
                          <span className="text-sm font-medium">45ms</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Uptime</span>
                          <span className="text-sm font-medium">99.9%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Backup Status</span>
                          <Badge className="bg-green-100 text-green-800">Up to Date</Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Maintenance</CardTitle>
                    <CardDescription>
                      System maintenance and backup options
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Clear Cache</h4>
                        <p className="text-sm text-gray-600">Clear system cache to improve performance</p>
                      </div>
                      <Button variant="outline">
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Clear Cache
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Backup Database</h4>
                        <p className="text-sm text-gray-600">Create a backup of your database</p>
                      </div>
                      <Button variant="outline">
                        <Save className="w-4 h-4 mr-2" />
                        Backup Now
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">System Logs</h4>
                        <p className="text-sm text-gray-600">Download system logs for debugging</p>
                      </div>
                      <Button variant="outline">
                        <FileText className="w-4 h-4 mr-2" />
                        Download Logs
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  );
} 