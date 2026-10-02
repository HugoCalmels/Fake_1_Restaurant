import Link from "next/link";
import Container from "@/components/layout/Container";
import styles from "./MenuTeaser.module.css";
import data from "../../../../content/menu-soir-weekend.json";

type MenuSection = { title: string; items: Array<{ name: string }> };

// Aperçu tiré de la vraie carte (modifiable dans Decap) : quand le restaurateur
// change un plat, l'accueil suit tout seul.
const TEASER_SECTIONS = ["Les entrées", "Les plats", "Les desserts"];
const GENERIC = /du jour|canaille/i;

function capitalize(text: string) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

const highlights = (data.sections as MenuSection[])
  .filter((section) => TEASER_SECTIONS.includes(section.title))
  .map((section) => ({
    title: capitalize(section.title.replace(/^Les /i, "")),
    dishes: section.items
      .map((item) => item.name)
      .filter((name) => !GENERIC.test(name))
      .slice(0, 3),
  }));

export default function MenuTeaserFR() {
  return (
    <section className={styles.section}>
      <Container>
        <div className={styles.head}>
          <h2 className={styles.title}>La carte</h2>
          <p className={styles.sub}>Des plats de saison, une carte qui change souvent.</p>
          <Link className={styles.cta} href="/menu/soir-weekend">
            Voir toute la carte
          </Link>
        </div>

        <div className={styles.grid}>
          {highlights.map((h) => (
            <div key={h.title} className={styles.card}>
              <div className={styles.cardTitle}>{h.title}</div>
              <div className={styles.fakeLine} />
              {h.dishes.map((dish) => (
                <div key={dish} className={styles.cardDesc}>
                  {dish}
                </div>
              ))}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
