import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 sm:px-12 py-16 sm:py-24">
      <Link
        href="/"
        className="inline-flex items-center text-xs tracking-widest text-gray-400 hover:text-gray-900 mb-12 transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5 mr-2" />
        BACK TO HOME
      </Link>

      <h1 className="text-2xl sm:text-3xl tracking-tight mb-12">利用規約</h1>

      <div className="prose prose-gray max-w-none text-sm text-gray-600 leading-relaxed space-y-8">
        <section>
          <h2 className="text-base font-medium text-gray-900 mb-3">第1条（適用）</h2>
          <p>
            本利用規約（以下、「本規約」といいます。）は、CinéFile（以下、「当団体」といいます。）が提供するウェブサイトおよび関連サービス（以下、「本サービス」といいます。）の利用条件を定めるものです。
          </p>
        </section>
        
        {/* 必要に応じて規約の条文をここに追加していきます */}
        <section>
          <h2 className="text-base font-medium text-gray-900 mb-3">第2条（禁止事項）</h2>
          <p>
            ユーザーは、本サービスの利用にあたり、以下の行為をしてはなりません。
            <br />
            1. 法令または公序良俗に違反する行為
            <br />
            2. 犯罪行為に関連する行為
            <br />
            3. 当団体、本サービスの他のユーザー、または第三者のサーバーまたはネットワークの機能を破壊したり、妨害したりする行為
          </p>
        </section>
      </div>
    </div>
  );
}