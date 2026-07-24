import { cookies } from 'next/headers';

export async function checkAccess(requiredRole: 'ADMIN' | 'PR' | 'USER') {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get('cinefile_session');

  if (!sessionCookie || !sessionCookie.value) {
    throw new Error("認証されていません（セッションが見つかりません）");
  }

  try {
    const user = JSON.parse(sessionCookie.value);
    const userRole = user.role; // 'ADMIN', 'PR', または 'USER'

    // 1. ADMIN権限が必要な処理（ユーザーの削除・権限変更など）
    if (requiredRole === 'ADMIN' && userRole !== 'ADMIN') {
      throw new Error("この操作にはADMIN権限が必要です。");
    }

    // 2. PR以上の権限が必要な処理（記事やイベントの投稿など）
    // （ADMINとPRなら許可、USERなら弾く）
    if (requiredRole === 'PR' && userRole !== 'ADMIN' && userRole !== 'PR') {
      throw new Error("この操作にはPR以上の権限が必要です。");
    }

    // 3. USER権限（ログインさえしていればOK）
    // 自分のアカウント修正などは別途IDの照合で行うため、権限チェック自体はこれでパスさせます
    
    return { success: true, user };

  } catch (error: any) {
    throw new Error(error.message || "セッションデータが不正です。再度ログインしてください。");
  }
}