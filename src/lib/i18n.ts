// Le français est servi à la racine ("/menu/midi"), l'anglais sous "/en"
// ("/en/menu/midi"). En interne, next.config.ts réécrit "/..." vers "/fr/...".
export type Locale = "fr" | "en";

const EN_PREFIX = /^\/en(?=\/|$)/;

export function localeFromPath(pathname: string): Locale {
  return EN_PREFIX.test(pathname) ? "en" : "fr";
}

export function localePath(locale: Locale, href: string) {
  const path = href.startsWith("/") ? href : `/${href}`;
  if (locale === "fr") return path;
  return `/en${path === "/" ? "" : path}`;
}

// Même page dans l'autre langue (sélecteur FR/EN)
export function switchLocalePath(pathname: string, nextLocale: Locale) {
  const path = pathname.replace(EN_PREFIX, "") || "/";
  return localePath(nextLocale, path);
}
