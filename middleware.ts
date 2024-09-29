import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { cookies } from "next/headers";

const protectedRoutes = ["/people", /^\/people\/\d+$/];

const isProtectedRoute = (pathname: string) => {
  return protectedRoutes.some((route) =>
    typeof route === "string" ? route === pathname : route.test(pathname)
  );
};

export default function middleware(req: NextRequest) {
  const isAuthenticated = cookies().get("token");

  const { pathname } = req.nextUrl;
  const loginURL = new URL("/login", req.nextUrl.origin);
  const dashboardURL = new URL("/people", req.nextUrl.origin);
  if (pathname === "/") {
    return NextResponse.redirect(isAuthenticated ? dashboardURL : loginURL);
  }
  if (!isAuthenticated && isProtectedRoute(pathname)) {
    return NextResponse.redirect(loginURL.toString());
  }

  if (isAuthenticated && pathname === "/login") {
    return NextResponse.redirect(dashboardURL.toString());
  }
}
