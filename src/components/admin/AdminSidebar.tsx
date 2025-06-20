
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, 
  FileText, 
  Users, 
  Settings, 
  LogOut,
  Building2,
  UserPlus,
  Briefcase,
  History,
  Bell
} from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  { name: 'Enquiries', href: '/admin/enquiries', icon: FileText },
  { name: 'Services', href: '/admin/services', icon: Building2 },
  { name: 'Staff', href: '/admin/staff', icon: Users },
  { name: 'Settings', href: '/admin/settings', icon: Settings },
];

const AdminSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { 
      label: 'Dashboard', 
      icon: LayoutDashboard, 
      path: '/admin/dashboard',
      description: 'Overview and statistics'
    },
    { 
      label: 'Enquiries', 
      icon: FileText, 
      path: '/admin/enquiries',
      description: 'View all enquiries'
    },
    { 
      label: 'Assignments', 
      icon: UserPlus, 
      path: '/admin/assignments',
      description: 'Assign work to staff'
    },
    { 
      label: 'Work History', 
      icon: History, 
      path: '/admin/work-history',
      description: 'Track completed work'
    },
    { 
      label: 'Renewal Reminders', 
      icon: Bell, 
      path: '/admin/renewal-reminders',
      description: 'Document expiry reminders'
    },
    { 
      label: 'Services', 
      icon: Briefcase, 
      path: '/admin/services',
      description: 'Manage available services'
    },
    { 
      label: 'Staff', 
      icon: Users, 
      path: '/admin/staff',
      description: 'Manage team members'
    },
    { 
      label: 'Settings', 
      icon: Settings, 
      path: '/admin/settings',
      description: 'System configuration'
    }
  ];

  const handleLogout = () => {
    localStorage.removeItem('adminSession');
    navigate('/admin/login');
  };

  return (
    <div className="flex h-full w-64 flex-col bg-white shadow-lg border-r border-gray-200">
      {/* Logo */}
      <div className="flex h-16 items-center justify-center border-b border-gray-200 bg-blue-600">
        <h1 className="text-lg font-bold text-white">Interact Admin</h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 p-4">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Button
              key={item.label}
              variant={isActive ? "default" : "ghost"}
              className={cn(
                "w-full justify-start",
                isActive 
                  ? "bg-blue-100 text-blue-700 hover:bg-blue-200" 
                  : "text-gray-700 hover:bg-gray-100"
              )}
              onClick={() => navigate(item.path)}
            >
              <item.icon className="mr-3 h-4 w-4" />
              {item.label}
            </Button>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-gray-200">
        <Button
          variant="ghost"
          className="w-full justify-start text-red-600 hover:bg-red-50 hover:text-red-700"
          onClick={handleLogout}
        >
          <LogOut className="mr-3 h-4 w-4" />
          Logout
        </Button>
      </div>
    </div>
  );
};

export default AdminSidebar;
