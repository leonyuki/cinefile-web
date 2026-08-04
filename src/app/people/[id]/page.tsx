import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Film } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { client } from '../../../libs/microcms';
import { eventTable, EventItem } from '../../archive/events';

// 🌟 カスタムアイコンコンポーネント群
const InstagramIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const XIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M4 4l11.73 16h4.27L8.27 4H4z" />
    <path d="M20 4L4.3 20" />
  </svg>
);

const FacebookIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const YoutubeIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="currentColor" />
  </svg>
);

const GithubIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const NoteIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 20h9" />
    <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
  </svg>
);

const WebsiteIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="10" />
    <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
    <path d="M2 12h20" />
  </svg>
);

const OtherLinkIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
  </svg>
);

type MicroCMSImage = {
  url: string;
  width?: number;
  height?: number;
};

// 🌟 microCMS API定義に合わせた型
type MicroCMSEvent = {
  id: string;
  id_event?: string; // 例: "trace-trash", "blur-stir"
  title?: string;
  slug?: string;
  year?: number | string;
  city?: string;
  image?: MicroCMSImage | string;
  imageUrl?: string;
};

type MemberItem = {
  id: string;
  name: string;
  name_ja: string;
  name_en: string;
  position?: string;
  portfolio_md?: string;
  description?: string | null;
  image?: MicroCMSImage;
  participated_events?: (MicroCMSEvent | string)[];
  instagram?: string | null;
  twitter?: string | null;
  facebook?: string | null;
  github?: string | null;
  linkedin?: string | null;
  youtube?: string | null;
  note?: string | null;
  website?: string | null;
  other_url?: string | null;
};

export default async function MemberPortfolioPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const { id } = await params;

  const peopleData = await client.getList<MemberItem>({
    endpoint: 'people',
    queries: { 
      filters: `name[equals]${id}`, 
      limit: 1,
      depth: 2,
    },
  }).catch(() => ({ contents: [] }));
  
  const memberData = peopleData.contents[0];
  
  if (!memberData) {
    notFound();
  }

  const rawEvents = memberData.participated_events || [];

  // 🌟 id_event をベースにローカルデータをルックアップ
  const participatedEvents: EventItem[] = rawEvents
    .map((event) => {
      // 1. 文字列IDで渡された場合
      if (typeof event === 'string') {
        return eventTable[event] || null;
      }

      // 2. 追加された id_event フィールド（最優先）
      if (event.id_event && eventTable[event.id_event]) {
        return eventTable[event.id_event];
      }

      // 3. event.id で検索
      if (event.id && eventTable[event.id]) {
        return eventTable[event.id];
      }

      // 4. event.slug で検索
      if (event.slug && eventTable[event.slug]) {
        return eventTable[event.slug];
      }

      // 5. タイトル正規化による類似検索
      if (event.title) {
        const normalizedTitle = event.title.toLowerCase().replace(/[^a-z0-9]/g, '');
        const matchedKey = Object.keys(eventTable).find((key) => {
          const normalizedKey = key.toLowerCase().replace(/[^a-z0-9]/g, '');
          return normalizedKey === normalizedTitle;
        });

        if (matchedKey) {
          return eventTable[matchedKey];
        }
      }

      // 6. フォールバック処理（ローカル未登録時）
      const eventKey = event.id_event || event.id || 'unknown';
      if (eventKey || event.title) {
        const fallbackImage = typeof event.image === 'string' 
          ? event.image 
          : event.image?.url || event.imageUrl || '/logo_cinefile.png';

        return {
          id: eventKey,
          title: event.title || 'Untitled Event',
          year: event.year || '',
          city: event.city || '',
          imageUrl: fallbackImage,
        };
      }

      return null;
    })
    .filter((item): item is EventItem => item !== null);

  const portfolioContent = memberData.portfolio_md || '';

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-4xl mx-auto px-6 sm:px-12 py-12 sm:py-20">
        
        <Link
          href="/about"
          className="inline-flex items-center text-xs tracking-widest text-gray-400 hover:text-gray-900 mb-16 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5 mr-2" />
          BACK TO ABOUT
        </Link>

        <header className="flex flex-col md:flex-row gap-12 items-center md:items-start mb-16">
          <div className="aspect-square w-48 md:w-64 shrink-0 bg-gray-50 overflow-hidden rounded-sm border border-gray-100 shadow-2xs">
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
            
            <div className="flex flex-wrap justify-center md:justify-start gap-5">
              {memberData.instagram && (
                <a href={memberData.instagram} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-900 transition-colors">
                  <InstagramIcon className="w-4 h-4" /> Instagram
                </a>
              )}
              {memberData.twitter && (
                <a href={memberData.twitter} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-900 transition-colors">
                  <XIcon className="w-4 h-4" /> X
                </a>
              )}
              {memberData.facebook && (
                <a href={memberData.facebook} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-[#1877F2] transition-colors">
                  <FacebookIcon className="w-4 h-4" /> Facebook
                </a>
              )}
              {memberData.youtube && (
                <a href={memberData.youtube} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-[#FF0000] transition-colors">
                  <YoutubeIcon className="w-4 h-4" /> YouTube
                </a>
              )}
              {memberData.github && (
                <a href={memberData.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-900 transition-colors">
                  <GithubIcon className="w-4 h-4" /> GitHub
                </a>
              )}
              {memberData.linkedin && (
                <a href={memberData.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-[#0A66C2] transition-colors">
                  <LinkedinIcon className="w-4 h-4" /> LinkedIn
                </a>
              )}
              {memberData.note && (
                <a href={memberData.note} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-[#2CB696] transition-colors">
                  <NoteIcon className="w-4 h-4" /> note
                </a>
              )}
              {memberData.website && (
                <a href={memberData.website} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-[#1c2b5e] transition-colors">
                  <WebsiteIcon className="w-4 h-4" /> Website
                </a>
              )}
              {memberData.other_url && (
                <a href={memberData.other_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-900 transition-colors">
                  <OtherLinkIcon className="w-4 h-4" /> Link
                </a>
              )}
            </div>
          </div>
        </header>

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

        {/* 🌟 参加イベント一覧 */}
        <div className="mt-24 pt-16 border-t border-gray-100">
          <h2 className="text-xs tracking-widest text-gray-400 uppercase mb-10 flex items-center gap-2">
            <Film className="w-3.5 h-3.5" /> Curated &amp; Directed Events
          </h2>
          
          {participatedEvents.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-12">
              {participatedEvents.map((event) => {
                // 画像プロパティ名の揺れに対応（imageUrl / mainImage / image）
                const displayImage = event.imageUrl || event.mainImage || event.image || '/logo_cinefile.png';

                return (
                  <Link key={event.id} href={`/archive/${event.id}`} className="group block">
                    <div className="w-full overflow-hidden bg-gray-50 mb-4 rounded-sm border border-gray-100">
                      <img 
                        src={displayImage} 
                        alt={event.title} 
                        className="w-full h-auto object-contain group-hover:opacity-85 transition-opacity duration-300"
                      />
                    </div>
                    <div className="flex justify-between items-baseline gap-3">
                      <h3 className="text-sm font-medium text-gray-900 group-hover:text-gray-500 transition-colors line-clamp-1">
                        {event.title}
                      </h3>
                      <span className="text-[10px] text-gray-400 shrink-0">
                        {event.city ? `${event.city} — ` : ''}{event.year}
                      </span>
                    </div>
                  </Link>
                );
              })}
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