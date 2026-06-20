import Link from 'next/link';
// データフォルダへのパスを ../ から ../../ に修正しました
import { newsItems } from '../../data/news';
import { blogPosts } from '../../data/blog';

// default を追加しました！
export default function MediaPage() {
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

        <div className="space-y-0 divide-y divide-gray-100">
          {newsItems.map((item) => (
            <Link
              key={item.id}
              href={`/media/news/${item.slug}`} // to を href に修正しました
              className="flex gap-8 py-7 group hover:bg-gray-50 -mx-4 px-4 transition-colors"
            >
              {/* flex-shrink-0 を shrink-0 に最適化しました！ */}
              <div className="w-28 shrink-0 text-xs text-gray-400 pt-0.5">{item.date}</div>
              <div className="flex-1">
                <span className="inline-block text-xs text-[#1c2b5e] tracking-wider mb-2">
                  {item.category}
                </span>
                <h3 className="text-base mb-2 group-hover:text-gray-500 transition-colors leading-snug">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed line-clamp-2">
                  {item.excerpt}
                </p>
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
          {blogPosts.map((post) => (
            <Link key={post.id} href={`/media/blog/${post.slug}`} className="group"> {/* to を href に修正しました */}
              {post.image && (
                <div className="aspect-4/3 overflow-hidden mb-4 bg-gray-50">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:opacity-85 transition-opacity duration-300"
                  />
                </div>
              )}
              <div className="text-xs text-gray-400 mb-2">{post.date}</div>
              <div className="text-xs text-[#1c2b5e] tracking-wider mb-2">{post.category}</div>
              <h3 className="text-base mb-2 group-hover:text-gray-500 transition-colors leading-snug">
                {post.title}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed line-clamp-2">{post.excerpt}</p>
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