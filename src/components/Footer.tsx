import Link from 'next/link';

// 追加：Lucideから削除されたInstagramアイコンをSVGで直接作成
const InstagramIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

export default function Footer() {
  const navLinks = [
    { href: '/', label: 'HOME' },
    { href: '/archive', label: 'ARCHIVE' },
    { href: '/media', label: 'MEDIA' },
    { href: '/people', label: 'PEOPLE' },
    { href: '/contact', label: 'CONTACT' },
  ];

  return (
    <footer className="border-t border-gray-200 mt-20">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 py-12">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-8">
          <div className="flex items-center gap-3">
            <img src="/logo_cinefile.png" alt="CinéFile" className="h-8 w-auto" />
            <div>
              <div className="text-sm tracking-tight">CinéFile</div>
              <div className="text-xs text-gray-400 mt-0.5">創作と対話の実験的スペース</div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 text-xs text-gray-500">
            <div className="flex gap-6">
              {navLinks.map(({ href, label }) => (
                <Link key={href} href={href} className="hover:text-gray-900 transition-colors tracking-widest">
                  {label}
                </Link>
              ))}
            </div>
            <div className="flex items-center gap-4">
              <a
                href="https://www.instagram.com/cinefile.official/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-900 transition-colors flex items-center gap-1.5"
              >
                <InstagramIcon className="w-3.5 h-3.5" />
                Instagram
              </a>
              <span className="text-gray-300">|</span>
              <span className="text-gray-400">© 2026 CinéFile</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}