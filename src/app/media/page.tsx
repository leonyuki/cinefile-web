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

// ブログ記事の型定義（将来の復活のために残しておきます）
type BlogItem = {
  id: string;
  title: string;
  category?: string;
  excerpt?: string;
  image?: MicroCMSImage;
  publishedAt: string;
  eventDate?: string;
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
  // 🌟 BLOGを一時非表示にするため、NEWSのみ取得するように変更しています
  const newsData = await client.getList<NewsItem>({
    endpoint: 'news',
    queries: { limit: 10 }, // 最新10件を取得
  });

  /* // 🌟 BLOG復活時はこちらのデータ取得のコメントアウトを外してください
  const [newsData, blogData] = await Promise.all([
    client.getList<NewsItem>({ endpoint: 'news', queries: { limit: 10 } }),
    client.getList<BlogItem>({ endpoint: 'blog', queries: { limit: 10 } }),
  ]);
  */

  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-12 py-12 sm:py-20">
      <div className="mb-14">
        <p className="text-xs tracking-widest text-gray-400 mb-3">MEDIA</p>
        <h1 className="text-3xl sm:text-4xl tracking-tight">News</h1> {/* 🌟 一時的に News のみに変更 */}
      </div>

      {/* NEWS Section */}
      <section className="mb-20">
        <div className="flex items-center justify-between mb-8 pb-3 border-b border-gray-100">
          <h2 className="text-xs tracking-widest text-gray-400">NEWS</h2>
        </div>

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

      {/* 🌟 BLOG Section（丸ごとコメントアウトして非表示にしています） */}
      {/* <section>
        <div className="flex items-center justify-between mb-8 pb-3 border-b border-gray-100">
          <h2 className="text-xs tracking-widest text-gray-400">BLOG</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          {blogData.contents.map((post: BlogItem) => (
            <Link key={post.id} href={`/media/blog/${post.id}`} className="group">
              {post.image && (
                <div className="aspect-4/3 overflow-hidden mb-4 bg-gray-50">
                  <img
                    src={post.image.url}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:opacity-85 transition-opacity duration-300"
                  />
                </div>
              )}
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
      */}
    </div>
  );
}