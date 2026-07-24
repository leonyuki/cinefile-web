"use server";

import { createClient } from '@supabase/supabase-js';

const getSupabaseAdmin = () => {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
};

// 1. 全ユーザーの取得
export async function getSupabaseUsers() {
  const supabaseAdmin = getSupabaseAdmin();
  // 🌟 修正：cinefile-users に変更
  const { data, error } = await supabaseAdmin.from('cinefile-users').select('*');
  
  if (error) {
    console.error('Supabaseユーザー取得エラー:', error);
    return [];
  }

  return data || [];
}

// 2. ユーザー作成
export async function inviteSupabaseUser(formData: FormData) {
  const name = formData.get('name') as string;
  const role = formData.get('role') as string;
  
  // 🌟 修正: フォームから 'password' を受け取る（固定値 "password" を廃止）
  const password = formData.get('password') as string; 

  const supabaseAdmin = getSupabaseAdmin();

  const { error } = await supabaseAdmin
    .from('cinefile-users')
    .insert([{ name, role, pass: password }]); // 👈 ここで受け取ったパスワードを保存

  if (error) return { success: false, message: error.message };
  return { success: true, message: `ユーザー「${name}」を登録しました。` };
}

// 3. ユーザー権限（ロール）の変更
export async function updateSupabaseUserRole(id: number, newRole: string) {
  const supabaseAdmin = getSupabaseAdmin();
  // 🌟 修正：cinefile-users に変更
  const { error } = await supabaseAdmin
    .from('cinefile-users')
    .update({ role: newRole })
    .eq('id', id);

  if (error) return { success: false, message: error.message };
  return { success: true, message: '権限を更新しました。' };
}

// 4. ユーザーの削除
export async function deleteSupabaseUser(id: number) {
  const supabaseAdmin = getSupabaseAdmin();
  // 🌟 修正：cinefile-users に変更
  const { error } = await supabaseAdmin
    .from('cinefile-users')
    .delete()
    .eq('id', id);

  if (error) return { success: false, message: error.message };
  return { success: true, message: 'ユーザーを完全に削除しました。' };
}