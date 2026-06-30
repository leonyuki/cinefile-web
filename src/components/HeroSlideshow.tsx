"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

type MicroCMSImage = {
  url: string;
  width: number;
  height: number;
};

// 🌟 microCMSから受け取るイベントデータの型定義
type SlideEventItem = {
  id: string;
  title: string;
  image: MicroCMSImage;
};

type HeroSlideshowProps = {
  events: SlideEventItem[];
};

export default function HeroSlideshow({ events }: HeroSlideshowProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // データが1件以下の場合はタイマーを回さない安全設計
  useEffect(() => {
    if (!events || events.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % events.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [events?.length]);

  // まだmicroCMS側にイベントデータが1件もない場合のフォールバック表示
  if (!events || events.length === 0) {
    return (
      <div className="relative w-full h-[70vh] min-h-[480px] bg-gray-100 flex items-center justify-center text-gray-400">
        <p className="text-xs tracking-widest">NO EVENT IMAGES AVAILABLE</p>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[70vh] min-h-[480px] overflow-hidden bg-gray-100 group">
      {/* 🌟 microCMSから渡されたイベントデータをループ処理 */}
      {events.map((event, index) => (
        <Link
          key={event.id}
          href={`/archive/${event.id}`}
          className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
            index === currentIndex 
              ? 'opacity-100 z-10' 
              : 'opacity-0 z-0 pointer-events-none'
          }`}
        >
          {/* 画像（microCMSの画像URLを参照） */}
          <img
            src={event.image.url}
            alt={event.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[5000ms] ease-out"
          />
          {/* 青みがかったオーバーレイ */}
          <div className="absolute inset-0 bg-[#1c2b5e]/40" />
        </Link>
      ))}
      
      {/* テキストコンテンツ（クリック透過設定） */}
      <div className="absolute inset-0 flex flex-col justify-end p-8 sm:p-16 text-white z-20 pointer-events-none">
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
  );
}