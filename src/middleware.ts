import { jwtVerify } from 'jose';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { JWT_SECRET, TOKEN_COOKIE_NAME } from './lib/constants';

function getSecretKey() {
  return new TextEncoder().encode(JWT_SECRET);
}

export async function middleware(req: NextRequest) {
  const token = req.cookies.get(TOKEN_COOKIE_NAME)?.value;
  if (!token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  try {
    await jwtVerify(token, getSecretKey(), { algorithms: ['HS256'] });
    return NextResponse.next();
  } catch {
    return NextResponse.redirect(new URL('/login', req.url));
  }
}

export const config = {
  matcher: ['/dashboard/:path*', '/profile/:path*', '/settings/:path*'],
};
