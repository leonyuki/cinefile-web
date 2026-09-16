import Link from 'next/link';

export const metadata = {
  title: 'Not Found | CinéFile',
};

export default function NotFound() {
  return (
    <div className="bg-white min-h-screen flex items-center justify-center">
      <div className="max-w-md mx-auto px-6 text-center">
        <p className="text-xs tracking-widest text-gray-400 mb-4 uppercase font-medium">
          404
        </p>
        <h1 className="text-2xl tracking-tight text-gray-900 mb-3">
          ページが見つかりません
        </h1>
        <p className="text-sm text-gray-500 mb-10 leading-relaxed">
          お探しのページは存在しないか、移動または削除された可能性があります。
        </p>
        <Link
          href="/"
          className="inline-flex items-center text-xs tracking-widest text-gray-400 hover:text-gray-900 transition-colors uppercase"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
