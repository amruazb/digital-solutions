
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Phone, Mail, X } from 'lucide-react';
import { useAuth } from './AuthContext';
import { toast } from 'sonner';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess?: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onLoginSuccess }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const handleSendOTP = async () => {
    if (!phoneNumber || phoneNumber.length < 10) {
      toast.error('Please enter a valid phone number');
      return;
    }

    setIsLoading(true);
    // Simulate OTP sending
    setTimeout(() => {
      setOtpSent(true);
      setIsLoading(false);
      toast.success('OTP sent to your phone number');
    }, 1000);
  };

  const handleVerifyOTP = async () => {
    if (otp.length !== 6) {
      toast.error('Please enter the complete OTP');
      return;
    }

    setIsLoading(true);
    // Simulate OTP verification
    setTimeout(() => {
      const userData = {
        id: `user_${Date.now()}`,
        phone: phoneNumber,
        name: `User ${phoneNumber.slice(-4)}`,
        loginMethod: 'otp' as const
      };
      
      login(userData);
      setIsLoading(false);
      toast.success('Login successful!');
      onLoginSuccess?.();
      onClose();
      resetForm();
    }, 1000);
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    // Simulate Google login
    setTimeout(() => {
      const userData = {
        id: `google_${Date.now()}`,
        email: 'user@example.com',
        name: 'Google User',
        loginMethod: 'google' as const
      };
      
      login(userData);
      setIsLoading(false);
      toast.success('Google login successful!');
      onLoginSuccess?.();
      onClose();
      resetForm();
    }, 1000);
  };

  const resetForm = () => {
    setPhoneNumber('');
    setOtp('');
    setOtpSent(false);
  };

  const handleClose = () => {
    onClose();
    resetForm();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle>Login to Continue</DialogTitle>
            <Button variant="ghost" size="icon" onClick={handleClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </DialogHeader>

        <Tabs defaultValue="otp" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="otp">Phone OTP</TabsTrigger>
            <TabsTrigger value="google">Google</TabsTrigger>
          </TabsList>
          
          <TabsContent value="otp" className="space-y-4">
            {!otpSent ? (
              <>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+971 XX XXX XXXX"
                      className="pl-10"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                  </div>
                </div>
                <Button 
                  onClick={handleSendOTP} 
                  disabled={isLoading || !phoneNumber}
                  className="w-full"
                >
                  {isLoading ? 'Sending...' : 'Send OTP'}
                </Button>
              </>
            ) : (
              <>
                <div className="space-y-2">
                  <Label>Enter OTP sent to {phoneNumber}</Label>
                  <div className="flex justify-center">
                    <InputOTP value={otp} onChange={setOtp} maxLength={6}>
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    onClick={() => setOtpSent(false)}
                    className="flex-1"
                  >
                    Change Number
                  </Button>
                  <Button 
                    onClick={handleVerifyOTP} 
                    disabled={isLoading || otp.length !== 6}
                    className="flex-1"
                  >
                    {isLoading ? 'Verifying...' : 'Verify'}
                  </Button>
                </div>
              </>
            )}
          </TabsContent>
          
          <TabsContent value="google" className="space-y-4">
            <div className="text-center py-4">
              <p className="text-gray-600 mb-4">Sign in with your Google account for quick access</p>
              <Button 
                onClick={handleGoogleLogin} 
                disabled={isLoading}
                className="w-full flex items-center gap-2"
                variant="outline"
              >
                <Mail className="w-4 h-4" />
                {isLoading ? 'Signing in...' : 'Continue with Google'}
              </Button>
            </div>
          </TabsContent>
        </Tabs>

        <div className="text-xs text-gray-500 text-center">
          By continuing, you agree to our terms of service and privacy policy
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;
