import { EventCredit, EventSponsor, EventVenue, Organization } from '../../../types/event'; // ※設置場所に合わせてパスを調整してください

// 🌟 スタッフ・役職・参加者クレジット (CREDITS)
export const creditsData: EventCredit[] = [
  { role: 'Director', name: 'Katsuki Koh, Cecil Nabenashi' },
  { role: 'Planning', name: 'Miku Sotomura, Mirika Ishida, Cecil Nabenashi' },
  { role: 'Artists', name: 'Mirika Ishida, Cecil Nabenashi' },
  { role: 'Visual Design', name: 'Yasutaka Sakamoto, Azumi Nishino' },
  { role: 'PR', name: 'Mizuha Oi, Miku Sotomura' },
  { role: 'Finance', name: 'Katsuki Koh, Takateru Suzuki, Masahiro Yoshida' },
  { role: 'Photography', name: 'Mirika Ishida' },
  { role: 'Web Site', name: 'Yuki Kageyama, Miku Sotomura' },
  { role: 'Staff', name: 'Yumeno Takekuni' },
];

// 🌟 スポンサー・協賛企業 (SPONSORS)
export const sponsorsData: EventSponsor[] = [];

// 🌟 会場情報 (VENUE)
export const venueData: EventVenue = {
  name: '空き家',
  url: '',
};

// 🌟 協力団体 (COOPERATION)
export const cooperationData: Organization[] = [
  { name: 'トビタテ！留学JAPAN', url: 'https://tobitate-mext.jasso.go.jp/' },
];