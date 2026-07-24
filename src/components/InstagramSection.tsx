'use client';

import { useEffect, useState } from 'react';
import { InstagramEmbed } from 'react-social-media-embed';
import { instagramPosts } from '../data/instagram';

export default function InstagramSection() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <section className="border-t border-gray-100 bg-[#faf9f7] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 py-14">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-sm tracking-widest text-gray-400">INSTAGRAM</h2>
          <a
            href="https://www.instagram.com/cinefile.official/" // ご自身のアカウントURL
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm tracking-widest text-gray-500 hover:text-gray-900 transition-colors"
          >
            FOLLOW US →
          </a>
        </div>

        {/* 🌟 横スクロール用のコンテナ */}
        <div 
          className="flex overflow-x-auto gap-6 pb-8 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {isMounted ? (
            instagramPosts.map((post) => (
              /* 🌟 各投稿の横幅を固定し、縮まないように設定 */
              <div key={post.id} className="flex-shrink-0 snap-center w-[328px]">
                <InstagramEmbed
                  url={post.url}
                  width={328}
                />
              </div>
            ))
          ) : (
            /* 読み込み中のスケルトンも横並びに合わせる */
            instagramPosts.map((post) => (
              <div 
                key={post.id} 
                className="flex-shrink-0 snap-center w-[328px] h-[400px] bg-gray-100/50 rounded-md animate-pulse" 
              />
            ))
          )}
        </div>
      </div>
    </section>
  );
}