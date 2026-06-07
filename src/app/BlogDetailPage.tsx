import { useParams, Link } from 'react-router';
import { ArrowLeft } from 'lucide-react';
import { blogPosts } from '../data/blog';

export function BlogDetailPage() {
  const { slug } = useParams();
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="max-w-5xl mx-auto px-6 sm:px-12 py-20 text-center">
        <h1 className="text-2xl mb-4">Blog post not found</h1>
        <Link to="/media" className="text-sm text-gray-600 hover:text-gray-900">
          ← Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 sm:px-12 py-12 sm:py-20">
      <Link
        to="/media"
        className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 mb-12 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Blog
      </Link>

      <div className="mb-8">
        <div className="flex items-center gap-4 mb-6 text-sm text-gray-400">
          <span>{post.date}</span>
          <span>•</span>
          <span>{post.category}</span>
          <span>•</span>
          <span>by {post.author}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl mb-6 tracking-tight leading-tight">
          {post.title}
        </h1>
      </div>

      {post.image && (
        <div className="mb-12 rounded-lg overflow-hidden">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-auto"
          />
        </div>
      )}

      <div className="prose prose-sm max-w-none">
        <div className="text-gray-600 leading-relaxed whitespace-pre-line">
          {post.content}
        </div>
      </div>

      {/* Related Posts */}
      <div className="mt-20 pt-12 border-t border-gray-200">
        <h3 className="text-sm text-gray-400 mb-6">Related Posts</h3>
        <div className="grid sm:grid-cols-2 gap-6">
          {blogPosts
            .filter((p) => p.id !== post.id)
            .slice(0, 2)
            .map((relatedPost) => (
              <Link
                key={relatedPost.id}
                to={`/blog/${relatedPost.slug}`}
                className="group"
              >
                {relatedPost.image && (
                  <div className="aspect-[16/9] overflow-hidden mb-3 rounded">
                    <img
                      src={relatedPost.image}
                      alt={relatedPost.title}
                      className="w-full h-full object-cover group-hover:opacity-90 transition-opacity"
                    />
                  </div>
                )}
                <div className="text-xs text-gray-400 mb-2">{relatedPost.date}</div>
                <h4 className="text-sm group-hover:text-gray-600 transition-colors">
                  {relatedPost.title}
                </h4>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}
