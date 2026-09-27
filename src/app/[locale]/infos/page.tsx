import Container from "@/components/layout/Container";
import MapSection from "@/components/home/map-section/MapSection";
import styles from "./Infos.module.css";
import ContactForm from "./ContactForm";

export default async function InfosPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const l: "fr" | "en" = locale === "en" ? "en" : "fr";

  const content = {
    fr: {
      title: "Accès & Contact",
      lead: "Une question, une demande particulière ? Écrivez-nous.",
      placeholders: {
        firstName: "Prénom *",
        lastName: "Nom *",
        email: "Email *",
        phone: "Téléphone",
        message: "Votre message *",
        submit: "Envoyer",
        sending: "Envoi…",
        success: "Merci, votre message est bien envoyé. Nous vous répondons rapidement.",
        error: "L’envoi n’a pas fonctionné. Réessayez, ou appelez-nous directement.",
      },
    },
    en: {
      title: "Access & Contact",
      lead: "A question or special request? Get in touch with us.",
      placeholders: {
        firstName: "First name *",
        lastName: "Last name *",
        email: "Email *",
        phone: "Phone",
        message: "Your message *",
        submit: "Send",
        sending: "Sending…",
        success: "Thank you, your message has been sent. We will get back to you shortly.",
        error: "Sending failed. Please try again, or call us directly.",
      },
    },
  }[l];

  return (
    <main className={styles.page}>
      <Container>
        <header className={styles.header}>
          <h1 className={styles.title}>{content.title}</h1>
          <p className={styles.lead}>{content.lead}</p>
        </header>

        <section className={styles.formWrap}>
          <div className={styles.formCard}>
            <ContactForm labels={content.placeholders} />
          </div>
        </section>
      </Container>

      <MapSection locale={l} />
    </main>
  );
}