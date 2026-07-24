export interface NewsItem {
  id: number;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  content: string;
  image?: string;
  slug: string;
}

// モックデータ - 実際はWordPress REST APIから取得
export const newsItems: NewsItem[] = [
  {
    id: 1,
    title: "Trace/Trash 埼玉での開催が決定",
    date: "2026.05.15",
    category: "Event",
    excerpt: "2026年の新プロジェクト「Trace/Trash」の開催地が埼玉県に決定しました。空き家を舞台にした実験的なアートイベントとなります。",
    content: "2026年の新プロジェクト「Trace/Trash」の開催地が埼玉県に決定しました。空き家を舞台にした実験的なアートイベントとなります。詳細は後日発表いたします。",
    slug: "trace-trash-saitama-2026"
  },
  {
    id: 2,
    title: "ぶれる/ふれる 無印良品にて7日間の展示を終了",
    date: "2025.04.21",
    category: "Event",
    excerpt: "東京・板橋の無印良品にて開催されていた「ぶれる/ふれる Blur/Stir」が7日間の展示期間を終了しました。",
    content: "東京・板橋の無印良品にて開催されていた「ぶれる/ふれる Blur/Stir」が7日間の展示期間を終了しました。多くの方にご来場いただき、ありがとうございました。",
    slug: "blur-stir-completed-2025"
  },
  {
    id: 3,
    title: "狭間 -Hazama- ベルリンで250名以上が来場",
    date: "2024.05.26",
    category: "Event",
    excerpt: "ベルリン日独センターで開催された「狭間 -Hazama-」に3日間で250名以上が来場。日本大使館関係者も訪問されました。",
    content: "ベルリン日独センターで開催された「狭間 -Hazama-」に3日間で250名以上が来場。日本大使館関係者も訪問されました。",
    slug: "hazama-berlin-success-2024"
  }
];
