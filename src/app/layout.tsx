import { LanguageProvider } from '../context/LanguageContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FontSwitcher from '../components/FontSwitcher'; // 🌟 フォント切り替えツールをインポート
import './globals.css';
import { Shippori_Antique_B1 } from 'next/font/google';

const shippori = Shippori_Antique_B1({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-shippori',
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
    <html lang="ja">
      <body className={`flex flex-col min-h-screen text-gray-900 bg-white ${shippori.variable}`}>
        
        {/* 🌟 サイト全体を言語プロバイダーで包みます */}
        <LanguageProvider>
          
          {/* 🌟 画面の一番上に共通ヘッダーを配置 */}
          <Header />
          
          {/* 🌟 メインコンテンツ部分 */}
          <main className="flex-grow">
            {children}
          </main>

          {/* 🌟 全ページ共通のフッター */}
          <Footer />

          {/* 🌟 フォント比較ツール（画面右下に固定表示されます） */}
          <FontSwitcher />
          
        </LanguageProvider>
        
      </body>
    </html>
  );
}