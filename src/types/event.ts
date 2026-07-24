export interface Ticket {
  label: string;
  price: string;
}

export type EventContent = {
  title: string;           // コンテンツ名・プログラム名
  description: string;     // 内容・解説文
  presenters?: string[];   // 発表者の名前のリスト（文字列の配列）
};

export type Organization = {
  name: string;
  logoUrl?: string;
  linkUrl?: string;
};

export interface ArtistMember {
  name: string;
  slug?: string;
  profile?: string;
  imageUrl?: string;
}

export type Collaborator = {
  name: string;
  role?: string;    // 「空間デザイン」などの役割（なくてもOK）
  profile?: string; // プロフィール文章（なくてもOK）
};

export interface Artist {
  members: ArtistMember[];
  role: string;
  isTeamMember: boolean; // data.ts に合わせて追加
  workTitle: string;
  workDescription: string;
  collaborators?: Collaborator[]; // 作品の共同制作情報（任意）
}

export interface AccessRoute {
  route: string;
  detail: string;
}

export interface EventData {
  title: string;
  subtitle?: string; // data.tsで省略されてもOKなように ? をつけています
  year: number;
  status: string;
  city?: string;
  date: string;
  time?: string;
  location: string;
  mapUrl?: string;
  mapEmbedUrl?: string;
  imageUrl: string;
  ticketUrl?: string;
  tickets?: Ticket[];
  statement?: string;
  artists?: Artist[];
  organizer?: Organization[];
  cooperation?: Organization[];
  support?: Organization[];
  access?: AccessRoute[];
  contents?: EventContent[]; // 追加: イベントのコンテンツ情報（任意）
  bgImage?: { url: string; height?: number; width?: number }; // 背景画像用（任意）
}

export interface OtherEvent {
  id: string;
  title: string;
  year: number;
  image: string;
}