"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { FiChevronLeft, FiChevronRight, FiMaximize2, FiX } from "react-icons/fi";
import styles from "./Photos.module.css";
import data from "../../../../content/photos.json";

// Photos, titres et descriptions modifiables dans Decap CMS (collection "Photos").
type Photo = { src: string; alt: string; caption?: string };
type GalleryData = { intro?: string; photos: Photo[] };

const { intro, photos } = data as GalleryData;

const LABELS = {
  fr: {
    title: "Photos",
    gallery: "Toutes les photos",
    show: (alt: string) => `Afficher : ${alt}`,
    prev: "Photo précédente",
    next: "Photo suivante",
    fullscreen: "Plein écran",
    close: "Fermer",
    dialog: "Photo en plein écran",
  },
  en: {
    title: "Photos",
    gallery: "All photos",
    show: (alt: string) => `Show: ${alt}`,
    prev: "Previous photo",
    next: "Next photo",
    fullscreen: "Full screen",
    close: "Close",
    dialog: "Full screen photo",
  },
};

export default function PhotosGallery({ locale }: { locale: "fr" | "en" }) {
  const t = LABELS[locale];
  const [index, setIndex] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const count = photos.length;
  const current = photos[index];
  const nextPhoto = photos[(index + 1) % count];

  const go = useCallback(
    (delta: number) => setIndex((i) => (i + delta + count) % count),
    [count],
  );

  // Clavier : ← → pour naviguer (partout sur la page), Échap pour quitter le plein écran
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
      if (e.key === "Escape") setFullscreen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [go]);

  // Pas de défilement de la page derrière le plein écran
  useEffect(() => {
    if (!fullscreen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [fullscreen]);

  // Glisser le doigt sur mobile
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
    touchStartX.current = null;
  };

  if (count === 0) return null;

  return (
    <main className={styles.page}>
      {/* Photo mise en avant, en grand dès l'arrivée */}
      <section
        className={styles.stage}
        aria-roledescription="carrousel"
        aria-label={t.title}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <Image
          key={current.src}
          src={current.src}
          alt={current.alt}
          fill
          priority={index === 0}
          sizes="100vw"
          className={styles.stageImage}
        />
        {/* Précharge la suivante pour que la flèche soit instantanée */}
        <Image
          src={nextPhoto.src}
          alt=""
          fill
          sizes="100vw"
          className={styles.preload}
          aria-hidden="true"
        />

        <div className={styles.stageShade} aria-hidden="true" />

        <div className={styles.stageCaption} aria-live="polite">
          <span className={styles.counter}>
            {index + 1} / {count}
          </span>
          <h1 className={styles.stageTitle}>{current.alt}</h1>
          {current.caption ? <p className={styles.stageText}>{current.caption}</p> : null}
        </div>

        <button type="button" className={`${styles.arrow} ${styles.arrowPrev}`} onClick={() => go(-1)} aria-label={t.prev}>
          <FiChevronLeft aria-hidden="true" />
        </button>
        <button type="button" className={`${styles.arrow} ${styles.arrowNext}`} onClick={() => go(1)} aria-label={t.next}>
          <FiChevronRight aria-hidden="true" />
        </button>

        <button type="button" className={styles.fullscreenBtn} onClick={() => setFullscreen(true)}>
          <FiMaximize2 aria-hidden="true" />
          {t.fullscreen}
        </button>
      </section>

      <div className={styles.inner}>
        {intro ? <p className={styles.intro}>{intro}</p> : null}

        {/* La série complète en vignettes */}
        <section className={styles.thumbs} aria-label={t.gallery}>
          {photos.map((photo, i) => (
            <button
              key={`${photo.src}-${i}`}
              type="button"
              className={`${styles.thumb} ${i === index ? styles.thumbActive : ""}`}
              onClick={() => {
                setIndex(i);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              aria-label={t.show(photo.alt)}
              aria-current={i === index ? "true" : undefined}
            >
              <Image
                src={photo.src}
                alt=""
                fill
                sizes="(max-width: 700px) 50vw, 260px"
                className={styles.thumbImage}
              />
              <span className={styles.thumbLabel}>{photo.alt}</span>
            </button>
          ))}
        </section>
      </div>

      {fullscreen ? (
        <div
          className={styles.lightbox}
          role="dialog"
          aria-modal="true"
          aria-label={t.dialog}
          onClick={(e) => {
            if (e.target === e.currentTarget) setFullscreen(false);
          }}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <div className={styles.lightboxFrame}>
            <Image key={current.src} src={current.src} alt={current.alt} fill sizes="100vw" className={styles.lightboxImage} />
          </div>

          <p className={styles.lightboxCaption}>
            <strong>{current.alt}</strong>
            {current.caption ? ` · ${current.caption}` : ""}
            <span className={styles.lightboxCounter}>
              {index + 1} / {count}
            </span>
          </p>

          <button type="button" className={`${styles.arrow} ${styles.arrowPrev}`} onClick={() => go(-1)} aria-label={t.prev}>
            <FiChevronLeft aria-hidden="true" />
          </button>
          <button type="button" className={`${styles.arrow} ${styles.arrowNext}`} onClick={() => go(1)} aria-label={t.next}>
            <FiChevronRight aria-hidden="true" />
          </button>
          <button type="button" className={styles.close} onClick={() => setFullscreen(false)} aria-label={t.close} autoFocus>
            <FiX aria-hidden="true" />
          </button>
        </div>
      ) : null}
    </main>
  );
}
