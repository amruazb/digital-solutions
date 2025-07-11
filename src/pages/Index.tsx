import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Building2, FileText, Users, Car, Shield, Heart, Globe, Home, Plane, Briefcase, Clock, CheckCircle, Star, Phone, Mail, MapPin } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();

  const serviceCategories = [
    {
      title: 'Document Typing Services',
      icon: FileText,
      color: 'bg-blue-600',
      description: 'Professional typing for all your documentation needs',
      services: [
        'Consent & Authorization Letters',
        'Employment Letters',
        'Resignation Letters',
        'Termination Letters',
        'Custom Immigration Letters',
        'Legal Document Typing'
      ],
      features: ['Fast turnaround', 'Professional formatting', 'Error-free typing']
    },
    {
      title: 'Business Setup & PRO Services',
      icon: Briefcase,
      color: 'bg-purple-600',
      description: 'Complete business registration and PRO services',
      services: [
        'Trade License Applications',
        'Company Formation',
        'MOA Drafting & Renewal',
        'Partner Addition/Removal',
        'Business License Renewal',
        'Company Liquidation'
      ],
      features: ['Expert guidance', 'Quick processing', 'Government liaison']
    },
    {
      title: 'Visa & Immigration Services',
      icon: Users,
      color: 'bg-green-600',
      description: 'Comprehensive visa and family sponsorship services',
      services: [
        'Family Visa Applications',
        'Visa Renewals & Cancellations',
        'NOC for Sponsoring',
        'Maid Visa Processing',
        'Change of Status',
        'Travel Permits for Minors'
      ],
      features: ['Family reunification', 'Status changes', 'Travel assistance']
    },
    {
      title: 'Driving License Services',
      icon: Car,
      color: 'bg-orange-600',
      description: 'Complete driving license solutions with golden chance',
      services: [
        'Golden Chance Booking',
        'New License Applications',
        'Eye Test Appointments',
        'Traffic File Transfers',
        'Driving Class Booking',
        'Foreign License Translation'
      ],
      features: ['Golden chance priority', 'Fast track service', 'Full assistance']
    },
    {
      title: 'Attestation Services',
      icon: Shield,
      color: 'bg-indigo-600',
      description: 'Document attestation for UAE and international use',
      services: [
        'Birth Certificate Attestation',
        'Degree Certificate Attestation',
        'Marriage Certificate Attestation',
        'MOFA Attestation',
        'Embassy Attestations',
        'Police Clearance Certificates'
      ],
      features: ['MOFA approved', 'Embassy liaison', 'Secure processing']
    },
    {
      title: 'Health Insurance Services',
      icon: Heart,
      color: 'bg-red-600',
      description: 'Complete health insurance and Daman applications',
      services: [
        'New Daman Applications',
        'Insurance Renewals',
        'DHA/HAAD Registrations',
        'Medical Insurance',
        'Investor Insurance',
        'Family Medical Coverage'
      ],
      features: ['UAE compliant', 'Quick approvals', 'Family coverage']
    }
  ];

  const whyChooseUs = [
    {
      icon: Star,
      title: 'Expert Team',
      description: '15+ years of experience in UAE documentation and business services'
    },
    {
      icon: Clock,
      title: 'Fast Service',
      description: 'Quick turnaround times with same-day service for urgent requests'
    },
    {
      icon: CheckCircle,
      title: '100% Accuracy',
      description: 'Error-free documentation with quality assurance checks'
    },
    {
      icon: Shield,
      title: 'Secure Process',
      description: 'Your documents are handled with utmost confidentiality and security'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Building2 className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">
                UAE DIGITAL SOLUTIONS
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={() => navigate('/services')}>
                Services
              </Button>
              <Button variant="ghost" onClick={() => navigate('/track-service')}>
                Track Service
              </Button>
              <Button variant="ghost" onClick={() => navigate('/customer/login')}>
                Customer Login
              </Button>
              <Button variant="ghost" onClick={() => navigate('/staff/login')}>
                Staff Login
              </Button>
              <Button variant="ghost" onClick={() => navigate('/admin/login')}>
                Admin
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-100 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl lg:text-6xl">
            Welcome to UAE DIGITAL SOLUTIONS
          </h1>
          <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto">
            Your trusted partner for all typing, documentation, and business services in the UAE. 
            Serving thousands of satisfied customers with professional excellence since 2008.
          </p>
          <div className="mt-8 flex justify-center space-x-4">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700" onClick={() => navigate('/services')}>
              Explore Services
            </Button>
            <Button variant="outline" size="lg">
              Contact Us
            </Button>
          </div>
        </div>
      </div>

      {/* Detailed Services Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
              Our Comprehensive Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We offer a complete range of professional services to meet all your documentation, 
              business setup, and government liaison needs in the UAE.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {serviceCategories.map((category, index) => {
              const IconComponent = category.icon;
              return (
                <div key={index} className="bg-gray-50 rounded-xl p-8 hover:shadow-lg transition-shadow">
                  <div className="flex items-center mb-6">
                    <div className={`${category.color} p-3 rounded-lg`}>
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-2xl font-bold text-gray-900">{category.title}</h3>
                      <p className="text-gray-600 mt-1">{category.description}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Services Include:</h4>
                      <ul className="space-y-2">
                        {category.services.map((service, idx) => (
                          <li key={idx} className="flex items-start">
                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                            <span className="text-sm text-gray-700">{service}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Key Features:</h4>
                      <ul className="space-y-2">
                        {category.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start">
                            <Star className="h-4 w-4 text-yellow-500 mt-0.5 mr-2 flex-shrink-0" />
                            <span className="text-sm text-gray-700">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  <Button 
                    className={`${category.color} hover:opacity-90 text-white w-full`}
                    onClick={() => navigate('/services')}
                  >
                    Learn More & Get Started
                  </Button>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
              Why Choose UAE DIGITAL SOLUTIONS?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Trusted by thousands of customers across the UAE for reliable, professional, and efficient services.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseUs.map((benefit, index) => {
              const IconComponent = benefit.icon;
              return (
                <div key={index} className="text-center bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                  <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600">
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
              How Our Process Works
            </h2>
            <p className="text-xl text-gray-600">
              Simple, transparent, and efficient - get your documents processed in 3 easy steps
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="bg-blue-600 text-white rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                1
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                Submit Your Request
              </h3>
              <p className="text-gray-600 mb-4">
                Visit our office or submit your requirements online. Our team will guide you through the process and required documents.
              </p>
              <ul className="text-sm text-gray-500 space-y-1">
                <li>• Free consultation</li>
                <li>• Document checklist provided</li>
                <li>• Transparent pricing</li>
              </ul>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-600 text-white rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                2
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                We Process Your Request
              </h3>
              <p className="text-gray-600 mb-4">
                Our experienced team handles all paperwork, government liaisons, and processing with meticulous attention to detail.
              </p>
              <ul className="text-sm text-gray-500 space-y-1">
                <li>• Regular status updates</li>
                <li>• Government liaison</li>
                <li>• Quality assurance</li>
              </ul>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-600 text-white rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                3
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                Receive Your Documents
              </h3>
              <p className="text-gray-600 mb-4">
                Get your completed documents quickly and securely. We offer home delivery and digital copies for your convenience.
              </p>
              <ul className="text-sm text-gray-500 space-y-1">
                <li>• Home delivery available</li>
                <li>• Digital copies provided</li>
                <li>• Follow-up support</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
              Get In Touch With Us
            </h2>
            <p className="text-xl text-gray-600">
              Ready to get started? Contact us today for professional assistance with all your documentation needs.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">Contact Information</h3>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <MapPin className="h-6 w-6 text-blue-600 mt-1 mr-4" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Our Office</h4>
                    <p className="text-gray-600 mt-1">
                      Al Karama, Dubai, UAE<br />
                      Near ADCB Metro Station
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Phone className="h-6 w-6 text-blue-600 mt-1 mr-4" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Phone</h4>
                    <p className="text-gray-600 mt-1">
                      +971 4 234 5678<br />
                      +971 54 403 6701 (WhatsApp)
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Mail className="h-6 w-6 text-blue-600 mt-1 mr-4" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Email</h4>
                    <p className="text-gray-600 mt-1">
                      info@interacttyping.ae<br />
                      services@interacttyping.ae
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2">Business Hours</h4>
                <p className="text-blue-800 text-sm">
                  Saturday - Thursday: 8:00 AM - 8:00 PM<br />
                  Friday: 2:00 PM - 8:00 PM
                </p>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">Send Us a Message</h3>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Your Full Name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="+971 XX XXX XXXX"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="your.email@example.com"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Service Required
                  </label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option>Select a service</option>
                    <option>Document Typing</option>
                    <option>Business Setup</option>
                    <option>Visa Services</option>
                    <option>Driving License</option>
                    <option>Attestation</option>
                    <option>Other</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Please describe your requirements..."
                  />
                </div>
                
                <Button className="w-full bg-blue-600 hover:bg-blue-700 py-3">
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center mb-4">
                <Building2 className="h-8 w-8 text-blue-400" />
                <span className="ml-2 text-xl font-bold text-white">
                  UAE DIGITAL SOLUTIONS
                </span>
              </div>
              <p className="text-gray-400 mb-4">
                Your trusted partner for all typing, documentation, and business services in the UAE. 
                Professional excellence since 2008.
              </p>
              <p className="text-sm text-gray-500">
                Licensed by Dubai Municipality | Trade License: 123456
              </p>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="/services" className="text-gray-400 hover:text-white transition-colors">Our Services</a></li>
                <li><a href="/track-service" className="text-gray-400 hover:text-white transition-colors">Track Service</a></li>
                <li><a href="/customer/login" className="text-gray-400 hover:text-white transition-colors">Customer Portal</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">About Us</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">Contact Info</h3>
              <ul className="space-y-2 text-gray-400">
                <li>+971 4 234 5678</li>
                <li>info@interacttyping.ae</li>
                <li>Al Karama, Dubai, UAE</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center">
            <p className="text-gray-400">
              &copy; {new Date().getFullYear()} UAE DIGITAL SOLUTIONS. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
