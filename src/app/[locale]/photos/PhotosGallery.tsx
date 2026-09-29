"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { FiChevronLeft, FiChevronRight, FiMaximize2, FiStar, FiX } from "react-icons/fi";
import styles from "./Photos.module.css";
import data from "../../../../content/photos.json";

// Albums, photos, titres et descriptions modifiables dans Decap CMS (collection "Photos").
type Photo = { src: string; alt: string; caption?: string; signature?: boolean };
type Album = { title: string; description?: string; photos: Photo[] };
type GalleryData = { intro?: string; albums: Album[] };

const { intro, albums: rawAlbums } = data as GalleryData;
const albums = rawAlbums.filter((a) => a.photos?.length);

const LABELS = {
  fr: {
    title: "Photos",
    all: "Tout voir",
    filters: "Filtrer les photos",
    show: (alt: string) => `Afficher : ${alt}`,
    prev: "Photo précédente",
    next: "Photo suivante",
    fullscreen: "Plein écran",
    close: "Fermer",
    dialog: "Photo en plein écran",
    signature: "Coup de cœur du chef",
    count: (n: number) => `${n} photo${n > 1 ? "s" : ""}`,
  },
  en: {
    title: "Photos",
    all: "View all",
    filters: "Filter photos",
    show: (alt: string) => `Show: ${alt}`,
    prev: "Previous photo",
    next: "Next photo",
    fullscreen: "Full screen",
    close: "Close",
    dialog: "Full screen photo",
    signature: "Chef’s favourite",
    count: (n: number) => `${n} photo${n > 1 ? "s" : ""}`,
  },
};

export default function PhotosGallery({ locale }: { locale: "fr" | "en" }) {
  const t = LABELS[locale];
  // null = tous les albums
  const [albumFilter, setAlbumFilter] = useState<number | null>(null);
  const [index, setIndex] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const visibleAlbums = useMemo(
    () => albums.map((album, i) => ({ album, i })).filter(({ i }) => albumFilter === null || i === albumFilter),
    [albumFilter],
  );
  // Les flèches parcourent les photos affichées, dans l'ordre de la page
  const photos = useMemo(() => visibleAlbums.flatMap(({ album }) => album.photos), [visibleAlbums]);

  const count = photos.length;
  const current = photos[Math.min(index, count - 1)];
  const nextPhoto = photos[(index + 1) % count];

  const go = useCallback((delta: number) => setIndex((i) => (i + delta + count) % count), [count]);

  const chooseAlbum = (value: number | null) => {
    setAlbumFilter(value);
    setIndex(0);
  };

  const show = (i: number) => {
    setIndex(i);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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

  if (!current) return null;

  const badge = (
    <span className={styles.badge}>
      <FiStar aria-hidden="true" />
      {t.signature}
    </span>
  );

  let flatIndex = 0;

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
        <Image src={nextPhoto.src} alt="" fill sizes="100vw" className={styles.preload} aria-hidden="true" />

        <div className={styles.stageShade} aria-hidden="true" />

        <div className={styles.stageCaption} aria-live="polite">
          <span className={styles.counter}>
            {index + 1} / {count}
          </span>
          {current.signature ? badge : null}
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

        {albums.length > 1 ? (
          <div className={styles.filters} role="group" aria-label={t.filters}>
            <button
              type="button"
              className={`${styles.chip} ${albumFilter === null ? styles.chipActive : ""}`}
              aria-pressed={albumFilter === null}
              onClick={() => chooseAlbum(null)}
            >
              {t.all}
            </button>
            {albums.map((album, i) => (
              <button
                key={album.title}
                type="button"
                className={`${styles.chip} ${albumFilter === i ? styles.chipActive : ""}`}
                aria-pressed={albumFilter === i}
                onClick={() => chooseAlbum(i)}
              >
                {album.title}
              </button>
            ))}
          </div>
        ) : null}

        {visibleAlbums.map(({ album, i: albumIndex }) => (
          <section key={album.title} className={styles.album} aria-labelledby={`album-${albumIndex}`}>
            <header className={styles.albumHeader}>
              <h2 id={`album-${albumIndex}`} className={styles.albumTitle}>
                {album.title}
              </h2>
              <span className={styles.albumCount}>{t.count(album.photos.length)}</span>
            </header>
            {album.description ? <p className={styles.albumText}>{album.description}</p> : null}

            <div className={styles.thumbs}>
              {album.photos.map((photo) => {
                const i = flatIndex++;
                return (
                  <button
                    key={`${photo.src}-${i}`}
                    type="button"
                    className={`${styles.thumb} ${photo.signature ? styles.thumbSignature : ""} ${i === index ? styles.thumbActive : ""}`}
                    onClick={() => show(i)}
                    aria-label={t.show(photo.alt)}
                    aria-current={i === index ? "true" : undefined}
                  >
                    <Image
                      src={photo.src}
                      alt=""
                      fill
                      sizes={photo.signature ? "(max-width: 700px) 100vw, 560px" : "(max-width: 700px) 50vw, 280px"}
                      className={styles.thumbImage}
                    />
                    <span className={styles.thumbLabel}>
                      {photo.signature ? badge : null}
                      {photo.alt}
                    </span>
                  </button>
                );
              })}
            </div>
          </section>
        ))}
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
