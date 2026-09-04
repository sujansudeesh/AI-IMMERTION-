import jwt from 'jsonwebtoken';

export type Role = 'SUPER_ADMIN' | 'MANAGER' | 'STAFF' | 'CUSTOMER';

const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-pos-retail-key-2026';

export interface UserPayload {
  id: string;
  email: string;
  name: string;
  role: Role | string;
}

export function signJwt(payload: UserPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
}

export function verifyJwt(token: string): UserPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as UserPayload;
  } catch (error) {
    return null;
  }
}
