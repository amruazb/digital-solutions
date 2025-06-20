
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight, Upload, CheckCircle, X } from 'lucide-react';
import { toast } from 'sonner';

const ServiceModal = ({ service, onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [uploadedFiles, setUploadedFiles] = useState({});

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
    // TODO: Submit formData and uploadedFiles to backend API
    console.log('Form Data:', formData);
    console.log('Uploaded Files:', uploadedFiles);
    
    // Simulate API call
    toast.success('Your enquiry has been submitted successfully! We will contact you within 24 hours.');
    onClose();
  };

  const progress = ((currentStep + 1) / service.steps.length) * 100;
  const currentStepData = service.steps[currentStep];

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-bold">
              {service.title}
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
            disabled={currentStep === 0}
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </Button>
          
          {currentStep === service.steps.length - 1 ? (
            <Button onClick={handleSubmit} className="flex items-center space-x-2 bg-green-600 hover:bg-green-700">
              <CheckCircle className="w-4 h-4" />
              <span>Submit Enquiry</span>
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
