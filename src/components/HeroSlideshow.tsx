"use client"; // クライアント側で動作させるための宣言

import { useState, useEffect } from 'react';

// スライドさせたい画像のパスを配列で指定します
// 2枚目以降は public フォルダに追加した実際の画像名に書き換えてください
const images = [
  '/image-7.png',
  '/image-1.png', // 例：2枚目の画像
  '/image-2.png',// 例：3枚目の画像
];

export default function HeroSlideshow() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // 5秒（5000ミリ秒）ごとに次の画像へ切り替える
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval); // コンポーネントが破棄される時にタイマーを解除
  }, []);

  return (
    <div className="relative w-full h-[70vh] min-h-480px overflow-hidden bg-gray-100">
      {/* 画像群（透明度を変化させてクロスフェードさせる） */}
      {images.map((src, index) => (
        <img
          key={src}
          src={src}
          alt={`CinéFile slide ${index + 1}`}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
        />
      ))}
      
      {/* 青みがかったオーバーレイ */}
      <div className="absolute inset-0 bg-[#1c2b5e]/40 z-10" />
      
      {/* テキストコンテンツ */}
      <div className="absolute inset-0 flex flex-col justify-end p-8 sm:p-16 text-white z-20">
        <p className="text-xs tracking-widest mb-4 opacity-80">
          Experimental Space for Poiesis & Dialogue
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