import Link from "next/link";
import Container from "@/components/layout/Container";
import styles from "./MenuTeaser.module.css";

const highlights = [
  { title: "Entrées", desc: "Pour commencer léger (ou pas)." },
  { title: "Plats", desc: "Saison, cuisson, sauce. Simple & net." },
  { title: "Desserts", desc: "Classiques de bistrot + twist." },
];

function withLocale(locale: "fr", href: string) {
  return `/${locale}${href}`;
}

export default function MenuTeaserFR() {
  return (
    <section className={styles.section}>
      <Container>
        <div className={styles.head}>
          <h2 className={styles.title}>La carte</h2>
          <p className={styles.sub}>
            Courte, saisonnière, et mise à jour souvent.
          </p>
          <Link
            className={styles.cta}
            href={withLocale("fr", "/menu/soir-weekend")}
          >
            Voir le menu
          </Link>
        </div>

        <div className={styles.grid}>
          {highlights.map((h) => (
            <div key={h.title} className={styles.card}>
              <div className={styles.cardTitle}>{h.title}</div>
              <div className={styles.cardDesc}>{h.desc}</div>
              <div className={styles.fakeLine} />
              <div className={styles.small}>
                Ex: plat du jour, suggestions, etc.
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}