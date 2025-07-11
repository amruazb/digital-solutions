
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight, Upload, CheckCircle, X, FileText, Eye, HelpCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from './auth/AuthContext';
import LoginModal from './auth/LoginModal';
import { toast } from 'sonner';

const ServiceModal = ({ service, onClose }) => {
  const [currentStep, setCurrentStep] = useState(-1); // Start with requirements view
  const [formData, setFormData] = useState({});
  const [uploadedFiles, setUploadedFiles] = useState({});
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isAuthenticated } = useAuth();

  const handleStartApplication = () => {
    if (!isAuthenticated) {
      setShowLoginModal(true);
      return;
    }
    setCurrentStep(0);
  };

  const handleLoginSuccess = () => {
    setCurrentStep(0);
  };

  const handleNext = () => {
    const currentStepData = service.steps[currentStep];
    
    if (currentStepData.required && !formData[currentStepData.id] && currentStepData.type !== 'file') {
      toast.error('Please fill in the required field');
      return;
    }
    
    if (currentStepData.type === 'file' && currentStepData.required && !uploadedFiles[currentStepData.id]) {
      toast.error('Please upload the required document');
      return;
    }
    
    if (currentStep < service.steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else if (currentStep === 0) {
      setCurrentStep(-1); // Go back to requirements
    }
  };

  const handleInputChange = (value, stepId) => {
    setFormData(prev => ({
      ...prev,
      [stepId]: value
    }));
  };

  const handleFileUpload = (event, stepId) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedFiles(prev => ({
        ...prev,
        [stepId]: file
      }));
      toast.success(`File "${file.name}" uploaded successfully`);
    }
  };

  const handleSubmit = () => {
    console.log('Form Data:', formData);
    console.log('Uploaded Files:', uploadedFiles);
    
    toast.success('Your application has been submitted successfully! We will contact you within 24 hours.');
    onClose();
  };

  // Requirements view
  if (currentStep === -1) {
    return (
      <Dialog open={true} onOpenChange={onClose}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <DialogTitle className="text-xl font-bold flex items-center gap-2">
                <service.icon className="w-6 h-6" />
                {service.title}
              </DialogTitle>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="w-4 h-4" />
              </Button>
            </div>
          </DialogHeader>

          <div className="space-y-6">
            {/* Service Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Service Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="font-medium">Price</Label>
                    <p className="text-2xl font-bold text-blue-600">{service.price}</p>
                  </div>
                  <div>
                    <Label className="font-medium">Duration</Label>
                    <p className="text-lg">{service.duration}</p>
                  </div>
                </div>
                <div>
                  <Label className="font-medium">Description</Label>
                  <p className="text-gray-600">{service.description}</p>
                </div>
                <div>
                  <Label className="font-medium">Features Included</Label>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                    {service.features.map((feature, index) => (
                      <li key={index} className="flex items-center space-x-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Document Requirements */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Required Documents
                </CardTitle>
                <CardDescription>
                  Please prepare the following documents before starting your application
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {service.documentRequirements?.map((requirement, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <Badge variant="outline" className="mt-0.5 text-xs">
                        {index + 1}
                      </Badge>
                      <span className="text-sm">{requirement}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Special Notes for Driving License */}
            {service.id === 'driving-license' && service.eyeTestInfo && (
              <Card className="border-orange-200 bg-orange-50">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2 text-orange-800">
                    <Eye className="w-5 h-5" />
                    Eye Test Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm text-orange-700">
                    <p className="font-medium">Eye test is mandatory for driving license application.</p>
                    <div className="bg-white p-3 rounded-lg border border-orange-200">
                      <div className="flex items-start gap-2">
                        <HelpCircle className="w-4 h-4 mt-0.5 text-orange-600" />
                        <div>
                          <p className="font-medium">Need help with eye test?</p>
                          <p className="text-xs mt-1">
                            You can still upload your documents and start the application. 
                            Contact us for guidance on completing the eye test.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="flex justify-between pt-4 border-t">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button onClick={handleStartApplication} className="bg-blue-600 hover:bg-blue-700">
                {isAuthenticated ? 'Start Application' : 'Login & Start Application'}
              </Button>
            </div>
          </div>

          {/* Login Modal */}
          <LoginModal 
            isOpen={showLoginModal}
            onClose={() => setShowLoginModal(false)}
            onLoginSuccess={handleLoginSuccess}
          />
        </DialogContent>
      </Dialog>
    );
  }

  // Application steps view
  const progress = ((currentStep + 1) / service.steps.length) * 100;
  const currentStepData = service.steps[currentStep];

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-bold">
              {service.title} - Application
            </DialogTitle>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
          <div className="space-y-2 mt-4">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Step {currentStep + 1} of {service.steps.length}</span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="w-full" />
          </div>
        </DialogHeader>

        <div className="py-6">
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">{currentStepData.title}</h3>
            
            {currentStepData.type === 'file' && (
              <div className="space-y-4">
                <Label className="text-gray-700">{currentStepData.label}</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                  <input
                    type="file"
                    id={`file-${currentStepData.id}`}
                    accept={currentStepData.accept}
                    onChange={(e) => handleFileUpload(e, currentStepData.id)}
                    className="hidden"
                  />
                  <label htmlFor={`file-${currentStepData.id}`} className="cursor-pointer">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-600 mb-1">Click to upload or drag and drop</p>
                    <p className="text-sm text-gray-500">PDF, JPG, PNG (Max. 10MB)</p>
                  </label>
                </div>
                {uploadedFiles[currentStepData.id] && (
                  <div className="flex items-center space-x-2 p-3 bg-green-50 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-green-800 font-medium">
                      {uploadedFiles[currentStepData.id].name}
                    </span>
                  </div>
                )}
              </div>
            )}

            {currentStepData.type === 'text' && (
              <div className="space-y-2">
                <Label className="text-gray-700">{currentStepData.label}</Label>
                <Input
                  type="text"
                  placeholder={currentStepData.placeholder}
                  value={formData[currentStepData.id] || ''}
                  onChange={(e) => handleInputChange(e.target.value, currentStepData.id)}
                  className="w-full"
                />
              </div>
            )}

            {currentStepData.type === 'email' && (
              <div className="space-y-2">
                <Label className="text-gray-700">{currentStepData.label}</Label>
                <Input
                  type="email"
                  placeholder={currentStepData.placeholder}
                  value={formData[currentStepData.id] || ''}
                  onChange={(e) => handleInputChange(e.target.value, currentStepData.id)}
                  className="w-full"
                />
              </div>
            )}

            {currentStepData.type === 'tel' && (
              <div className="space-y-2">
                <Label className="text-gray-700">{currentStepData.label}</Label>
                <Input
                  type="tel"
                  placeholder={currentStepData.placeholder}
                  value={formData[currentStepData.id] || ''}
                  onChange={(e) => handleInputChange(e.target.value, currentStepData.id)}
                  className="w-full"
                />
              </div>
            )}

            {currentStepData.type === 'select' && (
              <div className="space-y-2">
                <Label className="text-gray-700">{currentStepData.label}</Label>
                <Select onValueChange={(value) => handleInputChange(value, currentStepData.id)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Please select an option" />
                  </SelectTrigger>
                  <SelectContent>
                    {currentStepData.options.map((option, index) => (
                      <SelectItem key={index} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-between pt-4 border-t">
          <Button
            variant="outline"
            onClick={handleBack}
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </Button>
          
          {currentStep === service.steps.length - 1 ? (
            <Button onClick={handleSubmit} className="flex items-center space-x-2 bg-green-600 hover:bg-green-700">
              <CheckCircle className="w-4 h-4" />
              <span>Submit Application</span>
            </Button>
          ) : (
            <Button onClick={handleNext} className="flex items-center space-x-2">
              <span>Next</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ServiceModal;
