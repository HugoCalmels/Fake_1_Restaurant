"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { FiX, FiChevronDown } from "react-icons/fi";
import { useBooking } from "./useBooking";
import styles from "./BookingWidget.module.css";

type Section = "covers" | "date" | "time" | null;

function pad2(n: number) {
  return String(n).padStart(2, "0");
}
function toISODate(d: Date) {
  return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
}
function formatFRShort(d: Date) {
  const wk = d.toLocaleDateString("fr-FR", { weekday: "short" }); // "mer."
  return `${wk} ${d.getDate()}`;
}
function labelTodayTomorrow(d: Date) {
  const now = new Date();
  const a = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  const b = new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
  const diff = Math.round((b - a) / 86400000);
  if (diff === 0) return "Aujourd’hui";
  if (diff === 1) return "Demain";
  return "Autre";
}
function buildTimes() {
  const out: string[] = [];
  const start = 19 * 60 + 30;
  const end = 21 * 60;
  for (let m = start; m <= end; m += 15) {
    out.push(`${pad2(Math.floor(m / 60))}:${pad2(m % 60)}`);
  }
  return out;
}

export default function BookingWidget() {
  const { isOpen, closeBooking } = useBooking();

  const [present, setPresent] = useState(false);
  const [phase, setPhase] = useState<"open" | "closing">("open");

  const [covers, setCovers] = useState(2);
  const [dateISO, setDateISO] = useState(() => toISODate(new Date()));
  const [time, setTime] = useState<string | null>(null);

  const [section, setSection] = useState<Section>(null);

  const panelRef = useRef<HTMLDivElement | null>(null);
  const lastActive = useRef<HTMLElement | null>(null);

  const times = useMemo(() => buildTimes(), []);
  const today = useMemo(() => new Date(), []);
  const tomorrow = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d;
  }, []);

  const dateObj = useMemo(() => {
    const [y, m, d] = dateISO.split("-").map(Number);
    return new Date(y, (m ?? 1) - 1, d ?? 1);
  }, [dateISO]);

  const dateLabel = useMemo(() => {
    const lab = labelTodayTomorrow(dateObj);
    if (lab === "Aujourd’hui" || lab === "Demain") return lab;
    return formatFRShort(dateObj);
  }, [dateObj]);

  const canSubmit = Boolean(time);

  const openNow = () => {
    setPresent(true);
    setPhase("open");
    setTime(null);
    setSection(null);
  };

  const requestClose = () => {
    setPhase("closing");
    window.setTimeout(() => {
      setPresent(false);
      closeBooking();
    }, 240);
  };

  useEffect(() => {
    if (isOpen) openNow();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  useEffect(() => {
    if (!present) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") requestClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [present]);

  useEffect(() => {
    if (!present) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [present]);

  useEffect(() => {
    if (!present) return;
    lastActive.current = document.activeElement as HTMLElement | null;
    const t = window.setTimeout(() => panelRef.current?.focus(), 0);
    return () => {
      window.clearTimeout(t);
      lastActive.current?.focus?.();
    };
  }, [present]);

  if (!present) return null;

  const onBackdropDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const panel = panelRef.current;
    if (!panel) return;
    if (panel.contains(e.target as Node)) return;
    requestClose();
  };

  const toggle = (s: Exclude<Section, null>) =>
    setSection((cur) => (cur === s ? null : s));

  const ui = (
    <div
      className={styles.backdrop}
      data-phase={phase}
      onPointerDown={onBackdropDown}
      role="presentation"
    >
      <aside
        ref={panelRef}
        className={styles.panel}
        data-phase={phase}
        role="dialog"
        aria-modal="true"
        aria-label="Réservation"
        tabIndex={-1}
      >
        {/* TOP (non scroll) */}
        <div className={styles.topBar}>
          <div className={styles.topTitle}>BISTROT DE L’ÉTOILE</div>
          <div className={styles.topLang}>FR</div>
          <button className={styles.closeBtn} type="button" onClick={requestClose} aria-label="Fermer">
            <FiX aria-hidden="true" />
          </button>
        </div>

        {/* BODY scrollable (c'est ça qui rend le panel "petit") */}
        <div className={styles.body}>
          <div className={styles.notice}>
            Bonjour durant la période estivale nous sommes fermé les samedis
          </div>

          {/* Couverts */}
          <div className={styles.rowGroup}>
            <button className={styles.row} type="button" onClick={() => toggle("covers")} aria-expanded={section === "covers"}>
              <span className={styles.rowLeft}>
                <span className={styles.ico} aria-hidden="true">🍴</span>
                <span className={styles.rowText}>{covers} couverts</span>
              </span>
              <FiChevronDown className={styles.chev} data-open={section === "covers"} aria-hidden="true" />
            </button>

            <div className={styles.accWrap} data-open={section === "covers"}>
              <div className={styles.accInner}>
                <div className={styles.keypad}>
                  {Array.from({ length: 9 }, (_, i) => i + 1).map((n) => (
                    <button
                      key={n}
                      type="button"
                      className={styles.key}
                      data-active={covers === n}
                      onClick={() => setCovers(n)}
                    >
                      {n}
                    </button>
                  ))}
                  <button type="button" className={styles.key} onClick={() => setCovers((v) => Math.max(1, v - 1))}>–</button>
                  <button type="button" className={styles.key} data-active={covers === 0} onClick={() => setCovers(0)}>0</button>
                  <button type="button" className={styles.key} onClick={() => setCovers((v) => Math.min(20, v + 1))}>+</button>
                </div>
              </div>
            </div>
          </div>

          {/* Date */}
          <div className={styles.rowGroup}>
            <button className={styles.row} type="button" onClick={() => toggle("date")} aria-expanded={section === "date"}>
              <span className={styles.rowLeft}>
                <span className={styles.ico} aria-hidden="true">📅</span>
                <span className={styles.rowText}>{dateLabel}</span>
              </span>
              <FiChevronDown className={styles.chev} data-open={section === "date"} aria-hidden="true" />
            </button>

            <div className={styles.accWrap} data-open={section === "date"}>
              <div className={styles.accInner}>
                <div className={styles.subPill}>Prochaine disponibilité</div>

                <div className={styles.datePills}>
                  <button
                    type="button"
                    className={styles.datePill}
                    data-active={dateISO === toISODate(today)}
                    onClick={() => setDateISO(toISODate(today))}
                  >
                    <div className={styles.pTop}>{formatFRShort(today)}</div>
                    <div className={styles.pBot}>Aujourd’hui</div>
                  </button>

                  <button
                    type="button"
                    className={styles.datePill}
                    data-active={dateISO === toISODate(tomorrow)}
                    onClick={() => setDateISO(toISODate(tomorrow))}
                  >
                    <div className={styles.pTop}>{formatFRShort(tomorrow)}</div>
                    <div className={styles.pBot}>Demain</div>
                  </button>

                  <label
                    className={styles.datePill}
                    data-active={!(dateISO === toISODate(today) || dateISO === toISODate(tomorrow))}
                  >
                    <div className={styles.pTop}>📆</div>
                    <div className={styles.pBot}>Autre</div>
                    <input
                      className={styles.dateInput}
                      type="date"
                      value={dateISO}
                      min={toISODate(new Date())}
                      onChange={(e) => setDateISO(e.target.value)}
                      aria-label="Choisir une autre date"
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Horaire */}
          <div className={styles.rowGroup}>
            <button className={styles.row} type="button" onClick={() => toggle("time")} aria-expanded={section === "time"}>
              <span className={styles.rowLeft}>
                <span className={styles.ico} aria-hidden="true">🕘</span>
                <span className={styles.rowText}>Horaire</span>
              </span>
              <FiChevronDown className={styles.chev} data-open={section === "time"} aria-hidden="true" />
            </button>

            <div className={styles.accWrap} data-open={section === "time"}>
              <div className={styles.accInner}>
                <div className={styles.mealLabel}>Dîner</div>
                <div className={styles.timeList}>
                  {times.map((t) => (
                    <button
                      key={t}
                      type="button"
                      className={styles.timeBtn}
                      data-active={time === t}
                      onClick={() => setTime(t)}
                    >
                      <span className={styles.dot} aria-hidden="true" />
                      <span className={styles.timeText}>{t}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM (non scroll) */}
        <button
          className={styles.cta}
          type="button"
          disabled={!canSubmit}
          onClick={() => {
            if (!canSubmit) return;
            requestClose();
          }}
        >
          Réserver
        </button>

        <div className={styles.footer}>
          <span className={styles.zMark} aria-hidden="true">z</span>
          <span>Rendu possible par Fakechef</span>
        </div>
      </aside>
    </div>
  );

  return createPortal(ui, document.body);
}