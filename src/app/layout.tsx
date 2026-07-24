import { LanguageProvider } from '../context/LanguageContext';
import Header from '../components/Header'; // 🌟 ヘッダーをインポート
import Footer from '../components/Footer'; // 🌟 フッターを新しくインポート
import './globals.css';

export const metadata = {
  title: 'CinéFile',
  description: '国境を越えた学生主導のアート・カルチャープロジェクト',
  // 🌟 ここにアイコンの設定を追加します
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
      {/* 🌟 修正：bodyを flexbox にし、最低でも画面全体の高さを確保する（フッター浮き上がり防止） */}
      <body className="flex flex-col min-h-screen text-gray-900 bg-white">
        
        {/* 🌟 サイト全体を言語プロバイダーで包みます */}
        <LanguageProvider>
          
          {/* 🌟 画面の一番上に共通ヘッダーを配置 */}
          <Header />
          
          {/* 🌟 メインコンテンツ部分。flex-grow で余白をすべて埋め、フッターを下に押し下げる */}
          <main className="flex-grow">
            {children}
          </main>

          {/* 🌟 全ページ共通のフッターを最下部に配置 */}
          <Footer />
          
        </LanguageProvider>
        
      </body>
    </html>
  );
}