import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Settings, Building2, Mail, Phone, MapPin, Clock, Users, Shield, Database, Plus, Trash2, Edit } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Mock user data
const mockUsers = [
  {
    id: '1',
    name: 'Ahmed Hassan',
    email: 'ahmed@interacttyping.ae',
    role: 'admin',
    status: 'active',
    lastActive: '2024-06-14',
    permissions: ['view_enquiries', 'edit_enquiries', 'manage_users', 'system_settings']
  },
  {
    id: '2',
    name: 'Sarah Al Zahra',
    email: 'sarah@interacttyping.ae',
    role: 'staff',
    status: 'active',
    lastActive: '2024-06-13',
    permissions: ['view_enquiries', 'edit_enquiries']
  },
  {
    id: '3',
    name: 'Mohammed Ali',
    email: 'mohammed@interacttyping.ae',
    role: 'staff',
    status: 'inactive',
    lastActive: '2024-06-10',
    permissions: ['view_enquiries']
  }
];

const AdminSettings = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Business Settings State
  const [businessSettings, setBusinessSettings] = useState({
    centerName: 'Interact Typing Services',
    email: 'info@interacttyping.ae',
    phone: '+971-4-1234567',
    address: 'Dubai, UAE',
    workingHours: '9:00 AM - 9:00 PM',
    description: 'Your trusted typing partner in UAE for all government and business documentation services.'
  });

  // System Settings State
  const [systemSettings, setSystemSettings] = useState({
    enableNotifications: true,
    enableWhatsApp: true,
    autoAssignTasks: false,
    enableFileUpload: true,
    maxFileSize: '10',
    allowedFileTypes: 'pdf,jpg,png,doc,docx'
  });

  // Enhanced user management state
  const [users, setUsers] = useState(mockUsers);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    role: 'staff',
    permissions: []
  });
  const [showAddUser, setShowAddUser] = useState(false);
  const [userSettings, setUserSettings] = useState({
    adminName: 'Admin User',
    adminEmail: 'admin@interacttyping.ae',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  React.useEffect(() => {
    const adminSession = localStorage.getItem('adminSession');
    if (!adminSession) {
      navigate('/admin/login');
    }
  }, [navigate]);

  const handleSaveBusinessSettings = () => {
    // TODO: Save to backend
    console.log('Saving business settings:', businessSettings);
    toast({
      title: "Settings Saved",
      description: "Business settings have been updated successfully.",
    });
  };

  const handleSaveSystemSettings = () => {
    // TODO: Save to backend
    console.log('Saving system settings:', systemSettings);
    toast({
      title: "Settings Saved",
      description: "System settings have been updated successfully.",
    });
  };

  const handleAddUser = () => {
    if (!newUser.name || !newUser.email) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const user = {
      id: Date.now().toString(),
      ...newUser,
      status: 'active',
      lastActive: new Date().toISOString().split('T')[0],
      permissions: newUser.role === 'admin' 
        ? ['view_enquiries', 'edit_enquiries', 'manage_users', 'system_settings']
        : ['view_enquiries', 'edit_enquiries']
    };

    setUsers([...users, user]);
    setNewUser({ name: '', email: '', role: 'staff', permissions: [] });
    setShowAddUser(false);
    
    toast({
      title: "User Added",
      description: `${user.name} has been added successfully.`,
    });
  };

  const handleDeleteUser = (userId: string) => {
    setUsers(users.filter(user => user.id !== userId));
    toast({
      title: "User Deleted",
      description: "User has been removed from the system.",
    });
  };

  const handleToggleUserStatus = (userId: string) => {
    setUsers(users.map(user => 
      user.id === userId 
        ? { ...user, status: user.status === 'active' ? 'inactive' : 'active' }
        : user
    ));
    toast({
      title: "Status Updated",
      description: "User status has been changed.",
    });
  };

  const handleSaveUserSettings = () => {
    if (userSettings.newPassword && userSettings.newPassword !== userSettings.confirmPassword) {
      toast({
        title: "Error",
        description: "New passwords do not match.",
        variant: "destructive",
      });
      return;
    }
    
    // TODO: Save to backend
    console.log('Saving user settings:', userSettings);
    toast({
      title: "Settings Saved",
      description: "User settings have been updated successfully.",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <AdminSidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
            <div className="flex items-center">
              <Settings className="h-6 w-6 text-gray-600 mr-3" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
                <p className="text-gray-600 mt-1">Manage your typing center settings and configurations.</p>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50">
          <div className="max-w-4xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            
            <Tabs defaultValue="business" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="business" className="flex items-center gap-2">
                  <Building2 className="h-4 w-4" />
                  Business
                </TabsTrigger>
                <TabsTrigger value="system" className="flex items-center gap-2">
                  <Database className="h-4 w-4" />
                  System
                </TabsTrigger>
                <TabsTrigger value="users" className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Users
                </TabsTrigger>
                <TabsTrigger value="security" className="flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  Security
                </TabsTrigger>
              </TabsList>

              {/* Business Settings */}
              <TabsContent value="business">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Building2 className="h-5 w-5" />
                      Business Information
                    </CardTitle>
                    <CardDescription>
                      Update your typing center's business information and contact details.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="centerName">Center Name</Label>
                        <Input
                          id="centerName"
                          value={businessSettings.centerName}
                          onChange={(e) => setBusinessSettings({...businessSettings, centerName: e.target.value})}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          type="email"
                          value={businessSettings.email}
                          onChange={(e) => setBusinessSettings({...businessSettings, email: e.target.value})}
                          className="mt-1"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          value={businessSettings.phone}
                          onChange={(e) => setBusinessSettings({...businessSettings, phone: e.target.value})}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="workingHours">Working Hours</Label>
                        <Input
                          id="workingHours"
                          value={businessSettings.workingHours}
                          onChange={(e) => setBusinessSettings({...businessSettings, workingHours: e.target.value})}
                          className="mt-1"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="address">Address</Label>
                      <Input
                        id="address"
                        value={businessSettings.address}
                        onChange={(e) => setBusinessSettings({...businessSettings, address: e.target.value})}
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="description">Business Description</Label>
                      <Textarea
                        id="description"
                        value={businessSettings.description}
                        onChange={(e) => setBusinessSettings({...businessSettings, description: e.target.value})}
                        className="mt-1"
                        rows={3}
                      />
                    </div>

                    <Button onClick={handleSaveBusinessSettings} className="bg-blue-600 hover:bg-blue-700">
                      Save Business Settings
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* System Settings */}
              <TabsContent value="system">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Database className="h-5 w-5" />
                      System Configuration
                    </CardTitle>
                    <CardDescription>
                      Configure system-wide settings and features.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label>Email Notifications</Label>
                          <p className="text-sm text-gray-500">Send email notifications for new enquiries</p>
                        </div>
                        <Switch
                          checked={systemSettings.enableNotifications}
                          onCheckedChange={(checked) => setSystemSettings({...systemSettings, enableNotifications: checked})}
                        />
                      </div>

                      <Separator />

                      <div className="flex items-center justify-between">
                        <div>
                          <Label>WhatsApp Integration</Label>
                          <p className="text-sm text-gray-500">Enable WhatsApp floating button</p>
                        </div>
                        <Switch
                          checked={systemSettings.enableWhatsApp}
                          onCheckedChange={(checked) => setSystemSettings({...systemSettings, enableWhatsApp: checked})}
                        />
                      </div>

                      <Separator />

                      <div className="flex items-center justify-between">
                        <div>
                          <Label>Auto-Assign Tasks</Label>
                          <p className="text-sm text-gray-500">Automatically assign new tasks to available staff</p>
                        </div>
                        <Switch
                          checked={systemSettings.autoAssignTasks}
                          onCheckedChange={(checked) => setSystemSettings({...systemSettings, autoAssignTasks: checked})}
                        />
                      </div>

                      <Separator />

                      <div className="flex items-center justify-between">
                        <div>
                          <Label>File Upload</Label>
                          <p className="text-sm text-gray-500">Allow customers to upload documents</p>
                        </div>
                        <Switch
                          checked={systemSettings.enableFileUpload}
                          onCheckedChange={(checked) => setSystemSettings({...systemSettings, enableFileUpload: checked})}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="maxFileSize">Max File Size (MB)</Label>
                        <Select 
                          value={systemSettings.maxFileSize} 
                          onValueChange={(value) => setSystemSettings({...systemSettings, maxFileSize: value})}
                        >
                          <SelectTrigger className="mt-1">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="5">5 MB</SelectItem>
                            <SelectItem value="10">10 MB</SelectItem>
                            <SelectItem value="20">20 MB</SelectItem>
                            <SelectItem value="50">50 MB</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="allowedTypes">Allowed File Types</Label>
                        <Input
                          id="allowedTypes"
                          value={systemSettings.allowedFileTypes}
                          onChange={(e) => setSystemSettings({...systemSettings, allowedFileTypes: e.target.value})}
                          className="mt-1"
                          placeholder="pdf,jpg,png,doc,docx"
                        />
                      </div>
                    </div>

                    <Button onClick={handleSaveSystemSettings} className="bg-blue-600 hover:bg-blue-700">
                      Save System Settings
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Enhanced User Management */}
              <TabsContent value="users">
                <div className="space-y-6">
                  {/* User Management Header */}
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="flex items-center gap-2">
                            <Users className="h-5 w-5" />
                            User Management
                          </CardTitle>
                          <CardDescription>
                            Manage staff accounts, roles, and permissions.
                          </CardDescription>
                        </div>
                        <Button 
                          onClick={() => setShowAddUser(true)}
                          className="bg-blue-600 hover:bg-blue-700"
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Add User
                        </Button>
                      </div>
                    </CardHeader>
                  </Card>

                  {/* Add New User Form */}
                  {showAddUser && (
                    <Card>
                      <CardHeader>
                        <CardTitle>Add New User</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="newUserName">Full Name</Label>
                            <Input
                              id="newUserName"
                              value={newUser.name}
                              onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                              className="mt-1"
                              placeholder="Enter full name"
                            />
                          </div>
                          <div>
                            <Label htmlFor="newUserEmail">Email</Label>
                            <Input
                              id="newUserEmail"
                              type="email"
                              value={newUser.email}
                              onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                              className="mt-1"
                              placeholder="Enter email address"
                            />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="newUserRole">Role</Label>
                          <Select 
                            value={newUser.role} 
                            onValueChange={(value) => setNewUser({...newUser, role: value})}
                          >
                            <SelectTrigger className="mt-1">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="admin">Admin</SelectItem>
                              <SelectItem value="staff">Staff</SelectItem>
                              <SelectItem value="viewer">Viewer</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="flex gap-2">
                          <Button onClick={handleAddUser} className="bg-green-600 hover:bg-green-700">
                            Add User
                          </Button>
                          <Button 
                            variant="outline" 
                            onClick={() => setShowAddUser(false)}
                          >
                            Cancel
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Users List */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Current Users</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {users.map((user) => (
                          <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                            <div className="flex-1">
                              <div className="flex items-center gap-3">
                                <div>
                                  <h3 className="font-medium">{user.name}</h3>
                                  <p className="text-sm text-gray-500">{user.email}</p>
                                </div>
                                <Badge variant={user.role === 'admin' ? 'default' : 'secondary'}>
                                  {user.role}
                                </Badge>
                                <Badge variant={user.status === 'active' ? 'default' : 'destructive'}>
                                  {user.status}
                                </Badge>
                              </div>
                              <p className="text-sm text-gray-500 mt-1">
                                Last active: {user.lastActive}
                              </p>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => handleToggleUserStatus(user.id)}
                              >
                                {user.status === 'active' ? 'Deactivate' : 'Activate'}
                              </Button>
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => handleDeleteUser(user.id)}
                                className="text-red-600 hover:text-red-700"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Admin Account Settings */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Admin Account</CardTitle>
                      <CardDescription>
                        Update your admin account information.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="adminName">Admin Name</Label>
                          <Input
                            id="adminName"
                            value={userSettings.adminName}
                            onChange={(e) => setUserSettings({...userSettings, adminName: e.target.value})}
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="adminEmail">Admin Email</Label>
                          <Input
                            id="adminEmail"
                            type="email"
                            value={userSettings.adminEmail}
                            onChange={(e) => setUserSettings({...userSettings, adminEmail: e.target.value})}
                            className="mt-1"
                          />
                        </div>
                      </div>

                      <Separator />

                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Change Password</h3>
                        <div>
                          <Label htmlFor="currentPassword">Current Password</Label>
                          <Input
                            id="currentPassword"
                            type="password"
                            value={userSettings.currentPassword}
                            onChange={(e) => setUserSettings({...userSettings, currentPassword: e.target.value})}
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="newPassword">New Password</Label>
                          <Input
                            id="newPassword"
                            type="password"
                            value={userSettings.newPassword}
                            onChange={(e) => setUserSettings({...userSettings, newPassword: e.target.value})}
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="confirmPassword">Confirm New Password</Label>
                          <Input
                            id="confirmPassword"
                            type="password"
                            value={userSettings.confirmPassword}
                            onChange={(e) => setUserSettings({...userSettings, confirmPassword: e.target.value})}
                            className="mt-1"
                          />
                        </div>
                      </div>

                      <Button onClick={handleSaveUserSettings} className="bg-blue-600 hover:bg-blue-700">
                        Save User Settings
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Security Settings */}
              <TabsContent value="security">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="h-5 w-5" />
                      Security & Privacy
                    </CardTitle>
                    <CardDescription>
                      Configure security settings and privacy options.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label>Two-Factor Authentication</Label>
                          <p className="text-sm text-gray-500">Add an extra layer of security</p>
                        </div>
                        <Button variant="outline">Configure 2FA</Button>
                      </div>

                      <Separator />

                      <div className="flex items-center justify-between">
                        <div>
                          <Label>Session Timeout</Label>
                          <p className="text-sm text-gray-500">Automatic logout after inactivity</p>
                        </div>
                        <Select defaultValue="60">
                          <SelectTrigger className="w-32">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="30">30 min</SelectItem>
                            <SelectItem value="60">1 hour</SelectItem>
                            <SelectItem value="120">2 hours</SelectItem>
                            <SelectItem value="480">8 hours</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <Separator />

                      <div className="flex items-center justify-between">
                        <div>
                          <Label>Data Backup</Label>
                          <p className="text-sm text-gray-500">Export all enquiry and user data</p>
                        </div>
                        <Button variant="outline">Download Backup</Button>
                      </div>

                      <Separator />

                      <div className="flex items-center justify-between">
                        <div>
                          <Label>Activity Logs</Label>
                          <p className="text-sm text-gray-500">View system activity and changes</p>
                        </div>
                        <Button variant="outline">View Logs</Button>
                      </div>
                    </div>

                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <h4 className="font-medium text-red-800 mb-2">Danger Zone</h4>
                      <p className="text-sm text-red-600 mb-3">These actions cannot be undone.</p>
                      <div className="space-y-2">
                        <Button variant="outline" className="text-red-600 border-red-300 hover:bg-red-50">
                          Clear All Data
                        </Button>
                        <Button variant="outline" className="text-red-600 border-red-300 hover:bg-red-50 ml-2">
                          Reset System
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminSettings;
