'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg px-4">
      <div className="text-center max-w-md">
        <p className="text-7xl mb-6">⚠️</p>
        <h1 className="text-3xl font-bold font-heading tracking-tight mb-4">Something Went Wrong</h1>
        <p className="text-muted mb-8">
          We encountered an unexpected error. Please try again.
        </p>
        <button
          onClick={reset}
          className="px-6 py-3 bg-primary hover:bg-primary-dark text-black font-bold rounded-lg transition-all btn-press"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
