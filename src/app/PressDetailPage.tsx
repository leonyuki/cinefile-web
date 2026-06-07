import { useParams, Link } from 'react-router';
import { ArrowLeft, FileText } from 'lucide-react';
import { pressReleases } from '../data/press';

export function PressDetailPage() {
  const { slug } = useParams();
  const item = pressReleases.find((p) => p.slug === slug);

  if (!item) {
    return (
      <div className="max-w-5xl mx-auto px-6 sm:px-12 py-20 text-center">
        <h1 className="text-2xl mb-4">Press release not found</h1>
        <Link to="/press" className="text-sm text-gray-600 hover:text-gray-900">
          ← Back to Press Release
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 sm:px-12 py-12 sm:py-20">
      <Link
        to="/press"
        className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 mb-12 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Press Release
      </Link>

      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div className="text-sm text-gray-400">{item.date}</div>
          {item.pdfUrl && (
            <a
              href={item.pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-gray-900 hover:underline"
            >
              <FileText className="w-4 h-4" />
              Download PDF
            </a>
          )}
        </div>
        <h1 className="text-3xl sm:text-4xl mb-6 tracking-tight leading-tight">
          {item.title}
        </h1>
      </div>

      <div className="prose prose-sm max-w-none">
        <div className="text-gray-600 leading-relaxed whitespace-pre-line">
          {item.content}
        </div>
      </div>
    </div>
  );
}
