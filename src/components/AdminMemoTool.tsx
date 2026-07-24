"use client";

import { useState, useEffect, MouseEvent } from 'react';
import { saveMemoToGoogleSheets } from '../actions/memoActions';

// クリックされた要素の固有パス（CSSセレクタ）を生成する関数
const getCssPath = (el: Element | null): string => {
  if (!el || !(el instanceof Element)) return '';
  const path: string[] = [];
  
  while (el.nodeType === Node.ELEMENT_NODE) {
    let selector = el.nodeName.toLowerCase();
    
    if (el.id) {
      selector += `#${el.id}`;
      path.unshift(selector);
      break; // IDは一意なのでここで探索終了
    } else {
      let sibling = el;
      let nth = 1;
      while ((sibling = sibling.previousElementSibling as Element) !== null) {
        if (sibling.nodeName.toLowerCase() === selector) nth++;
      }
      if (nth !== 1) selector += `:nth-of-type(${nth})`;
    }
    path.unshift(selector);
    el = el.parentNode as Element;
  }
  return path.join(' > ');
};

export default function AdminMemoTool() {
  const [isOpen, setIsOpen] = useState(false);
  const [targetPath, setTargetPath] = useState('');
  const [memoText, setMemoText] = useState('');
  const [position, setPosition] = useState({ x: 0, y: 0 });

  // 画面全体の右クリックイベントをフック
  useEffect(() => {
    const handleContextMenu = (e: globalThis.MouseEvent) => {
      // 特定のキー（例：CtrlキーやCmdキー）を押しながら右クリックした時だけ発火させる等も可能
      e.preventDefault(); 
      
      const target = e.target as Element;
      const path = getCssPath(target);
      
      setTargetPath(path);
      setPosition({ x: e.clientX, y: e.clientY });
      setIsOpen(true);
    };

    document.addEventListener('contextmenu', handleContextMenu);
    return () => document.removeEventListener('contextmenu', handleContextMenu);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const memoData = {
      path: targetPath,
      text: memoText,
      url: window.location.pathname,
      createdAt: new Date().toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' }) // 日本時間で整形
    };

    // 🌟 Googleスプレッドシートへの送信処理を実行
    const result = await saveMemoToGoogleSheets(memoData);

    if (result.success) {
      alert('✅ 修正メモをスプレッドシートに記録しました');
    } else {
      alert('❌ エラー: ' + result.message);
    }

    setIsOpen(false);
    setMemoText('');
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed z-50 bg-white shadow-xl border border-gray-200 p-4 rounded-md w-72"
      style={{ top: position.y, left: position.x }}
    >
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-xs font-bold tracking-widest text-[#1c2b5e]">ADD MEMO</h3>
        <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-gray-900">×</button>
      </div>
      
      <p className="text-[10px] text-gray-400 mb-2 truncate" title={targetPath}>
        Target: {targetPath}
      </p>

      <form onSubmit={handleSubmit}>
        <textarea
          value={memoText}
          onChange={(e) => setMemoText(e.target.value)}
          required
          rows={3}
          className="w-full border border-gray-300 p-2 text-sm focus:outline-none focus:border-[#1c2b5e] resize-none mb-3"
          placeholder="修正指示を入力..."
        />
        <button 
          type="submit"
          className="w-full py-2 bg-[#1c2b5e] text-white text-xs tracking-widest hover:bg-[#152248] transition-colors"
        >
          保存
        </button>
      </form>
    </div>
  );
}