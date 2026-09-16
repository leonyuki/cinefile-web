import { SignJWT, jwtVerify } from 'jose';

export type SessionUser = {
  id: number;
  name: string;
  role: 'ADMIN' | 'PR' | 'USER';
  user_id: string;
};

function getSecretKey() {
  const secret = process.env.AUTH_SECRET;
  if (!secret) {
    throw new Error('AUTH_SECRET is required');
  }
  return new TextEncoder().encode(secret);
}

// ログインCookie（cinefile_session）に保存する署名付きセッショントークンを発行する
export async function signSession(user: SessionUser): Promise<string> {
  return new SignJWT({ ...user })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('1d')
    .sign(getSecretKey());
}

// セッショントークンを検証し、改ざん・期限切れの場合は null を返す
export async function verifySession(token: string): Promise<SessionUser | null> {
  try {
    const { payload } = await jwtVerify(token, getSecretKey());
    if (
      typeof payload.id === 'number' &&
      typeof payload.name === 'string' &&
      typeof payload.role === 'string' &&
      typeof payload.user_id === 'string'
    ) {
      return {
        id: payload.id,
        name: payload.name,
        role: payload.role as SessionUser['role'],
        user_id: payload.user_id,
      };
    }
    return null;
  } catch {
    return null;
  }
}
