import { EventCredit, Film, Organization, EventVenue } from '../../../types/event'; // ※配置場所に合せてパスを調整してください

// 🌟 スタッフ・役職クレジット (CREDITS)
export const creditsData: EventCredit[] = [
  { role: 'Director', name: 'Miku Sotomura' },
  { role: 'Planning', name: 'Katsuki Koh, Mirika Ishida, Kotori Maeda' },
  { role: 'Poster Design', name: 'Kotori Maeda' },
  { role: 'PR', name: 'Katsuki Koh, Miu Goto, Mikoto Watanabe' },
  { role: 'Finance', name: 'Katsuki Koh, Kanta Higaki' },
  { role: 'Photography', name: 'Mirika Ishida, Shumpei Mizokami, Christophe Arnaud' },
  { role: 'Talk Session MC', name: 'Wakana Kiyoshi, Keita Higashida' },
  { role: 'Staff', name: 'Ami Nagata, Eoli Suzuki, Yui Tanaka, Sachiyo Yamashita, Mifuu, Minami Fujioka, Ryoto Nagai' },
];

// 🌟 上映作品 (FILMS)
export const filmsData: Film[] = [
  {
    title: 'サカナ島胃袋三腸目',
    duration: '17:13',
    director: 'Moe Wakabayashi',
  },
  {
    title: 'Yallah!',
    duration: '7:03',
    director: 'Nayla Nassar, Edouard Pitula, Renaud de Saint Albin, Cécile Adant, Anaïs Sassatelli, Candice Behague',
  },
  {
    title: '鬼とやなり',
    duration: '6:27',
    director: 'Shinobu Soejima',
  },
  {
    title: '#_hashtag underbar',
    duration: '6:00',
    director: 'Akari Maru',
  },
  {
    title: 'Les larmes de la Seine',
    duration: '8:44',
    director: 'Yanis Belaid, Eliott Benard, Nicolas Mayeur, Etienne Moulin, Hadrien Pinot, Lisa Vicente, Philippine Singer, Alice Letailleur',
  },
  {
    title: 'SEWING LOVE',
    duration: '8:33',
    director: 'Xu Yuan',
  },
];

// 🌟 協力団体 (COOPERATION)
export const cooperationData: Organization[] = [
  { name: 'トビタテ！留学JAPAN', url: 'https://tobitate-mext.jasso.go.jp/' },
  { name: 'Land Scheme', url: 'https://www.instagram.com/land_scheme_' },
];

// 🌟 会場情報 (VENUE: 空欄のためコメントアウト)
// export const venueData: EventVenue = {
//   name: '',
//   url: '',
// };