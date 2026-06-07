import Link from 'next/link';

export default function Header() {
  return (
    {/* スクロール時に上部に固定（sticky）し、背景を半透明のすりガラス状（backdrop-blur）にする */}
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        {/* ロゴ部分 */}
        <Link href="/" className="text-2xl font-bold tracking-tighter">
          CinéFile
        </Link>
        
        {/* PC向けナビゲーション（スマホサイズでは非表示: hidden md:flex） */}
        <nav className="hidden space-x-6 text-sm font-medium text-gray-600 md:flex">
          <Link href="/about" className="transition-colors hover:text-black">About</Link>
          <Link href="/events" className="transition-colors hover:text-black">Events</Link>
          <Link href="/archive" className="transition-colors hover:text-black">Archive</Link>
          <Link href="/sponsor" className="transition-colors hover:text-black">Sponsor</Link>
        </nav>
      </div>
    </header>
  );
}