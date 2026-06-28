import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MapPin, ArrowLeft } from 'lucide-react';
import { client } from '../../../libs/microcms';
import { EventItem } from '../page';

export default async function ArchiveDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;

  try {
    const event = await client.get<EventItem>({
      endpoint: 'events',
      contentId: resolvedParams.id,
    });

    return (
      <div className="max-w-4xl mx-auto px-6 sm:px-12 py-12 sm:py-20">
        <Link
          href="/archive"
          className="inline-flex items-center text-xs tracking-widest text-gray-400 hover:text-gray-900 mb-12 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5 mr-2" />
          BACK TO ARCHIVE
        </Link>

        <article>
          <header className="mb-10">
            {/* 🌟 判定を .includes() に修正 */}
            {event.status?.includes('Upcoming') && (
              <span className="inline-block px-2 py-1 bg-[#1c2b5e] text-white text-[10px] tracking-wider mb-4">
                UPCOMING
              </span>
            )}
            <h1 className="text-3xl sm:text-4xl tracking-tight mb-3">
              {event.title}
            </h1>
            {event.subtitle && (
              <p className="text-lg text-gray-500 mb-6">{event.subtitle}</p>
            )}

            <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-sm text-gray-500">
              <div>{event.date}</div>
              <div className="hidden sm:block text-gray-300">|</div>
              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 shrink-0" />
                <span>{event.location}</span>
              </div>
              {event.city && (
                <>
                  <div className="hidden sm:block text-gray-300">|</div>
                  <div>{event.city}</div>
                </>
              )}
            </div>
          </header>

          <div className="w-full mb-12 bg-gray-50">
            <img
              src={event.image.url}
              alt={event.title}
              className="w-full h-auto object-cover max-h-[60vh]"
            />
          </div>

          <div className="prose prose-gray max-w-none text-sm text-gray-600 leading-relaxed space-y-6">
            <p className="text-base font-medium text-gray-800 mb-8">
              {event.description}
            </p>
          </div>
        </article>
      </div>
    );
  } catch (error) {
    notFound();
  }
}