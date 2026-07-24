import { EventData, OtherEvent } from '../../../types/event';

export const traceTrashData: EventData = {
  title: "Trouvaille",
  year: 2024,
  status: "Past",
  city: "Paris",
  date: "2024.3.2",
  time: "18:15 - 19:00",
  location: "【パリ国際大学都市日本館】：7 C Av. Rockefeller, 75014 Paris, France",
  mapUrl: "https://maps.app.goo.gl/g4pg6VPBTVLnCyeC7", // Googleマップの共有リンク
  mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2627.0619892468394!2d2.339344177023669!3d48.81887867132689!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e6719f7a2dc43d%3A0xed8dff06de1e131a!2zNyBDIEF2LiBSb2NrZWZlbGxlciwgNzUwMTQgUGFyaXMsIOODleODqeODs-OCuQ!5e0!3m2!1sja!2sjp!4v1784782806308!5m2!1sja!2sjp", // Googleマップの埋め込み用URL (iframe内のsrc)
  imageUrl: "/Trouvaille.png", // public直下の画像パス
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
  organizer: [{ name: "【協賛・後援団体名 1】", logoUrl: "" }],
  cooperation: [{ name: "【協賛・後援団体名 1】", logoUrl: "" }],
  support: [
    { name: "【協賛・後援団体名 1】", logoUrl: "" },
    { name: "【協賛・後援団体名 2】", logoUrl: "" }
  ],
};

// 過去のアーカイブ一覧などに使用するデータ
export const otherEventsData: OtherEvent[] = [
  { id: "trace-trash", title: "Trace/Trash", year: 2026, image: "/trace-trash.jpg" },
  { id: "blur-stir", title: "Blur/Stir", year: 2024, image: "/blur-stir.png" },
  { id: "hazama", title: "HAZAMA", year: 2023, image: "/hazama.png" },
  { id: "faellesspisning", title: "Fællesspisning", year: 2022, image: "/faellesspisning.png" },
];