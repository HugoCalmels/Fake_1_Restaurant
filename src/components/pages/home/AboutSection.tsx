import Container from "@/components/layout/Container";
import styles from "./AboutSection.module.css";

export default function AboutSection() {
  return (
    <section className={styles.section}>
      <Container>
        <div className={styles.grid}>
          <div>
            <h2 className={styles.title}>Un bistrot, comme on aime.</h2>
            <p className={styles.p}>
              Une cuisine simple mais précise, qui bouge avec les saisons. Le midi : rapide et
              généreux. Le soir : plus gourmand, à partager, avec une belle sélection de vins.
            </p>
            <p className={styles.p}>
              Ici, on vient pour bien manger, pour discuter, et pour se sentir “chez soi”.
            </p>
          </div>

          <div className={styles.card}>
            <div className={styles.cardTitle}>À savoir</div>
            <ul className={styles.list}>
              <li>Produits frais · carte courte</li>
              <li>Options végétariennes</li>
              <li>Groupes : appelez-nous</li>
              <li>Chèques vacances / CB (à adapter)</li>
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
