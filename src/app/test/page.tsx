'use client'

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function TestPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Test Page</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Basic Card</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">This is a test card to verify styling is working.</p>
              <Button className="bg-blue-600 hover:bg-blue-700">
                Test Button
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Badge Test</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Badge className="bg-green-100 text-green-800">Success</Badge>
                <Badge className="bg-blue-100 text-blue-800">Info</Badge>
                <Badge className="bg-yellow-100 text-yellow-800">Warning</Badge>
                <Badge className="bg-red-100 text-red-800">Error</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Color Test</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-blue-600 text-white p-4 rounded-lg text-center">
              Blue
            </div>
            <div className="bg-green-600 text-white p-4 rounded-lg text-center">
              Green
            </div>
            <div className="bg-purple-600 text-white p-4 rounded-lg text-center">
              Purple
            </div>
            <div className="bg-orange-600 text-white p-4 rounded-lg text-center">
              Orange
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 