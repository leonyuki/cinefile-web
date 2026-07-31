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
              {/* 🌟 relative を追加してオーバーレイの基準位置にしました */}
              <div className="w-full aspect-square overflow-hidden bg-white mb-3 rounded-xs border border-gray-200 p-2 flex items-center justify-center relative">
                <img
                  src={other.image}
                  alt={other.title}
                  // object-cover を object-contain に変更
                  // 🚨 修正: 拡大アニメーション (group-hover:scale-105 等) を削除
                  className="w-full h-full object-contain"
                />
                {/* 追加: ホバー時に表示されるグレーのオーバーレイ */}
                <div className="absolute inset-0 bg-gray-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
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