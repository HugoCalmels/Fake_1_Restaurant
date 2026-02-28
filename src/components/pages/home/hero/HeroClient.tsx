"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./Hero.module.css";
import { useEffect, useRef } from "react";
import type { HeroContent } from "./Hero";
import BookingTrigger from "@/components/booking/BookingTrigger";

export const HERO_EVENT = "hero:metrics";

function withLocale(locale: "fr" | "en", href: string) {
  if (!href.startsWith("/")) return `/${locale}/${href}`;
  return `/${locale}${href === "/" ? "" : href}`;
}

export default function HeroClient({
  locale,
  content,
}: {
  locale: "fr" | "en";
  content: HeroContent;
}) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const publish = () => {
      const rect = el.getBoundingClientRect();
      const top = rect.top + window.scrollY;
      const bottom = top + rect.height;

      window.dispatchEvent(
        new CustomEvent(HERO_EVENT, {
          detail: { top, bottom, height: rect.height },
        })
      );
    };

    publish();

    const ro = new ResizeObserver(publish);
    ro.observe(el);

    window.addEventListener("resize", publish);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", publish);
    };
  }, []);

  return (
    <section ref={ref} className={styles.hero} id="hero">
      <Image
        src={content.bgImage || "/images/landing-resto-fake.webp"}
        alt={content.bgAlt || "Intérieur du restaurant"}
        fill
        priority
        className={styles.bg}
        sizes="100vw"
      />
      <div className={styles.overlay} />

      <div className={styles.frame}>
        <div className={styles.content}>
          <div className={styles.inner}>
            {content.kicker && <p className={styles.kicker}>{content.kicker}</p>}

            <h1 className={styles.title}>{content.title}</h1>

            {content.subtitle && <p className={styles.subtitle}>{content.subtitle}</p>}

            <div className={styles.actions}>
              <BookingTrigger source="hero" className={styles.primary}>
                {content.primaryCtaLabel}
              </BookingTrigger>

              {content.secondaryCtaLabel && content.secondaryCtaHref && (
                <Link
                  className={styles.secondary}
                  href={withLocale(locale, content.secondaryCtaHref)}
                >
                  {content.secondaryCtaLabel}
                </Link>
              )}
            </div>

            {content.note && <p className={styles.note}>{content.note}</p>}
          </div>
        </div>
      </div>
    </section>
  );
}