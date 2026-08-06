// src/data/instagram.ts

export type InstagramPost = {
  id: string; // データの識別子（適当な文字列でOK）
  url: string; // Instagram投稿のフルURL
};

export const instagramPosts: InstagramPost[] = [
  {
    id: 'post1',
    // ユーザー様が提供された埋め込みコード内のURL
    url: 'https://www.instagram.com/p/DbM0LWNvCna/',
  },
  {
    id: 'post2',
    // 参考として別の投稿URL（ご自身のものに差し替えてください）
    url: 'https://www.instagram.com/p/DbMzL-8vGVn/',
  },
  {
    id: 'post3',
    // 参考として別の投稿URL（ご自身のものに差し替えてください）
    url: 'https://www.instagram.com/p/DbMy9jmvwtK/',
  }
];