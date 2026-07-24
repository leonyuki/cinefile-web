import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft } from 'lucide-react';
import { traceTrashData, otherEventsData } from './data';

import EventHero from '../../../components/event/EventHero';
import EventStatement from '../../../components/event/EventStatement';
import EventContents from '../../../components/event/EventContents';
import EventAccess from '../../../components/event/EventAccess';
import EventCredits from '../../../components/event/EventCredits';
import OtherEvents from '../../../components/event/OtherEvents';

export default function TraceTrashPage() {
  return (
    <div className="bg-white min-h-screen text-gray-900 selection:bg-gray-900 selection:text-white">
      
      {/* 戻るボタン */}
      <div className="max-w-6xl mx-auto px-6 sm:px-12 pt-12 pb-6">
        <Link
          href="/archive"
          className="inline-flex items-center text-xs tracking-widest text-gray-400 hover:text-gray-900 transition-colors w-max"
        >
          <ArrowLeft className="w-3.5 h-3.5 mr-2" />
          BACK TO ARCHIVE
        </Link>
      </div>

      <EventHero event={traceTrashData} />
      
      <EventStatement statement={traceTrashData.statement} />
      
      <EventContents contents={traceTrashData.contents} />

      {/* 🌟 画像としてフライヤーをそのまま貼り付けるセクション */}
      {/* ↓ 全体の幅を max-w-6xl に広げています */}
      <div className="max-w-6xl mx-auto px-6 sm:px-12 py-16 border-gray-100">
        
        {/* 画像を美しく配置（サイズを max-w-2xl から max-w-4xl に大きくしました） */}
        <div className="relative w-full max-w-4xl mx-auto shadow-sm">
          <Image
            src="/paris.jpg"
            alt="Event Flyer"
            width={1200} // 高解像度でもボヤけないようにベースサイズを少し大きく定義
            height={1697} 
            className="w-full h-auto object-contain"
            quality={95} // 画質も少し上げました
          />
        </div>

        {/* オリジナルのPDFをダウンロード・閲覧したい人向けのリンク */}
        <div className="text-center mt-12">
          <a 
            href="/paris.pdf"
            target="_blank" 
            rel="noopener noreferrer" 
            className="inline-flex items-center text-xs tracking-widest text-gray-500 hover:text-gray-900 transition-colors border-b border-gray-300 hover:border-gray-900 pb-0.5"
          >
            PDF版を開く
          </a>
        </div>
      </div>

      {/* 🌟 4枚のギャラリーセクション（PCでも2x2のグリッド表示） */}
      <div className="max-w-4xl mx-auto px-6 sm:px-12 pb-24 border-t border-gray-100 pt-16">
        <div className="text-center mb-10">
          <h3 className="text-xs tracking-widest text-gray-400 uppercase font-medium">
            Gallery
          </h3>
        </div>
        
        {/* 常に2列（2x2）で表示 */}
        <div className="grid grid-cols-2 gap-4 sm:gap-8 items-start">
          {/* 写真1 */}
          <div className="relative overflow-hidden">
            <Image
              src="/paris/image1.jpg"
              alt="Gallery Photo 1"
              width={800}
              height={800}
              className="w-full h-auto hover:scale-105 transition-transform duration-500"
            />
          </div>
          {/* 写真2 */}
          <div className="relative overflow-hidden">
            <Image
              src="/paris/image2.jpg"
              alt="Gallery Photo 2"
              width={800}
              height={800}
              className="w-full h-auto hover:scale-105 transition-transform duration-500"
            />
          </div>
          {/* 写真3 */}
          <div className="relative overflow-hidden">
            <Image
              src="/paris/image3.jpg"
              alt="Gallery Photo 3"
              width={800}
              height={800}
              className="w-full h-auto hover:scale-105 transition-transform duration-500"
            />
          </div>
          {/* 写真4 */}
          <div className="relative overflow-hidden">
            <Image
              src="/paris/image4.jpg"
              alt="Gallery Photo 4"
              width={800}
              height={800}
              className="w-full h-auto hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>
      </div>
      
      <EventAccess 
        mapEmbedUrl={traceTrashData.mapEmbedUrl} 
        access={traceTrashData.access} 
      />
      
      <EventCredits 
        organizer={traceTrashData.organizer} 
        cooperation={traceTrashData.cooperation} 
        support={traceTrashData.support} 
      />
      
      <OtherEvents events={otherEventsData} />
      
    </div>
  );
}