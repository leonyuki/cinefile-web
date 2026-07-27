import { EventData, OtherEvent } from '../../../types/event';

export const traceTrashData: EventData = {
  title: "【イベントタイトル】",
  year: 2026,
  status: "Upcoming",
  city: "Tokyo",
  date: "2026.00.00 - 00.00",
  time: "10:00 - 19:00",
  location: "【会場名】：東京都〇〇区〇〇 1-2-3",
  mapUrl: "https://maps.google.com/...", // Googleマップの共有リンク
  mapEmbedUrl: "https://maps.google.com/...", // Googleマップの埋め込み用URL (iframe内のsrc)
  imageUrl: "/faellesspisning.png", // public直下の画像パス
  ticketUrl: "https://example.com/ticket", // チケット販売サイト等がない場合は空文字 "" にします
  tickets: [
    { label: "一般", price: "2,000円" },
    { label: "大学生", price: "1,500円" },
    { label: "高校生以下", price: "無料" },
  ],
  statement: `ここにイベントのステートメント（開催趣旨やコンセプト）を入力します。\n改行を入れる場合はこのように \n を使用します。\n\n空き行を作りたい場合は \n\n と記述することで、パラグラフ（段落）を分けることができます。`,
  artists: [
    {
      members: [
        { name: "アーティスト名 1", slug: "artist-one" }, // 個別ページ等のリンクがある場合
        { name: "アーティスト名 2" } // リンクがなくテキストのみの場合
      ],
      role: "【担当役割 / 例：映像・ディレクション】",
      isTeamMember: false,
      workTitle: "【作品タイトル】",
      workDescription: `ここに作品の解説や、アーティストのプロフィール文を入力します。\n必要に応じて改行（\\n）を挟みながら、作品の意図や背景を記述してください。`
    },
    {
      members: [
        { name: "アーティスト名 3", slug: "artist-three" }
      ],
      role: "【担当役割 / 例：写真×身体表現】",
      isTeamMember: false,
      workTitle: "【作品タイトル】",
      workDescription: `2つ目の作品解説やプロフィールです。\nデータ構造は配列（[ ]）になっているため、参加アーティストが増える場合はこのブロックをそのまま複製して追加できます。`
    }
  ],
  organizer: [],
  cooperation: [],
  support: [
    { name: "【協賛・後援団体名 1】", logoUrl: "" },
    { name: "【協賛・後援団体名 2】", logoUrl: "" }
  ],
  access: [
    { route: "JR〇〇駅", detail: "〇〇口より徒歩〇分" },
    { route: "地下鉄〇〇駅", detail: "〇〇番出口よりバスで〇分 → 下車後徒歩〇分" }
  ],
  
  credits: [
    { role: 'Director', name: 'Katsuki Koh' },
    { role: 'Planning', name: 'Miku Sotomura, Mirika Ishida, Kotori Maeda' },
    { role: 'Artists', name: 'Mirika Ishida, Zenia Ekdal, Moe Miyahara, Izumi Kanesaka' },
    { role: 'Cast', name: 'Minaka Ono, Yoshinori, SAITO' },
    { role: 'Poster Design', name: 'Kotori Maeda' },
    { role: 'PR', name: 'Katsuki Koh, Miu Goto, Mikoto Watanabe' },
    { role: 'Finance', name: 'Katsuki Koh' },
    { role: 'Photography', name: 'Mirika Ishida, George' },
    { role: 'Videography', name: 'Yuki Saito' },
    { role: 'Talk Session MC', name: 'Toshiki Narushima' },
    { role: 'Staff', name: 'Ikuhiro Takase, Aoi Okano, Ryo Takada, Ryosuke Kitazume, Yukihiro Takano' },
  ],

  // 🌟 スポンサー（協賛）データ
  sponsors: [
    { name: 'Dansk ICYE (Danish International Cultural Youth Exchange)', url: 'https://icye.dk' },
    { name: 'Dream of Japan', url: 'https://dreamofjapan.com' },
    { name: 'Fangst ApS', url: 'https://fangst.com' },
    { name: 'Mochitimecph ApS', url: 'https://mochitimecph.com' },
    { name: 'Nordic Koji Company', url: 'https://nordickoji.co' },
    { name: 'France-Konjac', url: 'https://france-konjac.fr' },
    { name: 'Seidokan Japan Center', url: 'https://seidokan.dk' },
  ],

  // 🌟 会場データ
  venue: {
    name: 'Kraft Werket',
    url: 'https://kraftwerket.kk.dk/en',
  },
};

// 過去のアーカイブ一覧などに使用するデータ
export const otherEventsData: OtherEvent[] = [
  { id: "trace-trash", title: "Trace/Trash", year: 2026, image: "/trace-trash.jpg" },
  { id: "blur-stir", title: "Blur/Stir", year: 2024, image: "/blur-stir.png" },
  { id: "hazama", title: "HAZAMA", year: 2023, image: "/hazama.png" },
  // ※前回の修正に合わせて Trouvaille の先頭は大文字にしています
  { id: "trouvaille", title: "Trouvaille", year: 2023, image: "/Trouvaille.png" },
];