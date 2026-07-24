"use client";

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext'; // 🌟 追加

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

export default function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage(); // 🌟 Contextから取得

  // 🌟 ナビゲーションのラベルを日本語と英語の双方に対応
  const navLinks = [
    { href: '/', labelJa: 'HOME', labelEn: 'HOME', exact: true },
    { href: '/about', labelJa: 'ABOUT US', labelEn: 'ABOUT US' },
    { href: '/archive', labelJa: 'ARCHIVE', labelEn: 'ARCHIVE' },
    { href: '/media', labelJa: 'MEDIA', labelEn: 'MEDIA' },
    { href: '/contact', labelJa: 'CONTACT', labelEn: 'CONTACT' },
  ];

  // 🌟 言語切り替えトグルボタンの共通コンポーネント
  const LanguageToggle = () => (
    <div className="flex items-center gap-1.5 text-[10px] tracking-widest font-medium border-l border-gray-200 pl-4 ml-2 md:flex">
      <button
        onClick={() => setLanguage('ja')}
        className={`transition-colors py-1 px-1.5 rounded-xs ${
          language === 'ja' ? 'text-gray-900 font-bold' : 'text-gray-400 hover:text-gray-600'
        }`}
      >
        JP
      </button>
      <span className="text-gray-300">/</span>
      <button
        onClick={() => setLanguage('en')}
        className={`transition-colors py-1 px-1.5 rounded-xs ${
          language === 'en' ? 'text-gray-900 font-bold' : 'text-gray-400 hover:text-gray-600'
        }`}
      >
        EN
      </button>
    </div>
  );

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 py-4 sm:py-5 flex items-center justify-between">
        
        {/* ロゴ部分 */}
        <Link 
          href="/" 
          className="flex items-center gap-3 hover:opacity-70 transition-opacity z-50"
          onClick={() => setIsMenuOpen(false)}
        >
          <img src="/logo_cinefile.png" alt="CinéFile" className="h-8 sm:h-9 w-auto" />
          <span className="text-base tracking-tight">CinéFile</span>
        </Link>

        {/* PC用ナビゲーション */}
        <nav className="hidden md:flex gap-7 text-xs tracking-widest items-center">
          {navLinks.map(({ href, labelJa, labelEn, exact }) => {
            const isActive = exact
              ? pathname === href
              : pathname?.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={`transition-colors ${
                  isActive
                    ? 'text-gray-900 border-b border-gray-900 pb-0.5'
                    : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                {t(labelJa, labelEn)} {/* 🌟 現在の言語に合わせて出し分け */}
              </Link>
            );
          })}
          <a
            href="https://www.instagram.com/cinefile.official/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-gray-900 transition-colors ml-1"
          >
            <InstagramIcon className="w-4 h-4" />
          </a>
          
          {/* 🌟 PC用の言語トグルスイッチを配置 */}
          <LanguageToggle />
        </nav>

        {/* スマホ用ハンバーガーボタン */}
        <button
          className="md:hidden p-2 -mr-2 text-gray-600 z-50 hover:opacity-70 transition-opacity"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* スマホ用展開メニュー */}
      <div
        className={`fixed inset-0 bg-white pt-24 px-8 md:hidden transition-transform duration-300 ease-in-out z-40 ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <nav className="flex flex-col gap-6 text-sm tracking-widest">
          {navLinks.map(({ href, labelJa, labelEn, exact }) => {
            const isActive = exact
              ? pathname === href
              : pathname?.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setIsMenuOpen(false)}
                className={`pb-4 border-b border-gray-100 transition-colors ${
                  isActive ? 'text-gray-900' : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                {t(labelJa, labelEn)} {/* 🌟 スマホメニューも言語出し分け */}
              </Link>
            );
          })}
          
          <div className="flex items-center justify-between pt-2">
            <a
              href="https://www.instagram.com/cinefile.official/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors"
            >
              <InstagramIcon className="w-4 h-4" />
              <span>Instagram</span>
            </a>
            
            {/* 🌟 スマホ用メニュー内にも言語選択トグルを配置 */}
            <div className="scale-110 pr-2">
              <LanguageToggle />
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}