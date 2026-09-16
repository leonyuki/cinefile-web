"use server";

import { createClient } from '@supabase/supabase-js';
import { checkAccess } from '../libs/auth';
import { hashPassword } from '../libs/password';

const getSupabaseAdmin = () => {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
};

// パスワードのハッシュ値など、フロントに渡してはいけない列を除いたユーザー情報
type PublicUserRow = {
  id: number;
  name: string;
  email?: string;
  role: string;
  [key: string]: unknown;
};

const toPublicUser = (row: Record<string, unknown>): PublicUserRow => {
  const rest = { ...row };
  delete rest.pass;
  return rest as PublicUserRow;
};

// 1. ユーザー一覧の取得
// 🌟 ADMINは全員分、それ以外（PR/USER）はログイン中の本人の行のみを返す（サーバー側で強制）
export async function getSupabaseUsers() {
  const access = await checkAccess('USER');
  if (!access.success) return [];

  const supabaseAdmin = getSupabaseAdmin();
  const query = supabaseAdmin.from('cinefile-users').select('*');
  const { data, error } =
    access.user.role === 'ADMIN' ? await query : await query.eq('id', access.user.id);

  if (error) {
    console.error('Supabaseユーザー取得エラー:', error);
    return [];
  }

  return (data || []).map(toPublicUser);
}

// 2. ユーザー作成（ADMINのみ）
export async function inviteSupabaseUser(formData: FormData) {
  const access = await checkAccess('ADMIN');
  if (!access.success) return { success: false, message: access.message };

  const name = formData.get('name') as string;
  const role = formData.get('role') as string;
  const password = formData.get('password') as string;

  const supabaseAdmin = getSupabaseAdmin();

  const { error } = await supabaseAdmin
    .from('cinefile-users')
    .insert([{ name, role, pass: hashPassword(password) }]);

  if (error) return { success: false, message: error.message };
  return { success: true, message: `ユーザー「${name}」を登録しました。` };
}

// 3. ユーザー権限（ロール）の変更（ADMINのみ）
export async function updateSupabaseUserRole(id: number, newRole: string) {
  const access = await checkAccess('ADMIN');
  if (!access.success) return { success: false, message: access.message };

  const supabaseAdmin = getSupabaseAdmin();
  const { error } = await supabaseAdmin
    .from('cinefile-users')
    .update({ role: newRole })
    .eq('id', id);

  if (error) return { success: false, message: error.message };
  return { success: true, message: '権限を更新しました。' };
}

// 4. ユーザーの削除（ADMINのみ）
export async function deleteSupabaseUser(id: number) {
  const access = await checkAccess('ADMIN');
  if (!access.success) return { success: false, message: access.message };

  const supabaseAdmin = getSupabaseAdmin();
  const { error } = await supabaseAdmin
    .from('cinefile-users')
    .delete()
    .eq('id', id);

  if (error) return { success: false, message: error.message };
  return { success: true, message: 'ユーザーを完全に削除しました。' };
}