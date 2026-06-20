// default を追加しました！
export default function PeoplePage() {
  const board = [
    {
      name: '洪 允娥',
      nameEn: 'Yuna Hong',
      role: 'Founder / Director',
      bio: 'コペンハーゲン大学にて映像メディアを専攻。在学中にCinéFileを立ち上げ、デンマーク・フランス・ドイツ・東京でのイベントを主導してきた。アートと対話の場づくりを通じ、文化の境界を越えたコミュニティの形成に取り組んでいる。',
    },
    {
      name: '外村 渉',
      nameEn: 'Wataru Tonomura',
      role: 'Creative Director',
      bio: '東京藝術大学卒業後、ベルリンに留学。映像、写真、インスタレーションを横断しながら制作活動を続ける。CinéFileでは各イベントのアートディレクションとビジュアル制作を担当し、イベントの世界観づくりに貢献している。',
    },
    {
      name: '石田 莉子',
      nameEn: 'Riko Ishida',
      role: 'Producer',
      bio: '早稲田大学文化構想学部卒。パリへの留学経験を持ち、日欧のアートシーンに精通する。CinéFileでは企画・運営・渉外を統括し、国内外のアーティストやスペース、企業とのパートナーシップを担当している。',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-12 py-12 sm:py-20">
      <div className="mb-14">
        <p className="text-xs tracking-widest text-gray-400 mb-3">PEOPLE</p>
        <h1 className="text-3xl sm:text-4xl tracking-tight">The People Behind CinéFile</h1>
      </div>

      {/* BOARD */}
      <section className="mb-20">
        <h2 className="text-xs tracking-widest text-gray-400 mb-10 pb-3 border-b border-gray-100">
          BOARD
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {board.map((member) => (
            <div key={member.name}>
              {/* Placeholder portrait: aspect-[3/4] を aspect-3/4 に短縮しました！ */}
              <div className="aspect-3/4 bg-[#f5f0ec] mb-5 flex items-end p-4">
                <div className="w-full h-1 bg-[#1c2b5e] opacity-20" />
              </div>
              <div className="text-xs tracking-widest text-[#1c2b5e] mb-1">{member.role}</div>
              <h3 className="text-xl tracking-tight mb-0.5">{member.name}</h3>
              <p className="text-xs text-gray-400 mb-3">{member.nameEn}</p>
              <p className="text-sm text-gray-600 leading-relaxed">{member.bio}</p>
            </div>
          ))}
        </div>
      </section>

      {/* COMMUNITY */}
      <section>
        <h2 className="text-xs tracking-widest text-gray-400 mb-10 pb-3 border-b border-gray-100">
          COMMUNITY
        </h2>

        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-xl tracking-tight mb-4">私たちのコミュニティについて</h3>
            <div className="space-y-4 text-sm text-gray-600 leading-relaxed">
              <p>
                CinéFileは、ボードメンバーだけでなく、各都市でイベントに携わったアーティスト、スタッフ、ボランティア、そして来場してくださったすべての方々によって成り立つコミュニティです。
              </p>
              <p>
                国境や専門分野を越えて、「つくる、みる、はなす」を共有する人々のゆるやかなつながり——それが私たちの考えるコミュニティの姿です。キャラバン形式のイベントが各地に根を張るように、CinéFileのコミュニティも各都市に静かに広がっています。
              </p>
              <p>
                アーティスト、研究者、学生、社会人、どんな立場からでも参加できます。関心を持った方は、ぜひContactページからお問い合わせください。
              </p>
            </div>
          </div>
          <div className="space-y-6">
            <div className="p-6 border border-gray-100 bg-gray-50">
              <h4 className="text-sm tracking-tight mb-3">アーティスト・コラボレーター</h4>
              <p className="text-xs text-gray-500 leading-relaxed">
                これまでのイベントに参加してくださったアーティスト、映像作家、パフォーマー、デザイナーの方々。各都市の文化と対話しながら、CinéFileの世界観を共につくってきた仲間です。
              </p>
            </div>
            <div className="p-6 border border-gray-100 bg-gray-50">
              <h4 className="text-sm tracking-tight mb-3">パートナー団体</h4>
              <p className="text-xs text-gray-500 leading-relaxed">
                無印良品、ベルリン日独センター、パリ国際大学都市日本館、KraftWerketなど、各地でスペースや機会をご提供いただいた団体・企業のみなさまとのつながりを大切にしています。
              </p>
            </div>
            <div className="p-6 border border-gray-100 bg-gray-50">
              <h4 className="text-sm tracking-tight mb-3">サポーター・来場者</h4>
              <p className="text-xs text-gray-500 leading-relaxed">
                各都市で足を運んでくださった方々、SNSでシェアしてくださった方々。あなたの存在がCinéFileの対話の場を豊かにしています。
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}