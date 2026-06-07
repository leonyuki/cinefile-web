import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

const inter = Inter({ subsets: ["latin"] });

// サイト全体のメタデータ（SEO設定）
export const metadata: Metadata = {
  title: "CinéFile | アートと映画のコミュニティ",
  description: "CinéFileの公式Webサイトです。イベント情報や過去のアーカイブを発信しています。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      {/* flex と min-h-screen で、コンテンツが少なくてもフッターを最下部に固定する */}
      <body className={`${inter.className} flex min-h-screen flex-col`}>
        <Header />
        
        {/* mainタグが各ページ（page.tsx）のコンテンツに相当します */}
        <main className="flex-1">
          {children}
        </main>
        
        <Footer />
      </body>
    </html>
  );
}