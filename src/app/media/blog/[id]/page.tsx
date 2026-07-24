import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { client } from '../../../../libs/microcms';

type MicroCMSImage = {
  url: string;
  width: number;
  height: number;
};

type BlogDetail = {
  id: string;
  title: string;
  category?: string;
  image?: MicroCMSImage;
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

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;

  try {
    const post = await client.get<BlogDetail>({
      endpoint: 'blog',
      contentId: resolvedParams.id,
    });

    return (
      <div className="max-w-4xl mx-auto px-6 sm:px-12 py-12 sm:py-20">
        <Link
          href="/media"
          className="inline-flex items-center text-xs tracking-widest text-gray-400 hover:text-gray-900 mb-10 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5 mr-2" />
          BACK TO MEDIA
        </Link>

        <article>
          <header className="mb-10 text-center max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-4 mb-4">
              <time className="text-sm text-gray-500">
                {formatDate(post.eventDate ?? post.publishedAt)}
              </time>
              {post.category && (
                <span className="text-xs text-[#1c2b5e] tracking-wider">
                  {post.category}
                </span>
              )}
            </div>
            <h1 className="text-3xl sm:text-4xl tracking-tight leading-snug">
              {post.title}
            </h1>
          </header>

          {/* ブログのメイン画像 */}
          {post.image && (
            <div className="w-full mb-12 bg-gray-50">
              <img
                src={post.image.url}
                alt={post.title}
                className="w-full h-auto max-h-[60vh] object-cover"
              />
            </div>
          )}

          {/* 本文（リッチエディタ）をHTMLとして展開 */}
          <div 
            className="prose prose-gray max-w-none text-sm text-gray-600 leading-relaxed max-w-3xl mx-auto"
            dangerouslySetInnerHTML={{ __html: post.content || '' }}
          />
        </article>
      </div>
    );
  } catch (error) {
    notFound();
  }
}