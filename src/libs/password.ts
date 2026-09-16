import { randomBytes, scryptSync, timingSafeEqual } from 'crypto';

const KEY_LENGTH = 64;
const HASH_PREFIX = 'scrypt:';

// パスワードをソルト付きでハッシュ化する（scryptはNode標準機能のため追加の依存関係が不要）
export function hashPassword(password: string): string {
  const salt = randomBytes(16).toString('hex');
  const derivedKey = scryptSync(password, salt, KEY_LENGTH).toString('hex');
  return `${HASH_PREFIX}${salt}:${derivedKey}`;
}

export function isHashedPassword(stored: string): boolean {
  return stored.startsWith(HASH_PREFIX);
}

// 保存済みパスワードと入力値を比較する。
// 🌟 移行対応：まだハッシュ化されていない旧・平文パスワードとも比較できるようにし、
// 一致した場合は呼び出し側でハッシュ化して保存し直す（upgrade-on-login）想定。
export function verifyPassword(password: string, stored: string): boolean {
  if (!isHashedPassword(stored)) {
    return password === stored;
  }

  const [salt, derivedKeyHex] = stored.slice(HASH_PREFIX.length).split(':');
  if (!salt || !derivedKeyHex) return false;

  const derivedKey = Buffer.from(derivedKeyHex, 'hex');
  const inputKey = scryptSync(password, salt, KEY_LENGTH);

  return derivedKey.length === inputKey.length && timingSafeEqual(derivedKey, inputKey);
}
