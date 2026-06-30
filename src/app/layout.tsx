import Header from "../components/Header";
import Footer from "../components/Footer";
import AdminMemoTool from "../components/AdminMemoTool"; // 🌟 メモツールをインポート
import "./globals.css";
import type { Metadata, Viewport } from 'next';

export const metadata = {
  title: "CinéFile | アートと映画のコミュニティ",
  description: "CinéFileの公式Webサイトです。",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className="bg-white text-gray-900 flex flex-col min-h-screen">
        <Header />
        
        {/* メインコンテンツ（flex-1で高さを確保し、フッターを下部に押し下げる） */}
        <main className="flex-1">{children}</main>
        
        <Footer />

        {/* 🌟 管理者用メモツールを配置（全ページで右クリックが監視されます） */}
        <AdminMemoTool />
      </body>
    </html>
  );
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};