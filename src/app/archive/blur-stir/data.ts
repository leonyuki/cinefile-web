import { EventData, OtherEvent } from '../../../types/event';

export const traceTrashData: EventData = {
  title: "ぶれる / ふれる",
  year: 2025,
  status: "Past",
  city: "Tokyo",
  date: "2025.4.15 - 4.20",
  time: "10:00 - 20:00",
  location: "【無印良品 板橋南町22店 1階・2階スペース】：東京都板橋区南町22-14",
  mapUrl: "https://maps.app.goo.gl/FMq8BUQrVsy4pze4A", // Googleマップの共有リンク
  mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3238.4966841030164!2d139.7030135!3d35.738595!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x601892a6763f423f%3A0x42354dc821a4f953!2z44CSMTczLTAwMjcg5p2x5Lqs6YO95p2_5qmL5Yy65Y2X55S677yS77yS4oiS77yR77yU!5e0!3m2!1sja!2sjp!4v1784776711894!5m2!1sja!2sjp", // Googleマップの埋め込み用URL (iframe内のsrc)
  imageUrl: "/blur-stir.png", // public直下の画像パス
  statement: `本展示では、異国での留学生活を経験した東京出身の５人のアーティストが、それぞれの視点から、日常に潜む違和感なるものを、写真、映像、インスタレーション、ダンスパフォーマンス、などのインタラクティブな仕掛けを通じて表現する。\n異なる文化圏での生活は、日々少しずつ、我々の「眼」に微細な変化を与えている。東京という住み慣れた街の日常が、いま彼らに一体どんな風に見えているのだろうか。普段の生活の中で「違和」なるものは、生まれては消えていき、見過ごされる。そういう瞬間的な時間を生きている。異質なものが交わることで生まれる新たな視点や創造性を探り、観客に自身の固定観念を問い直す機会を提供する。\n偶発的なアート体験を通じて、違和の中に潜む可能性や美しさを再認識する場を創出する。
`,
  artists: [
    {
      members: [
        { 
          name: "Yuri Yamada", 
          slug: "",
          profile: `東京都生まれ。\n東京藝術大学大学院美術研究科油画専攻博士課程在籍。\n2023-2024年、ミュンスター美術アカデミーに交換留学生として在籍。\nフィールドワークやインタビューを通じて、個人が認識する「社会」のイメージの変容について探求するインスタレーション作品を制作している。また、リサーチャーとして、地域型アートプロジェクトにおけるアーティストと地域住民の関係性の研究を行う。`,
          imageUrl: "/artists/yuri-yamada.jpg"
        }
      ],
      role: "Artist",
      isTeamMember: false,
      workTitle: "Diktat",
      workDescription: `例えばドイツ語のインタビューを着き起こしてみる。誰かと見た風景の写真から絵を描き起こす。\nそうしてできたものは穴とズレだらけで、元々の言葉や風景からは大きくかけ離れてしまっていることが自分でもよくわかる。しかし、どんなに間違っていても、ズレていても、写すことによって、自分の中の何かが確実に変化していく。また、それが修正される過程で、それまで見えていなかったものが見えるようになる。\n香取りの練習を続けていて、気づいたら少しずつ外国語を習得しているように、写しけることで生まれる新しい世界の見え方をこの作品の中に提示したい。`
    },
    {
      members: [
        { 
          name: "Mirika Ishida", 
          slug: "",
          profile: `東京都生まれ。\n多摩美術大学 演劇舞踊デザイン科　卒業\n東京藝術大学 先端芸術表現科 修士課程 在籍中\nオスロ国立美術アカデミー（KHiO）、ロンドン芸術大学（UAL）　留学\nトビタテ留学JAPAN 15期生`,
          imageUrl: "/artists/mirika-ishida.jpg"
        }
      ],
      role: "Artist",
      isTeamMember: false,
      workTitle: "とどまらぬ眼差し",
      workDescription: `2025\n留学中、外で見た風景を写真に収め、肌に当てる行為で身体と視線を交差させた。\n布に定着した写真、仮設的な構造体とのあいだに生まれた"ぶれ"は、視る行為のみにとどまることをその空間に揺らぎ続ける。`,
      collaborators: [
        {
          role: "空間デザイン、施工: K • K ^ 3 (K)",
          name: "河田祐希、近藤卓海",
          profile: "河田祐希\n東京理科大学 建築学科 卒業\n東京科学大学建築学系 修士課程 在籍中\nトビタテ留学JAPAN 15期生\nベルリン工科大学 交換留学（2023-2024）\n建築設計では物のスケールを操作することによって、空間との関係性を構築することを考える。\n\n近藤卓海\n東京工業大学 建築学系 卒業\n東京科学大学 建築学系 修士課程 在籍中\nトビタテ留学JAPAN 15期生\nベルリン工科大学交換留学（2023-2024）\n建築のモノとしての価値とモノが人や周りに与える影響力とその可能性、関係性を探求する。"
        },
        {
          role: "協力",
          name: "株式会社ミマキエンジニアリング"
          // プロフィールがない場合は書かなくてOKです
        }
      ]
    },
    {
      members: [
        { 
          name: "Shogo Okawa", 
          slug: "",
          profile: `2018　多摩美術大学環境デザイン学科　次席　卒業\n2019　トビタテ！留学JAPAN８期生\n　　　ベルリン芸術大学プロダクトデザインコース\n2020　多摩美術大学環境デザイン学科　首席　卒業\n2020　家電メーカー　インハウスデザイナー\n　　　キッチンプロダクト部門\n2024　studio balanceとして京都で活動開始\n2024　ショールームGESTALTを京都にOPEN`,
          imageUrl: "/artists/shogo-okawa.jpeg"
        }
      ],
      role: "Artist",
      isTeamMember: false,
      workTitle: "鎮魂と祝祭の漆 - 春の七行 -",
      workDescription: `身体。血が巡っている。\n呼吸。繰り返している。\n食事。いただいている。\n山々。汗をかいている。\n草花。春を喜んでいる。\n鎮魂。命をありがとう。\n祝祭。今をよろこんで。`
    },
    {
      members: [
        { 
          name: "Yui Tanaka", 
          slug: "",
          profile: `1997年茨城県生まれ。ポルトガル・リスボンに留学後、横浜国立大学大学院Y-GSA卒業。時間の重なりを感じられる都市・建築をめざし、その過程での都市の読み方として、ドローイングや映像表現等を行う。`,
          imageUrl: "/artists/yui-tanaka.jpg"
        }
      ],
      role: "Artist",
      isTeamMember: false,
      workTitle: "水と、都市の時間について",
      workDescription: `リスボンの街に、大雨が降る。滅多に雨の降らないこの街で、水の流れが土地の形を浮かび上がらせる。から海へと降る間に街並みはほとんど変化せず、突然、海にたどり着く。\n単一的な街並みのリスボンに対し、北品川は建物の大きさ・道の大きさ・街の機能が、海へとふる過程で変化がある。歴史を遡れば、異なる時代に生まれた街が、かつての運河や海岸線の強化によって区切られてきたからであった。\n東京の街には、複数の時間が折り重なり、それらが無然に隣り合う面白さがある。`
    },
    {
      members: [
        { 
          name: "Yasutaka Sakamoto", 
          slug: "",
          profile: ``,
          imageUrl: "/artists/yasutaka-sakamoto.jpg"
        }
      ],
      role: "Artist",
      isTeamMember: false,
      workTitle: "ハイパーグローバリゼーションというイメージ",
      workDescription: `地球と人類が誕生し、時間評過と共に「一つの世界」は分裂していく。いやあでも、私達の頃にある「一つの世界」とはなんだっけ。バンゲア大陸的な分裂前の巨大な塊か、掛形図の根源か、自由と平等の理想郷か。私は、枝分かれしつつ、一つの理想を求める世界という何かをポーランドで考えた。ヨーロッパの歴史の渦の中で形、民族、文化が大きく変化してきた国で「せかい”について考えていた留学という時間経過の産物がこれ。`
    }
  ],
  // 主催
  organizer: [
    { name: "CinéFile", logoUrl: "/logo_cinefile.png", linkUrl: "" }
  ],
  
  // 協力（複数登録可能）
  cooperation: [
    { name: "トビタテ", logoUrl: "/organization/tobitate.png"},
    { name: "無印良品板橋南町22"},
    { name: "FANGST", logoUrl: "/organization/fangst.png", linkUrl: ""},
    { name: "梅樹園", logoUrl: "/organization/baijuen.png", linkUrl: ""},
    { name: "okou", logoUrl: "/organization/okou.png", linkUrl: ""}
  ],
  
  // 協賛（複数登録可能）
  support: [
    { name: "KOKOO", logoUrl: "/organization/KOKOO.png", linkUrl: "https://kokoo.co.jp" }
  ],
};

// 過去のアーカイブ一覧などに使用するデータ
export const otherEventsData: OtherEvent[] = [
  { id: "trace-trash", title: "Trace/Trash", year: 2026, image: "/trace-trash.jpg" },
  { id: "hazama", title: "HAZAMA", year: 2023, image: "/hazama.png" },
  { id: "trouvaille", title: "Trouvaille", year: 2023, image: "/Trouvaille.png" },
  { id: "faellesspisning", title: "Fællesspisning", year: 2022, image: "/faellesspisning.png" },
];