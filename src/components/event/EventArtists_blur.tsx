'use client';

import { useState } from 'react';
import { Artist } from '../../types/event';
import { X } from 'lucide-react';

export default function EventArtists({ artists }: { artists?: Artist[] }) {
  const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null);

  if (!artists || artists.length === 0) return null;

  return (
    <section className="max-w-6xl mx-auto px-6 sm:px-12 py-20 sm:py-28">
      <div className="mb-12 text-center">
        <h3 className="text-xs tracking-widest text-gray-400 uppercase font-semibold">
          Participating Artists
        </h3>
      </div>
      
      {/* 1. タイル（グリッド）一覧 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-12">
        {artists.map((artist, index) => (
          <div 
            key={index}
            onClick={() => setSelectedArtist(artist)}
            className="cursor-pointer group flex flex-col"
          >
            {/* 写真 */}
            <div className="w-full aspect-[4/5] bg-gray-100 overflow-hidden rounded-lg mb-5 relative">
              {artist.members[0]?.imageUrl && (
                <img 
                  src={artist.members[0].imageUrl} 
                  alt={artist.members[0].name}
                  className="w-full h-full object-cover"
                />
              )}
              {/* 追加: ホバー時に表示されるグレーのオーバーレイ */}
              <div className="absolute inset-0 bg-gray-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </div>

            {/* アーティスト名 */}
            <div className="flex flex-wrap items-center gap-y-1 mb-1">
              {artist.members.map((member, mIndex) => (
                <span key={mIndex} className="inline-flex items-center">
                  {mIndex > 0 && <span className="text-gray-400 mx-1 font-light">×</span>}
                  <span className="text-lg font-semibold text-gray-900 group-hover:text-gray-500 transition-colors">
                    {member.name}
                  </span>
                </span>
              ))}
            </div>

            {/* 作品名 */}
            <h4 className="text-sm text-gray-500 font-medium">
              「{artist.workTitle}」
            </h4>

            {/* 🌟 協力者の名前（タイルの下部） */}
            {artist.collaborators && artist.collaborators.length > 0 && (
              <div className="mt-3 space-y-1">
                {artist.collaborators.map((collab, cIndex) => (
                  <p key={cIndex} className="text-xs text-gray-400">
                    {collab.role && <span className="mr-1">{collab.role}:</span>}
                    {collab.name}
                  </p>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* 2. モーダル（詳細画面） */}
      {selectedArtist && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/40 backdrop-blur-sm transition-opacity"
          onClick={() => setSelectedArtist(null)}
        >
          <div 
            className="bg-white w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-2xl shadow-2xl relative flex flex-col md:flex-row"
            onClick={(e) => e.stopPropagation()}
          >
            {/* 閉じるボタン */}
            <button 
              onClick={() => setSelectedArtist(null)}
              className="absolute top-4 right-4 z-10 p-2 bg-white/80 md:bg-gray-100/50 hover:bg-gray-200 rounded-full text-gray-500 hover:text-gray-900 transition-colors backdrop-blur"
            >
              <X className="w-5 h-5" />
            </button>

            {/* 左側：写真 */}
            {selectedArtist.members[0]?.imageUrl && (
              <div className="w-full md:w-2/5 h-64 md:h-auto bg-gray-100 flex-shrink-0">
                <img 
                  src={selectedArtist.members[0].imageUrl} 
                  alt={selectedArtist.members[0].name}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* 右側：詳細テキスト */}
            <div className="flex-1 overflow-y-auto p-6 sm:p-10">
              
              <div className="mb-8 pr-8">
                <div className="flex flex-wrap items-center gap-y-1 mb-2">
                  {selectedArtist.members.map((member, mIndex) => (
                    <span key={mIndex} className="inline-flex items-center">
                      {mIndex > 0 && <span className="text-gray-400 mx-1 font-light">×</span>}
                      <span className="text-2xl font-semibold text-gray-900">
                        {member.name}
                      </span>
                    </span>
                  ))}
                </div>
                <h4 className="text-lg text-gray-500 font-medium">
                  「{selectedArtist.workTitle}」
                </h4>
              </div>

              <h5 className="text-xs tracking-widest text-gray-400 mb-6 uppercase font-semibold">
                Description
              </h5>
              {selectedArtist.workDescription && (
                <div className="space-y-8">
                  {/* 作品の詳細 */}
                  <div className="space-y-4">
                    {/* 🌟 修正箇所：?.split に変更し、型エラーを完全に防止 */}
                    {selectedArtist.workDescription?.split('\n\n').map((para, i) => (
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
              )}

                {/* 協力者（クレジット名のみのリスト） */}
                {selectedArtist.collaborators && (
                  <div className="pt-6 border-t border-gray-100">
                    <h5 className="text-xs tracking-widest text-gray-400 mb-4 uppercase font-semibold">
                      Credits / Cooperation
                    </h5>
                    <div className="space-y-2 text-sm text-gray-500 leading-relaxed">
                      {selectedArtist.collaborators.map((collab, i) => (
                        <p key={i}>
                          {collab.role && <span className="mr-2">{collab.role}:</span>}
                          {collab.name}
                        </p>
                      ))}
                    </div>
                  </div>
                )}

                {/* メインアーティストのプロフィール */}
                {selectedArtist.members.some(m => m.profile) && (
                  <div className="pt-6 border-t border-gray-100 space-y-6">
                    <h5 className="text-xs tracking-widest text-gray-400 uppercase font-semibold">
                      Artist Profile
                    </h5>
                    {selectedArtist.members.map((member, mIndex) => 
                      member.profile ? (
                        <div key={mIndex}>
                          <p className="text-sm font-semibold text-gray-900 mb-2">{member.name}</p>
                          <div className="space-y-2 text-sm text-gray-600 leading-relaxed">
                            {member.profile?.split('\n').map((line, i) => (
                              <p key={i}>{line}</p>
                            ))}
                          </div>
                        </div>
                      ) : null
                    )}
                  </div>
                )}

                {/* 🌟 協力者のプロフィール */}
                {selectedArtist.collaborators && selectedArtist.collaborators.some(c => c.profile) && (
                  <div className="pt-6 border-t border-gray-100 space-y-6">
                    <h5 className="text-xs tracking-widest text-gray-400 uppercase font-semibold">
                      Collaborator Profile
                    </h5>
                    {selectedArtist.collaborators.map((collab, cIndex) => 
                      collab.profile ? (
                        <div key={cIndex}>
                          <p className="text-sm font-semibold text-gray-900 mb-2">
                            {collab.name}
                            {collab.role && <span className="text-gray-400 text-xs font-normal ml-2">({collab.role})</span>}
                          </p>
                          <div className="space-y-2 text-sm text-gray-600 leading-relaxed">
                            {collab.profile?.split('\n').map((line, i) => (
                              <p key={i}>{line}</p>
                            ))}
                          </div>
                        </div>
                      ) : null
                    )}
                  </div>
                )}

              </div>
            </div>
          </div>
      )}
    </section>
  );
}