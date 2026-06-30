import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Film, ExternalLink, Image as ImageIcon, Calendar } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { client } from '../../../libs/microcms';

type MicroCMSImage = {
  url: string;
  width: number;
  height: number;
};

type EventItem = {
  id: string;
  title: string;
  year: number;
  city?: string;
  image: MicroCMSImage;
};

type MemberItem = {
  id: string;
  name: string;
  portfolio_md?: string;
};

// メンバーごとの「固定データ」を辞書として一括管理
const MEMBER_INFO: Record<string, {
  nameEn: string;
  nameJa: string;
  role: string;
  image: string;
  icon: React.ElementType;
}> = {
  katsuki: {
    nameEn: 'Katsuki Kou',
    nameJa: '洪 克樹',
    role: 'FOUNDER / DIRECTOR',
    image: '/members/katsuki.jpg',
    icon: Film,
  },
  miku: {
    nameEn: 'Miku Sotomura',
    nameJa: '外村 未空',
    role: 'CREATIVE DIRECTOR',
    image: '/members/miku.jpg',
    icon: ImageIcon,
  },
  mirika: {
    nameEn: 'Mirika Ishida',
    nameJa: '石田 満理佳',
    role: 'PRODUCER',
    image: '/members/mirika.jpg',
    icon: Calendar,
  }
};

// 🌟 修正：paramsの型を Promise<{ id: string }> に変更
export default async function MemberPortfolioPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  // 🌟 修正：使う前に await で待機して id を取り出す
  const { id } = await params;

  // 辞書に存在しないID（例：/people/unknown）にアクセスされたら404ページを表示
  const memberConfig = MEMBER_INFO[id];
  if (!memberConfig) {
    notFound();
  }

  // microCMSからデータを取得（filters でURLのIDと一致するものを検索）
  const [eventsData, peopleData] = await Promise.all([
    client.getList<EventItem>({
      endpoint: 'events',
      queries: { limit: 100 },
    }),
    client.getList<MemberItem>({
      endpoint: 'people',
      queries: { filters: `name[equals]${id}`, limit: 1 },
    }).catch(() => ({ contents: [] }))
  ]);
  
  const participatedEvents = eventsData.contents;
  const memberData = peopleData.contents[0];
  const portfolioContent = memberData?.portfolio_md || '';

  // 動的にアイコンコンポーネントを割り当て
  const EventIcon = memberConfig.icon;

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-4xl mx-auto px-6 sm:px-12 py-12 sm:py-20">
        
        {/* 戻るボタン */}
        <Link
          href="/people"
          className="inline-flex items-center text-xs tracking-widest text-gray-400 hover:text-gray-900 mb-16 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5 mr-2" />
          BACK TO PEOPLE
        </Link>

        {/* ヒーローセクション（辞書のデータを使って表示） */}
        <header className="flex flex-col md:flex-row gap-12 items-center md:items-start mb-16">
          <div className="aspect-[3/4] w-48 md:w-64 shrink-0 bg-gray-50 overflow-hidden rounded-sm">
            <img 
              src={memberConfig.image} 
              alt={memberConfig.nameEn} 
              className="w-full h-full object-cover" 
            />
          </div>
          <div className="text-center md:text-left md:pt-4">
            <p className="text-xs tracking-widest text-gray-400 mb-2">{memberConfig.role}</p>
            <h1 className="text-4xl tracking-tight mb-3 text-gray-900">{memberConfig.nameEn}</h1>
            <p className="text-sm font-medium text-[#1c2b5e] tracking-wider mb-6">{memberConfig.nameJa}</p>
            
            {/* 外部リンク */}
            <div className="flex justify-center md:justify-start gap-4">
              <a 
                href="https://instagram.com/cinefile.official" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-gray-900 transition-colors"
              >
                Instagram <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </header>

        {/* microCMSから取得したMarkdownの表示エリア */}
        {portfolioContent ? (
          <div className="border-t border-gray-100 pt-16">
            <div className="
              text-sm text-gray-600 leading-relaxed max-w-none
              [&>h1]:hidden
              [&>p:first-of-type]:text-base [&>p:first-of-type]:leading-loose [&>p:first-of-type]:mb-12
              [&>h2]:text-xs [&>h2]:tracking-widest [&>h2]:text-gray-400 [&>h2]:uppercase [&>h2]:mt-20 [&>h2]:mb-8 [&>h2]:pb-3 [&>h2]:border-b [&>h2]:border-gray-100
              [&>h3]:text-lg [&>h3]:tracking-tight [&>h3]:text-gray-900 [&>h3]:mt-10 [&>h3]:mb-2
              [&>p]:mb-6
              [&>ul]:space-y-5 [&>ul]:mb-8
              [&>ul>li>strong]:block [&>ul>li>strong]:text-xs [&>ul>li>strong]:font-semibold [&>ul>li>strong]:text-gray-800 [&>ul>li>strong]:mb-1.5
              [&>hr]:my-16 [&>hr]:border-gray-50
              [&>blockquote]:bg-gray-50 [&>blockquote]:p-8 [&>blockquote]:rounded-sm [&>blockquote]:border [&>blockquote]:border-gray-100 [&>blockquote]:text-gray-700 [&>blockquote]:italic [&>blockquote]:leading-loose
            ">
              <ReactMarkdown>{portfolioContent}</ReactMarkdown>
            </div>
          </div>
        ) : (
          <div className="border-t border-gray-100 pt-16 text-center text-xs text-gray-400 tracking-widest">
            PORTFOLIO IS BEING UPDATED...
          </div>
        )}

        {/* 参加イベント一覧 */}
        <div className="mt-24 pt-16 border-t border-gray-100">
          <h2 className="text-xs tracking-widest text-gray-400 uppercase mb-10 flex items-center gap-2">
            {/* 辞書で設定したアイコンを動的に表示 */}
            <EventIcon className="w-3.5 h-3.5" /> Curated &amp; Directed Events
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-12">
            {participatedEvents.map((event) => (
              <Link key={event.id} href={`/archive/${event.id}`} className="group block">
                <div className="aspect-[16/9] overflow-hidden bg-gray-50 mb-4 rounded-sm">
                  <img 
                    src={event.image.url} 
                    alt={event.title} 
                    className="w-full h-full object-cover group-hover:opacity-85 transition-opacity duration-300"
                  />
                </div>
                <div className="flex justify-between items-baseline gap-4">
                  <h3 className="text-sm font-medium text-gray-900 group-hover:text-gray-500 transition-colors line-clamp-1">
                    {event.title}
                  </h3>
                  <span className="text-xs text-gray-400 shrink-0">
                    {event.city} — {event.year}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}