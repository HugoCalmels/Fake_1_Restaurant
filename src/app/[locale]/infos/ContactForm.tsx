"use client";

import { useState } from "react";
import styles from "./Infos.module.css";

type Labels = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
  submit: string;
  sending: string;
  success: string;
  error: string;
};

type Status = "idle" | "sending" | "success" | "error";

// Netlify Forms : les messages arrivent dans le tableau de bord Netlify et par
// e-mail au restaurateur, sans serveur ni abonnement (100 messages/mois offerts).
export default function ContactForm({ labels }: { labels: Labels }) {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus("sending");

    try {
      const body = new URLSearchParams(
        Array.from(new FormData(form).entries()).map(([key, value]) => [key, String(value)]),
      );

      const response = await fetch("/__forms.html", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body.toString(),
      });

      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return <p className={styles.success}>{labels.success}</p>;
  }

  return (
    <form name="contact" className={styles.form} onSubmit={handleSubmit}>
      <input type="hidden" name="form-name" value="contact" />
      {/* Champ piège anti-spam, invisible pour les humains */}
      <p hidden>
        <label>
          Ne pas remplir : <input name="bot-field" tabIndex={-1} autoComplete="off" />
        </label>
      </p>

      <div className={styles.row}>
        <input type="text" name="firstName" placeholder={labels.firstName} aria-label={labels.firstName} autoComplete="given-name" required />
        <input type="text" name="lastName" placeholder={labels.lastName} aria-label={labels.lastName} autoComplete="family-name" required />
      </div>

      <div className={styles.row}>
        <input type="email" name="email" placeholder={labels.email} aria-label={labels.email} autoComplete="email" required />
        <input type="tel" name="phone" placeholder={labels.phone} aria-label={labels.phone} autoComplete="tel" />
      </div>

      <textarea name="message" placeholder={labels.message} aria-label={labels.message} rows={5} required />

      {status === "error" ? <p className={styles.error}>{labels.error}</p> : null}

      <button type="submit" className={styles.submit} disabled={status === "sending"}>
        {status === "sending" ? labels.sending : labels.submit}
      </button>
    </form>
  );
}
