"use client";

import { useState } from 'react';
import { createNewsPost } from '../../../actions/microcmsActions';

export default function PostAdminPage() {
  const [status, setStatus] = useState('');

  // 送信ボタンが押されたときの処理
  // 送信ボタンが押されたときの処理
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('送信中...');

    // 🌟 待機（await）に入る前に、フォームを変数に保存しておく
    const form = e.currentTarget;
    const formData = new FormData(form);
    
    // サーバーへ送信（ここで時間がかかる）
    const result = await createNewsPost(formData);

    if (result.success) {
      setStatus('✅ ' + result.message);
      // 🌟 保存しておいた変数を使ってリセットする
      form.reset();
    } else {
      setStatus('❌ ' + result.message);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-6 py-20">
      <h1 className="text-2xl tracking-tight mb-8">専用投稿ツール</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-xs tracking-widest text-gray-500 mb-2">タイトル</label>
          <input
            type="text"
            name="title"
            required
            className="w-full border border-gray-300 p-3 text-sm focus:outline-none focus:border-gray-900"
            placeholder="記事のタイトル"
          />
        </div>

        <div>
          <label className="block text-xs tracking-widest text-gray-500 mb-2">カテゴリ</label>
          <input
            type="text"
            name="category"
            className="w-full border border-gray-300 p-3 text-sm focus:outline-none focus:border-gray-900"
            placeholder="例：お知らせ / イベント"
          />
        </div>

        <div>
          <label className="block text-xs tracking-widest text-gray-500 mb-2">本文</label>
          <textarea
            name="content"
            required
            rows={10}
            className="w-full border border-gray-300 p-3 text-sm focus:outline-none focus:border-gray-900 resize-none"
            placeholder="ここに本文を入力してください..."
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-[#1c2b5e] text-white text-xs tracking-widest hover:bg-[#152248] transition-colors"
        >
          この記事を投稿する
        </button>

        {status && (
          <p className="text-sm font-medium mt-4 text-center">{status}</p>
        )}
      </form>
    </div>
  );
}