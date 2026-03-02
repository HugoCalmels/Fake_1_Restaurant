import Container from "@/components/layout/Container";
import MapSection from "@/components/home/map-section/MapSection";
import styles from "./Infos.module.css";

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
            <form className={styles.form}>
              <div className={styles.row}>
                <input type="text" placeholder={content.placeholders.firstName} required />
                <input type="text" placeholder={content.placeholders.lastName} required />
              </div>

              <div className={styles.row}>
                <input type="email" placeholder={content.placeholders.email} required />
                <input type="tel" placeholder={content.placeholders.phone} />
              </div>

              <textarea
                placeholder={content.placeholders.message}
                rows={5}
                required
              />

              <button type="submit" className={styles.submit}>
                {content.placeholders.submit}
              </button>
            </form>
          </div>
        </section>
      </Container>

      <MapSection locale={l} />
    </main>
  );
}