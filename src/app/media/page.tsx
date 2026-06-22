import Link from 'next/link';
import { client } from '../../libs/microcms'; // 絶対パスにしています。動かない場合は ../../libs/microcms に戻してください

// microCMSの画像フィールドの型を定義
type MicroCMSImage = {
  url: string;
  width: number;
  height: number;
};

// ニュース記事の型定義
type NewsItem = {
  id: string;
  title: string;
  category?: string;
  excerpt?: string;
  publishedAt: string;
  eventDate?: string;
};

// ブログ記事の型定義（新しく追加）
type BlogItem = {
  id: string;
  title: string;
  category?: string;
  excerpt?: string;
  image?: MicroCMSImage; // 画像フィールド用の型を適用
  publishedAt: string;
  eventDate?: string; // ブログ側に追加した開催日
};

// 日付を「2026.06.20」のような形式に変換する関数
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}.${month}.${day}`;
};

export default async function MediaPage() {
  // Promise.all を使って、ニュースとブログのデータを同時に並列で取得（高速化）
  const [newsData, blogData] = await Promise.all([
    client.getList<NewsItem>({
      endpoint: 'news',
      queries: { limit: 10 }, // 最新10件を取得
    }),
    client.getList<BlogItem>({
      endpoint: 'blog', // 作成したブログのエンドポイント名
      queries: { limit: 10 },
    }),
  ]);

  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-12 py-12 sm:py-20">
      <div className="mb-14">
        <p className="text-xs tracking-widest text-gray-400 mb-3">MEDIA</p>
        <h1 className="text-3xl sm:text-4xl tracking-tight">News &amp; Blog</h1>
      </div>

      {/* NEWS Section */}
      <section className="mb-20">
        <div className="flex items-center justify-between mb-8 pb-3 border-b border-gray-100">
          <h2 className="text-xs tracking-widest text-gray-400">NEWS</h2>
        </div>

        {/* コピペによる重複とタグの崩れを綺麗に一本化しました */}
        <div className="space-y-0 divide-y divide-gray-100">
          {newsData.contents.map((item: NewsItem) => (
            <Link
              key={item.id}
              href={`/media/news/${item.id}`}
              className="flex gap-8 py-7 group hover:bg-gray-50 -mx-4 px-4 transition-colors"
            >
              <div className="w-28 shrink-0 pt-0.5">
                <div className="text-xs font-medium text-gray-400">
                  {formatDate(item.eventDate ?? item.publishedAt)}
                </div>
              </div>
              
              <div className="flex-1">
                {item.category && (
                  <span className="inline-block text-xs text-[#1c2b5e] tracking-wider mb-2">
                    {item.category}
                  </span>
                )}
                <h3 className="text-base mb-2 group-hover:text-gray-500 transition-colors leading-snug">
                  {item.title}
                </h3>
                {item.excerpt && (
                  <p className="text-sm text-gray-500 leading-relaxed line-clamp-2">
                    {item.excerpt}
                  </p>
                )}
              </div>
              <div className="hidden sm:flex items-start pt-1 text-gray-300 group-hover:text-gray-600 transition-colors">
                →
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* BLOG Section */}
      <section>
        <div className="flex items-center justify-between mb-8 pb-3 border-b border-gray-100">
          <h2 className="text-xs tracking-widest text-gray-400">BLOG</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          {/* ダミーからmicroCMSのデータ（blogData）へ変更 */}
          {blogData.contents.map((post: BlogItem) => (
            <Link key={post.id} href={`/media/blog/${post.id}`} className="group">
              {post.image && (
                <div className="aspect-4/3 overflow-hidden mb-4 bg-gray-50">
                  <img
                    src={post.image.url} // microCMSから取得した画像のURLを適用
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:opacity-85 transition-opacity duration-300"
                  />
                </div>
              )}
              {/* ブログ側の開催日・公開日の表示切り替え */}
              <div className="text-xs text-gray-400 mb-2">
                {post.eventDate ? formatDate(post.eventDate) : formatDate(post.publishedAt)}
              </div>
              {post.category && (
                <div className="text-xs text-[#1c2b5e] tracking-wider mb-2">{post.category}</div>
              )}
              <h3 className="text-base mb-2 group-hover:text-gray-500 transition-colors leading-snug">
                {post.title}
              </h3>
              {post.excerpt && (
                <p className="text-sm text-gray-500 leading-relaxed line-clamp-2">{post.excerpt}</p>
              )}
              <div className="mt-3 text-xs tracking-wider text-gray-400 group-hover:text-gray-900 transition-colors">
                READ MORE →
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}