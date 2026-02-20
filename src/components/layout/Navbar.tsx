"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import styles from "./Navbar.module.css";

type MenuItem = { label: string; href: string };

const menuItems: MenuItem[] = [
  { label: "Carte", href: "/menu" },
  { label: "Menu midi", href: "/menu#midi" },
  { label: "Menu soir", href: "/menu#soir" },
];

function cx(...parts: Array<string | false | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export default function Navbar() {
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

        setShow(y < 50 || y < prev);

        if (open && y > 120) setOpen(null);

        ticking.current = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [open]);

  // ✅ close outside + escape (no close/reopen glitch)
  useEffect(() => {
    if (!open) return;

    const onDown = (e: PointerEvent) => {
      const el = innerRef.current;
      if (!el) return;
      if (el.contains(e.target as Node)) return; // click inside navbar -> ignore
      setOpen(null);
    };

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
    };

    document.addEventListener("pointerdown", onDown, { capture: true });
    document.addEventListener("keydown", onKey);

    return () => {
      // ✅ no "any" needed
      document.removeEventListener("pointerdown", onDown, true);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const logoSrc = "/images/icon-bistro-test.png";

  return (
    <header className={cx(styles.navbar, show ? styles.visible : styles.hidden)}>
      <div ref={innerRef} className={styles.inner}>
        <Link href="/" className={styles.brand} onClick={() => setOpen(null)} aria-label="Accueil">
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
              onClick={() => setOpen((p) => (p === "menu" ? null : "menu"))}
              aria-expanded={open === "menu"}
              aria-haspopup="menu"
            >
              Cartes &amp; Menus
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
                    href={it.href}
                    className={styles.dropItem}
                    role="menuitem"
                    onClick={() => setOpen(null)}
                  >
                    {it.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link href="/#photos" className={styles.link} onClick={() => setOpen(null)}>
            Photos
          </Link>
          <Link href="/#avis" className={styles.link} onClick={() => setOpen(null)}>
            Avis
          </Link>
          <Link href="/contact" className={styles.link} onClick={() => setOpen(null)}>
            Infos
          </Link>
        </nav>

        <div className={styles.right}>
          <Link href="/reserver" className={styles.reserveBtn} onClick={() => setOpen(null)}>
            Réserver
          </Link>

          <div className={styles.dropdown}>
            <button
              type="button"
              className={styles.langButton}
              onClick={() => setOpen((p) => (p === "lang" ? null : "lang"))}
              aria-expanded={open === "lang"}
              aria-haspopup="menu"
            >
              FR
              <FiChevronDown
                className={cx(styles.chevronIcon, open === "lang" && styles.chevronOpen)}
                aria-hidden="true"
              />
            </button>

            {open === "lang" && (
              <div className={cx(styles.dropMenu, styles.langMenu)} role="menu">
                <button className={styles.dropItemBtn} type="button" onClick={() => setOpen(null)}>
                  FR
                </button>
                <button className={styles.dropItemBtn} type="button" onClick={() => setOpen(null)}>
                  EN
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}