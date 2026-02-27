"use client";

import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brand}>Le Faux Bistrot</div>

        <div className={styles.meta}>
          © {new Date().getFullYear()} · Toulouse ·
          <span className={styles.dot}> </span>
          Site démo ·
          <span className={styles.dot}> </span>
          Mentions légales
        </div>
      </div>
    </footer>
  );
}