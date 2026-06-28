import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 sm:px-12 py-16 sm:py-24">
      <Link
        href="/"
        className="inline-flex items-center text-xs tracking-widest text-gray-400 hover:text-gray-900 mb-12 transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5 mr-2" />
        BACK TO HOME
      </Link>

      <h1 className="text-2xl sm:text-3xl tracking-tight mb-12">プライバシーポリシー</h1>

      <div className="prose prose-gray max-w-none text-sm text-gray-600 leading-relaxed space-y-8">
        <section>
          <p>
            CinéFile（以下、「当団体」といいます。）は、ユーザーの個人情報の取扱いについて、以下のとおりプライバシーポリシー（以下、「本ポリシー」といいます。）を定めます。
          </p>
        </section>

        <section>
          <h2 className="text-base font-medium text-gray-900 mb-3">第1条（個人情報）</h2>
          <p>
            「個人情報」とは、個人情報保護法にいう「個人情報」を指すものとし、生存する個人に関する情報であって、当該情報に含まれる氏名、生年月日、住所、電話番号、連絡先その他の記述等により特定の個人を識別できる情報を指します。
          </p>
        </section>

        {/* 必要に応じてポリシーの条文をここに追加していきます */}
        <section>
          <h2 className="text-base font-medium text-gray-900 mb-3">第2条（個人情報の収集方法）</h2>
          <p>
            当団体は、ユーザーがお問い合わせをする際に氏名、メールアドレスなどの個人情報をお尋ねすることがあります。
          </p>
        </section>
      </div>
    </div>
  );
}