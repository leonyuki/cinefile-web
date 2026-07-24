"use client";

import { useState } from 'react';
import { loginWithUsername } from '../../../actions/authActions'; // 階層に合わせて調整してください

export default function LoginPage() {
  const [status, setStatus] = useState('');

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('ログイン中...');
    
    try {
      const formData = new FormData(e.currentTarget);
      const result = await loginWithUsername(formData);

      if (result.success) {
        setStatus('✅ ログイン成功！管理画面へ移動します...');
        // 🌟 修正：ルーターを使わず、確実な遷移とクッキーの再読み込みを行うためにブラウザの標準機能で遷移させる
        window.location.href = '/admin';
      } else {
        setStatus('❌ ' + result.message);
      }
    } catch (error: any) {
      console.error(error);
      setStatus('❌ フロントエンドでエラーが発生しました');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form onSubmit={handleLogin} className="bg-white p-8 border border-gray-100 rounded-sm w-full max-w-sm space-y-6 shadow-sm">
        <h1 className="text-xl tracking-tight text-gray-900">ログイン</h1>
        
        <div>
          <label className="block text-[10px] tracking-widest text-gray-400 uppercase mb-2 font-semibold">ユーザーネーム</label>
          <input 
            name="username" 
            type="text" 
            required 
            className="w-full border border-gray-200 p-3 text-sm focus:outline-none focus:border-gray-900 rounded-sm bg-gray-50/50" 
          />
        </div>

        <div>
          <label className="block text-[10px] tracking-widest text-gray-400 uppercase mb-2 font-semibold">パスワード</label>
          <input 
            name="password" 
            type="password" 
            required 
            className="w-full border border-gray-200 p-3 text-sm focus:outline-none focus:border-gray-900 rounded-sm bg-gray-50/50" 
          />
        </div>

        <button 
          type="submit" 
          className="w-full py-3.5 bg-gray-900 text-white text-xs tracking-widest uppercase hover:bg-gray-800 transition-colors rounded-sm font-medium mt-2"
        >
          ログイン
        </button>

        {status && (
          <p className={`text-center text-xs font-medium mt-4 ${status.includes('❌') ? 'text-red-500' : 'text-gray-900'}`}>
            {status}
          </p>
        )}
      </form>
    </div>
  );
}