import styles from "./Avis.module.css";
import BookingTrigger from "@/components/booking/BookingTrigger";

type Review = {
  name: string;
  date: string;
  rating: number;
  text: string;
};

function Stars({ value }: { value: number }) {
  return (
    <div className={styles.stars}>
      {"★★★★★☆☆☆☆☆".slice(5 - value, 10 - value)}
    </div>
  );
}

export default async function AvisPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const l: "fr" | "en" = locale === "en" ? "en" : "fr";

  const content = {
    fr: {
      title: "Avis",
      scoreMeta: "Basé sur 218 avis (démo)",
      cta: "Réserver une table",
      reviews: [
        {
          name: "Arnaud D.",
          date: "Février 2026",
          rating: 5,
          text: "Très belle découverte. Produits frais, cuisson parfaite et service chaleureux. On reviendra.",
        },
        {
          name: "Michel L.",
          date: "Janvier 2026",
          rating: 4,
          text: "Bonne ambiance bistrot. Un peu d’attente mais la cuisine était au rendez-vous.",
        },
        {
          name: "Stéphanie G.",
          date: "Janvier 2026",
          rating: 5,
          text: "Un régal du début à la fin. Mention spéciale pour le dessert et le sourire en salle.",
        },
        {
          name: "Rebekka F.",
          date: "Décembre 2025",
          rating: 5,
          text: "Cuisine généreuse et carte courte comme on aime. Très bon rapport qualité/prix.",
        },
        {
          name: "Lucas M.",
          date: "Décembre 2025",
          rating: 4,
          text: "Cadre agréable et belle sélection de vins. Service attentif.",
        },
        {
          name: "Camille R.",
          date: "Novembre 2025",
          rating: 5,
          text: "Ambiance conviviale, plats maîtrisés et équipe au top.",
        },
      ] as Review[],
    },
    en: {
      title: "Reviews",
      scoreMeta: "Based on 218 reviews (demo)",
      cta: "Book a table",
      reviews: [
        {
          name: "Arnaud D.",
          date: "February 2026",
          rating: 5,
          text: "A great discovery. Fresh products, perfect cooking and warm service. We’ll be back.",
        },
        {
          name: "Michel L.",
          date: "January 2026",
          rating: 4,
          text: "Nice bistro atmosphere. A bit of waiting time but the food was worth it.",
        },
        {
          name: "Stéphanie G.",
          date: "January 2026",
          rating: 5,
          text: "Delicious from start to finish. Special mention for the dessert and the friendly staff.",
        },
        {
          name: "Rebekka F.",
          date: "December 2025",
          rating: 5,
          text: "Generous cuisine and a short menu just how we like it. Great value for money.",
        },
        {
          name: "Lucas M.",
          date: "December 2025",
          rating: 4,
          text: "Pleasant setting and great wine selection. Attentive service.",
        },
        {
          name: "Camille R.",
          date: "November 2025",
          rating: 5,
          text: "Friendly atmosphere, well-executed dishes and a top-notch team.",
        },
      ] as Review[],
    },
  }[l];

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>{content.title}</h1>

        <div className={styles.score}>
          <div className={styles.scoreValue}>4.6</div>
          <div className={styles.scoreMeta}>
            <div className={styles.starsLarge}>★★★★★</div>
            <div className={styles.small}>{content.scoreMeta}</div>
          </div>
        </div>
      </header>

      <section className={styles.grid}>
        {content.reviews.map((r, i) => (
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
          {content.cta}
        </BookingTrigger>
      </div>
    </main>
  );
}