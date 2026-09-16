'use client'; // Error boundaries must be Client Components

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // エラー報告サービスへのログ出力
    console.error(error);
  }, [error]);

  return (
    <div className="bg-white min-h-screen flex items-center justify-center">
      <div className="max-w-md mx-auto px-6 text-center">
        <p className="text-xs tracking-widest text-gray-400 mb-4 uppercase font-medium">
          Error
        </p>
        <h1 className="text-2xl tracking-tight text-gray-900 mb-3">
          エラーが発生しました
        </h1>
        <p className="text-sm text-gray-500 mb-10 leading-relaxed">
          予期しない問題が発生しました。時間をおいて再度お試しください。
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => reset()}
            className="text-xs tracking-widest text-gray-400 hover:text-gray-900 transition-colors uppercase bg-gray-50 hover:bg-gray-100/70 px-4 py-2.5 rounded-xs border border-gray-100"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="inline-flex items-center text-xs tracking-widest text-gray-400 hover:text-gray-900 transition-colors uppercase"
          >
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}
