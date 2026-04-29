import { NextResponse } from 'next/server';

import { signToken } from '../../../lib/auth';
import { MOCK_USERS_CREDENTIALS, TOKEN_COOKIE_NAME } from '../../../lib/constants';
import type { LoginCredentials } from '../../../types';

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Partial<LoginCredentials>;
    const email = typeof body.email === 'string' ? body.email : '';
    const password = typeof body.password === 'string' ? body.password : '';

    const isValid = MOCK_USERS_CREDENTIALS.some(
      (u) => u.email === email.trim() && u.password === password
    );

    if (!isValid) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const role = email.trim() === 'admin@example.com' ? 'admin' : 'user';
    const token = await signToken({ email: email.trim(), role });

    const res = NextResponse.json({ success: true });
    res.cookies.set(TOKEN_COOKIE_NAME, token, {
      httpOnly: true,
      maxAge: 86400,
      path: '/',
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    });

    return res;
  } catch (error) {
    console.error('POST /api/login error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
