import Container from "@/components/layout/Container";
import styles from "./AboutSection.module.css";

export default function AboutSectionEN() {
  return (
    <section className={styles.section}>
      <Container>
        <div className={styles.grid}>
          <div>
            <h2 className={styles.title}>A bistrot the way we like it.</h2>
            <p className={styles.p}>
              Simple but precise cooking that changes with the seasons. Lunch: quick and generous.
              Dinner: more indulgent, made to share, with a great selection of wines.
            </p>
            <p className={styles.p}>
              Come for a great meal, good conversation, and that “feel at home” vibe.
            </p>
          </div>

          <div className={styles.card}>
            <div className={styles.cardTitle}>Good to know</div>
            <ul className={styles.list}>
              <li>Fresh produce · short menu</li>
              <li>Vegetarian options</li>
              <li>Groups: call us</li>
              <li>Holiday vouchers / Card (edit as needed)</li>
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}