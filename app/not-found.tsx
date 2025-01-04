import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Page Not Found</h2>
        <p className="text-gray-600 mb-6">
          Sorry, we couldn’t find the page you’re looking for.
        </p>
        <Link href="/">
          <Button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3">
            Return Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
