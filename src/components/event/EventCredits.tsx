import { Organization } from '../../types/event';

type EventCreditsProps = {
  organizer?: Organization[];
  support?: Organization[];
  cooperation?: Organization[];
};

export default function EventCredits({ organizer, support, cooperation }: EventCreditsProps) {
  // すべての項目が空の場合は何も表示しない
  if (
    (!organizer || organizer.length === 0) &&
    (!support || support.length === 0) &&
    (!cooperation || cooperation.length === 0)
  ) {
    return null;
  }

  // 🌟 主催・協賛・協力を描画するための共通関数
  const renderOrgList = (title: string, orgs?: Organization[]) => {
    if (!orgs || orgs.length === 0) return null;

    return (
      // 🌟 セクションごとに下部に余白（mb-12）を設けて縦に並べる
      <div className="mb-12 last:mb-0">
        <h3 className="text-xs tracking-widest text-gray-400 uppercase font-semibold mb-6">
          {title}
        </h3>
        {/* 🌟 ulをflex containerにし、横並び（items-center）＆ 折り返し（flex-wrap）可能にする */}
        {/* gap-x-12 でロゴ同士の横のすき間を広めに確保し、gap-y-6 で折り返し時の縦のすき間を確保 */}
        <ul className="flex flex-wrap items-center gap-x-12 gap-y-6">
          {orgs.map((org, index) => {
            // 中身（ロゴ画像 or テキスト）を定義
            const content = org.logoUrl ? (
              // 🌟 枠の高さを h-12 から h-20（80px）へ広げています
              <div className="h-20 w-auto flex items-center justify-center">
                <img 
                  src={org.logoUrl} 
                  alt={org.name} 
                  // 🌟 画像の高さを h-8 から h-14（56px）に、最大幅を 280px に拡大しました
                  className="h-14 max-w-[280px] object-contain"
                />
              </div>
            ) : (
              <span className="text-sm text-gray-900">{org.name}</span>
            );

            return (
              <li key={index}>
                {/* リンクがある場合はaタグで囲む */}
                {org.linkUrl ? (
                  <a 
                    href={org.linkUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:opacity-60 transition-opacity block"
                  >
                    {content}
                  </a>
                ) : (
                  content
                )}
              </li>
            );
          })}
        </ul>
      </div>
    );
  };

  return (
    <section className="max-w-5xl mx-auto px-6 sm:px-12 py-16 sm:py-20 border-t border-gray-100">
      <div>
        {renderOrgList('主催', organizer)}
        {renderOrgList('協賛', support)}
        {renderOrgList('協力', cooperation)}
      </div>
    </section>
  );
}