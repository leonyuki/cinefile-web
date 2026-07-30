import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft } from 'lucide-react';
import { faellesspisningData, otherEventsData } from './data';

import EventHero from '../../../components/event/EventHero';
import EventStatement from '../../../components/event/EventStatement';
import EventArtists from '../../../components/event/EventArtists';
import EventAccess from '../../../components/event/EventAccess';
import OtherEvents from '../../../components/event/OtherEvents';
import EventCreditsSection from '../../../components/event/EventCreditsSection';
import { creditsData, sponsorsData, venueData, cooperationData } from './credit';

export const dynamic = 'force-static';

export default function FaellesspisningPage() {
  return (
    <div className="bg-white min-h-screen text-gray-900 selection:bg-gray-900 selection:text-white">
      
      <div className="max-w-6xl mx-auto px-6 sm:px-12 pt-12 pb-6">
        <Link
          href="/archive"
          className="inline-flex items-center text-xs tracking-widest text-gray-400 hover:text-gray-900 transition-colors w-max"
        >
          <ArrowLeft className="w-3.5 h-3.5 mr-2" />
          BACK TO ARCHIVE
        </Link>
      </div>

      <EventHero event={faellesspisningData} />
      
      <EventStatement statement={faellesspisningData.statement} />

      {faellesspisningData.statementImages && faellesspisningData.statementImages.length > 0 && (
  <section className="max-w-6xl mx-auto px-6 sm:px-12 pb-20">
    {/* 🌟 2列の grid をやめ、中央揃え（items-center）の1列に変更 */}
    <div className="flex flex-col items-center gap-10">
      {faellesspisningData.statementImages.map((src, i) => (
        // 🌟 max-w-4xl で最大幅を制限しつつ、画面サイズに合わせて大きく表示
        <div key={i} className="w-full max-w-4xl bg-gray-50 rounded-sm overflow-hidden flex justify-center">
          <Image 
            src={src} 
            alt={`Statement visual ${i + 1}`} 
            width={1200}
            height={800}
            // 🌟 画像の縦横比を保ったまま、コンテナの幅いっぱいに表示
            className="w-full h-auto object-contain" 
          />
        </div>
      ))}
    </div>
  </section>
)}

      {/* 🌟 セッション・アーティスト紹介 */}
      {faellesspisningData.artistIntroductions && faellesspisningData.artistIntroductions.length > 0 && (
        <section className="max-w-6xl mx-auto px-6 sm:px-12 py-20 border-t border-gray-100">
          <h2 className="text-xs tracking-widest text-gray-400 uppercase mb-16 font-semibold text-center">
            Sessions
          </h2>
          <div className="space-y-24">
            {faellesspisningData.artistIntroductions.map((session, idx) => (
              <div key={idx} className="flex flex-col md:flex-row gap-12 items-start">
                
                {/* 🌟 左側：タイトルと名前（複数人対応） */}
                <div className="w-full md:w-1/3 space-y-6 md:sticky md:top-24">
                  <div className="space-y-6">
                    {session.artists.map((artist, aIdx) => (
                      <div key={aIdx}>
                        <p className="text-[10px] tracking-widest text-gray-400 uppercase font-medium">
                          {artist.title}
                        </p>
                        <h3 className="text-2xl font-bold text-gray-900 mt-1">
                          {artist.name}
                        </h3>
                      </div>
                    ))}
                  </div>
                  {session.description && (
                    <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-wrap pt-2">
                      {session.description}
                    </p>
                  )}
                </div>

                {/* 右側：写真の列挙 */}
                <div className="w-full md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {session.images.map((imgSrc, imgIdx) => (
                    <div 
                      key={imgIdx} 
                      className={`relative bg-gray-50 rounded-sm overflow-hidden aspect-[4/3] ${
                        session.images.length === 1 ? 'col-span-1 sm:col-span-2 aspect-[16/9]' : ''
                      }`}
                    >
                      <Image 
                        src={imgSrc} 
                        alt={`Session gallery ${imgIdx + 1}`} 
                        fill 
                        className="object-cover hover:scale-105 transition-transform duration-700 ease-out" 
                      />
                    </div>
                  ))}
                </div>
                
              </div>
            ))}
          </div>
        </section>
      )}
      
      <EventAccess 
        mapEmbedUrl={faellesspisningData.mapEmbedUrl} 
        access={faellesspisningData.access} 
      />

      <EventCreditsSection 
        credits={creditsData}
        sponsors={sponsorsData}
        venue={venueData}
        cooperation={cooperationData}
      />
      
      <OtherEvents events={otherEventsData} />
      
    </div>
  );
}