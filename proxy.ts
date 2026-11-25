import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// The Invest Like a Girl page lives at /ILG. Paths are case-sensitive, so any
// other spelling (/ilg, /Ilg) is sent there. The matcher itself ignores case,
// so the exact-spelling check is what stops a redirect loop.
export function proxy(request: NextRequest) {
  if (request.nextUrl.pathname === "/ILG") return NextResponse.next();
  return NextResponse.redirect(new URL("/ILG", request.url), 308);
}

export const config = {
  matcher: "/ilg",
};
