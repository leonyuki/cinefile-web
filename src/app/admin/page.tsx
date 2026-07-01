"use client";

import { useState, useEffect } from 'react';
import { createMicroCMSPost, getMemberData } from '../../actions/microcmsActions'; // 🌟 getMemberData に変更
import { FileText, Image as ImageIcon, Calendar, User, Loader2, MessageSquare } from 'lucide-react'; 

type PostType = 'news' | 'blog' | 'events' | 'people';

export default function PostAdminPage() {
  const [postType, setPostType] = useState<PostType>('news');
  const [status, setStatus] = useState('');

  const [selectedMember, setSelectedMember] = useState('katsuki');
  const [portfolioMd, setPortfolioMd] = useState('');
  const [description, setDescription] = useState(''); // 🌟 追加：自己紹介文のState
  const [isLoadingMd, setIsLoadingMd] = useState(false);

  useEffect(() => {
    if (postType === 'people') {
      const fetchData = async () => {
        setIsLoadingMd(true);
        const data = await getMemberData(selectedMember);
        setPortfolioMd(data.portfolioMd);
        setDescription(data.description); // 🌟 追加
        setIsLoadingMd(false);
      };
      fetchData();
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
      if (postType !== 'people') form.reset();
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

      <div className="flex flex-wrap sm:flex-nowrap gap-2 mb-10 bg-gray-50 p-1.5 rounded-sm border border-gray-100">
        {(['news', 'blog', 'events', 'people'] as PostType[]).map((type) => (
          <button
            key={type}
            type="button"
            onClick={() => { setPostType(type); setStatus(''); }}
            className={`flex-1 min-w-[80px] py-2.5 text-xs tracking-widest uppercase transition-all rounded-xs font-medium ${
              postType === type ? 'bg-white text-gray-900 shadow-xs border border-gray-100' : 'text-gray-400 hover:text-gray-900'
            }`}
          >
            {type}
          </button>
        ))}
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-8">
        
        {postType === 'people' ? (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div>
              <label className="block text-[10px] tracking-widest text-gray-400 uppercase mb-2 font-semibold">編集するメンバー</label>
              <select
                name="memberId"
                value={selectedMember}
                onChange={(e) => setSelectedMember(e.target.value)}
                required
                className="w-full bg-white border border-gray-200 p-3 text-sm focus:outline-none focus:border-gray-900 rounded-sm cursor-pointer"
              >
                <option value="katsuki">洪 克樹 (Katsuki Kou)</option>
                <option value="miku">外村 未空 (Miku Sotomura)</option>
                <option value="mirika">石田 満理佳 (Mirika Ishida)</option>
              </select>
            </div>
            
            {/* 🌟 100文字自己紹介の入力欄を追加 */}
            <div className="relative">
              <label className="block text-[10px] tracking-widest text-gray-400 uppercase mb-2 font-semibold flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5" /> ABOUT用 自己紹介（100文字程度）
              </label>
              <textarea
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                disabled={isLoadingMd}
                rows={3}
                className="w-full border border-gray-200 p-3 text-sm focus:outline-none focus:border-gray-900 resize-y rounded-sm leading-relaxed disabled:opacity-50 transition-opacity"
                placeholder={isLoadingMd ? "データを取得中..." : "ABOUTページに表示される100文字程度の自己紹介..."}
              />
            </div>

            <div className="relative">
              <label className="block text-[10px] tracking-widest text-gray-400 uppercase mb-2 font-semibold flex items-center gap-1.5">
                <User className="w-3.5 h-3.5" /> Markdown ポートフォリオ本文
                {isLoadingMd && <Loader2 className="w-3.5 h-3.5 animate-spin text-gray-400 ml-2" />}
              </label>
              <textarea
                name="portfolioMd"
                value={portfolioMd}
                onChange={(e) => setPortfolioMd(e.target.value)}
                disabled={isLoadingMd}
                required
                rows={15}
                className="w-full border border-gray-200 p-4 text-sm font-mono text-gray-700 bg-gray-50 focus:bg-white focus:outline-none focus:border-gray-900 resize-y rounded-sm leading-relaxed disabled:opacity-50 transition-opacity"
                placeholder={isLoadingMd ? "データを取得中..." : "# Profile\r\nここにプロフィール文を入力..."}
              />
            </div>
          </div>
        ) : (
          /* ================================
             既存の NEWS / EVENTS 用の入力エリア
             （ここは変更なし）
          ================================= */
          <div className="space-y-8 animate-in fade-in duration-300">
            <div className="grid sm:grid-cols-[2fr_1fr] gap-6">
              <div>
                <label className="block text-[10px] tracking-widest text-gray-400 uppercase mb-2 font-semibold">タイトル</label>
                <input type="text" name="title" required className="w-full border border-gray-200 p-3 text-sm focus:outline-none focus:border-gray-900 rounded-sm" placeholder="タイトルを入力" />
              </div>
              <div>
                <label className="block text-[10px] tracking-widest text-gray-400 uppercase mb-2 font-semibold">
                  {postType === 'events' ? 'サブタイトル / 英題' : 'カテゴリ'}
                </label>
                <input type="text" name={postType === 'events' ? 'subtitle' : 'category'} className="w-full border border-gray-200 p-3 text-sm focus:outline-none focus:border-gray-900 rounded-sm" />
              </div>
            </div>

            {(postType === 'blog' || postType === 'events') && (
              <div className="p-5 border border-dashed border-gray-200 bg-gray-50 rounded-sm">
                <label className="block text-[10px] tracking-widest text-gray-400 uppercase mb-3 font-semibold flex items-center gap-1.5">
                  <ImageIcon className="w-3.5 h-3.5" /> メイン画像 / アイキャッチ
                </label>
                <input type="file" name="image" accept="image/*" required={postType === 'events'} className="text-xs text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-sm file:border-0 file:text-xs file:font-medium file:bg-gray-900 file:text-white hover:file:opacity-80 file:cursor-pointer" />
              </div>
            )}

            {postType === 'events' && (
              <div className="p-6 border border-gray-100 bg-[#faf9f7] rounded-sm space-y-6">
                <p className="text-xs font-medium text-gray-800 border-b border-gray-200 pb-2 flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> イベント詳細メタデータ</p>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div><label className="block text-[10px] tracking-widest text-gray-400 uppercase mb-2">開催年</label><input type="number" name="year" defaultValue={new Date().getFullYear()} required className="w-full bg-white border border-gray-200 p-3 text-sm focus:outline-none focus:border-gray-900 rounded-sm" /></div>
                  <div><label className="block text-[10px] tracking-widest text-gray-400 uppercase mb-2">都市名</label><input type="text" name="city" className="w-full bg-white border border-gray-200 p-3 text-sm focus:outline-none focus:border-gray-900 rounded-sm" /></div>
                </div>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div><label className="block text-[10px] tracking-widest text-gray-400 uppercase mb-2">開催期間</label><input type="text" name="date" required className="w-full bg-white border border-gray-200 p-3 text-sm focus:outline-none focus:border-gray-900 rounded-sm" /></div>
                  <div><label className="block text-[10px] tracking-widest text-gray-400 uppercase mb-2">開催場所</label><input type="text" name="location" required className="w-full bg-white border border-gray-200 p-3 text-sm focus:outline-none focus:border-gray-900 rounded-sm" /></div>
                </div>
                <div>
                  <label className="block text-[10px] tracking-widest text-gray-400 uppercase mb-2">ステータス</label>
                  <select name="status" className="w-full bg-white border border-gray-200 p-3 text-sm focus:outline-none focus:border-gray-900 rounded-sm cursor-pointer">
                    <option value="Past">Past (過去のイベントに配置)</option>
                    <option value="Upcoming">Upcoming (次回予告に配置)</option>
                  </select>
                </div>
              </div>
            )}

            {postType !== 'events' && (
              <div>
                <label className="block text-[10px] tracking-widest text-gray-400 uppercase mb-2 font-semibold">記事の抜粋</label>
                <input type="text" name="excerpt" className="w-full border border-gray-200 p-3 text-sm focus:outline-none focus:border-gray-900 rounded-sm" />
              </div>
            )}

            <div>
              <label className="block text-[10px] tracking-widest text-gray-400 uppercase mb-2 font-semibold flex items-center gap-1.5"><FileText className="w-3.5 h-3.5" /> 本文 / 説明文</label>
              <textarea name={postType === 'events' ? 'description' : 'content'} required rows={12} className="w-full border border-gray-200 p-3 text-sm focus:outline-none focus:border-gray-900 resize-y rounded-sm leading-relaxed" />
            </div>
          </div>
        )}

        <button type="submit" className="w-full py-4 bg-gray-950 text-white text-xs tracking-widest uppercase hover:bg-gray-800 transition-colors rounded-sm font-semibold mt-8">
          {postType === 'people' ? 'ポートフォリオを更新する' : `${postType} として登録・投稿する`}
        </button>

        {status && <div className="text-sm font-medium mt-6 text-center bg-gray-50 py-3 border border-gray-100 rounded-sm animate-pulse">{status}</div>}
      </form>
    </div>
  );
}