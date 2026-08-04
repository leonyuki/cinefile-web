import { LanguageProvider } from '../context/LanguageContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './globals.css';
import { Montserrat, Zen_Kaku_Gothic_New } from 'next/font/google';

// 🌟 Montserrat（欧文フォント）の設定
const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
});

// 🌟 Zen Kaku Gothic New（和文フォント）の設定
const zenKaku = Zen_Kaku_Gothic_New({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  variable: '--font-zen-kaku',
  display: 'swap',
});

export const metadata = {
  title: 'CinéFile',
  description: '国境を越えた学生主導のアート・カルチャープロジェクト',
  icons: {
    icon: '/icon/android-chrome-192x192.png',
    apple: '/icon/apple-touch-icon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" className={`${montserrat.variable} ${zenKaku.variable}`}>
      <body className="flex flex-col min-h-screen text-gray-900 bg-white">
        <LanguageProvider>
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}