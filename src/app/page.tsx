import Link from 'next/link';
import { events } from '../data/events';
import { newsItems } from '../data/news';
import { blogPosts } from '../data/blog';

// export default を追加しました
export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative">
        <div className="relative w-full h-[70vh] min-h-480px overflow-hidden bg-gray-100">
          <img
            src="/image-7.png" // publicフォルダの画像パスに直接書き換えました
            alt="CinéFile"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#1c2b5e]/40" />
          <div className="absolute inset-0 flex flex-col justify-end p-8 sm:p-16 text-white">
            <p className="text-xs tracking-widest mb-4 opacity-80">
              Experimental Space for Poiesis &amp; Dialogue
            </p>
            <h1 className="text-3xl sm:text-5xl tracking-tight leading-tight mb-4 max-w-2xl">
              創作と対話の<br />実験的スペース
            </h1>
            <p className="text-sm opacity-75 max-w-md leading-relaxed">
              「つくる、みる、はなす」を日常に。誰かの表現から生まれる対話でつながる実験的スペース。
            </p>
          </div>
        </div>
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
            {newsItems.slice(0, 3).map((item) => (
              <Link key={item.id} href={`/media/news/${item.slug}`} className="flex gap-6 sm:gap-10 py-6 group">
                {/* flex-shrink-0 を shrink-0 に短縮しました */}
                <div className="w-24 shrink-0 text-xs text-gray-400 pt-0.5">{item.date}</div>
                <div className="flex-1">
                  <h3 className="text-sm mb-1 group-hover:text-gray-500 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-400 line-clamp-1">{item.excerpt}</p>
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
            {events.map((event) => (
              <Link key={event.id} href={`/archive/${event.id}`} className="group">
                <div className="overflow-hidden mb-3 bg-gray-50">
                  <img
                    src={event.image}
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
            {blogPosts.map((post) => (
              <Link key={post.id} href={`/media/blog/${post.slug}`} className="group">
                {post.image && (
                  <div className="aspect-4/3 overflow-hidden mb-4 bg-gray-100">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:opacity-85 transition-opacity"
                    />
                  </div>
                )}
                <div className="text-xs text-gray-400 mb-1.5">{post.date}</div>
                <h3 className="text-sm mb-1.5 group-hover:text-gray-500 transition-colors">
                  {post.title}
                </h3>
                <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">{post.excerpt}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

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