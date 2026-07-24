"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

type MicroCMSImage = {
  url: string;
  width: number;
  height: number;
};

type EventItem = {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  year: number;
  city?: string;
  image: MicroCMSImage;
  status: string[];
};

type ArchiveSlideshowProps = {
  events: EventItem[];
};

export default function ArchiveSlideshow({ events }: ArchiveSlideshowProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // 5秒ごとに自動スライド
  useEffect(() => {
    if (events.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % events.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [events.length]);

  if (!events || events.length === 0) return null;

  const nextSlide = (e: React.MouseEvent) => {
    e.preventDefault(); // 親のLinkタグ遷移を防止
    setCurrentIndex((prev) => (prev + 1) % events.length);
  };

  const prevSlide = (e: React.MouseEvent) => {
    e.preventDefault(); // 親のLinkタグ遷移を防止
    setCurrentIndex((prev) => (prev - 1 + events.length) % events.length);
  };

  return (
    <div className="relative w-full h-[55vh] min-h-[380px] bg-gray-900 overflow-hidden mb-16 rounded-sm group">
      {/* スライド展開部 */}
      {events.map((event, index) => (
        <Link
          key={event.id}
          href={`/archive/${event.id}`}
          className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
          }`}
        >
          {/* 背景画像 */}
          <img
            src={event.image.url}
            alt={event.title}
            className="w-full h-full object-cover opacity-75 group-hover:scale-102 transition-transform duration-[5000ms] ease-out"
          />
          {/* 下部を暗くするグラデーションマスク */}
          <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-transparent to-transparent" />
          
          {/* テキストレイヤー */}
          <div className="absolute inset-0 flex flex-col justify-end p-8 sm:p-12 text-white z-20">
            <div className="space-y-2 max-w-2xl">
              <div className="text-[10px] tracking-widest text-gray-300 font-medium uppercase">
                {event.status?.includes('Upcoming') ? (
                  <span className="px-2 py-0.5 bg-[#1c2b5e] text-white rounded-sm">UPCOMING</span>
                ) : (
                  <span>{event.year} {event.city && ` — ${event.city}`}</span>
                )}
              </div>
              <h2 className="text-2xl sm:text-3xl tracking-tight leading-tight font-light">
                {event.title}
              </h2>
              {event.subtitle && (
                <p className="text-xs sm:text-sm text-gray-400 font-normal">{event.subtitle}</p>
              )}
            </div>
          </div>
        </Link>
      ))}

      {/* 左右ナビゲーションボタン（ホバー時にふわっと出現） */}
      {events.length > 1 && (
        <div className="absolute inset-0 flex items-center justify-between px-4 z-30 pointer-events-none">
          <button
            onClick={prevSlide}
            className="p-2 bg-black/20 hover:bg-black/40 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-xs pointer-events-auto"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={nextSlide}
            className="p-2 bg-black/20 hover:bg-black/40 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-xs pointer-events-auto"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* インジケータードット */}
      {events.length > 1 && (
        <div className="absolute bottom-6 right-8 z-30 flex gap-1.5">
          {events.map((_, index) => (
            <button
              key={index}
              onClick={(e) => {
                e.preventDefault();
                setCurrentIndex(index);
              }}
              className={`h-1 rounded-full transition-all duration-300 ${
                index === currentIndex ? 'bg-white w-4' : 'bg-white/30'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}