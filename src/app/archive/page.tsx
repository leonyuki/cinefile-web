import Link from 'next/link';
import { MapPin } from 'lucide-react';
import PastEventsSlider from './PastEventsSlider';

// 🌟 ローカルデータ
import { events } from '../../data/events';

// IDマッピング（数値IDと文字列IDの両方に対応）
const slugMap: Record<string, string> = {
  '1': 'trace-trash',
  '2': 'blur-stir',
  '3': 'hazama',
  '4': 'trouvaille',
  '5': 'faellesspisning',
  'd0ckfgcd59x': 'trace-trash',
  'eayw8qiq1x': 'blur-stir',
  'f46oanl3k': 'hazama',
  'hxky4nyrwz1': 'trouvaille',
  '40pswg5pqvz': 'faellesspisning',
};

// 画像URLを安全に抽出するヘルパー関数
const getImageUrl = (image: any): string => {
  if (!image) return '';
  if (typeof image === 'string') return image;
  if (typeof image === 'object') {
    if ('url' in image && typeof image.url === 'string') return image.url;
    if ('src' in image && typeof image.src === 'string') return image.src;
  }
  return '';
};

export type PartnerItem = {
  id: string;
  name: string;
  logo: { url: string; height?: number; width?: number };
  url?: string;
};

export type EventItem = {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  date: string;
  location: string;
  city: string;
  year: number;
  image: { url: string; height?: number; width?: number };
  bgImage?: { url: string; height?: number; width?: number };
  status: string[];
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string;
  revisedAt?: string;
  organizer?: PartnerItem[];
  cooperation?: PartnerItem[];
  sponsorship?: PartnerItem[];
  crowdfunding?: PartnerItem[];
};

export const metadata = {
  title: 'Archive | CinéFile',
  description: 'CinéFileのこれまでのプロジェクトと今後のイベント情報。',
};

export default async function ArchivePage() {
  const upcomingEvents = events.filter((event: any) =>
    Array.isArray(event.status) ? event.status.includes('Upcoming') : event.status === 'Upcoming'
  );
  const pastEvents = events.filter((event: any) =>
    Array.isArray(event.status) ? event.status.includes('Past') : event.status === 'Past'
  );

  const mapLocalToEventItem = (rawEvent: any): EventItem => {
    const rawId = String(rawEvent.id);
    const slug = slugMap[rawId] || rawId;

    const imageUrl = getImageUrl(rawEvent.image) || getImageUrl(rawEvent.imageUrl);
    const bgImageUrl = getImageUrl(rawEvent.bgImage);

    return {
      id: slug,
      title: rawEvent.title,
      subtitle: rawEvent.subtitle || '',
      description: rawEvent.description || rawEvent.fullDescription || '',
      date: rawEvent.date,
      location: rawEvent.location,
      city: rawEvent.city || '',
      year: Number(rawEvent.year) || 2026,
      image: {
        url: imageUrl,
        width: rawEvent.image?.width || 1000,
        height: rawEvent.image?.height || 1000,
      },
      bgImage: bgImageUrl
        ? {
            url: bgImageUrl,
            width: rawEvent.bgImage?.width || 1000,
            height: rawEvent.bgImage?.height || 1000,
          }
        : undefined,
      status: Array.isArray(rawEvent.status) ? rawEvent.status : [rawEvent.status],
      createdAt: rawEvent.createdAt || '',
      updatedAt: rawEvent.updatedAt || '',
      publishedAt: rawEvent.publishedAt || '',
      revisedAt: rawEvent.revisedAt || '',
    };
  };

  const mappedUpcoming = upcomingEvents.map(mapLocalToEventItem);
  const mappedPast = pastEvents.map(mapLocalToEventItem);

  const featuredUpcoming = mappedUpcoming[0];
  // 背景画像のURL（bgImageがあれば使い、なければメインポスター画像を使用）
  const bgImageUrl = featuredUpcoming?.bgImage?.url || featuredUpcoming?.image?.url;

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 py-12 sm:py-20">
        
        <div className="mb-16">
          <p className="text-xs tracking-widest text-gray-400 mb-3">ARCHIVE</p>
          <h1 className="text-3xl sm:text-4xl tracking-tight text-gray-900">Events & Projects</h1>
        </div>

        {/* 1. UPCOMING EVENT */}
{featuredUpcoming && (
  <section className="mb-24 sm:mb-32">
    <h2 className="text-xs tracking-widest text-[#1c2b5e] font-semibold uppercase mb-6 flex items-center gap-2">
      <span className="w-2 h-2 rounded-full bg-[#1c2b5e] animate-pulse" />
      Upcoming Event
    </h2>
    
    <Link 
      href={`/archive/${featuredUpcoming.id}`} 
      className="group relative block w-full overflow-hidden rounded-sm bg-[#0c0c0c] border border-gray-900 shadow-xl"
    >
      {/* 🌟 背景写真 (bgImage) & グラデーションオーバーレイ */}
      {bgImageUrl && (
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <img
            src={bgImageUrl}
            alt=""
            className="w-full h-full object-cover opacity-75 group-hover:scale-105 transition-all duration-1000 ease-out"
          />
          {/* テキスト視認性を保ちつつ背景を見せる薄型グラデーション */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/55 to-black/30" />
        </div>
      )}

      {/* コンテンツエリア */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 p-6 sm:p-10 md:p-12 items-center">
        
        {/* 🌟 メインポスター表示 */}
        <div className="md:col-span-5 lg:col-span-4 flex justify-center">
          <div className="relative w-full max-w-[280px] sm:max-w-[320px] md:max-w-none aspect-[3/4] overflow-hidden rounded-sm bg-black/60 border border-white/20 shadow-2xl p-2 sm:p-3 backdrop-blur-md">
            <img
              src={featuredUpcoming.image?.url}
              alt={featuredUpcoming.title}
              className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700 ease-out"
            />
          </div>
        </div>

        {/* 詳細テキストエリア */}
        <div className="md:col-span-7 lg:col-span-8 flex flex-col justify-center">
          <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight text-white mb-3 md:mb-4 font-medium leading-tight drop-shadow-md">
            {featuredUpcoming.title}
          </h3>
          
          {featuredUpcoming.subtitle && (
            <p className="text-xs sm:text-sm md:text-base text-white/90 mb-6 md:mb-8 font-light leading-relaxed drop-shadow-sm">
              {featuredUpcoming.subtitle}
            </p>
          )}
          
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-8 text-xs sm:text-sm text-white/90 mb-8 font-light border-y border-white/20 py-4 backdrop-blur-xs drop-shadow-sm">
            <p className="flex items-center gap-2">
              <span className="font-semibold text-white">Date:</span> {featuredUpcoming.date}
            </p>
            <p className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 md:w-4 md:h-4 text-white/70 shrink-0" />
              <span className="font-semibold text-white md:hidden">Location:</span>
              {featuredUpcoming.location} {featuredUpcoming.city && `(${featuredUpcoming.city})`}
            </p>
          </div>
          
          <div>
            <span className="inline-block px-6 py-2.5 md:px-8 md:py-3 bg-white/15 group-hover:bg-white text-white group-hover:text-black backdrop-blur-md border border-white/40 text-[10px] md:text-xs tracking-widest transition-all duration-300 rounded-xs font-medium shadow-md">
              VIEW DETAILS
            </span>
          </div>
        </div>

      </div>
    </Link>
  </section>
)}

        {/* 2. PAST EVENTS SLIDESHOW */}
        {mappedPast.length > 0 && (
          <section className="mb-24 w-full clear-both">
            <div className="flex items-center justify-between mb-8 pb-3 border-b border-b-gray-100">
              <h2 className="text-xs tracking-widest text-gray-400 uppercase">Past Events Highlights</h2>
            </div>
            <div className="w-full">
              <PastEventsSlider events={mappedPast.slice(0, 5)} />
            </div>
          </section>
        )}

        {/* 3. ALL PAST EVENTS LIST */}
        <section>
          <div className="flex items-center justify-between mb-8 pb-3 border-b border-b-gray-100">
            <h2 className="text-xs tracking-widest text-gray-400 uppercase">Archive List</h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-12">
            {mappedPast.map((event) => (
              <Link key={event.id} href={`/archive/${event.id}`} className="group block">
                <div className="aspect-[3/4] w-full bg-gray-50 overflow-hidden mb-4 rounded-sm border border-gray-100 flex items-center justify-center p-2 sm:p-4 relative">
                  <img 
                    src={event.image?.url} 
                    alt={event.title} 
                    className="w-full h-full object-contain drop-shadow-sm group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300 pointer-events-none" />
                </div>
                
                <h3 className="text-base font-medium text-gray-900 group-hover:text-gray-500 transition-colors line-clamp-2 mb-1">
                  {event.title}
                </h3>
                <p className="text-xs text-gray-400 tracking-wider">
                  {event.city} {event.year && `— ${event.year}`}
                </p>
              </Link>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}