import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner';
import { AuthProvider } from '@/components/auth/AuthContext';
import WhatsAppButton from '@/components/WhatsAppButton';
import Index from '@/pages/Index';
import Services from '@/pages/Services';
import TrackService from '@/pages/TrackService';
import CustomerLogin from '@/pages/CustomerLogin';
import CustomerDashboard from '@/pages/CustomerDashboard';
import AdminLogin from '@/pages/AdminLogin';
import AdminDashboard from '@/pages/AdminDashboard';
import AdminEnquiries from '@/pages/AdminEnquiries';
import AdminServices from '@/pages/AdminServices';
import AdminStaff from '@/pages/AdminStaff';
import AdminSettings from '@/pages/AdminSettings';
import AdminRenewalReminders from '@/pages/AdminRenewalReminders';
import AdminAssignments from '@/pages/AdminAssignments';
import AdminWorkHistory from '@/pages/AdminWorkHistory';
import StaffLogin from '@/pages/StaffLogin';
import StaffDashboard from '@/pages/StaffDashboard';
import EnquiryDetail from '@/pages/EnquiryDetail';
import NotFound from '@/pages/NotFound';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-background">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/services" element={<Services />} />
            <Route path="/track-service" element={<TrackService />} />
            
            {/* Customer Routes */}
            <Route path="/customer/login" element={<CustomerLogin />} />
            <Route path="/customer/dashboard" element={<CustomerDashboard />} />
            
            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/enquiries" element={<AdminEnquiries />} />
            <Route path="/admin/enquiries/:id" element={<EnquiryDetail />} />
            <Route path="/admin/services" element={<AdminServices />} />
            <Route path="/admin/staff" element={<AdminStaff />} />
            <Route path="/admin/settings" element={<AdminSettings />} />
            <Route path="/admin/renewals" element={<AdminRenewalReminders />} />
            <Route path="/admin/assignments" element={<AdminAssignments />} />
            <Route path="/admin/work-history" element={<AdminWorkHistory />} />
            
            {/* Staff Routes */}
            <Route path="/staff/login" element={<StaffLogin />} />
            <Route path="/staff/dashboard" element={<StaffDashboard />} />
            
            {/* 404 Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <WhatsAppButton />
          <Toaster />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
