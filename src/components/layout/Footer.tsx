"use client";

import Link from "next/link";
import styles from "./Footer.module.css";
import { localePath } from "@/lib/i18n";

export default function Footer({ locale }: { locale: "fr" | "en" }) {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brand}>Le Faux Bistrot</div>

        <div className={styles.meta}>
          © {new Date().getFullYear()} · Toulouse ·
          <span className={styles.dot}> </span>
          {locale === "en" ? "Demo website" : "Site démo"} ·
          <span className={styles.dot}> </span>
          <Link href={localePath(locale, "/mentions-legales")}>
            {locale === "en" ? "Legal notice" : "Mentions légales"}
          </Link>
        </div>
      </div>
    </footer>
  );
}
