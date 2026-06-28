import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-white py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 flex flex-col md:flex-row justify-between items-center gap-6">
        {/* コピーライト */}
        <div className="text-[10px] tracking-widest text-gray-400">
          © {new Date().getFullYear()} CinéFile. All rights reserved.
        </div>

        {/* 🌟 規約とポリシーのリンク */}
        <div className="flex items-center gap-6 text-[10px] tracking-widest text-gray-400">
          <Link href="/terms" className="hover:text-gray-900 transition-colors">
            利用規約
          </Link>
          <Link href="/privacy" className="hover:text-gray-900 transition-colors">
            プライバシーポリシー
          </Link>
        </div>
      </div>
    </footer>
  );
}