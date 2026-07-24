import { AccessRoute } from '../../types/event';

interface Props {
  mapEmbedUrl?: string;
  access?: AccessRoute[];
}

export default function EventAccess({ mapEmbedUrl, access }: Props) {
  if (!mapEmbedUrl && (!access || access.length === 0)) return null;

  const hasAccess = access && access.length > 0;

  return (
    <section className="bg-[#faf9f7] border-y border-gray-100 py-20">
      <div className="max-w-5xl mx-auto px-6 sm:px-12">
        <h3 className="text-xs tracking-widest text-gray-400 uppercase font-semibold mb-10 text-center">
          {hasAccess ? 'Map & Access' : 'Map'}
        </h3>
        
        <div className={hasAccess ? 'grid md:grid-cols-2 gap-10 items-stretch' : ''}>
          
          {mapEmbedUrl && (
            // 🌟 デスクトップ環境での高さを md:h-[500px] (任意)に修正
            //    アクセスがない場合は min-h-[450px] を適用
            <div className={`w-full overflow-hidden rounded-sm border border-gray-200 shadow-2xs h-64 ${hasAccess ? 'md:h-[500px]' : 'min-h-[450px]'}`}>
              <iframe
                key={mapEmbedUrl}
                suppressHydrationWarning
                src={mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="会場マップ"
                className="w-full h-full"
              />
            </div>
          )}
          
          {hasAccess && (
            <div className="flex flex-col justify-center">
              <ol className="space-y-6">
                {access.map((item, i) => (
                  <li key={i} className="flex gap-4 items-start bg-white p-6 rounded-sm border border-gray-100 shadow-xs">
                    <span className="shrink-0 w-6 h-6 rounded-full bg-[#1c2b5e] text-white text-xs font-bold flex items-center justify-center mt-0.5">
                      {i + 1}
                    </span>
                    <div>
                      <div className="text-base font-semibold text-gray-900 mb-1">{item.route}</div>
                      <div className="text-sm text-gray-600 leading-relaxed">{item.detail}</div>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          )}
          
        </div>
      </div>
    </section>
  );
}