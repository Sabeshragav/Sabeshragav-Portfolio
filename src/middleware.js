import { NextResponse } from "next/server";

const isPublicPath = (path) => ["/login", "/signup"].includes(path);

const getAuthToken = (request) =>
  request.cookies.get("_Secure-next-auth.session-token")?.value ||
  request.cookies.get("next-auth.session-token")?.value ||
  request.cookies.get("token")?.value ||
  "";

export function middleware(request) {
  const path = request.nextUrl.pathname;
  const token = getAuthToken(request);

  if (isPublicPath(path) && token) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }
}

export const config = {
  matcher: ["/login", "/signup"],
};
