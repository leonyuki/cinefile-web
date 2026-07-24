"use client";

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// 🌟 型定義を柔軟にし、文字列・microCMSオブジェクト・Next.jsインポートオブジェクトに対応
type MicroCMSImage = { url: string } | { src: string } | string;

type EventItem = {
  id: string;
  title: string;
  city?: string;
  year?: number;
  image: MicroCMSImage;
  bgImage?: MicroCMSImage;
};

// 🌟 画像データから安全にURL文字列を抽出するヘルパー関数
const getImageUrl = (img?: MicroCMSImage): string => {
  if (!img) return '';
  if (typeof img === 'string') return img;
  if (typeof img === 'object') {
    if ('url' in img && typeof img.url === 'string') return img.url;
    if ('src' in img && typeof img.src === 'string') return img.src;
  }
  return '';
};

export default function PastEventsSlider({ events }: { events: EventItem[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // 次のスライドへ進む関数
  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % events.length);
  }, [events.length]);

  // 前のスライドへ戻る関数
  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? events.length - 1 : prev - 1));
  }, [events.length]);

  // 5秒ごとの自動再生
  useEffect(() => {
    if (events.length <= 1) return;
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [nextSlide, events.length]);

  if (!events || events.length === 0) return null;

  return (
    <div className="relative w-full h-[65vh] min-h-[480px] md:h-[600px] bg-[#0a0a0a] rounded-sm overflow-hidden group">
      
      {events.map((event, index) => {
        const isActive = index === currentIndex;

        // 🌟 背景画像とポスター画像のURLを安全に抽出
        const bgUrl = getImageUrl(event.bgImage);
        const posterUrl = getImageUrl(event.image);

        return (
          <div
            key={event.id}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
              isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            {/* 🌟 判定を変更：文字列としての bgUrl がしっかりと存在する場合のみ表示 */}
            {bgUrl ? (
              <img
                src={bgUrl}
                alt=""
                className="absolute inset-0 w-full h-full object-cover opacity-50 pointer-events-none transition-transform duration-[10000ms] ease-linear hover:scale-105"
              />
            ) : (
              <img
                src={posterUrl}
                alt=""
                className="absolute inset-0 w-full h-full object-cover opacity-40 blur-2xl scale-110 pointer-events-none"
              />
            )}

            {/* 前面のポスター画像 */}
            <div className="relative z-10 w-full h-full flex flex-col items-center justify-start pt-8 pb-[140px] md:pt-12 md:pb-[120px] px-6">
              <img
                src={posterUrl}
                alt={event.title}
                className="max-w-full max-h-full object-contain drop-shadow-2xl"
              />
            </div>

            {/* 下部のテキストエリア（グラデーション含む） */}
            <div className="absolute bottom-0 left-0 w-full z-20">
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent -top-24 pointer-events-none" />
              
              <div className="relative p-6 sm:p-8 md:p-12 pt-0 md:pt-0">
                <span className="block text-[10px] sm:text-xs tracking-widest uppercase text-white/80 mb-2 font-medium">
                  {event.city} {event.year && `— ${event.year}`}
                </span>
                
                <h3 className="text-2xl sm:text-3xl md:text-4xl tracking-tight text-white font-medium mb-4 drop-shadow-md line-clamp-2">
                  {event.title}
                </h3>
                
                <Link
                  href={`/archive/${event.id}`}
                  className="inline-block text-[10px] sm:text-xs tracking-widest text-white border-b border-white/50 hover:border-white pb-1 transition-colors drop-shadow-md"
                >
                  VIEW DETAILS →
                </Link>
              </div>
            </div>
          </div>
        );
      })}

      {events.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-3 top-1/2 -translate-y-1/2 z-30 p-2.5 bg-black/20 hover:bg-black/50 backdrop-blur-md rounded-full text-white opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all border border-white/10"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-30 p-2.5 bg-black/20 hover:bg-black/50 backdrop-blur-md rounded-full text-white opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all border border-white/10"
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </>
      )}
    </div>
  );
}