import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Building2 } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <div className="flex justify-center">
          <Building2 className="h-12 w-12 text-blue-600" />
        </div>
        <h1 className="mt-6 text-6xl font-bold text-gray-900">404</h1>
        <h2 className="mt-4 text-2xl font-semibold text-gray-900">Page Not Found</h2>
        <p className="mt-2 text-gray-600">
          Sorry, we couldn't find the page you're looking for.
        </p>
        <div className="mt-8 space-x-4">
          <Link href="/">
            <Button className="bg-blue-600 hover:bg-blue-700">
              Go Home
            </Button>
          </Link>
          <Link href="/services">
            <Button variant="outline">
              Browse Services
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
} 