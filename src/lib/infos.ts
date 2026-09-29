import data from "../../content/infos.json";
import type { Schedule } from "./opening";

// Infos pratiques modifiables par le restaurateur dans Decap CMS
// (collection "Infos pratiques"). Une seule source pour tout le site.
export type Infos = {
  announcement: string;
  address: string;
  phoneDisplay: string;
  lunchHours: string;
  dinnerHours: string;
  schedule: Schedule;
  payments: string;
  goodToKnow: string[];
};

export const infos = data as Infos;

// Site de démo : le numéro affiché appartient à la plage réservée à la fiction
// par l'ARCEP (05 36 49 xx xx) ; le lien se construit à partir de lui, pour
// ne jamais composer le numéro d'un vrai établissement.
export function phoneHref(phoneDisplay: string) {
  const digits = phoneDisplay.replace(/\D/g, "");
  return `tel:+33${digits.replace(/^0/, "")}`;
}

export function mapsSearchUrl(address: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
}
