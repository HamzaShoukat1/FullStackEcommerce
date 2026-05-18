import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  // .get() returns { name: string, value: string } | undefined
  const accessToken = req.cookies.get("accessToken")?.value;
  const { pathname } = req.nextUrl;
  const isAuthPage = pathname.startsWith("/sign-in");
  // 1. If user is NOT logged in and trying to access dashboard
  if (!accessToken && !isAuthPage) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  // 2. If user IS logged in and trying to access sign-in page
  if (accessToken && (isAuthPage || pathname === "/")) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  // Matcher should include both dashboard and sign-in to handle redirects for both
  matcher: ["/:path*", "/sign-in", "/"],
};
