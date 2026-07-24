import { NextResponse } from 'next/server';
import { SignJWT } from 'jose'; // npm install jose が必要です

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    // 環境変数の値と一致するかチェック
    if (
      username === process.env.ADMIN_USERNAME &&
      password === process.env.ADMIN_PASSWORD
    ) {
      // JWTによる暗号化トークンの作成
      const secret = new TextEncoder().encode(process.env.AUTH_SECRET);
      const token = await new SignJWT({ role: 'admin' })
        .setProtectedHeader({ alg: 'HS256' })
        .setExpirationTime('2h') // 有効期限：2時間
        .sign(secret);

      const response = NextResponse.json({ success: true });
      
      // クッキーにトークンを保存
      response.cookies.set('admin_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 2, // 2時間
        path: '/',
      });

      return response;
    }

    return NextResponse.json({ success: false, message: 'ユーザー名またはパスワードが正しくありません。' }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'サーバーエラーが発生しました。' }, { status: 500 });
  }
}