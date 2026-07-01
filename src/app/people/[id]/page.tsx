import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Film, ExternalLink } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { client } from '../../../libs/microcms';

type MicroCMSImage = {
  url: string;
  width: number;
  height: number;
};

// 🌟 修正：イベントの型定義
type EventItem = {
  id: string;
  title: string;
  year: number;
  city?: string;
  image: MicroCMSImage;
};

// 🌟 修正：メンバーデータの型定義に participated_events（配列）を追加
type MemberItem = {
  id: string;
  name: string;
  name_ja: string;
  name_en: string;
  position?: string;
  portfolio_md?: string;
  image?: MicroCMSImage;
  participated_events?: EventItem[]; // 👈 コンテンツ参照でネストされて入ってくるイベント一覧
};

export default async function MemberPortfolioPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const { id } = await params;

  // 🌟 変更：イベント全件取得（getList）を廃止！ 
  // depth: 2 を指定することで、紐付いたイベントの中にある「画像URL」まで深く一発で取得します
  const peopleData = await client.getList<MemberItem>({
    endpoint: 'people',
    queries: { 
      filters: `name[equals]${id}`, 
      limit: 1,
      depth: 2 // 👈 参照先のイベントデータの中身まで深く取得する設定
    },
  }).catch(() => ({ contents: [] }));
  
  const memberData = peopleData.contents[0];
  
  if (!memberData) {
    notFound();
  }

  // 🌟 変更：このメンバーに紐付けられたイベントだけを安全に取り出す
  const participatedEvents = memberData.participated_events || [];
  const portfolioContent = memberData.portfolio_md || '';

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-4xl mx-auto px-6 sm:px-12 py-12 sm:py-20">
        
        {/* 戻るボタン */}
        <Link
          href="/about"
          className="inline-flex items-center text-xs tracking-widest text-gray-400 hover:text-gray-900 mb-16 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5 mr-2" />
          BACK TO ABOUT
        </Link>

        {/* ヒーローセクション */}
        <header className="flex flex-col md:flex-row gap-12 items-center md:items-start mb-16">
          <div className="aspect-[3/4] w-48 md:w-64 shrink-0 bg-gray-50 overflow-hidden rounded-sm border border-gray-100 shadow-2xs">
            <img 
              src={memberData.image?.url || '/logo_cinefile.png'} 
              alt={memberData.name_en} 
              className="w-full h-full object-cover" 
            />
          </div>
          <div className="text-center md:text-left md:pt-4">
            <p className="text-xs tracking-widest text-gray-400 mb-2">{memberData.position || 'MEMBER'}</p>
            <h1 className="text-4xl tracking-tight mb-3 text-gray-900">{memberData.name_en}</h1>
            <p className="text-sm font-medium text-[#1c2b5e] tracking-wider mb-6">{memberData.name_ja}</p>
            
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

        {/* Markdownポートフォリオ本文 */}
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

        {/* 🌟 参加イベント一覧（このメンバーの紐付けイベントのみループ処理） */}
        <div className="mt-24 pt-16 border-t border-gray-100">
          <h2 className="text-xs tracking-widest text-gray-400 uppercase mb-10 flex items-center gap-2">
            <Film className="w-3.5 h-3.5" /> Curated &amp; Directed Events
          </h2>
          
          {participatedEvents.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-12">
              {participatedEvents.map((event) => (
                <Link key={event.id} href={`/archive/${event.id}`} className="group block">
                  <div className="aspect-[16/9] overflow-hidden bg-gray-50 mb-4 rounded-sm">
                    <img 
                      src={event.image?.url || '/logo_cinefile.png'} 
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
          ) : (
            <div className="text-xs text-gray-400 tracking-widest text-center py-8">
              NO EVENTS REGISTERED YET
            </div>
          )}
        </div>

      </div>
    </div>
  );
}