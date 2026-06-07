import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 py-8 text-gray-300">
      <div className="container mx-auto flex flex-col items-center justify-between px-6 md:flex-row">
        <p className="text-sm">
          © {new Date().getFullYear()} CinéFile. All rights reserved.
        </p>
        
        <div className="mt-4 flex space-x-6 md:mt-0">
          <Link href="/contact" className="text-sm transition-colors hover:text-white">Contact</Link>
          <Link href="#" className="text-sm transition-colors hover:text-white">X (Twitter)</Link>
          <Link href="#" className="text-sm transition-colors hover:text-white">Instagram</Link>
        </div>
      </div>
    </footer>
  );
}