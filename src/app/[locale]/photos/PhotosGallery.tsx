"use client";

import { useEffect, useMemo, useState } from "react";
import styles from "./Photos.module.css";
import data from "../../../../content/photos.json";

type Photo = { src: string; alt: string };

// Les photos Unsplash de la démo sont servies à la bonne taille (vignette /
// agrandissement) au lieu de 2200 px ; les photos envoyées via Decap
// (/uploads) sont laissées telles quelles.
function sized(src: string, width: number) {
  if (!src.includes("images.unsplash.com")) return src;
  const url = new URL(src);
  url.searchParams.set("w", String(width));
  url.searchParams.set("q", "75");
  return url.toString();
}

export default function PhotosGallery({ locale }: { locale: "fr" | "en" }) {
  const photos = (data as { photos: Photo[] }).photos;

  const t =
    locale === "en"
      ? {
          title: "Photos",
          sub: "Atmosphere & plates (demo).",
          gridLabel: "Photo gallery",
          open: (alt: string) => `Open: ${alt}`,
          dialogLabel: "Enlarged photo",
          close: "Close",
        }
      : {
          title: "Photos",
          sub: "Ambiances & assiettes (démo).",
          gridLabel: "Galerie photos",
          open: (alt: string) => `Ouvrir: ${alt}`,
          dialogLabel: "Photo agrandie",
          close: "Fermer",
        };

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
        <h1 className={styles.title}>{t.title}</h1>
        <p className={styles.sub}>{t.sub}</p>
      </header>

      <section className={styles.grid} aria-label={t.gridLabel}>
        {photos.map((p, idx) => (
          <button
            key={`${p.src}-${idx}`}
            type="button"
            className={styles.card}
            onClick={() => setActiveIndex(idx)}
            aria-label={t.open(p.alt)}
          >
            <img
              className={styles.thumb}
              src={sized(p.src, 800)}
              srcSet={`${sized(p.src, 400)} 400w, ${sized(p.src, 800)} 800w`}
              sizes="(max-width: 700px) 100vw, 380px"
              alt={p.alt}
              // Les 3 premières sont visibles dès l'arrivée : chargées en priorité
              loading={idx < 3 ? "eager" : "lazy"}
              fetchPriority={idx < 3 ? "high" : "auto"}
              decoding="async"
            />
          </button>
        ))}
      </section>

      {active && (
        <div
          className={styles.overlay}
          role="dialog"
          aria-modal="true"
          aria-label={t.dialogLabel}
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
                aria-label={t.close}
              >
                ×
              </button>
              <img className={styles.full} src={sized(active.src, 1600)} alt={active.alt} />
            </figure>
          </div>
        </div>
      )}
    </main>
  );
}