import Container from "@/components/layout/Container";
import styles from "./AboutSection.module.css";
import { infos } from "@/lib/infos";
import home from "../../../../content/home.json";

export default function AboutSectionFR() {
  return (
    <section className={styles.section}>
      <Container>
        <div className={styles.grid}>
          <div>
            <h2 className={styles.title}>{home.aboutTitle}</h2>
            {home.aboutParagraphs.map((paragraph) => (
              <p key={paragraph} className={styles.p}>
                {paragraph}
              </p>
            ))}
          </div>

          <div className={styles.card}>
            <div className={styles.cardTitle}>À savoir</div>
            <ul className={styles.list}>
              {infos.goodToKnow.map((item) => (
                <li key={item}>{item}</li>
              ))}
              {infos.payments ? <li>Paiement : {infos.payments}</li> : null}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
