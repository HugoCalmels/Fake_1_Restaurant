"use client";

import Container from "@/components/layout/Container";
import MapSection from "@/components/pages/home/MapSection";
import styles from "./Infos.module.css";

export default function InfosPage() {
  return (
    <main className={styles.page}>
      <Container>
        <header className={styles.header}>
          <h1 className={styles.title}>Accès & Contact</h1>
          <p className={styles.lead}>
            Une question, une demande particulière ? Écrivez-nous.
          </p>
        </header>

        <section className={styles.formWrap}>
          <div className={styles.formCard}>
            <form className={styles.form}>
              <div className={styles.row}>
                <input type="text" placeholder="Prénom *" required />
                <input type="text" placeholder="Nom *" required />
              </div>

              <div className={styles.row}>
                <input type="email" placeholder="Email *" required />
                <input type="tel" placeholder="Téléphone" />
              </div>

              <textarea placeholder="Votre message *" rows={5} required />

              <button type="submit" className={styles.submit}>
                Envoyer
              </button>
            </form>
          </div>
        </section>
      </Container>

      {/* ✅ même Container interne que sur la home => widths alignées */}
      <MapSection />
    </main>
  );
}