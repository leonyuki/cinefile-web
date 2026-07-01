import Link from 'next/link';
import { ArrowRight, Sparkles, Compass } from 'lucide-react';
import { client } from '../../libs/microcms';

// 🌟 microCMSから取得するメンバーの型
type MemberItem = {
  id: string;
  name: string;
  description?: string; // microCMSで管理する自己紹介文
};

// 名前や画像などの「基本データ」
const TEAM_MEMBERS_BASE = [
  {
    id: 'katsuki',
    nameJa: '洪 克樹',
    nameEn: 'Katsuki Kou',
    role: 'FOUNDER / DIRECTOR',
    image: '/members/katsuki.jpg',
  },
  {
    id: 'miku',
    nameJa: '外村 未空',
    nameEn: 'Miku Sotomura',
    role: 'CREATIVE DIRECTOR',
    image: '/members/miku.jpg',
  },
  {
    id: 'mirika',
    nameJa: '石田 満理佳',
    nameEn: 'Mirika Ishida',
    role: 'PRODUCER',
    image: '/members/mirika.jpg',
  }
];

export default async function AboutPage() {
  // 🌟 microCMSから全メンバーのデータを取得
  const peopleData = await client.getList<MemberItem>({
    endpoint: 'people',
    queries: { limit: 10 },
  }).catch(() => ({ contents: [] }));

  // 基本データとmicroCMSのデータ（description）を合体させる
  const teamMembers = TEAM_MEMBERS_BASE.map(base => {
    const cmsData = peopleData.contents.find(p => p.name === base.id);
    return {
      ...base,
      description: cmsData?.description || '現在準備中です。',
    };
  });

  return (
    <div className="bg-white min-h-screen">
      
      {/* ABOUT US */}
      <section className="max-w-4xl mx-auto px-6 sm:px-12 pt-20 pb-16">
        <div className="text-center mb-16">
          <h1 className="text-3xl tracking-tight text-gray-900 mb-4">About Us</h1>
          <p className="text-xs tracking-widest text-gray-400">CinéFile (シネフィル) について</p>
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

      {/* MISSION & VISION */}
      <section className="bg-gray-50 border-y border-gray-100">
        <div className="max-w-5xl mx-auto px-6 sm:px-12 py-20">
          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <div className="flex items-center gap-2 text-xs tracking-widest text-gray-400 mb-6">
                <Compass className="w-4 h-4" /> MISSION
              </div>
              <h2 className="text-xl tracking-tight text-gray-900 mb-4">
                その手で、世界を切りとる
              </h2>
              <div className="space-y-4 text-sm text-gray-600 leading-relaxed">
                <p>
                  日常の中で見落とされがちな瞬間や、言語化できない感情。それらを映像やアートという枠組みを通して「切りとる」ことで、世界は新しい顔を見せ始めます。
                </p>
                <p>
                  私たちは、参加者一人ひとりが主体的に世界を切りとり、再解釈するための視点（レンズ）を提供するプロジェクトでありたいと考えています。
                </p>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2 text-xs tracking-widest text-gray-400 mb-6">
                <Sparkles className="w-4 h-4" /> VISION
              </div>
              <h2 className="text-xl tracking-tight text-gray-900 mb-4">
                Space for Creativity
              </h2>
              <div className="space-y-4 text-sm text-gray-600 leading-relaxed">
                <p>
                  すべての人の日常に「つくること」の余白がある状態。<br />
                  内なる世界の創造は、無限に拡がる宇宙に繋がっています。
                </p>
                <p>
                  誰もがクリエイティビティを発揮し、互いの表現を尊重し合えるような、心理的にも物理的にも安全で開かれた「空間（Space）」を世界中につくり出します。
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PEOPLE (MEMBERS) */}
      <section className="max-w-5xl mx-auto px-6 sm:px-12 py-24">
        <div className="text-center mb-16">
          <h2 className="text-2xl tracking-tight text-gray-900 mb-3">Members</h2>
          <p className="text-xs tracking-widest text-gray-400">プロジェクトメンバー</p>
        </div>

        <div className="space-y-16">
          {/* 🌟 結合したデータでループ処理 */}
          {teamMembers.map((member) => (
            <div key={member.id} className="flex flex-col md:flex-row gap-8 md:gap-12 items-start group">
              <Link href={`/people/${member.id}`} className="w-40 sm:w-48 shrink-0 aspect-[3/4] bg-gray-100 overflow-hidden rounded-sm block">
                <img 
                  src={member.image} 
                  alt={member.nameEn} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out" 
                />
              </Link>
              <div className="flex-1 pt-2">
                <p className="text-[10px] tracking-widest text-gray-400 mb-2 font-medium">{member.role}</p>
                <Link href={`/people/${member.id}`} className="inline-block group-hover:opacity-70 transition-opacity">
                  <h3 className="text-2xl tracking-tight text-gray-900 mb-1">{member.nameEn}</h3>
                  <p className="text-xs text-[#1c2b5e] tracking-wider mb-5 font-medium">{member.nameJa}</p>
                </Link>
                
                {/* 🌟 microCMSから取得した自己紹介を表示 (改行も反映) */}
                <p className="text-sm text-gray-600 leading-relaxed max-w-2xl mb-6 whitespace-pre-wrap">
                  {member.description}
                </p>
                
                <Link 
                  href={`/people/${member.id}`}
                  className="inline-flex items-center text-xs tracking-widest text-gray-900 hover:text-gray-500 transition-colors"
                >
                  VIEW PORTFOLIO <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}