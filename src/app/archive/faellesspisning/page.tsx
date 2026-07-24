import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { traceTrashData, otherEventsData } from './data';

import EventHero from '../../../components/event/EventHero';
import EventStatement from '../../../components/event/EventStatement';
import EventArtists from '../../../components/event/EventArtists';
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

      {/* モジュールを呼び出してデータを流し込むだけ */}
      <EventHero event={traceTrashData} />
      
      <EventStatement statement={traceTrashData.statement} />
      
      <EventArtists artists={traceTrashData.artists} />
      
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