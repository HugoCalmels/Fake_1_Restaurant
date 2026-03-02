"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import { usePathname } from "next/navigation";
import styles from "./Navbar.module.css";
import BookingTrigger from "@/components/booking/BookingTrigger";

type MenuItem = { label: string; href: string };

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
    const out = parts.join("/") || "/";
    return out;
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
  const pathnameRaw = usePathname();
  const pathname = pathnameRaw ?? "/";

  const [show, setShow] = useState(true);
  const [open, setOpen] = useState<null | "menu" | "lang">(null);

  const innerRef = useRef<HTMLDivElement | null>(null);
  const lastY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    lastY.current = window.scrollY;

    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;

      requestAnimationFrame(() => {
        const prev = lastY.current;
        const y = window.scrollY;
        lastY.current = y;

        const nextShow = y < 50 || y < prev;
        setShow(nextShow);

        if (open && y > 120) setOpen(null);

        ticking.current = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const onDown = (e: PointerEvent) => {
      const el = innerRef.current;
      if (!el) return;
      if (el.contains(e.target as Node)) return;

      console.log("[NavbarBase] click outside -> close", { open });
      setOpen(null);
    };

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        console.log("[NavbarBase] escape -> close", { open });
        setOpen(null);
      }
    };

    document.addEventListener("pointerdown", onDown, { capture: true });
    document.addEventListener("keydown", onKey);

    return () => {
      document.removeEventListener("pointerdown", onDown, true);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const logoSrc = "/images/icon-bistro-test.png";

  const hrefFR = switchLocaleInPath(pathname, "fr");
  const hrefEN = switchLocaleInPath(pathname, "en");

  useEffect(() => {
    if (open === "lang") {
      console.log("[NavbarBase] lang menu open", { pathname, hrefFR, hrefEN });
    }
  }, [open, pathname, hrefFR, hrefEN]);

  return (
    <header className={cx(styles.navbar, show ? styles.visible : styles.hidden)}>
      <div ref={innerRef} className={styles.inner}>
        <Link
          href={withLocale(locale, "/")}
          className={styles.brand}
          onClick={() => {
            console.log("[NavbarBase] click brand -> close");
            setOpen(null);
          }}
          aria-label="Accueil"
        >
          <Image
            src={logoSrc}
            alt="Le Faux Bistrot"
            width={800}
            height={400}
            className={styles.logo}
            priority
          />
        </Link>

        <nav className={styles.nav} aria-label="Primary">
          <div className={styles.dropdown}>
            <button
              type="button"
              className={styles.dropButton}
              onClick={() => {
                setOpen((p) => {
                  const next = p === "menu" ? null : "menu";
                  console.log("[NavbarBase] toggle menu dropdown", { from: p, to: next });
                  return next;
                });
              }}
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
                {menuItems.map((it) => {
                  const href = withLocale(locale, it.href);
                  return (
                    <Link
                      key={it.href}
                      href={href}
                      className={styles.dropItem}
                      role="menuitem"
                      onClick={() => {
                        console.log("[NavbarBase] click menu item", { label: it.label, href });
                        setOpen(null);
                      }}
                    >
                      {it.label}
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          <Link
            href={withLocale(locale, "/photos")}
            className={styles.link}
            onClick={() => {
              console.log("[NavbarBase] click nav link", { to: "photos" });
              setOpen(null);
            }}
          >
            {labels.photos}
          </Link>

          <Link
            href={withLocale(locale, "/avis")}
            className={styles.link}
            onClick={() => {
              console.log("[NavbarBase] click nav link", { to: "avis" });
              setOpen(null);
            }}
          >
            {labels.avis}
          </Link>

          <Link
            href={withLocale(locale, "/infos")}
            className={styles.link}
            onClick={() => {
              console.log("[NavbarBase] click nav link", { to: "infos" });
              setOpen(null);
            }}
          >
            {labels.infos}
          </Link>
        </nav>

        <div className={styles.right}>
          <BookingTrigger
            source="navbar"
            className={styles.reserveBtn}
            onClick={() => {
              console.log("[NavbarBase] click booking trigger -> close");
              setOpen(null);
            }}
          >
            {labels.reserve}
          </BookingTrigger>

          <div className={styles.dropdown}>
            <button
              type="button"
              className={styles.langButton}
              onClick={() => {
                setOpen((p) => {
                  const next = p === "lang" ? null : "lang";
                  console.log("[NavbarBase] toggle lang dropdown", { from: p, to: next });
                  return next;
                });
              }}
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
    <Link
      className={styles.dropItemBtn}
      href={hrefFR}
      onClick={() => {
        console.log("[NavbarBase] click FR", { from: pathname, to: hrefFR });
        setOpen(null);
      }}
      role="menuitem"
    >
      FR
    </Link>

    <Link
      className={styles.dropItemBtn}
      href={hrefEN}
      onClick={() => {
        console.log("[NavbarBase] click EN", { from: pathname, to: hrefEN });
        setOpen(null);
      }}
      role="menuitem"
    >
      EN
    </Link>
  </div>
)}
          </div>
        </div>
      </div>
    </header>
  );
}