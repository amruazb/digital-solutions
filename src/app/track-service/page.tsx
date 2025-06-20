'use client'

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
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
  Building2,
  Calendar,
  AlertTriangle,
  Eye,
  Download
} from 'lucide-react';
import Link from 'next/link';

export default function TrackServicePage() {
  const [trackingId, setTrackingId] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [isSearching, setIsSearching] = useState(false);

  // Mock tracking data
  const mockTrackingData = {
    id: 'TRK-2024-001234',
    clientName: 'Ahmed Hassan',
    service: 'Trade License & Company Setup',
    status: 'In Progress',
    progress: 65,
    createdAt: '2024-01-15',
    estimatedCompletion: '2024-01-20',
    assignedTo: 'Sarah Johnson',
    updates: [
      {
        date: '2024-01-16',
        time: '14:30',
        status: 'Document Review',
        description: 'Documents have been reviewed and approved. Moving to next stage.',
        icon: CheckCircle
      },
      {
        date: '2024-01-15',
        time: '16:45',
        status: 'Application Submitted',
        description: 'Application has been submitted to the relevant authority.',
        icon: FileText
      },
      {
        date: '2024-01-15',
        time: '10:20',
        status: 'Enquiry Received',
        description: 'Your enquiry has been received and assigned to our team.',
        icon: Clock
      }
    ]
  };

  const handleSearch = () => {
    if (!trackingId.trim()) {
      return;
    }

    setIsSearching(true);
    
    // Simulate API call
    setTimeout(() => {
      setSearchResult(mockTrackingData);
      setIsSearching(false);
    }, 1000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'In Progress':
        return 'bg-blue-100 text-blue-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="bg-blue-600 text-white p-2 rounded-lg">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Interact Typing Services</h1>
                <p className="text-sm text-gray-600">Track Your Service</p>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <div className="flex items-center space-x-1 text-sm text-gray-600">
                <Phone className="w-4 h-4" />
                <span>+971 XX XXX XXXX</span>
              </div>
              <Link href="/">
                <Button variant="outline" size="sm">
                  Back to Home
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Track Your Service
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
            Stay updated on the progress of your service. Enter your tracking ID to get real-time updates.
          </p>
        </div>

        {/* Search Section */}
        <div className="max-w-2xl mx-auto mb-12">
          <Card className="bg-white shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="w-5 h-5 text-blue-600" />
                Track Your Service
              </CardTitle>
              <CardDescription>
                Enter your tracking ID to get the latest updates on your service
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                <div className="flex-1">
                  <Input
                    placeholder="Enter your tracking ID (e.g., TRK-2024-001234)"
                    value={trackingId}
                    onChange={(e) => setTrackingId(e.target.value)}
                    className="w-full"
                  />
                </div>
                <Button 
                  onClick={handleSearch}
                  disabled={isSearching || !trackingId.trim()}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  {isSearching ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  ) : (
                    <>
                      <Search className="w-4 h-4 mr-2" />
                      Track
                    </>
                  )}
                </Button>
              </div>
              
              <div className="mt-4 text-sm text-gray-600">
                <p>Don't have a tracking ID? <Link href="/services" className="text-blue-600 hover:underline">Submit a new enquiry</Link></p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search Results */}
        {searchResult && (
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Service Overview */}
            <Card className="bg-white shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl">{searchResult.service}</CardTitle>
                    <CardDescription>Tracking ID: {searchResult.id}</CardDescription>
                  </div>
                  <Badge className={getStatusColor(searchResult.status)}>
                    {searchResult.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Client</p>
                    <p className="text-lg font-semibold text-gray-900">{searchResult.clientName}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Assigned To</p>
                    <p className="text-lg font-semibold text-gray-900">{searchResult.assignedTo}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Estimated Completion</p>
                    <p className="text-lg font-semibold text-gray-900">{searchResult.estimatedCompletion}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Progress Timeline */}
            <Card className="bg-white shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-blue-600" />
                  Service Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {searchResult.updates.map((update, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <update.icon className="w-5 h-5 text-blue-600" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-semibold text-gray-900">{update.status}</p>
                          <p className="text-sm text-gray-500">{update.date} at {update.time}</p>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{update.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
              <CardHeader>
                <CardTitle>Need Help?</CardTitle>
                <CardDescription className="text-blue-100">
                  Contact us if you have any questions about your service
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                  <div className="flex flex-col items-center">
                    <Phone className="w-8 h-8 mb-2" />
                    <h3 className="font-semibold mb-1">Call Us</h3>
                    <p className="text-blue-100">+971 XX XXX XXXX</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <Mail className="w-8 h-8 mb-2" />
                    <h3 className="font-semibold mb-1">Email Us</h3>
                    <p className="text-blue-100">info@interacttyping.ae</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <MapPin className="w-8 h-8 mb-2" />
                    <h3 className="font-semibold mb-1">Visit Us</h3>
                    <p className="text-blue-100">Dubai, UAE</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Features Section */}
        {!searchResult && (
          <div className="mt-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Track Your Service?</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Stay informed about your service progress with our real-time tracking system
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Eye className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Real-time Updates</h3>
                <p className="text-gray-600">Get instant updates on your service progress</p>
              </div>
              <div className="text-center">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Timeline Tracking</h3>
                <p className="text-gray-600">See the complete timeline of your service</p>
              </div>
              <div className="text-center">
                <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Secure & Private</h3>
                <p className="text-gray-600">Your information is secure and confidential</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 