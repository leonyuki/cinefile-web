"use server";

import { createClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';

const getSupabaseAdmin = () => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    throw new Error("Supabaseの環境変数（URLまたはSERVICE_ROLE_KEY）が設定されていません。");
  }

  return createClient(url, key);
};

export async function loginWithUsername(formData: FormData) {
  const name = formData.get('username') as string;
  const password = formData.get('password') as string;

  try {
    const supabase = getSupabaseAdmin();

    // 1. ユーザー名で検索
    const { data: user, error } = await supabase
      .from('cinefile-users') 
      .select('*')
      .eq('name', name)
      .single();

    if (error || !user) {
      return { success: false, message: "ユーザーが存在しません。" };
    }

    // 2. パスワード照合
    if (user.pass !== password) {
      return { success: false, message: "パスワードが間違っています。" };
    }

    // 🌟 3. 修正：クッキーに保存するセッション情報に `user_id` を追加
    const cookieStore = await cookies();
    cookieStore.set('cinefile_session', JSON.stringify({
      id: user.id,
      name: user.name,
      role: user.role,
      user_id: user.user_id // ← これを追加！
    }), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 // 1日間有効
    });

    // 🌟 4. 修正：フロントエンドへの戻り値にも `user_id` を追加
    return { 
      success: true, 
      user: { 
        id: user.id, 
        name: user.name, 
        role: user.role,
        user_id: user.user_id // ← これを追加！
      } 
    };

  } catch (err: any) {
    return { 
      success: false, 
      message: `サーバー内部エラーが発生しました: ${err.message || err}` 
    };
  }
}

export async function getCurrentUser() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get('cinefile_session');
  
  if (!sessionCookie || !sessionCookie.value) return null;
  
  try {
    return JSON.parse(sessionCookie.value);
  } catch {
    return null;
  }
}