import { SignJWT, jwtVerify } from 'jose';

import type { AuthPayload } from '../types';
import { JWT_SECRET } from './constants';

function getSecretKey() {
  return new TextEncoder().encode(JWT_SECRET);
}

export async function signToken(payload: AuthPayload): Promise<string> {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('1d')
    .sign(getSecretKey());
}

export async function verifyToken(token: string): Promise<AuthPayload> {
  const { payload } = await jwtVerify(token, getSecretKey(), { algorithms: ['HS256'] });

  const email = payload.email;
  const role = payload.role;

  if (typeof email !== 'string' || typeof role !== 'string') {
    throw new Error('Invalid token payload');
  }

  return { email, role };
}
