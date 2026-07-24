"use client";

import { useState } from 'react';
import { FileText, Image as ImageIcon, Loader2 } from 'lucide-react';
import { createMicroCMSPost } from '../../actions/microcmsActions';

type Props = {
  postType: 'news' | 'blog';
  refreshMasterData: () => Promise<void>;
};

export default function GeneralArticleTab({ postType, refreshMasterData }: Props) {
  const [status, setStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus('送信中...');
    
    const formData = new FormData(e.currentTarget);
    formData.append('postType', postType);

    const result = await createMicroCMSPost(formData);
    if (result.success) {
      setStatus('✅ ' + result.message);
      e.currentTarget.reset();
      await refreshMasterData();
    } else {
      setStatus('❌ ' + result.message);
    }
    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 animate-in fade-in duration-300">
      <div className="grid sm:grid-cols-[2fr_1fr] gap-6">
        <div>
          <label className="block text-[10px] tracking-widest text-gray-400 uppercase mb-2 font-semibold">タイトル</label>
          <input type="text" name="title" required className="w-full border border-gray-200 p-3 text-sm focus:outline-none focus:border-gray-900 rounded-sm" placeholder="記事のタイトルを入力" />
        </div>
        <div>
          <label className="block text-[10px] tracking-widest text-gray-400 uppercase mb-2 font-semibold">カテゴリ</label>
          <input type="text" name="category" className="w-full border border-gray-200 p-3 text-sm focus:outline-none focus:border-gray-900 rounded-sm" />
        </div>
      </div>

      {postType === 'blog' && (
        <div className="p-5 border border-dashed border-gray-200 bg-gray-50 rounded-sm">
          <label className="block text-[10px] tracking-widest text-gray-400 uppercase mb-3 font-semibold flex items-center gap-1.5"><ImageIcon className="w-3.5 h-3.5" /> メイン画像</label>
          <input type="file" name="image" accept="image/*" required className="text-xs text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-sm file:border-0 file:text-xs file:font-medium file:bg-gray-900 file:text-white hover:file:opacity-80 file:cursor-pointer" />
        </div>
      )}

      <div>
        <label className="block text-[10px] tracking-widest text-gray-400 uppercase mb-2 font-semibold">記事の抜粋・概要</label>
        <input type="text" name="excerpt" className="w-full border border-gray-200 p-3 text-sm focus:outline-none focus:border-gray-900 rounded-sm" placeholder="一覧画面に表示される1行の紹介文" />
      </div>

      <div>
        <label className="block text-[10px] tracking-widest text-gray-400 uppercase mb-2 font-semibold flex items-center gap-1.5"><FileText className="w-3.5 h-3.5" /> 本文 / 説明文</label>
        <textarea name="content" required rows={12} className="w-full border border-gray-200 p-3 text-sm focus:outline-none focus:border-gray-900 resize-y rounded-sm leading-relaxed" placeholder="ここに本文を入力してください..." />
      </div>

      <button type="submit" disabled={isLoading} className="w-full py-4 bg-gray-950 text-white text-xs tracking-widest uppercase hover:bg-gray-800 transition-colors rounded-sm font-semibold disabled:opacity-50">
        {isLoading ? <Loader2 className="w-4 h-4 animate-spin mx-auto" /> : `${postType} として登録・投稿する`}
      </button>
      {status && <div className="text-sm font-medium mt-6 text-center bg-gray-50 py-3 border border-gray-100 rounded-sm">{status}</div>}
    </form>
  );
}