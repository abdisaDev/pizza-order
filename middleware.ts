import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';
import { auth } from './auth';

export async function middleware(req: NextRequest) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const token: any = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });
  const { pathname } = req.nextUrl;
  console.log(token, 'token');
  if (!token) {
    const loginUrl = new URL('/', req.url);

    return NextResponse.redirect(loginUrl);
  }
  localStorage.setItem('tojen', JSON.stringify(token));
  localStorage.setItem('user', JSON.stringify(token.user.type));
  if (token?.user?.type === 'CUSTOMER' && pathname.startsWith('/dashboard')) {
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
