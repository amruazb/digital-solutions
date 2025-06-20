'use client'

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Lock, User, Building2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function StaffLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Mock authentication - in real app, this would be API call
    setTimeout(() => {
      if (email && password) {
        // Store staff session with staff details
        const staffData = {
          id: 'staff001',
          name: 'Sarah Johnson',
          email: email,
          role: 'Senior Typist',
          department: 'Immigration',
          loginTime: new Date().toISOString()
        };
        localStorage.setItem('staffSession', JSON.stringify(staffData));
        toast.success('Login successful!');
        router.push('/staff/dashboard');
      } else {
        toast.error('Please enter valid credentials');
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Building2 className="mx-auto h-12 w-12 text-blue-600" />
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Staff Portal</h2>
          <p className="mt-2 text-sm text-gray-600">
            Access your work dashboard and assignments
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Staff Login</CardTitle>
            <CardDescription>
              Enter your credentials to access the staff portal
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <Label htmlFor="email">Email Address</Label>
                <div className="mt-1 relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="staff@interacttyping.ae"
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="password">Password</Label>
                <div className="mt-1 relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700"
                disabled={isLoading}
              >
                {isLoading ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Demo Credentials: Any email/password combination
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="text-center">
          <Link href="/">
            <Button
              variant="ghost"
              className="text-blue-600 hover:text-blue-700"
            >
              ← Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
} 