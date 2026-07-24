import { EventData, OtherEvent } from '../../../types/event';

export const traceTrashData: EventData = {
  title: "狭間-Hazama-",
  year: 2024,
  status: "Past",
  city: "Tokyo",
  date: "2024.5.24 - 5.26",
  time: "10:00 - 19:00",
  location: "【ベルリン日独センター】：Saargemünder Str. 2, 14195 Berlin-Bezirk Steglitz-Zehlendorf, Germany",
  mapUrl: "https://maps.app.goo.gl/hL1rQktpVgLbgKXU9", // Googleマップの共有リンク
  mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2431.5800676570825!2d13.271640699999999!3d52.4505214!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47a85a1608420be1%3A0x5ce7aee4c5a39507!2z44OZ44Or44Oq44Oz5pel54us44K744Oz44K_44O8!5e0!3m2!1sja!2sjp!4v1784781646927!5m2!1sja!2sjp", // Googleマップの埋め込み用URL (iframe内のsrc)
  imageUrl: "/hazama.png", // public直下の画像パス
  statement: `25組のアーティストが「狭間」をテーマに制作する、総合芸術イベント。\n\n年齢、国籍、言語、文化など、「狭間」とは様々なモチーフを連想させる単語。留学生の私たちは国籍を越え、知らない土地で日々、多様な文化や価値観の違いを感じながら生活している。人それぞれが違う「狭間」にて、それぞれ自分の「狭間」と向き合っているからこそ、その中で感じる葛藤や想いもまた人それぞれである。`,
  contents: [
    {
      title: "セッション",
      description: "",
      presenters: ["Special Panel Discussion", "MUJI Talk Session"]
    },
    {
      title: "映像上映",
      description: "",
      presenters: ["Andreas Hartmann", "UCHU-KAIGI", "Aki Nakazawa", "Rui Yamaguchi", "Peer Langenheim", "Yuka Ichikawa", "Yuki Saito", "Yuria BONKOHARA / Jieson BAEK", "16mm Screening: Ute Aurand & DFFB Students"]
    },
    {
      title: "飲食の提供",
      description: "焼酎やチーズ、お餅など日本の美味しいものを味わいながら、展示の余韻や感想をゆったり語り合える空間を創出。",
      presenters: []
    },
    {
      title: "アート展示",
      description: "",
      presenters: ["Lena Ying", "Yasutaka Sakamoto", "Kihuun Park", "Karma Coma", "Yuri Yamada", "Akira Kawasaki / Jolyon Jones", "KANA", "Nadja Henß", "Shiori Nakano", "Atsushi Onoe", "Ayu Ohinata", "Yujin Han", "Juro Saito", "K•K^3 ( 四畳 )"]
    },
    {
      title: "パフォーマンス",
      description: "",
      presenters: ["Marcodamoremarco & Sara Angela Zen", "Mirika Ishida / Agata Kosek"]
    }
  ],
  organizer: [{ name: "cinefile", logoUrl: "/logo_cinefile.png" }],
  cooperation: [{ name: "", logoUrl: "/organization/fangst.png" },
    { name: "jalogo", logoUrl: "/organization/jalogo.svg" },
    { name: "", logoUrl: "/organization/Logo.jpg" },
    { name: "", logoUrl: "/organization/logo_300dpi_trasparent 2.png" },
    { name: "", logoUrl: "/organization/nonbe3.png" },
    { name: "", logoUrl: "/organization/S__4341783.jpg" },
    { name: "", logoUrl: "/organization/S__4341785.jpg" },
    { name: "", logoUrl: "/organization/S__4341786.jpg" },
    { name: "tobitate", logoUrl: "/organization/tobitate.png" }
  ],
  support: []
};

// 過去のアーカイブ一覧などに使用するデータ
export const otherEventsData: OtherEvent[] = [
  { id: "trace-trash", title: "Trace/Trash", year: 2026, image: "/trace-trash.jpg" },
  { id: "blur-stir", title: "Blur/Stir", year: 2024, image: "/blur-stir.png" },
  // ※前回の修正に合わせて Trouvaille の先頭は大文字にしています
  { id: "trouvaille", title: "Trouvaille", year: 2023, image: "/Trouvaille.png" },
  { id: "faellesspisning", title: "Fællesspisning", year: 2022, image: "/faellesspisning.png" },
];