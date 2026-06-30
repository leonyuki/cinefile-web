import Link from 'next/link';

// 🌟 membersの型定義（nameEnやidなどを追加）
type MemberItem = {
  id: string;
  name: string;
  nameEn: string;
  role: string;
  image: string; // 画像パス
  bio: string;
};

// 🌟 ご提示いただいた情報をもとにmembersを設定
const members: MemberItem[] = [
  {
    id: 'katsuki', // URLになる一意のID
    name: '洪 克樹',
    nameEn: 'Katsuki Kou', // ※Katukiを一般的なヘボン式表記のKatsukiに補正しています
    role: 'Founder / Director',
    image: '/members/katsuki.jpg', // public/members/ フォルダに配置する画像パス
    bio: 'コペンハーゲン大学にて映像メディアを専攻。在学中にCinéFileを立ち上げ、デンマーク・フランス・ドイツ・東京でのイベントを主導してきた。アートと対話の場づくりを通じ、文化の境界を越えたコミュニティの形成に取り組んでいる。',
  },
  {
    id: 'miku',
    name: '外村 未空',
    nameEn: 'Miku Sotomura',
    role: 'Creative Director',
    image: '/members/miku.jpg',
    bio: '東京藝術大学卒業後、ベルリンに留学。映像、写真、インスタレーションを横断しながら制作活動を続ける。CinéFileでは各イベントのアートディレクションとビジュアル制作を担当し、イベントの世界観づくりに貢献している。',
  },
  {
    id: 'mirika',
    name: '石田 満理佳',
    nameEn: 'Mirika Ishida',
    role: 'Producer',
    image: '/members/mirika.jpg',
    bio: '早稲田大学文化構想学部卒。パリへの留学経験を持ち、日欧のアートシーンに精通する。CinéFileでは企画・運営・渉外を統括し、国内外のアーティストやスペース、企業とのパートナーシップを担当している。',
  },
];

export default function PeoplePage() {
  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-12 py-12 sm:py-20">
      <div className="mb-14 border-b border-gray-100 pb-8">
        <p className="text-xs tracking-widest text-gray-400 mb-3">PEOPLE</p>
        <h1 className="text-3xl sm:text-4xl tracking-tight">Members &amp; Artists</h1>
      </div>

      {/* メンバーのグリッド表示 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
        {members.map((person) => (
          <Link key={person.id} href={`/people/${person.id}`} className="group block">
            {/* ポートレート画像エリア */}
            <div className="aspect-[3/4] mb-5 overflow-hidden bg-gray-50 relative">
              {person.image ? (
                <img
                  src={person.image}
                  alt={person.name}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-300 text-xs">
                  No Image
                </div>
              )}
            </div>

            {/* 名前・肩書き情報 */}
            <div className="space-y-1 mb-3">
              <div className="flex items-baseline gap-3">
                <h2 className="text-lg tracking-tight text-gray-950 group-hover:text-gray-500 transition-colors">
                  {person.name}
                </h2>
                <span className="text-xs text-gray-400 font-normal tracking-wide">
                  {person.nameEn}
                </span>
              </div>
              <p className="text-xs tracking-wider text-[#1c2b5e] font-medium">
                {person.role}
              </p>
            </div>

            {/* 簡易プロフィール文 */}
            <p className="text-xs text-gray-500 leading-relaxed line-clamp-3">
              {person.bio}
            </p>
            
            <div className="mt-3 text-[10px] tracking-widest text-gray-400 group-hover:text-gray-900 transition-colors">
              VIEW PORTFOLIO →
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}