import { Link } from 'react-router';
import { blogPosts } from '../data/blog';

export function BlogPage() {
  return (
    <div className="max-w-6xl mx-auto px-6 sm:px-12 py-12 sm:py-20">
      <h1 className="text-3xl sm:text-4xl mb-12 tracking-tight">Blog</h1>

      <div className="grid md:grid-cols-2 gap-10">
        {blogPosts.map((post) => (
          <Link
            key={post.id}
            to={`/blog/${post.slug}`}
            className="block group"
          >
            {post.image && (
              <div className="aspect-[16/9] overflow-hidden mb-4 rounded-lg">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:opacity-90 transition-opacity"
                />
              </div>
            )}

            <div className="flex items-center gap-4 mb-3 text-sm text-gray-400">
              <span>{post.date}</span>
              <span>•</span>
              <span>{post.category}</span>
            </div>

            <h2 className="text-xl mb-3 tracking-tight group-hover:text-gray-600 transition-colors">
              {post.title}
            </h2>

            <p className="text-sm text-gray-600 leading-relaxed mb-3">
              {post.excerpt}
            </p>

            <div className="text-sm text-gray-400">
              by {post.author}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
