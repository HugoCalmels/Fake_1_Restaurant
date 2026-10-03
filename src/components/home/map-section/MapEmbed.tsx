"use client";

import { useState } from "react";
import { FiMapPin } from "react-icons/fi";
import styles from "./MapSection.module.css";

const MAP_SRC =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2889.0!2d1.44!3d43.60!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sToulouse!5e0!3m2!1sfr!2sfr!4v0000000000000";

// The Google map only loads on click: no third-party cookies on page load.
export default function MapEmbed({ title, label }: { title: string; label: string }) {
  const [show, setShow] = useState(false);

  if (show) {
    return (
      <iframe
        className={styles.iframe}
        referrerPolicy="no-referrer-when-downgrade"
        src={MAP_SRC}
        allowFullScreen
        title={title}
      />
    );
  }

  return (
    <button type="button" className={styles.mapPlaceholder} onClick={() => setShow(true)}>
      <FiMapPin aria-hidden className={styles.mapPin} />
      <span>{label}</span>
    </button>
  );
}
