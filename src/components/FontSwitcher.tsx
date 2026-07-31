"use client";

import { useState } from 'react';
import { Type, Check } from 'lucide-react';

// 🌟 試したいフォント構成の定義
const FONT_OPTIONS = [
  {
    id: 'default',
    name: 'デフォルト（標準）',
    fontFamily: 'inherit',
  },
  {
    id: 'combo-1',
    name: 'Montserrat × Zen Kaku Gothic New',
    fontFamily: "'Montserrat', 'Zen Kaku Gothic New', sans-serif",
    googleFont: 'Montserrat:wght@300;400;500;600;700&family=Zen+Kaku+Gothic+New:wght@300;400;500;700',
  },
  {
    id: 'combo-2',
    name: 'Inter × Noto Sans JP',
    fontFamily: "'Inter', 'Noto Sans JP', sans-serif",
    googleFont: 'Inter:wght@300;400;500;600;700&family=Noto+Sans+JP:wght@300;400;500;700',
  },
];

export default function FontSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFont, setSelectedFont] = useState('default');

  const handleSelectFont = (font: typeof FONT_OPTIONS[number]) => {
    setSelectedFont(font.id);

    // Google Font の動的読み込み
    if (font.googleFont) {
      const linkId = `google-font-${font.id}`;
      if (!document.getElementById(linkId)) {
        const link = document.createElement('link');
        link.id = linkId;
        link.rel = 'stylesheet';
        link.href = `https://fonts.googleapis.com/css2?family=${font.googleFont}&display=swap`;
        document.head.appendChild(link);
      }
    }

    // body全体のフォントを一括反映
    if (font.fontFamily === 'inherit') {
      document.body.style.fontFamily = '';
    } else {
      document.body.style.fontFamily = font.fontFamily;
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* トグルボタン */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-gray-900 text-white px-4 py-3 rounded-full shadow-2xl hover:bg-gray-800 transition-all border border-gray-700 text-xs tracking-wider"
      >
        <Type className="w-4 h-4 text-amber-400" />
        <span className="font-medium">フォント切り替え</span>
      </button>

      {/* ドロップダウンメニュー */}
      {isOpen && (
        <div className="absolute bottom-14 right-0 w-80 bg-white border border-gray-200 rounded-lg shadow-2xl p-3 z-50">
          <div className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest px-3 py-2 border-b border-gray-100 mb-1">
            Font Combinations
          </div>
          <div className="space-y-1">
            {FONT_OPTIONS.map((font) => {
              const isSelected = selectedFont === font.id;
              return (
                <button
                  key={font.id}
                  onClick={() => handleSelectFont(font)}
                  className={`w-full text-left px-3 py-2.5 rounded-md text-xs transition-all flex items-center justify-between ${
                    isSelected
                      ? 'bg-gray-900 text-white font-medium'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <span style={{ fontFamily: font.fontFamily }}>{font.name}</span>
                  {isSelected && <Check className="w-3.5 h-3.5 text-amber-400 shrink-0 ml-2" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}