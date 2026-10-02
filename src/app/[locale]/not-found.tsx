"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Container from "@/components/layout/Container";
import styles from "./NotFound.module.css";
import { localeFromPath, localePath } from "@/lib/i18n";

const CONTENT = {
  fr: {
    title: "Page introuvable",
    text: "Cette page n’existe pas ou a été déplacée. La cuisine, elle, est toujours ouverte.",
    home: "Retour à l’accueil",
    menu: "Voir la carte",
  },
  en: {
    title: "Page not found",
    text: "This page doesn’t exist or has been moved. The kitchen, however, is still open.",
    home: "Back to home",
    menu: "See the menu",
  },
};

// not-found ne reçoit pas les params : on déduit la langue de l’URL.
export default function NotFound() {
  const locale = localeFromPath(usePathname() ?? "/");
  const content = CONTENT[locale];

  return (
    <div className={styles.page}>
      <Container>
        <p className={styles.code}>404</p>
        <h1 className={styles.title}>{content.title}</h1>
        <p className={styles.text}>{content.text}</p>
        <div className={styles.actions}>
          <Link className={styles.primary} href={localePath(locale, "/")}>
            {content.home}
          </Link>
          <Link className={styles.secondary} href={localePath(locale, "/menu/soir-weekend")}>
            {content.menu}
          </Link>
        </div>
      </Container>
    </div>
  );
}
