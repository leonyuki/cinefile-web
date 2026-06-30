import Link from 'next/link';
import { client } from '../libs/microcms'; // フォルダ名に合わせて必要に応じて '@/libs/microcms' に変更してください
import HeroSlideshow from '../components/HeroSlideshow'; 

// microCMSの型定義
type MicroCMSImage = {
  url: string;
  width: number;
  height: number;
};

type NewsItem = {
  id: string;
  title: string;
  category?: string;
  excerpt?: string;
  publishedAt: string;
  eventDate?: string;
};

type BlogItem = {
  id: string;
  title: string;
  category?: string;
  excerpt?: string;
  image?: MicroCMSImage;
  publishedAt: string;
  eventDate?: string;
};

// イベント用の型定義
export type EventItem = {
  id: string;
  title: string;
  year: number;
  image: MicroCMSImage;
  status: string[];
};

// 日付フォーマット関数
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}.${month}.${day}`;
};

export default async function HomePage() {
  // トップページ用に、ニュース・ブログ・イベントを並列で取得
  const [newsData, blogData, eventsData] = await Promise.all([
    client.getList<NewsItem>({
      endpoint: 'news',
      queries: { limit: 3 },
    }),
    client.getList<BlogItem>({
      endpoint: 'blog',
      queries: { limit: 3 },
    }),
    // イベントデータを最新4件取得（スライドショーおよび4カラムレイアウトのため）
    client.getList<EventItem>({
      endpoint: 'events',
      queries: { limit: 4 },
    }),
  ]);

  return (
    <div>
      {/* Hero */}
      <section className="relative">
        {/* microCMSから取得したイベントデータをスライドショーコンポーネントに渡す */}
        <HeroSlideshow events={eventsData.contents} />
      </section>

      {/* About us */}
      <section className="max-w-7xl mx-auto px-6 sm:px-12 py-16 sm:py-20">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div>
            <p className="text-xs tracking-widest text-gray-400 mb-4">ABOUT US</p>
            <h2 className="text-2xl sm:text-3xl tracking-tight mb-6">
              キャラバン形式の<br />アートイベント
            </h2>
          </div>
          <div className="space-y-4 text-sm text-gray-600 leading-relaxed">
            <p>
              CinéFileは、国境を越えた学生主導のアート・カルチャープロジェクトです。コペンハーゲン、パリ、ベルリン、東京と場所を移しながら、それぞれの土地の文化や空間と対話し、新しい表現と出会いの場を創出してきました。
            </p>
            <p>
              固定された会場を持たないキャラバン形式だからこそ、その場所でしか生まれない一期一会の体験を提供できると信じています。
            </p>
            <Link href="/people" className="inline-block text-xs tracking-widest text-gray-900 hover:underline mt-2">
              ABOUT US →
            </Link>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="border-t border-gray-100 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 py-16 sm:py-20">
          <div className="grid md:grid-cols-2 gap-16">
            {/* Vision */}
            <div>
              <p className="text-xs tracking-widest text-gray-400 mb-4">VISION</p>
              <h3 className="text-xl sm:text-2xl tracking-tight mb-5 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <span className="font-medium text-[#1c2b5e]">Space for Creativity</span>
                <span className="text-xs tracking-wider text-gray-400 font-normal">/ 創作の余白、創造の宇宙</span>
              </h3>
              <div className="space-y-3 text-sm text-gray-600 leading-relaxed">
                <p>すべての人の日常に「つくること」の余白がある</p>
                <p>内なる世界の創造は、無限に拡がる宇宙に繋がっている</p>
              </div>
            </div>

            {/* Mission */}
            <div>
              <p className="text-xs tracking-widest text-gray-400 mb-4">MISSION</p>
              <h3 className="text-xl sm:text-2xl tracking-tight text-gray-900 mb-5">
                その手で、世界を切りとる
              </h3>
              <div className="space-y-4 text-sm text-gray-600 leading-relaxed">
                <p className="font-medium text-gray-800">
                  手は、人間にとって最も原始的な創作の源。
                </p>
                <p>
                  溢れる情報や誰かの言葉をただ消費するだけの日常から、自分の手を動かし、日々の感情や問いをクリエイティブな文脈で切りとること。
                </p>
                <p>
                  私たちは、誰もが表現を通じて世界と、そして宇宙と接続するための「場」を創り続けます。
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* NEWS */}
      <section className="border-t border-gray-100 bg-[#faf9f7]">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 py-14">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xs tracking-widest text-gray-400">NEWS</h2>
            <Link href="/media" className="text-xs tracking-widest text-gray-500 hover:text-gray-900 transition-colors">
              VIEW ALL →
            </Link>
          </div>
          <div className="divide-y divide-gray-200">
            {newsData.contents.map((item) => (
              <Link key={item.id} href={`/media/news/${item.id}`} className="flex gap-6 sm:gap-10 py-6 group">
                <div className="w-24 shrink-0 text-xs text-gray-400 pt-0.5">
                  {item.eventDate ? `開催日: ${formatDate(item.eventDate)}` : formatDate(item.publishedAt)}
                </div>
                <div className="flex-1">
                  {item.category && (
                    <span className="inline-block text-[10px] tracking-wider text-[#1c2b5e] mb-1">{item.category}</span>
                  )}
                  <h3 className="text-sm mb-1 group-hover:text-gray-500 transition-colors">
                    {item.title}
                  </h3>
                  {item.excerpt && <p className="text-xs text-gray-400 line-clamp-1">{item.excerpt}</p>}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ARCHIVE */}
      <section className="border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 py-14">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-xs tracking-widest text-gray-400">ARCHIVE</h2>
            <Link href="/archive" className="text-xs tracking-widest text-gray-500 hover:text-gray-900 transition-colors">
              VIEW ALL →
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {/* microCMSから取得したイベントデータを展開 */}
            {eventsData.contents.map((event) => (
              <Link key={event.id} href={`/archive/${event.id}`} className="group">
                <div className="overflow-hidden mb-3 bg-gray-50">
                  <img
                    src={event.image.url} 
                    alt={event.title}
                    className="w-full h-auto group-hover:opacity-80 transition-opacity duration-300"
                  />
                </div>
                <div className="text-xs text-gray-900 mb-0.5">{event.title}</div>
                <div className="text-xs text-gray-400">{event.year}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* BLOG */}
      <section className="border-t border-gray-100 bg-[#faf9f7]">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 py-14">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-xs tracking-widest text-gray-400">BLOG</h2>
            <Link href="/media" className="text-xs tracking-widest text-gray-500 hover:text-gray-900 transition-colors">
              VIEW ALL →
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {blogData.contents.map((post) => (
              <Link key={post.id} href={`/media/blog/${post.id}`} className="group">
                {post.image && (
                  <div className="aspect-4/3 overflow-hidden mb-4 bg-gray-100">
                    <img
                      src={post.image.url}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:opacity-85 transition-opacity"
                    />
                  </div>
                )}
                <div className="text-xs text-gray-400 mb-1.5">
                  {post.eventDate ? `開催日: ${formatDate(post.eventDate)}` : formatDate(post.publishedAt)}
                </div>
                {post.category && (
                  <div className="text-[10px] text-[#1c2b5e] tracking-wider mb-1">{post.category}</div>
                )}
                <h3 className="text-sm mb-1.5 group-hover:text-gray-500 transition-colors">
                  {post.title}
                </h3>
                {post.excerpt && <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">{post.excerpt}</p>}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 py-16">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div>
              <p className="text-xs tracking-widest text-gray-400 mb-2">CONTACT</p>
              <h2 className="text-xl tracking-tight">お問い合わせ</h2>
            </div>
            <Link
              href="/contact"
              className="inline-block px-8 py-3 border border-gray-900 text-xs tracking-widest text-gray-900 hover:bg-gray-900 hover:text-white transition-colors"
            >
              CONTACT US →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}