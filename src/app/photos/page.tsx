"use client";

import { useEffect, useMemo, useState } from "react";
import styles from "./Photos.module.css";
import data from "../../../content/photos.json";

type Photo = { src: string; alt: string };

export default function PhotosPage() {
  const photos = (data as { photos: Photo[] }).photos;

  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const active = useMemo(
    () => (activeIndex === null ? null : photos[activeIndex]),
    [activeIndex, photos]
  );

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveIndex(null);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [active]);

  useEffect(() => {
    if (!active) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [active]);

  return (
    <main className={styles.page}>
      <header className={styles.head}>
        <h1 className={styles.title}>Photos</h1>
        <p className={styles.sub}>Ambiances & assiettes (démo).</p>
      </header>

      <section className={styles.grid} aria-label="Galerie photos">
        {photos.map((p, idx) => (
          <button
            key={`${p.src}-${idx}`}
            type="button"
            className={styles.card}
            onClick={() => setActiveIndex(idx)}
            aria-label={`Ouvrir: ${p.alt}`}
          >
            <img className={styles.thumb} src={p.src} alt={p.alt} loading="lazy" />
          </button>
        ))}
      </section>

      {active && (
        <div
          className={styles.overlay}
          role="dialog"
          aria-modal="true"
          aria-label="Photo agrandie"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setActiveIndex(null);
          }}
        >
          <div className={styles.modal}>
            <figure className={styles.figure}>
              <button
                type="button"
                className={styles.close}
                onClick={() => setActiveIndex(null)}
                aria-label="Fermer"
              >
                ×
              </button>
              <img className={styles.full} src={active.src} alt={active.alt} />
            </figure>
          </div>
        </div>
      )}
    </main>
  );
}