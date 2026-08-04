import { MapPin, Calendar, ExternalLink, Ticket } from 'lucide-react';
import { EventData } from '../../types/event';

export default function EventHero({ event }: { event: EventData }) {
  return (
    <div className="max-w-6xl mx-auto px-6 sm:px-12 pb-20">
      <div className="flex flex-col md:flex-row gap-12 lg:gap-20 items-stretch">
        
        {/* 左：ポスター */}
        <div className="w-full md:w-5/12 shrink-0 rounded-sm overflow-hidden shadow-xs bg-gray-50 flex items-center justify-center">
          <img 
            src={event.imageUrl} 
            alt={event.title} 
            // 🌟 object-coverを削除し、h-auto と object-contain に変更しました
            // 縦に長すぎる場合に備えて max-h-[80vh]（画面高さの80%まで）を入れています
            className="w-full h-auto max-h-[80vh] object-contain drop-shadow-sm" 
          />
        </div>

        {/* 右：詳細情報 */}
        <div className="w-full md:w-7/12 space-y-10">
          <div>
            <div className="flex flex-wrap items-center gap-3 text-xs tracking-widest text-gray-400 uppercase mb-4">
              <span className="px-3 py-1 border border-gray-200 bg-gray-50 rounded-sm text-gray-600 font-medium">
                {event.status}
              </span>
              <span>{event.year}</span>
              {event.city && <span>— {event.city}</span>}
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl tracking-tight font-light mb-4 leading-none text-gray-900">
              {event.title}
            </h1>
            {event.subtitle && (
              <p className="text-base sm:text-lg text-gray-500 font-light tracking-wide">
                {event.subtitle}
              </p>
            )}
          </div>

          <div className="grid sm:grid-cols-2 gap-8 pt-8">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-[10px] tracking-widest text-gray-400 uppercase font-semibold">
                <Calendar className="w-4 h-4" /> Date & Time
              </div>
              <div className="font-medium text-gray-900 text-lg">{event.date}</div>
              {event.time && <div className="text-sm text-gray-600">{event.time}</div>}
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-[10px] tracking-widest text-gray-400 uppercase font-semibold">
                <MapPin className="w-4 h-4" /> Venue
              </div>
              <div className="font-medium text-gray-900 text-lg leading-snug">{event.location}</div>
              {event.mapUrl && (
                <a
                  href={event.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-[#1c2b5e] hover:underline inline-flex items-center gap-1 font-medium pt-1"
                >
                  Google マップで見る
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>

          {event.tickets && event.tickets.length > 0 && (
            <div className="bg-[#faf9f7] p-6 sm:p-8 rounded-sm border border-gray-100 space-y-5">
              <div className="flex items-center gap-2 text-[10px] tracking-widest text-gray-400 uppercase font-semibold">
                <Ticket className="w-4 h-4" /> Tickets
              </div>
              <div className="space-y-3">
                {event.tickets.map((t, i) => (
                  <div key={i} className="flex items-baseline justify-between border-b border-gray-200 pb-3 text-sm">
                    <span className="text-gray-700">{t.label}</span>
                    <span className="font-semibold text-gray-900 text-base">{t.price}</span>
                  </div>
                ))}
              </div>
              {event.ticketUrl ? (
                <a
                  href={event.ticketUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-4 text-xs tracking-widest uppercase font-semibold transition-colors rounded-xs mt-2 bg-[#1c2b5e] text-white hover:bg-[#152248]"
                >
                  チケットを購入する (Peatix)
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              ) : (
                <div
                  className="w-full flex items-center justify-center gap-2 py-4 text-xs tracking-widest uppercase font-semibold transition-colors rounded-xs mt-2 bg-gray-200 text-gray-500 cursor-not-allowed"
                >
                  チケット販売 近日公開
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}