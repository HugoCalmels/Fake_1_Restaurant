import Link from "next/link";
import Container from "@/components/layout/Container";
import styles from "./MenuTeaser.module.css";

const highlights = [
  { title: "Starters", desc: "To begin lightly (or not)." },
  { title: "Mains", desc: "Seasonal, precise cooking, clean flavors." },
  { title: "Desserts", desc: "Bistro classics with a twist." },
];

function withLocale(locale: "en", href: string) {
  return `/${locale}${href}`;
}

export default function MenuTeaserEN() {
  return (
    <section className={styles.section}>
      <Container>
        <div className={styles.head}>
          <h2 className={styles.title}>The Menu</h2>
          <p className={styles.sub}>
            Short, seasonal, and updated regularly.
          </p>
          <Link
            className={styles.cta}
            href={withLocale("en", "/menu/soir-weekend")}
          >
            View the menu
          </Link>
        </div>

        <div className={styles.grid}>
          {highlights.map((h) => (
            <div key={h.title} className={styles.card}>
              <div className={styles.cardTitle}>{h.title}</div>
              <div className={styles.cardDesc}>{h.desc}</div>
              <div className={styles.fakeLine} />
              <div className={styles.small}>
                Example: daily special, seasonal suggestions, etc.
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}