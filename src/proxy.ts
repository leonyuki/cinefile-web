import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifySession } from './libs/session';

export async function proxy(req: NextRequest) {
  // 1. ブラウザに保存されている認証用クッキーを取得し、署名を検証する
  // 🌟 Cookieの「有無」だけでなく中身の署名も検証することで、値の偽造によるなりすましを防ぐ
  //   （※ここはUX目的の一次防御。実際の認可判定は各Server Action側でも必ず行う）
  const sessionCookie = req.cookies.get('cinefile_session');
  const sessionUser = sessionCookie ? await verifySession(sessionCookie.value) : null;

  // 2. 現在アクセスしようとしているパス（URL）を取得
  const path = req.nextUrl.pathname;

  // 3. 管理画面（/admin 以下）へのアクセスかどうかを判定
  // ※ログイン画面（/admin/login）自体はアクセスを許可するため除外します
  const isProtectedPath = path.startsWith('/admin') && path !== '/admin/login';

  // 4. 【未ログイン時の防御】
  // 有効なセッションがなく、かつ保護された管理画面にアクセスしようとした場合
  if (isProtectedPath && !sessionUser) {
    // ログイン画面へ強制リダイレクト
    return NextResponse.redirect(new URL('/admin/login', req.url));
  }

  // 5. 【ログイン済み時の制御】
  // 既にログインしている状態で、再びログイン画面を開こうとした場合
  if (path === '/admin/login' && sessionUser) {
    // ログインをスキップして管理画面へ強制リダイレクト
    return NextResponse.redirect(new URL('/admin', req.url));
  }

  // 上記の条件に引っかからなければ、そのままページを表示して処理を継続
  return NextResponse.next();
}

// 🌟 プロキシを監視・適用する範囲を設定
export const config = {
  matcher: [
    /*
     * 監視対象:
     * - /admin （管理画面トップ）
     * - /admin/xxx （管理画面のサブページ全般）
     */
    '/admin/:path*',
  ],
};
