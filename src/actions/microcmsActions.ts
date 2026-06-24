"use server"; // サーバー側で動かすための宣言

import { client } from '../libs/microcms';

export async function createNewsPost(formData: FormData) {
  // フォームから送られてきたデータを受け取る
  const title = formData.get('title') as string;
  const category = formData.get('category') as string;
  const content = formData.get('content') as string;

  if (!title || !content) {
    return { success: false, message: 'タイトルと本文は必須です' };
  }

  try {
    // microCMSにデータを登録（POST）する
    await client.create({
      endpoint: 'news', // ニュースのAPIに送信
      content: {
        title: title,
        category: category,
        content: content, // 本文
      },
    });
    
    return { success: true, message: '記事の投稿に成功しました！' };
  } catch (error) {
    console.error(error);
    return { success: false, message: '投稿に失敗しました' };
  }
}