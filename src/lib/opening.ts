// Calcul "ouvert / fermé" à partir du planning saisi dans Decap CMS
// (content/infos.json > schedule). Heure de Paris, quel que soit le fuseau
// du visiteur.

export const DAYS = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
] as const;

export type Day = (typeof DAYS)[number];
export type Service = "lunch" | "dinner";
export type Schedule = Record<Day, Record<Service, boolean>>;

const DAY_LABELS: Record<"fr" | "en", Record<Day, string>> = {
  fr: {
    monday: "lundi",
    tuesday: "mardi",
    wednesday: "mercredi",
    thursday: "jeudi",
    friday: "vendredi",
    saturday: "samedi",
    sunday: "dimanche",
  },
  en: {
    monday: "Monday",
    tuesday: "Tuesday",
    wednesday: "Wednesday",
    thursday: "Thursday",
    friday: "Friday",
    saturday: "Saturday",
    sunday: "Sunday",
  },
};

const SERVICE_LABELS = {
  fr: { lunch: "midi", dinner: "soir" },
  en: { lunch: "lunch", dinner: "dinner" },
} as const;

// "12:00–14:00" -> [720, 840] (minutes depuis minuit)
function parseRange(range: string): [number, number] | null {
  const match = range.match(/(\d{1,2})[:h](\d{2})\s*[–-]\s*(\d{1,2})[:h](\d{2})/);
  if (!match) return null;
  const [, h1, m1, h2, m2] = match.map(Number);
  return [h1 * 60 + m1, h2 * 60 + m2];
}

// Jour et heure actuels à Paris
export function nowInParis(date = new Date()): { day: Day; minutes: number } {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/Paris",
    weekday: "long",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(date);

  const get = (type: string) => parts.find((part) => part.type === type)?.value ?? "";
  return {
    day: get("weekday").toLowerCase() as Day,
    minutes: Number(get("hour")) * 60 + Number(get("minute")),
  };
}

export type TodayStatus = { open: boolean; text: string };

export function todayStatus(
  schedule: Schedule,
  hours: Record<Service, string>,
  locale: "fr" | "en",
  now = nowInParis(),
): TodayStatus {
  const today = schedule[now.day];
  const lunch = parseRange(hours.lunch);
  const dinner = parseRange(hours.dinner);
  const t = locale === "en"
    ? { lunch: "Open for lunch", dinner: "Open tonight", closed: "Closed today", next: "Next opening" }
    : { lunch: "Ouvert ce midi", dinner: "Ouvert ce soir", closed: "Fermé aujourd’hui", next: "Réouverture" };

  if (today.lunch && lunch && now.minutes < lunch[1]) {
    const tonight = today.dinner ? ` · ${locale === "en" ? "tonight" : "ce soir"} ${hours.dinner}` : "";
    return { open: true, text: `${t.lunch} ${hours.lunch}${tonight}` };
  }

  if (today.dinner && dinner && now.minutes < dinner[1]) {
    return { open: true, text: `${t.dinner} ${hours.dinner}` };
  }

  const next = nextOpening(schedule, now.day, locale);
  const servedToday = today.lunch || today.dinner;
  const closedText = servedToday
    ? locale === "en" ? "Closed for today" : "Fermé pour aujourd’hui"
    : t.closed;
  return { open: false, text: next ? `${closedText} · ${t.next} ${next}` : closedText };
}

// "demain midi", "mardi soir"...
function nextOpening(schedule: Schedule, today: Day, locale: "fr" | "en") {
  const start = DAYS.indexOf(today);

  for (let offset = 1; offset <= 7; offset++) {
    const day = DAYS[(start + offset) % 7];
    const service: Service | null = schedule[day].lunch
      ? "lunch"
      : schedule[day].dinner
        ? "dinner"
        : null;
    if (!service) continue;

    const when =
      offset === 1 ? (locale === "en" ? "tomorrow" : "demain") : DAY_LABELS[locale][day];
    return `${when} ${SERVICE_LABELS[locale][service]}`;
  }
  return null;
}

// "Fermé le samedi midi et le dimanche", généré depuis le planning
export function closedDaysText(schedule: Schedule, locale: "fr" | "en") {
  const parts = DAYS.flatMap((day) => {
    const { lunch, dinner } = schedule[day];
    const label = DAY_LABELS[locale][day];
    if (!lunch && !dinner) return [label];
    if (!lunch) return [`${label} ${SERVICE_LABELS[locale].lunch}`];
    if (!dinner) return [`${label} ${SERVICE_LABELS[locale].dinner}`];
    return [];
  });

  if (parts.length === 0) {
    return locale === "en" ? "Open every day" : "Ouvert tous les jours";
  }

  if (locale === "en") return `Closed ${parts.join(", ").replace(/, ([^,]*)$/, " and $1")}`;

  const withArticles = parts.map((part) => `le ${part}`);
  return `Fermé ${withArticles.join(", ").replace(/, ([^,]*)$/, " et $1")}`;
}
