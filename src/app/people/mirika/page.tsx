import Link from 'next/link';
import { ArrowLeft, Briefcase, Globe, MessageSquare, Compass, ExternalLink, Calendar } from 'lucide-react';
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

export default async function MirikaPortfolioPage() {
  const milestones = [
    {
      location: 'Tokyo, Japan',
      period: '2022',
      title: 'Graduation from Waseda University',
      desc: '早稲田大学文化構想学部を卒業後、アートマネジメントと文化交流の分野へ。',
    },
    {
      location: 'Paris, France',
      period: '2023 - 2024',
      title: 'Study & Networking in Paris',
      desc: 'パリへ留学し、現地のギャラリーやオルタナティブ・スペースでのリサーチを敢行。欧州のインディペンデントなアートシーンと深いネットワークを構築。',
    },
    {
      location: 'Europe Tour',
      period: '2024 - 2025',
      title: 'Producing CinéFile Events',
      desc: 'プロデューサーとして、各都市のギャラリーやスペースとの渉外、資金調達、プロジェクトマネジメントを主導。',
    },
    {
      location: 'Global',
      period: '2025 - Present',
      title: 'Bridging Cultures',
      desc: '日本とヨーロッパのアートシーンを接続し、新たなクリエイターを支援するプラットフォームの形成に取り組んでいる。',
    }
  ];

  const expertise = [
    { title: 'Project Production', desc: 'コンセプト立案から予算管理、チームビルディング、実行に至るまでの全体統括。' },
    { title: 'Partnership Building', desc: '国内外のアーティスト、ギャラリー、企業、公的機関とのリレーション構築と交渉。' },
    { title: 'Cultural Bridge', desc: '欧州と日本のアートカルチャーの違いを理解し、相互に価値をもたらす企画の設計。' }
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
              src="/members/mirika.jpg" 
              alt="Mirika Ishida" 
              className="w-full h-full object-cover" 
            />
          </div>
          <div className="text-center md:text-left">
            <p className="text-xs tracking-widest text-gray-400 mb-2">PRODUCER</p>
            <h1 className="text-4xl tracking-tight mb-3 text-gray-900">Mirika Ishida</h1>
            <p className="text-sm font-medium text-[#1c2b5e] tracking-wider mb-6">石田 満理佳</p>
            <p className="text-sm text-gray-600 leading-relaxed max-w-xl">
              早稲田大学文化構想学部卒。パリへの留学経験を持ち、日欧のアートシーンに精通しています。CinéFileでは企画・運営・渉外を統括し、国内外のアーティストやスペース、企業とのパートナーシップを担当。クリエイティブを現実社会に接続する架け橋としての役割を担っています。
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
                  href="https://linkedin.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center gap-1.5 text-gray-500 hover:text-gray-900 transition-colors"
                >
                  LinkedIn <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </div>
            </div>
          </div>

          <div className="space-y-16">
            <div>
              <h2 className="text-xs tracking-widest text-gray-400 uppercase mb-10 flex items-center gap-2">
                <Briefcase className="w-3.5 h-3.5" /> Career &amp; Milestones
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
                「アートは、社会と関わり、多様な人々が交差する場から生まれます。私の役割は、アーティストが最も自由に表現できる環境を整え、作品が持つメッセージを社会へ橋渡しすることです。CinéFileを通じて、国や言語を越えた新しい対話のプラットフォームを育てていきたいと考えています。」
              </p>
            </div>
          </div>
        </div>

        <div className="mt-24 pt-16 border-t border-gray-100">
          <h2 className="text-xs tracking-widest text-gray-400 uppercase mb-10 flex items-center gap-2">
            <Calendar className="w-3.5 h-3.5" /> Produced Events
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