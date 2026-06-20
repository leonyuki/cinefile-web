export interface BlogPost {
  id: number;
  title: string;
  date: string;
  author: string;
  category: string;
  excerpt: string;
  content: string;
  image?: string;
  slug: string;
}

// モックデータ - 実際はWordPress REST APIから取得
export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "「狭間」で考える、文化の境界線",
    date: "2024.06.10",
    author: "CinéFile Team",
    category: "Event Report",
    excerpt: "ベルリンで開催された「狭間 -Hazama-」を振り返りながら、異文化間の対話について考察します。",
    content: `ベルリンで開催された「狭間 -Hazama-」を振り返りながら、異文化間の対話について考察します。

「狭間」という言葉は、2つのものの間、境界にある空間を指します。留学生である私たちは、常にこの「狭間」に立っています。

日本とドイツ、東洋と西洋、伝統と革新。様々な「狭間」の中で、私たちは何を感じ、何を表現するのか。このイベントを通じて、多くの対話が生まれました。`,
    image: "https://images.unsplash.com/photo-1569084024058-1632922a4e1d?w=800",
    slug: "thinking-about-hazama-2024"
  },
  {
    id: 2,
    title: "パリでの映像上映を終えて",
    date: "2024.03.15",
    author: "CinéFile Team",
    category: "Event Report",
    excerpt: "パリ国際大学都市日本館で開催された「Trouvaille」での経験を振り返ります。",
    content: `パリ国際大学都市日本館で開催された「Trouvaille」での経験を振り返ります。

フランス語で「掘り出し物」を意味するTrouvaille。まだ見ぬ可能性に溢れる若手アーティストの作品を上映することで、新しい才能を「発見」する場を創出しました。

映像という媒体は、言葉の壁を越えて人々をつなぎます。日本とフランス、異なる文化背景を持つ観客が、一つのスクリーンを共有する時間は特別なものでした。`,
    image: "https://images.unsplash.com/photo-1605429523419-d828acb941d9?w=800",
    slug: "trouvaille-paris-reflection-2024"
  },
  {
    id: 3,
    title: "食を通じた対話 - コペンハーゲンの夜",
    date: "2023.12.20",
    author: "CinéFile Team",
    category: "Event Report",
    excerpt: "Fællesspisning Nightで実現した、食とアートの融合について。",
    content: `Fællesspisning Nightで実現した、食とアートの融合について。

デンマーク語で「食を共有する」を意味するFællesspisning。この言葉には、単に食事を分け合う以上の意味が込められています。

時間を共有し、空間を共有し、そして対話を共有する。食卓を囲むことで生まれる自然な会話の流れの中で、アートや文化について語り合う。そんな温かい雰囲気を創り出すことができました。`,
    image: "https://images.unsplash.com/photo-1565876427310-0695a4ff03b7?w=800",
    slug: "faellesspisning-copenhagen-2023"
  }
];
