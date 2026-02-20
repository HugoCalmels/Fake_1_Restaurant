import Container from "@/components/layout/Container";
import styles from "./InfoBar.module.css";

export default function Infobar() {
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
            <div className={styles.value}>6 rue de l’Étoile · 31000 Toulouse</div>
          </div>

          <div className={styles.divider} />

          <div className={styles.item}>
            <div className={styles.kicker}>Téléphone</div>
            <a className={styles.valueLink} href="tel:+33561631343">
              05 61 63 13 43
            </a>
          </div>

          <a className={styles.reserve} href="/reserver">
            RÉSERVER
          </a>
        </div>
      </Container>
    </section>
  );
}
