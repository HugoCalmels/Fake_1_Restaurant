"use client";

import Link from "next/link";
import BistrotLogo from "./BistrotLogo";
import { useEffect, useRef, useState } from "react";
import { FiChevronDown, FiMenu, FiX } from "react-icons/fi";
import { usePathname } from "next/navigation";
import styles from "./Navbar.module.css";
import BookingTrigger from "@/components/booking/BookingTrigger";

type MenuItem = { label: string; href: string };
type OpenPanel = null | "menu" | "lang" | "mobile";

function cx(...parts: Array<string | false | undefined>) {
  return parts.filter(Boolean).join(" ");
}

function withLocale(locale: "fr" | "en", href: string) {
  if (!href.startsWith("/")) return `/${locale}/${href}`;
  return `/${locale}${href === "/" ? "" : href}`;
}

function switchLocaleInPath(pathname: string, nextLocale: "fr" | "en") {
  const parts = pathname.split("/");
  if (parts.length > 1 && (parts[1] === "fr" || parts[1] === "en")) {
    parts[1] = nextLocale;
    return parts.join("/") || "/";
  }
  return `/${nextLocale}${pathname === "/" ? "" : pathname}`;
}

export default function NavbarBase({
  locale,
  labels,
  menuItems,
}: {
  locale: "fr" | "en";
  labels: {
    menus: string;
    photos: string;
    avis: string;
    infos: string;
    reserve: string;
    langShort: "FR" | "EN";
  };
  menuItems: MenuItem[];
}) {
  const pathname = usePathname() ?? "/";

  const [show, setShow] = useState(true);
  const [open, setOpen] = useState<OpenPanel>(null);

  const innerRef = useRef<HTMLDivElement | null>(null);
  const lastY = useRef(0);
  const ticking = useRef(false);

  // Masque la barre en descendant, la réaffiche en remontant
  useEffect(() => {
    lastY.current = window.scrollY;

    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;

      requestAnimationFrame(() => {
        const prev = lastY.current;
        const y = window.scrollY;
        lastY.current = y;

        setShow(y < 50 || y < prev || open === "mobile");
        if (open && open !== "mobile" && y > 120) setOpen(null);

        ticking.current = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [open]);

  // Ferme les menus au clic extérieur ou avec Échap
  useEffect(() => {
    if (!open) return;

    const onDown = (e: PointerEvent) => {
      const el = innerRef.current;
      if (el && !el.contains(e.target as Node)) setOpen(null);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
    };

    document.addEventListener("pointerdown", onDown, { capture: true });
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown, true);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const close = () => setOpen(null);
  const toggle = (panel: Exclude<OpenPanel, null>) =>
    setOpen((current) => (current === panel ? null : panel));

  const isActive = (href: string) => pathname.startsWith(withLocale(locale, href));
  const menusActive = pathname.includes("/menu/");

  const pageLinks = [
    { href: "/photos", label: labels.photos },
    { href: "/avis", label: labels.avis },
    { href: "/infos", label: labels.infos },
  ];

  return (
    <header className={cx(styles.navbar, show ? styles.visible : styles.hidden)}>
      <div ref={innerRef} className={styles.inner}>
        <Link href={withLocale(locale, "/")} className={styles.brand} onClick={close} aria-label="Accueil">
          <BistrotLogo className={styles.logoBadge} />
        </Link>

        <nav className={styles.nav} aria-label="Navigation principale">
          <div className={styles.dropdown}>
            <button
              type="button"
              className={cx(styles.dropButton, menusActive && styles.active)}
              onClick={() => toggle("menu")}
              aria-expanded={open === "menu"}
              aria-haspopup="menu"
            >
              {labels.menus}
              <FiChevronDown
                className={cx(styles.chevronIcon, open === "menu" && styles.chevronOpen)}
                aria-hidden="true"
              />
            </button>

            {open === "menu" && (
              <div className={cx(styles.dropMenu, styles.menuMenu)} role="menu">
                {menuItems.map((it) => (
                  <Link
                    key={it.href}
                    href={withLocale(locale, it.href)}
                    className={styles.dropItem}
                    role="menuitem"
                    onClick={close}
                  >
                    {it.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {pageLinks.map((link) => (
            <Link
              key={link.href}
              href={withLocale(locale, link.href)}
              className={cx(styles.link, isActive(link.href) && styles.active)}
              aria-current={isActive(link.href) ? "page" : undefined}
              onClick={close}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className={styles.right}>
          <BookingTrigger source="navbar" className={styles.reserveBtn} onClick={close}>
            {labels.reserve}
          </BookingTrigger>

          <div className={styles.dropdown}>
            <button
              type="button"
              className={styles.langButton}
              onClick={() => toggle("lang")}
              aria-expanded={open === "lang"}
              aria-haspopup="menu"
            >
              {labels.langShort}
              <FiChevronDown
                className={cx(styles.chevronIcon, open === "lang" && styles.chevronOpen)}
                aria-hidden="true"
              />
            </button>

            {open === "lang" && (
              <div className={cx(styles.dropMenu, styles.langMenu)} role="menu">
                <Link className={styles.dropItemBtn} href={switchLocaleInPath(pathname, "fr")} onClick={close} role="menuitem">
                  FR
                </Link>
                <Link className={styles.dropItemBtn} href={switchLocaleInPath(pathname, "en")} onClick={close} role="menuitem">
                  EN
                </Link>
              </div>
            )}
          </div>

          <button
            type="button"
            className={styles.burger}
            onClick={() => toggle("mobile")}
            aria-expanded={open === "mobile"}
            aria-controls="mobile-menu"
            aria-label={open === "mobile" ? "Fermer le menu" : "Ouvrir le menu"}
          >
            {open === "mobile" ? <FiX aria-hidden="true" /> : <FiMenu aria-hidden="true" />}
          </button>
        </div>

        {open === "mobile" && (
          <nav id="mobile-menu" className={styles.mobileMenu} aria-label="Navigation mobile">
            <span className={styles.mobileGroup}>{labels.menus}</span>
            {menuItems.map((it) => (
              <Link
                key={it.href}
                href={withLocale(locale, it.href)}
                className={cx(styles.mobileLink, styles.mobileSub, isActive(it.href) && styles.mobileActive)}
                onClick={close}
              >
                {it.label}
              </Link>
            ))}
            {pageLinks.map((link) => (
              <Link
                key={link.href}
                href={withLocale(locale, link.href)}
                className={cx(styles.mobileLink, isActive(link.href) && styles.mobileActive)}
                onClick={close}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
