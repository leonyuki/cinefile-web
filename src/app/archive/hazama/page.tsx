import Link from 'next/link';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { traceTrashData, otherEventsData } from './data';

import EventHero from '../../../components/event/EventHero';
import EventStatement from '../../../components/event/EventStatement';
import EventContents from '../../../components/event/EventContents';
import EventAccess from '../../../components/event/EventAccess';
import EventCredits from '../../../components/event/EventCredits';
import OtherEvents from '../../../components/event/OtherEvents';
import EventCreditsSection from '../../../components/event/EventCreditsSection';
import { creditsData, sponsorsData, venueData, cooperationData } from './credit';

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

      {/* 1. Hero セクション */}
      <EventHero event={traceTrashData} />

      {/* 2. ステートメント */}
      <EventStatement statement={traceTrashData.statement} />

      {/* 3. プログラム / タイムスケジュール */}
      {traceTrashData.contents && traceTrashData.contents.length > 0 && (
        <EventContents contents={traceTrashData.contents} />
      )}

      {/* 🌟 4. 上映作品リスト (Films) */}
      {traceTrashData.films && traceTrashData.films.length > 0 && (
        <section className="max-w-6xl mx-auto px-6 sm:px-12 py-12 border-t border-gray-100">
          <h2 className="text-xs tracking-widest text-gray-400 uppercase mb-8 font-semibold">
            SCREENING FILMS
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {traceTrashData.films.map((film, index) => (
              <div
                key={index}
                className="p-5 bg-gray-50/60 rounded-sm border border-gray-100 flex flex-col justify-between space-y-2"
              >
                {film.title && (
                  <div className="flex items-baseline justify-between gap-2">
                    <h3 className="text-sm font-semibold text-gray-900">{film.title}</h3>
                    {film.duration && (
                      <span className="text-[11px] font-mono text-gray-400 shrink-0">
                        {film.duration}
                      </span>
                    )}
                  </div>
                )}
                {film.director && (
                  <div>
                    <span className="text-[10px] tracking-widest uppercase text-gray-400 block font-medium mb-0.5">
                      Director / Creator
                    </span>
                    <p className="text-xs text-gray-800 leading-relaxed">{film.director}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 5. アクセス情報 */}
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

      {/* 9. 主催・協力・後援ロゴマークリスト */}
      <EventCredits
        organizer={traceTrashData.organizer}
        cooperation={traceTrashData.cooperation}
        support={traceTrashData.support}
      />

      {/* 10. アーカイブ一覧（他のイベント） */}
      <OtherEvents events={otherEventsData} />
    </div>
  );
}