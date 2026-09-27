import Container from "@/components/layout/Container";
import styles from "./InfoBar.module.css";
import BookingTrigger from "@/components/booking/BookingTrigger";
import { infos, phoneHref } from "@/lib/infos";

export default function InfobarFR() {
  return (
    <section className={styles.wrap}>
      <Container>
        <div className={styles.bar}>
          <div className={styles.item}>
            <div className={styles.kicker}>Horaires</div>
            <div className={styles.value}>
              {infos.lunchHours} · {infos.dinnerHours}
            </div>
          </div>

          <div className={styles.divider} />

          <div className={styles.item}>
            <div className={styles.kicker}>Adresse</div>
            <div className={styles.value}>{infos.address}</div>
          </div>

          <div className={styles.divider} />

          <div className={styles.item}>
            <div className={styles.kicker}>Téléphone</div>
            <a className={styles.valueLink} href={phoneHref(infos.phoneDisplay)}>
              {infos.phoneDisplay}
            </a>
          </div>

          <BookingTrigger source="other" className={styles.reserve}>
            RÉSERVER
          </BookingTrigger>
        </div>

        {infos.announcement ? (
          <p className={styles.announcement} role="status">
            {infos.announcement}
          </p>
        ) : null}
      </Container>
    </section>
  );
}
