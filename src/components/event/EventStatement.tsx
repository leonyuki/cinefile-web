import { Sparkles } from 'lucide-react';

export default function EventStatement({ statement }: { statement?: string }) {
  if (!statement) return null;

  return (
    <section className="bg-[#faf9f7] border-y border-gray-100 py-20 sm:py-28">
      <div className="max-w-4xl mx-auto px-6 sm:px-12">
        <div className="flex flex-col items-center text-center space-y-10">
          <div className="flex items-center justify-center gap-2 text-xs tracking-widest text-[#1c2b5e] uppercase font-semibold">
            <Sparkles className="w-4 h-4" /> Statement
          </div>
          <div className="space-y-6 text-sm sm:text-base md:text-lg text-gray-700 leading-loose md:leading-loose">
            {statement.split('\n\n').map((para, i) => (
              <p key={i} className="whitespace-pre-line">{para}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}