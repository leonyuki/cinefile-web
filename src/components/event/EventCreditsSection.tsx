import React from 'react';
import { ExternalLink } from 'lucide-react';
import { EventCredit, EventSponsor, EventVenue, Organization } from '../../types/event';

interface EventCreditsSectionProps {
  credits?: EventCredit[];
  sponsors?: EventSponsor[];
  venue?: EventVenue;
  cooperation?: Organization[];
}

export default function EventCreditsSection({
  credits,
  sponsors,
  venue,
  cooperation,
}: EventCreditsSectionProps) {
  const hasContent =
    (credits && credits.length > 0) ||
    (sponsors && sponsors.length > 0) ||
    venue ||
    (cooperation && cooperation.length > 0);

  if (!hasContent) return null;

  return (
    <div className="border-t border-gray-100">
      
      {/* 🌟 1. スタッフクレジット (CREDITS) */}
      {credits && credits.length > 0 && (
        <section className="max-w-6xl mx-auto px-6 sm:px-12 py-16">
          <h2 className="text-xs tracking-widest text-gray-400 uppercase mb-10 font-semibold">
            CREDITS
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-8 gap-x-8">
            {credits.map((item, index) => (
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

      {/* 🌟 2. スポンサー & 会場 (SPONSORS & VENUE) */}
      {((sponsors && sponsors.length > 0) || venue) && (
        <section className="max-w-6xl mx-auto px-6 sm:px-12 py-16 border-t border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
            
            {/* スポンサー一覧 */}
            {sponsors && sponsors.length > 0 && (
              <div className="md:col-span-8">
                <h2 className="text-xs tracking-widest text-gray-400 uppercase mb-6 font-semibold">
                  SPONSORS & SUPPORTERS
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {sponsors.map((sponsor, index) => (
                    <a
                      key={index}
                      href={sponsor.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between p-3.5 rounded-sm border border-gray-100 hover:border-gray-300 bg-gray-50/50 hover:bg-white transition-all duration-200"
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
            {venue && (
              <div className="md:col-span-4">
                <h2 className="text-xs tracking-widest text-gray-400 uppercase mb-6 font-semibold">
                  VENUE
                </h2>
                <a
                  href={venue.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between p-4 rounded-sm border border-gray-200 bg-gray-900 text-white hover:bg-black transition-all duration-200 shadow-sm"
                >
                  <div>
                    <p className="text-[10px] tracking-widest text-gray-400 uppercase">LOCATION</p>
                    <p className="text-sm font-medium mt-0.5">{venue.name}</p>
                  </div>
                  <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-white shrink-0 ml-2 transition-colors" />
                </a>
              </div>
            )}

          </div>
        </section>
      )}

      {/* 🌟 3. 協力 (COOPERATION) */}
      {cooperation && cooperation.length > 0 && (
        <section className="max-w-6xl mx-auto px-6 sm:px-12 py-16 border-t border-gray-100">
          <h2 className="text-xs tracking-widest text-gray-400 uppercase mb-6 font-semibold">
            COOPERATION
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {cooperation.map((org, index) => {
              const link = org.url || org.linkUrl;
              return link ? (
                <a
                  key={index}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between p-3.5 rounded-sm border border-gray-100 hover:border-gray-300 bg-gray-50/50 hover:bg-white transition-all duration-200"
                >
                  <span className="text-xs font-medium text-gray-800 group-hover:text-black transition-colors">
                    {org.name}
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 text-gray-400 group-hover:text-black shrink-0 ml-2 transition-colors" />
                </a>
              ) : (
                <div key={index} className="p-3.5 rounded-sm border border-gray-100 bg-gray-50/50">
                  <span className="text-xs font-medium text-gray-800">{org.name}</span>
                </div>
              );
            })}
          </div>
        </section>
      )}

    </div>
  );
}