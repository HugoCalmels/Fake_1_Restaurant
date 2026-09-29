import Container from "@/components/layout/Container";
import styles from "./InfoBar.module.css";
import BookingTrigger from "@/components/booking/BookingTrigger";
import { infos, phoneHref } from "@/lib/infos";
import OpenToday from "./OpenToday";

export default function InfobarEN() {
  return (
    <section className={styles.wrap}>
      <Container>
        <div className={styles.bar}>
          <div className={styles.item}>
            <OpenToday locale="en" />
          </div>

          <div className={styles.divider} />

          <div className={styles.item}>
            <div className={styles.kicker}>Address</div>
            <div className={styles.value}>{infos.address}</div>
          </div>

          <div className={styles.divider} />

          <div className={styles.item}>
            <div className={styles.kicker}>Phone</div>
            <a className={styles.valueLink} href={phoneHref(infos.phoneDisplay)}>
              {infos.phoneDisplay}
            </a>
          </div>

          <BookingTrigger source="other" className={styles.reserve}>
            BOOK
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
