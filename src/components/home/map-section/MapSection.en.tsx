"use client";

import Container from "@/components/layout/Container";
import styles from "./MapSection.module.css";
import BookingTrigger from "@/components/booking/BookingTrigger";

export default function MapSectionEN() {
  const mapsLink =
    "https://www.google.com/maps?q=6%20rue%20de%20l'%C3%A9toile%2031000%20Toulouse";

  return (
    <section className={styles.section}>
      <Container>
        <div className={styles.head}>
          <h2 className={styles.title}>Practical info</h2>
          <p className={styles.sub}>Address, opening hours, access, payment methods.</p>
        </div>

        <div className={styles.grid}>
          <div className={styles.card}>
            <div className={styles.blockTitle}>Address</div>
            <div className={styles.text}>6 rue du faux · 31000 Toulouse</div>

            <div className={styles.blockTitle}>Hours</div>
            <div className={styles.text}>Lunch 12:00–14:00</div>
            <div className={styles.text}>Dinner 19:30–22:00</div>

            <div className={styles.blockTitle}>Contact</div>
            <a className={styles.link} href="tel:+33561631300">
              05 61 00 00 00
            </a>

            <div className={styles.rowGap} />

            <BookingTrigger source="other" className={styles.primary}>
              Book
            </BookingTrigger>

            <a className={styles.secondary} href={mapsLink} target="_blank" rel="noreferrer">
              Open in Google Maps
            </a>
          </div>

          <div className={styles.mapCard}>
            <iframe
              className={styles.iframe}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2889.0!2d1.44!3d43.60!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sToulouse!5e0!3m2!1sfr!2sfr!4v0000000000000"
              allowFullScreen
            />
            <div className={styles.mapHint}>(6 rue du faux, 31000 Toulouse)</div>
          </div>
        </div>
      </Container>
    </section>
  );
}