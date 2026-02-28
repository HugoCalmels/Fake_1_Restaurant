import { NextRequest, NextResponse } from "next/server";

const locales = ["fr", "en"] as const;
const defaultLocale = "fr";

function getLocaleFromHeader(req: NextRequest) {
  const accept = req.headers.get("accept-language") || "";
  // ultra simple: si "en" est prioritaire → en, sinon fr
  const lower = accept.toLowerCase();
  if (lower.includes("en")) return "en";
  return defaultLocale;
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // ignore next internals & assets
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // déjà localisé ? (/fr/... ou /en/...)
  const hasLocale = locales.some((l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`));
  if (hasLocale) return NextResponse.next();

  // redirect /... → /fr/... (ou détecté via header)
  const detected = getLocaleFromHeader(req);
  const url = req.nextUrl.clone();
  url.pathname = `/${detected}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};