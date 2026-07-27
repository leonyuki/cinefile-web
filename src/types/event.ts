// --- チケット情報 ---
export interface Ticket {
  label: string;
  price: string;
}

// --- イベントのコンテンツ・プログラム情報 ---
export interface EventContent {
  title: string;        // コンテンツ名・プログラム名
  description: string;  // 内容・解説文
  presenters?: string[]; // 発表者・出演者（任意）
}

// --- 上映作品（映画）の型定義 ---
export interface Film {
  title?: string;       // 作品タイトル（任意）
  duration?: string;    // 上映時間 (e.g., "17:13")
  director?: string;    // 監督・製作者 (e.g., "Moe Wakabayashi")
  description?: string; // 作品概要（任意）
}

// --- 開催・協力・後援組織情報 ---
export interface Organization {
  name: string;
  logoUrl?: string;
  linkUrl?: string;
  url?: string;         // WebサイトURL
}

// --- アーティストメンバー個人情報 ---
export interface ArtistMember {
  name: string;
  slug?: string;
  profile?: string;
  imageUrl?: string;
}

// --- 共同制作者情報 ---
export interface Collaborator {
  name: string;
  role?: string;    // 役割（任意）
  profile?: string; // プロフィール文章（任意）
}

// --- アーティスト・展示作品情報 ---
export interface Artist {
  members: ArtistMember[];
  role: string;
  isTeamMember?: boolean;
  workTitle?: string;
  workDescription?: string;
  collaborators?: Collaborator[]; // 共同制作情報（任意）
}

// --- アクセス方法 ---
export interface AccessRoute {
  route: string;  // 出発地・路線 (e.g., "JR大宮駅 西口")
  detail: string; // 詳細ルート (e.g., "西武バス乗車 → バス停...")
}

// --- スタッフクレジット ---
export interface EventCredit {
  role: string; // 役職 (e.g., "Director", "PR")
  name: string; // 名前 (e.g., "Miku Sotomura")
}

// --- スポンサー・協賛企業 ---
export interface EventSponsor {
  name: string; // スポンサー名
  url: string;  // リンクURL
}

// --- 会場情報 ---
export interface EventVenue {
  name: string; // 会場名
  url: string;  // 会場リンクURL
}

// --- スペシャルサンクス ---
export interface SpecialThanks {
  name: string;     // 感謝先（人・団体名）
  message?: string; // 感謝メッセージ（任意）
}

// --- メインのイベントデータ構造 ---
export interface EventData {
  title: string;
  subtitle?: string;
  year: number;
  status: string;
  city?: string;
  date: string;
  time?: string;
  location: string;
  mapUrl?: string;
  mapEmbedUrl?: string;
  imageUrl: string; // メインポスター画像
  ticketUrl?: string;
  tickets?: Ticket[];
  statement?: string;
  artists?: Artist[];
  organizer?: Organization[];
  cooperation?: Organization[];
  support?: Organization[];
  access?: AccessRoute[];
  contents?: EventContent[];    // タイムスケジュール・各種プログラム
  films?: Film[];               // 🌟 上映作品一覧
  bgImage?: { url: string; height?: number; width?: number };
  image?: string | { url: string; height?: number; width?: number }; // 文字列・オブジェクト双方に対応
  credits?: EventCredit[];
  sponsors?: EventSponsor[];
  venue?: EventVenue;
  specialThanks?: SpecialThanks[]; // 🌟 スペシャルサンクス
}

// --- 他のイベント（一覧・カード用） ---
export interface OtherEvent {
  id: string;
  title: string;
  year: number;
  image: string;
}