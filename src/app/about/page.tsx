import Link from 'next/link';
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
  // microCMSからメンバーデータを一括取得
  const peopleData = await client.getList<MemberItem>({
    endpoint: 'people',
    queries: { limit: 20 },
  }).catch(() => ({ contents: [] }));

  const teamMembers = peopleData.contents;

  return (
    <div className="bg-white min-h-screen">
      
      {/* 1. ABOUT US */}
      <section className="max-w-4xl mx-auto px-6 sm:px-12 pt-20 pb-16">
        <div className="text-center mb-16">
          <h1 className="text-3xl tracking-tight text-gray-900 mb-4">About Us</h1>
          <p className="text-xs tracking-widest text-gray-400">CinéFile(シネフィル) について</p>
        </div>
        
        <div className="space-y-6 text-sm text-gray-600 leading-loose">
          <p>
            CinéFileは、国境を越えた学生主導のアート・カルチャープロジェクトです。コペンハーゲン、パリ、ベルリン、東京と場所を移しながら、それぞれの土地の文化や空間と対話し、新しい表現と出会いの場を創出してきました。
          </p>
          <p>
            固定された会場を持たないキャラバン形式だからこそ、その場所でしか生まれない一期一会の体験を提供できると信じています。
          </p>
        </div>
      </section>

      {/* 2. MISSION & VISION */}
      <section className="bg-gray-50 border-y border-gray-100">
        <div className="max-w-5xl mx-auto px-6 sm:px-12 py-20">
          <div className="grid md:grid-cols-2 gap-16">
            {/* MISSION */}
            <div>
              <div className="flex items-center gap-2 text-xs tracking-widest text-gray-400 mb-6">
                <Compass className="w-4 h-4" /> MISSION
              </div>
              <h2 className="text-xl tracking-tight text-gray-900 mb-4">その手で、世界を切りとる</h2>
              <div className="space-y-4 text-sm text-gray-600 leading-relaxed">
                <p>日常の中で見落とされがちな瞬間や、言語化できない感情。それらを映像やアートという枠組みを通して「切りとる」ことで、世界は新しい顔を見せ始めます。</p>
                <p>私たちは、参加者一人ひとりが主体的に世界を切りとり、再解釈するための視点（レンズ）を提供するプロジェクトでありたいと考えています。</p>
              </div>
            </div>
            {/* VISION */}
            <div>
              <div className="flex items-center gap-2 text-xs tracking-widest text-gray-400 mb-6">
                <Sparkles className="w-4 h-4" /> VISION
              </div>
              <h2 className="text-xl tracking-tight text-gray-900 mb-4">Space for Creativity</h2>
              <div className="space-y-4 text-sm text-gray-600 leading-relaxed">
                <p>すべての人の日常に「つくること」の余白がある状態。<br />内なる世界の創造は、無限に拡がる宇宙に繋がっています。</p>
                <p>誰もがクリエイティビティを発揮し、互いの表現を尊重し合えるような、心理的にも物理的にも安全で開かれた「空間（Space）」を世界中につくり出します。</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Members */}
      <section className="max-w-6xl mx-auto px-6 sm:px-12 py-24">
        <div className="text-center mb-16">
          <h2 className="text-2xl tracking-tight text-gray-900 mb-3">Members</h2>
          <p className="text-xs tracking-widest text-gray-400">プロジェクトメンバー</p>
        </div>

        {/* 🌟 縦並びのカード型（グリッド）レイアウトに変更 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-10 gap-y-16">
          {teamMembers.map((member) => (
            <Link 
              key={member.id} 
              href={`/people/${member.name}`}
              className="group block"
            >
              {/* ① 写真 */}
              <div className="aspect-[3/4] w-full bg-gray-50 overflow-hidden rounded-xs border border-gray-100 shadow-2xs mb-5">
                <img 
                  src={member.image?.url || '/logo_cinefile.png'} 
                  alt={member.name_en} 
                  className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500 ease-out" 
                />
              </div>
              
              {/* ② 名前 */}
              <h3 className="text-xl tracking-tight text-gray-900 mb-1 group-hover:text-gray-500 transition-colors">
                {member.name_en}
              </h3>
              <p className="text-xs text-[#1c2b5e] tracking-wider mb-2 font-medium">
                {member.name_ja}
              </p>
              
              {/* ③ 役職 */}
              <p className="text-[10px] tracking-widest text-gray-400 font-medium uppercase mb-4">
                {member.position || 'MEMBER'}
              </p>
              
              {/* ④ 自己紹介文 */}
              {member.description && (
                <p className="text-sm text-gray-500 leading-relaxed whitespace-pre-wrap line-clamp-4">
                  {member.description}
                </p>
              )}
            </Link>
          ))}
        </div>
      </section>

    </div>
  );
}