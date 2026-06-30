import Link from 'next/link';
import { ArrowLeft, Film, Globe, MessageSquare, Compass, ExternalLink } from 'lucide-react';
import { client } from '../../../libs/microcms'; // 🌟 microCMSのクライアントを読み込む

// 🌟 microCMSから取得するイベントの型を定義
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

export default async function KatsukiPortfolioPage() {
  // これまで主導してきたキャラバンの軌跡・プロジェクト
  const milestones = [
    {
      location: 'Copenhagen, Denmark',
      period: '2023 - 2024',
      title: 'CinéFile Launch & Initial Screenings',
      desc: 'コペンハーゲン大学在学中にプロジェクトを始動。現地の学生クリエイターや映画愛好家を巻き込み、実験的な上映会と対話のワークショップを初めて開催。',
    },
    {
      location: 'Paris, France',
      period: '2024',
      title: 'Pop-up Space: Poiesis & Image',
      desc: 'パリのオルタナティブ・スペースと協働し、映像と詩作をテーマにしたポップアップイベントをディレクション。異文化が交差する対話の場を創出。',
    },
    {
      location: 'Berlin, Germany',
      period: '2025',
      title: 'Interdisciplinary Exhibition "Stir"',
      desc: 'ベルリンのインディペンデントギャラリーにて、映像、写真、空間音響を組み合わせた合同展示をプロデュース。現地のアーティストのコレクティブを主導。',
    },
    {
      location: 'Tokyo, Japan',
      period: '2025 - Present',
      title: 'Caravan Project in Tokyo',
      desc: '活動の拠点を東京へ移し、商業空間や公共スペースの境界を揺るがすような、地域に根ざしたアートキャラバンを展開中。',
    }
  ];

  // 専門領域・ディレクションスタイル
  const expertise = [
    { title: 'Visual Media & Film', desc: '映像メディアの歴史的文脈を踏まえた、空間上映の企画および映像作品の選定・ディレクション。' },
    { title: 'Space Curation', desc: '固定概念にとらわれない、その土地の歴史や文脈、構造を活かした実験的な「場」の設計。' },
    { title: 'Community Design', desc: '国境や専門領域を越えた学生、アーティスト、市民が対等に対話できるフラットな関係性の構築。' }
  ];

  // 🌟 追加：microCMSからイベントデータを全件（最大100件）取得する
  const eventsData = await client.getList<EventItem>({
    endpoint: 'events',
    queries: { limit: 100 },
  });
  const participatedEvents = eventsData.contents;

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-5xl mx-auto px-6 sm:px-12 py-12 sm:py-20">
        
        {/* 戻るボタン */}
        <Link
          href="/people"
          className="inline-flex items-center text-xs tracking-widest text-gray-400 hover:text-gray-900 mb-16 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5 mr-2" />
          BACK TO PEOPLE
        </Link>

        {/* ヒーローセクション */}
        <header className="grid md:grid-cols-[1fr_2fr] gap-12 items-center mb-20">
          <div className="aspect-[3/4] w-48 md:w-full bg-gray-50 overflow-hidden rounded-sm mx-auto md:mx-0">
            <img 
              src="/members/katsuki.jpg" 
              alt="Katsuki Kou" 
              className="w-full h-full object-cover" 
            />
          </div>
          <div className="text-center md:text-left">
            <p className="text-xs tracking-widest text-gray-400 mb-2">FOUNDER / DIRECTOR</p>
            <h1 className="text-4xl tracking-tight mb-3 text-gray-900">Katsuki Kou</h1>
            <p className="text-sm font-medium text-[#1c2b5e] tracking-wider mb-6">洪 克樹</p>
            <p className="text-sm text-gray-600 leading-relaxed max-w-xl">
              コペンハーゲン大学にて映像メディアを専攻。在学中にCinéFileを立ち上げ、北欧、西欧、そして日本へと場所を移しながらアートイベントを主導。映像というメディアを単なる「鑑賞物」としてではなく、人々の対話や新たな思考を引き出す「メディア（媒介）」として捉え、実験的な空間づくりを追求しています。
            </p>
          </div>
        </header>

        {/* メインレイアウト */}
        <div className="grid md:grid-cols-[1fr_2fr] gap-16 border-t border-gray-100 pt-16">
          
          {/* 左カラム：アプローチと専門領域 */}
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

            {/* コンタクト・外部リンク */}
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

          {/* 右カラム：タイムライン・軌跡 */}
          <div className="space-y-16">
            
            {/* プロジェクト・キャラバンの歴史 */}
            <div>
              <h2 className="text-xs tracking-widest text-gray-400 uppercase mb-10 flex items-center gap-2">
                <Film className="w-3.5 h-3.5" /> Caravan Footprints
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

            {/* ディレクターズ・ステートメント */}
            <div className="bg-gray-50 p-8 rounded-sm border border-gray-100">
              <h2 className="text-xs tracking-widest text-gray-400 uppercase mb-4 flex items-center gap-2">
                <MessageSquare className="w-3.5 h-3.5" /> Statement
              </h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                「世界中に情報があふれ、何事も効率的に消費されていく現代において、あえて一つの場所に集まり、流動的な映像光に身を浸し、その後に言葉を交わすこと。その非効率的とも言える贅沢な『余白』の中にこそ、新しい表現の萌芽（Poiesis）があると信じています。固定されたハコ（劇場やギャラリー）を持たないキャラバンだからこそ、毎回異なる都市の呼吸と混ざり合い、その日その場所だけの対話を生み出すことができます。」
              </p>
            </div>

          </div>
        </div>

        {/* 🌟 変更：microCMSから取得した全イベントを展開 */}
        <div className="mt-24 pt-16 border-t border-gray-100">
          <h2 className="text-xs tracking-widest text-gray-400 uppercase mb-10 flex items-center gap-2">
            <Film className="w-3.5 h-3.5" /> Curated &amp; Directed Events
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