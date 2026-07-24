import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  // 1. ブラウザに保存されている認証用クッキーを取得
  const sessionCookie = req.cookies.get('cinefile_session');
  
  // 2. 現在アクセスしようとしているパス（URL）を取得
  const path = req.nextUrl.pathname;

  // 3. 管理画面（/admin 以下）へのアクセスかどうかを判定
  // ※ログイン画面（/admin/login）自体はアクセスを許可するため除外します
  const isProtectedPath = path.startsWith('/admin') && path !== '/admin/login';

  // 4. 【未ログイン時の防御】
  // セッションがなく、かつ保護された管理画面にアクセスしようとした場合
  if (isProtectedPath && !sessionCookie) {
    // ログイン画面へ強制リダイレクト
    return NextResponse.redirect(new URL('/admin/login', req.url));
  }

  // 5. 【ログイン済み時の制御】
  // 既にログインしている状態で、再びログイン画面を開こうとした場合
  if (path === '/admin/login' && sessionCookie) {
    // ログインをスキップして管理画面へ強制リダイレクト
    return NextResponse.redirect(new URL('/admin', req.url));
  }

  // 上記の条件に引っかからなければ、そのままページを表示して処理を継続
  return NextResponse.next();
}

// 🌟 ミドルウェアを監視・適用する範囲を設定
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