import { Link, useLocation } from 'react-router';
import { Instagram } from 'lucide-react';
import logoImage from '../../imports/logo_cinefile.png';

export function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();

  const navLinks = [
    { to: '/', label: 'HOME', exact: true },
    { to: '/archive', label: 'ARCHIVE' },
    { to: '/media', label: 'MEDIA' },
    { to: '/people', label: 'PEOPLE' },
    { to: '/contact', label: 'CONTACT' },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 py-5 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 hover:opacity-70 transition-opacity">
            <img src={logoImage} alt="CinéFile" className="h-9 w-auto" />
            <span className="text-base tracking-tight">CinéFile</span>
          </Link>
          <nav className="flex gap-7 text-xs tracking-widest items-center">
            {navLinks.map(({ to, label, exact }) => {
              const isActive = exact
                ? location.pathname === to
                : location.pathname.startsWith(to);
              return (
                <Link
                  key={to}
                  to={to}
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
              <Instagram className="w-4 h-4" />
            </a>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main>{children}</main>

      {/* Footer */}
      <footer className="border-t border-gray-200 mt-20">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 py-12">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-8">
            <div className="flex items-center gap-3">
              <img src={logoImage} alt="CinéFile" className="h-8 w-auto" />
              <div>
                <div className="text-sm tracking-tight">CinéFile</div>
                <div className="text-xs text-gray-400 mt-0.5">創作と対話の実験的スペース</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 text-xs text-gray-500">
              <div className="flex gap-6">
                {navLinks.map(({ to, label }) => (
                  <Link key={to} to={to} className="hover:text-gray-900 transition-colors tracking-widest">
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
                  <Instagram className="w-3.5 h-3.5" />
                  Instagram
                </a>
                <span className="text-gray-300">|</span>
                <span className="text-gray-400">© 2026 CinéFile</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
