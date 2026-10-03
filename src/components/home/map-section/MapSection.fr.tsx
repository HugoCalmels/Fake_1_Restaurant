"use client";

import Container from "@/components/layout/Container";
import styles from "./MapSection.module.css";
import BookingTrigger from "@/components/booking/BookingTrigger";
import { infos, mapsSearchUrl, phoneHref } from "@/lib/infos";
import { closedDaysText } from "@/lib/opening";
import MapEmbed from "./MapEmbed";

export default function MapSectionFR() {
  return (
    <section className={styles.section}>
      <Container>
        <div className={styles.head}>
          <h2 className={styles.title}>Infos pratiques</h2>
          <p className={styles.sub}>Adresse, horaires, contact et moyens de paiement.</p>
        </div>

        <div className={styles.grid}>
          <div className={styles.card}>
            <div className={styles.blockTitle}>Adresse</div>
            <div className={styles.text}>{infos.address}</div>

            <div className={styles.blockTitle}>Horaires</div>
            <div className={styles.text}>Déjeuner {infos.lunchHours}</div>
            <div className={styles.text}>Dîner {infos.dinnerHours}</div>
            <div className={styles.text}>{closedDaysText(infos.schedule, "fr")}</div>

            <div className={styles.blockTitle}>Contact</div>
            <a className={styles.link} href={phoneHref(infos.phoneDisplay)}>
              {infos.phoneDisplay}
            </a>

            {infos.payments ? (
              <>
                <div className={styles.blockTitle}>Paiement</div>
                <div className={styles.text}>{infos.payments}</div>
              </>
            ) : null}

            <div className={styles.rowGap} />

            <BookingTrigger source="other" className={styles.primary}>
              Réserver
            </BookingTrigger>

            <a
              className={styles.secondary}
              href={mapsSearchUrl(infos.address)}
              target="_blank"
              rel="noreferrer"
            >
              Ouvrir dans Google Maps
            </a>
          </div>

          <div className={styles.mapCard}>
            <MapEmbed title="Plan d’accès" label="Afficher la carte" />
            <div className={styles.mapHint}>({infos.address})</div>
          </div>
        </div>
      </Container>
    </section>
  );
}
