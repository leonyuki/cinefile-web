import Link from 'next/link';
import { client } from '../libs/microcms';
import HeroSlideshow from '../components/HeroSlideshow';
import { events } from '../data/events'; // 🌟 ローカルデータをインポート
import InstagramSection from '../components/InstagramSection';

// ============================================================================
// 🌟 共通の型定義・マッピング関数
// ============================================================================
type NewsItem = {
  id: string;
  title: string;
  category?: string;
  excerpt?: string;
  publishedAt: string;
  eventDate?: string;
};

// 🌟 archive/page.tsx と同じ型定義・関数を使用します
export type PartnerItem = {
  id: string;
  name: string;
  logo: { url: string; height: number; width: number };
  url?: string;
};

export type EventItem = {
  id: string; // 遷移先フォルダ名（slug）
  title: string;
  subtitle?: string;
  description: string;
  date: string;
  location: string;
  city: string;
  year: number;
  image: { url: string; height: number; width: number };
  status: string[];
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  organizer?: PartnerItem[];
  cooperation?: PartnerItem[];
  sponsorship?: PartnerItem[];
  crowdfunding?: PartnerItem[];
};

type InstagramPost = {
  id: string;
  caption?: string;
  media_type: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM';
  media_url: string;
  permalink: string;
  thumbnail_url?: string;
};

const slugMap: Record<number, string> = {
  1: 'trace-trash',
  2: 'blur-stir',
  3: 'hazama',
  4: 'trouvaille',
  5: 'faellesspisning',
};

const getImageUrl = (image: any): string => {
  if (typeof image === 'string') return image;
  if (image && typeof image === 'object' && 'src' in image) return image.src;
  return '';
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}.${month}.${day}`;
};

// Instagramの投稿を取得する関数
async function getInstagramPosts(): Promise<InstagramPost[]> {
  const token = process.env.INSTAGRAM_ACCESS_TOKEN;
  if (!token) return [];

  try {
    const res = await fetch(
      `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,permalink,thumbnail_url&limit=4&access_token=${token}`,
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) return [];
    const data = await res.json();
    return data.data as InstagramPost[];
  } catch (error) {
    console.error('Instagramの投稿取得に失敗しました:', error);
    return [];
  }
}

export default async function HomePage() {
  // 1. ローカルデータをUI用（EventItem）に変換
  const mapLocalToEventItem = (event: typeof events[0]): EventItem => {
    const slug = slugMap[event.id] || String(event.id);
    return {
      id: slug,
      title: event.title,
      subtitle: event.subtitle || '',
      description: event.description,
      date: event.date,
      location: event.location,
      city: event.city || '',
      year: Number(event.year) || 2026,
      image: {
        url: getImageUrl(event.image),
        width: 1000,
        height: 1000,
      },
      status: [event.status],
      createdAt: '',
      updatedAt: '',
      publishedAt: '',
      revisedAt: '',
    };
  };

  const mappedEvents = events.map(mapLocalToEventItem);
  const displayEvents = mappedEvents.slice(0, 4); // トップページには最新4件のみ表示

  // 2. 外部APIからのデータ取得（NewsとInstagramのみに縮小）
  const [newsData, instagramPosts] = await Promise.all([
    client.getList<NewsItem>({
      endpoint: 'news',
      queries: { limit: 3 },
    }),
    getInstagramPosts(),
  ]);

  return (
    <div>
      {/* Hero */}
      <section className="relative">
        <HeroSlideshow events={mappedEvents} />
      </section>

      {/* About us */}
      <section className="max-w-7xl mx-auto px-6 sm:px-12 py-16 sm:py-20">
        {/* 🌟 text-xs を text-sm に変更して少し大きくしました */}
        <p className="text-sm tracking-widest text-gray-400 mb-6">ABOUT US</p>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            {/* ロゴと名前（読み仮名を追加しました） */}
            <div className="flex items-center gap-4 mb-6">
              <img 
                src="/logo_cinefile.png" 
                alt="CinéFile Logo" 
                className="w-10 h-10 object-contain" 
              />
              {/* テキストを縦に並べるために flex-col で囲んでいます */}
              <div className="flex flex-col">
                <span className="text-xl sm:text-2xl font-light tracking-[0.05em] text-gray-900 leading-none">
                  CinéFile
                </span>
                {/* 読み仮名部分 */}
                <span className="text-[10px] sm:text-xs tracking-[0.2em] text-gray-400 mt-1.5">
                  シネフィル
                </span>
              </div>
            </div>

            {/* 見出し */}
            <h2 className="text-2xl sm:text-3xl tracking-tight mb-0 leading-snug">
              社会に問いかける<br className="hidden sm:block" />実験的なアートスペース
            </h2>
          </div>
          
          {/* 右側のテキストエリア */}
          <div className="space-y-5 text-sm text-gray-600 leading-relaxed">
            <p>
              CinéFileは、映像制作とアートイベントの運営を通じて社会に問いかける、実験的なアートスペースです。ヨーロッパを拠点に活動を始め、コペンハーゲン、パリ、ベルリン、そして東京と、国内外の都市で継続的に活動しています。
            </p>
          </div>
        </div>
        
        {/* READ MORE */}
        <div className="text-right mt-8">
          <Link href="/about" className="inline-block text-sm tracking-widest text-gray-900 border-b border-gray-900 pb-0.5 hover:text-gray-500 hover:border-gray-500 transition-colors">
            READ MORE →
          </Link>
        </div>
      </section>

      {/* NEWS */}
      <section className="bg-[#faf9f7]">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 py-14">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-sm tracking-widest text-gray-400">NEWS</h2>
            <Link href="/media" className="text-sm tracking-widest text-gray-500 hover:text-gray-900 transition-colors">
              VIEW ALL →
            </Link>
          </div>
          <div className="divide-y divide-gray-200">
            {newsData.contents.map((item) => (
              <Link key={item.id} href={`/media/news/${item.id}`} className="flex gap-6 sm:gap-10 py-6 group">
                <div className="w-24 shrink-0 text-xs text-gray-400 pt-0.5">
                  {item.eventDate ? `開催日: ${formatDate(item.eventDate)}` : formatDate(item.publishedAt)}
                </div>
                <div className="flex-1">
                  {item.category && (
                    <span className="inline-block text-[10px] tracking-wider text-[#1c2b5e] mb-1">{item.category}</span>
                  )}
                  <h3 className="text-sm mb-1 group-hover:text-gray-500 transition-colors">
                    {item.title}
                  </h3>
                  {item.excerpt && <p className="text-xs text-gray-400 line-clamp-1">{item.excerpt}</p>}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ARCHIVE */}
      <section className="border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 py-14">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-sm tracking-widest text-gray-400">ARCHIVE</h2>
            <Link href="/archive" className="text-sm tracking-widest text-gray-500 hover:text-gray-900 transition-colors">
              VIEW ALL →
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {displayEvents.map((event) => (
              <Link key={event.id} href={`/archive/${event.id}`} className="group">
                <div className="overflow-hidden mb-3 bg-gray-50 aspect-[3/4] flex items-center justify-center relative p-2">
                  <img
                    src={event.image.url} 
                    alt={event.title}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="text-xs text-gray-900 mb-0.5">{event.title}</div>
                <div className="text-xs text-gray-400">{event.year}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* INSTAGRAM */}
      <InstagramSection />

      {/* CONTACT */}
      <section className="border-t border-gray-100 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 py-16">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div>
              <p className="text-sm tracking-widest text-gray-400 mb-2">CONTACT</p>
              <h2 className="text-xl tracking-tight">お問い合わせ</h2>
            </div>
            <Link
              href="/contact"
              className="inline-block px-8 py-3 border border-gray-900 text-sm tracking-widest text-gray-900 hover:bg-gray-900 hover:text-white transition-colors"
            >
              CONTACT US →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}