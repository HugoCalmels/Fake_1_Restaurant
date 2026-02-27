"use client";

import styles from "./Avis.module.css";
import BookingTrigger from "@/components/booking/BookingTrigger";

type Review = {
  name: string;
  date: string;
  rating: number;
  text: string;
};

const reviews: Review[] = [
  {
    name: "Arnaud D.",
    date: "Février 2026",
    rating: 5,
    text: "Très belle découverte. Produits frais, cuisson parfaite et service chaleureux. On reviendra."
  },
  {
    name: "Michel L.",
    date: "Janvier 2026",
    rating: 4,
    text: "Bonne ambiance bistrot. Un peu d’attente mais la cuisine était au rendez-vous."
  },
  {
    name: "Stéphanie G.",
    date: "Janvier 2026",
    rating: 5,
    text: "Un régal du début à la fin. Mention spéciale pour le dessert et le sourire en salle."
  },
  {
    name: "Rebekka F.",
    date: "Décembre 2025",
    rating: 5,
    text: "Cuisine généreuse et carte courte comme on aime. Très bon rapport qualité/prix."
  },
  {
    name: "Lucas M.",
    date: "Décembre 2025",
    rating: 4,
    text: "Cadre agréable et belle sélection de vins. Service attentif."
  },
  {
    name: "Camille R.",
    date: "Novembre 2025",
    rating: 5,
    text: "Ambiance conviviale, plats maîtrisés et équipe au top."
  }
];

function Stars({ value }: { value: number }) {
  return (
    <div className={styles.stars}>
      {"★★★★★☆☆☆☆☆".slice(5 - value, 10 - value)}
    </div>
  );
}

export default function AvisPage() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>Avis</h1>
        <div className={styles.score}>
          <div className={styles.scoreValue}>4.6</div>
          <div className={styles.scoreMeta}>
            <div className={styles.starsLarge}>★★★★★</div>
            <div className={styles.small}>Basé sur 218 avis (démo)</div>
          </div>
        </div>
      </header>

      <section className={styles.grid}>
        {reviews.map((r, i) => (
          <article key={i} className={styles.card}>
            <div className={styles.cardHead}>
              <div>
                <div className={styles.name}>{r.name}</div>
                <div className={styles.date}>{r.date}</div>
              </div>
              <Stars value={r.rating} />
            </div>
            <p className={styles.text}>{r.text}</p>
          </article>
        ))}
      </section>

      <div className={styles.cta}>
<BookingTrigger source="other" className={styles.reserveBtn}>
  Réserver une table
</BookingTrigger>
      </div>
    </main>
  );
}