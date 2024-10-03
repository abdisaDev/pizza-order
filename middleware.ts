import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';
import { auth } from './auth';

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;
  console.log(token, 'token');
  if (
    (pathname.startsWith('/dashboard') && !token) ||
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (token?.user as any)?.type === 'CUSTOMER'
  ) {
    const loginUrl = new URL('/', req.url);

    return NextResponse.redirect(loginUrl);
  }
  if (pathname.startsWith('/auth')) {
    const loginUrl = new URL('/auth/login', req.url);

    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/dashboard'],
};

export default auth;
