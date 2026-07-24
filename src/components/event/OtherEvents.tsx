import Link from 'next/link';
import { OtherEvent } from '../../types/event';

export default function OtherEvents({ events }: { events: OtherEvent[] }) {
  if (!events || events.length === 0) return null;

  return (
    <div className="border-t border-gray-100 bg-[#faf9f7]">
      <div className="max-w-6xl mx-auto px-6 sm:px-12 py-16 sm:py-20">
        <p className="text-xs tracking-widest text-gray-400 uppercase font-semibold mb-8 text-center sm:text-left">
          Other Events
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          {events.map((other) => (
            <Link key={other.id} href={`/archive/${other.id}`} className="group block">
              {/* p-2 を追加して枠との間に少し余白を作り、ポスターを見やすくしています */}
              <div className="w-full aspect-square overflow-hidden bg-white mb-3 rounded-xs border border-gray-200 p-2 flex items-center justify-center">
                <img
                  src={other.image}
                  alt={other.title}
                  // object-cover を object-contain に変更
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="text-xs font-semibold text-gray-900 group-hover:text-gray-600 transition-colors line-clamp-1">
                {other.title}
              </div>
              <div className="text-[10px] text-gray-400 mt-0.5">{other.year}</div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}