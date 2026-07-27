import Link from 'next/link';
import { ArrowLeft, ExternalLink } from 'lucide-react';
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

      {/* 🌟 6. CREDITS セクション（スタッフクレジット） */}
      {traceTrashData.credits && traceTrashData.credits.length > 0 && (
        <section className="max-w-6xl mx-auto px-6 sm:px-12 py-12 border-t border-gray-100">
          <h2 className="text-xs tracking-widest text-gray-400 uppercase mb-8 font-semibold">
            CREDITS
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-6 gap-x-8">
            {traceTrashData.credits.map((item, index) => (
              <div key={index} className="space-y-1">
                <p className="text-[10px] tracking-widest text-gray-400 uppercase font-medium">
                  {item.role}
                </p>
                <p className="text-xs font-medium text-gray-800 leading-relaxed whitespace-pre-wrap">
                  {item.name}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 🌟 7. SPONSORS & VENUE セクション */}
      {((traceTrashData.sponsors && traceTrashData.sponsors.length > 0) ||
        traceTrashData.venue) && (
        <section className="max-w-6xl mx-auto px-6 sm:px-12 py-12 border-t border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
            {/* スポンサー */}
            {traceTrashData.sponsors && traceTrashData.sponsors.length > 0 && (
              <div className="md:col-span-8">
                <h2 className="text-xs tracking-widest text-gray-400 uppercase mb-6 font-semibold">
                  SPONSORS & SUPPORTERS
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {traceTrashData.sponsors.map((sponsor, index) => (
                    <a
                      key={index}
                      href={sponsor.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between p-3 rounded-sm border border-gray-100 hover:border-gray-300 bg-gray-50/50 hover:bg-white transition-all duration-200"
                    >
                      <span className="text-xs font-medium text-gray-800 group-hover:text-black transition-colors line-clamp-1">
                        {sponsor.name}
                      </span>
                      <ExternalLink className="w-3.5 h-3.5 text-gray-400 group-hover:text-black shrink-0 ml-2 transition-colors" />
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* 会場情報 */}
            {traceTrashData.venue && (
              <div className="md:col-span-4">
                <h2 className="text-xs tracking-widest text-gray-400 uppercase mb-6 font-semibold">
                  VENUE
                </h2>
                <a
                  href={traceTrashData.venue.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between p-4 rounded-sm border border-gray-200 bg-gray-900 text-white hover:bg-black transition-all duration-200 shadow-sm"
                >
                  <div>
                    <p className="text-[10px] tracking-widest text-gray-400 uppercase">
                      LOCATION
                    </p>
                    <p className="text-sm font-medium">{traceTrashData.venue.name}</p>
                  </div>
                  <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-white shrink-0 ml-2 transition-colors" />
                </a>
              </div>
            )}
          </div>
        </section>
      )}

      {/* 🌟 8. SPECIAL THANKS セクション */}
      {traceTrashData.specialThanks && traceTrashData.specialThanks.length > 0 && (
        <section className="max-w-6xl mx-auto px-6 sm:px-12 py-12 border-t border-gray-100">
          <h2 className="text-xs tracking-widest text-gray-400 uppercase mb-6 font-semibold">
            SPECIAL THANKS
          </h2>
          <div className="space-y-6">
            {traceTrashData.specialThanks.map((thanks, index) => (
              <div key={index} className="p-5 bg-gray-50/60 rounded-sm border border-gray-100">
                <h3 className="text-sm font-semibold text-gray-900 mb-2">{thanks.name}</h3>
                {thanks.message && (
                  <p className="text-xs text-gray-600 leading-relaxed whitespace-pre-wrap">
                    {thanks.message}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

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