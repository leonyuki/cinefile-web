"use client";

import { useState, useEffect } from 'react';
// 🌟 修正：新しく作った getMemberPortfolio も読み込む
import { createMicroCMSPost, getMemberPortfolio } from '../../actions/microcmsActions';
import { FileText, Image as ImageIcon, Calendar, User, Loader2 } from 'lucide-react'; 

type PostType = 'news' | 'blog' | 'events' | 'people';

export default function PostAdminPage() {
  const [postType, setPostType] = useState<PostType>('news');
  const [status, setStatus] = useState('');

  // 🌟 追加：PEOPLE用の状態管理（選択中のメンバー、取得したテキスト、ローディング状態）
  const [selectedMember, setSelectedMember] = useState('katsuki');
  const [portfolioMd, setPortfolioMd] = useState('');
  const [isLoadingMd, setIsLoadingMd] = useState(false);

  // 🌟 追加：メンバーが変わった時、またはPEOPLEタブが開かれた時にデータを取得する
  useEffect(() => {
    if (postType === 'people') {
      const fetchMarkdown = async () => {
        setIsLoadingMd(true); // ロード中アニメーション開始
        const mdText = await getMemberPortfolio(selectedMember);
        setPortfolioMd(mdText);
        setIsLoadingMd(false); // ロード完了
      };
      fetchMarkdown();
    }
  }, [postType, selectedMember]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('送信中...');

    const form = e.currentTarget;
    const formData = new FormData(form);
    
    formData.append('postType', postType);

    const result = await createMicroCMSPost(formData);

    if (result.success) {
      setStatus('✅ ' + result.message);
      if (postType !== 'people') {
        form.reset();
      }
    } else {
      setStatus('❌ ' + result.message);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-12 sm:py-20 bg-white">
      <div className="mb-10 border-b border-gray-100 pb-6">
        <p className="text-[10px] tracking-widest text-gray-400 mb-2">DASHBOARD</p>
        <h1 className="text-2xl tracking-tight text-gray-900">CinéFile 専用管理ツール</h1>
      </div>

      {/* 投稿タイプを切り替える上部タブ */}
      <div className="flex flex-wrap sm:flex-nowrap gap-2 mb-10 bg-gray-50 p-1.5 rounded-sm border border-gray-100">
        {(['news', 'blog', 'events', 'people'] as PostType[]).map((type) => (
          <button
            key={type}
            type="button"
            onClick={() => {
              setPostType(type);
              setStatus('');
            }}
            className={`flex-1 min-w-[80px] py-2.5 text-xs tracking-widest uppercase transition-all rounded-xs font-medium ${
              postType === type
                ? 'bg-white text-gray-900 shadow-xs border border-gray-100'
                : 'text-gray-400 hover:text-gray-900'
            }`}
          >
            {type}
          </button>
        ))}
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* PEOPLE（ポートフォリオ編集）用の入力エリア */}
        {postType === 'people' ? (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div>
              <label className="block text-[10px] tracking-widest text-gray-400 uppercase mb-2 font-semibold">編集するメンバー</label>
              <select
                name="memberId"
                value={selectedMember} // 🌟 状態と紐付け
                onChange={(e) => setSelectedMember(e.target.value)} // 🌟 切り替え時に状態を更新
                required
                className="w-full bg-white border border-gray-200 p-3 text-sm focus:outline-none focus:border-gray-900 rounded-sm cursor-pointer"
              >
                <option value="katsuki">洪 克樹 (Katsuki Kou)</option>
                <option value="miku">外村 未空 (Miku Sotomura)</option>
                <option value="mirika">石田 満理佳 (Mirika Ishida)</option>
              </select>
            </div>
            
            <div className="relative">
              <label className="block text-[10px] tracking-widest text-gray-400 uppercase mb-2 font-semibold flex items-center gap-1.5">
                <User className="w-3.5 h-3.5" /> Markdown ポートフォリオ本文
                {/* 🌟 ロード中アイコンの表示 */}
                {isLoadingMd && <Loader2 className="w-3.5 h-3.5 animate-spin text-gray-400 ml-2" />}
              </label>
              <textarea
                name="portfolioMd"
                value={portfolioMd} // 🌟 取得したデータをセット
                onChange={(e) => setPortfolioMd(e.target.value)} // 🌟 手打ちで編集できるようにする
                disabled={isLoadingMd} // ロード中は編集不可にする
                required
                rows={20}
                className="w-full border border-gray-200 p-4 text-sm font-mono text-gray-700 bg-gray-50 focus:bg-white focus:outline-none focus:border-gray-900 resize-y rounded-sm leading-relaxed disabled:opacity-50 transition-opacity"
                placeholder={isLoadingMd ? "データを取得中..." : "# Profile\r\nここにプロフィール文を入力..."}
              />
            </div>
          </div>
        ) : (
          /* NEWS / BLOG / EVENTS 用の通常の入力エリア */
          <div className="space-y-8 animate-in fade-in duration-300">
            {/* 共通基本情報 */}
            <div className="grid sm:grid-cols-[2fr_1fr] gap-6">
              <div>
                <label className="block text-[10px] tracking-widest text-gray-400 uppercase mb-2 font-semibold">タイトル</label>
                <input
                  type="text"
                  name="title"
                  required
                  className="w-full border border-gray-200 p-3 text-sm focus:outline-none focus:border-gray-900 rounded-sm"
                  placeholder={`${postType === 'events' ? 'イベント名を入力' : '記事のタイトルを入力'}`}
                />
              </div>

              <div>
                <label className="block text-[10px] tracking-widest text-gray-400 uppercase mb-2 font-semibold">
                  {postType === 'events' ? 'サブタイトル / 英題' : 'カテゴリ'}
                </label>
                <input
                  type="text"
                  name={postType === 'events' ? 'subtitle' : 'category'}
                  className="w-full border border-gray-200 p-3 text-sm focus:outline-none focus:border-gray-900 rounded-sm"
                  placeholder={postType === 'events' ? '例: Blur / Stir' : '例: お知らせ, 展示'}
                />
              </div>
            </div>

            {/* 画像アップロード欄（BLOG/EVENTSのみ） */}
            {(postType === 'blog' || postType === 'events') && (
              <div className="p-5 border border-dashed border-gray-200 bg-gray-50 rounded-sm">
                <label className="block text-[10px] tracking-widest text-gray-400 uppercase mb-3 font-semibold flex items-center gap-1.5">
                  <ImageIcon className="w-3.5 h-3.5" /> メイン画像 / アイキャッチ
                </label>
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  required={postType === 'events'}
                  className="text-xs text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-sm file:border-0 file:text-xs file:font-medium file:bg-gray-900 file:text-white hover:file:opacity-80 file:cursor-pointer"
                />
                <p className="text-[10px] text-gray-400 mt-2">※png, jpg, webp形式の画像を選択してください。</p>
              </div>
            )}

            {/* イベント詳細メタデータ（EVENTSのみ） */}
            {postType === 'events' && (
              <div className="p-6 border border-gray-100 bg-[#faf9f7] rounded-sm space-y-6">
                <p className="text-xs font-medium text-gray-800 border-b border-gray-200 pb-2 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" /> イベント詳細メタデータ
                </p>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] tracking-widest text-gray-400 uppercase mb-2">開催年（数値）</label>
                    <input
                      type="number"
                      name="year"
                      defaultValue={new Date().getFullYear()}
                      required
                      className="w-full bg-white border border-gray-200 p-3 text-sm focus:outline-none focus:border-gray-900 rounded-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] tracking-widest text-gray-400 uppercase mb-2">都市名（英語表記）</label>
                    <input
                      type="text"
                      name="city"
                      placeholder="例: Tokyo, Copenhagen"
                      className="w-full bg-white border border-gray-200 p-3 text-sm focus:outline-none focus:border-gray-900 rounded-sm"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] tracking-widest text-gray-400 uppercase mb-2">開催期間（表示用テキスト）</label>
                    <input
                      type="text"
                      name="date"
                      placeholder="例: 2026.06.28 - 07.02"
                      required
                      className="w-full bg-white border border-gray-200 p-3 text-sm focus:outline-none focus:border-gray-900 rounded-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] tracking-widest text-gray-400 uppercase mb-2">具体的な開催場所</label>
                    <input
                      type="text"
                      name="location"
                      placeholder="例: 無印良品板橋南町22店"
                      required
                      className="w-full bg-white border border-gray-200 p-3 text-sm focus:outline-none focus:border-gray-900 rounded-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] tracking-widest text-gray-400 uppercase mb-2">ステータス</label>
                  <select
                    name="status"
                    className="w-full bg-white border border-gray-200 p-3 text-sm focus:outline-none focus:border-gray-900 rounded-sm cursor-pointer"
                  >
                    <option value="Past">Past (過去のイベントに配置)</option>
                    <option value="Upcoming">Upcoming (次回予告に配置)</option>
                  </select>
                </div>
              </div>
            )}

            {/* 抜粋 (NEWS/BLOG用) */}
            {postType !== 'events' && (
              <div>
                <label className="block text-[10px] tracking-widest text-gray-400 uppercase mb-2 font-semibold">記事の抜粋・概要</label>
                <input
                  type="text"
                  name="excerpt"
                  className="w-full border border-gray-200 p-3 text-sm focus:outline-none focus:border-gray-900 rounded-sm"
                  placeholder="一覧画面に表示される1行の紹介文"
                />
              </div>
            )}

            {/* 本文 (NEWS/BLOG/EVENTS用) */}
            <div>
              <label className="block text-[10px] tracking-widest text-gray-400 uppercase mb-2 font-semibold flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5" /> 本文 / 説明文
              </label>
              <textarea
                name={postType === 'events' ? 'description' : 'content'}
                required
                rows={12}
                className="w-full border border-gray-200 p-3 text-sm focus:outline-none focus:border-gray-900 resize-y rounded-sm leading-relaxed"
                placeholder={
                  postType === 'events'
                    ? 'イベントの解説文を入力してください...'
                    : 'ここに本文を入力してください（microCMS側がリッチエディタの場合、改行は反映されます）...'
                }
              />
            </div>
          </div>
        )}

        {/* 送信ボタン */}
        <button
          type="submit"
          className="w-full py-4 bg-gray-950 text-white text-xs tracking-widest uppercase hover:bg-gray-800 transition-colors rounded-sm font-semibold mt-8"
        >
          {postType === 'people' ? 'ポートフォリオを更新する' : `${postType} として登録・投稿する`}
        </button>

        {status && (
          <div className="text-sm font-medium mt-6 text-center bg-gray-50 py-3 border border-gray-100 rounded-sm animate-pulse">
            {status}
          </div>
        )}
      </form>
    </div>
  );
}