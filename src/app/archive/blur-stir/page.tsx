import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { blurStirData, otherEventsData } from './data';

import EventHero from '../../../components/event/EventHero';
import EventStatement from '../../../components/event/EventStatement';
import EventArtists from '../../../components/event/EventArtists_blur';
import EventAccess from '../../../components/event/EventAccess';
import EventCredits from '../../../components/event/EventCredits';
import OtherEvents from '../../../components/event/OtherEvents';
import EventCreditsSection from '../../../components/event/EventCreditsSection';
import { creditsData, sponsorsData, venueData, cooperationData } from './credit';

export const metadata = {
  title: `${blurStirData.title} | CinéFile`,
  description:
    blurStirData.statement?.replace(/\n/g, ' ').slice(0, 120) ||
    `${blurStirData.title} — CinéFileのイベントアーカイブ。`,
};

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

      {/* モジュールを呼び出してデータを流し込むだけ */}
      <EventHero event={blurStirData} />
      
      <EventStatement statement={blurStirData.statement} />
      
      <EventArtists artists={blurStirData.artists} />
      
      <EventAccess 
        mapEmbedUrl={blurStirData.mapEmbedUrl} 
        access={blurStirData.access} 
      />
      
      {/* 🌟 クレジット表示セクション */}
            <EventCreditsSection 
              credits={creditsData}
              sponsors={sponsorsData}
              venue={venueData}
              cooperation={cooperationData}
            />
            
      <EventCredits 
        organizer={blurStirData.organizer} 
        cooperation={blurStirData.cooperation} 
        support={blurStirData.support} 
      />
      
      <OtherEvents events={otherEventsData} />
      
    </div>
  );
}