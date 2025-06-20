'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { 
  FileText, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  Download, 
  MessageSquare, 
  Upload,
  Search,
  Filter,
  Bell,
  User,
  LogOut,
  Plus,
  Eye,
  Edit
} from 'lucide-react'
import { 
  Button, 
  Card, 
  Input, 
  StatusBadge, 
  ProgressBar, 
  FileUpload,
  EmptyState
} from '@/components/ui/design-system'

// Mock data
const mockEnquiries = [
  {
    id: 'ENQ-001',
    title: 'Visa Application',
    status: 'in-progress',
    progress: 65,
    submittedDate: '2024-01-15',
    estimatedCompletion: '2024-01-25',
    documents: 3,
    messages: 2
  },
  {
    id: 'ENQ-002',
    title: 'Trade License Renewal',
    status: 'completed',
    progress: 100,
    submittedDate: '2024-01-10',
    completedDate: '2024-01-20',
    documents: 5,
    messages: 4
  },
  {
    id: 'ENQ-003',
    title: 'Driving License Transfer',
    status: 'pending',
    progress: 0,
    submittedDate: '2024-01-18',
    estimatedCompletion: '2024-02-01',
    documents: 2,
    messages: 0
  }
]

const mockNotifications = [
  {
    id: 1,
    title: 'Document Required',
    message: 'Please upload your passport copy for ENQ-001',
    time: '2 hours ago',
    read: false
  },
  {
    id: 2,
    title: 'Status Update',
    message: 'Your visa application has been submitted to authorities',
    time: '1 day ago',
    read: true
  }
]

export default function CustomerDashboard() {
  const [selectedEnquiry, setSelectedEnquiry] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  const filteredEnquiries = mockEnquiries.filter(enquiry => {
    const matchesSearch = enquiry.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         enquiry.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || enquiry.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'green'
      case 'in-progress': return 'blue'
      case 'pending': return 'yellow'
      default: return 'gray'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Customer Dashboard
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Bell className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="sm">
                <User className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="sm">
                <LogOut className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        >
          <Card>
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                <FileText className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Enquiries</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">12</p>
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center">
              <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Completed</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">8</p>
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 dark:bg-yellow-900 rounded-lg">
                <Clock className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">In Progress</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">3</p>
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center">
              <div className="p-2 bg-red-100 dark:bg-red-900 rounded-lg">
                <AlertCircle className="w-6 h-6 text-red-600 dark:text-red-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Pending</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">1</p>
              </div>
            </div>
          </Card>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="flex-1">
                <Input
                  placeholder="Search enquiries..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                New Enquiry
              </Button>
            </div>

            {/* Enquiries List */}
            <div className="space-y-4">
              {filteredEnquiries.length === 0 ? (
                <EmptyState
                  icon={<FileText className="w-12 h-12" />}
                  title="No enquiries found"
                  description="Try adjusting your search or filters"
                />
              ) : (
                filteredEnquiries.map((enquiry) => (
                  <motion.div
                    key={enquiry.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card className="cursor-pointer hover:shadow-md transition-shadow"
                          onClick={() => setSelectedEnquiry(enquiry.id)}>
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            {enquiry.title}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {enquiry.id} • Submitted {enquiry.submittedDate}
                          </p>
                        </div>
                        <StatusBadge status={enquiry.status}>
                          {enquiry.status.replace('-', ' ')}
                        </StatusBadge>
                      </div>

                      <ProgressBar 
                        value={enquiry.progress} 
                        label="Progress"
                        color={getStatusColor(enquiry.status) as any}
                      />

                      <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                        <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                          <span className="flex items-center">
                            <FileText className="w-4 h-4 mr-1" />
                            {enquiry.documents} docs
                          </span>
                          <span className="flex items-center">
                            <MessageSquare className="w-4 h-4 mr-1" />
                            {enquiry.messages} messages
                          </span>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <MessageSquare className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Quick Actions
              </h3>
              <div className="space-y-3">
                <Button className="w-full justify-start" variant="ghost">
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Documents
                </Button>
                <Button className="w-full justify-start" variant="ghost">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Send Message
                </Button>
                <Button className="w-full justify-start" variant="ghost">
                  <Download className="w-4 h-4 mr-2" />
                  Download Reports
                </Button>
              </div>
            </Card>

            {/* Recent Notifications */}
            <Card>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Recent Notifications
              </h3>
              <div className="space-y-3">
                {mockNotifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-3 rounded-lg border ${
                      notification.read 
                        ? 'bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600' 
                        : 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {notification.title}
                        </p>
                        <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                          {notification.message}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                          {notification.time}
                        </p>
                      </div>
                      {!notification.read && (
                        <div className="w-2 h-2 bg-blue-600 rounded-full ml-2"></div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* File Upload */}
            <Card>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Upload Documents
              </h3>
              <FileUpload
                onFileSelect={(file) => console.log('File selected:', file)}
                accept=".pdf,.doc,.docx,.jpg,.png"
                maxSize={10}
                label=""
              />
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
} 