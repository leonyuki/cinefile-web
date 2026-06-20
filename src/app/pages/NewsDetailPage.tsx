import { useParams, Link } from 'react-router';
import { ArrowLeft } from 'lucide-react';
import { newsItems } from '../data/news';

export function NewsDetailPage() {
  const { slug } = useParams();
  const item = newsItems.find((n) => n.slug === slug);

  if (!item) {
    return (
      <div className="max-w-5xl mx-auto px-6 sm:px-12 py-20 text-center">
        <h1 className="text-2xl mb-4">News not found</h1>
        <Link to="/media" className="text-sm text-gray-600 hover:text-gray-900">
          ← Back to News
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 sm:px-12 py-12 sm:py-20">
      <Link
        to="/media"
        className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 mb-12 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to News
      </Link>

      <div className="mb-8">
        <div className="flex items-center gap-4 mb-6">
          <div className="text-sm text-gray-400">{item.date}</div>
          <div className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded">
            {item.category}
          </div>
        </div>
        <h1 className="text-3xl sm:text-4xl mb-6 tracking-tight leading-tight">
          {item.title}
        </h1>
      </div>

      {item.image && (
        <div className="mb-12">
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-auto rounded-lg"
          />
        </div>
      )}

      <div className="prose prose-sm max-w-none">
        <div className="text-gray-600 leading-relaxed whitespace-pre-line">
          {item.content}
        </div>
      </div>
    </div>
  );
}
