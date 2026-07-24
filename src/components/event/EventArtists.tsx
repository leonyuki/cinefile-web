import Link from 'next/link';
import { Artist } from '../../types/event';

export default function EventArtists({ artists }: { artists?: Artist[] }) {
  if (!artists || artists.length === 0) return null;

  return (
    <section className="max-w-5xl mx-auto px-6 sm:px-12 py-20 sm:py-28">
      <div className="mb-12 text-center">
        <h3 className="text-xs tracking-widest text-gray-400 uppercase font-semibold">
          Participating Artists
        </h3>
      </div>
      <div className="divide-y divide-gray-100">
        {artists.map((artist, index) => (
          <div key={index} className="py-10 grid sm:grid-cols-[200px_1fr] gap-8 items-start">
            
            {/* ナンバリング＆アーティスト名 */}
            <div>
              <div className="text-4xl font-light text-gray-200 mb-2 tabular-nums">
                {String(index + 1).padStart(2, '0')}
              </div>
              <div className="text-xs tracking-wider text-[#1c2b5e] font-medium mb-1.5">
                {artist.role}
              </div>
              
              {/* 複数人対応のメンバー一覧 */}
              <div className="flex flex-wrap items-center gap-y-1">
                {artist.members.map((member, mIndex) => (
                  <span key={mIndex} className="inline-flex items-center">
                    {/* 2人目以降の前に「×」を表示 */}
                    {mIndex > 0 && <span className="text-gray-400 mx-1.5 font-light">×</span>}
                    
                    {member.slug ? (
                      <Link
                        href={`/people/${member.slug}`}
                        className="text-lg font-semibold text-gray-900 hover:underline inline-flex items-center gap-1 group"
                      >
                        {member.name}
                        <span className="text-xs text-[#1c2b5e] group-hover:translate-x-0.5 transition-transform">↗</span>
                      </Link>
                    ) : (
                      <span className="text-lg font-semibold text-gray-900">{member.name}</span>
                    )}
                  </span>
                ))}
              </div>
            </div>

            {/* 作品情報 */}
            <div>
              <h4 className="text-xl font-medium tracking-tight text-gray-900 mb-4">
                「{artist.workTitle}」
              </h4>
              <div className="space-y-4">
                {artist.workDescription.split('\n\n').map((para, i) => (
                  <p
                    key={i}
                    className={`leading-relaxed whitespace-pre-line ${
                      i === 0
                        ? 'text-sm text-gray-500 border-l-2 border-gray-200 pl-4 italic'
                        : 'text-base text-gray-700'
                    }`}
                  >
                    {para}
                  </p>
                ))}
              </div>
            </div>
            
          </div>
        ))}
      </div>
    </section>
  );
}