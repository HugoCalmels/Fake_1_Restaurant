"use client";

import { useEffect, useState } from "react";
import { infos } from "@/lib/infos";
import { todayStatus, type TodayStatus } from "@/lib/opening";
import styles from "./InfoBar.module.css";

// Le site est statique : "aujourd'hui" se calcule dans le navigateur. Avant
// ça (rendu serveur), on affiche simplement les horaires.
export default function OpenToday({ locale }: { locale: "fr" | "en" }) {
  const [status, setStatus] = useState<TodayStatus | null>(null);

  useEffect(() => {
    const update = () =>
      setStatus(
        todayStatus(
          infos.schedule,
          { lunch: infos.lunchHours, dinner: infos.dinnerHours },
          locale,
        ),
      );

    update();
    const timer = window.setInterval(update, 60_000);
    return () => window.clearInterval(timer);
  }, [locale]);

  return (
    <>
      <div className={styles.kicker}>
        {locale === "en" ? "Today" : "Aujourd’hui"}
      </div>
      <div className={styles.value}>
        {status ? (
          <>
            <span
              className={status.open ? styles.dotOpen : styles.dotClosed}
              aria-hidden="true"
            />
            {status.text}
          </>
        ) : (
          `${infos.lunchHours} · ${infos.dinnerHours}`
        )}
      </div>
    </>
  );
}
