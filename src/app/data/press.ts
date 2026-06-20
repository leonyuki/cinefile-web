export interface PressRelease {
  id: number;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  pdfUrl?: string;
  slug: string;
}

// モックデータ - 実際はWordPress REST APIから取得
export const pressReleases: PressRelease[] = [
  {
    id: 1,
    title: "CinéFile、埼玉県での新プロジェクト「Trace/Trash」を発表",
    date: "2026.05.15",
    excerpt: "学生主導のアート・カルチャープロジェクト「CinéFile」は、2026年に埼玉県で空き家を活用した新プロジェクト「Trace/Trash」を開催することを発表しました。",
    content: `学生主導のアート・カルチャープロジェクト「CinéFile」は、2026年に埼玉県で空き家を活用した新プロジェクト「Trace/Trash」を開催することを発表しました。

このプロジェクトは、「選ぶこと」と「捨てること」をテーマに、空き家という特別な場所を舞台にした実験的なアートイベントとなります。

CinéFileは2023年のコペンハーゲンでの開催以来、パリ、ベルリン、東京と国際的に活動を展開してきました。今回の埼玉でのプロジェクトは、日本国内での2回目の開催となります。`,
    slug: "trace-trash-announcement-2026"
  },
  {
    id: 2,
    title: "「狭間 -Hazama-」ベルリンで開催、250名以上が来場",
    date: "2024.05.26",
    excerpt: "2024年5月23日から25日まで、ベルリン日独センターにて開催された「狭間 -Hazama-」に3日間で250名以上が来場しました。",
    content: `2024年5月23日から25日まで、ベルリン日独センターにて開催された「狭間 -Hazama-」に3日間で250名以上が来場しました。

25組のアーティストが「狭間」をテーマに、映画、写真、16mmスクリーニング、絵画、ダンスパフォーマンス、インスタレーションアートなど多様なメディアで作品を発表。日本からトビタテ！留学Japan事務局や、現地の日本大使館関係者も訪れました。`,
    slug: "hazama-berlin-report-2024"
  }
];
