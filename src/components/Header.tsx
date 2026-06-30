"use client";

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react'; // ハンバーガーメニューのアイコン用に追加

// 削除されたInstagramアイコンをSVGで直接作成
const InstagramIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

export default function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false); // スマホメニューの開閉状態を管理

  const navLinks = [
    { href: '/', label: 'HOME', exact: true },
    { href: '/archive', label: 'ARCHIVE' },
    { href: '/media', label: 'MEDIA' },
    { href: '/people', label: 'PEOPLE' },
    { href: '/contact', label: 'CONTACT' },
  ];

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

        {/* PC用ナビゲーション (画面幅 md 以上で表示) */}
        <nav className="hidden md:flex gap-7 text-xs tracking-widest items-center">
          {navLinks.map(({ href, label, exact }) => {
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
                {label}
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
        </nav>

        {/* スマホ用ハンバーガーボタン (画面幅 md 未満で表示) */}
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
          {navLinks.map(({ href, label, exact }) => {
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
                {label}
              </Link>
            );
          })}
          {/* スマホメニュー内のInstagramリンク */}
          <a
            href="https://www.instagram.com/cinefile.official/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors pt-2"
          >
            <InstagramIcon className="w-4 h-4" />
            <span>Instagram</span>
          </a>
        </nav>
      </div>
    </header>
  );
}