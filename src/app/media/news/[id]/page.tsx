import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { client } from '../../../../libs/microcms'; // 絶対パス

type NewsDetail = {
  id: string;
  title: string;
  category?: string;
  content?: string; // microCMSのリッチエディタ用のフィールド
  publishedAt: string;
  eventDate?: string;
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}.${month}.${day}`;
};

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;

  try {
    const post = await client.get<NewsDetail>({
      endpoint: 'news',
      contentId: resolvedParams.id,
    });

    return (
      <div className="max-w-3xl mx-auto px-6 sm:px-12 py-12 sm:py-20">
        <Link
          href="/media"
          className="inline-flex items-center text-xs tracking-widest text-gray-400 hover:text-gray-900 mb-12 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5 mr-2" />
          BACK TO MEDIA
        </Link>

        <article>
          <header className="mb-10 pb-8 border-b border-gray-100">
            <div className="flex items-center gap-4 mb-4">
              <time className="text-sm text-gray-500">
                {formatDate(post.eventDate ?? post.publishedAt)}
              </time>
              {post.category && (
                <span className="text-xs text-[#1c2b5e] tracking-wider">
                  {post.category}
                </span>
              )}
            </div>
            <h1 className="text-2xl sm:text-3xl tracking-tight leading-snug">
              {post.title}
            </h1>
          </header>

          {/* 本文（リッチエディタ）をHTMLとして展開 */}
          <div 
            className="prose prose-gray max-w-none text-sm text-gray-600 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: post.content || '' }}
          />
        </article>
      </div>
    );
  } catch (error) {
    notFound();
  }
}