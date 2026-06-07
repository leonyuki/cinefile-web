import { Link } from 'react-router';
import { newsItems } from '../data/news';

export function NewsPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 sm:px-12 py-12 sm:py-20">
      <h1 className="text-3xl sm:text-4xl mb-12 tracking-tight">News</h1>

      <div className="space-y-12">
        {newsItems.map((item) => (
          <Link
            key={item.id}
            to={`/news/${item.slug}`}
            className="block group border-b border-gray-200 pb-12 last:border-b-0"
          >
            <div className="flex items-start justify-between gap-6 mb-3">
              <div className="text-sm text-gray-400">{item.date}</div>
              <div className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded">
                {item.category}
              </div>
            </div>
            <h2 className="text-2xl mb-4 tracking-tight group-hover:text-gray-600 transition-colors">
              {item.title}
            </h2>
            <p className="text-gray-600 leading-relaxed">
              {item.excerpt}
            </p>
            <div className="mt-4 text-sm text-gray-900 group-hover:underline">
              Read more →
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
