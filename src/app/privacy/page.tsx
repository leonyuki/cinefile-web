import { Mail, Shield } from 'lucide-react';

export const metadata = {
  title: 'Privacy Policy | CinéFile',
  description: 'CinéFile（シネフィル）のプライバシーポリシー（個人情報保護方針）について。',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-3xl mx-auto px-6 sm:px-12 py-12 sm:py-20">
        
        {/* ページタイトル */}
        <div className="mb-16 border-b border-gray-100 pb-8">
          <p className="text-xs tracking-widest text-gray-400 mb-3 uppercase flex items-center gap-2 font-medium">
            <Shield className="w-3.5 h-3.5" /> Legal
          </p>
          <h1 className="text-3xl tracking-tight text-gray-900 mb-2">Privacy Policy</h1>
          <p className="text-xs tracking-widest text-gray-400">プライバシーポリシー</p>
        </div>

        {/* 本文コンテンツ */}
        <div className="text-sm text-gray-600 leading-loose space-y-12 font-light">
          <p className="text-gray-700">
            CinéFileは、以下のとおり個人情報保護方針を定め、個人情報保護の仕組みを構築し、全スタッフに個人情報保護の重要性の認識と取組みを徹底させることにより、個人情報の保護を推進致します。
          </p>

          {/* 各条項セクション */}
          <section className="space-y-3">
            <h2 className="text-base font-normal text-gray-950 tracking-tight">1. 法令及びその他社会的規範</h2>
            <p>当団体は、個人情報に関する法令及びその他の規範を順守し、個人情報の保護に万全を尽くします。</p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-normal text-gray-950 tracking-tight">2. 個人情報の管理</h2>
            <p>当団体は、お客さまの個人情報を正確かつ最新の状態に保ち、個人情報への不正アクセス・紛失・破損・改ざん・漏洩などを防止するため、セキュリティシステムの維持・管理体制の整備等の必要な措置を講じ、安全対策を実施し個人情報の厳重な管理を行ないます。</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-base font-normal text-gray-950 tracking-tight">3. 個人情報の利用目的</h2>
            <p>当法人は、個人情報については、以下の目的の範囲内で取り扱います。</p>
            <ul className="list-none space-y-2 pl-1 border-l border-gray-100 text-gray-600">
              <li className="pl-3 before:content-['•'] before:text-gray-300 before:mr-2 flex items-center">所属の確認を含む本人確認</li>
              <li className="pl-3 before:content-['•'] before:text-gray-300 before:mr-2 flex items-center">申込等に関する当団体業務</li>
              <li className="pl-3 before:content-['•'] before:text-gray-300 before:mr-2 flex items-center">当団体からの通知</li>
              <li className="pl-3 before:content-['•'] before:text-gray-300 before:mr-2 flex items-center">CinéFileに関する諸連絡</li>
              <li className="pl-3 before:content-['•'] before:text-gray-300 before:mr-2 flex items-center">当法人のサービスの開発、改良</li>
              <li className="pl-3 before:content-['•'] before:text-gray-300 before:mr-2 flex items-center">CinéFileの協賛、協力、パートナー企業からの通知</li>
              <li className="pl-3 before:content-['•'] before:text-gray-300 before:mr-2 flex items-center">会場からの連絡</li>
              <li className="pl-3 before:content-['•'] before:text-gray-300 before:mr-2 flex items-center">緊急時の対応に係る連絡</li>
              <li className="pl-3 before:content-['•'] before:text-gray-300 before:mr-2 flex items-center">その他、CinéFileまたは当団体に関するサービスの提供</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-base font-normal text-gray-950 tracking-tight">4. 個人情報の第三者への提供</h2>
            <p>当法人は取得した個人情報について、以上の利用目的を達成するために必要に応じて第三者に提供する場合があります。個人情報を提供する際は、本プライバシーポリシーに則って個人情報を取り扱うよう提供先に要求します。また、以下の場合において第三者への提供を行う可能性があります。</p>
            <ul className="list-none space-y-2 pl-1 border-l border-gray-100 text-gray-600">
              <li className="pl-3 before:content-['•'] before:text-gray-300 before:mr-2 flex items-start">
                <span>お客さまが希望されるサービスを行なうために団体が業務を委託する業者に対して開示する場合</span>
              </li>
              <li className="pl-3 before:content-['•'] before:text-gray-300 before:mr-2 flex items-start">
                <span>法令に基づき開示することが必要である場合</span>
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-normal text-gray-950 tracking-tight">5. 個人情報のCinéFile内における提供</h2>
            <p>当法人は取得した個人情報について、当団体内にて共有する場合があります。</p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-normal text-gray-950 tracking-tight">6. 個人情報の安全管理措置</h2>
            <p>当団体は個人情報を適正に取り扱うため、当団体内管理体制の整備、委員の教育、並びに個人情報への不正アクセスや個人情報の紛失、破壊、改ざんおよび漏洩等防止に関して適切な措置を行うことにより、個人情報の保護に努めます。</p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-normal text-gray-950 tracking-tight">7. 個人情報の開示請求等の手続き</h2>
            <p>当団体はメール等による連絡に応じ、速やかに個人情報の開示・訂正等の手続き方法を回答します。</p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-normal text-gray-950 tracking-tight">8. プライバシーポリシーの継続的改善</h2>
            <p>当団体は、個人情報の保護体制の強化、法令及びその他の規範の変更、新規サービスの提供等の理由により、プライバシーポリシーを改定することがあります。内容に変更・改訂があった場合、当団体は、本イベントの参加者にその内容を通達いたします。</p>
          </section>

          {/* 下部：制定日・クレジット・問い合わせ */}
          <div className="mt-20 pt-10 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 text-xs text-gray-400 tracking-wider font-medium">
            <div>
              <p className="mb-1">2026年8月1日 制定</p>
              <p className="text-sm font-semibold tracking-normal text-gray-900">CinéFile</p>
            </div>
            <a 
              href="mailto:cinefile.jp@gmail.com" 
              className="flex items-center gap-2 hover:text-gray-900 transition-colors bg-gray-50 hover:bg-gray-100/70 px-4 py-2.5 rounded-xs border border-gray-100 tracking-normal text-sm text-gray-600 font-light"
            >
              <Mail className="w-3.5 h-3.5 text-gray-400" />
              cinefile.jp@gmail.com
            </a>
          </div>

        </div>
      </div>
    </div>
  );
}