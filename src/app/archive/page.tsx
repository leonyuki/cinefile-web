import Link from 'next/link';
import { MapPin } from 'lucide-react';
import { client } from '../../libs/microcms'; // パスは環境に合わせて調整してください
import ArchiveSlideshow from '../../components/ArchiveSlideshow'; // 🌟 追加：スライドショー部品を読み込む

type MicroCMSImage = {
  url: string;
  width: number;
  height: number;
};

export type EventItem = {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  date: string;
  location: string;
  city?: string;
  year: number;
  image: MicroCMSImage;
  status: string[];
};

const cityFlags: Record<string, string> = {
  Copenhagen: 'Denmark',
  Paris: 'France',
  Berlin: 'Germany',
  Tokyo: 'Japan',
};

export default async function ArchivePage() {
  const data = await client.getList<EventItem>({
    endpoint: 'events',
    queries: { limit: 100 },
  });

  const allEvents = data.contents;
  
  const upcomingEvents = allEvents.filter((e) => e.status?.includes('Upcoming'));
  const pastEvents = allEvents.filter((e) => e.status?.includes('Past'));

  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-12 py-12 sm:py-20">
      <div className="mb-14">
        <p className="text-xs tracking-widest text-gray-400 mb-3">ARCHIVE</p>
        <h1 className="text-3xl sm:text-4xl tracking-tight">Past Events</h1>
      </div>

      {/* 🌟 追加：全イベントデータを流し込んだスライドショーの配置 */}
      <ArchiveSlideshow events={allEvents} />

      {/* Upcoming */}
      {upcomingEvents.length > 0 && (
        <section className="mb-20">
          <h2 className="text-xs tracking-widest text-gray-400 mb-8 pb-3 border-b border-gray-100">UPCOMING</h2>
          <div className="space-y-16">
            {upcomingEvents.map((event) => (
              <Link key={event.id} href={`/archive/${event.id}`} className="block group">
                <div className="grid md:grid-cols-2 gap-10 items-start">
                  <div className="overflow-hidden bg-gray-50">
                    <img
                      src={event.image.url}
                      alt={event.title}
                      className="w-full h-auto group-hover:opacity-85 transition-opacity duration-300"
                    />
                  </div>
                  <div className="space-y-4 md:pt-4">
                    <span className="inline-block px-2 py-1 bg-[#1c2b5e] text-white text-xs tracking-wider">
                      UPCOMING
                    </span>
                    <div>
                      <h3 className="text-2xl tracking-tight mb-1 group-hover:text-gray-500 transition-colors">
                        {event.title}
                      </h3>
                      {event.subtitle && (
                        <p className="text-gray-400 text-sm">{event.subtitle}</p>
                      )}
                    </div>
                    <div className="text-sm text-gray-500 space-y-1.5">
                      <div>{event.date}</div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 shrink-0" />
                        <span>{event.location}</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed">{event.description}</p>
                    <div className="pt-2">
                      <span className="text-xs tracking-wider text-gray-900 group-hover:underline">
                        VIEW DETAILS →
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Past */}
      <section>
        <h2 className="text-xs tracking-widest text-gray-400 mb-8 pb-3 border-b border-gray-100">PAST</h2>
        <div className="space-y-16">
          {pastEvents.map((event) => (
            <Link key={event.id} href={`/archive/${event.id}`} className="block group">
              <div className="grid md:grid-cols-2 gap-10 items-start">
                <div className="overflow-hidden">
                  <img
                    src={event.image.url}
                    alt={event.title}
                    className="w-full h-auto group-hover:opacity-85 transition-opacity duration-300"
                  />
                </div>
                <div className="space-y-4 md:pt-4">
                  <div className="text-xs text-gray-400 tracking-wider">
                    {event.year}
                    {event.city && ` — ${event.city}${cityFlags[event.city] ? `, ${cityFlags[event.city]}` : ''}`}
                  </div>
                  <div>
                    <h3 className="text-2xl tracking-tight mb-1 group-hover:text-gray-500 transition-colors">
                      {event.title}
                    </h3>
                    {event.subtitle && (
                      <p className="text-gray-400 text-sm">{event.subtitle}</p>
                    )}
                  </div>
                  <div className="text-sm text-gray-500 space-y-1.5">
                    <div>{event.date}</div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 shrink-0" />
                      <span>{event.location}</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">{event.description}</p>
                  <div className="pt-2">
                    <span className="text-xs tracking-wider text-gray-900 group-hover:underline">
                      VIEW DETAILS →
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}