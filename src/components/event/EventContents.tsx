import { EventContent } from '../../types/event';

type Props = {
  contents?: EventContent[];
};

export default function EventContents({ contents }: Props) {
  if (!contents || contents.length === 0) return null;

  return (
    <section className="max-w-4xl mx-auto px-6 sm:px-12 py-16 sm:py-24">
      <div className="mb-12 text-center">
        <h3 className="text-xs tracking-widest text-gray-400 uppercase font-semibold">
          Contents
        </h3>
      </div>
      
      <div className="space-y-8">
        {contents.map((content, index) => {
          // 🌟 発表者が存在するかどうかを判定
          const hasPresenters = content.presenters && content.presenters.length > 0;

          return (
            <div 
              key={index} 
              className="bg-white p-6 sm:p-8 rounded-sm border border-gray-100 shadow-sm"
            >
              {/* タイトル */}
              <h4 className="text-xl font-bold text-gray-900 mb-4">
                {content.title}
              </h4>
              
              {/* 内容・解説 */}
              {/* 🌟 発表者がいる場合のみ下に余白（mb-6）を設け、いない場合は余白をなくす */}
              <p className={`text-sm text-gray-700 leading-relaxed whitespace-pre-line ${hasPresenters ? 'mb-6' : ''}`}>
                {content.description}
              </p>
              
              {/* 発表者（データが存在する場合のみ表示） */}
              {hasPresenters && (
                <div className="flex items-start gap-4 border-t border-gray-100 pt-4">
                  <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest mt-0.5 shrink-0">
                    Presenter
                  </span>
                  <ul className="flex flex-wrap gap-x-4 gap-y-2">
                    {/* hasPresenters で存在確認済みなので ! でエラーを回避 */}
                    {content.presenters!.map((presenter, idx) => (
                      <li key={idx} className="text-sm text-gray-800 font-medium">
                        {presenter}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}