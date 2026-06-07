import { Link } from 'react-router';
import { FileText } from 'lucide-react';
import { pressReleases } from '../data/press';

export function PressPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 sm:px-12 py-12 sm:py-20">
      <h1 className="text-3xl sm:text-4xl mb-12 tracking-tight">Press Release</h1>

      <div className="space-y-12">
        {pressReleases.map((item) => (
          <Link
            key={item.id}
            to={`/press/${item.slug}`}
            className="block group border-b border-gray-200 pb-12 last:border-b-0"
          >
            <div className="flex items-start justify-between gap-6 mb-3">
              <div className="text-sm text-gray-400">{item.date}</div>
              {item.pdfUrl && (
                <a
                  href={item.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-xs text-gray-600 hover:text-gray-900"
                  onClick={(e) => e.stopPropagation()}
                >
                  <FileText className="w-3 h-3" />
                  PDF
                </a>
              )}
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
