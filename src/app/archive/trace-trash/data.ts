import { EventData, OtherEvent } from '../../../types/event';

export const traceTrashData: EventData = {
  title: "Trace - Trash",
  year: 2026,
  status: "Upcoming",
  city: "Saitama",
  date: "2026.9.20 - 9.22",
  time: "10:00 - 19:00",
  location: "空き家：埼玉県さいたま市西区佐知川1287-11",
  mapUrl: "https://maps.app.goo.gl/vQxPHeAmHaUPWRPZ9",
  mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3231.7975988933404!2d139.5805069!3d35.9029725!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6018c38843f1bffd%3A0xabcdbe3c23379701!2z44CSMzMxLTAwNjQg5Z-8546J55yM44GV44GE44Gf44G-5biC6KW_5Yy65L2Q55-l5bed77yR77yS77yY77yX4oiS77yR77yR!5e0!3m2!1sja!2sjp!4v1784164775182!5m2!1sja!2sjp",
  imageUrl: "/trace-trash.jpg", 
  ticketUrl: "",
  tickets: [
    { label: "一般", price: "2,000円" },
    { label: "大学生", price: "1,500円" },
    { label: "高校生以下", price: "無料" },
  ],
  statement: `2026年の我々は、日々、選択に追われている。\n何かを選んでは、何かを捨て、残ったものを人生と呼んでいる。\nでも本当は、残ったものと同じくらい、\n捨てたものにも意味があったのではないだろうか？\n\n機械とは違って、人間は何かを完全に削除できないし、\n何が本当に正解かは、捨てる瞬間にはわからない。\n\n少し立ち止まって「すてる」を見つめ直してみれば、\n空き家というすてられた場所でなら、\n忘れてしまった何かを、拾い直せるのかもしれない。`,
  artists: [
    {
      members: [
        { name: "洪克樹", slug: "katsuki" }, // リンクあり
        { name: "秦雅心", slug: "miyabi" } // リンクなし（テキストのみ）
        ],
      role: "自主製作映画",
      isTeamMember: false,
      workTitle: "無中生有 (love in imagination)",
      workDescription: `監督：洪克樹（京都大学大学院教育学研究科）\n脚本：秦雅心（脚本家、第51回城戸賞佳作受賞）\n\n人は他者のすべてを見ることはできず、心の中で描いた像を愛してしまう。本作は、真実の愛のように思われたヒロとの恋を通して、主人公ズーちゃんが「想像」の美しさと残酷さに触れていく物語である。愛も、心の痛みも、そして人生の意味さえも、無から生まれる想像にすぎない——それでも人は、消えては描き直されるその像を、懲りずに愛そうとする。`
    },
    {
      members: [
        { name: "石田満理佳", slug: "marika" } // リンクあり
      ],
      role: "写真×身体表現",
      isTeamMember: false,
      workTitle: "手放し",
      workDescription: `多摩美術大学演劇デザイン学科卒業。東京藝術大学大学院先端芸術表現専攻修了。留学体験など多様な文化や視点を取り入れ、ダンスを起点に新しい領域での挑戦を継続する。トビタテ留学JAPAN15期奨学生・DANCE BOX 国内留学10期生採択。\n\n空き家の空間で、すてるー手放そうとする行為をテーマに展開するパフォーマンスである。終わりへ向かう行為は写真として空間に残り、蓄積されていく。写真はモノとして扱われ、空間配置や接触を通して変質し、再び身体に影響を及ぼす。静寂な空き家で行為と痕跡が循環する。`
    },
    {
      members: [
        { name: "鍋梨世知" }
      ],
      role: "参加型インスタレーション",
      isTeamMember: false,
      workTitle: "名付け",
      workDescription: `武蔵野美術大学卒業。東京藝術大学大学院デザイン専攻在学。Tokyo Artist Accelerator Program3期生。DESIGNART TOKYO 2025展示。東京インターナショナル・ギフト・ショー春2024展示。GOOD DESIGN NEW HOPE AWARD 2022 入選。\n\n私たちは価値判断によってモノを捨てる。本作はその行為に最小の介入を行う。来場者は持ち物に人名を与え名札を装着する。名付けによりモノは他者性を帯び、愛着がわき、廃棄の判断は揺らぐ。名前を手放す行為として捨てることを再考させ、寿命の延長の可能性を探る。`
    }
  ],
  organizer: [{ name: "空き家プロジェクト", logoUrl: "" }],
  cooperation: [{ name: "CinéFile", logoUrl: "" }],
  support: [
    { name: "ARTS COUNCIL SAITAMA", logoUrl: "/logo_arts.png" },
    { name: "東京藝大「I LOVE YOU」プロジェクト", logoUrl: "" }
  ],
  access: [
    { route: "JR大宮駅 西口", detail: "西武バス乗車 → バス停「市営住宅前（さいたま市）」下車 → 徒歩5分" },
    { route: "JR指扇駅", detail: "西武バス乗車 → バス停「市営住宅前（さいたま市）」下車 → 徒歩5分" }
  ],
};

export const otherEventsData: OtherEvent[] = [
  { id: "blur-stir", title: "Blur-Stir", year: 2024, image: "/blur-stir.png" },
  { id: "hazama", title: "HAZAMA", year: 2023, image: "/hazama.png" },
  { id: "trouvaille", title: "Trouvaille", year: 2023, image: "/Trouvaille.png" },
  { id: "faellesspisning", title: "Fællesspisning", year: 2022, image: "/faellesspisning.png" },
];