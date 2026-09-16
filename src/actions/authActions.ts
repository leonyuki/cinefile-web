"use server";

import { createClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';
import { signSession, verifySession } from '../libs/session';
import { verifyPassword, hashPassword, isHashedPassword } from '../libs/password';

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

    // 2. パスワード照合（ハッシュ化済み・旧形式（平文）のどちらにも対応）
    if (!verifyPassword(password, user.pass)) {
      return { success: false, message: "パスワードが間違っています。" };
    }

    // 🌟 移行対応：旧・平文パスワードだった場合はこのタイミングでハッシュ化して保存し直す
    if (!isHashedPassword(user.pass)) {
      await supabase
        .from('cinefile-users')
        .update({ pass: hashPassword(password) })
        .eq('id', user.id);
    }

    // 🌟 セッションは署名付きJWTとして発行する（生JSONの詰め替えによるなりすましを防止）
    const sessionToken = await signSession({
      id: user.id,
      name: user.name,
      role: user.role,
      user_id: user.user_id,
    });

    const cookieStore = await cookies();
    cookieStore.set('cinefile_session', sessionToken, {
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

  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return {
      success: false,
      message: `サーバー内部エラーが発生しました: ${message}`
    };
  }
}

export async function getCurrentUser() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get('cinefile_session');

  if (!sessionCookie || !sessionCookie.value) return null;

  return verifySession(sessionCookie.value);
}