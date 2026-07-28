import { EventCredit, EventSponsor, EventVenue, Organization } from '../../../types/event'; // ※設置場所に合わせてパスを調整してください

// 🌟 スタッフ・役職・参加者クレジット (CREDITS)
export const creditsData: EventCredit[] = [
  { role: 'Director', name: 'Katsuki Koh' },
  { role: 'Planning', name: 'Miku Sotomura, Mirika Ishida, Yuri Yamada' },
  { role: 'Curation', name: 'Yuri Yamada' },
  { role: 'Artists', name: 'Mirika Ishida, Yuri Yamada, Yasutaka Sakamoto, Shogo Okawa, Yui Tanaka' },
  { role: 'Setup', name: 'Takumi Kondo, Yuki Kawata' },
  { role: 'Visual Design', name: 'Hinata Mori, Yuri Yamada' },
  { role: 'PR', name: 'Mizuha Oi' },
  { role: 'Finance', name: 'Katsuki Koh, Miku Sotomura' },
  { role: 'Talk Session MC', name: 'Shun Takashima, Hinata Kasaki' },
  { role: 'Talk Session Starring', name: 'Shuzo Kumagai, Satoru Araune, Yasutaka Sakamoto, Katsuki Koh' },
  { role: 'Photography', name: 'Mirika Ishida, Shun Takashima, Erika Fujita' },
  { role: 'Food & Beverages', name: 'Katsuki Koh, Rona Brown, Miku Sotomura' },
  { role: 'Workshop', name: 'Reina Wakabayashi, Aya Aoyama, Markus' },
  { role: 'Web Site', name: 'Yuki Kageyama, Yuri Yamada' },
  { role: 'Staff', name: 'Izumi Kanesaka, Tomoki Koh, Haruki Sakima, Ryutaro Hayashi' },
];

// 🌟 スポンサー・協賛企業 (SPONSORS)
export const sponsorsData: EventSponsor[] = [
  { name: 'Fangst ApS', url: 'https://fangst.com' },
  { name: '梅樹園', url: 'https://www.baijuen.co.jp/' },
  { name: 'KOKOO', url: 'https://kokoo.co.jp/' },
];

// 🌟 会場情報 (VENUE)
export const venueData: EventVenue = {
  name: '無印良品 板橋南町22店',
  url: '', // 必要に応じて公式URLを追加してください
};

// 🌟 協力団体 (COOPERATION)
export const cooperationData: Organization[] = [
  { name: 'トビタテ！留学JAPAN', url: 'https://tobitate-mext.jasso.go.jp/' },
];

// 🌟 スペシャルサンクス (SPECIAL THANKS)
export const specialThanksData = {
  title: '無印良品 板橋南町22店 職員のみなさま / Dear MUJI Itabashi Minamicho 22',
  message:
    '会場提供や設営をはじめ、全面的なご支援を賜りましたことに感謝申し上げます。\nWe would like to express our sincere gratitude for your full support, including providing the venue and assisting with setup.',
};