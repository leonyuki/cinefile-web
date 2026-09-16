import type { MetadataRoute } from 'next';
import { client } from '../libs/microcms';

const BASE_URL = 'https://cinefile.jp';

type MemberItem = {
  id: string;
  name: string;
};

type ContentItem = {
  id: string;
  publishedAt?: string;
  revisedAt?: string;
  updatedAt?: string;
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/`,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${BASE_URL}/about`,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/archive`,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/media`,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/contact`,
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/privacy`,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/archive/trace-trash`,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/archive/blur-stir`,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/archive/hazama`,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/archive/trouvaille`,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/archive/faellesspisning`,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
  ];

  // 🌟 microCMSの動的コンテンツ（people/news/blog）を取得してサイトマップに含める
  // どれか1つの取得に失敗しても他やstaticRoutesに影響しないよう、それぞれ個別にtry/catchする
  const peopleRoutes: MetadataRoute.Sitemap = await client
    .getList<MemberItem>({
      endpoint: 'people',
      queries: { limit: 100, fields: ['id', 'name'] },
      customRequestInit: { next: { revalidate: 60 } },
    })
    .then((peopleData) =>
      peopleData.contents
        .filter((member) => Boolean(member.name))
        .map((member) => ({
          url: `${BASE_URL}/people/${member.name}`,
          changeFrequency: 'monthly' as const,
          priority: 0.5,
        }))
    )
    .catch(() => []);

  const newsRoutes: MetadataRoute.Sitemap = await client
    .getList<ContentItem>({
      endpoint: 'news',
      queries: { limit: 100, fields: ['id', 'publishedAt', 'revisedAt'] },
      customRequestInit: { next: { revalidate: 60 } },
    })
    .then((newsData) =>
      newsData.contents.map((item) => ({
        url: `${BASE_URL}/media/news/${item.id}`,
        lastModified: item.revisedAt || item.publishedAt,
        changeFrequency: 'monthly' as const,
        priority: 0.4,
      }))
    )
    .catch(() => []);

  const blogRoutes: MetadataRoute.Sitemap = await client
    .getList<ContentItem>({
      endpoint: 'blog',
      queries: { limit: 100, fields: ['id', 'publishedAt', 'revisedAt'] },
      customRequestInit: { next: { revalidate: 60 } },
    })
    .then((blogData) =>
      blogData.contents.map((item) => ({
        url: `${BASE_URL}/media/blog/${item.id}`,
        lastModified: item.revisedAt || item.publishedAt,
        changeFrequency: 'monthly' as const,
        priority: 0.4,
      }))
    )
    .catch(() => []);

  return [...staticRoutes, ...peopleRoutes, ...newsRoutes, ...blogRoutes];
}
