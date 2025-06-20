'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { 
  Users, 
  UserCheck, 
  Shield, 
  FileText, 
  Clock, 
  BarChart3, 
  MessageSquare, 
  Upload,
  CheckCircle,
  ArrowRight,
  Star,
  Zap,
  Car,
  Building,
  Heart,
  Globe,
  Home,
  Plane,
  Briefcase
} from 'lucide-react'
import { Button, Card, StatusBadge } from '@/components/ui/design-system'
import { services, serviceCategories } from '@/data/services'

const features = [
  {
    icon: <FileText className="w-6 h-6" />,
    title: "Document Management",
    description: "Upload, track, and manage documents with real-time status updates"
  },
  {
    icon: <Clock className="w-6 h-6" />,
    title: "Real-time Tracking",
    description: "Monitor progress with live updates and estimated completion times"
  },
  {
    icon: <MessageSquare className="w-6 h-6" />,
    title: "Communication Hub",
    description: "Direct messaging between customers, staff, and administrators"
  },
  {
    icon: <BarChart3 className="w-6 h-6" />,
    title: "Analytics Dashboard",
    description: "Comprehensive reporting and performance insights"
  }
]

const userPortals = [
  {
    title: "Customer Portal",
    description: "Submit enquiries, track progress, and manage your documents",
    icon: <Users className="w-8 h-8" />,
    features: ["Service Submission", "Document Upload", "Real-time Tracking", "Communication Center"],
    color: "blue",
    href: "/customer/login",
    cta: "Access Customer Portal"
  },
  {
    title: "Staff Portal",
    description: "Manage tasks, handle documents, and track performance",
    icon: <UserCheck className="w-8 h-8" />,
    features: ["Task Queue", "Document Handling", "Time Tracking", "Performance Stats"],
    color: "green",
    href: "/staff/login",
    cta: "Access Staff Portal"
  },
  {
    title: "Admin Portal",
    description: "Oversee operations, manage staff, and generate reports",
    icon: <Shield className="w-8 h-8" />,
    features: ["Analytics Dashboard", "Staff Management", "Service Management", "Reporting Tools"],
    color: "yellow",
    href: "/admin/login",
    cta: "Access Admin Portal"
  }
]

const stats = [
  { label: "Active Enquiries", value: "1,234", change: "+12%" },
  { label: "Staff Members", value: "45", change: "+3" },
  { label: "Completed Today", value: "89", change: "+8%" },
  { label: "Customer Satisfaction", value: "98%", change: "+2%" }
]

// Featured services for the main page
const featuredServices = services.filter(service => service.popular).slice(0, 6)

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-800"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Digital Enquiry Management System
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Streamline your enquiry workflow with our comprehensive digital platform. 
              Connect customers, staff, and administrators in one unified system.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                Get Started
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button variant="ghost" size="lg" className="text-white border-white hover:bg-white/10">
                Learn More
              </Button>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Stats Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                  {stat.label}
                </div>
                <div className="text-xs text-green-600 dark:text-green-400">
                  {stat.change}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Powerful Features
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Everything you need to manage enquiries efficiently and provide excellent service
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="text-center h-full">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mx-auto mb-4 text-blue-600 dark:text-blue-400">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {feature.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Services Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Our Popular Services
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Professional document management and government services with digital tracking
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {featuredServices.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Card className="h-full cursor-pointer hover:shadow-lg transition-all duration-300">
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`p-3 rounded-lg ${service.color}`}>
                        <service.icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex items-center gap-2">
                        <StatusBadge status="completed">
                          Popular
                        </StatusBadge>
                        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                          {service.duration}
                        </span>
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      {service.description}
                    </p>
                    
                    <div className="space-y-2 mb-4">
                      {service.features.slice(0, 3).map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                          <span className="text-sm text-gray-600 dark:text-gray-400">{feature}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
                        {service.price}
                      </span>
                      <Button size="sm" variant="primary">
                        Learn More
                        <ArrowRight className="ml-1 w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <Link href="/services">
              <Button size="lg" variant="primary">
                View All Services
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* User Portals Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              User Portals
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Tailored experiences for different user types with role-based access and features
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {userPortals.map((portal, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ y: -5 }}
              >
                <Card className="h-full">
                  <div className="text-center mb-6">
                    <div className={`w-16 h-16 bg-${portal.color}-100 dark:bg-${portal.color}-900 rounded-lg flex items-center justify-center mx-auto mb-4 text-${portal.color}-600 dark:text-${portal.color}-400`}>
                      {portal.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      {portal.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                      {portal.description}
                    </p>
                  </div>

                  <div className="space-y-3 mb-8">
                    {portal.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                        <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Link href={portal.href}>
                    <Button className="w-full" variant="primary">
                      {portal.cta}
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join thousands of organizations already using our Digital Enquiry Management System
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                Start Free Trial
                <Zap className="ml-2 w-5 h-5" />
              </Button>
              <Button variant="ghost" size="lg" className="text-white border-white hover:bg-white/10">
                Schedule Demo
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Digital Enquiry Management System</h3>
              <p className="text-gray-400">
                Streamlining enquiry workflows for modern organizations
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="#" className="hover:text-white">Features</Link></li>
                <li><Link href="#" className="hover:text-white">Pricing</Link></li>
                <li><Link href="#" className="hover:text-white">Security</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="#" className="hover:text-white">Documentation</Link></li>
                <li><Link href="#" className="hover:text-white">Help Center</Link></li>
                <li><Link href="#" className="hover:text-white">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="#" className="hover:text-white">About</Link></li>
                <li><Link href="#" className="hover:text-white">Blog</Link></li>
                <li><Link href="#" className="hover:text-white">Careers</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Digital Enquiry Management System. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
} 