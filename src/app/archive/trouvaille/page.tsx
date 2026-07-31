import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { traceTrashData, otherEventsData } from './data';

import EventHero from '../../../components/event/EventHero';
import EventStatement from '../../../components/event/EventStatement';
import EventContents from '../../../components/event/EventContents';
import EventAccess from '../../../components/event/EventAccess';
import EventCredits from '../../../components/event/EventCredits';
import OtherEvents from '../../../components/event/OtherEvents';
import EventCreditsSection from '../../../components/event/EventCreditsSection';
import { creditsData, cooperationData } from './credit';

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

      {/* 3. プログラム / タイムスケジュール (Contents) */}
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
                className="p-5 bg-gray-50/60 rounded-sm border border-gray-100 flex flex-col justify-between space-y-3"
              >
                <div>
                  <div className="flex items-baseline justify-between gap-2 mb-1">
                    <h3 className="text-sm font-semibold text-gray-900">
                      {film.title}
                    </h3>
                    {film.duration && (
                      <span className="text-[11px] font-mono text-gray-400 shrink-0">
                        {film.duration}
                      </span>
                    )}
                  </div>
                  {film.director && (
                    <p className="text-xs text-gray-600 leading-relaxed mt-2">
                      <span className="text-[10px] tracking-widest uppercase text-gray-400 block font-medium">
                        Director
                      </span>
                      {film.director}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 5. フライヤー画像セクション */}
      <div className="max-w-6xl mx-auto px-6 sm:px-12 py-16 border-t border-gray-100">
        <div className="relative w-full max-w-4xl mx-auto shadow-sm">
          <Image
            src="/paris.jpg"
            alt="Event Flyer"
            width={1200}
            height={1697}
            className="w-full h-auto object-contain"
            quality={95}
          />
        </div>

        {/* PDFリンク */}
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

      {/* 6. ギャラリーセクション */}
      <div className="max-w-4xl mx-auto px-6 sm:px-12 pb-24 border-t border-gray-100 pt-16">
        <div className="text-center mb-10">
          <h3 className="text-xs tracking-widest text-gray-400 uppercase font-medium">
            Gallery
          </h3>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:gap-8 items-start">
          {[1, 2, 3, 4].map((num) => (
            <div key={num} className="relative overflow-hidden">
              <Image
                src={`/paris/image${num}.jpg`}
                alt={`Gallery Photo ${num}`}
                width={800}
                height={800}
                className="w-full h-auto"
              />
            </div>
          ))}
        </div>
      </div>

      {/* 7. アクセス情報 */}
      <EventAccess
        mapEmbedUrl={traceTrashData.mapEmbedUrl}
        access={traceTrashData.access}
      />

      {/* 🌟 クレジット表示セクション */}
      <EventCreditsSection 
        credits={creditsData}
        // sponsors={sponsorsData}
        // venue={venueData}
        cooperation={cooperationData}
      />

      {/* 10. 主催・協力・後援 */}
      <EventCredits
        organizer={traceTrashData.organizer}
        cooperation={traceTrashData.cooperation}
        support={traceTrashData.support}
      />

      {/* 11. 他のイベント */}
      <OtherEvents events={otherEventsData} />
    </div>
  );
}