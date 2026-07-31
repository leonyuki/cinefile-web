import Link from 'next/link';
import Image from 'next/image';
import { Sparkles, Compass } from 'lucide-react';
import { client } from '../../libs/microcms';

export const metadata = {
  title: 'About Us | CinéFile',
  description: 'CinéFileのミッション、ビジョン、およびプロジェクトメンバーについて。',
};

type MicroCMSImage = {
  url: string;
};

type MemberItem = {
  id: string;
  name: string;      
  name_ja: string;   
  name_en: string;   
  position?: string; 
  image?: MicroCMSImage; 
  description?: string;  
};

export default async function AboutPage() {
  const peopleData = await client.getList<MemberItem>({
    endpoint: 'people',
    queries: { limit: 20 },
  }).catch(() => ({ contents: [] }));

  const teamMembers = peopleData.contents;

  return (
    <div className="bg-white min-h-screen">
      
      {/* 1. トップのヒーロー画像 */}
      <div className="relative w-full h-[50vh] sm:h-[60vh] md:h-[70vh] bg-gray-100">
        <Image
          src="/about_title.jpg"
          alt="About CinéFile"
          fill
          priority
          unoptimized // 🌟 これがあれば画質問題は解決します
          // ❌ ここにあった quality={100} や sizes を削除する
          className="object-cover"
        />
      </div>

      {/* 2. ABOUT US (テキストセクション) */}
      <section className="max-w-5xl mx-auto px-6 sm:px-12 pt-20 pb-10">
        {/* 見出し */}
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl tracking-widest text-gray-900 font-light uppercase">
            About Us
          </h1>
        </div>
        
        {/* リード文（導入テキスト） */}
        <div className="max-w-3xl mx-auto text-center space-y-6 text-sm sm:text-base text-gray-600 leading-loose mb-20">
          <p>
            CinéFileは、映像制作とアートイベントの運営を通じて<br className="hidden md:block" />社会に問いかける、実験的なアートスペースです。
          </p>
          <p>
            ヨーロッパを拠点に活動を始め、<br className="hidden md:block" />コペンハーゲン、パリ、ベルリン、そして東京と、<br className="hidden md:block" />
            国内外の都市で継続的に活動しています。
          </p>
        </div>

        {/* 2つの特徴・アプローチ（横並びのグリッド） */}
        <div className="grid sm:grid-cols-2 gap-12 sm:gap-16">
          
          {/* ポイント 01 */}
          <div className="relative pt-6 border-t border-gray-200">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-lg tracking-widest text-gray-400 font-medium">01.</span>
              <h3 className="text-2xl tracking-tight text-gray-900">コンセプト設計</h3>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">
              その都市の文化や歴史、時代背景を元に議論を重ねてコンセプトを設定し、それに応答する形でアーティストが作品を制作します。それぞれが異なる媒体を用いてアプローチすることで、多角的にテーマを捉え直しています。
            </p>
          </div>

          {/* ポイント 02 */}
          <div className="relative pt-6 border-t border-gray-200">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-lg tracking-widest text-gray-400 font-medium">02.</span>
              <h3 className="text-2xl tracking-tight text-gray-900">創作と対話</h3>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">
              空間設計、対話セッション、参加型企画などを通じて、アーティストと観客の垣根を超えた自然な会話が生まれるように工夫しています。偶然の出会いや気づきが、個人の変化となり、それが社会全体に広がっていく過程を大切にしています。
            </p>
          </div>

        </div>
      </section>

      {/* 3. VISION */}
      <section className="bg-white"> {/* 白背景に変更し、ミニマルに */}
        {/* 🌟 py-24 md:py-32 だった部分を py-8 md:py-10 に変更（約1/3のスペース） */}
        <div className="max-w-5xl mx-auto px-6 sm:px-12 py-8 md:py-10">
          <div className="flex flex-col items-center text-center">
            
            {/* ラベル */}
            <div className="flex items-center gap-2 text-sm tracking-widest text-gray-400 mb-8">
              <Sparkles className="w-4 h-4" /> VISION
            </div>
            
            {/* タイトル：英語メイン、日本語サブに分割し、タイポグラフィを調整 */}
            <div className="mb-12">
              <h2 className="text-4xl sm:text-5xl font-light tracking-widest text-gray-900 mb-3 leading-tight">
                Space for Creativity
              </h2>
              <p className="text-sm sm:text-base font-normal tracking-wide text-gray-500">
                創造力の空間、創作の余白
              </p>
            </div>
            
            {/* 本文：text色を薄く、max-wをさらに絞り、space-yとleadingを広げて、より詩的な佇まいに */}
            <div className="max-w-xl space-y-4 text-sm sm:text-base text-gray-500 font-light leading-loose sm:leading-loose tracking-wide">
              <p>
                創造力は、誰もが持っている可能性の空間。
              </p>
              <p>
                すべての人の日常に「つくること」の余白がある、<br className="hidden sm:block" />
                そんな未来に向けて。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Members */}
      <section className="max-w-6xl mx-auto px-6 sm:px-12 py-24">
        <div className="text-center mb-16">
          <h2 className="text-2xl tracking-tight text-gray-900 mb-3">Members</h2>
          <p className="text-xs tracking-widest text-gray-400">プロジェクトメンバー</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-10 gap-y-16">
          {teamMembers.map((member) => (
            <Link 
              key={member.id} 
              href={`/people/${member.name}`}
              className="group block"
            >
              {/* 🌟 relative を追加してオーバーレイの基準位置にしました */}
              <div className="aspect-square w-full bg-gray-50 overflow-hidden rounded-xs border border-gray-100 shadow-2xs mb-5 relative">
                <img 
                  src={member.image?.url || '/logo_cinefile.png'} 
                  alt={member.name_en} 
                  className="w-full h-full object-cover" 
                />
                {/* 追加: ホバー時に表示されるグレーのオーバーレイ */}
                <div className="absolute inset-0 bg-gray-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
              
              <h3 className="text-xl tracking-tight text-gray-900 mb-1 group-hover:text-gray-500 transition-colors">
                {member.name_en}
              </h3>
              <p className="text-xs text-[#1c2b5e] tracking-wider mb-2 font-medium">
                {member.name_ja}
              </p>
              
              <p className="text-[10px] tracking-widest text-gray-400 font-medium uppercase mb-4">
                {member.position || 'MEMBER'}
              </p>

            </Link>
          ))}
        </div>
      </section>

    </div>
  );
}