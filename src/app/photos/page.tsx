"use client";

import { useEffect, useMemo, useState } from "react";
import styles from "./Photos.module.css";

type Photo = { src: string; alt: string };

const PHOTOS: Photo[] = [
  { src: "https://images.unsplash.com/photo-1525193612562-0ec53b0e5d7c?auto=format&fit=crop&w=2200&q=80", alt: "Salle – ambiance bistrot" },
  { src: "https://images.unsplash.com/photo-1551529834-525807d6b4f3?auto=format&fit=crop&w=2200&q=80", alt: "Banquettes & bois" },
  { src: "https://images.unsplash.com/photo-1521917441209-e886f0404a7b?auto=format&fit=crop&w=2200&q=80", alt: "Salle – lumière douce" },
  { src: "https://images.unsplash.com/photo-1521845455419-eac340fdbbed?auto=format&fit=crop&w=2200&q=80", alt: "Plat – burger & frites" },
  { src: "https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?auto=format&fit=crop&w=2200&q=80", alt: "Assiette – cuisine de saison" },
  { src: "https://images.unsplash.com/photo-1530695801911-f188c516550a?auto=format&fit=crop&w=2200&q=80", alt: "Intérieur – tables & luminaires" },
  {
  src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=2200&q=80",
  alt: "Verres & table dressée"
},
  { src: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=2200&q=80", alt: "Dessert – gourmandise" },
  { src: "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?auto=format&fit=crop&w=2200&q=80", alt: "Ambiance – service du soir" },
];

export default function PhotosPage() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const active = useMemo(
    () => (activeIndex === null ? null : PHOTOS[activeIndex]),
    [activeIndex]
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
        {PHOTOS.map((p, idx) => (
          <button
            key={p.src}
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
            {/* ✅ wrapper qui prend la taille de l’image => croix posée “sur l’image” */}
            <figure className={styles.figure}>
              <button
                type="button"
                className={styles.close}
                onClick={() => setActiveIndex(null)}
                aria-label="Fermer"
              />
              <img className={styles.full} src={active.src} alt={active.alt} />
            </figure>
          </div>
        </div>
      )}
    </main>
  );
}