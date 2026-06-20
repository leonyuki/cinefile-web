export function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 sm:px-12 py-12 sm:py-20">
      <h1 className="text-3xl sm:text-4xl mb-12 tracking-tight">About</h1>

      <div className="grid md:grid-cols-2 gap-12 mb-16">
        {/* Philosophy */}
        <div>
          <h2 className="text-xl mb-6 tracking-tight">理念</h2>
          <div className="space-y-4">
            <p className="text-gray-900 leading-relaxed">
              創作と対話の実験的スペース
            </p>
            <p className="text-sm text-gray-500 italic leading-relaxed">
              Experimental Space for Poiesis & Dialogue
            </p>
            <p className="text-sm text-gray-600 leading-relaxed">
              「つくる、みる、はなす」を日常に。<br />
              誰かの表現から生まれる対話でつながる実験的スペース。<br />
              生活のなかに創作がある、そんな偶然と面白さを、全ての人に。
            </p>
          </div>
        </div>

        {/* Mission */}
        <div className="space-y-6 text-sm text-gray-600 leading-relaxed">
          <p>
            CinéFileは、国境を越えた学生主導のアート・カルチャープロジェクトです。コペンハーゲン、パリ、ベルリン、東京と場所を移しながら、それぞれの土地の文化や空間と対話し、新しい表現と出会いの場を創出してきました。
          </p>
          <p>
            私たちは、アートや映像、食、パフォーマンスなど、多様な表現を通じて、異なる文化や価値観の「狭間」で生まれる対話を大切にしています。固定された会場を持たないキャラバン形式だからこそ、その場所でしか生まれない一期一会の体験を提供できると信じています。
          </p>
          <p>
            アートは美術館だけにあるのではなく、生活のなかに偶然と面白さとして存在する——それを全ての人と分かち合いたいと考えています。
          </p>
        </div>
      </div>

      {/* Journey */}
      <div className="border-t border-gray-200 pt-12">
        <h2 className="text-xl mb-8 tracking-tight">Our Journey</h2>
        <div className="space-y-4 text-sm">
          <div className="flex gap-6">
            <div className="w-20 flex-shrink-0 text-gray-400">2023</div>
            <div className="text-gray-600">Copenhagen, Denmark — Fællesspisning Night</div>
          </div>
          <div className="flex gap-6">
            <div className="w-20 flex-shrink-0 text-gray-400">2024</div>
            <div className="text-gray-600">
              Paris, France — Trouvaille<br />
              Berlin, Germany — 狭間 -Hazama-
            </div>
          </div>
          <div className="flex gap-6">
            <div className="w-20 flex-shrink-0 text-gray-400">2025</div>
            <div className="text-gray-600">Tokyo, Japan — ぶれる/ふれる Blur/Stir</div>
          </div>
          <div className="flex gap-6">
            <div className="w-20 flex-shrink-0 text-gray-400">2026</div>
            <div className="text-gray-600">Saitama, Japan — Trace/Trash (Upcoming)</div>
          </div>
        </div>
      </div>
    </div>
  );
}
