"use client";

import Container from "@/components/layout/Container";
import styles from "./MapSection.module.css";
import BookingTrigger from "@/components/booking/BookingTrigger";
import { infos, mapsSearchUrl, phoneHref } from "@/lib/infos";
import { closedDaysText } from "@/lib/opening";
import MapEmbed from "./MapEmbed";

export default function MapSectionEN() {
  return (
    <section className={styles.section}>
      <Container>
        <div className={styles.head}>
          <h2 className={styles.title}>Practical info</h2>
          <p className={styles.sub}>Address, opening hours, contact and payment methods.</p>
        </div>

        <div className={styles.grid}>
          <div className={styles.card}>
            <div className={styles.blockTitle}>Address</div>
            <div className={styles.text}>{infos.address}</div>

            <div className={styles.blockTitle}>Hours</div>
            <div className={styles.text}>Lunch {infos.lunchHours}</div>
            <div className={styles.text}>Dinner {infos.dinnerHours}</div>
            <div className={styles.text}>{closedDaysText(infos.schedule, "en")}</div>

            <div className={styles.blockTitle}>Contact</div>
            <a className={styles.link} href={phoneHref(infos.phoneDisplay)}>
              {infos.phoneDisplay}
            </a>

            <div className={styles.rowGap} />

            <BookingTrigger source="other" className={styles.primary}>
              Book
            </BookingTrigger>

            <a
              className={styles.secondary}
              href={mapsSearchUrl(infos.address)}
              target="_blank"
              rel="noreferrer"
            >
              Open in Google Maps
            </a>
          </div>

          <div className={styles.mapCard}>
            <MapEmbed title="Map" label="Show the map" />
            <div className={styles.mapHint}>({infos.address})</div>
          </div>
        </div>
      </Container>
    </section>
  );
}
