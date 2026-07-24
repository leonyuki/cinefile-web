// src/data/instagram.ts

export type InstagramPost = {
  id: string; // データの識別子（適当な文字列でOK）
  url: string; // Instagram投稿のフルURL
};

export const instagramPosts: InstagramPost[] = [
  {
    id: 'post1',
    // ユーザー様が提供された埋め込みコード内のURL
    url: 'https://www.instagram.com/p/DKVqERyza9V/',
  },
  {
    id: 'post2',
    // 参考として別の投稿URL（ご自身のものに差し替えてください）
    url: 'https://www.instagram.com/p/DKB5M-vxpET/',
  },
  {
    id: 'post3',
    // 参考として別の投稿URL（ご自身のものに差し替えてください）
    url: 'https://www.instagram.com/p/DJx4VudvpGr/',
  },
  {
    id: 'post4',
    // 参考として別の投稿URL（ご自身のものに差し替えてください）
    url: 'https://www.instagram.com/p/DJdGv1TzJ_6/',
  },
  {
    id: 'post5',
    // 参考として別の投稿URL（ご自身のものに差し替えてください）
    url: 'https://www.instagram.com/p/DJAcxzjB3w5/',
  },
  {
    id: 'post6',
    // 参考として別の投稿URL（ご自身のものに差し替えてください）
    url: 'https://www.instagram.com/p/DI_WlztP6-r/',
  },
  {
    id: 'post7',
    // 参考として別の投稿URL（ご自身のものに差し替えてください）
    url: 'https://www.instagram.com/p/DI-ymGhxkqX/',
  },
  {
    id: 'post8',
    // 参考として別の投稿URL（ご自身のものに差し替えてください）
    url: 'https://www.instagram.com/p/DI8uZv9v-Wv/',
  },
];