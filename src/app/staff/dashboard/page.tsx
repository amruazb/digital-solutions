'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  ClipboardList,
  FileText,
  Clock,
  CheckCircle,
  AlertCircle,
  Bell,
  User,
  LogOut,
  Filter,
  Search,
  Download,
  Upload,
  BarChart3,
  MessageSquare,
  Eye,
  Plus
} from 'lucide-react'
import {
  Button,
  Card,
  Input,
  StatusBadge,
  ProgressBar,
  EmptyState,
  FileUpload
} from '@/components/ui/design-system'

const mockTasks = [
  {
    id: 'TASK-001',
    title: 'Review Visa Application',
    status: 'in-progress',
    due: '2024-06-20',
    progress: 60,
    documents: 2,
    timeSpent: 45,
    messages: 1
  },
  {
    id: 'TASK-002',
    title: 'Upload Trade License Docs',
    status: 'pending',
    due: '2024-06-22',
    progress: 0,
    documents: 0,
    timeSpent: 0,
    messages: 0
  },
  {
    id: 'TASK-003',
    title: 'Complete Driving License Transfer',
    status: 'completed',
    due: '2024-06-15',
    progress: 100,
    documents: 3,
    timeSpent: 120,
    messages: 2
  }
]

const mockStats = [
  { label: 'Tasks Today', value: 7 },
  { label: 'Completed', value: 5 },
  { label: 'Pending', value: 2 },
  { label: 'Avg. Time/Task', value: '38m' }
]

const mockNotifications = [
  { id: 1, title: 'New Task Assigned', message: 'You have a new visa application to review.', time: '1h ago', read: false },
  { id: 2, title: 'Document Uploaded', message: 'Customer uploaded passport copy for TASK-001.', time: '3h ago', read: true }
]

export default function StaffDashboard() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  const filteredTasks = mockTasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || task.status === statusFilter
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
                Staff Dashboard
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
          {mockStats.map((stat, i) => (
            <Card key={i}>
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                  <BarChart3 className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                </div>
              </div>
            </Card>
          ))}
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="flex-1">
                <Input
                  placeholder="Search tasks..."
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
                New Task
              </Button>
            </div>

            {/* Task List */}
            <div className="space-y-4">
              {filteredTasks.length === 0 ? (
                <EmptyState
                  icon={<ClipboardList className="w-12 h-12" />}
                  title="No tasks found"
                  description="Try adjusting your search or filters"
                />
              ) : (
                filteredTasks.map((task) => (
                  <motion.div
                    key={task.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card className="cursor-pointer hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            {task.title}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {task.id} • Due {task.due}
                          </p>
                        </div>
                        <StatusBadge status={task.status}>
                          {task.status.replace('-', ' ')}
                        </StatusBadge>
                      </div>

                      <ProgressBar
                        value={task.progress}
                        label="Progress"
                        color={getStatusColor(task.status) as any}
                      />

                      <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                        <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                          <span className="flex items-center">
                            <FileText className="w-4 h-4 mr-1" />
                            {task.documents} docs
                          </span>
                          <span className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {task.timeSpent} min
                          </span>
                          <span className="flex items-center">
                            <MessageSquare className="w-4 h-4 mr-1" />
                            {task.messages} messages
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
                  Upload Document
                </Button>
                <Button className="w-full justify-start" variant="ghost">
                  <Download className="w-4 h-4 mr-2" />
                  Download Report
                </Button>
                <Button className="w-full justify-start" variant="ghost">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  View Performance
                </Button>
              </div>
            </Card>

            {/* Notifications */}
            <Card>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Notifications
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
                Upload Document
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