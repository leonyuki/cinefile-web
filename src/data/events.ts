export interface Event {
  id: number;
  title: string;
  subtitle: string;
  year: string;
  status: 'Upcoming' | 'Past';
  date: string;
  location: string;
  city?: string;
  mapUrl: string;
  description: string;
  fullDescription?: string;
  image: string;
  gallery?: string[];
  instagramPosts?: string[];
  venue?: {
    name: string;
    address: string;
    description: string;
    website?: string;
  };
  contents?: Array<{
    title: string;
    description: string;
  }>;
}

export const events: Event[] = [
  {
    id: 1,
    title: "Trace/Trash",
    subtitle: "空き家プロジェクト",
    year: "2026",
    status: "Upcoming",
    date: "Coming Soon",
    location: "埼玉県",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=埼玉県",
    description: "2026年の我々は、日々、選択に追われている。何かを選んでは、何かを捨て、残ったものを人生と呼んでいる。でも本当は、残ったものと同じくらい、捨てたものにも意味があったのではないだろうか？",
    fullDescription: `2026年の我々は、日々、選択に追われている。何かを選んでは、何かを捨て、残ったものを人生と呼んでいる。でも本当は、残ったものと同じくらい、捨てたものにも意味があったのではないだろうか？

機械とは違って、人間は何かを完全に削除できないし、何が本当に正解かは、捨てる瞬間にはわからない。

少し立ち止まって「すてる」を見つめ直してみれば、空き家というすてられた場所でなら、忘れてしまった何かを、拾い直せるのかもしれない。`,
    venue: {
      name: "埼玉県内の空き家（詳細は後日発表）",
      address: "埼玉県",
      description: "かつて人々の生活があった場所、そして今は誰もいない空間。そこに残された痕跡と、捨てられたものたちが語る物語。このプロジェクトでは、空き家という特別な場所を舞台に、「選ぶこと」と「捨てること」について問いかける。"
    },
    contents: [
      {
        title: "Site-Specific Installation",
        description: "空き家という場所性を活かしたインスタレーション作品を展示。残された家具や痕跡と対話しながら、新たな意味を見出すアート体験を提供。"
      },
      {
        title: "Workshop & Dialogue",
        description: "参加者それぞれが「捨てたもの」「残したもの」について語り合うワークショップ。人生における選択の意味を、アートを通じて再考する。"
      },
      {
        title: "Documentation Project",
        description: "空き家に残された記憶や物語を記録し、アーカイブ化するプロジェクト。失われゆくものに新しい価値を見出す試み。"
      }
    ],
    image: "https://images.unsplash.com/photo-1518998053901-5348d3961a04?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnQlMjBleGhpYml0aW9uJTIwZ2FsbGVyeSUyMG1pbmltYWx8ZW58MXx8fHwxNzc5ODcwMDQ0fDA&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    id: 2,
    title: "ぶれる/ふれる",
    subtitle: "Blur/Stir",
    year: "2025",
    status: "Past",
    date: "2025.04.14 - 04.20",
    location: "無印良品板橋南町22店, Tokyo",
    city: "Tokyo",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=無印良品+板橋南町22店+東京",
    description: "留学生活は、日々少しずつ、我々の「眼」に微細な変化を与えている。東京という住み慣れた街の日常が、いま彼らに一体どのように見えるのだろうか。",
    fullDescription: `「暮らし」と密接につながる場、無印良品に、5組のアーティストを迎えたイベント。

留学生活は、日々少しずつ、我々の「眼」に微細な変化を与えている。東京という住み慣れた街の日常が、いま彼らに一体どのように見えるのだろうか。

留学経験のある5組のアーティストの作品を展示し、ワークショップやトークセッションで対話の場を設けることで、無印良品店舗に訪れた方に、いつもと少し違う「ぶれる」や新たな景色に「ふれる」場を創出した。`,
    venue: {
      name: "無印良品板橋南町22店",
      address: "東京都板橋区泉町22-11",
      description: "暮らしの基本を大切にする無印良品の店舗。地域に根ざしたコミュニティスペースとしても機能し、定期的に文化イベントやワークショップを開催している。"
    },
    contents: [
      {
        title: "Art Exhibition",
        description: "留学経験を持つ5組のアーティストによる作品展示。海外での生活を経て変化した「眼」で捉えた東京の日常を、様々な表現手法で提示。写真、絵画、インスタレーションなど多様なメディアを通じて、見慣れた風景に新しい発見を促す。"
      },
      {
        title: "Workshop & Talk Session",
        description: "アーティストと来場者が直接対話できるトークセッションとワークショップを開催。留学での経験や、異文化との出会いがどのように創作活動に影響を与えたかについて語り合い、参加者それぞれの「ぶれる」体験を共有した。"
      },
      {
        title: "Life & Art Connection",
        description: "無印良品の「くらし」という概念とアートを結びつけ、日常生活の中にアートが自然に存在することの意味を探求。来店者が買い物の途中で立ち寄れる開かれた空間で、アートとの偶然の出会いを演出した。"
      }
    ],
    image: "/image.png",
    instagramPosts: [
      "https://www.instagram.com/p/DI8d6QVxIdB/",
      "https://www.instagram.com/p/DI8uZv9v-Wv/",
      "https://www.instagram.com/p/DI-ymGhxkqX/",
      "https://www.instagram.com/p/DI_WlztP6-r/",
      "https://www.instagram.com/p/DJAcxzjB3w5/",
      "https://www.instagram.com/p/DJdGv1TzJ_6/",
      "https://www.instagram.com/p/DJx4VudvpGr/",
      "https://www.instagram.com/p/DKB5M-vxpET/",
      "https://www.instagram.com/p/DKVqERyza9V/"
    ]
  },
  {
    id: 3,
    title: "狭間",
    subtitle: "Hazama",
    year: "2024",
    status: "Past",
    date: "2024.05.23 - 05.25",
    location: "Japanisch-Deutsches Zentrum, Berlin",
    city: "Berlin",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Saargemünder+Str.+2+14195+Berlin+Deutschland",
    description: "25組のアーティストが「狭間」をテーマに制作する、総合芸術イベント。年齢、国籍、言語、文化など、様々なモチーフを連想させる単語。",
    fullDescription: `"Hazama" embodies the essence of the "in-between," a liminal space where similarities and differences intertwines.

In the vibrant heart of Berlin, artists and audiences converge, gradually interweaving and influencing one another across the boundaries, such as country, language, culture, and generations. This philosophical concept of hazama breathes life into ambiguity, inviting each individual to confront their own "hazama".

In this exhibition, 25 groups of artists explore their creativity through an array of diverse mediums: films, photography, 16mm screenings, paintings, dance performances, and installation art.

3日間の開催では250名以上が来場し、日本からトビタテ！留学Japan事務局や、現地の日本大使館関係者も訪れた。`,
    venue: {
      name: "Japanisch-Deutsches Zentrum Berlin（ベルリン日独センター）",
      address: "Saargemünder Str. 2, 14195 Berlin, Deutschland",
      description: "経済、科学、学術、文化、社会、政治の各分野における日独間および国際的な交流を支援し深めることを課題とする公益財団であり、1985年以来、日本およびドイツの政治経済発展に貢献してきた。ベルリン日独センターは、日独交流・日独関係の形成に関わることを望むすべての方々の出会いの場であり、そのために、様々な協力機関の事業や活動との相乗効果を活かすよう努めている。",
      website: "https://jdzb.de/ja"
    },
    contents: [
      {
        title: "Special Panel Discussion",
        description: "ヨーロッパで精力的に活躍する4名の日本人アーティストを「狭間」に招聘し、海外、特にドイツやベルリンでの活動を選んだ理由や日本とヨーロッパの環境面での違い、社会とアートの関わり、アーティストたちに向けた未来へのメッセージなど、幅広く自由な対話が行われた。"
      },
      {
        title: "MUJI Session",
        description: "日本人なら誰もが知る国民的ブランド「無印良品」。企業理念や事業内容から、最近のグローバル展開の軌跡までが紹介された。現在は32の国・地域で、全1000店舗以上を展開しており、シンプルなデザインで使いやすい日用品をはじめ、人々のくらしに寄り添う商品開発は愛され続けている。さらに近年はアート関連の事業も力を入れており、「生活の探求、趣味の冒険」をコンセプトにしたIDÉE（イデー）やアーティストとコラボして各店舗のスペースを活用した展示など、今後も目が離せない。"
      },
      {
        title: "Film Screening",
        description: "自主制作作品の魅力とはなんだろうか。脚本、撮影、編集といった主要な工程を全て監督個人で行う場合もあり、様々な制約の中で工夫を凝らした制作者のこだわりに溢れ、商業映画とはまた違った意味で斬新さがある。今回のイベントでは、国内外の監督の全9作品を3日間にわたって上映した。ジャンルやテーマも幅広く、映画だけでなく、映像パフォーマンス作品も含まれており、巨大スクリーンの迫力満点の映像の前には、常に人々の視線が集まっていた。"
      },
      {
        title: "Food & Beverage",
        description: "ベルリン日独センターの入り口付近、キッチンが併設された広いラウンジスペースには、ヨーロッパ各地から集まった個性豊かな飲食ブースが設置された。カレーやおにぎり、糠漬けといった日本の逸品から、ヨーロッパのチーズや缶詰、チョコレートといった惣菜まで、様々な商品が並べられていた。ラウンジスペースは日本酒、ワインをつまみに、作品の感想を話す対話の場として盛り上がりを見せ、そのあたたかい雰囲気はシネフィルが目指す場づくりの形そのものだった。"
      }
    ],
    image: "/image-3.png",
    gallery: ["/image-5.png"],
    instagramPosts: [
      "https://www.instagram.com/p/C8WGAYLvOR7/",
      "https://www.instagram.com/p/C8Y0tbSvm9E/",
      "https://www.instagram.com/p/C8dtBtiJsuM/",
      "https://www.instagram.com/p/C8f_tobvnkn/",
      "https://www.instagram.com/p/C8tJUdVvQf4/",
      "https://www.instagram.com/p/C8v2j9RPA7E/",
      "https://www.instagram.com/p/C8yYf7pP09p/",
      "https://www.instagram.com/p/C88xeEvPEW0/",
      "https://www.instagram.com/p/C8_XcZ1PAXS/",
      "https://www.instagram.com/p/C9MCuQ0Pj8x/",
      "https://www.instagram.com/p/C9RN7_8PvV5/",
      "https://www.instagram.com/p/C9eKDvNvwO2/",
      "https://www.instagram.com/p/C9grLIYvfiZ/",
      "https://www.instagram.com/p/C9pHAH3PQAj/",
      "https://www.instagram.com/p/C9_eHzPvYVN/"
    ]
  },
  {
    id: 4,
    title: "Trouvaille",
    subtitle: "",
    year: "2024",
    status: "Past",
    date: "2024.03.02",
    location: "Maison du Japon, Paris",
    city: "Paris",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Cité+Internationale+Universitaire+de+Paris+Maison+du+Japon",
    description: "フランス語で「掘り出し物」という意味の、映像展示イベント。日仏の若手アーティストの自主制作・短編アニメーション6作品を上映。",
    fullDescription: `フランス語で「掘り出し物」という意味の、映像展示イベント。

まだ見ぬ可能性に溢れる日仏の若手アーティストの自主制作・短編アニメーション6作品を上映。様々な人が1枚のスクリーンに目を向け、語り合うトークセッションを通じて、互いの文化や価値観の違いを感じ、それを乗り越えていくことを目指した。`,
    venue: {
      name: "パリ国際大学都市日本館",
      address: "Maison du Japon, 7c Boulevard Jourdan, 75014 Paris, France",
      description: "パリ国際大学都市は、世界各国の学生が集まる国際的な学生寮の複合施設。日本館は日本文化の発信拠点として、様々な文化交流イベントを開催している。"
    },
    contents: [
      {
        title: "Film Screening & Animation",
        description: "日仏の若手アーティストによる自主制作・短編アニメーション6作品を上映。様々な表現技法と独創的なストーリーテリングで、観客を魅了した。上映後のトークセッションでは、制作背景や技法について活発な議論が交わされ、文化を超えた創作の対話が生まれた。"
      },
      {
        title: "Cultural Exchange",
        description: "映像を通じて、日本とフランスの若手クリエイターが互いの文化や価値観を共有。言葉の壁を越えて、アートが持つ普遍的なコミュニケーション力を実感する場となった。"
      }
    ],
    image: "/image-2.png",
    gallery: ["/image-7.png"],
    instagramPosts: [
      "https://www.instagram.com/p/C3kfB-aKtw4/",
      "https://www.instagram.com/p/C3nbrZHyHQx/",
      "https://www.instagram.com/p/C3poeSzK1mv/",
      "https://www.instagram.com/p/C3sAMWdqaLM/",
      "https://www.instagram.com/p/C3uk_iXqgSA/",
      "https://www.instagram.com/p/C3xJw6SqzYg/",
      "https://www.instagram.com/p/C4YNN9DSYoM/",
      "https://www.instagram.com/p/C4ax8HPSYrn/",
      "https://www.instagram.com/p/C4dW0zOSIbT/"
    ]
  },
  {
    id: 5,
    title: "Fællesspisning Night",
    subtitle: "",
    year: "2023",
    status: "Past",
    date: "2023.12.10",
    location: "KraftWerket, Copenhagen",
    city: "Copenhagen",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=KraftWerket+Copenhagen+Denmark",
    description: "「食」を通じた、アート・文化交流イベント。映画、食事、アート展示、ダンスパフォーマンス、茶道、トークセッション等を実施。",
    fullDescription: `「食」を通じた、アート・文化交流イベント。

デンマーク語で「食に関わる時間や空間を共有する」という意味の「Faellespissning」をテーマに、映画、食事、アート展示、ダンスパフォーマンス、茶道、生け野菜、トークセッション等を実施。

様々な角度からデンマークと日本の文化の違いに踏み込み、深い対話を目指した。`,
    venue: {
      name: "Youth Center KraftWerket",
      address: "KraftWerket, Copenhagen, Denmark",
      description: "コペンハーゲンの若者文化の中心地として、様々なアートイベントやワークショップを開催している施設。多文化共生と創造的な対話を促進する場として知られている。"
    },
    contents: [
      {
        title: "Food & Dining Experience",
        description: "「Fællesspisning（食を共有する）」をテーマに、日本とデンマークの食文化を融合させた特別メニューを提供。おにぎり、茶道、生け野菜など日本の伝統的な食文化と、北欧の食材や調理法を組み合わせた創作料理で、参加者同士の対話を促進した。"
      },
      {
        title: "Film & Art Exhibition",
        description: "映画上映とアート展示を通じて、視覚的な文化交流を実現。日本とデンマークの若手アーティストの作品を展示し、それぞれの文化的背景や表現手法について語り合う場を設けた。"
      },
      {
        title: "Performance & Workshop",
        description: "ダンスパフォーマンス、茶道の実演など、身体表現を通じた文化体験プログラムを実施。参加型のワークショップで、異文化理解を深める機会を提供した。"
      }
    ],
    image: "/image-1.png",
    gallery: ["/image-6.png"],
    instagramPosts: [
      "https://www.instagram.com/p/C01BzoGKOkR/",
      "https://www.instagram.com/p/C09VfMeqMiH/",
      "https://www.instagram.com/p/C1AFpP6qtLu/",
      "https://www.instagram.com/p/C1CIR9YqT4d/",
      "https://www.instagram.com/p/C1E0Y9JKRKU/",
      "https://www.instagram.com/p/C1IM42DoQr1/",
      "https://www.instagram.com/p/C1KV25dqC7y/",
      "https://www.instagram.com/p/C1hioOqKuWk/"
    ]
  }
];
