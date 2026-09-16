import { cookies } from 'next/headers';
import { verifySession, type SessionUser } from './session';

export type AccessResult =
  | { success: true; user: SessionUser }
  | { success: false; message: string };

// 現在のリクエストの署名付きセッションCookieを検証して取得する
export async function getSessionUser(): Promise<SessionUser | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get('cinefile_session')?.value;
  if (!token) return null;
  return verifySession(token);
}

// サーバーアクションの冒頭で呼び出し、権限を満たさない場合は success:false を返す
// （※ 呼び出し側で必ず success を確認してから処理を続行すること）
export async function checkAccess(requiredRole: 'ADMIN' | 'PR' | 'USER'): Promise<AccessResult> {
  const user = await getSessionUser();

  if (!user) {
    return { success: false, message: '認証されていません（ログインしてください）。' };
  }

  // 1. ADMIN権限が必要な処理（ユーザーの削除・権限変更など）
  if (requiredRole === 'ADMIN' && user.role !== 'ADMIN') {
    return { success: false, message: 'この操作にはADMIN権限が必要です。' };
  }

  // 2. PR以上の権限が必要な処理（記事やイベントの投稿など）
  if (requiredRole === 'PR' && user.role !== 'ADMIN' && user.role !== 'PR') {
    return { success: false, message: 'この操作にはPR以上の権限が必要です。' };
  }

  // 3. USER権限（ログインさえしていればOK。自分のデータのみ操作可能かは呼び出し側でIDを照合する）
  return { success: true, user };
}
