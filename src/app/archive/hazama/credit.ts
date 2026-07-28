import { EventCredit, EventSponsor, EventVenue, Organization } from '../../../types/event'; // ※設置場所に合わせてパスを調整してください

// 🌟 スタッフ・役職・参加者クレジット (CREDITS)
export const creditsData: EventCredit[] = [
  { role: 'Director', name: 'Yuki Saito' },
  { role: 'Planning', name: 'Katsuki Koh, Miku Sotomura, Mirika Ishida, Kotori Maeda' },
  {
    role: 'Films',
    name: 'Aki Nakazawa, Andreas Hartmann, Peer Langenheim, UCHU-KAIGI (Kei Hiraguri, Amon Sugiura), Yuria BONKOHARA & Jiseon BAEK, Yuki Saito, Ute Aurand, DFFB(Antonia Walther, Thea Steimer Thorson, Lukas Kleimt, Zora Rux, Akira Kawasaki)',
  },
  {
    role: 'Artists',
    name: 'Mirika Ishida & Agata Kosek, Yuri Yamada, Yasutaka Sakamoto, Juro Saito, Lena Ying Hohmann, Atsushi Onoe, Kihuun Park, Kana Endo, Shiori Nakano, Karma Coma (Milo Vidal), Ayu Ohinata, Nadja Henß, Marco D\'Amore, Rui Yamaguchi, Akira Kawasaki&Jolyon Jones, Yujin Han, Kana Endo, Yuka Ichikawa, K•K^3 (K) (Kotori Maeda, Takumi Kondou, Yuki Kawata)',
  },
  { role: 'Talk Session MC', name: 'Katsuki Koh, Kotori Maeda, Takumi Kondo' },
  { role: 'Talk Session Cast', name: 'Ryoji Homma, Shiori Nakano, Atsushi Onoe, Ryohei Nomura' },
  { role: 'Talk Session Tobitate Guests', name: 'Satoru Araune, Yuji Nakatani, Tomoo Nakayama' },
  { role: 'Poster Design', name: 'Yasutaka Sakamoto' },
  { role: 'PR', name: 'Mizuha Oi, Yu Oyamada, Miu Goto, Mikoto Watanabe, Ayaka Ueno, Erika Fujita' },
  {
    role: 'Finance & Crowdfunding',
    name: 'Katsuki Koh, Kotori Maeda, Miku Sotomura, Yu Oyamada, Kanta Higaki, Mikoto Watanabe, Mizuha Oi, Kimiko Amano, Haruki Sakima',
  },
  { role: 'Photography', name: 'Mirika Ishida, George, Takumi Kondo, Yuki Kawata, Mizuha Oi' },
  { role: 'Videography', name: 'Josias, Erika Fujita' },
  { role: 'Food & Beverages', name: 'Yoko Yamasaki, Reina HIrabayashi, Rona Brown, Yukihiro Takano, Mikoto Watanabe, Kanta Higaki' },
  {
    role: 'Staff',
    name: 'Ikuhiro Takase, Aoi Okano, Nonoka Shiga, Mizuki Morishita, Aiki Mori, Kaho Higuchi, Wakana Kiyoshi, Maki Katayama, Hinata Kasaki, Kai Murayama, Kengo Ando, Kimiko Amano, Haruki Sakima, Sumire Watanabe, Tomoya Suzuki, Toshiki Narushima, Yui Tanaka, Ami Nagata, Ayu Shimizu, Urara, Kei Miwa, Midori Tawada, Ririko, Mifuu',
  },
];

// 🌟 スポンサー・協賛企業 (SPONSORS)
export const sponsorsData: EventSponsor[] = [
  { name: 'MUJI Deutschland GmbH', url: 'https://germany.muji.eu' },
  { name: 'Fangst ApS', url: 'https://fangst.com' },
  { name: 'Mellow ApS', url: 'https://mellowchocolate.com' },
  { name: 'Nonbe Daigaku', url: 'https://nonbe-daigaku.de' },
  { name: 'hanabira (Hanabira Berlin)', url: 'https://hanabira.de' },
  { name: '株式会社Casie', url: 'https://casie.jp' },
  { name: 'MANUFACTURE', url: '' },
  { name: '薩摩酒造株式会社', url: 'https://satsuma.co.jp' },
  { name: '株式会社ASIA to JAPAN', url: 'https://asiatojapan.com' },
];

// 🌟 会場情報 (VENUE)
export const venueData: EventVenue = {
  name: 'ベルリン日独センター',
  url: 'https://jdzb.de/ja',
};

// 🌟 協力団体 (COOPERATION)
export const cooperationData: Organization[] = [
  { name: 'トビタテ！留学JAPAN', url: 'https://tobitate-mext.jasso.go.jp/' },
  { name: 'Land Scheme', url: 'https://www.instagram.com/land_scheme_' },
];

// 🌟 スペシャルサンクス (SPECIAL THANKS)
export const specialThanksData = {
  title: 'ベルリン日独センター職員のみなさま / Dear Japanese-German Center Berlin (JDZB)',
  message:
    '会場提供や設営をはじめ、全面的なご支援を賜りましたことに感謝申し上げます。\nWe would like to express our sincere gratitude for your full support, including providing the venue and assisting with setup.',
};