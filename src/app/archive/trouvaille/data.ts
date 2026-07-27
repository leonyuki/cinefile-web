import { EventData, OtherEvent } from '../../../types/event';

export const traceTrashData: EventData = {
  title: "Trouvaille",
  year: 2024,
  status: "Past",
  city: "Paris",
  date: "2024.3.2",
  time: "18:15 - 19:00",
  location: "【パリ国際大学都市日本館】：7 C Av. Rockefeller, 75014 Paris, France",
  mapUrl: "https://maps.app.goo.gl/g4pg6VPBTVLnCyeC7",
  mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2627.0619892468394!2d2.339344177023669!3d48.81887867132689!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e6719f7a2dc43d%3A0xed8dff06de1e131a!2zNyBDIEF2LiBSb2NrZWZlbGxlciwgNzUwMTQgUGFyaXMsIOODleODqeODs-OCuQ!5e0!3m2!1sja!2sjp!4v1784782806308!5m2!1sja!2sjp",
  imageUrl: "/Trouvaille.png",
  statement: `言葉や国境、そして違いを超えて、1つの画面を分かち合う。\nアニメーションが持つそんな可能性を信じて、このイベントを立ち上げました。\nすでにアニメーションを通じて深く結びついているフランスで、\n日仏の学生たちが制作した短編アニメーション作品の上映会をお届けします。`,
  organizer: [{ name: "cinefile", logoUrl: "/logo_cinefile.png" }],

  // 🌟 プログラム / タイムスケジュール
  contents: [
    {
      title: "Programme",
      description: "18:15 開場\n18:30 第1部 開始\n19:10 トークショー\n19:40 第2部 開始\n20:10 トークショー\n20:40 閉場",
    },
  ],

  // 🌟 上映作品一覧（別データとして独立）
  films: [
    {
      title: 'サカナ島胃袋三腸目',
      duration: '17:13',
      director: 'Moe Wakabayashi',
    },
    {
      title: 'Yallah!',
      duration: '7:03',
      director: 'Nayla Nassar, Edouard Pitula, Renaud de Saint Albin, Cécile Adant, Anaïs Sassatelli, Candice Behague',
    },
    {
      title: '鬼とやなり',
      duration: '6:27',
      director: 'Shinobu Soejima',
    },
    {
      title: '#_hashtag underbar',
      duration: '6:00',
      director: 'Akari Maru',
    },
    {
      title: 'Les larmes de la Seine',
      duration: '8:44',
      director: 'Yanis Belaid, Eliott Benard, Nicolas Mayeur, Etienne Moulin, Hadrien Pinot, Lisa Vicente, Philippine Singer, Alice Letailleur',
    },
    {
      title: 'SEWING LOVE',
      duration: '8:33',
      director: 'Xu Yuan',
    },
  ],

  // 🌟 スタッフクレジット
  credits: [
    { role: 'Director', name: 'Miku Sotomura' },
    { role: 'Planning', name: 'Katsuki Koh, Mirika Ishida, Kotori Maeda' },
    { role: 'Poster Design', name: 'Kotori Maeda' },
    { role: 'PR', name: 'Katsuki Koh, Miu Goto, Mikoto Watanabe' },
    { role: 'Finance', name: 'Katsuki Koh, Kanta Higaki' },
    { role: 'Photography', name: 'Mirika Ishida, Shumpei Mizokami, Christophe Arnaud' },
    { role: 'Talk Session MC', name: 'Wakana Kiyoshi, Keita H' },
    { role: 'Staff', name: 'Ami Nagata, Eoli Suzuki, Yui Tanaka, Wakana Kiyoshi, Sachiyo Yamashita, Mifuu' },
  ],
};

export const otherEventsData: OtherEvent[] = [
  { id: "trace-trash", title: "Trace/Trash", year: 2026, image: "/trace-trash.jpg" },
  { id: "blur-stir", title: "Blur/Stir", year: 2024, image: "/blur-stir.png" },
  { id: "hazama", title: "HAZAMA", year: 2023, image: "/hazama.png" },
  { id: "faellesspisning", title: "Fællesspisning", year: 2022, image: "/faellesspisning.png" },
];