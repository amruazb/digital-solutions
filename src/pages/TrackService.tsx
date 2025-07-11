import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Search, Phone, MessageCircle, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { mockCustomerServices } from '@/data/mockCustomerData';
import { useToast } from "@/hooks/use-toast";

const TrackService = () => {
  const [trackingInput, setTrackingInput] = useState('');
  const [trackedService, setTrackedService] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const { toast } = useToast();

  const handleTrackService = async () => {
    setIsSearching(true);
    
    // Simulate API call
    setTimeout(() => {
      const service = mockCustomerServices.find(
        s => s.trackingNumber.toLowerCase() === trackingInput.toLowerCase() ||
             s.customerId === trackingInput
      );
      
      if (service) {
        setTrackedService(service);
        toast({
          title: "Service Found",
          description: "Your service details have been loaded.",
        });
      } else {
        toast({
          title: "Service Not Found",
          description: "Please check your tracking number or phone number.",
          variant: "destructive"
        });
      }
      setIsSearching(false);
    }, 1000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in_progress': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'in_progress': return <Clock className="w-5 h-5 text-blue-600" />;
      case 'pending': return <AlertCircle className="w-5 h-5 text-yellow-600" />;
      default: return <Clock className="w-5 h-5 text-gray-600" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="bg-blue-600 text-white p-2 rounded-lg">
                <Search className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Track Your Service</h1>
                <p className="text-sm text-gray-600">Real-time updates on your service status</p>
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={() => window.location.href = '/'}>
              Back to Home
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Search Section */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Track Your Service</CardTitle>
              <CardDescription>
                Enter your tracking number or phone number to get real-time updates
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="tracking">Tracking Number or Phone Number</Label>
                <div className="flex gap-2 mt-1">
                  <Input
                    id="tracking"
                    placeholder="TRK-2024-001 or +971XXXXXXXXX"
                    value={trackingInput}
                    onChange={(e) => setTrackingInput(e.target.value)}
                  />
                  <Button 
                    onClick={handleTrackService} 
                    disabled={!trackingInput || isSearching}
                  >
                    {isSearching ? 'Searching...' : 'Track'}
                  </Button>
                </div>
              </div>
              
              <div className="text-sm text-gray-600">
                <p>Examples:</p>
                <ul className="list-disc list-inside mt-1 space-y-1">
                  <li>Tracking Number: TRK-2024-001</li>
                  <li>Phone Number: +971501234567</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Results Section */}
          {trackedService && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {getStatusIcon(trackedService.status)}
                  Service Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Service Type</Label>
                    <p className="mt-1 text-sm text-gray-900">{trackedService.title}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Tracking Number</Label>
                    <p className="mt-1 text-sm text-gray-900 font-mono">{trackedService.trackingNumber}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Status</Label>
                    <div className="mt-1">
                      <Badge className={getStatusColor(trackedService.status)}>
                        {trackedService.status.replace('_', ' ').toUpperCase()}
                      </Badge>
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Submitted Date</Label>
                    <p className="mt-1 text-sm text-gray-900">
                      {new Date(trackedService.submittedAt).toLocaleDateString()}
                    </p>
                  </div>
                  {trackedService.estimatedCompletion && (
                    <div>
                      <Label className="text-sm font-medium text-gray-700">Expected Completion</Label>
                      <p className="mt-1 text-sm text-gray-900">
                        {new Date(trackedService.estimatedCompletion).toLocaleDateString()}
                      </p>
                    </div>
                  )}
                  {trackedService.completedAt && (
                    <div>
                      <Label className="text-sm font-medium text-gray-700">Completed Date</Label>
                      <p className="mt-1 text-sm text-gray-900">
                        {new Date(trackedService.completedAt).toLocaleDateString()}
                      </p>
                    </div>
                  )}
                </div>

                {trackedService.notes && (
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Latest Update</Label>
                    <p className="mt-1 text-sm text-gray-900 bg-gray-50 p-3 rounded-lg">
                      {trackedService.notes}
                    </p>
                  </div>
                )}

                <div className="flex gap-3 pt-4 border-t">
                  <Button className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    Call for Update
                  </Button>
                  <Button variant="outline" className="flex items-center gap-2">
                    <MessageCircle className="w-4 h-4" />
                    WhatsApp Support
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Help Section */}
          <Card className="mt-8 bg-blue-50 border-blue-200">
            <CardHeader>
              <CardTitle className="text-blue-800">Need Help?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-blue-700">
                <Phone className="w-4 h-4" />
                <span>Call us: +971 XX XXX XXXX</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-blue-700">
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp: +971 54 403 6701</span>
              </div>
              <div className="pt-3">
                <Button variant="outline" className="w-full border-blue-300 text-blue-700 hover:bg-blue-100">
                  Create Customer Account for Better Tracking
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TrackService;
