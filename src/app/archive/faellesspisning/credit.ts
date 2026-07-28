import { EventCredit, EventSponsor, EventVenue, Organization } from '../../../types/event'; // ※ファイルの設置場所に合わせてパスを調整してください

// 🌟 スタッフ・役職クレジット (CREDITS)
export const creditsData: EventCredit[] = [
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
  { role: 'Film Curation', name: 'Yuki Saito, Miku Sotomura' },
  { role: 'Staff', name: 'Ikuhiro Takase, Aoi Okano, Ryo Takada, Ryosuke Kitazume, Yukihiro Takano' },
];

// 🌟 スポンサー・協賛企業 (SPONSORS)
export const sponsorsData: EventSponsor[] = [
  { name: 'Dansk ICYE (Danish International Cultural Youth Exchange)', url: 'https://icye.dk' },
  { name: 'Dream of Japan', url: 'https://dreamofjapan.com' },
  { name: 'Fangst ApS', url: 'https://fangst.com' },
  { name: 'Mochitimecph ApS', url: 'https://mochitimecph.com' },
  { name: 'Nordic Koji Company', url: 'https://nordickoji.co' },
  { name: 'France-Konjac', url: 'https://france-konjac.fr' },
  { name: 'Seidokan Japan Center', url: 'https://seidokan.dk' },
];

// 🌟 会場情報 (VENUE)
export const venueData: EventVenue = {
  name: 'Kraft Werket',
  url: 'https://kraftwerket.kk.dk/en',
};

// 🌟 協力団体 (COOPERATION)
export const cooperationData: Organization[] = [
  { name: 'トビタテ！留学JAPAN', url: 'https://tobitate-mext.jasso.go.jp/' },
  { name: 'Land Scheme', url: 'https://www.instagram.com/land_scheme_' },
];
