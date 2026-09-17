import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft } from 'lucide-react';
import { traceTrashData, otherEventsData } from './data';

import EventHero from '../../../components/event/EventHero';
import EventStatement from '../../../components/event/EventStatement';
import EventAccess from '../../../components/event/EventAccess';
import OtherEvents from '../../../components/event/OtherEvents';
import EventCreditsSection from '../../../components/event/EventCreditsSection';
import { creditsData, sponsorsData, venueData, cooperationData } from './credit';

export const metadata = {
  title: `${traceTrashData.title} | CinéFile`,
  description:
    traceTrashData.statement?.replace(/\n/g, ' ').slice(0, 120) ||
    `${traceTrashData.title} — CinéFileのイベントアーカイブ。`,
};

export default function TraceTrashPage() {
  // 1. ポスター画像 (/trace-trash.jpg) のURLを抽出
  const posterUrl = traceTrashData.imageUrl;

  // 🌟 EventHero が「imageUrl」「image」「image.url」のどれを参照していても
  // ポスター画像 (/trace-trash.jpg) が表示されるようにデータを正規化
  const heroEventData = {
    ...traceTrashData,
    imageUrl: posterUrl,
    image: {
      url: posterUrl,
    },
  };

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

      {/* 1. Hero (ポスター画像 /trace-trash.jpg を確実に渡す) */}
      <EventHero event={heroEventData} />
      
      {/* 2. Statement */}
      <EventStatement statement={traceTrashData.statement} />
      
      {/* 3. 中央画像 (Statement と Access の間) */}
      <section className="max-w-6xl mx-auto px-6 sm:px-12 my-12 sm:my-20">
        <div className="w-full overflow-hidden rounded-sm border border-gray-100 shadow-sm bg-gray-50">
          <Image
            src="/空き家劇場_0907-02.png"
            alt={traceTrashData.title}
            width={2481}
            height={3508}
            sizes="(min-width: 1024px) 1024px, 100vw"
            className="w-full h-auto block"
          />
        </div>
      </section>

      {/* 4. Participating Artists */}
      {/* <EventArtists artists={traceTrashData.artists} /> */}
      
      {/* 5. Access */}
      <EventAccess 
        mapEmbedUrl={traceTrashData.mapEmbedUrl} 
        access={traceTrashData.access} 
      />
      
      {/* 🌟 クレジット表示セクション */}
            <EventCreditsSection 
              credits={creditsData}
              sponsors={sponsorsData}
              venue={venueData}
              cooperation={cooperationData}
            />
      
      {/* 7. Other Events */}
      <OtherEvents events={otherEventsData} />
      
    </div>
  );
}