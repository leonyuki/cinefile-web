import Link from 'next/link';
import { ArrowLeft, Palette, Globe, MessageSquare, Compass, ExternalLink, Image as ImageIcon } from 'lucide-react';
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

export default async function MikuPortfolioPage() {
  const milestones = [
    {
      location: 'Tokyo, Japan',
      period: '2021',
      title: 'Graduation from Tokyo University of the Arts',
      desc: '東京藝術大学を卒業。在学中より映像、写真、立体物を組み合わせた横断的なメディアアートの制作を開始。',
    },
    {
      location: 'Berlin, Germany',
      period: '2023 - Present',
      title: 'Relocation to Berlin & Artistic Exploration',
      desc: 'ベルリンへ留学・移住。ヨーロッパの現代アートシーンに触れながら、映像と空間表現の探求を深める。',
    },
    {
      location: 'Copenhagen & Paris',
      period: '2024',
      title: 'Art Direction for CinéFile',
      desc: 'CinéFileの立ち上げに参画し、イベント全体のビジュアル・アイデンティティを確立。各都市の空間に合わせたグラフィックと体験をデザイン。',
    },
    {
      location: 'Global',
      period: '2025 - Present',
      title: 'Spatial Installation & Worldbuilding',
      desc: '映像上映にとどまらず、写真やインスタレーションを通じた空間デザインを主導。イベントの世界観を立体的に構築している。',
    }
  ];

  const expertise = [
    { title: 'Art Direction', desc: 'イベント全体のビジュアルイメージ、グラフィック、空間のトータルディレクション。' },
    { title: 'Spatial Installation', desc: '写真や映像を用いた、物理的な空間と鑑賞者の身体感覚を繋ぐインスタレーションの設計。' },
    { title: 'Cross-media Creation', desc: 'デジタルとアナログ、平面と立体を横断する多様なメディア表現。' }
  ];

  const eventsData = await client.getList<EventItem>({
    endpoint: 'events',
    queries: { limit: 100 },
  });
  const participatedEvents = eventsData.contents;

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-5xl mx-auto px-6 sm:px-12 py-12 sm:py-20">
        
        <Link
          href="/people"
          className="inline-flex items-center text-xs tracking-widest text-gray-400 hover:text-gray-900 mb-16 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5 mr-2" />
          BACK TO PEOPLE
        </Link>

        <header className="grid md:grid-cols-[1fr_2fr] gap-12 items-center mb-20">
          <div className="aspect-[3/4] w-48 md:w-full bg-gray-50 overflow-hidden rounded-sm mx-auto md:mx-0">
            <img 
              src="/members/miku.jpg" 
              alt="Miku Sotomura" 
              className="w-full h-full object-cover" 
            />
          </div>
          <div className="text-center md:text-left">
            <p className="text-xs tracking-widest text-gray-400 mb-2">CREATIVE DIRECTOR</p>
            <h1 className="text-4xl tracking-tight mb-3 text-gray-900">Miku Sotomura</h1>
            <p className="text-sm font-medium text-[#1c2b5e] tracking-wider mb-6">外村 未空</p>
            <p className="text-sm text-gray-600 leading-relaxed max-w-xl">
              東京藝術大学卒業後、ベルリンに留学。映像、写真、インスタレーションを横断しながら制作活動を続けています。CinéFileでは各イベントのアートディレクションとビジュアル制作を担当し、作品と空間が呼応するような没入感のある世界観づくりに貢献しています。
            </p>
          </div>
        </header>

        <div className="grid md:grid-cols-[1fr_2fr] gap-16 border-t border-gray-100 pt-16">
          <div className="space-y-10 md:sticky md:top-8 self-start">
            <div>
              <h2 className="text-xs tracking-widest text-gray-400 uppercase mb-6 flex items-center gap-2">
                <Compass className="w-3.5 h-3.5" /> Approach
              </h2>
              <div className="space-y-8">
                {expertise.map((item, idx) => (
                  <div key={idx} className="space-y-1.5">
                    <h3 className="text-xs font-semibold text-gray-800">{item.title}</h3>
                    <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4">
              <h2 className="text-xs tracking-widest text-gray-400 uppercase mb-4 flex items-center gap-2">
                <Globe className="w-3.5 h-3.5" /> Networks
              </h2>
              <div className="space-y-2 text-xs">
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center gap-1.5 text-gray-500 hover:text-gray-900 transition-colors"
                >
                  Instagram <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </div>
            </div>
          </div>

          <div className="space-y-16">
            <div>
              <h2 className="text-xs tracking-widest text-gray-400 uppercase mb-10 flex items-center gap-2">
                <Palette className="w-3.5 h-3.5" /> Artistic Journey
              </h2>
              <div className="relative border-l border-gray-100 pl-6 ml-1.5 space-y-12">
                {milestones.map((milestone, i) => (
                  <div key={i} className="relative group">
                    <div className="absolute -left-[31px] top-1.5 w-2 h-2 rounded-full bg-gray-300 group-hover:bg-[#1c2b5e] transition-colors" />
                    
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-2">
                      <span className="text-[10px] tracking-widest font-semibold text-gray-400 uppercase">
                        {milestone.period}
                      </span>
                      <span className="text-xs text-[#1c2b5e] tracking-wide font-medium">
                        {milestone.location}
                      </span>
                    </div>
                    
                    <h3 className="text-lg tracking-tight text-gray-900 mb-2">
                      {milestone.title}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {milestone.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gray-50 p-8 rounded-sm border border-gray-100">
              <h2 className="text-xs tracking-widest text-gray-400 uppercase mb-4 flex items-center gap-2">
                <MessageSquare className="w-3.5 h-3.5" /> Statement
              </h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                「視覚的な美しさを超えて、空間そのものが持つ記憶や温度を引き出すこと。CinéFileのイベントでは、訪れた人が作品と対峙するだけでなく、空間全体を一つの体験として持ち帰ることができるような、没入感のあるアートディレクションを目指しています。」
              </p>
            </div>
          </div>
        </div>

        <div className="mt-24 pt-16 border-t border-gray-100">
          <h2 className="text-xs tracking-widest text-gray-400 uppercase mb-10 flex items-center gap-2">
            <ImageIcon className="w-3.5 h-3.5" /> Directed Artworks &amp; Events
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