import Container from "@/components/layout/Container";
import styles from "./MentionsLegales.module.css";

const CONTENT = {
  fr: {
    title: "Mentions légales",
    sections: [
      {
        title: "Site de démonstration",
        text: "Le Faux Bistrot est un restaurant fictif. Ce site est une démo réalisée par Hugo Calmels, développeur web, pour montrer ce qu’un restaurateur peut obtenir : un site clair qu’il met à jour lui-même (carte, horaires, photos). Les adresses, numéros, avis et réservations affichés sont fictifs.",
      },
      {
        title: "Éditeur",
        text: "Hugo Calmels, développeur web indépendant à Toulouse — hugo-calmels.fr",
      },
      {
        title: "Hébergement",
        text: "Netlify, Inc. (netlify.com), San Francisco, États-Unis.",
      },
      {
        title: "Données personnelles",
        text: "Les messages envoyés via le formulaire de contact servent uniquement à répondre à la demande. Aucune donnée n’est revendue ni utilisée à des fins commerciales.",
      },
      {
        title: "Crédits photo",
        text: "Photo de la page d’accueil : « Bouchon lyonnais » par Ji-Elle, Wikimedia Commons, licence CC BY-SA 4.0, recadrée et réchauffée. Autres photos : Unsplash.",
      },
    ],
  },
  en: {
    title: "Legal notice",
    sections: [
      {
        title: "Demo website",
        text: "Le Faux Bistrot is a fictional restaurant. This website is a demo built by Hugo Calmels, web developer, to show what a restaurant owner can get: a clear site they update themselves (menu, opening hours, photos). Addresses, phone numbers, reviews and bookings shown are fictional.",
      },
      {
        title: "Publisher",
        text: "Hugo Calmels, freelance web developer in Toulouse — hugo-calmels.fr",
      },
      {
        title: "Hosting",
        text: "Netlify, Inc. (netlify.com), San Francisco, USA.",
      },
      {
        title: "Personal data",
        text: "Messages sent through the contact form are only used to answer the request. No data is sold or used for marketing.",
      },
      {
        title: "Photo credits",
        text: "Home page photo: “Bouchon lyonnais” by Ji-Elle, Wikimedia Commons, CC BY-SA 4.0 license, cropped and warmed. Other photos: Unsplash.",
      },
    ],
  },
};

export default async function MentionsLegalesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const content = CONTENT[locale === "en" ? "en" : "fr"];

  return (
    <div className={styles.page}>
      <Container>
        <h1 className={styles.title}>{content.title}</h1>

        {content.sections.map((section) => (
          <section key={section.title} className={styles.section}>
            <h2 className={styles.sectionTitle}>{section.title}</h2>
            <p className={styles.text}>{section.text}</p>
          </section>
        ))}
      </Container>
    </div>
  );
}
