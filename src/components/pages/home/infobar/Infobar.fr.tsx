import Container from "@/components/layout/Container";
import styles from "./InfoBar.module.css";
import BookingTrigger from "@/components/booking/BookingTrigger";

export default function InfobarFR() {
  return (
    <section className={styles.wrap}>
      <Container>
        <div className={styles.bar}>
          <div className={styles.item}>
            <div className={styles.kicker}>Ouvert aujourd’hui</div>
            <div className={styles.value}>12:00–13:45 · 19:30–22:00</div>
          </div>

          <div className={styles.divider} />

          <div className={styles.item}>
            <div className={styles.kicker}>Adresse</div>
            <div className={styles.value}>6 rue du faux · 31000 Toulouse</div>
          </div>

          <div className={styles.divider} />

          <div className={styles.item}>
            <div className={styles.kicker}>Téléphone</div>
            <a className={styles.valueLink} href="tel:+33561631300">
              05 61 00 00 00
            </a>
          </div>

          <BookingTrigger source="other" className={styles.reserve}>
            RÉSERVER
          </BookingTrigger>
        </div>
      </Container>
    </section>
  );
}