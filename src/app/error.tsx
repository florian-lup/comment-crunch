'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { UI_CONSTANTS } from '@/config';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
      <h2 className="text-2xl font-bold text-red-600 mb-4">Something went wrong!</h2>
      <p className="text-gray-600 mb-6 text-center max-w-md">
        {error.message || 'An unexpected error occurred while processing your request.'}
      </p>
      <div className="flex gap-4">
        <button
          onClick={() => reset()}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Try again
        </button>
        <Link
          href="/"
          className="px-4 py-2 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200 transition-colors"
        >
          Go home
        </Link>
      </div>
      <p className="mt-8 text-sm text-gray-500">
        {UI_CONSTANTS.APP_NAME} - AI-powered YouTube comment analysis
      </p>
    </div>
  );
} 