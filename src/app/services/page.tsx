'use client'

import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
  Shield
} from 'lucide-react';
import Link from 'next/link';
import { services, serviceCategories } from '@/data/services';

export default function ServicesPage() {
  const [selectedService, setSelectedService] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Filter services based on search and category
  const filteredServices = useMemo(() => {
    return services.filter(service => {
      const matchesSearch = service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           service.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           service.features.some(feature => feature.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesCategory = selectedCategory === 'all' || service.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  const newToUAEServices = [
    'Emirates ID Application',
    'Health Insurance (Daman)',
    'Bank Account Opening Assistance',
    'Mobile Connection Documents',
    'Salary Certificate Typing',
    'Labour Contract Typing'
  ];

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
                <p className="text-sm text-gray-600">All Services</p>
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
            Complete Service Portfolio
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
            From document typing to business setup, we handle all your government paperwork needs in the UAE.
            Professional, fast, and reliable services at your fingertips.
          </p>
        </div>

        {/* New to UAE Card */}
        <div className="mb-8">
          <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="bg-green-100 p-3 rounded-lg">
                  <Heart className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <CardTitle className="text-green-800">New to UAE? We've Got You Covered!</CardTitle>
                  <CardDescription className="text-green-700">
                    Essential services to get you started in the UAE quickly and hassle-free
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                {newToUAEServices.map((service, index) => (
                  <div key={index} className="flex items-center space-x-2 text-sm text-green-700">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                    <span>{service}</span>
                  </div>
                ))}
              </div>
              <div className="flex gap-3">
                <Button className="bg-green-600 hover:bg-green-700">
                  <HelpCircle className="w-4 h-4 mr-2" />
                  Get New Resident Package
                </Button>
                <Button variant="outline" className="border-green-300 text-green-700 hover:bg-green-50">
                  WhatsApp for Help
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search services (e.g., visa, license, translation)..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="md:w-64">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {Object.entries(serviceCategories).map(([key, category]) => (
                    <SelectItem key={key} value={key}>{category.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          {searchTerm && (
            <div className="mt-4 text-sm text-gray-600">
              Found {filteredServices.length} service{filteredServices.length !== 1 ? 's' : ''} matching "{searchTerm}"
            </div>
          )}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredServices.map((service) => (
            <Card 
              key={service.id} 
              className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer group border-0 shadow-lg"
              onClick={() => setSelectedService(service)}
            >
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-lg ${service.color} group-hover:scale-110 transition-transform duration-300`}>
                    <service.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex flex-col gap-2">
                    {service.popular && (
                      <Badge className="bg-green-100 text-green-800 text-xs">
                        Popular
                      </Badge>
                    )}
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                      {service.duration}
                    </span>
                  </div>
                </div>
                <CardTitle className="text-lg group-hover:text-blue-600 transition-colors duration-300">
                  {service.title}
                </CardTitle>
                <CardDescription className="text-gray-600 text-sm leading-relaxed">
                  {service.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium text-gray-900">{service.price}</span>
                  </div>
                  <div className="flex items-center space-x-1 text-sm text-gray-500">
                    <Clock className="w-4 h-4" />
                    <span>{service.duration}</span>
                  </div>
                </div>
                
                <div className="space-y-2 mb-4">
                  {service.features.slice(0, 3).map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2 text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                  {service.features.length > 3 && (
                    <div className="text-sm text-blue-600 font-medium">
                      +{service.features.length - 3} more features
                    </div>
                  )}
                </div>

                <div className="flex gap-2">
                  <Button className="flex-1 bg-blue-600 hover:bg-blue-700 group-hover:bg-blue-700 transition-colors duration-300">
                    Get Started
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                  </Button>
                  <Button variant="outline" size="sm" className="px-3">
                    <HelpCircle className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Why Choose Us Section */}
        <div className="bg-white rounded-lg shadow-sm border p-8 mb-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Interact Typing?</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We're your trusted partner for all government services in the UAE
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Trusted & Reliable</h3>
              <p className="text-gray-600">Years of experience with government procedures and requirements</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Fast & Efficient</h3>
              <p className="text-gray-600">Quick turnaround times with real-time status updates</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Quality Service</h3>
              <p className="text-gray-600">Professional service with attention to detail and accuracy</p>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg text-white p-8">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold mb-4">Need Help? Contact Us!</h2>
            <p className="text-blue-100 text-lg">
              Our team is here to assist you with any questions or concerns
            </p>
          </div>
          
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
        </div>
      </div>
    </div>
  );
} 