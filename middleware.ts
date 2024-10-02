import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.AUTH_SECRET });
  const { pathname } = req.nextUrl;

  if (
    (pathname.startsWith("/dashboard") && !token) ||
    token?.user?.type === "CUSTOMER"
  ) {
    const loginUrl = new URL("/", req.url);

    return NextResponse.redirect(loginUrl);
  }
  if (pathname.startsWith("/auth")) {
    const loginUrl = new URL("/auth/login", req.url);

    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/dashboard"],
};
